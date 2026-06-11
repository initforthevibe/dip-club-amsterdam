import Image from "next/image";
import Link from "next/link";

type UtilityCardProps = {
  label: string;
  title: string;
  meta?: string;
  image?: string;
  imageAlt?: string; // Required when image is provided; omit only for decorative images
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
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const isHttp = href.startsWith("http");
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
      <a href={href} {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
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
