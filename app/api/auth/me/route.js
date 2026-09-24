import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company: user.company || "",
        bio: user.bio || "",
        role: user.role || "user",
        currentPlan: user.currentPlan || "Starter",
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to authenticate." },
      { status: 500 }
    );
  }
}
