import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Visitor from "../../../../models/Visitor";
import Lead from "../../../../models/Lead";
import { requireAdmin } from "../../../../lib/admin";

function monthRange(value) {
  if (typeof value !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return null;
  const start = new Date(value + "-01T00:00:00.000Z");
  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1));
  return { start, end, month: value };
}

export async function GET(request) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;

  try {
    const { searchParams } = new URL(request.url);
    const range = monthRange(searchParams.get("month"));
    if (!range) return NextResponse.json({ message: "Select a valid month in YYYY-MM format." }, { status: 400 });

    await connectToDatabase();
    const visitMatch = {
      createdAt: { $gte: range.start, $lt: range.end },
      $or: [{ eventType: "visit" }, { eventType: { $exists: false } }],
    };
    const clickMatch = { createdAt: { $gte: range.start, $lt: range.end }, eventType: "click" };
    const [totalVisits, uniqueIds, leads, dailyTrend, pages, productClicks, currentTodayIds] = await Promise.all([
      Visitor.countDocuments(visitMatch),
      Visitor.distinct("visitorId", visitMatch),
      Lead.find({ createdAt: { $gte: range.start, $lt: range.end } }).sort({ createdAt: -1 }).lean(),
      Visitor.aggregate([
        { $match: visitMatch },
        { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "UTC" } },
          visits: { $sum: 1 },
          uniqueIds: { $addToSet: "$visitorId" },
        } },
        { $project: { _id: 0, date: "$_id", visits: 1, unique: { $size: "$uniqueIds" } } },
        { $sort: { date: 1 } },
      ]),
      Visitor.aggregate([
        { $match: visitMatch },
        { $group: { _id: "$page", visits: { $sum: 1 }, uniqueIds: { $addToSet: "$visitorId" } } },
        { $project: { _id: 0, page: "$_id", visits: 1, unique: { $size: "$uniqueIds" } } },
        { $sort: { visits: -1 } },
      ]),
      Visitor.aggregate([
        { $match: clickMatch },
        { $group: { _id: "$targetId", name: { $first: "$targetName" }, clicks: { $sum: 1 } } },
        { $project: { _id: 0, targetId: "$_id", name: 1, clicks: 1 } },
        { $sort: { clicks: -1 } },
      ]),
      Visitor.distinct("visitorId", {
        $or: [{ eventType: "visit" }, { eventType: { $exists: false } }],
        createdAt: { $gte: new Date(new Date().toISOString().slice(0, 10) + "T00:00:00.000Z") },
      }),
    ]);

    const monthIsCurrent = range.month === new Date().toISOString().slice(0, 7);
    const summary = [
      { metric: "Unique visitors", value: uniqueIds.length },
      { metric: "Visits", value: totalVisits },
      { metric: "Today's visitors", value: monthIsCurrent ? currentTodayIds.length : "Not applicable for a past month" },
      { metric: "Total leads", value: leads.length },
      { metric: "New leads", value: leads.filter((lead) => lead.status === "new").length },
    ];

    return NextResponse.json({
      success: true,
      month: range.month,
      summary,
      dailyTrend,
      pages,
      productClicks,
      leads: leads.map((lead) => ({
        name: lead.name,
        email: lead.email,
        source: lead.source || "WEBXWHALE",
        service: lead.service,
        message: lead.message,
        status: lead.status,
        createdAt: lead.createdAt,
      })),
    });
  } catch (error) {
    console.error("Admin export GET error:", error);
    return NextResponse.json({ message: "Unable to prepare monthly export." }, { status: 500 });
  }
}
