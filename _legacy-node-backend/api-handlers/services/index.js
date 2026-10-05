import sql from "../_lib/db.js";
import { okPublic, fail } from "../_lib/respond.js";
import { SERVICES } from "./_data.js";

/** GET /api/services — clinic services, DB first with static fallback. */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const rows = await sql.unsafe(`
      SELECT id, name_bn AS "nameBn", name_en AS "nameEn", slug,
             description, icon, is_active AS "isActive",
             sort_order AS "sortOrder"
      FROM services
      WHERE is_active = true
      ORDER BY sort_order ASC
    `);
    if (rows.length > 0) return okPublic(res, rows, 300);
  } catch {
    // Table may not exist yet (migration not run) — fall through to static.
  }
  return okPublic(res, SERVICES, 300);
}
