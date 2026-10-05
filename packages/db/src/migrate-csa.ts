/**
 * CSA Laser catalog migration.
 *
 * - Deletes all existing product data and old categories/brands.
 * - Inserts the 4 CSA categories, 8 brands and 16 launch products from
 *   catalog-csa.ts, plus the 9 clinic services into the `services` table.
 * - Uploads a branded placeholder image per product to Supabase
 *   (`product-images/{categorySlug}/{imageFile}`) when configured.
 * - Updates settings (BDT, CSA Laser branding) and homepage banners.
 *
 * Run: bun run --env-file=../../.env --cwd packages/db migrate-csa
 *   (or add a root script). Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *   for image upload — products are still inserted without images otherwise.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { eq, sql } from "drizzle-orm";
import { db } from "./index.js";
import {
  banners,
  brands,
  categories,
  productImages,
  productSpecs,
  products,
  services,
  settings,
} from "./schema.js";
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  slugFor,
  type CatalogProduct,
} from "./catalog-csa.js";
import { SERVICES } from "./services-csa.js";

const BUCKET = "product-images";

export const DELIVERY_NOTE = [
  "Delivery inside Dhaka: 24-48 hours",
  "Delivery outside Dhaka: 2-5 days",
  "Cash on Delivery available",
  "Easy return within 7 days for manufacturing defects",
].join("\n");

const CATEGORY_EMOJI: Record<string, string> = {
  "skin-care": "✨",
  "body-care": "🧴",
  supplement: "💊",
  medicine: "🩺",
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
    : null;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function placeholderSvg(p: CatalogProduct, brandName: string): string {
  const emoji = CATEGORY_EMOJI[p.categorySlug] || "📦";
  const name = esc(p.name);
  const footer = esc(`${brandName} · CSA Laser`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <rect width="1200" height="1200" fill="#ffffff"/>
  <circle cx="600" cy="520" r="360" fill="#f4f6fb"/>
  <text x="600" y="560" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif" font-size="230" text-anchor="middle">${emoji}</text>
  <text x="600" y="800" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700" fill="#0b1220" text-anchor="middle">${name}</text>
  <text x="600" y="872" font-family="Inter, Arial, sans-serif" font-size="34" fill="#64748b" text-anchor="middle">${footer}</text>
</svg>`;
}

function buildFullDescription(p: CatalogProduct, brandName: string, categoryName: string): string {
  const specs = [
    { key: "Brand", value: brandName },
    { key: "Category", value: categoryName },
    { key: "Model", value: p.model },
    ...p.specs,
    ...(p.color ? [{ key: "Color", value: p.color }] : []),
    { key: "Warranty", value: "100% Authentic Product" },
    { key: "Condition", value: "Brand New" },
  ];
  const lines = specs.map((s) => `• ${s.key}: ${s.value}`);
  return `${p.name} — ${p.shortDescription}\n\nKey features:\n${p.highlights.map((h) => `• ${h}`).join("\n")}\n\nSpecifications:\n${lines.join("\n")}\n\n${DELIVERY_NOTE}`;
}

function buildSpecs(p: CatalogProduct, brandName: string, categoryName: string) {
  const seoKeywords = `${brandName} ${p.model}, ${p.model} price in Bangladesh, ${categoryName.toLowerCase()} Bangladesh`;
  return [
    { key: "Brand", value: brandName },
    { key: "Category", value: categoryName },
    { key: "Model", value: p.model },
    ...p.specs,
    ...(p.color ? [{ key: "Color", value: p.color }] : []),
    { key: "Condition", value: "Brand New" },
    { key: "Delivery", value: DELIVERY_NOTE },
    { key: "meta_title", value: `${p.name} Price in Bangladesh` },
    { key: "meta_description", value: `Buy ${p.name} at CSA Laser with 100% authenticity and fast delivery in Bangladesh.` },
    { key: "keywords", value: seoKeywords },
  ];
}

function validateCatalog() {
  const countByCategory = new Map<string, number>();
  const featuredByCategory = new Map<string, number>();
  const slugs = new Set<string>();
  const skus = new Set<string>();
  for (const p of PRODUCTS) {
    const slug = slugFor(p);
    if (slugs.has(slug)) throw new Error(`Duplicate slug: ${slug}`);
    slugs.add(slug);
    if (skus.has(p.sku)) throw new Error(`Duplicate sku: ${p.sku}`);
    skus.add(p.sku);
    countByCategory.set(p.categorySlug, (countByCategory.get(p.categorySlug) || 0) + 1);
    if (p.isFeatured) featuredByCategory.set(p.categorySlug, (featuredByCategory.get(p.categorySlug) || 0) + 1);
  }
  for (const c of CATEGORIES) {
    const count = countByCategory.get(c.slug) || 0;
    const featured = featuredByCategory.get(c.slug) || 0;
    if (count < 1) throw new Error(`Category ${c.slug} has no products`);
    if (featured < 1) throw new Error(`Category ${c.slug} has no featured products`);
  }
}

async function ensureBucket() {
  if (!supabase) throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
  });
  if (error && !/already exists/i.test(error.message)) {
    throw new Error(`Failed to create bucket ${BUCKET}: ${error.message}`);
  }
}

export async function migrateCsaCatalog(): Promise<void> {
  console.log("Validating CSA catalog dataset...");
  validateCatalog();

  if (!supabase) {
    console.warn("WARNING: Supabase not configured — products will be inserted without images.");
  }

  console.log("Wiping old catalog data...");
  const inserted = await db.transaction(async (tx) => {
    await tx.execute(sql`DELETE FROM product_images`);
    await tx.execute(sql`DELETE FROM product_specs`);
    await tx.execute(sql`DELETE FROM reviews`);
    await tx.execute(sql`DELETE FROM wishlists`);
    await tx.execute(sql`DELETE FROM recently_viewed`);
    await tx.execute(sql`DELETE FROM cart_items`);
    await tx.execute(sql`DELETE FROM order_items`);
    await tx.execute(sql`DELETE FROM products`);
    await tx.execute(sql`DELETE FROM categories`);
    await tx.execute(sql`DELETE FROM brands`);
    await tx.execute(sql`DELETE FROM services`);

    const cats = await tx
      .insert(categories)
      .values(CATEGORIES.map((c) => ({ name: c.name, slug: c.slug, description: c.description })))
      .returning();
    const brds = await tx
      .insert(brands)
      .values(BRANDS.map((b) => ({ name: b.name, slug: b.slug, description: b.description })))
      .returning();
    const catMap = new Map(cats.map((c) => [c.slug, c.id]));
    const brandMap = new Map(brds.map((b) => [b.slug, b.id]));
    const brandName = new Map(brds.map((b) => [b.slug, b.name]));

    const base = Date.now();
    const rows = await tx
      .insert(products)
      .values(
        PRODUCTS.map((p, i) => ({
          name: p.name,
          slug: slugFor(p),
          shortDescription: p.shortDescription,
          fullDescription: buildFullDescription(p, brandName.get(p.brandSlug)!, CATEGORIES.find((c) => c.slug === p.categorySlug)!.name),
          price: String(p.price),
          discountPrice: p.discountPrice != null ? String(p.discountPrice) : null,
          sku: p.sku,
          brandId: brandMap.get(p.brandSlug)!,
          categoryId: catMap.get(p.categorySlug)!,
          stock: p.stock,
          rating: String(p.rating),
          reviewCount: p.reviewCount,
          isFeatured: p.isFeatured,
          isNewArrival: p.isNewArrival,
          isBestSeller: p.isBestSeller,
          createdAt: new Date(base - (PRODUCTS.length - i) * 60_000),
        })),
      )
      .returning();

    const specRows = rows.flatMap((row) => {
      const p = PRODUCTS.find((x) => x.sku === row.sku)!;
      return buildSpecs(p, brandName.get(p.brandSlug)!, CATEGORIES.find((c) => c.slug === p.categorySlug)!.name).map(
        (s) => ({ productId: row.id, key: s.key, value: s.value }),
      );
    });
    await tx.insert(productSpecs).values(specRows);

    // Clinic services
    await tx.insert(services).values(
      SERVICES.map((s, i) => ({
        nameBn: s.nameBn,
        nameEn: s.nameEn,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        isActive: true,
        sortOrder: i,
      })),
    );

    await tx.update(settings).set({ value: "BDT" }).where(eq(settings.key, "currency"));
    await tx.update(settings).set({ value: "2000" }).where(eq(settings.key, "free_shipping_threshold"));
    await tx.update(settings).set({ value: "CSA Laser" }).where(eq(settings.key, "site_name"));
    await tx
      .update(settings)
      .set({ value: "CSA Laser — skin care, body care, supplements and laser clinic services in Bangladesh." })
      .where(eq(settings.key, "site_description"));
    await tx.delete(banners);
    await tx.insert(banners).values([
      {
        title: "Skin Care Collection",
        subtitle: "Serum, face wash and sunscreen for glowing skin",
        imageUrl: "https://picsum.photos/seed/skincare-banner/1200/400",
        linkUrl: "/category/skin-care",
        position: "home",
        isActive: true,
      },
      {
        title: "Laser Clinic Services",
        subtitle: "Hair removal, carbon facial, hydra facial and more",
        imageUrl: "https://picsum.photos/seed/laser-banner/1200/400",
        linkUrl: "/services",
        position: "home",
        isActive: true,
      },
    ]);

    return rows;
  });

  console.log(`Inserted ${inserted.length} products + ${SERVICES.length} services.`);

  let uploaded = 0;
  if (supabase) {
    await ensureBucket();
    for (const row of inserted) {
      const p = PRODUCTS.find((x) => x.sku === row.sku)!;
      const brandName = BRANDS.find((b) => b.slug === p.brandSlug)!.name;
      const storagePath = `${BUCKET}/${p.categorySlug}/${p.imageFile}`;
      const { error } = await supabase.storage.from(BUCKET).upload(storagePath, placeholderSvg(p, brandName), {
        contentType: "image/svg+xml",
        upsert: true,
      });
      if (error) {
        console.error(`  ⚠ failed to upload ${storagePath}: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      await db.insert(productImages).values({
        productId: row.id,
        url: data.publicUrl,
        imagePath: storagePath,
        alt: p.name,
        order: 0,
        isPrimary: true,
      });
      await db.update(products).set({ thumbnailUrl: data.publicUrl }).where(eq(products.id, row.id));
      uploaded++;
      console.log(`  ✅ ${p.name} -> ${data.publicUrl}`);
    }
  }

  const summary = await db
    .select({ name: categories.name, slug: categories.slug, count: sql<number>`count(${products.id})::int` })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(categories.name);
  console.log("\nMigration complete — catalog by category:");
  for (const row of summary) console.log(`  ${row.name} (${row.slug}): ${row.count} products`);
  console.log(`Images uploaded: ${uploaded}/${inserted.length}`);
}

if (import.meta.main) {
  migrateCsaCatalog()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}
