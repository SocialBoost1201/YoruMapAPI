import { Hono } from "hono";
import { z } from "zod/v4";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { generateToken } from "../lib/jwt.js";

const auth = new Hono();

// --- バリデーションスキーマ ---

const signupSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上にしてください"),
});

const loginSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

// --- POST /signup ---

auth.post("/signup", async (c) => {
  const body = await c.req.json();
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join(".");
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return c.json({ message: "バリデーションエラー", errors }, 422);
  }

  const { email, password } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return c.json(
      { message: "バリデーションエラー", errors: { email: ["このメールアドレスは既に登録されています"] } },
      422,
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash },
  });

  const token = generateToken(user.id);
  return c.json({ token, user_id: user.id }, 201);
});

// --- POST /login ---

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join(".");
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return c.json({ message: "バリデーションエラー", errors }, 422);
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return c.json({ message: "メールアドレスまたはパスワードが正しくありません" }, 401);
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return c.json({ message: "メールアドレスまたはパスワードが正しくありません" }, 401);
  }

  const token = generateToken(user.id);
  return c.json({ token, user_id: user.id }, 200);
});

export default auth;
