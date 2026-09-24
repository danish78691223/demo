import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDatabase from "./mongodb";
import User from "../models/User";
import Subscription from "../models/Subscription";

const JWT_SECRET = process.env.JWT_SECRET || "webwhale_default_jwt_secret_key_change_in_production";
export const AUTH_COOKIE_NAME = "webwhale_token";

/**
 * Sign JWT token for authenticated user
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Extract authenticated user from request cookies or headers
 */
export async function getAuthUser(req) {
  try {
    let token = null;

    // Check request cookies first
    if (req?.cookies?.get) {
      token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    }

    // Check next/headers cookies if not in request
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    }

    // Also support Authorization Bearer header
    if (!token && req?.headers) {
      const authHeader = req.headers.get?.("authorization") || req.headers?.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return null;
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId).populate("subscription");
    return user;
  } catch (err) {
    console.error("Error in getAuthUser:", err);
    return null;
  }
}

/**
 * Cookie options for setting HTTP-only session cookie
 */
export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  };
}
