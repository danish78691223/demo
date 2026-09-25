import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    service: {
      type: String,
      required: true,
      enum: [
        "web-development",
        "software",
        "ai-ml",
        "consulting",
        "collaboration",
        "other",
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "discussion", "proposal", "won", "lost"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
