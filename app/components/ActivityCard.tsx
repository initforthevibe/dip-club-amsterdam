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
      <article className="flex w-full flex-col rounded-card border border-terracotta-dark/50 bg-terracotta-light p-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-terracotta-dark">
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
          <p className="type-micro text-terracotta-deep/60">{frequency}</p>
          <h3 className="type-title mt-1 text-terracotta-deep">
            {title} <span aria-hidden="true">→</span>
          </h3>
          <p className="type-body mt-2 text-terracotta-deep/75">{description}</p>
        </div>
      </article>
    </Link>
  );
}
