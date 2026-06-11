import HomeHero from "./components/HomeHero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
import StatsBar from "./components/StatsBar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HomeHero
        backgroundImage="/media/dc-polaroid-2-dolomites-hike.jpg"
        backgroundAlt="Dip Club community hiking in the Dolomites"
      />

      {/* Intro Section */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
                Begin Your Journey
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Explore the wonders of{" "}
                <span className="font-accent italic">discomfort</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
                Dip Club Amsterdam is an urban wellness community that brings together people who believe growth starts where comfort ends. From monthly ice baths in local waterways to multi-day hikes across Europe — we create experiences that challenge, connect, and transform.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-sm sm:h-[400px]">
                <Image
                  src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                  alt="Dip Club members at an Amsterdam swimming spot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-dark/5">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              What We Practice
            </p>
            <h2 className="mb-16 font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Five pillars of{" "}
              <span className="font-accent italic">wellness</span>
            </h2>
          </ScrollReveal>
          <div className="grid gap-px bg-dark sm:grid-cols-2 lg:grid-cols-5 rounded-sm overflow-hidden border-[6px] border-dark">
            {[
              {
                title: "Cold Exposure",
                description:
                  "Ice baths and cold water swimming reset your nervous system, boost circulation, and build mental resilience. The cold teaches you to stay calm when everything tells you to run.",
              },
              {
                title: "Heat Exposure",
                description:
                  "Sauna sessions and heat training complement the cold. The contrast between extremes strengthens your cardiovascular system and deepens recovery.",
              },
              {
                title: "Breathwork",
                description:
                  "Guided breathing techniques prepare your body for the cold, reduce stress, and unlock energy you didn't know you had. We practice before every dip.",
              },
              {
                title: "Time in Nature",
                description:
                  "From Amsterdam's waterways to European mountain trails — we get outside. Nature is the gym, the therapy room, and the classroom all at once.",
              },
              {
                title: "Real Connection",
                description:
                  "Shared discomfort breaks down walls faster than any networking event. Cold water, long trails, and honest conversations — that's how strangers become friends.",
              },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.08}>
                <div className="bg-offwhite p-6 lg:p-8 h-full">
                  <h3 className="font-heading text-base font-extrabold uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="bg-offwhite py-24 lg:py-32 border-t border-dark/5 scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="mb-12 font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Our Activities
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <ActivityCard
                title="Dips"
                frequency="Monthly"
                description="Ice baths and breathwork at local Amsterdam spots. A few hours of cold, community, and post-dip coffee."
                imageSrc="/media/dc-biweekly-dip.jpg"
                imageAlt="Community members during a cold water dip in Amsterdam"
                href="/dips"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ActivityCard
                title="Excursions"
                frequency="Every Semester"
                description="Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together."
                imageSrc="/media/dc-quarterly-excursion.JPG"
                imageAlt="Dip Club group on a hiking excursion"
                href="/excursions"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <ActivityCard
                title="Adventures"
                frequency="Once a Year"
                description="Multi-day long-distance hikes across Europe. Up to 12 days of trails, mountain passes, and unforgettable landscapes."
                imageSrc="/media/dc-annual-adventure-2.JPG"
                imageAlt="Dip Club adventure hike in the mountains"
                href="/adventures"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar stats={[
        { value: "200+", label: "Members" },
        { value: "50+", label: "Events" },
        { value: "3", label: "Countries" },
      ]} />

      {/* Europe Appreciation Section */}
      <section className="bg-offwhite bg-topo py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1 order-2 lg:order-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-sm sm:h-[400px]">
                <Image
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Hiking through the European Dolomites"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1 order-1 lg:order-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
                Local Appreciation
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                The beauty of{" "}
                <span className="font-accent italic">Europe</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
                We don&apos;t fly halfway across the world to find adventure. From the canals of Amsterdam to the peaks of the Dolomites, the Ardennes forests to the Atlantic coast — Europe has everything. Ancient trails, wild rivers, and landscapes that have inspired people for centuries.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
                Our adventures stay close to home by design. We take trains where we can, cook with local ingredients, and stay in places that support the communities we visit. Exploring responsibly isn&apos;t a compromise — it&apos;s how the best trips happen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Contact Card Section */}
      <section className="bg-offwhite bg-wavy py-24 lg:py-32 border-t border-dark/5">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
            <ScrollReveal className="flex-1">
              <div className="h-full flex flex-col justify-center rounded-sm border-[6px] border-dark bg-offwhite p-8 lg:p-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Contact</h2>
                <p className="mt-4 text-base text-slate">
                  Got a question?{"\n"}Don&apos;t hesitate to ask us.
                </p>
                <a
                  href="mailto:hello@dipclub.nl"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
                >
                  hello@dipclub.nl
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17l10-10M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.15}>
              <div className="h-full flex flex-col justify-center rounded-sm border-[6px] border-terracotta bg-terracotta bg-topo-light p-8 lg:p-12 text-white">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Join the community</h2>
                <p className="mt-4 text-base text-white/80">
                  Be the first to know about upcoming dips, excursions, and adventures.
                </p>
                <a
                  href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-fit rounded-none bg-offwhite px-8 py-3 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-offwhite/90 transition-all"
                >
                  Join WhatsApp ↘
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
