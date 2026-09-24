import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Subscription from "@/models/Subscription";
import User from "@/models/User";

const GROWTH_PRICE = 499;

export async function POST(request) {
  try {
    const user = await getAuthUser(request);
    if (!user) return NextResponse.json({ success: false, message: "Please sign in before verifying payment." }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, subscriptionId } = body;

    if (!orderId || !paymentId || !signature || !subscriptionId) {
      return NextResponse.json({ success: false, message: "Incomplete payment verification data." }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Razorpay credentials are not configured.");

    await connectToDatabase();

    const subscription = await Subscription.findOne({
      _id: subscriptionId, userId: user._id, status: "pending", plan: "Growth",
      "paymentDetails.orderId": orderId,
    });

    if (!subscription) {
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

    await Subscription.updateMany({ userId: user._id, status: "active" }, { status: "cancelled", endDate: startDate });

    subscription.status = "active";
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.paymentDetails = {
      gateway: "razorpay", orderId, paymentId,
      paidAmount: GROWTH_PRICE, paidAt: new Date(),
    };
    await subscription.save();

    await User.findByIdAndUpdate(user._id, { currentPlan: "Growth", subscription: subscription._id });

    return NextResponse.json({ success: true, message: "Growth plan activated successfully.", currentPlan: "Growth", subscription });
  } catch (error) {
    console.error("Verify Razorpay payment error:", error);
    return NextResponse.json({ success: false, message: error.message || "Payment verification failed." }, { status: 500 });
  }
}
