import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { requireAdmin } from "../../../../lib/admin";

export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  await connectToDatabase();
  const products = await Product.find({}).sort({ category: 1, sortOrder: 1, createdAt: 1 }).lean();
  return NextResponse.json({ products });
}

export async function POST(request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { name, category, description, status, href, accent, icon, tags, showOnHome, showOnProducts, sortOrder } = body;
    if (!name?.trim() || !description?.trim() || !["learning","product","service"].includes(category)) {
      return NextResponse.json({ message: "Name, description and a valid category are required." }, { status: 400 });
    }
    await connectToDatabase();
    const product = await Product.create({
      name: name.trim(), category, description: description.trim(),
      status: status?.trim() || "LIVE", href: href?.trim() || "",
      accent: accent?.trim() || "cyan", icon: icon?.trim() || "spark",
      tags: Array.isArray(tags) ? tags.filter(Boolean).slice(0, 10) : [],
      showOnHome: showOnHome !== false, showOnProducts: showOnProducts !== false,
      sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Admin product create error:", error);
    return NextResponse.json({ message: "Unable to create product." }, { status: 500 });
  }
}
