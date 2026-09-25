import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    eventType: { type: String, enum: ["visit", "click"], default: "visit", index: true },
    targetId: { type: String, default: "", index: true },
    targetName: { type: String, default: "", maxlength: 150 },
    page: { type: String, required: true, index: true },
    referrer: { type: String, default: "", maxlength: 500 },
    userAgent: { type: String, default: "", maxlength: 1000 },
    ipHash: { type: String, default: "" },
  },
  { timestamps: true }
);

VisitorSchema.index({ createdAt: -1 });

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
