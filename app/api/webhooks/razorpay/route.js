import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import WebhookEvent from "@/models/WebhookEvent";

function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (expected.length !== signature.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature, "utf8")
  );
}

export async function POST(request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("RAZORPAY_WEBHOOK_SECRET is not configured.");
      return NextResponse.json(
        { success: false, message: "Webhook is not configured." },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const eventId =
      request.headers.get("x-razorpay-event-id") ||
      request.headers.get("x-razorpay-event-id".toLowerCase());

    if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 401 }
      );
    }

    let payload;

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid webhook payload." },
        { status: 400 }
      );
    }

    const eventName = payload?.event;

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: "Missing webhook event id." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingEvent = await WebhookEvent.findOne({ eventId }).lean();

    if (existingEvent) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        message: "Webhook already processed.",
      });
    }

    await WebhookEvent.create({
      eventId,
      event: eventName || "unknown",
    });

    if (eventName === "payment.captured") {
      const payment = payload?.payload?.payment?.entity;

      const orderId = payment?.order_id;
      const paymentId = payment?.id;
      const amount = payment?.amount;
      const currency = payment?.currency;

      if (!orderId || !paymentId) {
        return NextResponse.json({
          success: true,
          processed: false,
          message: "Payment event did not contain an order or payment id.",
        });
      }

      if (amount !== 49900 || currency !== "INR") {
        return NextResponse.json({
          success: true,
          processed: false,
          message: "Payment amount/currency does not match Growth.",
        });
      }

      const subscription = await Subscription.findOne({
        status: "pending",
        plan: "Growth",
        "paymentDetails.orderId": orderId,
      });

      if (!subscription) {
        return NextResponse.json({
          success: true,
          processed: false,
          message: "No matching pending Growth subscription found.",
        });
      }

      if (subscription.paymentDetails?.paymentId === paymentId) {
        return NextResponse.json({
          success: true,
          processed: true,
          message: "Payment was already applied.",
        });
      }

      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      await Subscription.updateMany(
        {
          userId: subscription.userId,
          status: "active",
          _id: { $ne: subscription._id },
        },
        {
          status: "cancelled",
          endDate: startDate,
        }
      );

      subscription.status = "active";
      subscription.startDate = startDate;
      subscription.endDate = endDate;
      subscription.paymentDetails = {
        gateway: "razorpay",
        orderId,
        paymentId,
        paidAmount: 499,
        paidAt: new Date(),
      };

      await subscription.save();

      await User.findByIdAndUpdate(subscription.userId, {
        currentPlan: "Growth",
        subscription: subscription._id,
      });

      return NextResponse.json({
        success: true,
        processed: true,
        message: "Growth subscription activated from webhook.",
      });
    }

    return NextResponse.json({
      success: true,
      processed: false,
      message: `Event ${eventName || "unknown"} acknowledged.`,
    });
  } catch (error) {
    console.error("Razorpay webhook error:", error);

    return NextResponse.json(
      { success: false, message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
