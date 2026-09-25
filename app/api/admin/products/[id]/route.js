import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";
import { requireAdmin } from "../../../../../lib/admin";

export async function PATCH(request, { params }) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
    }
    const body = await request.json();
    const allowed = ["name","category","description","status","href","accent","icon","tags","showOnHome","showOnProducts","sortOrder"];
    const update = {};
    for (const key of allowed) if (body[key] !== undefined) update[key] = body[key];
    if (update.category && !["learning","product","service"].includes(update.category)) {
      return NextResponse.json({ message: "Invalid category." }, { status: 400 });
    }
    await connectToDatabase();
    const product = await Product.findByIdAndUpdate(params.id, update, { new: true, runValidators: true }).lean();
    if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Admin product update error:", error);
    return NextResponse.json({ message: "Unable to update product." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
    }
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin product delete error:", error);
    return NextResponse.json({ message: "Unable to delete product." }, { status: 500 });
  }
}
