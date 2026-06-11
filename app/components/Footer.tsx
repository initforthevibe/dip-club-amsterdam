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
            height={400}
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
