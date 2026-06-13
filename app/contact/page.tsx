import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import Button from "../components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Dip Club Amsterdam",
  description:
    "Get in touch with Dip Club Amsterdam. Join our WhatsApp community, follow us on Instagram, or send us an email.",
};

export default function ContactPage() {
  return (
    <main>
      <Hero title="Contact." subtitle="We&apos;d love to hear from you" />

      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* WhatsApp */}
            <ScrollReveal delay={0}>
              <div className="rounded-card border border-ink/10 bg-paper p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-ink/40">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h2 className="type-title">WhatsApp</h2>
                  <p className="type-body mt-2 text-ink/60">
                    Join our community group to hear about upcoming events, ask questions,
                    and meet other members.
                  </p>
                </div>
                <div className="mt-6">
                  <Button href={SITE.whatsapp} variant="primary">
                    Join community
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Instagram */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-card border border-ink/10 bg-paper p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </div>
                  <h2 className="type-title">Instagram</h2>
                  <p className="type-body mt-2 text-ink/60">
                    Photos, stories, and recaps from our dips, trips, and adventures.
                    Follow along at @dipclub.ams.
                  </p>
                </div>
                <div className="mt-6">
                  <Button href={SITE.instagram} variant="secondary">
                    @dipclub.ams
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-card border border-ink/10 bg-paper p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h2 className="type-title">Email</h2>
                  <p className="type-body mt-2 text-ink/60">
                    Questions about events, collaborations, press, or anything else?
                    Drop us a line.
                  </p>
                </div>
                <div className="mt-6">
                  <Button href={`mailto:${SITE.email}`} variant="secondary">
                    {SITE.email}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ-style section */}
      <section className="bg-paper py-24 lg:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="type-statement mb-12">Common questions.</h2>
          </ScrollReveal>
          <div className="space-y-0 divide-y divide-ink/10 border-y border-ink/10">
            {[
              {
                q: "I've never done cold water swimming. Can I still join?",
                a: "Absolutely. Most of our members started with zero experience. We guide you through breathwork, you set your own pace, and even 30 seconds in the water counts. The community is what makes it work — not your cold tolerance.",
              },
              {
                q: "Do I need to be fit for the adventures?",
                a: "You need to be willing to prepare. We share a training guide 3 months before each trip. If you can walk 15 km with a backpack, you can do it. The trail is challenging, but it's designed to be achievable for committed beginners.",
              },
              {
                q: "How much do events cost?",
                a: "Monthly dips are free. Trips and adventures are at-cost — we split transport, accommodation, and food equally. Nobody profits from Dip Club. We're a community, not a business.",
              },
              {
                q: "I'm new to Amsterdam. Is this a good way to meet people?",
                a: "It's one of the best. Shared discomfort breaks down social barriers faster than any networking event. Many of our strongest friendships started with a cold swim and a warm coffee after.",
              },
            ].map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.08}>
                <div className="py-8">
                  <h3 className="type-title">{faq.q}</h3>
                  <p className="type-body mt-3 text-ink/60">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
