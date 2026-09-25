import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Visitor from "../../../../models/Visitor";
import { requireAdmin } from "../../../../lib/admin";

export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  try {
    await connectToDatabase();
    const [totalEvents, uniqueVisitors, todayEvents, todayUnique, pages] = await Promise.all([
      Visitor.countDocuments({}),
      Visitor.distinct("visitorId"),
      Visitor.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }),
      Visitor.distinct("visitorId", { createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }),
      Visitor.aggregate([
        { $group: { _id: "$page", visits: { $sum: 1 }, unique: { $addToSet: "$visitorId" } } },
        { $project: { _id: 0, page: "$_id", visits: 1, unique: { $size: "$unique" } } },
        { $sort: { visits: -1 } },
        { $limit: 20 },
      ]),
    ]);
    return NextResponse.json({
      totalVisits: totalEvents,
      uniqueVisitors: uniqueVisitors.length,
      todayVisits: todayEvents,
      todayVisitors: todayUnique.length,
      pages,
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ message: "Unable to load analytics." }, { status: 500 });
  }
}
