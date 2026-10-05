import { db } from "./index.js";
import { users, categories, brands, products, productImages, productSpecs, heroMedia, banners, settings } from "./schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "products";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } }) : null;

const PLACEHOLDER_COLORS = ["#e11d2e", "#2563eb", "#16a34a", "#9333ea", "#f59e0b", "#0ea5e9", "#db2777", "#059669", "#d97706", "#7c3aed", "#dc2626", "#0891b2"];

/**
 * Generates a tiny SVG placeholder, uploads it to Supabase Storage under
 * products/{productId}/ and returns the storage path + public URL.
 * Returns null when Supabase is not configured (seed then uses picsum URLs).
 */
async function uploadPlaceholder(productId: string, title: string, index: number) {
  if (!supabase) return null;

  const fileName = `${Date.now()}-seed-${index}.svg`;
  const storagePath = `${BUCKET}/${productId}/${fileName}`;
  const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="${color}"/><circle cx="400" cy="330" r="150" fill="rgba(255,255,255,0.18)"/><text x="400" y="560" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle">${title}</text><text x="400" y="620" font-family="Inter, Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.75)" text-anchor="middle">CSA Laser</text></svg>`;

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, svg, {
    contentType: "image/svg+xml",
    upsert: true,
  });
  if (error) throw new Error(`Failed to upload seed image for ${title}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return { path: storagePath, url: data.publicUrl };
}

async function seed() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await db.insert(users).values({
    email: "admin@gadgetwallet.com",
    name: "Admin",
    passwordHash: adminPassword,
    role: "admin",
  });

  // Categories — CSA Laser: 4 product categories
  const cats = await db
    .insert(categories)
    .values([
      { name: "Skin care", slug: "skin-care", description: "Face wash, serum, moisturizer, sunscreen and facial kits" },
      { name: "Body care", slug: "body-care", description: "Body lotion, hair-removal aftercare, stretch-mark oil and eye care" },
      { name: "Supplement", slug: "supplement", description: "Collagen, biotin, glutathione and daily multivitamins" },
      { name: "Medicine", slug: "medicine", description: "Dermatology-support creams and gels" },
    ])
    .returning();

  // Brands
  const brds = await db
    .insert(brands)
    .values([
      { name: "CeraVe", slug: "cerave", description: "Dermatologist-developed skincare" },
      { name: "Neutrogena", slug: "neutrogena", description: "Dermatologist-recommended skincare" },
      { name: "Nivea", slug: "nivea", description: "Body and skin care essentials" },
      { name: "L'Oreal", slug: "loreal", description: "L'Oreal Paris skincare" },
      { name: "Himalaya", slug: "himalaya", description: "Herbal skincare and wellness" },
      { name: "Square", slug: "square", description: "Square Pharmaceuticals" },
      { name: "Beximco", slug: "beximco", description: "Beximco Pharmaceuticals" },
      { name: "Generic", slug: "generic", description: "Compatible skincare essentials" },
    ])
    .returning();

  // Products - CSA Laser launch catalog (2 per category)
  const productsList = [
    {
      name: "Vitamin C Brightening Serum 30ml",
      slug: "vitamin-c-brightening-serum",
      shortDescription: "Vitamin C serum for dark spots and glowing skin.",
      fullDescription: "Vitamin C brightening serum with 10% vitamin C. Brightens dull skin and fades dark spots in 2 weeks.",
      price: 1290,
      discountPrice: 1090,
      sku: "SK-VITC-30",
      brandId: brds[3].id,
      categoryId: cats[0].id,
      stock: 40,
      rating: 4.7,
      reviewCount: 214,
      isFeatured: true,
      isNewArrival: false,
      isBestSeller: true,
    },
    {
      name: "Sunscreen SPF 50 PA+++ 60ml",
      slug: "sunscreen-spf-50",
      shortDescription: "Daily SPF 50 sunscreen with no white cast.",
      fullDescription: "Broad-spectrum SPF 50 PA+++ sunscreen. Water and sweat resistant, perfect for Bangladeshi weather.",
      price: 950,
      sku: "SK-SPF50-60",
      brandId: brds[2].id,
      categoryId: cats[0].id,
      stock: 60,
      rating: 4.8,
      reviewCount: 342,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: true,
    },
    // Body care
    {
      name: "Body Brightening Lotion 400ml",
      slug: "body-brightening-lotion",
      shortDescription: "Daily body lotion for bright, moisturized skin.",
      fullDescription: "Body brightening lotion with 48h deep moisture. Visible brightness in 2 weeks.",
      price: 1100,
      discountPrice: 950,
      sku: "BD-BRIGHT-400",
      brandId: brds[2].id,
      categoryId: cats[1].id,
      stock: 45,
      rating: 4.6,
      reviewCount: 198,
      isFeatured: true,
      isNewArrival: false,
      isBestSeller: true,
    },
    {
      name: "Under-Eye Dark Circle Cream 15g",
      slug: "under-eye-dark-circle-cream",
      shortDescription: "Under-eye cream for dark circles and puffiness.",
      fullDescription: "Under-eye cream with caffeine and vitamin B3. Reduces dark circles, puffiness and tired eyes.",
      price: 980,
      sku: "BD-EYE-15",
      brandId: brds[3].id,
      categoryId: cats[1].id,
      stock: 40,
      rating: 4.5,
      reviewCount: 167,
      isFeatured: false,
      isNewArrival: true,
      isBestSeller: false,
    },
    // Supplement
    {
      name: "Collagen + Vitamin C 60 Tablets",
      slug: "collagen-vitamin-c",
      shortDescription: "Collagen with vitamin C for glowing skin.",
      fullDescription: "Collagen + vitamin C tablets for skin glow, elasticity, hair and nail support. 60-day supply.",
      price: 1850,
      discountPrice: 1650,
      sku: "SP-COLL-60",
      brandId: brds[7].id,
      categoryId: cats[2].id,
      stock: 30,
      rating: 4.7,
      reviewCount: 231,
      isFeatured: true,
      isNewArrival: false,
      isBestSeller: true,
    },
    {
      name: "Biotin Hair Skin Nails 30 Capsules",
      slug: "biotin-hair-skin-nails",
      shortDescription: "Biotin capsules for less hair fall.",
      fullDescription: "Biotin capsules for reduced hair fall, stronger nails and healthy skin support.",
      price: 1250,
      sku: "SP-BIOTIN-30",
      brandId: brds[5].id,
      categoryId: cats[2].id,
      stock: 40,
      rating: 4.6,
      reviewCount: 154,
      isFeatured: false,
      isNewArrival: true,
      isBestSeller: false,
    },
    // Medicine
    {
      name: "Melasma Care Cream (Mesta) 20g",
      slug: "melasma-care-cream",
      shortDescription: "Dermatology-support cream for melasma care.",
      fullDescription: "Melasma (mesta) care cream for deep spots. For external use only — use as directed by physician.",
      price: 780,
      sku: "MD-MELASMA-20",
      brandId: brds[5].id,
      categoryId: cats[3].id,
      stock: 35,
      rating: 4.5,
      reviewCount: 203,
      isFeatured: true,
      isNewArrival: false,
      isBestSeller: true,
    },
    {
      name: "Acne Spot Corrector Gel 20g",
      slug: "acne-spot-corrector-gel",
      shortDescription: "Fast-acting gel for acne spots.",
      fullDescription: "Oil-free acne spot corrector gel. Targets acne spots and blemishes fast.",
      price: 620,
      sku: "MD-ACNE-20",
      brandId: brds[1].id,
      categoryId: cats[3].id,
      stock: 55,
      rating: 4.5,
      reviewCount: 226,
      isFeatured: false,
      isNewArrival: true,
      isBestSeller: false,
    },
  ];

  for (const product of productsList) {
    // drizzle decimal columns are typed as strings — convert numeric seed values.
    const [p] = await db
      .insert(products)
      .values({
        ...product,
        price: String(product.price),
        discountPrice: product.discountPrice != null ? String(product.discountPrice) : null,
        rating: String(product.rating),
      })
      .returning();

    // Product images — stored in Supabase Storage (products/{productId}/) when
    // configured, otherwise external placeholder URLs. First image is primary
    // and drives products.thumbnail_url.
    const seedImages: {
      productId: string;
      url: string;
      path: string | null;
      alt: string;
      order: number;
      isPrimary: boolean;
    }[] = [];
    for (let i = 0; i < 3; i++) {
      const uploaded = await uploadPlaceholder(p.id, p.name, i);
      seedImages.push(
        uploaded
          ? {
              productId: p.id,
              url: uploaded.url,
              path: uploaded.path,
              alt: i === 0 ? p.name : `${p.name} view ${i + 1}`,
              order: i,
              isPrimary: i === 0,
            }
          : {
              productId: p.id,
              url: `https://picsum.photos/seed/${p.slug}-${i + 1}/800/800`,
              path: null,
              alt: i === 0 ? p.name : `${p.name} view ${i + 1}`,
              order: i,
              isPrimary: i === 0,
            },
      );
    }
    await db.insert(productImages).values(seedImages);
    await db.update(products).set({ thumbnailUrl: seedImages[0].url }).where(eq(products.id, p.id));

    // Product specs
    await db.insert(productSpecs).values([
      { productId: p.id, key: "Brand", value: brds.find((b) => b.id === product.brandId)?.name || "" },
      { productId: p.id, key: "Category", value: cats.find((c) => c.id === product.categoryId)?.name || "" },
      { productId: p.id, key: "Warranty", value: "1 Year Manufacturer Warranty" },
      { productId: p.id, key: "Condition", value: "Brand New" },
    ]);
  }

  // Hero media
  await db.insert(heroMedia).values({
    videoUrl: "https://videos.pexels.com/video-files/3195398/3195398-uhd_2560_1440_30fps.mp4",
    headline: "Experience the Future of Technology",
    subheadline: "Premium gadgets delivered to your doorstep.",
    isActive: true,
  });

  // Banners
  await db.insert(banners).values([
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

  // Settings
  await db.insert(settings).values([
    { key: "site_name", value: "CSA Laser" },
    { key: "site_description", value: "CSA Laser — skin care, body care, supplements and laser clinic services" },
    { key: "free_shipping_threshold", value: "2000" },
    { key: "tax_rate", value: "0.00" },
    { key: "currency", value: "BDT" },
  ]);

  console.log("Seed completed successfully!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
