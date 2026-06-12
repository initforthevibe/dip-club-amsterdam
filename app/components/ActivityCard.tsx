import Image from "next/image";
import Link from "next/link";

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
      <article className="flex w-full flex-col rounded-card border border-terracotta-dark/50 bg-terracotta p-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-terracotta-dark">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 pb-3">
          <p className="type-micro text-white/70">{frequency}</p>
          <h3 className="type-title mt-1 text-white">{title}</h3>
          <p className="type-body mt-2 flex-1 text-white/80">{description}</p>
          {/* Visual button only — the whole card is the link, so this must not be an anchor */}
          <span className="mt-5 inline-flex w-fit items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-sm font-medium text-ink">
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
      </article>
    </Link>
  );
}
