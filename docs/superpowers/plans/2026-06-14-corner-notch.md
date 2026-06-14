# Corner-notch motif Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut a rounded concave notch from the bottom-right corner of the activity cards and the home hero, leaving a tab, as one shared shape motif.

**Architecture:** A single pure helper (`lib/notch.ts`) returns a `clip-path: shape()` string for a bottom-right notch. Both surfaces import it and apply it via inline `style`. The shape uses percentage width + pixel depth/radii so it tracks each fluid-width element; browsers without `shape()` ignore the value and fall back to the element's existing `border-radius`.

**Tech Stack:** Next.js 15 (static export), React 19, Tailwind v4, TypeScript, CSS `clip-path: shape()`.

**Spec:** `docs/superpowers/specs/2026-06-14-corner-notch-design.md`

**Testing note:** This repo has **no unit-test runner** (only `npm run dev`, `npm run build`, `npm run lint`). Per the project's established workflow, each task is verified by TypeScript type-check (`npx tsc --noEmit`), the production build, lint, and **visual confirmation in the browser via the Playwright tools / `webapp-testing` skill** against the dev server. There are no fabricated unit tests in this plan.

---

## File Structure

- **Create** `lib/notch.ts` — pure helper `bottomRightNotch(opts)` returning a `clip-path` string. One responsibility: geometry of the notch. No React, no DOM.
- **Modify** `app/components/ActivityCard.tsx` — apply the clip; relocate the decorative chevrons to the image's top-right; simplify the bottom row to just the pill.
- **Modify** `app/components/HomeHero.tsx` — apply the clip to the hero frame; remove the floating Field Notes `UtilityCard` (block, prop, import).
- **Modify** `app/page.tsx` — drop the `utility={…}` argument and the now-unused `latestPost` constant.

## Prerequisite: dev server (one-time, for visual steps)

Start the dev server once and reuse it across tasks:

Run: `npm run dev`
Expected: `▲ Next.js ...  - Local: http://localhost:3000` and "Ready". Leave it running (it hot-reloads). Use the Playwright browser tools to navigate to `http://localhost:3000` for visual checks.

---

## Task 1: Notch geometry helper

**Files:**
- Create: `lib/notch.ts`

- [ ] **Step 1: Create the helper**

Create `lib/notch.ts` with exactly this content:

```ts
type BottomRightNotchOptions = {
  /** Outer corner radius in px (e.g. 12 for cards, 20 for the hero frame). */
  outerRadius: number;
  /** Notch width as a CSS length or percentage of element width, e.g. "33.33%". */
  notchWidth: string;
  /** Notch depth measured up from the bottom edge, in px. */
  notchDepth: number;
  /** Radius of the three notch corners, in px. */
  notchRadius: number;
};

/**
 * Builds a `clip-path` value: a rounded rectangle with a rounded concave notch
 * removed from the bottom-right corner, leaving a tab. Uses the CSS `shape()`
 * function so the notch tracks the element's fluid width (notch width may be a
 * percentage). Browsers without `shape()` ignore the invalid value and fall
 * back to the element's own `border-radius`.
 *
 * Outline is traversed clockwise from the top edge. All corners are rounded;
 * the inner re-entrant corner is concave (`ccw`), the rest are convex (`cw`).
 */
export function bottomRightNotch({
  outerRadius: o,
  notchWidth: w,
  notchDepth: d,
  notchRadius: r,
}: BottomRightNotchOptions): string {
  return [
    "shape(",
    `from ${o}px 0,`,
    `hline to calc(100% - ${o}px),`,
    `arc to 100% ${o}px of ${o}px cw,`,
    `vline to calc(100% - ${d + r}px),`,
    `arc to calc(100% - ${r}px) calc(100% - ${d}px) of ${r}px cw,`,
    `hline to calc(100% - ${w} + ${r}px),`,
    `arc to calc(100% - ${w}) calc(100% - ${d - r}px) of ${r}px ccw,`,
    `vline to calc(100% - ${r}px),`,
    `arc to calc(100% - ${w} - ${r}px) 100% of ${r}px cw,`,
    `hline to ${o}px,`,
    `arc to 0 calc(100% - ${o}px) of ${o}px cw,`,
    `vline to ${o}px,`,
    `arc to ${o}px 0 of ${o}px cw,`,
    "close",
    ")",
  ].join(" ");
}
```

- [ ] **Step 2: Type-check the new file**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0 (the file compiles; no type errors anywhere).

- [ ] **Step 3: Eyeball the generated string**

Run: `node --input-type=module -e "import('./lib/notch.ts').catch(()=>{});" 2>/dev/null; node -e "const s=require('fs').readFileSync('lib/notch.ts','utf8'); console.log(s.includes('shape(') && s.includes('ccw') ? 'helper present (manual visual check happens in Task 2/3)' : 'MISSING tokens')"`
Expected: prints `helper present (manual visual check happens in Task 2/3)`. (The string itself is verified visually once it's applied to a real element in the next tasks — `shape()` cannot be checked headlessly without a browser.)

- [ ] **Step 4: Commit**

```bash
git add lib/notch.ts
git commit -m "feat: add bottom-right notch clip-path helper"
```

---

## Task 2: Notch on the activity cards + relocate chevrons

**Files:**
- Modify: `app/components/ActivityCard.tsx`

- [ ] **Step 1: Replace the component**

Replace the entire contents of `app/components/ActivityCard.tsx` with:

```tsx
import Image from "next/image";
import Link from "next/link";
import { bottomRightNotch } from "@/lib/notch";

// Shallow button-sized notch, ~1/3 of the card width. rounded-card = 12px.
const NOTCH_CLIP = bottomRightNotch({
  outerRadius: 12,
  notchWidth: "33.33%",
  notchDepth: 64,
  notchRadius: 14,
});

type ActivityCardProps = {
  title: string;
  frequency: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export default function ActivityCard({
  title,
  frequency,
  description,
  imageSrc,
  imageAlt,
  href,
}: ActivityCardProps) {
  return (
    <Link href={href} className="group flex h-full">
      <article
        className="flex w-full flex-col rounded-card border border-terracotta-dark/50 bg-terracotta bg-lines-diagonal p-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-terracotta-dark"
        style={{ clipPath: NOTCH_CLIP }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Decorative danger chevrons — moved to the image's top-right */}
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          >
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="-ml-2 first:ml-0"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            ))}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 pb-3">
          <p className="type-micro text-white/70">{frequency}</p>
          <h3 className="type-title mt-1 text-white">{title}</h3>
          <p className="type-body mt-2 flex-1 text-white/80">{description}</p>
          <div className="mt-5">
            {/* Visual button only — the whole card is the link, so this must not be an anchor */}
            <span className="inline-flex w-fit items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-sm font-medium text-ink">
              Learn more
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:-rotate-45"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
```

What changed vs. the original: added the `bottomRightNotch` import + `NOTCH_CLIP` constant; added `style={{ clipPath: NOTCH_CLIP }}` to the `<article>`; moved the chevron `<span>` from the bottom row into the image container as `absolute right-3 top-3` with a `drop-shadow` for legibility; replaced the `flex items-center justify-between` bottom row with a plain `mt-5` wrapper holding only the pill.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Visual verification (desktop + mobile)**

With the dev server running, use the Playwright tools:
1. Navigate to `http://localhost:3000`.
2. Resize to 1280×900, scroll to the "Our activities." section, screenshot.
   Expected: each terracotta card has a **rounded concave cut at the bottom-right** revealing the white page; the **"Learn more" pill sits in the bottom-left tab**; the **chevrons are at the top-right of each photo**; outer corners still rounded.
3. Resize to 390×844 (mobile), screenshot the same section.
   Expected: cards are full-width, notch still renders at bottom-right, pill clear of it.

Check the longest card ("Adventures" — "Multi-day long-distance hikes…"): confirm its description text is **not visibly clipped** at the bottom-right. If it is, reduce `notchDepth` (e.g. 56) or the description's bottom spacing and re-screenshot.

- [ ] **Step 4: Commit**

```bash
git add app/components/ActivityCard.tsx
git commit -m "feat: notch the activity cards, move chevrons to image corner"
```

---

## Task 3: Notch on the home hero + remove the floating card

**Files:**
- Modify: `app/components/HomeHero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `HomeHero.tsx`**

Replace the entire contents of `app/components/HomeHero.tsx` with:

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import { SITE } from "@/lib/site";
import { bottomRightNotch } from "@/lib/notch";

// Slim shelf, ~1/3 width, ~1.5 button-heights deep. rounded-frame = 20px.
const NOTCH_CLIP = bottomRightNotch({
  outerRadius: 20,
  notchWidth: "33.33%",
  notchDepth: 72,
  notchRadius: 20,
});

type HomeHeroProps = {
  backgroundImage: string;
  backgroundAlt: string;
};

export default function HomeHero({
  backgroundImage,
  backgroundAlt,
}: HomeHeroProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stagger = (delay: string) =>
    [
      "transition-all duration-700 ease-out",
      revealed ? `opacity-100 translate-y-0 ${delay}` : "opacity-0 translate-y-4",
    ].join(" ");

  return (
    <section className="bg-paper p-2 lg:p-4">
      <div
        className={[
          "relative min-h-[560px] overflow-hidden rounded-frame h-[calc(100svh-16px)] lg:h-[calc(100svh-32px)]",
          "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          revealed ? "scale-100" : "scale-[0.94]",
        ].join(" ")}
        style={{ clipPath: NOTCH_CLIP }}
      >
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className={[
            "object-cover transition-all duration-[1400ms] ease-out",
            revealed ? "scale-100 opacity-100" : "scale-105 opacity-0",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/35" />

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14 lg:pb-[106px]">
          <div>
            <h1
              className={["type-display text-white lg:whitespace-nowrap", stagger("delay-300")].join(" ")}
              style={{ fontSize: "clamp(4.2rem, 10vw, 9rem)", fontWeight: 550 }}
            >
              Reset. Your. Mind.
            </h1>
            <p className={["type-title mt-4 max-w-xl text-white/85", stagger("delay-500")].join(" ")}>
              Amsterdam&apos;s social adventure community focused on reconnecting
              with nature.
            </p>
            <div className={["mt-7 flex flex-wrap gap-3", stagger("delay-700")].join(" ")}>
              <Button href={SITE.whatsapp} variant="primary">
                Join the WhatsApp community
              </Button>
              <Button href="#activities" variant="ghost">
                See activities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

What changed vs. the original: removed the `UtilityCard` import; removed the `utility` field from `HomeHeroProps` and the destructure; removed the entire `{utility && (…)}` floating-card block; added the `bottomRightNotch` import, the `NOTCH_CLIP` constant, and `style={{ clipPath: NOTCH_CLIP }}` on the inner hero `<div>`.

- [ ] **Step 2: Update `app/page.tsx`**

In `app/page.tsx`, delete the now-unused `latestPost` line. Change:

```tsx
  const posts = getAllPosts();
  const latestPost = posts[0];
```

to:

```tsx
  const posts = getAllPosts();
```

Then replace the `<HomeHero …>` element (the one passing `utility`) with the no-`utility` version:

```tsx
      <HomeHero
        backgroundImage="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
        backgroundAlt="Dip Club members at an Amsterdam swimming spot against the city skyline"
      />
```

(Leave `const posts = getAllPosts();` and the `posts.map(...)` in the Field Notes section untouched — `posts` is still used there.)

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0. (This proves the removed `utility` prop and `latestPost` are no longer referenced anywhere — a dangling reference would error here.)

- [ ] **Step 4: Visual verification**

With the dev server running, use the Playwright tools:
1. Navigate to `http://localhost:3000`, resize to 1280×900, screenshot the top of the page.
   Expected: the hero has a **slim rounded notch at the bottom-right** revealing white; **no floating Field Notes card**; the headline + both buttons are unchanged at the bottom-left.
2. Resize to 390×844, screenshot.
   Expected: notch still renders; the wrapped buttons at bottom-left do **not** overlap the notch. If they do, that is a small-screen tuning item — note it for the live review (e.g. drop the notch below `sm`).

**Safari/transform contingency:** the notch sits on the same element that runs the reveal `scale` animation. If on-device Safari shows a clip/repaint glitch during the reveal, move the `style={{ clipPath: NOTCH_CLIP }}` onto a new non-animated wrapper `<div>` placed between the `<section>` and the animated inner `<div>` (give the wrapper `rounded-frame overflow-hidden`). Only do this if a glitch is actually observed.

- [ ] **Step 5: Commit**

```bash
git add app/components/HomeHero.tsx app/page.tsx
git commit -m "feat: notch the home hero, remove floating field-notes card"
```

---

## Task 4: Full build, lint, and cross-browser verification

**Files:** none (verification + fixups only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes; static export to `/out` succeeds; no type or lint errors. (Confirms the static-export site still generates with the removed prop and the new clip.)

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (no unused `latestPost`, no unused `UtilityCard` import).

- [ ] **Step 3: Cross-browser notch check**

`clip-path: shape()` is the one feature with browser-support risk. With the dev server running, verify the notch renders in more than Chromium:
- Use the Playwright tools to screenshot the hero and `#activities` (the default Chromium engine counts as one).
- Verify in **Safari** and **Firefox** as well — either via Playwright's WebKit/Firefox engines or by asking the user to glance at `http://localhost:3000` in those browsers.

Expected in every browser: the bottom-right notch is visible with rounded corners (the inner corner curving *into* the card, not bulging out).

If a browser shows **no notch** (plain rounded rectangle): that browser lacks `shape()` — acceptable graceful degradation, note it. If a browser shows a **broken/wrong** shape: switch the helper to the measured-`path()` fallback described in the spec (§ Implementation approach B) — wrap each element in a `"use client"` component that reads width via `ResizeObserver` and feeds it to a `path()` variant of the helper.

- [ ] **Step 4: Update the board card**

The In Progress card stays unchecked until the PR merges (the work isn't done at code-complete). No edit needed now; it gets checked off (`- [x]`) and moved to Done in the same PR/commit that merges, per `docs/BOARD.md` conventions.

- [ ] **Step 5: Stop the dev server**

Stop the `npm run dev` process.

---

## Self-Review

**Spec coverage:**
- Shape (rounded concave bottom-right notch, square edges, all corners rounded) → Task 1 helper. ✓
- Activity card: ~1/3 width, ~64px deep, pill in tab, chevrons → image top-right → Task 2. ✓
- Hero: ~1/3 width, ~72px slim shelf, empty, drop floating card → Task 3. ✓
- `lib/notch.ts` shared helper → Task 1. ✓
- `clip-path: shape()` primary + graceful degradation + measured-`path()` fallback → Task 1 (doc) + Task 4 Step 3. ✓
- Branch → PR rollout, master auto-deploys → handled outside the plan (branch already created); board card → Task 4 Step 4. ✓
- Out of scope (subpage Hero, slant, SVG stroke, docked content) → not touched. ✓

**Placeholder scan:** No TBD/TODO; every code step has complete code; verification steps have exact commands + expected output. ✓

**Type consistency:** Helper is `bottomRightNotch({ outerRadius, notchWidth, notchDepth, notchRadius })` in Task 1 and called with exactly those keys in Tasks 2 and 3. `NOTCH_CLIP` is the const name in both components. ✓
