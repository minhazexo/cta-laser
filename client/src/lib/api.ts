import axios from "axios";

/**
 * API base URL.
 *
 * - Local dev (empty): same-origin "/api" → Vite proxies it to the dev API
 *   on :3000 (see client/vite.config.ts).
 * - Production on Vercel: set VITE_API_URL to the Spring Boot backend origin,
 *   e.g. "https://csa-laser-api.onrender.com" (no trailing slash, no /api).
 *   Requests then go cross-origin to "<origin>/api/...".
 *
 * Auth is a Bearer JWT from localStorage (no cookies), so no
 * `withCredentials` is needed — the Spring backend only has to allow the
 * Vercel origin via CORS (see docs/SPRING_BOOT_API_CONTRACT.md).
 */
const API_ORIGIN = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ?? "";

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Let axios auto-detect Content-Type for FormData (multipart uploads)
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem("token");
    return Promise.reject(err);
  },
);

export default api;
