import mongoose from "mongoose";

const OAuthAuthorizationCodeSchema = new mongoose.Schema(
  {
    codeHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    redirectUri: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    codeChallenge: {
      type: String,
      required: true,
    },
    codeChallengeMethod: {
      type: String,
      enum: ["S256"],
      required: true,
    },
    scope: {
      type: String,
      default: "openid profile",
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

OAuthAuthorizationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default
  mongoose.models.OAuthAuthorizationCode ||
  mongoose.model("OAuthAuthorizationCode", OAuthAuthorizationCodeSchema);
