# Symphony Bali Spa

Production-quality Next.js website for Symphony Bali Spa — a luxury Balinese-inspired
wellness brand with locations in Madurai and Theni.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (CSS-first `@theme` design tokens)
- No UI/animation libraries — custom components, CSS transitions, and a small
  IntersectionObserver-based scroll-reveal utility

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project Structure

```
src/
  app/                Routes (App Router) — one folder per page, plus
                       sitemap.ts, robots.ts, not-found.tsx
  components/          Reusable UI components (Header, Hero, TreatmentCard, ...)
  data/                Content as structured data (treatments, locations,
                       testimonials, FAQs, journal posts, site-wide constants)
  lib/                 Small helpers (cn(), the image lookup table)
```

Business content (services, addresses, phone numbers, testimonials) lives in
`src/data/*.ts` — update it there rather than in the page files.

## Replacing Placeholder Photography

All imagery is centralised in `src/lib/images.ts` as a lookup table of curated
Unsplash photos, used as stand-ins for real Symphony Bali Spa photography.
To swap in licensed/owned photos:

1. Add the new image URL (or a local file under `public/`) to `src/lib/images.ts`.
2. Every component/page references images by key (e.g. `img.hotStoneMassage`),
   so no other files need to change.

Note: on a cold cache, Next's built-in image optimizer can take a few seconds
to fetch and transform a hot-linked Unsplash image the first time it's
requested at a given size. This is a one-time cost per size/image (cached
afterwards) and is specific to hot-linking a remote source — self-hosted
production images won't have this delay.

## SEO

- Per-page metadata via the `Metadata` API (`src/app/**/page.tsx`)
- `sitemap.ts` / `robots.ts` generate `/sitemap.xml` and `/robots.txt`
- `Organization`/`DaySpa` JSON-LD in the root layout (`src/components/JsonLd.tsx`)

## Content Accuracy

Business details (services, addresses, phone numbers, hours, testimonials)
were sourced from the existing symphonybalispa.com site. Anything not
publicly available (exact treatment durations, specific figures) uses
reasonable, clearly-generic placeholders rather than invented claims —
review `src/data/` before launch.
