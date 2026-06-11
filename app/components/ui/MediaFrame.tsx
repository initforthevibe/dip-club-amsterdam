import Image from "next/image";

type MediaFrameProps = {
  src: string;
  alt: string;
  /** Sizing comes from the caller: aspect-[4/3], h-[400px], etc. Children needing h-full require an explicit height here. */
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
