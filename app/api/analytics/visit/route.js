import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "../../../../lib/mongodb";
import Visitor from "../../../../models/Visitor";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = typeof body.visitorId === "string" ? body.visitorId.slice(0, 100) : "";
    const page = typeof body.page === "string" ? body.page.slice(0, 200) : "/";
    const eventType = body.eventType === "click" ? "click" : "visit";
    const targetId = typeof body.targetId === "string" ? body.targetId.slice(0, 100) : "";
    const targetName = typeof body.targetName === "string" ? body.targetName.slice(0, 150) : "";
    if (!visitorId) return NextResponse.json({ message: "Visitor id is required." }, { status: 400 });

    const forwarded = request.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0].trim();
    const ipHash = ip ? crypto.createHash("sha256").update(ip).digest("hex") : "";

    await connectToDatabase();
    await Visitor.create({
      visitorId, eventType, targetId, targetName, page,
      referrer: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || "",
      ipHash,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ message: "Unable to record visit." }, { status: 500 });
  }
}
