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
            className="object-cover"
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
