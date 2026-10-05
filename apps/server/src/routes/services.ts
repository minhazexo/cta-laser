import { Hono } from "hono";
import { db, schema } from "@gadget-wallet/db";
import { eq, asc } from "drizzle-orm";
import { success } from "../utils/response.js";
import { SERVICES as STATIC_SERVICES } from "@gadget-wallet/db/services-csa";

export const serviceRoutes = new Hono();

/** GET /api/services — clinic services, DB first with static fallback. */
serviceRoutes.get("/", async (c) => {
  try {
    const rows = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.isActive, true))
      .orderBy(asc(schema.services.sortOrder));
    if (rows.length > 0) return success(c, rows);
  } catch {
    // Table may not exist yet (migration not run) — fall through to static.
  }
  return success(c, STATIC_SERVICES);
});

/** GET /api/services/:slug — single service detail. */
serviceRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  try {
    const [row] = await db.select().from(schema.services).where(eq(schema.services.slug, slug)).limit(1);
    if (row) return success(c, row);
  } catch {
    // fall through to static
  }
  const found = STATIC_SERVICES.find((s) => s.slug === slug);
  if (!found) return success(c, null, "Service not found");
  return success(c, found);
});
