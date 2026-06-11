"use client";

import { useEffect, useState } from "react";
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
    >
      {images.map((img) => (
        <div
          key={img.src}
          className={`absolute overflow-hidden rounded-[8px] ${img.position}`}
          style={{
            transform: `translate(${(offset.x * img.depth).toFixed(1)}px, ${(offset.y * img.depth).toFixed(1)}px)`,
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
