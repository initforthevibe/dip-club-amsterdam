type BottomRightNotchOptions = {
  /** Outer corner radius in px (e.g. 12 for cards, 20 for the hero frame). */
  outerRadius: number;
  /** Notch width as a CSS length or percentage of element width, e.g. "33.33%". */
  notchWidth: string;
  /** Notch depth measured up from the bottom edge, in px. */
  notchDepth: number;
  /** Radius of the three notch corners, in px. */
  notchRadius: number;
};

/**
 * Builds a `clip-path` value: a rounded rectangle with a rounded concave notch
 * removed from the bottom-right corner, leaving a tab. Uses the CSS `shape()`
 * function so the notch tracks the element's fluid width (notch width may be a
 * percentage). Browsers without `shape()` ignore the invalid value and fall
 * back to the element's own `border-radius`.
 *
 * Outline is traversed clockwise from the top edge. All corners are rounded;
 * the inner re-entrant corner is concave (`ccw`), the rest are convex (`cw`).
 */
export function bottomRightNotch({
  outerRadius: o,
  notchWidth: w,
  notchDepth: d,
  notchRadius: r,
}: BottomRightNotchOptions): string {
  return [
    "shape(",
    `from ${o}px 0,`,
    `hline to calc(100% - ${o}px),`,
    `arc to 100% ${o}px of ${o}px cw,`,
    `vline to calc(100% - ${d + r}px),`,
    `arc to calc(100% - ${r}px) calc(100% - ${d}px) of ${r}px cw,`,
    `hline to calc(100% - ${w} + ${r}px),`,
    `arc to calc(100% - ${w}) calc(100% - ${d - r}px) of ${r}px ccw,`,
    `vline to calc(100% - ${r}px),`,
    `arc to calc(100% - ${w} - ${r}px) 100% of ${r}px cw,`,
    `hline to ${o}px,`,
    `arc to 0 calc(100% - ${o}px) of ${o}px cw,`,
    `vline to ${o}px,`,
    `arc to ${o}px 0 of ${o}px cw,`,
    "close",
    ")",
  ].join(" ");
}
