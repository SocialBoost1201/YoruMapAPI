import { Hono } from "hono";
import { z } from "zod/v4";
import { prisma } from "../lib/prisma.js";
import type { AppEnv } from "../types.js";
import type { Prisma } from "@prisma/client";

type Girl = Prisma.GirlGetPayload<object>;

const girls = new Hono<AppEnv>();

// --- バリデーションスキーマ ---

const createGirlSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  age: z.number().int().nullable().optional(),
  short_bio: z.string().nullable().optional(),
  rank_name: z.string().nullable().optional(),
});

const updateGirlSchema = z.object({
  name: z.string().min(1, "名前を入力してください").optional(),
  age: z.number().int().nullable().optional(),
  short_bio: z.string().nullable().optional(),
  rank_name: z.string().nullable().optional(),
  moderation_status: z.enum(["approved", "pending", "rejected"]).optional(),
});

// --- snake_case 変換 ---

function toSnakeCase(girl: Girl) {
  return {
    id: girl.id,
    shop_id: girl.shopId,
    name: girl.name,
    age: girl.age,
    short_bio: girl.shortBio,
    rank_name: girl.rankName,
    moderation_status: girl.moderationStatus,
    created_at: girl.createdAt,
    updated_at: girl.updatedAt,
  };
}

// --- ユーザーの店舗を取得するヘルパー ---

async function getUserShop(userId: string) {
  return prisma.shop.findUnique({ where: { userId } });
}

// --- GET / ---

girls.get("/", async (c) => {
  const userId = c.get("userId");

  const shop = await getUserShop(userId);
  if (!shop) {
    return c.json({ message: "店舗情報が登録されていません" }, 404);
  }

  const girlsList = await prisma.girl.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "asc" },
  });

  return c.json(
    {
      items: girlsList.map((g) => toSnakeCase(g)),
      total: girlsList.length,
    },
    200,
  );
});

// --- POST / ---

girls.post("/", async (c) => {
  const userId = c.get("userId");

  const shop = await getUserShop(userId);
  if (!shop) {
    return c.json({ message: "店舗情報が登録されていません" }, 404);
  }

  const body = await c.req.json();
  const result = createGirlSchema.safeParse(body);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join(".");
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return c.json({ message: "バリデーションエラー", errors }, 422);
  }

  const data = result.data;

  const girl = await prisma.girl.create({
    data: {
      shopId: shop.id,
      name: data.name,
      age: data.age ?? null,
      shortBio: data.short_bio ?? null,
      rankName: data.rank_name ?? null,
    },
  });

  return c.json(toSnakeCase(girl), 201);
});

// --- PUT /:id ---

girls.put("/:id", async (c) => {
  const userId = c.get("userId");
  const girlId = c.req.param("id");

  const shop = await getUserShop(userId);
  if (!shop) {
    return c.json({ message: "店舗情報が登録されていません" }, 404);
  }

  const existing = await prisma.girl.findUnique({ where: { id: girlId } });
  if (!existing || existing.shopId !== shop.id) {
    return c.json({ message: "キャストが見つかりません" }, 404);
  }

  const body = await c.req.json();
  const result = updateGirlSchema.safeParse(body);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join(".");
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return c.json({ message: "バリデーションエラー", errors }, 422);
  }

  const data = result.data;

  const updated = await prisma.girl.update({
    where: { id: girlId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.age !== undefined && { age: data.age }),
      ...(data.short_bio !== undefined && { shortBio: data.short_bio }),
      ...(data.rank_name !== undefined && { rankName: data.rank_name }),
      ...(data.moderation_status !== undefined && { moderationStatus: data.moderation_status }),
    },
  });

  return c.json(toSnakeCase(updated), 200);
});

// --- DELETE /:id ---

girls.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const girlId = c.req.param("id");

  const shop = await getUserShop(userId);
  if (!shop) {
    return c.json({ message: "店舗情報が登録されていません" }, 404);
  }

  const existing = await prisma.girl.findUnique({ where: { id: girlId } });
  if (!existing || existing.shopId !== shop.id) {
    return c.json({ message: "キャストが見つかりません" }, 404);
  }

  await prisma.girl.delete({ where: { id: girlId } });

  return c.body(null, 204);
});

export default girls;
