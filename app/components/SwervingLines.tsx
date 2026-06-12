"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative full-bleed swerving lines for the "Let's reconnect" section.
 * Sweeps in left-to-right (mask animation) the first time it scrolls into view.
 */
export default function SwervingLines() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[
        "absolute inset-0 bg-[url('/media/swerving-lines.svg')] bg-center bg-no-repeat [background-size:100%_auto]",
        revealed ? "lines-sweep" : "opacity-0",
      ].join(" ")}
    />
  );
}
