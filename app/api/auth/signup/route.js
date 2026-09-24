import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { signToken, AUTH_COOKIE_NAME, getCookieOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password } = body;

    // Validate input fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      currentPlan: "Starter",
    });

    await newUser.save();

    // Create default Starter subscription in MongoDB
    const defaultSubscription = new Subscription({
      userId: newUser._id,
      plan: "Starter",
      status: "active",
      price: 0,
      currency: "INR",
      billingPeriod: "forever",
      features: [
        "Account & profile",
        "Access to free resources",
        "Product updates",
      ],
    });

    await defaultSubscription.save();

    // Link subscription to user
    newUser.subscription = defaultSubscription._id;
    await newUser.save();

    // Construct response - session cookie will be established upon login
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully. Please sign in.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          currentPlan: newUser.currentPlan,
          subscription: defaultSubscription,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create account. Please try again.",
      },
      { status: 500 }
    );
  }
}
