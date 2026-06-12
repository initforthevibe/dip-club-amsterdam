"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type FloatingImage = {
  src: string;
  /** Position + size classes, e.g. "left-[6%] top-[10%] w-32 aspect-[4/5]" */
  position: string;
  /** Parallax strength in px at full mouse deflection — larger = closer/deeper movement */
  depth: number;
};

type FloatingImagesProps = {
  images: FloatingImage[];
};

export default function FloatingImages({ images }: FloatingImagesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    // -1..1 as the section's center travels through the viewport
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      setScroll(Math.max(-1, Math.min(1, progress)));
    };
    handleScroll();
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
    >
      {images.map((img) => (
        <div
          key={img.src}
          className={`absolute overflow-hidden rounded-full ${img.position}`}
          style={{
            transform: `translate(${(mouse.x * img.depth).toFixed(1)}px, ${(
              mouse.y * img.depth +
              scroll * img.depth * -2
            ).toFixed(1)}px)`,
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
      ))}
    </div>
  );
}
