import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    ...getCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
