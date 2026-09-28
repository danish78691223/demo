import crypto from "crypto";
import jwt from "jsonwebtoken";

const AUTHORIZATION_CODE_TTL_MS = 5 * 60 * 1000;
const ACCESS_TOKEN_TTL = "15m";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }

  return secret;
}

function getClients() {
  const raw = process.env.WEBXWHALE_OAUTH_CLIENTS;

  if (!raw) {
    return [];
  }

  try {
    const clients = JSON.parse(raw);
    if (!Array.isArray(clients)) return [];
    return clients;
  } catch {
    throw new Error("WEBXWHALE_OAUTH_CLIENTS must be valid JSON.");
  }
}

export function getOAuthClient(clientId) {
  if (!clientId) return null;

  return (
    getClients().find(
      (client) =>
        client &&
        client.clientId === clientId &&
        Array.isArray(client.redirectUris)
    ) || null
  );
}

export function isRegisteredRedirectUri(client, redirectUri) {
  return Boolean(
    client &&
      typeof redirectUri === "string" &&
      client.redirectUris.includes(redirectUri)
  );
}

export function verifyOAuthClientSecret(client, secret) {
  if (!client?.clientSecret || typeof secret !== "string") return false;

  const expected = Buffer.from(client.clientSecret);
  const received = Buffer.from(secret);

  if (expected.length !== received.length) return false;

  return crypto.timingSafeEqual(expected, received);
}

export function createAuthorizationCode() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashAuthorizationCode(code) {
  return crypto.createHash("sha256").update(code, "utf8").digest("hex");
}

export function verifyPkce(codeVerifier, codeChallenge, method) {
  if (!codeVerifier || !codeChallenge || method !== "S256") return false;

  const calculated = crypto
    .createHash("sha256")
    .update(codeVerifier, "ascii")
    .digest("base64url");

  return calculated === codeChallenge;
}

export function signOAuthAccessToken({ userId, clientId, scope }) {
  return jwt.sign(
    {
      sub: userId,
      userId,
      clientId,
      scope,
      tokenType: "oauth_access",
    },
    getJwtSecret(),
    {
      expiresIn: ACCESS_TOKEN_TTL,
      issuer: "webxwhale",
      audience: clientId,
    }
  );
}

export function verifyOAuthAccessToken(token, clientId) {
  if (!token || typeof token !== "string" || !clientId) return null;

  try {
    return jwt.verify(token, getJwtSecret(), {
      issuer: "webxwhale",
      audience: clientId,
    });
  } catch {
    return null;
  }
}

export function getAuthorizationCodeExpiry() {
  return new Date(Date.now() + AUTHORIZATION_CODE_TTL_MS);
}

export function getAccessTokenTtlSeconds() {
  return 15 * 60;
}
