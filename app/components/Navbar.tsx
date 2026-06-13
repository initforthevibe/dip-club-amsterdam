"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const ACTIVITY_LINKS = [
  { label: "Dips", href: "/dips" },
  { label: "Trips", href: "/trips" },
  { label: "Adventures", href: "/adventures" },
];

const NAV_LINKS = [
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
  // Single shared ref — works because only one NAV_LINKS entry has children; revisit if more dropdowns are added.
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
  const isActivityPage = ["/dips", "/trips", "/adventures"].includes(pathname);

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={[
            "flex justify-center transition-all duration-300",
            pill ? "pt-3" : "pt-4",
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
                src={menuOpen ? "/brand-assets/dip-club-logo-ink.svg" : "/brand-assets/dipclub-logo-white.svg"}
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
                  isActive ? "text-white" : "text-white/90 hover:text-white",
                ].join(" ");

                if (link.children) {
                  return (
                    <div key={link.label} ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setDropdownOpen((v) => !v)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
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
                        inert={!dropdownOpen || undefined}
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
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-terracotta-dark"
              >
                Join
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:-rotate-45"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
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
            className="group mt-4 inline-flex items-center gap-3 rounded-full bg-terracotta py-2 pl-8 pr-2 text-base font-medium text-white transition-colors duration-200 hover:bg-terracotta-dark"
          >
            Join the WhatsApp community
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:-rotate-45"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
