import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    plan: {
      type: String,
      enum: ["Starter", "Growth", "Business"],
      default: "Starter",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired", "pending"],
      default: "active",
    },
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    billingPeriod: {
      type: String,
      default: "monthly",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    features: [
      {
        type: String,
      },
    ],
    paymentDetails: {
      gateway: {
        type: String,
        default: "none", // e.g., "razorpay", "stripe", "none"
      },
      paymentId: String,
      orderId: String,
      paidAmount: Number,
      paidAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
