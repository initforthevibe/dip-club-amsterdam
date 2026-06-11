import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/field-notes";
import { mdxComponents } from "../../components/mdx-components";
import MediaFrame from "../../components/ui/MediaFrame";
import SectionPanel from "../../components/ui/SectionPanel";
import Button from "../../components/ui/Button";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Dip Club Amsterdam`,
    description: post.excerpt,
  };
}

export default async function FieldNotePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      {/* Cover image — extends under fixed navbar; overlay keeps nav text legible */}
      <div className="bg-paper p-2 lg:p-4">
        <MediaFrame
          src={post.coverImage}
          alt={post.title}
          className="h-[420px] sm:h-[480px]"
          overlay
          priority
          sizes="100vw"
        />
      </div>

      <article className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.pillars.map((pillar) => (
              <span
                key={pillar}
                className="type-micro text-ink/45"
              >
                {pillar}
              </span>
            ))}
            <span className="type-micro text-ink/45">{displayDate}</span>
          </div>

          {/* Title */}
          <h1 className="type-statement mb-10">{post.title}</h1>

          {/* MDX body */}
          <MDXRemote source={post.content} components={mdxComponents} />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col gap-8">
            <Link
              href="/field-notes"
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
            >
              ← Back to Field Notes
            </Link>
            <SectionPanel tone="dark">
              <h2 className="type-title">Join the community</h2>
              <p className="type-body mt-2 text-white/65">
                Be the first to know about upcoming dips, excursions, and adventures.
              </p>
              <div className="mt-6">
                <Button href={SITE.whatsapp} variant="primary">
                  Join the WhatsApp community
                </Button>
              </div>
            </SectionPanel>
          </div>
        </div>
      </article>
    </main>
  );
}
