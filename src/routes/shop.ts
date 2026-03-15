import { Hono } from "hono";
import { z } from "zod/v4";
import { prisma } from "../lib/prisma.js";
import type { AppEnv } from "../types.js";
import type { Prisma } from "@prisma/client";

type Shop = Prisma.ShopGetPayload<object>;

const shop = new Hono<AppEnv>();

// --- バリデーションスキーマ ---

const shopSchema = z.object({
  name: z.string().min(1, "店舗名を入力してください"),
  category: z.enum(["cabaret", "girlsBar", "snack", "lounge", "other"]),
  prefecture: z.string().min(1, "都道府県を入力してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  area: z.string().min(1, "エリアを入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  business_hours_text: z.string().min(1, "営業時間を入力してください"),
  price_min: z.number().int().nullable().optional(),
  price_max: z.number().int().nullable().optional(),
  logo_path: z.string().nullable().optional(),
  sns_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  regular_holiday: z.string().nullable().optional(),
  payment_methods: z.string().nullable().optional(),
});

// --- snake_case 変換 ---

function toSnakeCase(s: Shop) {
  return {
    id: s.id,
    user_id: s.userId,
    name: s.name,
    category: s.category,
    prefecture: s.prefecture,
    city: s.city,
    area: s.area,
    address: s.address,
    phone: s.phone,
    business_hours_text: s.businessHoursText,
    price_min: s.priceMin,
    price_max: s.priceMax,
    logo_path: s.logoPath,
    sns_url: s.snsUrl,
    description: s.description,
    regular_holiday: s.regularHoliday,
    payment_methods: s.paymentMethods,
    created_at: s.createdAt,
    updated_at: s.updatedAt,
  };
}

// --- GET / ---

shop.get("/", async (c) => {
  const userId = c.get("userId");

  const shopData = await prisma.shop.findUnique({ where: { userId } });
  if (!shopData) {
    return c.json({ message: "店舗情報が登録されていません" }, 404);
  }

  return c.json(toSnakeCase(shopData), 200);
});

// --- PUT / ---

shop.put("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const result = shopSchema.safeParse(body);

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

  const shopData = await prisma.shop.upsert({
    where: { userId },
    update: {
      name: data.name,
      category: data.category,
      prefecture: data.prefecture,
      city: data.city,
      area: data.area,
      address: data.address,
      phone: data.phone,
      businessHoursText: data.business_hours_text,
      priceMin: data.price_min ?? null,
      priceMax: data.price_max ?? null,
      logoPath: data.logo_path ?? null,
      snsUrl: data.sns_url ?? null,
      description: data.description ?? null,
      regularHoliday: data.regular_holiday ?? null,
      paymentMethods: data.payment_methods ?? null,
    },
    create: {
      userId,
      name: data.name,
      category: data.category,
      prefecture: data.prefecture,
      city: data.city,
      area: data.area,
      address: data.address,
      phone: data.phone,
      businessHoursText: data.business_hours_text,
      priceMin: data.price_min ?? null,
      priceMax: data.price_max ?? null,
      logoPath: data.logo_path ?? null,
      snsUrl: data.sns_url ?? null,
      description: data.description ?? null,
      regularHoliday: data.regular_holiday ?? null,
      paymentMethods: data.payment_methods ?? null,
    },
  });

  return c.json(toSnakeCase(shopData), 200);
});

export default shop;
