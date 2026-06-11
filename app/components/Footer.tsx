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
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 py-1.5 pl-5 pr-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                Instagram
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25 transition-transform duration-300 group-hover:-rotate-45"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 py-1.5 pl-5 pr-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                {SITE.email}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25 transition-transform duration-300 group-hover:-rotate-45"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
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
            height={400}
            className="mt-16 h-auto w-full opacity-60 [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]"
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
