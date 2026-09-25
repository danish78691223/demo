import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/admin";

const STATUSES = ["new", "contacted", "discussion", "proposal", "won", "lost"];

export async function PATCH(request, { params }) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    if (typeof body.status !== "string" || !STATUSES.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "Invalid lead status." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true, runValidators: true }
    ).lean();

    if (!lead) {
      return NextResponse.json(
        { success: false, message: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Admin lead update error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update lead." },
      { status: 500 }
    );
  }
}
