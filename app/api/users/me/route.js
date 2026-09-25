import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function GET(request) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
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
        role: user.role,
        currentPlan: user.currentPlan,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve user profile." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { name, phone, company, bio } = body;

    if (
      (name !== undefined && (typeof name !== "string" || name.length > 60)) ||
      (phone !== undefined && (typeof phone !== "string" || phone.length > 30)) ||
      (company !== undefined && (typeof company !== "string" || company.length > 120)) ||
      (bio !== undefined && (typeof bio !== "string" || bio.length > 1000))
    ) {
      return NextResponse.json(
        { success: false, message: "One or more profile fields are invalid or too long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (phone !== undefined) updateFields.phone = phone.trim();
    if (company !== undefined) updateFields.company = company.trim();
    if (bio !== undefined) updateFields.bio = bio.trim();

    const updatedUser = await User.findByIdAndUpdate(
      authUser._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate("subscription");

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        company: updatedUser.company || "",
        bio: updatedUser.bio || "",
        role: updatedUser.role,
        currentPlan: updatedUser.currentPlan,
        subscription: updatedUser.subscription,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile. Please try again later." },
      { status: 500 }
    );
  }
}
