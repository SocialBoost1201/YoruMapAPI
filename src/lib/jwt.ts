import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const TOKEN_EXPIRY = "30d";

interface TokenPayload {
  userId: string;
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId } satisfies TokenPayload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
