import HomeHero from "./components/HomeHero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
import StatsBar from "./components/StatsBar";
import StatementBlock from "./components/ui/StatementBlock";
import MediaFrame from "./components/ui/MediaFrame";
import SectionPanel from "./components/ui/SectionPanel";
import Button from "./components/ui/Button";
import { getAllPosts } from "@/lib/field-notes";
import { SITE } from "@/lib/site";

const PILLARS = [
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
];

export default function Home() {
  const latestPost = getAllPosts()[0];

  return (
    <main>
      <HomeHero
        backgroundImage="/media/dc-polaroid-2-dolomites-hike.jpg"
        backgroundAlt="Dip Club community hiking in the Dolomites"
        utility={
          latestPost
            ? {
                label: "Field Notes",
                title: latestPost.title,
                image: latestPost.coverImage,
                imageAlt: latestPost.title,
                href: `/field-notes/${latestPost.slug}`,
              }
            : undefined
        }
      />

      {/* Intro Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <StatementBlock
              eyebrow="Begin your journey"
              align="right"
              cta={{ text: "More about us", href: "/about" }}
            >
              Dip Club Amsterdam is an urban wellness community that brings
              together people who believe growth starts where comfort ends —
              from monthly ice baths in local waterways to multi-day hikes
              across Europe.
            </StatementBlock>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-10 text-ink/45">What we practice</p>
          </ScrollReveal>
          <div className="grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.08} className="h-full bg-paper">
                <div className="h-full px-1 py-8 lg:pr-6">
                  <p className="type-micro text-ink/45">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-title mt-3">{pillar.title}</h3>
                  <p className="type-body mt-3 text-ink/60">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="scroll-mt-20 bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-12">Our activities.</h2>
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
      <StatsBar
        stats={[
          { value: "200+", label: "Members" },
          { value: "50+", label: "Events" },
          { value: "3", label: "Countries" },
        ]}
      />

      {/* Europe Appreciation Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="order-2 flex-1 lg:order-1" delay={0.2}>
              <MediaFrame
                src="/media/dc-polaroid-2-dolomites-hike.jpg"
                alt="Hiking through the European Dolomites"
                className="h-[300px] sm:h-[400px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <ScrollReveal className="order-1 flex-1 lg:order-2">
              <p className="type-micro mb-5 text-ink/45">Local appreciation</p>
              <h2 className="type-statement">The beauty of Europe.</h2>
              <p className="type-body mt-6 max-w-lg text-ink/60">
                We don&apos;t fly halfway across the world to find adventure. From
                the canals of Amsterdam to the peaks of the Dolomites, the
                Ardennes forests to the Atlantic coast — Europe has everything.
                Ancient trails, wild rivers, and landscapes that have inspired
                people for centuries.
              </p>
              <p className="type-body mt-4 max-w-lg text-ink/60">
                Our adventures stay close to home by design. We take trains
                where we can, cook with local ingredients, and stay in places
                that support the communities we visit. Exploring responsibly
                isn&apos;t a compromise — it&apos;s how the best trips happen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact / Join Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <SectionPanel tone="dark">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex-1">
                  <h2 className="type-statement">Join the community.</h2>
                  <p className="type-body mt-4 max-w-md text-white/65">
                    Be the first to know about upcoming dips, excursions, and
                    adventures. Got a question? Don&apos;t hesitate to ask us at{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-white underline underline-offset-4 hover:text-white/80"
                    >
                      {SITE.email}
                    </a>
                    .
                  </p>
                  <div className="mt-8">
                    <Button href={SITE.whatsapp} variant="primary">
                      Join the WhatsApp community
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <MediaFrame
                    src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                    alt="Dip Club members at an Amsterdam swimming spot"
                    radius="card"
                    className="h-[240px] lg:h-[300px]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </SectionPanel>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
