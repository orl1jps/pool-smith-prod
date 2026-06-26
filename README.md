# Pool Smith — Next.js

A modern rebuild of [pool-smith.com](https://pool-smith.com) (formerly a WordPress
"Pool Services" / WPBakery site) as a self-contained Next.js App Router app —
React + TypeScript, a hand-written CSS design system, `next/image`, and
self-hosted fonts. **No WordPress, WPBakery, jQuery, or page-builder runtime.**

## Stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- Hand-written CSS design system (`src/app/globals.css` + CSS Modules)
- `next/font` (Lato + Open Sans, self-hosted at build time)
- Lead capture: honeypot + Cloudflare Turnstile → `node:sqlite` → Resend email
- Payments: native **Stripe** Payment Element (bill-pay, custom amount)

## Requirements
- **Node 24+** (the contact pipeline uses `node:sqlite`, and a persistent
  filesystem — a Node server/VPS, not serverless/edge).

## Getting started
```bash
npm install
cp .env.example .env.local   # then fill in keys (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Environment variables (`.env.local`)
See `.env.example`. All are optional in dev (graceful fallbacks), required in prod:

| Var | Purpose |
|-----|---------|
| `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM` | Contact-form lead emails (Resend). Without it, leads still save to SQLite. |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile anti-spam. If the secret is unset, verification is skipped (dev only). |
| `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `/payments` bill-pay. Without them, `/payments` shows a "call us" fallback. |
| `SUBMISSIONS_DB_PATH` | Optional override for the SQLite leads file (default `data/submissions.db`). |

Cloudflare always-pass **test** keys for local dev: site `1x00000000000000000000AA`,
secret `1x0000000000000000000000000000000AA`.

## Project structure
```
src/
  app/        routes, layout, globals.css, sitemap/robots/not-found, actions.ts, api/
  components/ presentational React (Header, Hero, ContactForm, PaymentForm, …)
  content/    CMS-in-code — all copy/data as typed objects (site, home, services, …)
  lib/        contact-state, spam, db (node:sqlite), email (Resend), stripe
public/images/uploads/  optimized images lifted from the WordPress export
```
Content lives as **typed data in `src/content/*`**, rendered by shared components —
adding a page/service/location is editing a data object.

## Routes (mapped 1:1 from the old WordPress URLs)
- Static: `/`, `/about`, `/services`, `/prices`, `/gallery`, `/testimonials`,
  `/tips`, `/locations`, `/payments`, `/contact-us`
- Dynamic: `/pool-services/[slug]` (10 services), `/locations/[city]` (5 cities),
  `/tips/[slug]` (blog)
- Old URLs (`/daytona-beach`, `/residential-pool-services`, `/blog`, `/shop`, …)
  301-redirect to their new homes — see `next.config.ts`.

## Migration notes / decisions
- **Strategy: Rebuild** (pixel-faithful re-author, not a mirror). Brand colors
  `#005395` / `#28bceb`, Lato + Open Sans, lifted from the original theme CSS.
- **WooCommerce store dropped** — it was dormant ThemeForest demo content (10 demo
  products, zero orders). `/shop`, `/cart`, `/checkout`, `/my-account` redirect away.
- **Payments rebuilt natively** with Stripe (replacing the wp-full-stripe plugin).
- **Contact forms** (Contact Form 7 / CFDB7) replaced by the native pipeline.
- Some original pages carried unedited theme-demo copy (wrong geography, a competitor
  name, duplicated blog posts). Those were corrected as content fixes; layout/design
  were reproduced faithfully.
- The WordPress export lives in `migration-assets/` (gitignored) for reference.

## TODO before launch
- Add real `RESEND_*`, `TURNSTILE_*`, and `STRIPE_*` keys.
- Point `MAIL_TO` at the inbox that should receive leads.
- Do a final visual pass against the live site (the build environment had no
  outbound access to pool-smith.com for side-by-side screenshots).
- Review the demo-derived **About** team bios and **Tips** posts; replace with real
  content where available.
