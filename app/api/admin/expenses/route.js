import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Expense from "../../../../models/Expense";
import { requireAdmin } from "../../../../lib/admin";

const CATEGORIES = ["hosting", "domain", "marketing", "software", "development", "hardware", "operations", "travel", "other"];
const METHODS = ["upi", "card", "bank_transfer", "cash", "wallet", "other"];
const STATUSES = ["paid", "pending"];

export async function GET(request) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const month = url.searchParams.get("month") || "";
    const category = url.searchParams.get("category") || "";
    const status = url.searchParams.get("status") || "";
    const query = (url.searchParams.get("q") || "").trim().slice(0, 100);
    const filter = {};
    if (month) {
      if (!/^\d{4}-\d{2}$/.test(month)) return NextResponse.json({ message: "Invalid month." }, { status: 400 });
      const [year, monthNumber] = month.split("-").map(Number);
      const start = new Date(year, monthNumber - 1, 1);
      const end = new Date(year, monthNumber, 1);
      filter.date = { $gte: start, $lt: end };
    }
    if (category && CATEGORIES.includes(category)) filter.category = category;
    if (status && STATUSES.includes(status)) filter.status = status;
    if (query) {
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [{ title: { $regex: safeQuery, $options: "i" } }, { vendor: { $regex: safeQuery, $options: "i" } }, { reference: { $regex: safeQuery, $options: "i" } }];
    }
    const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 }).limit(1000).lean();
    const [allTime, currentMonth] = await Promise.all([
      Expense.aggregate([{ $group: { _id: "$status", amount: { $sum: "$amount" }, count: { $sum: 1 } } }]),
      (() => {
        const now = new Date();
        return Expense.aggregate([
          { $match: { date: { $gte: new Date(now.getFullYear(), now.getMonth(), 1), $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1) } } },
          { $group: { _id: "$status", amount: { $sum: "$amount" }, count: { $sum: 1 } } },
        ]);
      })(),
    ]);
    const summarize = (rows) => rows.reduce((acc, row) => {
      acc[row._id] = { amount: row.amount, count: row.count };
      return acc;
    }, {});
    return NextResponse.json({ expenses, summary: { allTime: summarize(allTime), currentMonth: summarize(currentMonth), filteredCount: expenses.length } });
  } catch (error) {
    console.error("Admin expenses GET error:", error);
    return NextResponse.json({ message: "Unable to load expenses." }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const amount = Number(body.amount);
    const category = String(body.category || "");
    const date = new Date(body.date);
    if (!title || title.length > 160) return NextResponse.json({ message: "Enter an expense title (max 160 characters)." }, { status: 400 });
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ message: "Amount must be greater than zero." }, { status: 400 });
    if (!CATEGORIES.includes(category)) return NextResponse.json({ message: "Choose a valid category." }, { status: 400 });
    if (!body.date || Number.isNaN(date.getTime())) return NextResponse.json({ message: "Enter a valid expense date." }, { status: 400 });
    if (body.paymentMethod && !METHODS.includes(body.paymentMethod)) return NextResponse.json({ message: "Choose a valid payment method." }, { status: 400 });
    if (body.status && !STATUSES.includes(body.status)) return NextResponse.json({ message: "Choose a valid payment status." }, { status: 400 });
    await connectToDatabase();
    const expense = await Expense.create({
      title, amount, category, date,
      paymentMethod: body.paymentMethod || "other",
      vendor: String(body.vendor || "").trim().slice(0, 120),
      reference: String(body.reference || "").trim().slice(0, 120),
      notes: String(body.notes || "").trim().slice(0, 1000),
      status: body.status || "paid",
      createdBy: user._id || user.id,
    });
    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("Admin expense create error:", error);
    return NextResponse.json({ message: "Unable to save expense." }, { status: 500 });
  }
}
