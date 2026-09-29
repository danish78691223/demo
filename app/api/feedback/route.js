import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { rateLimit } from "@/lib/security";

const CATEGORIES = ["learning", "bug", "ui", "feature", "other"];

export async function POST(request) {
  const limited = rateLimit(request, "feedback", 5, 30 * 60 * 1000);
  if (limited) return limited;

  try {
    const body = await request.json().catch(() => ({}));
    const product = typeof body.product === "string" ? body.product.trim() : "";
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "SQLWhale user";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const page = typeof body.page === "string" ? body.page.trim() : "";
    const rating = Number(body.rating);
    const category = typeof body.category === "string" ? body.category : "learning";

    if (!product || product.length > 80 || !message || message.length > 3000) {
      return NextResponse.json({ success: false, message: "Product and feedback message are required." }, { status: 400 });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Please provide a rating from 1 to 5." }, { status: 400 });
    }

    if (!CATEGORIES.includes(category)) {
      return NextResponse.json({ success: false, message: "Invalid feedback category." }, { status: 400 });
    }

    await connectToDatabase();
    const feedback = await Feedback.create({
      product, userId, name: name || "SQLWhale user", email, rating, category, message, page,
    });

    return NextResponse.json({ success: true, feedback: { id: feedback._id } }, { status: 201 });
  } catch (error) {
    console.error("Feedback POST error:", error);
    return NextResponse.json({ success: false, message: "Unable to submit feedback." }, { status: 500 });
  }
}
