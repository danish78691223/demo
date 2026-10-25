import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    amount: { type: Number, required: true, min: 0.01 },
    category: {
      type: String,
      enum: ["hosting", "domain", "marketing", "software", "development", "hardware", "operations", "travel", "other"],
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "bank_transfer", "cash", "wallet", "other"],
      default: "other",
    },
    vendor: { type: String, default: "", trim: true, maxlength: 120 },
    reference: { type: String, default: "", trim: true, maxlength: 120 },
    notes: { type: String, default: "", trim: true, maxlength: 1000 },
    status: { type: String, enum: ["paid", "pending"], default: "paid", index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
