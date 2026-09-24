import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Clear session cookie
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });

  return response;
}
