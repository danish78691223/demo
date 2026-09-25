import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { signToken, AUTH_COOKIE_NAME, getCookieOptions } from "@/lib/auth";
import { rateLimit } from "@/lib/security";

export async function POST(request) {
  const limited = rateLimit(request, "login", 10, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 128) {
      return NextResponse.json(
        { success: false, message: "Invalid login details." },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();

    // Query user and explicitly select password field
    const user = await User.findOne({ email: normalizedEmail })
      .select("+password")
      .populate("subscription");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company: user.company || "",
        bio: user.bio || "",
        currentPlan: user.currentPlan,
        subscription: user.subscription,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, getCookieOptions());

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to sign in. Please try again later.",
      },
      { status: 500 }
    );
  }
}
