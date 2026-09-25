import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { rateLimit } from "@/lib/security";

const GROWTH_PRICE = 499;

export async function POST(request) {
  const limited = rateLimit(request, "verify-payment", 10, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const user = await getAuthUser(request);
    if (!user) return NextResponse.json({ success: false, message: "Please sign in before verifying payment." }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, subscriptionId } = body;

    if (
      typeof orderId !== "string" ||
      typeof paymentId !== "string" ||
      typeof signature !== "string" ||
      typeof subscriptionId !== "string" ||
      orderId.length > 100 ||
      paymentId.length > 100 ||
      signature.length > 128 ||
      subscriptionId.length > 100
    ) {
      return NextResponse.json({ success: false, message: "Invalid payment verification data." }, { status: 400 });
    }

    if (!orderId || !paymentId || !signature || !subscriptionId) {
      return NextResponse.json({ success: false, message: "Incomplete payment verification data." }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Razorpay credentials are not configured.");

    await connectToDatabase();

    const pendingSubscription = await Subscription.findOne({
      _id: subscriptionId, userId: user._id, status: "pending", plan: "Growth",
      "paymentDetails.orderId": orderId,
    });

    if (!pendingSubscription) {
      const alreadyApplied = await Subscription.findOne({
        userId: user._id,
        plan: "Growth",
        status: "active",
        "paymentDetails.orderId": orderId,
        "paymentDetails.paymentId": paymentId,
      });

      if (alreadyApplied) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          message: "Payment was already applied.",
          currentPlan: "Growth",
          subscription: alreadyApplied,
        });
      }

      return NextResponse.json({ success: false, message: "Payment order could not be matched to your account." }, { status: 400 });
    }

    const expectedSignature = crypto.createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
    if (expectedSignature.length !== signature.length ||
        !crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
      return NextResponse.json({ success: false, message: "Payment signature verification failed." }, { status: 400 });
    }

    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: {
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
      cache: "no-store",
    });
    const payment = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error("Razorpay payment lookup failed:", payment);
      return NextResponse.json({ success: false, message: "Unable to confirm payment status." }, { status: 502 });
    }

    if (payment.order_id !== orderId || payment.amount !== GROWTH_PRICE * 100 || payment.currency !== "INR" || payment.status !== "captured") {
      return NextResponse.json({ success: false, message: "Payment has not been captured or does not match this order." }, { status: 400 });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const activatedSubscription = await Subscription.findOneAndUpdate(
      {
        _id: pendingSubscription._id,
        userId: user._id,
        status: "pending",
        plan: "Growth",
        "paymentDetails.orderId": orderId,
      },
      {
        $set: {
          status: "active",
          startDate,
          endDate,
          paymentDetails: {
            gateway: "razorpay",
            orderId,
            paymentId,
            paidAmount: GROWTH_PRICE,
            paidAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!activatedSubscription) {
      const alreadyApplied = await Subscription.findOne({
        userId: user._id,
        plan: "Growth",
        status: "active",
        "paymentDetails.orderId": orderId,
        "paymentDetails.paymentId": paymentId,
      });

      if (alreadyApplied) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          message: "Payment was already applied.",
          currentPlan: "Growth",
          subscription: alreadyApplied,
        });
      }

      return NextResponse.json(
        { success: false, message: "Payment is being processed. Please refresh your subscription shortly." },
        { status: 409 }
      );
    }

    await Subscription.updateMany(
      {
        userId: user._id,
        status: "active",
        _id: { $ne: activatedSubscription._id },
      },
      { status: "cancelled", endDate: startDate }
    );

    await User.findByIdAndUpdate(user._id, {
      currentPlan: "Growth",
      subscription: activatedSubscription._id,
    });

    return NextResponse.json({
      success: true,
      message: "Growth plan activated successfully.",
      currentPlan: "Growth",
      subscription: activatedSubscription,
    });
  } catch (error) {
    console.error("Verify Razorpay payment error:", error);
    return NextResponse.json({ success: false, message: "Payment verification failed. Please try again later." }, { status: 500 });
  }
}
