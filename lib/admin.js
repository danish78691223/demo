import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function requireAdmin(request) {
  const user = await getAuthUser(request);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}
