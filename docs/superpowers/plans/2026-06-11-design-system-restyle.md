# Dip Club Design System Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the entire Dip Club site to the approved "Framed Minimal" design system (spec: `docs/superpowers/specs/2026-06-11-design-system-design.md`): Switzer typeface everywhere, monochrome canvas with terracotta reserved for the primary CTA, media in rounded inset frames, six UI primitives.

**Architecture:** Tokens land first in `globals.css` (`@theme`) alongside legacy tokens, six primitives go into `app/components/ui/`, then pages are restyled in place — homepage first, then inner pages, then Field Notes. A final cleanup task removes all legacy tokens, fonts, and patterns. Content and section order never change.

**Tech Stack:** Next.js 15 static export, React 19, Tailwind v4 (`@theme` in globals.css, NO tailwind.config), `next/font/local` for Switzer.

**Verification model:** This project has no test suite (static marketing site). The gate for every task is: `npm run build` succeeds (static export) + `npm run lint` passes. Visual verification happens at the marked checkpoint after the homepage task. Never claim a task done without running both commands.

**Hard rules from CLAUDE.md (apply to every task):**
- No server-side features (static export).
- WhatsApp join stays the primary CTA on every page.
- Section order on pages never changes.
- All images via `next/image` (fill or explicit width/height).
- `"use client"` required for anything using hooks/IntersectionObserver.
- Field Notes pillar names are fixed: Cold Exposure, Heat Exposure, Breathwork, Time in Nature, Real Connection.

---

## Class transformation vocabulary (used across all tasks)

When restyling existing JSX, apply these mappings. This is the single source of truth — later tasks reference it as "the mapping table".

| Old pattern | New pattern |
|---|---|
| `bg-offwhite` | `bg-paper` |
| `bg-[#e8e5e2]` | `bg-paper` |
| `text-dark` / `text-[#1e1e1e]` | `text-ink` |
| `bg-dark` (fills) | `bg-ink` |
| `text-slate` | `text-ink/60` |
| `text-white/70` (on dark) | `text-white/65` (keep similar values as-is) |
| `border-dark/5`, `border-dark/10` | `border-ink/10` |
| `font-heading text-7xl…uppercase` (h1) | `type-display` (+ copy becomes sentence case with period, e.g. "DIPS" → "Dips.") |
| `font-heading text-3xl sm:text-4xl…font-extrabold` (h2) | `type-statement` |
| `font-heading text-base/xl font-extrabold uppercase` (h3) | `type-title` (drop uppercase) |
| `<span className="font-accent italic">word</span>` | unwrap — keep the word, delete the span |
| `text-xs font-semibold uppercase tracking-[0.15em] text-terracotta` (eyebrow) | `type-micro text-ink/45` |
| body text `text-base leading-relaxed text-slate` | `type-body text-ink/60` |
| `rounded-none bg-white px-8 py-3.5 …` (CTA anchor) | `<Button variant="primary|secondary|ghost">` from `app/components/ui/Button` |
| `rounded-sm` image wrapper + `<Image fill>` | `<MediaFrame …>` from `app/components/ui/MediaFrame` |
| `border-[6px] border-dark` card/grid chrome | `rounded-card border border-ink/10` (cards) or `gap-px bg-ink/10` hairline grids |
| `bg-wavy`, `bg-topo`, `bg-topo-light` classes | delete the class |
| `<WaveDivider … />` | delete the element and its import |
| `↘` arrows in links/buttons | `→` (internal) / `↗` (external) — Button renders these automatically |
| `bg-terracotta` full-bleed CTA sections | `<JoinPanel />` (Task 2) |
| terracotta as decoration (badges, pillar text, hovers) | remove — terracotta appears ONLY on primary CTA buttons |

---

### Task 1: Switzer font, design tokens, site constants

**Files:**
- Create: `app/fonts/Switzer-Variable.woff2` (downloaded)
- Create: `lib/site.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Download Switzer from Fontshare**

```bash
mkdir -p app/fonts
curl -L "https://api.fontshare.com/v2/fonts/download/switzer" -o /tmp/switzer.zip
unzip -o /tmp/switzer.zip -d /tmp/switzer
find /tmp/switzer -name "Switzer-Variable.woff2" -not -path "*Italic*" | head -1
```

Copy the found file: `cp "<found path>" app/fonts/Switzer-Variable.woff2`. Verify: `ls -la app/fonts/` shows the woff2 (~50-200KB). The Fontshare license (ITF FFL) permits self-hosting; do NOT commit the zip, only the woff2.

- [ ] **Step 2: Create `lib/site.ts`**

Centralizes external links (CLAUDE.md forbids hardcoding them in components — current code violates this; new components read from here).

```ts
export const SITE = {
  whatsapp: "https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl",
  instagram: "https://www.instagram.com/dipclub.ams/",
  email: "hello@dipclub.nl",
} as const;
```

- [ ] **Step 3: Rewrite `app/layout.tsx`**

Replace the three Google fonts with local Switzer. Full new file:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dip Club Amsterdam — Seek Discomfort. Find Yourself.",
  description:
    "Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures. Join 200+ brave souls who chose discomfort over comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update `app/globals.css`**

Replace the existing `@theme` block with the version below (new tokens + legacy tokens kept temporarily), add the base layer and type-role utilities directly after it. Keep the existing two `@font-face` blocks and the `.bg-wavy`/`.bg-topo`/`.bg-topo-light` rules untouched for now (removed in Task 11 — un-restyled pages still use them mid-migration).

```css
@theme {
  /* Framed Minimal design system */
  --color-paper: #ffffff;
  --color-ink: #0d0d0d;
  --color-mist: #f0efed;
  --color-terracotta: #f06530;
  --color-terracotta-dark: #db5520;

  --font-sans: var(--font-switzer), system-ui, sans-serif;

  --radius-frame: 20px;
  --radius-card: 12px;

  /* LEGACY — removed in Task 11 once all pages are restyled */
  --color-blue: #2e77d4;
  --color-blue-dark: #2563b8;
  --color-green: #4A7C59;
  --color-dark: #1e1e1e;
  --color-offwhite: #e8e5e2;
  --color-slate: #5A5A5A;
  --font-display: "TAN Tangkiwood", serif;
  --font-heading: "Anton SC", "Inter", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-accent: "Playfair Display", Georgia, serif;
}

@layer base {
  body {
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
}

/* Type roles — the five voices of the system */
@utility type-display {
  font-weight: 500;
  font-size: clamp(3.5rem, 8.5vw, 7.5rem);
  line-height: 0.98;
  letter-spacing: -0.025em;
}
@utility type-statement {
  font-weight: 500;
  font-size: clamp(1.625rem, 3.4vw, 2.75rem);
  line-height: 1.18;
  letter-spacing: -0.02em;
}
@utility type-title {
  font-weight: 500;
  font-size: 1.1875rem;
  line-height: 1.3;
}
@utility type-body {
  font-weight: 400;
  font-size: 0.9375rem;
  line-height: 1.55;
}
@utility type-micro {
  font-weight: 400;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
```

Note: `--radius-frame`/`--radius-card` in `@theme` give you `rounded-frame` and `rounded-card` utilities (Tailwind v4 namespace convention). `--color-*` tokens give `bg-paper`, `text-ink`, `bg-mist`, etc.

- [ ] **Step 5: Verify build**

Run: `npm run build` — Expected: "✓ Compiled successfully", static export to `/out`, no font resolution errors.
Run: `npm run lint` — Expected: no errors.
The whole site now renders in Switzer (headings still Anton SC via legacy `font-heading` — expected mid-migration).

- [ ] **Step 6: Commit**

```bash
git add app/fonts lib/site.ts app/layout.tsx app/globals.css
git commit -m "feat(ds): add Switzer font, design tokens, type roles, site constants"
```

---

### Task 2: The UI primitives

**Files:**
- Create: `app/components/ui/Button.tsx`
- Create: `app/components/ui/MediaFrame.tsx`
- Create: `app/components/ui/UtilityCard.tsx`
- Create: `app/components/ui/StatementBlock.tsx`
- Create: `app/components/ui/SectionPanel.tsx`
- Create: `app/components/JoinPanel.tsx`

(PillNav is the Navbar rewrite — Task 3.)

- [ ] **Step 1: Create `app/components/ui/Button.tsx`**

```tsx
import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  className?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-dark",
  secondary: "bg-mist text-ink hover:bg-ink/10",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

export default function Button({
  href,
  variant = "secondary",
  children,
  className = "",
}: ButtonProps) {
  const isHttp = href.startsWith("http");
  const isExternal = isHttp || href.startsWith("mailto:");
  const classes = [
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
    VARIANTS[variant],
    className,
  ].join(" ");
  const arrow = <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>;

  if (isExternal) {
    return (
      <a
        href={href}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
```

- [ ] **Step 2: Create `app/components/ui/MediaFrame.tsx`**

```tsx
import Image from "next/image";

type MediaFrameProps = {
  src: string;
  alt: string;
  /** Sizing comes from the caller: aspect-[4/3], h-[400px], etc. */
  className?: string;
  radius?: "frame" | "card";
  sizes?: string;
  priority?: boolean;
  /** Dark gradient for text legibility over the media */
  overlay?: boolean;
  children?: React.ReactNode;
};

export default function MediaFrame({
  src,
  alt,
  className = "",
  radius = "frame",
  sizes = "100vw",
  priority = false,
  overlay = false,
  children,
}: MediaFrameProps) {
  return (
    <div
      className={[
        "relative overflow-hidden",
        radius === "frame" ? "rounded-frame" : "rounded-card",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />
      )}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
```

- [ ] **Step 3: Create `app/components/ui/UtilityCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";

type UtilityCardProps = {
  label: string;
  title: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
  href: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function UtilityCard({
  label,
  title,
  meta,
  image,
  imageAlt = "",
  href,
  tone = "light",
  className = "",
}: UtilityCardProps) {
  const isExternal = href.startsWith("http");
  const classes = [
    "group block rounded-card p-3 transition-transform duration-200 hover:-translate-y-0.5",
    tone === "light"
      ? "bg-white/95 text-ink backdrop-blur-sm"
      : "bg-ink text-white",
    className,
  ].join(" ");

  const body = (
    <>
      {image && (
        <div className="relative mb-3 h-28 overflow-hidden rounded-[8px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      )}
      <p
        className={[
          "type-micro",
          tone === "light" ? "text-ink/45" : "text-white/45",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">
        {title} <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>
      </p>
      {meta && (
        <p
          className={[
            "mt-1 text-xs",
            tone === "light" ? "text-ink/50" : "text-white/50",
          ].join(" ")}
        >
          {meta}
        </p>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
```

- [ ] **Step 4: Create `app/components/ui/StatementBlock.tsx`**

```tsx
import Button from "./Button";

type StatementBlockProps = {
  eyebrow?: string;
  children: React.ReactNode;
  cta?: { text: string; href: string };
  align?: "left" | "right";
};

export default function StatementBlock({
  eyebrow,
  children,
  cta,
  align = "left",
}: StatementBlockProps) {
  return (
    <div className={["flex", align === "right" ? "lg:justify-end" : ""].join(" ")}>
      <div className="max-w-2xl">
        {eyebrow && <p className="type-micro mb-5 text-ink/45">{eyebrow}</p>}
        <div className="type-statement">{children}</div>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="secondary">
              {cta.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `app/components/ui/SectionPanel.tsx`**

```tsx
type SectionPanelProps = {
  tone?: "dark" | "mist";
  children: React.ReactNode;
  className?: string;
};

export default function SectionPanel({
  tone = "dark",
  children,
  className = "",
}: SectionPanelProps) {
  return (
    <div
      className={[
        "rounded-frame p-8 lg:p-12",
        tone === "dark" ? "bg-ink text-white" : "bg-mist text-ink",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Create `app/components/JoinPanel.tsx`**

The reusable end-of-page CTA — replaces every `bg-terracotta` full-bleed CTA section. WhatsApp stays the primary CTA on every page (CLAUDE.md rule).

```tsx
import SectionPanel from "./ui/SectionPanel";
import Button from "./ui/Button";
import { SITE } from "@/lib/site";

type JoinPanelProps = {
  title?: string;
  body?: string;
};

export default function JoinPanel({
  title = "Join the community.",
  body = "Be the first to know about upcoming dips, excursions, and adventures.",
}: JoinPanelProps) {
  return (
    <section className="bg-paper py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionPanel tone="dark">
          <div className="max-w-xl">
            <h2 className="type-statement">{title}</h2>
            <p className="type-body mt-4 text-white/65">{body}</p>
            <div className="mt-8">
              <Button href={SITE.whatsapp} variant="primary">
                Join the WhatsApp community
              </Button>
            </div>
          </div>
        </SectionPanel>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build && npm run lint` — Expected: success. (Components are unused so far; lint must not flag them.)

- [ ] **Step 8: Commit**

```bash
git add app/components/ui app/components/JoinPanel.tsx
git commit -m "feat(ds): add six UI primitives (Button, MediaFrame, UtilityCard, StatementBlock, SectionPanel, JoinPanel)"
```

---

### Task 3: Navbar → floating pill nav

**Files:**
- Modify: `app/components/Navbar.tsx` (full rewrite, same filename)

Behavior: at top of page the nav is a transparent full-width row with white logo/links (every page hero is a dark photo/ink frame after this restyle). On scroll it collapses into a centered floating dark pill. Mobile keeps the hamburger + full-screen overlay (now `bg-paper`). The Activities dropdown stays, restyled dark.

- [ ] **Step 1: Rewrite `app/components/Navbar.tsx`**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const ACTIVITY_LINKS = [
  { label: "Dips", href: "/dips" },
  { label: "Excursions", href: "/excursions" },
  { label: "Adventures", href: "/adventures" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Activities", href: "/dips", children: ACTIVITY_LINKS },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pill = scrolled && !menuOpen;
  const isActivityPage = ["/dips", "/excursions", "/adventures"].includes(pathname);

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={[
            "flex justify-center transition-all duration-300",
            pill ? "pt-3" : "pt-0",
          ].join(" ")}
        >
          <div
            className={[
              "pointer-events-auto flex items-center justify-between transition-all duration-300",
              pill
                ? "gap-6 rounded-full bg-ink/90 py-2 pl-5 pr-2 text-white shadow-lg backdrop-blur-md"
                : "w-full max-w-[1320px] px-6 py-5 text-white lg:px-12",
            ].join(" ")}
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/brand-assets/dipclub-logo-white.svg"
                alt="Dip Club Amsterdam"
                width={140}
                height={40}
                className={pill ? "h-5 w-auto" : "h-8 w-auto"}
                priority
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = link.children
                  ? isActivityPage
                  : pathname === link.href;
                const linkClasses = [
                  "text-sm font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-white/70 hover:text-white",
                ].join(" ");

                if (link.children) {
                  return (
                    <div key={link.label} ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setDropdownOpen((v) => !v)}
                        className={`${linkClasses} flex items-center gap-1`}
                      >
                        {link.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        className={[
                          "absolute top-full left-1/2 mt-3 min-w-[170px] -translate-x-1/2 overflow-hidden rounded-2xl bg-ink text-white shadow-lg transition-all duration-200",
                          dropdownOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0",
                        ].join(" ")}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={[
                              "block px-5 py-3 text-sm font-medium transition-colors",
                              pathname === child.href
                                ? "text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white",
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                );
              })}

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-terracotta-dark"
              >
                Join <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex h-10 w-10 flex-col items-center justify-center md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={[
                    "block h-0.5 w-6 origin-center transition-all duration-300",
                    menuOpen ? "bg-ink" : "bg-white",
                    i === 0 && (menuOpen ? "translate-y-[3px] rotate-45" : "-translate-y-[4px]"),
                    i === 1 && (menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"),
                    i === 2 && (menuOpen ? "-translate-y-[3px] -rotate-45" : "translate-y-[4px]"),
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-paper transition-all duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="flex flex-col items-center gap-3">
                  <span className="type-micro text-ink/40">{link.label}</span>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={[
                        "type-title transition-colors duration-200",
                        pathname === child.href ? "text-ink" : "text-ink/60 hover:text-ink",
                      ].join(" ")}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-2xl font-medium transition-colors duration-200",
                  pathname === link.href ? "text-ink" : "text-ink/60 hover:text-ink",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-terracotta px-8 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-terracotta-dark"
          >
            Join the WhatsApp community <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </>
  );
}
```

Note the mobile hamburger color: when the menu is open the lines sit on the `bg-paper` overlay, so they flip to `bg-ink` — but the overlay is z-40 and the nav z-50, with the pill state suppressed by `!menuOpen`. The hamburger over the transparent state is white (dark hero behind it).

- [ ] **Step 2: Verify build**

Run: `npm run build && npm run lint` — Expected: success.

- [ ] **Step 3: Commit**

```bash
git add app/components/Navbar.tsx
git commit -m "feat(ds): restyle Navbar as floating pill nav"
```

---

### Task 4: Footer → dark rounded panel

**Files:**
- Modify: `app/components/Footer.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `app/components/Footer.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Dips", href: "/dips" },
  { label: "Excursions", href: "/excursions" },
  { label: "Adventures", href: "/adventures" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <div className="bg-paper p-2 pt-0 lg:p-4 lg:pt-0">
      <footer className="overflow-hidden rounded-frame bg-ink text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            {/* Social links */}
            <div className="flex flex-col items-start gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                {SITE.email} <span aria-hidden="true">↗</span>
              </a>
              <p className="type-micro mt-4 max-w-xs text-white/40">
                Made with cold hands and warm hearts in Amsterdam
              </p>
            </div>

            {/* Nav links */}
            <nav className="grid grid-cols-2 gap-x-16 gap-y-3 lg:text-right">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="type-title text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Big wordmark */}
          <Image
            src="/brand-assets/dipclub-logo-white.svg"
            alt="Dip Club Amsterdam"
            width={1200}
            height={300}
            className="mt-16 h-auto w-full opacity-90"
          />

          {/* Bottom bar */}
          <div className="type-micro mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/40 sm:flex-row sm:justify-between">
            <span>&copy; {new Date().getFullYear()} Dip Club Amsterdam. All rights reserved.</span>
            <span>Seek discomfort. Find yourself.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build && npm run lint` — Expected: success. (`new Date()` resolves at build time on static export — same behavior as today.)

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat(ds): restyle Footer as dark rounded panel with big wordmark"
```

---

### Task 5: ActivityCard + StatsBar restyle

**Files:**
- Modify: `app/components/ActivityCard.tsx` (full rewrite — drops `accentColor` prop)
- Modify: `app/components/StatsBar.tsx` (full rewrite)
- Modify: `app/page.tsx:118,129,140` (remove the three `accentColor=` props so the build doesn't break)

- [ ] **Step 1: Rewrite `app/components/ActivityCard.tsx`**

```tsx
import Link from "next/link";
import MediaFrame from "./ui/MediaFrame";

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
    <Link href={href} className="group block">
      <article className="flex flex-col gap-4 transition-transform duration-300 group-hover:-translate-y-1">
        <MediaFrame
          src={imageSrc}
          alt={imageAlt}
          radius="card"
          className="aspect-[4/3]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div>
          <p className="type-micro text-ink/45">{frequency}</p>
          <h3 className="type-title mt-1">
            {title} <span aria-hidden="true">→</span>
          </h3>
          <p className="type-body mt-2 text-ink/60">{description}</p>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 2: Remove `accentColor` props from `app/page.tsx`**

Delete the three lines `accentColor="bg-blue"`, `accentColor="bg-green"`, `accentColor="bg-terracotta"` from the `<ActivityCard …/>` calls (the full page rewrite happens in Task 6; this keeps the build green).

- [ ] **Step 3: Rewrite `app/components/StatsBar.tsx`**

```tsx
import ScrollReveal from "./ScrollReveal";

type Stat = { value: string; label: string };
type StatsBarProps = { stats: Stat[] };

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-paper py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-8 border-y border-ink/10 py-10 lg:py-14">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div>
                <p className="text-5xl font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="type-micro mt-3 text-ink/45">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build && npm run lint` — Expected: success.

- [ ] **Step 5: Commit**

```bash
git add app/components/ActivityCard.tsx app/components/StatsBar.tsx app/page.tsx
git commit -m "feat(ds): restyle ActivityCard and StatsBar"
```

---

### Task 6: Homepage — HomeHero + page.tsx

**Files:**
- Modify: `app/components/HomeHero.tsx` (full rewrite)
- Modify: `app/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `app/components/HomeHero.tsx`**

The orange curtain retires; the media fades/scales in quietly with staggered text. Utility card data comes via props (server page reads the latest Field Note).

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import UtilityCard from "./ui/UtilityCard";
import { SITE } from "@/lib/site";

type HomeHeroProps = {
  backgroundImage: string;
  backgroundAlt: string;
  utility?: {
    label: string;
    title: string;
    image?: string;
    imageAlt?: string;
    href: string;
  };
};

export default function HomeHero({
  backgroundImage,
  backgroundAlt,
  utility,
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
      <div className="relative min-h-[560px] overflow-hidden rounded-frame h-[calc(100svh-16px)] lg:h-[calc(100svh-32px)]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/15" />

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <h1 className={["type-display text-white", stagger("delay-300")].join(" ")}>
              Reset. Your. Mind.
            </h1>
            <p className={["type-title mt-4 text-white/85", stagger("delay-500")].join(" ")}>
              Seek discomfort. Find yourself.
            </p>
            <p
              className={[
                "type-body mt-3 max-w-md text-white/65",
                stagger("delay-[600ms]"),
              ].join(" ")}
            >
              Amsterdam&apos;s urban wellness community. Ice baths, breathwork, and
              outdoor adventures for those who choose growth over comfort.
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

        {/* Floating utility card */}
        {utility && (
          <div className={["absolute right-6 bottom-6 hidden w-64 lg:block", stagger("delay-[900ms]")].join(" ")}>
            <UtilityCard {...utility} tone="light" />
          </div>
        )}
      </div>
    </section>
  );
}
```

Note: `#activities` anchor links don't go through `next/link` — the Button primitive uses `Link` for non-http hrefs, which handles `#` fragments fine in App Router.

- [ ] **Step 2: Rewrite `app/page.tsx`**

Content and section order are identical to the current page; only presentation changes. Full new file:

```tsx
import HomeHero from "./components/HomeHero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
import StatsBar from "./components/StatsBar";
import StatementBlock from "./components/ui/StatementBlock";
import MediaFrame from "./components/ui/MediaFrame";
import SectionPanel from "./components/ui/SectionPanel";
import Button from "./components/ui/Button";
import { getAllPosts } from "@/lib/field-notes";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    title: "Cold Exposure",
    description:
      "Ice baths and cold water swimming reset your nervous system, boost circulation, and build mental resilience. The cold teaches you to stay calm when everything tells you to run.",
  },
  {
    title: "Heat Exposure",
    description:
      "Sauna sessions and heat training complement the cold. The contrast between extremes strengthens your cardiovascular system and deepens recovery.",
  },
  {
    title: "Breathwork",
    description:
      "Guided breathing techniques prepare your body for the cold, reduce stress, and unlock energy you didn't know you had. We practice before every dip.",
  },
  {
    title: "Time in Nature",
    description:
      "From Amsterdam's waterways to European mountain trails — we get outside. Nature is the gym, the therapy room, and the classroom all at once.",
  },
  {
    title: "Real Connection",
    description:
      "Shared discomfort breaks down walls faster than any networking event. Cold water, long trails, and honest conversations — that's how strangers become friends.",
  },
];

export default function Home() {
  const latestPost = getAllPosts()[0];

  return (
    <main>
      <HomeHero
        backgroundImage="/media/dc-polaroid-2-dolomites-hike.jpg"
        backgroundAlt="Dip Club community hiking in the Dolomites"
        utility={
          latestPost
            ? {
                label: "Field Notes",
                title: latestPost.title,
                image: latestPost.coverImage,
                imageAlt: latestPost.title,
                href: `/field-notes/${latestPost.slug}`,
              }
            : undefined
        }
      />

      {/* Intro Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <StatementBlock
              eyebrow="Begin your journey"
              align="right"
              cta={{ text: "More about us", href: "/about" }}
            >
              Dip Club Amsterdam is an urban wellness community that brings
              together people who believe growth starts where comfort ends —
              from monthly ice baths in local waterways to multi-day hikes
              across Europe.
            </StatementBlock>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-10 text-ink/45">What we practice</p>
          </ScrollReveal>
          <div className="grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.08} className="h-full bg-paper">
                <div className="h-full px-1 py-8 lg:pr-6">
                  <p className="type-micro text-ink/45">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-title mt-3">{pillar.title}</h3>
                  <p className="type-body mt-3 text-ink/60">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="scroll-mt-20 bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-12">Our activities.</h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <ActivityCard
                title="Dips"
                frequency="Monthly"
                description="Ice baths and breathwork at local Amsterdam spots. A few hours of cold, community, and post-dip coffee."
                imageSrc="/media/dc-biweekly-dip.jpg"
                imageAlt="Community members during a cold water dip in Amsterdam"
                href="/dips"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ActivityCard
                title="Excursions"
                frequency="Every Semester"
                description="Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together."
                imageSrc="/media/dc-quarterly-excursion.JPG"
                imageAlt="Dip Club group on a hiking excursion"
                href="/excursions"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <ActivityCard
                title="Adventures"
                frequency="Once a Year"
                description="Multi-day long-distance hikes across Europe. Up to 12 days of trails, mountain passes, and unforgettable landscapes."
                imageSrc="/media/dc-annual-adventure-2.JPG"
                imageAlt="Dip Club adventure hike in the mountains"
                href="/adventures"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar
        stats={[
          { value: "200+", label: "Members" },
          { value: "50+", label: "Events" },
          { value: "3", label: "Countries" },
        ]}
      />

      {/* Europe Appreciation Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="order-2 flex-1 lg:order-1" delay={0.2}>
              <MediaFrame
                src="/media/dc-polaroid-2-dolomites-hike.jpg"
                alt="Hiking through the European Dolomites"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <ScrollReveal className="order-1 flex-1 lg:order-2">
              <p className="type-micro mb-5 text-ink/45">Local appreciation</p>
              <h2 className="type-statement">The beauty of Europe.</h2>
              <p className="type-body mt-6 max-w-lg text-ink/60">
                We don&apos;t fly halfway across the world to find adventure. From
                the canals of Amsterdam to the peaks of the Dolomites, the
                Ardennes forests to the Atlantic coast — Europe has everything.
                Ancient trails, wild rivers, and landscapes that have inspired
                people for centuries.
              </p>
              <p className="type-body mt-4 max-w-lg text-ink/60">
                Our adventures stay close to home by design. We take trains
                where we can, cook with local ingredients, and stay in places
                that support the communities we visit. Exploring responsibly
                isn&apos;t a compromise — it&apos;s how the best trips happen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact / Join Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <SectionPanel tone="dark">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex-1">
                  <h2 className="type-statement">Join the community.</h2>
                  <p className="type-body mt-4 max-w-md text-white/65">
                    Be the first to know about upcoming dips, excursions, and
                    adventures. Got a question? Don&apos;t hesitate to ask us at{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-white underline underline-offset-4 hover:text-white/80"
                    >
                      {SITE.email}
                    </a>
                    .
                  </p>
                  <div className="mt-8">
                    <Button href={SITE.whatsapp} variant="primary">
                      Join the WhatsApp community
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <MediaFrame
                    src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                    alt="Dip Club members at an Amsterdam swimming spot"
                    radius="card"
                    className="h-[240px] lg:h-[300px]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </SectionPanel>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
```

Content notes: the old separate intro image (`dc-polaroid-5`) moved into the Join panel so no photo is lost; the intro is now a pure StatementBlock per the approved design. The contact email lives inside the Join panel (sections merged visually but both contents kept).

- [ ] **Step 3: Verify build**

Run: `npm run build && npm run lint` — Expected: success.

- [ ] **Step 4: Visual checkpoint (HUMAN REVIEW)**

Run: `npm run dev` and view `http://localhost:3000`. Check: inset rounded hero with margins visible on all four sides; pill nav appears centered on scroll; terracotta appears ONLY on Join buttons; utility card bottom-right on desktop. **Pause here for Pascal's review before continuing to inner pages.**

- [ ] **Step 5: Commit**

```bash
git add app/components/HomeHero.tsx app/page.tsx
git commit -m "feat(ds): restyle homepage on the new design system"
```

---

### Task 7: Inner-page Hero rewrite

**Files:**
- Modify: `app/components/Hero.tsx` (full rewrite — same props signature, so existing call sites keep compiling)

The inner hero becomes a ~70vh inset rounded frame: photo when `imageSrc`/`photos` given, plain ink panel otherwise. `HeroMosaic` is no longer used (deleted in Task 11).

- [ ] **Step 1: Rewrite `app/components/Hero.tsx`**

```tsx
import Image from "next/image";
import Button from "./ui/Button";

type HeroPhoto = {
  src: string;
  alt: string;
};

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  fullHeight?: boolean;
  badge?: string;
  photos?: HeroPhoto[];
};

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  fullHeight = false,
  badge,
  photos,
}: HeroProps) {
  // Photo mosaics are retired — fall back to the first photo as the frame image.
  const image = imageSrc ?? photos?.[0]?.src;
  const alt = imageAlt ?? photos?.[0]?.alt ?? "";

  return (
    <section className="bg-paper p-2 lg:p-4">
      <div
        className={[
          "relative flex items-end overflow-hidden rounded-frame bg-ink",
          fullHeight
            ? "min-h-[calc(100svh-16px)] lg:min-h-[calc(100svh-32px)]"
            : "min-h-[70vh]",
        ].join(" ")}
      >
        {image && (
          <>
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />
          </>
        )}

        <div className="relative z-10 w-full p-6 pt-32 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            {badge && <p className="type-micro mb-4 text-white/60">{badge}</p>}
            <h1 className="type-display text-white">{title}</h1>
            {subtitle && (
              <p className="type-title mt-4 text-white/85">{subtitle}</p>
            )}
            {description && (
              <p className="type-body mt-3 max-w-md text-white/65">{description}</p>
            )}
            {(ctaText || secondaryCtaText) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {ctaText && ctaHref && (
                  <Button href={ctaHref} variant="primary">
                    {ctaText}
                  </Button>
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <Button href={secondaryCtaHref} variant="ghost">
                    {secondaryCtaText}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build && npm run lint` — Expected: success. Inner pages now show the new hero with their old (uppercase) titles — fixed per page in Tasks 8–9.

- [ ] **Step 3: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat(ds): rewrite inner-page Hero as inset rounded frame"
```

---

### Task 8: Activity pages — dips, excursions, adventures

**Files:**
- Modify: `app/dips/page.tsx`
- Modify: `app/excursions/page.tsx`
- Modify: `app/adventures/page.tsx`

These three pages share the same section anatomy. For EACH page, apply the following steps. Do one page at a time, building between pages.

- [ ] **Step 1: Update the Hero call (per page)**

Titles become sentence case with a period; badges become plain labels:

```tsx
// dips/page.tsx
<Hero title="Dips." subtitle="Cold water, warm community" badge="Every month" />
// excursions/page.tsx
<Hero title="Excursions." subtitle="Beyond the city limits" badge="Every semester" />
// adventures/page.tsx
<Hero title="Adventures." subtitle="Long-distance hikes across Europe" badge="Once a year" />
```

- [ ] **Step 2: Remove WaveDivider (per page)**

Delete the `import WaveDivider from "../components/WaveDivider";` line and the `<WaveDivider topColor="#e8e5e2" bottomColor="#f06530" />` element.

- [ ] **Step 3: Replace the closing terracotta CTA section (per page)**

Each page ends with `<section className="bg-terracotta py-24 lg:py-32 text-center">…</section>`. Replace the entire section with:

```tsx
<JoinPanel />
```

and add the import: `import JoinPanel from "../components/JoinPanel";`. Keep the page-specific heading text by passing it through, e.g. if the old section heading was "READY TO TAKE THE PLUNGE?" use `<JoinPanel title="Ready to take the plunge?" />`. Keep the old section's body sentence as the `body` prop if it differs from the default.

- [ ] **Step 4: Apply the mapping table to every remaining section (per page)**

Work top-to-bottom through the file applying the class transformation vocabulary. The recurring patterns and their exact transforms:

Eyebrow + heading + accent-span (appears in most sections):

```tsx
// BEFORE
<p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
  What to expect
</p>
<h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
  More than just a <span className="font-accent italic">shiver</span>
</h2>
// AFTER
<p className="type-micro mb-5 text-ink/45">What to expect</p>
<h2 className="type-statement">More than just a shiver.</h2>
```

Body paragraphs:

```tsx
// BEFORE
<p className="mt-6 max-w-lg text-base leading-relaxed text-slate">…</p>
// AFTER
<p className="type-body mt-6 max-w-lg text-ink/60">…</p>
```

Inline images:

```tsx
// BEFORE
<div className="relative h-[300px] overflow-hidden rounded-sm sm:h-[400px]">
  <Image src="…" alt="…" fill className="object-cover" sizes="…" />
</div>
// AFTER (add: import MediaFrame from "../components/ui/MediaFrame";)
<MediaFrame src="…" alt="…" className="h-[300px] sm:h-[400px]" sizes="…" />
```

Bordered card grids (the `border-[6px] border-dark` info grids):

```tsx
// BEFORE
<div className="grid gap-px bg-dark sm:grid-cols-3 rounded-sm overflow-hidden border-[6px] border-dark">
  <div className="bg-offwhite p-6 lg:p-8">
    <h3 className="font-heading text-base font-extrabold uppercase tracking-wide">Title</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate">Text</p>
  </div>
  …
</div>
// AFTER
<div className="grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-3">
  <div className="bg-paper px-1 py-8 lg:pr-6">
    <h3 className="type-title">Title</h3>
    <p className="type-body mt-3 text-ink/60">Text</p>
  </div>
  …
</div>
```

Section wrappers: `bg-offwhite` → `bg-paper`; drop `border-t border-dark/5` (the hairline grids carry the separation now); delete any `bg-wavy`/`bg-topo` class.

Any remaining inline CTA anchors (`rounded-none bg-… px-8 py-3.5`): replace with `<Button href={…} variant="primary|secondary">Label</Button>` (primary ONLY if it's the WhatsApp join; strip trailing `↘` from the label text — Button adds the arrow). Import Button from `"../components/ui/Button"`. If the href is the WhatsApp URL, import `{ SITE }` from `"@/lib/site"` and use `SITE.whatsapp`.

- [ ] **Step 5: Verify build (after each page)**

Run: `npm run build && npm run lint` — Expected: success.
Run: `grep -n "font-heading\|font-accent\|bg-offwhite\|text-slate\|bg-wavy\|bg-topo\|WaveDivider\|border-\[6px\]\|rounded-none\|↘" app/dips/page.tsx` (and the equivalent for each page) — Expected: no matches.

- [ ] **Step 6: Commit (one commit per page)**

```bash
git add app/dips/page.tsx && git commit -m "feat(ds): restyle dips page"
git add app/excursions/page.tsx && git commit -m "feat(ds): restyle excursions page"
git add app/adventures/page.tsx && git commit -m "feat(ds): restyle adventures page"
```

---

### Task 9: About, Manifesto, Contact pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/manifesto/page.tsx`
- Modify: `app/contact/page.tsx`

Same procedure as Task 8 (mapping table + pattern transforms). Page-specific notes:

- [ ] **Step 1: Update Hero calls**

```tsx
// about/page.tsx
<Hero title="About us." subtitle="How it started. Where it's going." />
// manifesto/page.tsx
<Hero title="Manifesto." subtitle="Why we exist" />
// contact/page.tsx
<Hero title="Contact." subtitle="We'd love to hear from you" />
```

(Keep the existing `&apos;` escaping as in the current files.)

- [ ] **Step 2: Apply the mapping table to all sections (per page)**

Use the exact pattern transforms from Task 8 Step 4. Additional page-specific patterns:

About page values grid (3 cards `border-[6px]`): use the hairline-grid transform.
Manifesto principle rows (`h3` + text pairs): `h3` → `type-title`, keep the row layout, separators → `border-ink/10`.
Contact page method cards (WhatsApp / Instagram / Email): each card becomes a `rounded-card border border-ink/10 bg-paper p-8` block, `h2` → `type-title`, links → `<Button>` (WhatsApp = primary variant; Instagram/Email = secondary). Import `{ SITE }` from `"@/lib/site"` and replace hardcoded URLs/addresses with `SITE.whatsapp`, `SITE.instagram`, `` `mailto:${SITE.email}` ``.

- [ ] **Step 3: Replace closing terracotta CTA sections with `<JoinPanel />`** (about and manifesto both have one; keep their specific heading text via the `title` prop, sentence-cased with a period).

- [ ] **Step 4: Verify (after each page)**

Run: `npm run build && npm run lint` — Expected: success.
Run: `grep -n "font-heading\|font-accent\|bg-offwhite\|text-slate\|bg-wavy\|bg-topo\|border-\[6px\]\|rounded-none\|↘" app/about/page.tsx` (and per page) — Expected: no matches.

- [ ] **Step 5: Commit (one per page)**

```bash
git add app/about/page.tsx && git commit -m "feat(ds): restyle about page"
git add app/manifesto/page.tsx && git commit -m "feat(ds): restyle manifesto page"
git add app/contact/page.tsx && git commit -m "feat(ds): restyle contact page"
```

---

### Task 10: Field Notes — card, list, listing page, post page, MDX

**Files:**
- Modify: `app/components/FieldNoteCard.tsx` (full rewrite)
- Modify: `app/components/FieldNotesList.tsx` (filter pills only)
- Modify: `app/field-notes/page.tsx` (Hero call)
- Modify: `app/field-notes/[slug]/page.tsx`
- Modify: `app/components/mdx-components.tsx`

- [ ] **Step 1: Rewrite `app/components/FieldNoteCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { FieldNoteMeta } from "@/lib/field-notes";

export default function FieldNoteCard({ post }: { post: FieldNoteMeta }) {
  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/field-notes/${post.slug}`}
      className="group flex flex-col rounded-card border border-ink/10 bg-paper p-3 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-48 overflow-hidden rounded-[8px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 pt-4">
        <p className="type-micro mb-2 text-ink/45">{post.pillars.join(" · ")}</p>
        <h3 className="type-title mb-2">{post.title}</h3>
        <p className="type-body flex-1 text-ink/60">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="type-micro text-ink/45">{displayDate}</span>
          <span className="text-sm font-medium">
            Read <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Restyle the filter pills in `app/components/FieldNotesList.tsx`**

Replace both `<button>` className lists (the "All" button and the pillar buttons use the same classes):

```tsx
// BEFORE (both buttons)
"px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] border-2 border-dark transition-colors duration-200",
active === … ? "bg-dark text-offwhite" : "bg-transparent text-dark hover:bg-dark/5",
// AFTER (both buttons)
"rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200",
active === … ? "bg-ink text-white" : "bg-mist text-ink hover:bg-ink/10",
```

Also: `<p className="text-slate">No posts…` → `<p className="type-body text-ink/60">No posts…`. The `PILLARS` array stays exactly as is.

- [ ] **Step 3: Update `app/field-notes/page.tsx`**

Hero call → `<Hero title="Field notes." subtitle="…keep existing subtitle…" />`; section wrapper `bg-offwhite` → `bg-paper`.

- [ ] **Step 4: Restyle `app/field-notes/[slug]/page.tsx`**

Replace the cover block and article chrome (MDX rendering untouched):

```tsx
// Cover image block BEFORE (lines 35-45) → AFTER:
<div className="bg-paper p-2 pt-20 lg:p-4 lg:pt-24">
  <MediaFrame
    src={post.coverImage}
    alt={post.title}
    className="h-[400px]"
    priority
    sizes="100vw"
  />
</div>
```

(add `import MediaFrame from "../../components/ui/MediaFrame";` — the `pt-20/24` clears the fixed nav, replacing the old `mt-[72px]`.)

Then in the article: `bg-offwhite` → `bg-paper`; pillar spans → `type-micro text-ink/45`; date span → `type-micro text-ink/45`; title `h1` → `className="type-statement mb-10"`; back-link → `className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"` keeping the `←`; the terracotta join box at the bottom → replace the whole `<div className="rounded-none border-[6px] border-terracotta …">…</div>` with:

```tsx
<SectionPanel tone="dark">
  <h2 className="type-title">Join the community</h2>
  <p className="type-body mt-2 text-white/65">
    Be the first to know about upcoming dips, excursions, and adventures.
  </p>
  <div className="mt-6">
    <Button href={SITE.whatsapp} variant="primary">
      Join the WhatsApp community
    </Button>
  </div>
</SectionPanel>
```

(add imports: `SectionPanel`, `Button` from `../../components/ui/…`, `{ SITE }` from `"@/lib/site"`).

- [ ] **Step 5: Restyle `app/components/mdx-components.tsx`**

Apply per element (structure unchanged):

```tsx
// PullQuote blockquote className:
"my-8 border-l-2 border-ink/20 pl-6 type-statement text-ink"
// Callout div className (the #FFE034 yellow retires):
"my-6 rounded-card bg-mist px-6 py-4 text-ink"
// PhotoGallery figure image wrapper: add rounded-[8px] to the existing classes:
"relative aspect-[4/3] overflow-hidden rounded-[8px]"
// figcaption: "text-xs text-slate text-center" → "type-micro text-ink/45 text-center"
// h1: "font-heading text-3xl font-extrabold mt-10 mb-4" → "type-statement mt-10 mb-4"
// h2: "font-heading text-2xl font-extrabold mt-8 mb-3" → "type-title text-2xl mt-8 mb-3"
// h3: "font-heading text-xl font-extrabold mt-6 mb-2" → "type-title mt-6 mb-2"
// p: "text-base leading-relaxed text-slate mb-5" → "type-body text-ink/70 mb-5"
// ul/ol: "…text-slate mb-5" → "…type-body text-ink/70 mb-5" (keep list classes)
// blockquote: "border-l-4 border-dark/20 pl-5 italic text-slate my-6" → "border-l-2 border-ink/15 pl-5 text-ink/60 my-6"
// code: "bg-dark/5 …" → "bg-mist rounded-[4px] …" (keep the rest)
// pre: "bg-dark/5 …" → "bg-mist rounded-card …" (keep the rest)
```

- [ ] **Step 6: Verify build**

Run: `npm run build && npm run lint` — Expected: success, all field-notes slugs exported.
Run: `grep -rn "font-heading\|font-accent\|bg-offwhite\|text-slate\|border-\[6px\]\|↘" app/field-notes app/components/FieldNoteCard.tsx app/components/FieldNotesList.tsx app/components/mdx-components.tsx` — Expected: no matches.

- [ ] **Step 7: Commit**

```bash
git add app/field-notes app/components/FieldNoteCard.tsx app/components/FieldNotesList.tsx app/components/mdx-components.tsx
git commit -m "feat(ds): restyle Field Notes listing, cards, post page, and MDX components"
```

---

### Task 11: Legacy cleanup + CLAUDE.md

**Files:**
- Modify: `app/globals.css` (remove legacy tokens, @font-face, patterns)
- Delete: `app/components/WaveDivider.tsx`, `app/components/HeroMosaic.tsx`, `app/components/PhotoMosaic.tsx` (verify unused first)
- Delete: `public/fonts/TAN-Tangkiwood-Regular.otf`, `public/fonts/AntonSC-Regular.ttf` (verify unreferenced first)
- Modify: `CLAUDE.md`

- [ ] **Step 1: Verify nothing references legacy styles**

```bash
grep -rn "font-heading\|font-accent\|font-display\|font-body\|bg-offwhite\|text-slate\|text-dark\|bg-dark\b\|bg-blue\|bg-green\|bg-wavy\|bg-topo\|border-\[6px\]\|rounded-none\|↘" app lib --include="*.tsx" --include="*.ts"
```

Expected: no matches (note: `bg-ink` contains "ink" not "dark" — the grep above is precise). If anything matches, fix it with the mapping table before continuing.

```bash
grep -rn "WaveDivider\|HeroMosaic\|PhotoMosaic" app --include="*.tsx" | grep -v "app/components/WaveDivider\|app/components/HeroMosaic\|app/components/PhotoMosaic"
grep -rn "TAN-Tangkiwood\|AntonSC" app public --include="*.css" --include="*.tsx" 2>/dev/null
```

Expected: no matches outside the component/font files themselves. Only delete what is confirmed unreferenced; if PhotoMosaic is still used somewhere, leave it and note it.

- [ ] **Step 2: Clean `app/globals.css`**

Delete: the entire "LEGACY" token block from `@theme` (blue, blue-dark, green, dark, offwhite, slate, font-display, font-heading, font-body, font-accent), both `@font-face` blocks, and the `.bg-wavy`, `.bg-topo`, `.bg-topo-light` rules. What remains: the new tokens, base layer, and the five `@utility` type roles.

- [ ] **Step 3: Delete dead files**

```bash
git rm app/components/WaveDivider.tsx app/components/HeroMosaic.tsx app/components/PhotoMosaic.tsx
git rm public/fonts/TAN-Tangkiwood-Regular.otf public/fonts/AntonSC-Regular.ttf
```

(Skip any file Step 1 showed as still referenced.)

- [ ] **Step 4: Update CLAUDE.md**

Replace the "Design Constraints (non-negotiable)" section with:

```markdown
## Design Constraints (non-negotiable)

Design system spec: `docs/superpowers/specs/2026-06-11-design-system-design.md` ("Framed Minimal").

- Canvas: white `#FFFFFF` (paper), text near-black `#0D0D0D` (ink), secondary fills `#F0EFED` (mist)
- Terracotta `#F06530` appears ONLY on the primary CTA (WhatsApp join) — never as decoration
- One typeface: Switzer (self-hosted via next/font/local, `app/fonts/`) — five type roles as `type-display/statement/title/body/micro` utilities in globals.css
- Media always sits in rounded frames: `rounded-frame` (20px) / `rounded-card` (12px); heroes are inset 8px/16px from the viewport via MediaFrame pattern
- Buttons are pills — use `app/components/ui/Button`, never hand-rolled
- Compose pages from `app/components/ui/` primitives (Button, MediaFrame, UtilityCard, StatementBlock, SectionPanel) + JoinPanel
- Display headlines are sentence case with periods ("Reset. Your. Mind.")
```

Also update the React 19 bullet's neighbor in "Stack & Gotchas": replace the "Load all Google Fonts via next/font/google" rule with "Switzer loads via `next/font/local` from `app/fonts/` — no Google Fonts, no `<link>` tags", and add `lib/site.ts → SITE` to the Structure section ("external links — WhatsApp/Instagram/email — always come from here").

- [ ] **Step 5: Final verification**

```bash
npm run build && npm run lint
```

Expected: clean build, all routes exported to `/out`. Then re-run the Step 1 greps one last time — Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(ds): remove legacy fonts, tokens, and patterns; update CLAUDE.md"
```

---

## Post-plan checklist

- Visual pass on every page at mobile (390px) and desktop (1440px) widths via `npm run dev`.
- Confirm WhatsApp CTA present and terracotta on: homepage (hero + join panel), all activity pages, about, manifesto, contact, field-notes post pages, navbar.
- `git push` only when Pascal says to deploy (push = production via Vercel).
