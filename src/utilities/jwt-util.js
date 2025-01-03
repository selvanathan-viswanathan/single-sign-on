import fs from "fs";
// import jwt from "jsonwebtoken";
import { createPrivateKey, createPublicKey } from "crypto";
import { SignJWT, jwtVerify as verifyJWT } from "jose";
import path from "path";

// Load RSA keys
const privateKeyPEM = fs.readFileSync(
  path.resolve("src/keys/private.pem"),
  "utf8"
);
const privateKey = createPrivateKey(privateKeyPEM);

const publicKeyPEM = fs.readFileSync(
  path.resolve("src/keys/public.pem"),
  "utf8"
);
const publicKey = createPublicKey(publicKeyPEM);

// Utility to sign JWT
export const jwtSign = async (payload) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(process.env.JWT_ISSUER)
    .setAudience(process.env.JWT_AUDIENCE)
    .setExpirationTime("1h") // Set expiration time for 1 hour
    .setIssuedAt()
    .setSubject(payload["clientId"]) // Client ID as the subject
    .sign(privateKey); // Sign the JWT with the private key

  return jwt;
};

export const jwtVerify = async (token) => {
  try {
    const { payload } = await verifyJWT(token, publicKey, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      algorithms: ["RS256"],
    });
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
