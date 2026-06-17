"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import { SITE } from "@/lib/site";
import { bottomRightNotch } from "@/lib/notch";

// Bottom-right corner notch — same 1/3 width, depth reduced 20% (144 → 115).
// rounded-frame = 20px.
const NOTCH_CLIP = bottomRightNotch({
  outerRadius: 20,
  notchWidth: "33.33%",
  notchDepth: 115,
  notchRadius: 20,
});

type HomeHeroProps = {
  backgroundImage: string;
  backgroundAlt: string;
};

export default function HomeHero({
  backgroundImage,
  backgroundAlt,
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
      <div
        className={[
          "relative min-h-[560px] overflow-hidden rounded-frame h-[calc(100svh-16px)] lg:h-[calc(100svh-32px)]",
          "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          revealed ? "scale-100" : "scale-[0.94]",
        ].join(" ")}
        style={{ clipPath: NOTCH_CLIP }}
      >
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
        <div className="absolute inset-x-0 bottom-0 p-6 pb-[74px] sm:p-10 sm:pb-[90px] lg:p-14 lg:pb-[106px]">
          <div>
            <h1
              className={["type-display text-white lg:whitespace-nowrap", stagger("delay-300")].join(" ")}
              style={{ fontSize: "clamp(4.2rem, 10vw, 9rem)", fontWeight: 550 }}
            >
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
      </div>
    </section>
  );
}
