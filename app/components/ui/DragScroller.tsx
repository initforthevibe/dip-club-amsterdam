"use client";

import { useRef, useState } from "react";

type DragScrollerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Horizontal scroller with mouse grab-and-drag. Touch and trackpad use
 * native overflow scrolling; pointer drag is only wired up for mice.
 */
export default function DragScroller({ children, className = "" }: DragScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;

    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let moved = false;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        setDragging(true);
      }
      if (moved) el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDragging(false);
      // Swallow the click that follows a drag so links don't navigate.
      // The click (if any) fires synchronously after pointerup, so clear
      // the flag right after — it must never linger and eat a real click.
      if (moved) {
        suppressClick.current = true;
        setTimeout(() => {
          suppressClick.current = false;
        }, 0);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      className={[
        "flex overflow-x-auto select-none",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
