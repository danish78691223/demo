import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/admin";

export async function GET(request) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;

  try {
    await connectToDatabase();

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    const counts = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const summary = {
      total: leads.length,
      new: 0,
      contacted: 0,
      discussion: 0,
      proposal: 0,
      won: 0,
      lost: 0,
    };

    counts.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(summary, item._id)) {
        summary[item._id] = item.count;
      }
    });

    return NextResponse.json({ success: true, leads, summary });
  } catch (error) {
    console.error("Admin leads GET error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load leads." },
      { status: 500 }
    );
  }
}
