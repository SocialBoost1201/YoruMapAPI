import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { authMiddleware } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import shopRoutes from "./routes/shop.js";
import girlsRoutes from "./routes/girls.js";

const app = new Hono();

// --- グローバルミドルウェア ---

app.use("*", cors());

// --- グローバルエラーハンドラー ---

app.onError((err, c) => {
  console.error("Internal Server Error:", err);
  return c.json({ message: "サーバー内部エラーが発生しました" }, 500);
});

// --- ヘルスチェック ---

app.get("/", (c) => {
  return c.json({ status: "ok", service: "YoruMapAPI" });
});

// --- ルート登録 ---

app.route("/v1/auth", authRoutes);
app.use("/v1/shop/*", authMiddleware);
app.use("/v1/shop", authMiddleware);
app.route("/v1/shop/girls", girlsRoutes);
app.route("/v1/shop", shopRoutes);

export default app;
