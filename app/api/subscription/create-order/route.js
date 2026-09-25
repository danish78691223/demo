import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import { rateLimit } from "@/lib/security";

const PLAN_PRICES = { Growth: 499 };

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay credentials are not configured.");
  return { keyId, keySecret };
}

export async function POST(request) {
  const limited = rateLimit(request, "create-order", 8, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const user = await getAuthUser(request);
    if (!user) return NextResponse.json({ success: false, message: "Please sign in before starting payment." }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const plan = body?.plan;
    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ success: false, message: "Only the Growth plan is currently available for online payment." }, { status: 400 });
    }

    await connectToDatabase();

    const active = await Subscription.findOne({ userId: user._id, status: "active", plan });
    if (active && (!active.endDate || new Date(active.endDate) > new Date())) {
      return NextResponse.json({ success: true, alreadyActive: true, currentPlan: plan, subscription: active });
    }

    const { keyId, keySecret } = getRazorpayCredentials();
    const amount = PLAN_PRICES[plan] * 100;
    const receipt = `ww_${user._id.toString().slice(-12)}_${Date.now()}`;

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount, currency: "INR", receipt,
        notes: { userId: user._id.toString(), plan },
      }),
      cache: "no-store",
    });

    const order = await response.json();
    if (!response.ok || !order?.id) {
      console.error("Razorpay order creation failed:", order);
      return NextResponse.json({ success: false, message: "Unable to create payment order." }, { status: 502 });
    }

    const pendingSubscription = await Subscription.create({
      userId: user._id,
      plan,
      status: "pending",
      price: PLAN_PRICES[plan],
      currency: "INR",
      billingPeriod: "monthly",
      startDate: new Date(),
      features: ["Everything in Starter", "Premium learning access", "Member benefits", "Priority support"],
      paymentDetails: { gateway: "razorpay", orderId: order.id },
    });

    return NextResponse.json({
      success: true,
      keyId,
      order: { id: order.id, amount: order.amount, currency: order.currency },
      plan,
      subscriptionId: pendingSubscription._id,
      customer: { name: user.name, email: user.email, phone: user.phone || undefined },
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return NextResponse.json({ success: false, message: "Unable to create payment order. Please try again later." }, { status: 500 });
  }
}
