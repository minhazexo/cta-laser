# Spring Boot API Contract (CSA Laser storefront)

The web app in `client/` is a pure SPA. On Vercel it serves static files only —
**every** backend call goes through `client/src/lib/api.ts` (axios) to
`<VITE_API_URL>/api/...`. Implement the endpoints below in Spring Boot and the
storefront works unchanged.

> Field-level reference: the old Node implementation is quarantined at
> `_legacy-node-backend/api-handlers/` — same route shapes, same SQL intent.
> Mirror its response fields when in doubt.

## 0. Base + envelope + auth

- Base URL: `{API_ORIGIN}/api`, e.g. `GET {API_ORIGIN}/api/categories`.
  `VITE_API_URL` = origin only (no trailing slash, no `/api`).
- Success envelope: `{ "success": true, "data": <...>, "message"?: string }`.
  The frontend reads `res.data.data`. Lists read `res.data.data || []`.
- Error envelope: `{ "success": false, "error": "message" }` with the HTTP
  status. The frontend toasts `err.response.data.error`.
- Auth: `Authorization: Bearer <jwt>` (token lives in `localStorage "token"`).
  Any `401` → the frontend drops the token and treats the user as guest.
- Auth endpoints: `POST /auth/register {email,name,password}`,
  `POST /auth/login {email,password}` → `{ "token": "...", "user": {...} }`;
  `GET /auth/me` → user object; `POST /auth/logout-all` → ok.
- User object: `{id,email,name,role,isActive,tokenVersion,twoFactorEnabled,
  phone,avatar,createdAt}`. `role` is `"admin"` or `"user"` (admin pages gate
  on it client-side — **re-check it server-side on every `/admin/*` route**).
- Prices/ratings: return as **JSON numbers** (e.g. `"price": 1290.0`).
- IDs: UUID strings. Dates: ISO-8601 strings.
- CORS: allow the Vercel origin. Minimal Spring config:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry r) {
    r.addMapping("/api/**")
     .allowedOrigins("https://<your-app>.vercel.app", "http://localhost:5183")
     .allowedMethods("GET","POST","PUT","PATCH","DELETE")
     .allowedHeaders("Authorization","Content-Type");
  }
}
```

(No cookies are used, so `allowCredentials` is not required.)

## 1. Public catalog (no auth)

| Method | Path | Query / body | Returns |
|---|---|---|---|
| GET | `/health` | — | `{success,message}` |
| GET | `/categories` | — | `Category[]` + per-category live `count` |
| GET | `/categories/:slug` | — | single `Category` |
| GET | `/brands` | — | `Brand[]` |
| GET | `/products` | `category,brand,brands,colors,minPrice,maxPrice,minRating,discount=1,inStock=1,sort(newest\|price-asc\|price-desc\|rating\|discount\|popular),search,q?,limit,page,sale=1` | `{data: Product[], facets: {brands[],colors[],priceRange{min,max}}, total}` |
| GET | `/products/featured` | — | `Product[]` |
| GET | `/products/new-arrivals` | — | `Product[]` |
| GET | `/products/by-id/:id` | — | single `Product` (checkout buy-now flow) |
| GET | `/products/:slug` | — | single `Product` detail |
| GET | `/services` | — | `Service[]` (**optional in v1** — the Services page currently renders from static data in `client/src/data/services.ts`; add when ready) |

`Category = {id,name,slug,description,image,parentId,count}`.
`Brand = {id,name,slug,logo,description}`.
`Product = {id,name,slug,shortDescription,fullDescription,price,discountPrice,
sku,brandId,categoryId,brandName?,stock,thumbnailUrl,firstImageUrl?,images[]
{url,alt},rating,reviewCount,isFeatured,isNewArrival,isBestSeller,createdAt}`.
`Service = {nameBn,nameEn,slug,description,icon}` (see `packages/db/src/services-csa.ts`).

## 2. Shopper (auth required)

| Method | Path | Body |
|---|---|---|
| GET | `/profile` | → `{user}` |
| PUT | `/profile` | `{name,phone}` |
| PUT | `/profile/password` | `{currentPassword,newPassword}` |
| PUT | `/profile/two-factor` | `{enabled}` |
| POST | `/profile/avatar` | multipart `avatar` → `{user}` (or `{avatarUrl}`) |
| GET | `/cart/user/:userId` | guest alternative below |
| GET | `/cart/:sessionId` | guest cart (frontend keeps `sessionId` in localStorage) |
| POST | `/cart/add` | `{productId,quantity?,userId?,sessionId?}` |
| DELETE | `/cart/remove` | `{productId,userId?,sessionId?}` |
| PATCH | `/cart/update` | `{productId,quantity,userId?,sessionId?}` |
| POST | `/cart/merge` | `{sessionId,userId}` (login handoff) |
| GET | `/wishlist` | → `{data: [...]}` |
| POST | `/wishlist/add` | `{productId}` |
| DELETE | `/wishlist/remove` | `{productId}` |
| POST | `/wishlist/move-to-cart` | `{productId}` |
| GET | `/address` | → address list |
| POST | `/address` | `{label,street,city,state,zip,country,isDefault}` → address (frontend reads `data.data.id`) |
| PUT | `/address/:id` | same fields |
| DELETE | `/address/:id` | — |
| POST | `/address/:id/default` | — |
| GET | `/orders` | → order list (also `GET /orders/user/:userId`) |
| POST | `/orders` | `{items[{productId,quantity,price}],subtotal,discount,shipping,total,paymentMethod,shippingAddressId,paymentStatus}` → order (frontend reads `data.data.id` and navigates to `/order-success/:id`) |
| POST | `/orders/:id/cancel` | — |
| POST | `/orders/:id/return` | — |
| GET | `/reviews/user` | my reviews |
| POST | `/reviews` | `{productId,rating,title,comment}` |
| PUT | `/reviews/:id` | `{rating,title,comment}` |
| DELETE | `/reviews/:id` | — |
| GET | `/payment-methods` | → list |
| POST | `/payment-methods` | method payload → created |
| DELETE | `/payment-methods/:id` | — |
| POST | `/payment-methods/:id/default` | — |
| GET | `/notifications` | → list |
| GET | `/notifications/preferences` | → prefs |
| PUT | `/notifications/preferences` | partial prefs |
| POST | `/notifications/read-all` | — |
| GET | `/recently-viewed` | → list |
| POST | `/recently-viewed` | `{productId}` (fire-and-forget; failures ignored) |

Forgot-password page is UI-only (no backend call yet) — wire it whenever the
mail flow exists in Spring.

## 3. Admin (auth + `role=admin`)

`GET /admin/dashboard` (stats) · `GET/POST /admin/products` (multipart-capable:
JSON or `FormData`) · `GET/PATCH/DELETE /admin/products/:id` ·
`POST /admin/products/:id/images` (multipart `image`) ·
`DELETE/PATCH /admin/products/:id/images/:imageId` (`{isPrimary}` or `{alt}`) ·
`PATCH /admin/products/:id/images/reorder` · `GET /admin/orders` ·
`GET/POST /admin/categories`, `PATCH/DELETE /admin/categories/:id`,
`POST/DELETE /admin/categories/:id/image` · same set for `/admin/brands*`.
Image fields: product images carry `{id,url,alt,order,isPrimary}`;
`thumbnailUrl` = primary image URL.

## 4. Deploy checklist (Vercel)

1. Import the repo, Root Directory = repo root, Framework Preset = Other
   (`vercel.json` sets build `bun run build` → `client/dist`).
2. Env (Production + Preview): `VITE_API_URL=https://<spring-backend>` —
   **redeploy after changing it** (Vite inlines it at build time).
3. No backend env vars needed on Vercel (DB/JWT live in Spring).
4. Local dev until Spring is ready still works: `bun run dev` runs the Vite
   app (:5183) + the legacy Node API (:3000); leave `VITE_API_URL` empty.
