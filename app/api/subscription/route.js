import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import User from "@/models/User";

const PLAN_DEFINITIONS = {
  Starter: {
    plan: "Starter",
    price: 0,
    currency: "INR",
    billingPeriod: "forever",
    features: [
      "Account & profile",
      "Access to free resources",
      "Product updates",
    ],
  },
  Growth: {
    plan: "Growth",
    price: 499,
    currency: "INR",
    billingPeriod: "monthly",
    features: [
      "Everything in Starter",
      "Premium learning access",
      "Member benefits",
      "Priority support",
    ],
  },
  Business: {
    plan: "Business",
    price: 0,
    currency: "INR",
    billingPeriod: "custom",
    features: [
      "Business services",
      "Web development support",
      "Marketing support",
      "Dedicated assistance",
    ],
  },
};

/**
 * GET: Retrieve active subscription and subscription history for authenticated user
 */
export async function GET(request) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please sign in to view subscription." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const subscriptions = await Subscription.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    const activeSubscription =
      subscriptions.find((s) => s.status === "active") || subscriptions[0] || null;

    return NextResponse.json({
      success: true,
      currentPlan: user.currentPlan || activeSubscription?.plan || "Starter",
      subscription: activeSubscription,
      history: subscriptions,
    });
  } catch (error) {
    console.error("Fetch subscription error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch subscription." },
      { status: 500 }
    );
  }
}

/**
 * POST: Subscribe to a plan or change plan
 */
export async function POST(request) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please sign in to manage your subscription." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { plan } = body;

    if (!plan || !PLAN_DEFINITIONS[plan]) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plan selected. Choose Starter, Growth, or Business.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const planConfig = PLAN_DEFINITIONS[plan];

    // Deactivate previous active subscriptions
    await Subscription.updateMany(
      { userId: user._id, status: "active" },
      { status: "cancelled", endDate: new Date() }
    );

    // Calculate dates
    const startDate = new Date();
    let endDate = null;
    if (plan === "Growth") {
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month validity
    } else if (plan === "Business") {
      endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // 1 year
    }

    // Create new subscription in MongoDB
    const newSubscription = new Subscription({
      userId: user._id,
      plan: planConfig.plan,
      status: "active",
      price: planConfig.price,
      currency: planConfig.currency,
      billingPeriod: planConfig.billingPeriod,
      features: planConfig.features,
      startDate,
      endDate,
      paymentDetails: {
        gateway: plan === "Starter" ? "free" : "direct",
        paidAmount: planConfig.price,
        paidAt: new Date(),
      },
    });

    await newSubscription.save();

    // Update user's current plan and link
    await User.findByIdAndUpdate(user._id, {
      currentPlan: plan,
      subscription: newSubscription._id,
    });

    return NextResponse.json({
      success: true,
      message: `Your subscription has been updated to the ${plan} plan!`,
      currentPlan: plan,
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Update subscription error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update subscription." },
      { status: 500 }
    );
  }
}
