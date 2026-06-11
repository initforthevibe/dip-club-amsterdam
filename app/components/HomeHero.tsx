"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import UtilityCard from "./ui/UtilityCard";
import { SITE } from "@/lib/site";

type HomeHeroProps = {
  backgroundImage: string;
  backgroundAlt: string;
  utility?: {
    label: string;
    title: string;
    image?: string;
    imageAlt?: string;
    href: string;
  };
};

export default function HomeHero({
  backgroundImage,
  backgroundAlt,
  utility,
}: HomeHeroProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stagger = (delay: string) =>
    [
      "transition-all duration-700 ease-out",
      revealed ? `opacity-100 translate-y-0 ${delay}` : "opacity-0 translate-y-4",
    ].join(" ");

  return (
    <section className="bg-paper p-2 lg:p-4">
      <div className="relative min-h-[560px] overflow-hidden rounded-frame h-[calc(100svh-16px)] lg:h-[calc(100svh-32px)]">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className={[
            "object-cover transition-all duration-[1400ms] ease-out",
            revealed ? "scale-100 opacity-100" : "scale-105 opacity-0",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/35" />

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <h1 className={["type-display text-white", stagger("delay-300")].join(" ")}>
              Reset. Your. Mind.
            </h1>
            <p className={["type-title mt-4 max-w-xl text-white/85", stagger("delay-500")].join(" ")}>
              Amsterdam&apos;s social adventure community focused on reconnecting
              with nature.
            </p>
            <div className={["mt-7 flex flex-wrap gap-3", stagger("delay-700")].join(" ")}>
              <Button href={SITE.whatsapp} variant="primary">
                Join the WhatsApp community
              </Button>
              <Button href="#activities" variant="ghost">
                See activities
              </Button>
            </div>
          </div>
        </div>

        {/* Floating utility card */}
        {utility && (
          <div className={["absolute right-6 bottom-6 hidden w-64 lg:block", stagger("delay-[900ms]")].join(" ")}>
            <UtilityCard {...utility} tone="light" />
          </div>
        )}
      </div>
    </section>
  );
}
