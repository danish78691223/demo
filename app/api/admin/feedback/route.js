import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { requireAdmin } from "@/lib/admin";

export async function GET(request) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;

  try {
    await connectToDatabase();
    const feedback = await Feedback.find({}).sort({ createdAt: -1 }).limit(200).lean();

    const summary = { total: feedback.length, new: 0, reviewed: 0, archived: 0 };
    feedback.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(summary, item.status)) summary[item.status] += 1;
    });

    return NextResponse.json({ success: true, feedback, summary });
  } catch (error) {
    console.error("Admin feedback GET error:", error);
    return NextResponse.json({ success: false, message: "Unable to load feedback." }, { status: 500 });
  }
}
