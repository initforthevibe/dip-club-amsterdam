# Corner-notch motif — activity cards + home hero

**Date:** 2026-06-14
**Status:** Approved design, ready for implementation plan
**Surfaces:** `app/components/ActivityCard.tsx`, `app/components/HomeHero.tsx`

## Goal

Introduce one shape motif across the homepage: a **rounded concave notch cut from the
bottom-right corner**, leaving a tab. It makes the activity cards and the hero
asymmetric and distinctive while staying inside the "Framed Minimal" system
(`docs/superpowers/specs/2026-06-11-design-system-design.md`).

## The shape

A rounded rectangle with a rectangular bite removed from the bottom-right corner.
Traversed clockwise from the top-left, the outline has six rounded corners:

1. Top-left — outer convex, radius `Ro`
2. Top-right — outer convex, radius `Ro`
3. Right edge meets top of notch — **convex**, radius `rn`
4. Inner re-entrant corner — **concave**, radius `rn`
5. Bottom of notch meets bottom edge — **convex**, radius `rn`
6. Bottom-left — outer convex, radius `Ro`

Every corner is rounded, including the concave one — that is the defining detail. The
edges are square (no slant). The removed region is empty negative space: the white
canvas (`#FFFFFF`) behind the element shows through.

Parameters:

| Param | Meaning | Activity card | Home hero |
|-------|---------|---------------|-----------|
| `Ro`  | outer corner radius | `12px` (`--radius-card`) | `20px` (`--radius-frame`) |
| notch width | fraction of element width | **~1/3 (33.3%)** | **~1/3 (33.3%)** |
| notch depth | from the bottom edge up | **~64px** (just clears the "Learn more" pill) | **~72px** (≈1.5× the ~48px button) |
| `rn`  | notch corner radius | `~14px` | `~20px` |

Widths are fractional (scale with the element); depth and radii are fixed px. Final
values get dialed in live on the dev server.

## Surface 1 — Activity cards (`ActivityCard.tsx`)

Three cards in a responsive grid on the homepage (`app/page.tsx`, `#activities`).

Changes:
- Apply the notch clip to the `<article>` (terracotta + `bg-lines-diagonal` element).
  The image, texture, and fill all clip together; the top image area is unaffected
  because the notch sits at the bottom.
- The **"Learn more" pill stays in the bottom-left tab** (it already renders there). The
  bottom-right, where the decorative chevrons used to sit, becomes the empty notch.
- **Relocate the decorative chevrons** from the bottom-right of the text block to the
  **top-right corner of the image** (absolutely positioned inside the rounded image
  frame, above the photo). Keep them white; add a subtle text-shadow if legibility over
  lighter photos needs it (decide live).
- Remove the old `justify-between` bottom row; the bottom row now holds only the pill.
- Ensure the description text does not flow into the notch region (it sits above the
  button row, so this should hold — verify at narrow widths).

Unchanged: hover lift (`group-hover:-translate-y-1`), border color transition, the whole
card remaining a single `Link`, the visual-only (non-anchor) pill.

Note on the border: the existing `border border-terracotta-dark/50` is clipped along the
notch edge, so that edge renders without a stroke. The silhouette reads against the white
canvas; accept the missing stroke by default. If a crisp notch edge is wanted later, add
an SVG stroke overlay (out of scope for v1).

## Surface 2 — Home hero (`HomeHero.tsx`)

Changes:
- Apply the notch clip to the inner `rounded-frame` hero `<div>` (the one that holds the
  background image, gradient overlay, and content). It already has `overflow-hidden`; the
  reveal `scale` transition composes fine with `clip-path`.
- **Remove the floating Field Notes utility card** (the `utility` block + the `UtilityCard`
  import) — it competes with the primary WhatsApp CTA and collides with the notch corner.
  Drop the `utility` prop from `HomeHero` and the `utility={…}` argument in `app/page.tsx`.
  `getAllPosts()`/`latestPost` stay (still used by the Field Notes section).
- Headline, paragraph, and buttons stay bottom-left, untouched.
- The notch is a slim shelf (~1/3 wide × ~72px), empty.

Mobile: the utility card is already `hidden lg:block`, so removing it has no mobile
effect. Verify the hero buttons (which wrap bottom-left) do not collide with the notch on
narrow screens; if they crowd, reduce notch presence at small breakpoints (decide live).

## Implementation approach

Both elements are **fluid-width**, so the notch must track real width. `clip-path: path()`
takes only px (no %, no right-edge anchor), so a static `path()` cannot express "1/3 of
width." Two viable approaches:

**A. `clip-path: shape()` (recommended).** The CSS `shape()` function mixes `%` and `px`
with `line`/`arc` commands and rounded corners, so it expresses the notch directly: notch
width as `33.3%`, depth and radii in px, anchored to the corners. Pure CSS, no JS.
Graceful degradation: a browser without `shape()` ignores the invalid value and shows a
normal rounded rectangle (`border-radius` still applies) — no broken layout, just no
notch. **Validate rendering in Chrome, Safari, and Firefox on the dev server** before
committing; confirm the concave arc sweeps the right way (the inner corner curves into the
material, not out).

**B. Measured `path()` via a small client helper (fallback).** If `shape()` support or
quality disappoints, wrap the element in a `"use client"` component that reads width via
`ResizeObserver` and sets `clip-path: path(...)` with computed px. Works everywhere; costs
a little JS and risks a first-paint flash before measurement. `HomeHero` is already a
client component; `ActivityCard` would need `"use client"` added.

**Shared geometry helper.** Add `lib/notch.ts` exporting a single function that returns
the clip-path string from `{ outerRadius, notchWidthPct, notchDepthPx, notchRadiusPx }`,
used by both surfaces so the shape is defined once. With approach A it returns a static
`shape()` string; if we fall back to B it returns a `path()` string given a measured
width.

No new design tokens needed; reuse `--radius-card`, `--radius-frame`, `--color-terracotta`,
and the `bg-lines-diagonal` utility. Keep the surfaces flat (no drop-shadow) to match the
design system — the shadows in the brainstorm mockups were for on-screen legibility only.

## Out of scope

- Subpage `Hero.tsx` (only the home hero gets the notch for now).
- Any slanted/diagonal notch edge (square edges chosen).
- An SVG stroke along the notch edge.
- Docking any content into the negative space (it stays empty).

## Files touched

- `app/components/ActivityCard.tsx` — notch clip, relocate chevrons, simplify bottom row
- `app/components/HomeHero.tsx` — notch clip, remove floating utility card + import/prop
- `app/page.tsx` — drop the `utility={…}` argument
- `lib/notch.ts` — new shared clip-path helper
- `docs/BOARD.md` — card lifecycle

## Rollout

Branch `style/corner-notch-cards-hero` → PR (master auto-deploys production on Vercel; no
direct push). Tune exact px live on the dev server before requesting merge.
