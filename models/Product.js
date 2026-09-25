import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    category: {
      type: String,
      enum: ["learning", "product", "service"],
      required: true,
      index: true,
    },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    status: { type: String, default: "LIVE", trim: true, maxlength: 40 },
    href: { type: String, default: "", trim: true, maxlength: 500 },
    accent: { type: String, default: "cyan", trim: true, maxlength: 30 },
    icon: { type: String, default: "spark", trim: true, maxlength: 30 },
    tags: { type: [String], default: [] },
    showOnHome: { type: Boolean, default: true, index: true },
    showOnProducts: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
