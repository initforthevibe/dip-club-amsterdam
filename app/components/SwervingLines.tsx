/**
 * Decorative full-bleed swerving lines for the "Let's reconnect" section.
 * Static, softened with a vertical opacity fade at the top and bottom edges.
 */
export default function SwervingLines() {
  return (
    <div
      aria-hidden="true"
      className="lines-fade absolute inset-0 bg-[url('/media/swerving-lines.svg')] bg-center bg-no-repeat opacity-50 [background-size:100%_auto]"
    />
  );
}
