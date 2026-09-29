import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    product: { type: String, required: true, trim: true, maxlength: 80, index: true },
    userId: { type: String, trim: true, maxlength: 120, default: "" },
    name: { type: String, trim: true, maxlength: 80, default: "SQLWhale user" },
    email: { type: String, lowercase: true, trim: true, maxlength: 254, default: "" },
    rating: { type: Number, min: 1, max: 5, required: true },
    category: {
      type: String,
      enum: ["learning", "bug", "ui", "feature", "other"],
      default: "learning",
      index: true,
    },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    page: { type: String, trim: true, maxlength: 500, default: "" },
    status: {
      type: String,
      enum: ["new", "reviewed", "archived"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

FeedbackSchema.index({ createdAt: -1 });

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
