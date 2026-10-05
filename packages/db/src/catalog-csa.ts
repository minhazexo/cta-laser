/**
 * CSA Laser — product catalog dataset.
 *
 * Four product categories (Skin care, Body care, Supplement, Medicine) with
 * 16 launch products (4 per category, 2 featured per category so the
 * homepage Featured grid stays balanced). Prices are BDT.
 *
 * Data only — no application logic lives here. Consumed by
 * migrate-csa.ts (full wipe + reseed) and re-exported through
 * catalog-bangladesh.ts so the old migration entry-point keeps working.
 */

export interface CatalogCategory {
  name: string;
  slug: string;
  description: string;
}

export interface CatalogBrand {
  name: string;
  slug: string;
  description: string;
}

export interface CatalogProduct {
  name: string;
  brandSlug: string;
  categorySlug: string;
  model: string;
  /** Price in BDT. */
  price: number;
  /** Discounted price in BDT (optional — drives the Flash Sale section). */
  discountPrice?: number;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  /** Image filename (stored under product-images/{categorySlug}/). */
  imageFile: string;
  color?: string;
  /** Feature bullets appended to the auto-built full description. */
  highlights: string[];
  /** Category-specific specs. */
  specs: { key: string; value: string }[];
  shortDescription: string;
}

export const CATEGORIES: CatalogCategory[] = [
  {
    name: "Skin care",
    slug: "skin-care",
    description: "Face wash, serum, moisturizer, sunscreen and facial kits for glowing skin.",
  },
  {
    name: "Body care",
    slug: "body-care",
    description: "Body lotion, hair-removal aftercare, stretch-mark oil and eye care.",
  },
  {
    name: "Supplement",
    slug: "supplement",
    description: "Collagen, biotin, glutathione and daily multivitamins for skin and hair.",
  },
  {
    name: "Medicine",
    slug: "medicine",
    description: "Dermatology-support creams and gels — melasma, spots, acne and aftercare.",
  },
];

export const BRANDS: CatalogBrand[] = [
  { name: "CeraVe", slug: "cerave", description: "Dermatologist-developed skincare" },
  { name: "Neutrogena", slug: "neutrogena", description: "Dermatologist-recommended skincare" },
  { name: "Nivea", slug: "nivea", description: "Body and skin care essentials" },
  { name: "L'Oreal", slug: "loreal", description: "L'Oreal Paris skincare" },
  { name: "Himalaya", slug: "himalaya", description: "Herbal skincare and wellness" },
  { name: "Square", slug: "square", description: "Square Pharmaceuticals" },
  { name: "Beximco", slug: "beximco", description: "Beximco Pharmaceuticals" },
  { name: "Generic", slug: "generic", description: "Compatible skincare essentials" },
];

export const PRODUCTS: CatalogProduct[] = [
  // ── Skin care (4) ──
  {
    name: "Vitamin C Brightening Serum 30ml",
    brandSlug: "loreal",
    categorySlug: "skin-care",
    model: "Vitamin C Serum 30ml",
    price: 1290,
    discountPrice: 1090,
    sku: "SK-LOREAL-VITC30",
    stock: 40,
    rating: 4.7,
    reviewCount: 214,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    imageFile: "vitamin-c-brightening-serum.webp",
    highlights: ["10% vitamin C for dark spots", "Brightens dull skin in 2 weeks", "Lightweight fast-absorbing formula"],
    specs: [
      { key: "Skin Type", value: "All skin types" },
      { key: "Size", value: "30ml" },
    ],
    shortDescription: "Vitamin C brightening serum for dark spots and glowing skin.",
  },
  {
    name: "Hydra Moisturizing Face Wash 150ml",
    brandSlug: "neutrogena",
    categorySlug: "skin-care",
    model: "Hydra Face Wash 150ml",
    price: 850,
    sku: "SK-NEUT-HYDRA150",
    stock: 50,
    rating: 4.6,
    reviewCount: 187,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    imageFile: "hydra-moisturizing-face-wash.webp",
    highlights: ["Gentle deep cleansing", "Keeps skin hydrated after wash", "Suitable for daily use"],
    specs: [
      { key: "Skin Type", value: "Normal to dry skin" },
      { key: "Size", value: "150ml" },
    ],
    shortDescription: "Gentle hydrating face wash for soft, clean skin every day.",
  },
  {
    name: "Sunscreen SPF 50 PA+++ 60ml",
    brandSlug: "nivea",
    categorySlug: "skin-care",
    model: "Sun Protect SPF50 60ml",
    price: 950,
    sku: "SK-NIVEA-SPF50",
    stock: 60,
    rating: 4.8,
    reviewCount: 342,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    imageFile: "sunscreen-spf-50.webp",
    highlights: ["SPF 50 PA+++ broad protection", "No white cast", "Water and sweat resistant"],
    specs: [
      { key: "SPF", value: "SPF 50 PA+++" },
      { key: "Size", value: "60ml" },
    ],
    shortDescription: "Daily SPF 50 sunscreen with no white cast for Bangladeshi weather.",
  },
  {
    name: "Carbon Facial Clay Mask 100g",
    brandSlug: "himalaya",
    categorySlug: "skin-care",
    model: "Carbon Clay Mask 100g",
    price: 1450,
    sku: "SK-HIM-CARBON100",
    stock: 30,
    rating: 4.5,
    reviewCount: 129,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "carbon-facial-clay-mask.webp",
    highlights: ["Deep pore cleansing", "Controls excess oil", "Home carbon-facial glow"],
    specs: [
      { key: "Skin Type", value: "Oily to combination skin" },
      { key: "Size", value: "100g" },
    ],
    shortDescription: "Activated-charcoal clay mask for carbon-facial glow at home.",
  },

  // ── Body care (4) ──
  {
    name: "Body Brightening Lotion 400ml",
    brandSlug: "nivea",
    categorySlug: "body-care",
    model: "Brightening Lotion 400ml",
    price: 1100,
    discountPrice: 950,
    sku: "BD-NIVEA-BRIGHT400",
    stock: 45,
    rating: 4.6,
    reviewCount: 198,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    imageFile: "body-brightening-lotion.webp",
    highlights: ["Visible brightness in 2 weeks", "48h deep moisture", "For all body skin types"],
    specs: [
      { key: "Size", value: "400ml" },
      { key: "Use", value: "Daily body care" },
    ],
    shortDescription: "Daily body lotion for bright, deeply moisturized skin.",
  },
  {
    name: "Sensitive Hair Removal Cream 100g",
    brandSlug: "generic",
    categorySlug: "body-care",
    model: "Hair Removal Cream 100g",
    price: 650,
    sku: "BD-GEN-HR100",
    stock: 60,
    rating: 4.4,
    reviewCount: 176,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    imageFile: "hair-removal-cream.webp",
    highlights: ["Painless hair removal in minutes", "For sensitive skin", "Smooth skin up to 7 days"],
    specs: [
      { key: "Size", value: "100g" },
      { key: "Skin Type", value: "Sensitive skin" },
    ],
    shortDescription: "Gentle hair-removal cream for smooth skin at home.",
  },
  {
    name: "Anti Stretch Mark Oil 100ml",
    brandSlug: "himalaya",
    categorySlug: "body-care",
    model: "Stretch Mark Oil 100ml",
    price: 1350,
    sku: "BD-HIM-STRETCH100",
    stock: 35,
    rating: 4.5,
    reviewCount: 143,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "anti-stretch-mark-oil.webp",
    highlights: ["Fades stretch marks", "Improves skin elasticity", "Safe for daily massage"],
    specs: [
      { key: "Size", value: "100ml" },
      { key: "Use", value: "Stretch mark care" },
    ],
    shortDescription: "Nourishing oil that visibly fades stretch marks.",
  },
  {
    name: "Under-Eye Dark Circle Cream 15g",
    brandSlug: "loreal",
    categorySlug: "body-care",
    model: "Eye Cream 15g",
    price: 980,
    sku: "BD-LOREAL-EYE15",
    stock: 40,
    rating: 4.5,
    reviewCount: 167,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "under-eye-dark-circle-cream.webp",
    highlights: ["Reduces dark circles and puffiness", "Caffeine + vitamin B3", "Gentle for eye area"],
    specs: [
      { key: "Size", value: "15g" },
      { key: "Use", value: "Under-eye care" },
    ],
    shortDescription: "Under-eye cream for dark circles, puffiness and tired eyes.",
  },

  // ── Supplement (4) ──
  {
    name: "Collagen + Vitamin C 60 Tablets",
    brandSlug: "generic",
    categorySlug: "supplement",
    model: "Collagen C 60 tabs",
    price: 1850,
    discountPrice: 1650,
    sku: "SP-GEN-COLL60",
    stock: 30,
    rating: 4.7,
    reviewCount: 231,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    imageFile: "collagen-vitamin-c.webp",
    highlights: ["Skin glow and elasticity", "Supports hair and nails", "60-day supply"],
    specs: [
      { key: "Form", value: "Tablets" },
      { key: "Quantity", value: "60 tablets" },
    ],
    shortDescription: "Collagen with vitamin C for glowing skin, hair and nails.",
  },
  {
    name: "Biotin Hair Skin Nails 30 Capsules",
    brandSlug: "square",
    categorySlug: "supplement",
    model: "Biotin 30 caps",
    price: 1250,
    sku: "SP-SQ-BIOTIN30",
    stock: 40,
    rating: 4.6,
    reviewCount: 154,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    imageFile: "biotin-hair-skin-nails.webp",
    highlights: ["Reduces hair fall", "Stronger nails", "Healthy skin support"],
    specs: [
      { key: "Form", value: "Capsules" },
      { key: "Quantity", value: "30 capsules" },
    ],
    shortDescription: "Biotin capsules for less hair fall and healthy skin.",
  },
  {
    name: "Glutathione Brightening 30 Capsules",
    brandSlug: "beximco",
    categorySlug: "supplement",
    model: "Glutathione 30 caps",
    price: 2450,
    sku: "SP-BEX-GLUTA30",
    stock: 25,
    rating: 4.6,
    reviewCount: 118,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "glutathione-brightening.webp",
    highlights: ["Skin brightening antioxidant", "Evens skin tone", "With vitamin C support"],
    specs: [
      { key: "Form", value: "Capsules" },
      { key: "Quantity", value: "30 capsules" },
    ],
    shortDescription: "Glutathione antioxidant capsules for bright, even-toned skin.",
  },
  {
    name: "Daily Multivitamin 60 Tablets",
    brandSlug: "square",
    categorySlug: "supplement",
    model: "Multivitamin 60 tabs",
    price: 950,
    sku: "SP-SQ-MULTI60",
    stock: 50,
    rating: 4.5,
    reviewCount: 189,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "daily-multivitamin.webp",
    highlights: ["Everyday energy and immunity", "Skin and hair nutrition", "2-month supply"],
    specs: [
      { key: "Form", value: "Tablets" },
      { key: "Quantity", value: "60 tablets" },
    ],
    shortDescription: "Everyday multivitamin for energy, immunity and skin health.",
  },

  // ── Medicine (4) ──
  {
    name: "Melasma Care Cream (Mesta) 20g",
    brandSlug: "square",
    categorySlug: "medicine",
    model: "Melasma Cream 20g",
    price: 780,
    sku: "MD-SQ-MELASMA20",
    stock: 35,
    rating: 4.5,
    reviewCount: 203,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    imageFile: "melasma-care-cream.webp",
    highlights: ["Care for mesta and deep spots", "Use as directed by physician", "For external use only"],
    specs: [
      { key: "Size", value: "20g" },
      { key: "Use", value: "External use only" },
    ],
    shortDescription: "Dermatology-support cream for melasma (mesta) care.",
  },
  {
    name: "Spot Corrector Ointment 20g",
    brandSlug: "beximco",
    categorySlug: "medicine",
    model: "Spot Corrector 20g",
    price: 890,
    sku: "MD-BEX-SPOT20",
    stock: 30,
    rating: 4.4,
    reviewCount: 141,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    imageFile: "spot-corrector-ointment.webp",
    highlights: ["Care for dark til and spots", "Use as directed by physician", "For external use only"],
    specs: [
      { key: "Size", value: "20g" },
      { key: "Use", value: "External use only" },
    ],
    shortDescription: "Support ointment for dark til and stubborn spots.",
  },
  {
    name: "Tattoo Aftercare Repair Cream 50g",
    brandSlug: "cerave",
    categorySlug: "medicine",
    model: "Aftercare Cream 50g",
    price: 750,
    sku: "MD-CER- AFTER50".replace(" ", ""),
    stock: 40,
    rating: 4.6,
    reviewCount: 98,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "tattoo-aftercare-cream.webp",
    highlights: ["Soothes laser-treated skin", "Supports fast recovery", "Fragrance-free gentle care"],
    specs: [
      { key: "Size", value: "50g" },
      { key: "Use", value: "Laser aftercare" },
    ],
    shortDescription: "Gentle repair cream for tattoo-removal laser aftercare.",
  },
  {
    name: "Acne Spot Corrector Gel 20g",
    brandSlug: "neutrogena",
    categorySlug: "medicine",
    model: "Acne Gel 20g",
    price: 620,
    sku: "MD-NEUT-ACNE20",
    stock: 55,
    rating: 4.5,
    reviewCount: 226,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    imageFile: "acne-spot-corrector-gel.webp",
    highlights: ["Targets acne spots fast", "Oil-free non-sticky gel", "Daily spot care"],
    specs: [
      { key: "Size", value: "20g" },
      { key: "Use", value: "Acne spot care" },
    ],
    shortDescription: "Fast-acting gel for acne spots and blemishes.",
  },
];

/** Slug derived from the image filename. */
export function slugFor(p: CatalogProduct): string {
  return p.imageFile.replace(/\.(webp|png|jpe?g)$/i, "");
}
