import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { requireAdmin } from "@/lib/admin";

const STATUSES = ["new", "reviewed", "archived"];

export async function PATCH(request, { params }) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    if (typeof body.status !== "string" || !STATUSES.includes(body.status)) {
      return NextResponse.json({ success: false, message: "Invalid feedback status." }, { status: 400 });
    }

    await connectToDatabase();
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true, runValidators: true }
    ).lean();

    if (!feedback) {
      return NextResponse.json({ success: false, message: "Feedback not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("Admin feedback update error:", error);
    return NextResponse.json({ success: false, message: "Unable to update feedback." }, { status: 500 });
  }
}
