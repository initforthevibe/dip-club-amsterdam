# Dip Club Amsterdam Website — Claude Instructions

Static marketing site for Dip Club Amsterdam (urban wellness community: ice baths, breathwork, outdoor activities). Internal Ryzo side project. Next.js 15 static export on Vercel.

## Dev Commands

```bash
npm run dev      # localhost:3000
npm run build    # static export to /out
npm run lint
```

Deploy: `git push` to main → Vercel auto-deploys. No separate deploy step needed.

## Stack & Gotchas

- **Static export** (`output: 'export'` in next.config.ts) — no server-side features. No API routes, no middleware, no `cookies()`, no `headers()`.
- **Tailwind v4** — custom theme values live in `globals.css` under `@theme {}` block, not in `tailwind.config.ts`. Don't add a config file.
- WhatsApp join link is the **primary conversion CTA** on every page — don't remove or bury it.
- `ScrollReveal` uses `IntersectionObserver` — add `"use client"` to any component using it.
- **React 19** required — next-mdx-remote@6 needs React 19 to work with Next.js 15 RSC rendering.
- Switzer loads via `next/font/local` from `app/fonts/` — no Google Fonts, no `<link>` tags

## Design Constraints (non-negotiable)

Design system spec: `docs/superpowers/specs/2026-06-11-design-system-design.md` ("Framed Minimal").

- Canvas: white `#FFFFFF` (paper), text near-black `#0D0D0D` (ink), secondary fills `#F0EFED` (mist)
- Terracotta `#F06530` appears ONLY on the primary CTA (WhatsApp join) — never as decoration
- One typeface: Switzer (self-hosted via next/font/local, `app/fonts/`) — five type roles as `type-display/statement/title/body/micro` utilities in globals.css
- Media always sits in rounded frames: `rounded-frame` (20px) / `rounded-card` (12px); heroes are inset 8px/16px from the viewport via MediaFrame pattern
- Buttons are pills — use `app/components/ui/Button`, never hand-rolled
- Compose pages from `app/components/ui/` primitives (Button, MediaFrame, UtilityCard, StatementBlock, SectionPanel) + JoinPanel
- Display headlines are sentence case with periods ("Reset. Your. Mind.")

## Structure

```
app/
  layout.tsx          → fonts + global styles
  page.tsx            → section composition only
  components/         → one file per section/component
  field-notes/        → blog listing + [slug] post pages
lib/
  field-notes.ts      → getAllPosts(), getPostBySlug() — data utilities
  site.ts            → SITE constants — external links (WhatsApp/Instagram/email) always come from here
content/
  field-notes/        → .mdx blog posts (frontmatter: title, date, pillars, excerpt, coverImage)
```

## Key Rules

- Don't add server-side features — this is a static export
- Don't hardcode WhatsApp/Instagram/email links in components — read from `content/` or props
- Don't change section order without explicit instruction
- All images via `next/image` with explicit width + height
- Field Notes pillars must match exactly: Cold Exposure, Heat Exposure, Breathwork, Time in Nature, Real Connection
