import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

// Load RSA keys
const privateKey = fs.readFileSync(
  path.resolve("src/keys/private.key"),
  "utf8"
);
const publicKey = fs.readFileSync(path.resolve("src/keys/public.key"), "utf8");

// Generate JWT
export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
};

// Verify JWT
export const verifyToken = (token) =>
  jwt.verify(token, publicKey, { algorithms: ["RS256"] });
