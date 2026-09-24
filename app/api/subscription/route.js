import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getPlanEntitlements } from "@/lib/entitlements";

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

function isSubscriptionCurrentlyActive(subscription) {
  if (!subscription || subscription.status !== "active") return false;
  if (!subscription.endDate) return true;
  return new Date(subscription.endDate).getTime() > Date.now();
}

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

    const activeSubscription = subscriptions.find(
      isSubscriptionCurrentlyActive
    ) || null;

    const currentPlan = activeSubscription?.plan || "Starter";

    return NextResponse.json({
      success: true,
      currentPlan,
      entitlements: getPlanEntitlements(currentPlan),
      subscription: activeSubscription,
      history: subscriptions,
    });
  } catch (error) {
    console.error("Fetch subscription error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch subscription.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST currently supports only free Starter activation.
 * Paid Growth/Business subscriptions must be created after
 * successful payment verification/webhook processing.
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
          message: "Invalid plan selected.",
        },
        { status: 400 }
      );
    }

    if (plan !== "Starter") {
      return NextResponse.json(
        {
          success: false,
          code: "PAYMENT_REQUIRED",
          message:
            "Paid plans require verified payment. Please complete the payment flow before activating this plan.",
        },
        { status: 402 }
      );
    }

    await connectToDatabase();

    const existingActiveStarter = await Subscription.findOne({
      userId: user._id,
      plan: "Starter",
      status: "active",
    });

    if (existingActiveStarter) {
      await User.findByIdAndUpdate(user._id, {
        currentPlan: "Starter",
        subscription: existingActiveStarter._id,
      });

      return NextResponse.json({
        success: true,
        message: "Starter plan is already active.",
        currentPlan: "Starter",
        entitlements: getPlanEntitlements("Starter"),
        subscription: existingActiveStarter,
      });
    }

    await Subscription.updateMany(
      { userId: user._id, status: "active" },
      { status: "cancelled", endDate: new Date() }
    );

    const planConfig = PLAN_DEFINITIONS.Starter;

    const newSubscription = await Subscription.create({
      userId: user._id,
      plan: "Starter",
      status: "active",
      price: planConfig.price,
      currency: planConfig.currency,
      billingPeriod: planConfig.billingPeriod,
      features: planConfig.features,
      startDate: new Date(),
      paymentDetails: {
        gateway: "none",
        paidAmount: 0,
      },
    });

    await User.findByIdAndUpdate(user._id, {
      currentPlan: "Starter",
      subscription: newSubscription._id,
    });

    return NextResponse.json({
      success: true,
      message: "Starter plan activated.",
      currentPlan: "Starter",
      entitlements: getPlanEntitlements("Starter"),
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Update subscription error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update subscription.",
      },
      { status: 500 }
    );
  }
}
