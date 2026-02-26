# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Buffalo Catholic Cemeteries website built on the [Payload CMS Website Template](https://github.com/payloadcms/payload/blob/main/templates/website). It is a Next.js 15 app with Payload CMS 3 running natively inside the same process (no separate CMS server).

## Commands

```bash
pnpm dev                    # Start development server (localhost:3000)
pnpm build                  # Production build (also runs next-sitemap postbuild)
pnpm start                  # Run production server
pnpm lint                   # ESLint check
pnpm lint:fix               # Auto-fix lint issues
pnpm generate:types         # Regenerate src/payload-types.ts from collections
pnpm generate:importmap     # Regenerate Payload import map
pnpm test:int               # Vitest integration tests
pnpm test:e2e               # Playwright E2E tests
```

After adding or modifying a collection's fields, run `pnpm generate:types` to keep `src/payload-types.ts` in sync.

## Architecture

### Next.js + Payload Co-location

Payload runs inside the Next.js app at `src/app/(payload)/`. The admin panel is at `/admin` and the REST/GraphQL API is at `/api`. The frontend is in `src/app/(frontend)/`. Both route groups share the same Next.js process.

`src/payload.config.ts` is the single source of truth for collections, globals, plugins, DB, storage, and email.

### Database & Storage

- **Database:** Vercel Postgres adapter (`DATABASE_URL`) pointing to Neon PostgreSQL
- **Media storage:** Vercel Blob Storage (`BLOB_READ_WRITE_TOKEN`) — media uploads do NOT go to the filesystem in production
- **Email:** Resend adapter (`RESEND_API_KEY`)

Required environment variables (copy `.env.example` to `.env`):
```
DATABASE_URL
PAYLOAD_SECRET
NEXT_PUBLIC_SERVER_URL
CRON_SECRET
PREVIEW_SECRET
BLOB_READ_WRITE_TOKEN   # optional locally, required in production
RESEND_API_KEY          # optional locally
```

### Collections

| Slug | Purpose |
|------|---------|
| `pages` | Layout-builder pages with hero, blocks, SEO, draft/scheduled publishing |
| `posts` | Blog/news articles with rich text, categories, related posts |
| `media` | Images/videos; multiple auto-generated sizes stored in Vercel Blob |
| `categories` | Nested taxonomy for posts |
| `users` | Authentication; roles: `admin` or `editor` |
| `cemeteries` | **Custom collection** — cemetery locations with hours, address, phone, image |

Globals: `header` (nav links) and `footer` (columns + social links).

### Cemeteries Collection

This is the primary domain-specific addition to the template. `getCemeteries()` ([src/utilities/getCemeteries.ts](src/utilities/getCemeteries.ts)) fetches and normalizes the cemetery data into two compatible shapes:

- **Payload shape:** `name`, `address`, `phone`, `workingHours.weekday/weekend`, `detailsLink`, `image`
- **Block-compatible shape:** `cemeteryTitle`, `cemeteryAddress`, `cemeteryPhone`, `hoursWeekdays`, `hoursSaturday`

Both shapes are returned on the same object so existing consumers continue to work during migration.

### Content Rendering

Pages use a **layout builder** pattern — a `layout` field on `pages` is an array of blocks. Block configs live in `src/blocks/*/config.ts` and their React components co-locate in the same directory. Current blocks: `ArchiveBlock`, `Banner`, `CallToAction`, `Code`, `Content`, `Custom`, `Form`, `MediaBlock`, `RelatedPosts`, `BlogCustom`/`PullQuote`.

Rich text (Lexical editor) is configured in `src/fields/defaultLexical.ts` and shared across collections.

### Design Token System

CSS variables live in [globals.css](src/app/(frontend)/globals.css) and map to Tailwind classes via [tailwind.config.mjs](tailwind.config.mjs).

**Brand green scale** (darkest → lightest): `brand-darkest` → `brand-dark` → `brand` → `brand-mid` → `brand-light`

**Gold/warm-accent scale** (lightest → deepest): `gold-light` (cream borders/skeletons) → `gold` (main accent) → `gold-deep` (amber hover)

**Surface**: `surface` is the lighter off-white background for cards, inputs, and panels (distinct from `background` which is the page background).

Key rules:
- Card/panel borders: `border-gold-light`
- Card/panel backgrounds: `bg-surface`
- Body text color: `text-foreground`; secondary/subdued text: `text-brand-mid`
- Interactive elements hover: `hover:bg-brand-darkest` (default button), `hover:bg-gold-light` (nav dropdowns)
- Skeleton loader placeholders: `bg-gold-light`

### On-Demand Revalidation (ISR)

`afterChange` hooks on Pages and Posts call `revalidatePath`/`revalidateTag` so the Next.js cache is purged when content is published. Draft content is previewed via `/next/preview` using `PREVIEW_SECRET`.

### Access Control

Access control functions are in `src/access/`. The pattern is composable — e.g., `authenticatedOrPublished` allows logged-in users to see drafts and anonymous users to see only published docs. The `isAdmin` check reads `req.user.role === 'admin'`.

### Type Safety

`src/payload-types.ts` is auto-generated — **never edit it manually**. Use `pnpm generate:types` after schema changes. Path alias `@/*` maps to `src/*`; `@payload-config` maps to `src/payload.config.ts`.

### Scheduled Publishing / Cron

Payload's jobs queue handles scheduled publishing. The `/api/payload-jobs/run` endpoint is authenticated via `CRON_SECRET` Bearer token for Vercel Cron calls.
