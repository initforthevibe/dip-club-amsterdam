# Dip Club Design System — "Framed Minimal"

**Date:** 2026-06-11
**Status:** Approved by Pascal (brainstorming session)
**Reference:** https://wolverineworldwide.com/

## Summary

Restyle the Dip Club Amsterdam site on a design system borrowed from wolverineworldwide.com: media inset in rounded frames with small margins, one neo-grotesque typeface at all sizes, a monochrome canvas where photography carries the color, and terracotta reserved exclusively for the primary CTA. All content and section order stay unchanged.

## What we borrow from the reference

- **Inset rounded media frame.** Hero media sits in a ~20px-radius frame inset from the viewport edge, so the page background shows around it. Media reads as a framed object, not a backdrop.
- **One typeface, drama from scale.** A single grotesque does display, body, buttons, and labels. Headlines are sentence case, punctuated with periods ("Make. Every Day. Better.").
- **Floating pill nav.** Transparent over the hero; detaches into a centered dark pill on scroll.
- **Utility cards and panels.** Small rounded cards float over heroes; featured content lives in full-width rounded dark panels. Buttons are pills with arrows.
- **Whitespace as the brand.** White base, near-black text, color only via photography — plus, in our case, one terracotta CTA.

## Foundations

### Typography — Switzer everywhere

Switzer (Fontshare, free license permits self-hosting) replaces Anton SC, TAN Tangkiwood, DM Sans, and Playfair Display, all of which are removed from the codebase. Self-hosted woff2 via `next/font/local`, weights 400/500/600.

| Role | Spec | Use |
|---|---|---|
| display | 500, clamp(56px→120px), lh 0.98, tracking -0.025em | Hero headlines. Sentence case with periods. |
| statement | 500, clamp(26px→44px), lh 1.18, tracking -0.02em | Big editorial paragraphs; the default section heading. |
| title | 500, 19px | Card and subsection titles. |
| body | 400, 15px, lh 1.55 | Body copy. Muted ink for secondary text. |
| micro | 400, 11px, uppercase, tracking 0.16em | Labels, dates, metadata. |

### Color — five tokens

| Token | Value | Use |
|---|---|---|
| paper | #FFFFFF | Page canvas |
| ink | #0D0D0D | Text, dark panels |
| mist | #F0EFED | Secondary fills (secondary buttons, subtle cards) |
| terracotta | #F06530 | Primary CTA (WhatsApp join) only — nowhere else |
| terracotta-dark | #DB5520 | Primary CTA hover |

Muted text = ink at 50–60% opacity. Hairline borders = ink at 8%. Retired: blue #2e77d4, green #4A7C59, off-white #e8e5e2, and the `.bg-wavy` / `.bg-topo` / `.bg-topo-light` patterns.

### Shape & spacing

- Radii: 20px media frames/panels, 12px cards, full pill (999px) buttons.
- Hero/media frame inset from viewport: 8px mobile / 16px desktop.
- Content container stays `max-w-[1320px]`; section rhythm stays `py-24 lg:py-32`.
- Button arrows are `→` (replacing `↘`); external links may use `↗`.

All tokens live in `app/globals.css` under the Tailwind v4 `@theme` block (no config file, per project rules).

## Primitives — `app/components/ui/`

Six components encode the patterns once; pages compose them.

1. **`Button`** — `href`, `variant: primary | secondary | ghost`. Pill shape. Primary is terracotta and reserved for the WhatsApp join; secondary is mist; ghost is white-outlined for use on photos.
2. **`MediaFrame`** — `src`, `alt`, optional `inset` (full-viewport hero mode with the 8/16px margins), `ratio`, `overlay`. The rounded frame for all imagery; replaces every bare `rounded-sm` image.
3. **`UtilityCard`** — `label`, `title`, `meta`, optional `image`, `href`, `tone: light | dark`. The small floating card: image thumb, micro label, title with arrow.
4. **`PillNav`** — navbar behavior: transparent over hero → centered floating dark pill on scroll, Join CTA inside.
5. **`StatementBlock`** — optional `eyebrow`, `cta`. The huge editorial paragraph, offset right on desktop. Replaces the eyebrow + Anton heading + italic-accent pattern.
6. **`SectionPanel`** — `tone: dark | mist`. Full-width rounded panel for featured content; replaces the bordered contact/join cards.

`ActivityCard`, `FieldNoteCard`, `StatsBar`, `Footer`, `Navbar` are restyled on top of these. `ScrollReveal` survives unchanged.

## Page application

Content and section order unchanged everywhere.

### Homepage

1. **Hero** — full-viewport inset `MediaFrame`, display type bottom-left, primary + ghost `Button`, "Next dip" `UtilityCard` bottom-right. The orange curtain reveal retires, replaced by a quiet fade/scale on media with staggered text.
2. **Intro** — `StatementBlock` offset right.
3. **Pillars** — numbered hairline grid (01–05, micro labels); the 6px dark borders go.
4. **Activities** — `MediaFrame` cards with micro frequency labels; per-card accent colors retired, photography differentiates.
5. **Stats** — huge Switzer numerals + micro labels (Wolverine ticker style).
6. **Europe** — `MediaFrame` + `StatementBlock` pair.
7. **Contact/Join** — single dark `SectionPanel` with terracotta WhatsApp button; the only terracotta below the hero.

### Inner pages (dips, excursions, adventures, about, manifesto, contact)

Shorter inset `MediaFrame` hero (~70vh) + `StatementBlock` intro + the same patterns.

### Field Notes

Listing: `UtilityCard` grid. Post pages: narrow prose column, 15px body, statement-style headings. Pillar names unchanged (Cold Exposure, Heat Exposure, Breathwork, Time in Nature, Real Connection).

### Footer

Dark rounded panel with a large wordmark.

## Motion

- `ScrollReveal` (IntersectionObserver) stays for section entrances.
- Hero: media fade/scale-in, staggered text reveal. No curtain.
- PillNav detach/attach transition on scroll.

## Implementation approach (approved: option 1)

Tokens + primitives layer, then restyle in place:

1. Tokens in `@theme`, Switzer via `next/font/local`, remove retired fonts/patterns.
2. Build the six primitives in `app/components/ui/`.
3. Restyle homepage first as the proof, then inner pages, then Field Notes.
4. Update CLAUDE.md design constraints to describe this system (the current section describes an obsolete dark/yellow theme).

Constraints honored: static export (no server features), WhatsApp join remains the primary CTA on every page, section order unchanged, `next/image` with explicit sizing, links read from content/props.

## Out of scope

- New content, copy changes beyond headline casing (uppercase → sentence case with periods where the display role applies).
- New pages or sections; CMS; video sourcing for the hero (system supports video in `MediaFrame` when an asset exists).
- Licensing ABC Diatype (declined — Switzer chosen instead).
