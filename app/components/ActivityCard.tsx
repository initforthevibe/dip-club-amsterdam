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
