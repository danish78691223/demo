import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import OAuthAuthorizationCode from "@/models/OAuthAuthorizationCode";
import {
  getAccessTokenTtlSeconds,
  getOAuthClient,
  hashAuthorizationCode,
  isRegisteredRedirectUri,
  signOAuthAccessToken,
  verifyOAuthClientSecret,
  verifyPkce,
} from "@/lib/oauth";

function tokenError(error, description, status = 400) {
  return NextResponse.json(
    { error, error_description: description },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    }
  );
}

function getClientCredentials(request, body) {
  const authorization = request.headers.get("authorization");

  if (authorization && /^Basic\s+/i.test(authorization)) {
    try {
      const decoded = Buffer.from(
        authorization.replace(/^Basic\s+/i, ""),
        "base64"
      ).toString("utf8");
      const separator = decoded.indexOf(":");

      if (separator >= 0) {
        return {
          clientId: decodeURIComponent(decoded.slice(0, separator)),
          clientSecret: decodeURIComponent(decoded.slice(separator + 1)),
        };
      }
    } catch {
      // Fall through to body credentials.
    }
  }

  return {
    clientId: body.client_id,
    clientSecret: body.client_secret,
  };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    if (body.grant_type !== "authorization_code") {
      return tokenError(
        "unsupported_grant_type",
        "Only authorization_code is supported."
      );
    }

    const { clientId, clientSecret } = getClientCredentials(request, body);
    const client = getOAuthClient(clientId);

    if (!client || !verifyOAuthClientSecret(client, clientSecret)) {
      return tokenError(
        "invalid_client",
        "Client authentication failed.",
        401
      );
    }

    const redirectUri = body.redirect_uri;
    if (!isRegisteredRedirectUri(client, redirectUri)) {
      return tokenError("invalid_grant", "Invalid redirect URI.");
    }

    if (!body.code || !body.code_verifier) {
      return tokenError(
        "invalid_grant",
        "Authorization code and PKCE verifier are required."
      );
    }

    await connectToDatabase();

    const grant = await OAuthAuthorizationCode.findOneAndDelete({
      codeHash: hashAuthorizationCode(body.code),
      clientId,
      redirectUri,
      expiresAt: { $gt: new Date() },
    });

    if (!grant) {
      return tokenError(
        "invalid_grant",
        "Authorization code is invalid, expired, or already used."
      );
    }

    if (
      !verifyPkce(
        body.code_verifier,
        grant.codeChallenge,
        grant.codeChallengeMethod
      )
    ) {
      return tokenError("invalid_grant", "PKCE verification failed.");
    }

    const user = await User.findById(grant.userId).populate("subscription");

    if (!user) {
      return tokenError("invalid_grant", "User account no longer exists.");
    }

    const accessToken = signOAuthAccessToken({
      userId: user._id.toString(),
      clientId,
      scope: grant.scope,
    });

    return NextResponse.json(
      {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: getAccessTokenTtlSeconds(),
        scope: grant.scope,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("OAuth token error:", error);
    return tokenError(
      "server_error",
      "Unable to exchange authorization code.",
      500
    );
  }
}
