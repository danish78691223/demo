import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { getOAuthClient, verifyOAuthAccessToken } from "@/lib/oauth";

export async function GET(request) {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return NextResponse.json(
      { error: "invalid_token", error_description: "Bearer token is required." },
      { status: 401 }
    );
  }

  const token = match[1];
  let decoded;

  try {
    const unverified = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8")
    );
    decoded = verifyOAuthAccessToken(token, unverified.clientId);
  } catch {
    decoded = null;
  }

  if (!decoded?.userId || !decoded?.clientId || !getOAuthClient(decoded.clientId)) {
    return NextResponse.json(
      { error: "invalid_token", error_description: "Invalid access token." },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();

    const user = await User.findById(decoded.userId).populate("subscription");

    if (!user) {
      return NextResponse.json(
        { error: "invalid_token", error_description: "User account not found." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        sub: user._id.toString(),
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company: user.company || "",
        bio: user.bio || "",
        role: user.role || "user",
        currentPlan: user.currentPlan || "Starter",
        subscription: user.subscription || null,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("OAuth userinfo error:", error);
    return NextResponse.json(
      { error: "server_error", error_description: "Unable to load user profile." },
      { status: 500 }
    );
  }
}
