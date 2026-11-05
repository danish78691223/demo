import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const homeOnly = searchParams.get("home") === "true";

    const query = homeOnly ? { showOnHome: true } : { showOnProducts: true };
    if (category && ["learning", "product", "service"].includes(category)) {
      query.category = category;
    }


    const products = await Product.find(query)
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    // Always serve SQLwhale's current canonical domain, even when an older
    // URL is still stored in the products collection.
    const normalizedProducts = products.map((product) =>
      product.name?.trim().toLowerCase() === "sqlwhale"
        ? { ...product, href: "https://sqlwhale.webxwhale.com/" }
        : product
    );

    return NextResponse.json({ products: normalizedProducts });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ message: "Unable to load products." }, { status: 500 });
  }
}
