/**
 * Backwards-compatibility shim.
 *
 * The Bangladesh catalog dataset now lives in catalog-csa.ts
 * (4 CSA Laser categories: Skin care, Body care, Supplement, Medicine).
 * This module re-exports it so existing imports
 * (migrate-bangladesh.ts and any tooling) keep working unchanged.
 */
export * from "./catalog-csa.js";
