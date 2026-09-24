import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import User from "@/models/User";

export async function POST(request) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please sign in to manage your subscription." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Cancel active subscriptions
    await Subscription.updateMany(
      { userId: user._id, status: "active" },
      { status: "cancelled", endDate: new Date() }
    );

    // Set user's plan back to Starter
    const defaultStarter = new Subscription({
      userId: user._id,
      plan: "Starter",
      status: "active",
      price: 0,
      currency: "INR",
      billingPeriod: "forever",
      features: [
        "Account & profile",
        "Access to free resources",
        "Product updates",
      ],
    });
    await defaultStarter.save();

    await User.findByIdAndUpdate(user._id, {
      currentPlan: "Starter",
      subscription: defaultStarter._id,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription cancelled successfully. Your account is on the Starter plan.",
      currentPlan: "Starter",
      subscription: defaultStarter,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to cancel subscription." },
      { status: 500 }
    );
  }
}
