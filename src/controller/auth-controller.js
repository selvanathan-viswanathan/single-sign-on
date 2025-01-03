import { v4 as uuidv4 } from "uuid";
import models from "../model";
import {
  AccessForbiddenError,
  onSuccess,
  UnauthorisedAccessError,
  ValidationError,
} from "../utilities/error-handler-util.js";
import { jwtVerify } from "../utilities/jwt-util.js";
const { ClientModel, AuthorizationCodeModel } = models;

export const login = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) {
      // throw not authorized error
      throw new UnauthorisedAccessError();
    }
    const { password } = req.body;
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorisedAccessError();
    }
    const token = await user.jwtSign({
      id: user._id,
      email: user.email,
    });
    return onSuccess(res, "Login successful", { token, user });
  } catch (error) {
    next(error);
  }
};

export const authorize = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1] || "";
    if (!token) {
      throw new AccessForbiddenError();
    }
    const isAuthorised = await jwtVerify(token);
    if (!isAuthorised) {
      throw new AccessForbiddenError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Authorization Endpoint
export const ssoAuthorize = async (req, res) => {
  const {
    client_id,
    redirect_uri,
    response_type,
    state,
    code_challenge,
    code_challenge_method,
  } = req.query;

  // Input validation
  if (
    !client_id ||
    !redirect_uri ||
    !response_type ||
    response_type !== "code"
  ) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (
    !code_challenge ||
    !code_challenge_method ||
    code_challenge_method !== "S256"
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing PKCE parameters" });
  }

  // Generate Authorization Code
  const authorizationCode = uuidv4();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes
  const client = await ClientModel.findOne({
    $and: [
      {
        clientId: client_id,
      },
      {
        redirectUri: {
          $in: [redirect_uri],
        },
      },
    ],
  });

  if (!client) {
    throw new ValidationError("Invalid Redirect URI", {
      field: "redirect_uri",
      reason: "URI not whitelisted",
    });
  }
  // Save to MongoDB
  const newAuthCode = new AuthorizationCodeModel({
    code: authorizationCode,
    codeChallenge: code_challenge,
    codeChallengeMethod: code_challenge_method,
    redirectUri: redirect_uri,
    hostUri: req.originalUrl,
    clientId: client._id,
    expiresAt,
  });

  await newAuthCode.save();

  // Redirect the client with authorization code
  res.redirect(`${redirect_uri}?code=${authorizationCode}&state=${state}`);
};

// Token Endpoint
export const token = async (req, res) => {
  const { code, client_id, client_secret, redirect_uri, code_verifier } =
    req.body;

  // Input validation
  if (!code || !client_id || !client_secret || !code_verifier) {
    throw new ValidationError("Missing required parameters");
  }

  // Retrieve authorization code from database
  const authorizationData = await AuthorizationCode.findOne({
    _id: code,
    clientId: client_id,
  });

  if (!authorizationData || authorizationData.expiresAt < new Date()) {
    throw new ValidationError("Invalid or expired authorization code");
  }

  // Validate PKCE code_verifier
  let validVerifier = false;
  if (authorizationData.codeChallengeMethod === "S256") {
    const expectedChallenge = crypto
      .createHash("sha256")
      .update(code_verifier)
      .digest("base64url"); // Use base64url encoding as per PKCE spec

    validVerifier = expectedChallenge === authorizationData.codeChallenge;
  }

  if (!validVerifier) {
    throw new ValidationError("Invalid code_verifier");
  }

  // Clean up the used authorization code (prevent reuse)
  await AuthorizationCode.deleteOne({ _id: code });

  // Generate a JWT token for the client
  const token = await jwtSign({
    clientId: client_id,
    scope: "openid", // You can add more details here
  });
  return onSuccess(res, "Successful", {
    access_token: token,
    token_type: "Bearer",
    expires_in: 3600, // 1 hour
  });
};
