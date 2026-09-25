import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { rateLimit } from "@/lib/security";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const limited = rateLimit(request, "contact-lead", 5, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, service, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > 80 ||
      cleanEmail.length > 254 ||
      !EMAIL_RE.test(cleanEmail) ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 3000 ||
      ![
        "web-development",
        "software",
        "ai-ml",
        "consulting",
        "collaboration",
        "other",
      ].includes(service)
    ) {
      return NextResponse.json(
        { success: false, message: "Please check your form details and try again." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const lead = await Lead.create({
      name: cleanName,
      email: cleanEmail,
      service,
      message: cleanMessage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks — your enquiry has been received.",
        leadId: lead._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact lead error:", error);
    return NextResponse.json(
      { success: false, message: "We could not send your enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
