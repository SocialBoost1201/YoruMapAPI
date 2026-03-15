import type { Context, Next } from "hono";
import { verifyToken } from "../lib/jwt.js";
import type { AppEnv } from "../types.js";

export async function authMiddleware(c: Context<AppEnv>, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "認証トークンが必要です" }, 401);
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);
    c.set("userId", payload.userId);
    await next();
  } catch {
    return c.json({ message: "無効なトークンです" }, 401);
  }
}
