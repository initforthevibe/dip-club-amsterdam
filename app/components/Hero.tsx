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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/35" />
          </>
        )}

        <div className="relative z-10 w-full p-6 pt-32 sm:p-10 sm:pt-32 lg:p-14 lg:pt-32">
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
