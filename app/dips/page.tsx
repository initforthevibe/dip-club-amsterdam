import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import MediaFrame from "../components/ui/MediaFrame";
import JoinPanel from "../components/JoinPanel";

export const metadata: Metadata = {
  title: "Dips — Dip Club Amsterdam",
  description:
    "Monthly ice baths and breathwork sessions at local Amsterdam spots. Open to everyone, all levels welcome.",
};

export default function DipsPage() {
  return (
    <>
      {/* Hero */}
      <Hero title="Dips." subtitle="Cold water, warm community" badge="Every month" />

      {/* Overview section 1 — Text left, Image right */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Left: text */}
            <ScrollReveal className="flex-1">
              <p className="type-micro mb-5 text-ink/45">What to expect</p>
              <h2 className="type-statement">
                Ice baths and breathwork in the heart of Amsterdam.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                Every month we gather at one of Amsterdam&apos;s local waterways for an
                ice bath session. We start with guided breathwork to prepare your body
                and mind, then take the plunge together. Afterwards, we warm up with hot
                drinks and good conversation. It&apos;s a few hours of your morning that
                will shift your entire week.
              </p>
              <p className="type-body mt-4 text-ink/60">
                No experience needed. First-timers are always welcome and we&apos;ll guide
                you through everything. The cold is the easy part — showing up is the
                hard part.
              </p>
            </ScrollReveal>

            {/* Right: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <MediaFrame
                src="/media/dc-biweekly-dip.jpg"
                alt="Dip Club Amsterdam group ice bath session"
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
              <h2 className="type-statement">A typical dip session.</h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Duration: 2-3 hours on a Saturday or Sunday morning",
                  "Location: Rotating Amsterdam waterways and swimming spots",
                  "Group size: 10-20 people per session",
                  "What to bring: Swimwear, towel, warm clothes for after",
                  "Cost: Free — just show up",
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
                src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                alt="Amsterdam dip spot"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why it works — benefits of cold, heat, breathwork */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-5 text-ink/45">Why it works</p>
            <h2 className="type-statement mb-12">
              The science behind the shiver.
            </h2>
          </ScrollReveal>
          <div className="grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Cold exposure</h3>
                <p className="type-body mt-3 text-ink/60">
                  Cold water immersion activates your sympathetic nervous system, releasing norepinephrine and boosting dopamine levels by up to 250%. Regular cold exposure improves circulation, reduces inflammation, and trains your body to manage stress more effectively. Over time, you build resilience — not just to cold, but to discomfort in general.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Heat exposure</h3>
                <p className="type-body mt-3 text-ink/60">
                  The contrast between cold and heat is where the magic happens. Heat exposure through sauna or warm-up sessions increases heart rate, promotes blood flow, and triggers heat shock proteins that repair damaged cells. Alternating between hot and cold creates a cardiovascular workout that strengthens your heart and immune system.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <div className="bg-paper px-1 py-8 lg:pr-6 h-full">
                <h3 className="type-title">Breathwork</h3>
                <p className="type-body mt-3 text-ink/60">
                  Controlled breathing is the bridge between mind and body. Before every dip, we practice techniques that oxygenate your blood, calm your nervous system, and prepare you to stay present in the cold. Breathwork reduces cortisol, improves focus, and gives you a tool you can use long after the session ends — in stressful meetings, difficult conversations, or sleepless nights.
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
                How to prepare for your first dip.
              </h2>
              <p className="type-body mt-6 text-ink/60">
                No cold water experience needed. But a little preparation goes a long way — both physically and mentally.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.1}>
              <ul className="space-y-4">
                {[
                  "Start at home: End your daily showers with 30 seconds of cold water. Build to 1-2 minutes over a few weeks.",
                  "Practice breathing: Try box breathing (4 seconds in, 4 hold, 4 out, 4 hold) to calm your nervous system. This is your main tool in the water.",
                  "Eat well beforehand: Have a solid breakfast. Your body burns calories to stay warm — give it fuel.",
                  "Bring warm layers: The after-dip is as important as the dip. Bring a hat, warm socks, a thick hoodie, and a hot drink in a thermos.",
                  "Don't force it: Your first time, even 30 seconds in the water is a win. You set the pace, not the group.",
                  "Come with an open mind: The cold is a tool. The community is the reward.",
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
            <h2 className="type-statement mb-12">From our dips.</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0}>
              <MediaFrame
                src="/media/dc-polaroid-1-amstel-dip.JPG"
                alt="Amstel dip session"
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <MediaFrame
                src="/media/IMG_2377.jpg"
                alt="Dip Club community gathering"
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <JoinPanel
        title="Ready for your first dip?"
        body="Join our WhatsApp group to hear about the next session. We'll see you in the water."
      />
    </>
  );
}
