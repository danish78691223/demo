import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Visitor from "../../../../models/Visitor";
import { requireAdmin } from "../../../../lib/admin";

export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    await connectToDatabase();

    const today = new Date();
    const startToday = new Date(today);
    startToday.setHours(0, 0, 0, 0);

    const trendStart = new Date(startToday);
    trendStart.setDate(trendStart.getDate() - 13);

    const [totalVisits, uniqueVisitors, todayVisits, todayVisitors, pages, daily, productClicks, totalClicks] =
      await Promise.all([
        Visitor.countDocuments({ eventType: "visit" }),
        Visitor.distinct("visitorId", { eventType: "visit" }),
        Visitor.countDocuments({ eventType: "visit", createdAt: { $gte: startToday } }),
        Visitor.distinct("visitorId", { eventType: "visit", createdAt: { $gte: startToday } }),
        Visitor.aggregate([
          { $match: { eventType: "visit" } },
          { $group: { _id: "$page", visits: { $sum: 1 }, unique: { $addToSet: "$visitorId" } } },
          { $project: { _id: 0, page: "$_id", visits: 1, unique: { $size: "$unique" } } },
          { $sort: { visits: -1 } },
          { $limit: 20 },
        ]),
        Visitor.aggregate([
          { $match: { eventType: "visit", createdAt: { $gte: trendStart } } },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              visits: { $sum: 1 },
              uniqueIds: { $addToSet: "$visitorId" },
            },
          },
          { $project: { _id: 0, date: "$_id", visits: 1, unique: { $size: "$uniqueIds" } } },
          { $sort: { date: 1 } },
        ]),
        Visitor.aggregate([
          { $match: { eventType: "click", targetId: { $ne: "" } } },
          { $group: { _id: "$targetId", name: { $first: "$targetName" }, clicks: { $sum: 1 } } },
          { $project: { _id: 0, targetId: "$_id", name: 1, clicks: 1 } },
          { $sort: { clicks: -1 } },
          { $limit: 20 },
        ]),
        Visitor.countDocuments({ eventType: "click" }),
      ]);

    const dailyMap = new Map(daily.map((item) => [item.date, item]));
    const dailyTrend = Array.from({ length: 14 }, (_, index) => {
      const date = new Date(trendStart);
      date.setDate(trendStart.getDate() + index);
      const key = date.toISOString().slice(0, 10);
      const item = dailyMap.get(key);
      return { date: key, visits: item?.visits || 0, unique: item?.unique || 0 };
    });

    return NextResponse.json({
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      todayVisits,
      todayVisitors: todayVisitors.length,
      pages,
      dailyTrend,
      productClicks,
      totalClicks,
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ message: "Unable to load analytics." }, { status: 500 });
  }
}
