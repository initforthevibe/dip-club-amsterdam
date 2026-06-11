import Image from "next/image";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-ink/20 pl-6 type-statement text-ink">
      {children}
    </blockquote>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-card bg-mist px-6 py-4 text-ink">
      {children}
    </div>
  );
}

type GalleryImage = { src: string; alt: string; caption?: string };

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const cols =
    images.length === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`my-8 grid gap-4 ${cols}`}>
      {images.map((img) => (
        <figure key={img.src} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          {img.caption && (
            <figcaption className="type-micro text-ink/45 text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export const mdxComponents = {
  PullQuote,
  Callout,
  PhotoGallery,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="type-statement mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="type-title text-2xl mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="type-title mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="type-body text-ink/70 mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-5 space-y-1.5 type-body text-ink/70 mb-5"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-5 space-y-1.5 type-body text-ink/70 mb-5"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-ink/15 pl-5 text-ink/60 my-6"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-mist rounded-[4px] px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-mist rounded-card p-4 overflow-x-auto text-sm font-mono my-6"
      {...props}
    />
  ),
};
