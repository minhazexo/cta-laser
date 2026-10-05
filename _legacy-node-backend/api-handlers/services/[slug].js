import sql from "../_lib/db.js";
import { okPublic, fail } from "../_lib/respond.js";
import { SERVICES } from "./_data.js";

/** GET /api/services/:slug — single service detail. */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const slug = req.query?.slug;
    if (typeof slug === "string" && slug) {
      const rows = await sql.unsafe(
        `SELECT id, name_bn AS "nameBn", name_en AS "nameEn", slug,
                description, icon, is_active AS "isActive",
                sort_order AS "sortOrder"
         FROM services WHERE slug = $1 LIMIT 1`,
        [slug],
      );
      if (rows.length > 0) return okPublic(res, rows[0], 300);
    }
  } catch {
    // fall through to static
  }
  const slug = req.query?.slug;
  const found = SERVICES.find((s) => s.slug === slug);
  if (!found) return fail(res, 404, "Service not found");
  return okPublic(res, found, 300);
}
