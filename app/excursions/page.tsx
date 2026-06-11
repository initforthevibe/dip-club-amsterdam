import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import MediaFrame from "../components/ui/MediaFrame";
import JoinPanel from "../components/JoinPanel";

export const metadata: Metadata = {
  title: "Excursions — Dip Club Amsterdam",
  description:
    "Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together every semester.",
};

export default function ExcursionsPage() {
  return (
    <>
      {/* Hero */}
      <Hero title="Excursions." subtitle="Beyond the city limits" badge="Every semester" />

      {/* Overview section 1 — Text left, Image right */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Left: text */}
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">What to expect</p>
              <h2 className="type-statement">
                Day and weekend trips to get out of Amsterdam.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                Twice a year we organize an excursion beyond the city. These are day or
                weekend trips to nearby destinations — think the Ardennes, the Belgian
                coast, or the German countryside. We hike, swim, cook together, and
                explore terrain you won&apos;t find in the Vondelpark.
              </p>
              <p className="type-body mt-4 text-ink/60">
                Excursions are about getting out of your routine together. Short enough
                to fit into a busy schedule, long enough to feel like a real adventure.
              </p>
            </ScrollReveal>

            {/* Right: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <MediaFrame
                src="/media/dc-quarterly-excursion.JPG"
                alt="Dip Club Amsterdam quarterly excursion"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview section 2 — Image left, Text right */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            {/* Right: text (rendered first in DOM, flex-row-reverse visually puts it right) */}
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">The details</p>
              <h2 className="type-statement">What an excursion looks like.</h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Duration: 1-2 days, usually a weekend",
                  "Destinations: Ardennes, Belgian coast, German countryside, and more",
                  "Group size: 10-15 people",
                  "What to bring: Hiking gear, sleeping bag (for overnights), an open mind",
                  "Cost: Shared expenses (transport, accommodation, food)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-ink/20" />
                    <span className="type-body text-ink/60">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Left: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <MediaFrame
                src="/media/Pascal Climbing Ardennes.JPG"
                alt="Pascal climbing in the Ardennes"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why it works — local appreciation */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">Why we explore close to home</p>
              <h2 className="type-statement">
                Learning to see what&apos;s already here.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                Most of us live surrounded by landscapes we&apos;ve never explored. The Netherlands and its neighbours hold centuries of natural beauty, cultural richness, and culinary traditions that reward anyone willing to slow down and pay attention.
              </p>
              <p className="type-body mt-4 text-ink/60">
                On excursions, we forage wild garlic in the Ardennes, swim in rivers most locals have forgotten about, eat at farms rather than restaurants, and learn the names of the trees we walk under. It&apos;s a practice of local appreciation — discovering that adventure doesn&apos;t require a long-haul flight, just a willingness to look closer at where you already are.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.1}>
              <div className="grid gap-px border-y border-ink/10 bg-ink/10">
                {[
                  {
                    title: "Flora & fauna",
                    text: "Learn to identify local plants, spot wildlife, and understand the ecosystems you walk through. Every trail tells a story if you know how to read it.",
                  },
                  {
                    title: "Local cuisine",
                    text: "We cook with regional ingredients, eat at local farms, and discover food traditions rooted in the landscape. A meal tastes different when you understand where it came from.",
                  },
                  {
                    title: "Culture & heritage",
                    text: "From medieval Wallonian villages to Dutch polders, each destination has layers of history. We explore places with curiosity, not just checkboxes.",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={0.1 + i * 0.08}>
                    <div className="bg-paper px-1 py-8 lg:pr-6">
                      <h3 className="type-title">{item.title}</h3>
                      <p className="type-body mt-2 text-ink/60">{item.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-12">From our excursions.</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0}>
              <MediaFrame
                src="/media/IMG_4961.jpg"
                alt="Excursion photo"
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <MediaFrame
                src="/media/IMG_5026.jpg"
                alt="Excursion group activity"
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <JoinPanel
        title="Join the next excursion."
        body="Sign up for our next trip or join the WhatsApp group to stay in the loop."
      />
    </>
  );
}
