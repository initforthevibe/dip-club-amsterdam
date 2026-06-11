import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import MediaFrame from "../components/ui/MediaFrame";
import JoinPanel from "../components/JoinPanel";

export const metadata: Metadata = {
  title: "Adventures — Dip Club Amsterdam",
  description:
    "Once-a-year long-distance hikes across Europe. Up to 12 days of trails, mountain passes, and unforgettable landscapes.",
};

export default function AdventuresPage() {
  return (
    <>
      {/* Hero */}
      <Hero title="Adventures." subtitle="Long-distance hikes across Europe" badge="Once a year" />

      {/* Overview section 1 — Text left, Image right */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Left: text */}
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">What to expect</p>
              <h2 className="type-statement">
                Long-distance hikes that push your limits.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                Once a year, we go big. The annual Dip Club adventure is a long-distance
                hike across some of Europe&apos;s most stunning landscapes — up to 12 days
                of trails, mountain passes, wild swimming, and shared experiences. Past
                adventures have taken us through the Dolomites and along the coast of
                South Africa.
              </p>
              <p className="type-body mt-4 text-ink/60">
                This is where the deepest bonds are formed. Day after day on the trail
                together, you&apos;ll return home exhausted, inspired, and with a group
                of people who now feel like family.
              </p>
            </ScrollReveal>

            {/* Right: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <MediaFrame
                src="/media/dc-annual-adventure-2.JPG"
                alt="Dip Club Amsterdam annual adventure"
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
              <h2 className="type-statement">What an adventure looks like.</h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Duration: 7-12 days of continuous hiking",
                  "Routes: European long-distance trails, mountain crossings, coastal paths",
                  "Group size: 8-12 people",
                  "What to bring: Trail shoes, backpack, camping gear (full packing list provided)",
                  "Travel: Trains and buses where possible — we keep it local",
                  "Cost: Shared expenses — transport, accommodation, and food",
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
                src="/media/dc-polaroid-4-dolomites-hike.jpg"
                alt="Dolomites hike adventure"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why it works — exercise, nature, connection */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-5 text-ink/45">Why long-distance hiking transforms you</p>
            <h2 className="type-statement mb-12">
              Days on the trail change everything.
            </h2>
          </ScrollReveal>
          <div className="grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Sustained exercise</h3>
                <p className="type-body mt-3 text-ink/60">
                  Walking 15-25 km per day for a week straight does something no gym session can. Your body adapts, your endurance builds, and your relationship with physical effort fundamentally shifts. Long-distance hiking improves cardiovascular health, strengthens joints, and triggers deep recovery cycles that leave you fitter than when you started.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Deep time in nature</h3>
                <p className="type-body mt-3 text-ink/60">
                  A weekend in nature is refreshing. A week is transformative. After a few days, your cortisol drops, your sleep deepens, and your senses sharpen. You start hearing birdsong, smelling rain before it arrives, and noticing how light changes through the day. Extended time outdoors recalibrates your nervous system in ways that persist long after you return home.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Connection through effort</h3>
                <p className="type-body mt-3 text-ink/60">
                  There&apos;s a reason soldiers, athletes, and explorers form the strongest bonds — shared adversity creates trust faster than anything else. Hiking through rain, sharing a meal after a hard day, helping each other up a mountain pass. These aren&apos;t activities. They&apos;re the foundation of real friendship. People come home from our adventures with relationships that last years.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How to prepare */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">Preparation</p>
              <h2 className="type-statement">
                How to prepare for a long-distance hike.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                You don&apos;t need to be an athlete. You need to be willing to prepare. We share a full training guide 3 months before each adventure, but here&apos;s the foundation.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.1}>
              <ul className="space-y-4">
                {[
                  "Build a base: Walk 10-15 km at least twice a week for 8-12 weeks before the trip. Increase distance gradually.",
                  "Train with weight: Hike with a loaded backpack (8-12 kg) to condition your legs, back, and shoulders.",
                  "Break in your gear: Wear your trail shoes on every training walk. Blisters are caused by new gear, not long days.",
                  "Strengthen your core: Planks, deadlifts, and single-leg squats help prevent injury on uneven terrain.",
                  "Practice elevation: If possible, find hills. Stairs work too. Your legs need to know what climbing feels like.",
                  "Rest and recover: Don't overtrain the final 2 weeks. Arrive rested, not exhausted.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-ink/20" />
                    <span className="type-body text-ink/60">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-12">From our adventures.</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-frame">
                <MediaFrame
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Dolomites hike"
                  className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-frame">
                <MediaFrame
                  src="/media/dc-polaroid-3-south-africa-hike.jpg"
                  alt="South Africa hike"
                  className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-frame">
                <MediaFrame
                  src="/media/IMG_6342.jpg"
                  alt="Adventure photo"
                  className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <JoinPanel
        title="Ready for the adventure of a lifetime?"
        body="Sign up for the next trip or join our community to be the first to know when registrations open."
      />
    </>
  );
}
