import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import JoinPanel from "../components/JoinPanel";

export const metadata: Metadata = {
  title: "Manifesto — Dip Club Amsterdam",
  description:
    "Why Dip Club exists. A call to disconnect from modern life and reconnect with nature, community, and yourself.",
};

export default function ManifestoPage() {
  return (
    <main>
      <Hero title="Manifesto." subtitle="Why we exist" />

      {/* The manifesto statement */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="type-micro mb-8 text-ink/45">Our belief</p>
            <div className="space-y-6 text-xl sm:text-2xl leading-relaxed font-medium text-ink">
              <p>
                True wellbeing does not come from optimizing yourself. It comes from
                being with others. From moving your body through landscapes that existed
                long before you did. From cold water that reminds you that you are alive.
              </p>
              <p>
                We believe that humans are not separate from nature — we are nature. And
                the moment we forget that, we start to break. Slowly, quietly, in ways
                that no app or algorithm can fix.
              </p>
              <p>
                Modern life is a game designed by humans. If you do not see it, it will
                swallow you whole.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-paper py-24 lg:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-8">
              The world we inherited.
            </h2>
            <div className="space-y-5 type-body text-ink/60">
              <p>
                We are living our lives through screens. We are fed information by
                algorithms that thrive on negative emotions — outrage, envy, anxiety.
                We scroll instead of walking. We consume instead of creating. We compare
                instead of connecting.
              </p>
              <p>
                Our bodies were built to move through forests, swim in rivers, sleep under
                stars, and share meals with people we trust. Instead, we sit in climate-
                controlled rooms, eat food made in factories, and call a like from a
                stranger &ldquo;connection.&rdquo;
              </p>
              <p>
                This is not a technology problem. Technology is a tool. This is an
                awareness problem. Most people have simply forgotten what it feels like
                to be fully present in their body, in a place, with other people.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What we believe — expanded pillars */}
      <section className="bg-paper py-24 lg:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-16">What we stand for.</h2>
          </ScrollReveal>

          <div className="space-y-0 divide-y divide-ink/10 border-y border-ink/10">
            {[
              {
                title: "Connection is physical",
                body: "Real connection happens when you share an experience that demands something of you. Cold water. A steep climb. Cooking dinner together after a long day on the trail. These moments bypass the small talk and take you straight to trust. You cannot fake vulnerability when you are shivering in a river with strangers who are about to become friends.",
              },
              {
                title: "We are nature",
                body: "You are not a visitor in nature. You are part of it. Your nervous system was shaped by forests. Your circadian rhythm follows the sun. Your body heals faster near water. When we spend time outdoors — not as tourists passing through but as participants in the landscape — something fundamental resets. We need to move our bodies and envelop ourselves in nature to feel whole.",
              },
              {
                title: "Disconnect to reconnect",
                body: "You absolutely need time away from screens and technology. Not because technology is evil, but because constant digital stimulation prevents you from noticing the world you actually inhabit. The sound of wind in trees. The temperature of water. The face of the person sitting across from you. Awareness is the first step to appreciation, and appreciation is the first step to preservation.",
              },
              {
                title: "Know where you are",
                body: "Most of us live in places we have never truly explored. We fly to Bali but have never hiked the Ardennes. We order sushi but cannot name the plants growing in our local park. Dip Club exists to change that — to invite experts who show us the local flora, fauna, and cultural practices, so we do not forget where we came from. To appreciate a place, you first have to know it.",
              },
              {
                title: "Preserve what is beautiful",
                body: "When you understand a landscape — its ecology, its history, the traditions of the people who live there — you feel a responsibility to protect it. This is not abstract environmentalism. This is the practical consequence of paying attention. We take trains instead of planes. We cook with local ingredients. We leave trails cleaner than we found them. Not because it is trendy, but because it is obviously right.",
              },
              {
                title: "We are one connected system",
                body: "The water you swim in feeds the fields that grow your food. The forest you hike through cleans the air you breathe. The person you share a meal with carries a story that will change how you see the world. Nothing exists in isolation. Realising this — not intellectually, but in your body, through experience — is what Dip Club is really about.",
              },
            ].map((principle, i) => (
              <ScrollReveal key={principle.title} delay={i * 0.05}>
                <div className="flex flex-col gap-4 py-10 lg:flex-row lg:gap-16">
                  <h3 className="type-title lg:w-[280px] lg:flex-shrink-0">
                    {principle.title}
                  </h3>
                  <p className="type-body text-ink/60 flex-1">
                    {principle.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The invitation */}
      <section className="bg-paper py-24 lg:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          <ScrollReveal>
            <div className="space-y-6 text-xl sm:text-2xl leading-relaxed font-medium text-ink">
              <p>
                We are not asking you to abandon your life. We are asking you to step
                outside of it — at least once a year — and remember what you are made of.
              </p>
              <p>
                Cold water. Warm people. Long trails. Real food. No screens. No
                algorithms. Just the world as it actually is, and people who want to
                experience it together.
              </p>
              <p className="text-ink/45">
                That is what Dip Club is for.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <JoinPanel
        title="Disconnect. Reconnect."
        body="Join a community of people who believe that the best things in life happen outside, together."
      />
    </main>
  );
}
