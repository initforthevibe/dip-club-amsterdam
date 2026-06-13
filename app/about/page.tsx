import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import MediaFrame from "../components/ui/MediaFrame";
import JoinPanel from "../components/JoinPanel";

export const metadata: Metadata = {
  title: "About — Dip Club Amsterdam",
  description:
    "How Dip Club Amsterdam started, who we are, and why we believe discomfort is the door to real connection.",
};

export default function AboutPage() {
  return (
    <main>
      <Hero title="About us." subtitle="How it started. Where it&apos;s going." />

      {/* Origin story */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">The beginning</p>
              <h2 className="type-statement">
                It started with a cold swim and a question.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                In the winter of 2022, a small group of friends in Amsterdam started meeting
                at the Amstel river to swim in the cold. No breathwork certifications, no
                wellness brand — just a shared curiosity about what happens when you
                voluntarily step into discomfort with people you trust.
              </p>
              <p className="type-body mt-4 text-ink/60">
                The question was simple: what if the things that make us uncomfortable are
                actually the things that bring us closer together? Cold water. Long hikes.
                Sleeping outside. Cooking a meal with strangers. The answer turned out to be
                Dip Club.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <MediaFrame
                src="/media/dc-polaroid-1-amstel-dip.JPG"
                alt="The first Dip Club swim at the Amstel"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Growth */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">What it became</p>
              <h2 className="type-statement">
                From a few friends to a community of 200+.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                Word spread the way real things do — through experience. Someone came to a
                dip, told a friend, and that friend brought two more. Within a year we had
                monthly dips, semester trips to the Ardennes and the Belgian coast, and
                our first annual adventure — a 12-day hike through the Dolomites.
              </p>
              <p className="type-body mt-4 text-ink/60">
                Today, Dip Club is a community of over 200 people in Amsterdam. Entrepreneurs,
                designers, teachers, developers, chefs, students. What they share is not a
                demographic but a disposition: curiosity about the world, willingness to be
                uncomfortable, and a belief that the best moments happen outside of routine.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <MediaFrame
                src="/media/dc-polaroid-2-dolomites-hike.jpg"
                alt="Dip Club community hiking together"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who joins — hairline grid */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-5 text-ink/45">Who we are</p>
            <h2 className="type-statement mb-12">
              Not a fitness club. Not a wellness brand.
            </h2>
          </ScrollReveal>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="border-t border-ink/20 pt-5 h-full">
                <h3 className="type-title">No prerequisites</h3>
                <p className="type-body mt-3 text-ink/60">
                  You don&apos;t need to be fit, experienced, or brave. You need to be
                  willing to try something that makes you slightly nervous. That&apos;s
                  the only entry requirement.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="border-t border-ink/20 pt-5 h-full">
                <h3 className="type-title">All backgrounds</h3>
                <p className="type-body mt-3 text-ink/60">
                  Our members come from everywhere — different countries, professions, and
                  walks of life. The cold water is the great equalizer. In the Amstel, nobody
                  cares what you do for a living.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <div className="border-t border-ink/20 pt-5 h-full">
                <h3 className="type-title">Real connection</h3>
                <p className="type-body mt-3 text-ink/60">
                  This isn&apos;t networking with a wellness veneer. The friendships that
                  form here are forged through shared experience — cold water, long trails,
                  honest conversations. That&apos;s the kind that lasts.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <JoinPanel
        title="Come find out for yourself."
        body="Join our WhatsApp community to hear about the next dip, trip, or adventure."
      />
    </main>
  );
}
