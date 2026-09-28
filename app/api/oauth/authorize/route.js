import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import OAuthAuthorizationCode from "@/models/OAuthAuthorizationCode";
import {
  createAuthorizationCode,
  getAuthorizationCodeExpiry,
  getOAuthClient,
  hashAuthorizationCode,
  isRegisteredRedirectUri,
} from "@/lib/oauth";

function oauthError(message, status = 400) {
  return NextResponse.json(
    { error: "invalid_request", error_description: message },
    { status }
  );
}

export async function GET(request) {
  const url = new URL(request.url);
  const responseType = url.searchParams.get("response_type");
  const clientId = url.searchParams.get("client_id");
  const redirectUri = url.searchParams.get("redirect_uri");
  const state = url.searchParams.get("state") || "";
  const codeChallenge = url.searchParams.get("code_challenge");
  const codeChallengeMethod = url.searchParams.get("code_challenge_method");
  const screen = url.searchParams.get("screen") === "signup" ? "signup" : "login";

  if (responseType !== "code") {
    return oauthError("Only response_type=code is supported.");
  }

  const client = getOAuthClient(clientId);

  if (!client || !isRegisteredRedirectUri(client, redirectUri)) {
    return oauthError("Invalid client or redirect URI.");
  }

  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return oauthError("PKCE with S256 is required.");
  }

  // An explicit signup request must always open the central signup form.
  // Otherwise an existing WEBXWHALE session would silently authorize the
  // already-authenticated account instead of letting the user create an account.
  if (screen === "signup") {
    const signupUrl = new URL("/signup", url.origin);
    signupUrl.searchParams.set("return_to", url.pathname + url.search);
    return NextResponse.redirect(signupUrl);
  }

  const user = await getAuthUser(request);

  if (!user) {
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("return_to", url.pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await connectToDatabase();

    const rawCode = createAuthorizationCode();

    await OAuthAuthorizationCode.create({
      codeHash: hashAuthorizationCode(rawCode),
      clientId,
      redirectUri,
      userId: user._id,
      codeChallenge,
      codeChallengeMethod,
      scope: "openid profile",
      expiresAt: getAuthorizationCodeExpiry(),
    });

    const callback = new URL(redirectUri);
    callback.searchParams.set("code", rawCode);
    if (state) callback.searchParams.set("state", state);

    return NextResponse.redirect(callback);
  } catch (error) {
    console.error("OAuth authorization error:", error);
    return oauthError("Unable to complete authorization.", 500);
  }
}
