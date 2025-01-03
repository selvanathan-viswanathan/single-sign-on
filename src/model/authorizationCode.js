import * as mongoose from "mongoose";

const { Schema } = mongoose;
const authorizationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  codeChallenge: {
    type: String,
    required: true,
  },
  codeChallengeMethod: {
    type: String,
    required: true,
  },
  redirectUri: {
    type: String,
    required: true,
  },
  hostUri: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: String,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  // userId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    default: "self",
  },
  createdBy: {
    type: String,
    default: "self",
  },
});

authorizationCodeSchema.pre(
  "save",
  function authorizationCodePreSaveHook(next) {
    this.updatedAt = Date.now();
    next();
  }
);
const AuthorizationCodeModel = mongoose.model(
  "AuthorizationCodeModel",
  authorizationCodeSchema
);

export default AuthorizationCodeModel;
