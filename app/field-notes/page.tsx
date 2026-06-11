import type { Metadata } from "next";
import Hero from "../components/Hero";
import { getAllPosts } from "@/lib/field-notes";
import FieldNotesList from "../components/FieldNotesList";

export const metadata: Metadata = {
  title: "Field Notes — Dip Club Amsterdam",
  description: "Stories from the water, the trail, and the wild.",
};

export default function FieldNotesPage() {
  const posts = getAllPosts();
  return (
    <main>
      <Hero
        title="Field notes."
        subtitle="Stories from the water, the trail, and the wild"
      />
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <FieldNotesList posts={posts} />
        </div>
      </section>
    </main>
  );
}
