import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "../../../../../lib/mongodb";
import Expense from "../../../../../models/Expense";
import { requireAdmin } from "../../../../../lib/admin";

const ALLOWED = ["title", "amount", "category", "date", "paymentMethod", "vendor", "reference", "notes", "status"];
const CATEGORIES = ["hosting", "domain", "marketing", "software", "development", "hardware", "operations", "travel", "other"];
const METHODS = ["upi", "card", "bank_transfer", "cash", "wallet", "other"];
const STATUSES = ["paid", "pending"];

export async function PATCH(request, { params }) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json({ message: "Invalid expense id." }, { status: 400 });
    const body = await request.json();
    const update = {};
    for (const key of ALLOWED) if (body[key] !== undefined) update[key] = body[key];
    if (update.title !== undefined) {
      update.title = String(update.title).trim();
      if (!update.title || update.title.length > 160) return NextResponse.json({ message: "Enter a valid title." }, { status: 400 });
    }
    if (update.amount !== undefined && (!Number.isFinite(Number(update.amount)) || Number(update.amount) <= 0)) return NextResponse.json({ message: "Amount must be greater than zero." }, { status: 400 });
    if (update.category !== undefined && !CATEGORIES.includes(update.category)) return NextResponse.json({ message: "Invalid category." }, { status: 400 });
    if (update.paymentMethod !== undefined && !METHODS.includes(update.paymentMethod)) return NextResponse.json({ message: "Invalid payment method." }, { status: 400 });
    if (update.status !== undefined && !STATUSES.includes(update.status)) return NextResponse.json({ message: "Invalid payment status." }, { status: 400 });
    if (update.date !== undefined) {
      const parsed = new Date(update.date);
      if (!update.date || Number.isNaN(parsed.getTime())) return NextResponse.json({ message: "Invalid date." }, { status: 400 });
      update.date = parsed;
    }
    if (update.vendor !== undefined) update.vendor = String(update.vendor).trim().slice(0, 120);
    if (update.reference !== undefined) update.reference = String(update.reference).trim().slice(0, 120);
    if (update.notes !== undefined) update.notes = String(update.notes).trim().slice(0, 1000);
    await connectToDatabase();
    const expense = await Expense.findByIdAndUpdate(params.id, update, { new: true, runValidators: true }).lean();
    if (!expense) return NextResponse.json({ message: "Expense not found." }, { status: 404 });
    return NextResponse.json({ expense });
  } catch (error) {
    console.error("Admin expense update error:", error);
    return NextResponse.json({ message: "Unable to update expense." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await requireAdmin(request);
  if (!user) return response;
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json({ message: "Invalid expense id." }, { status: 400 });
    await connectToDatabase();
    const expense = await Expense.findByIdAndDelete(params.id);
    if (!expense) return NextResponse.json({ message: "Expense not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin expense delete error:", error);
    return NextResponse.json({ message: "Unable to delete expense." }, { status: 500 });
  }
}
