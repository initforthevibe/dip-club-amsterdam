import Link from "next/link";
import HomeHero from "./components/HomeHero";
import ActivityCard from "./components/ActivityCard";
import FieldNoteCard from "./components/FieldNoteCard";
import ScrollReveal from "./components/ScrollReveal";
import DragScroller from "./components/ui/DragScroller";
import StatsBar from "./components/StatsBar";
import FloatingImages from "./components/FloatingImages";
import SwervingLines from "./components/SwervingLines";
import StatementBlock from "./components/ui/StatementBlock";
import MediaFrame from "./components/ui/MediaFrame";
import SectionPanel from "./components/ui/SectionPanel";
import Button from "./components/ui/Button";
import { getAllPosts } from "@/lib/field-notes";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    title: "Outdoor Swimming",
    description:
      "Ice baths and open-water swims in Amsterdam's waterways, all year round. The cold resets your nervous system, boosts circulation, and teaches you to stay calm when everything tells you to run.",
  },
  {
    title: "Social Sauna",
    description:
      "The sauna is where the community thaws out and conversations get warm. The contrast between hot and cold strengthens your cardiovascular system and deepens recovery.",
  },
  {
    title: "Breath Work",
    description:
      "Guided breathing techniques prepare your body for the cold, reduce stress, and unlock energy you didn't know you had. We practice before every dip.",
  },
  {
    title: "Hiking",
    description:
      "From day trips beyond the city to multi-day hikes across Europe's mountains. The trail is the gym, the therapy room, and the classroom all at once.",
  },
  {
    title: "Bushcraft",
    description:
      "Foraging, fire-making, and the old skills of living well outdoors. Knowing how to take care of yourself in nature turns any landscape into home.",
  },
];

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <HomeHero
        backgroundImage="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
        backgroundAlt="Dip Club members at an Amsterdam swimming spot against the city skyline"
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

      {/* Let's reconnect */}
      {/* min-h matches the swerving-lines SVG aspect (786/1667 ≈ 47%) so the full artwork fits */}
      <section className="relative flex min-h-[47vw] items-center overflow-hidden bg-paper py-32 lg:py-52">
        <SwervingLines />
        <FloatingImages
          images={[
            { src: "/media/dc-polaroid-1-amstel-dip.JPG", position: "left-[5%] top-[8%] w-32 aspect-square", depth: 18 },
            { src: "/media/dc-polaroid-6-amstel-dip-flip.jpg", position: "left-[14%] bottom-[12%] w-40 aspect-square", depth: 10 },
            { src: "/media/dc-polaroid-3-south-africa-hike.jpg", position: "left-[30%] top-[14%] w-28 aspect-square", depth: 26 },
            { src: "/media/dc-quarterly-excursion.JPG", position: "right-[28%] bottom-[8%] w-36 aspect-square", depth: 14 },
            { src: "/media/dc-polaroid-4-dolomites-hike.jpg", position: "right-[8%] top-[10%] w-40 aspect-square", depth: 8 },
            { src: "/media/dc-biweekly-dip.jpg", position: "right-[4%] bottom-[18%] w-28 aspect-square", depth: 22 },
          ]}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-6 text-center lg:px-12">
          <ScrollReveal>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
              Let&apos;s reconnect.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-12 text-ink/45">What we practice</p>
          </ScrollReveal>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.08}>
                <div className="border-t border-ink/20 pt-5">
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
                title="Trips"
                frequency="Every Semester"
                description="Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together."
                imageSrc="/media/dc-quarterly-excursion.JPG"
                imageAlt="Dip Club group on a hiking trip"
                href="/trips"
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

      {/* Field Notes Section */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="type-statement">Field notes.</h2>
              <Link
                href="/field-notes"
                className="type-micro shrink-0 text-ink/45 transition-colors hover:text-ink"
              >
                All field notes <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <DragScroller className="-mx-6 gap-6 px-6 pb-2 lg:-mx-12 lg:px-12">
              {posts.map((post) => (
                <div key={post.slug} className="flex w-[320px] shrink-0 sm:w-[380px]">
                  <FieldNoteCard post={post} />
                </div>
              ))}
            </DragScroller>
          </ScrollReveal>
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
            <SectionPanel tone="terracotta" flush>
              <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
                <div className="flex-1 p-6 sm:p-8 lg:p-12 lg:self-center">
                  <h2 className="type-statement">Join the community.</h2>
                  <p className="type-body mt-4 max-w-md text-white/80">
                    Be the first to know about upcoming dips, trips, and
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
                    <Button href={SITE.whatsapp} variant="ink">
                      Join the WhatsApp community
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <MediaFrame
                    src="/media/dc-biweekly-dip.jpg"
                    alt="Community members during a cold water dip in Amsterdam"
                    radius="card"
                    className="h-[280px] lg:h-full lg:min-h-[400px]"
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
