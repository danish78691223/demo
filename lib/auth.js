import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDatabase from "./mongodb";
import User from "../models/User";

export const AUTH_COOKIE_NAME = "webwhale_token";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured in the production environment.");
  }

  if (secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }

  return secret;
}

export function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "30d",
    issuer: "webwhale",
    audience: "webwhale-app",
  });
}

export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;

  try {
    return jwt.verify(token, getJwtSecret(), {
      issuer: "webwhale",
      audience: "webwhale-app",
    });
  } catch {
    return null;
  }
}

export async function getAuthUser(req) {
  try {
    let token = null;

    if (req?.cookies?.get) {
      token = req.cookies.get(AUTH_COOKIE_NAME)?.value || null;
    }

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(AUTH_COOKIE_NAME)?.value || null;
    }

    if (!token && req?.headers) {
      const authHeader =
        req.headers.get?.("authorization") || req.headers?.authorization;

      if (typeof authHeader === "string" && /^Bearer\s+/i.test(authHeader)) {
        token = authHeader.replace(/^Bearer\s+/i, "").trim();
      }
    }

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== "object" || !decoded.userId) return null;

    await connectToDatabase();

    const user = await User.findById(decoded.userId).populate("subscription");
    return user || null;
  } catch (err) {
    console.error("Error in getAuthUser:", err);
    return null;
  }
}

export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
}
