import Image from "next/image";
import Link from "next/link";
import type { FieldNoteMeta } from "@/lib/field-notes";

export default function FieldNoteCard({ post }: { post: FieldNoteMeta }) {
  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/field-notes/${post.slug}`}
      className="group flex flex-col rounded-card border border-ink/10 bg-paper p-3 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-48 overflow-hidden rounded-[8px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 pt-4">
        <p className="type-micro mb-2 text-ink/45">{post.pillars.join(" · ")}</p>
        <h3 className="type-title mb-2">{post.title}</h3>
        <p className="type-body flex-1 text-ink/60">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="type-micro text-ink/45">{displayDate}</span>
          <span className="text-sm font-medium">
            Read <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
