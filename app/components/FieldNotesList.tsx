"use client";

import { useState } from "react";
import FieldNoteCard from "./FieldNoteCard";
import type { FieldNoteMeta } from "@/lib/field-notes";

const PILLARS = [
  "Outdoor Swimming",
  "Social Sauna",
  "Breath Work",
  "Hiking",
  "Bushcraft",
];

export default function FieldNotesList({ posts }: { posts: FieldNoteMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    active ? posts.filter((p) => p.pillars.includes(active)) : posts;

  return (
    <div>
      {/* Pillar filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActive(null)}
          className={[
            "rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200",
            active === null
              ? "bg-ink text-white"
              : "bg-mist text-ink hover:bg-ink/10",
          ].join(" ")}
        >
          All
        </button>
        {PILLARS.map((pillar) => (
          <button
            key={pillar}
            onClick={() => setActive(pillar === active ? null : pillar)}
            className={[
              "rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200",
              active === pillar
                ? "bg-ink text-white"
                : "bg-mist text-ink hover:bg-ink/10",
            ].join(" ")}
          >
            {pillar}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p className="type-body text-ink/60">No posts for this pillar yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <FieldNoteCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
