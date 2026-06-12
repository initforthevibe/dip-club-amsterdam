type SectionPanelProps = {
  tone?: "dark" | "mist" | "terracotta";
  /** flush = 8px inner stroke so media can run close to the panel edges; content brings its own padding */
  flush?: boolean;
  children: React.ReactNode;
  className?: string;
};

const TONES: Record<NonNullable<SectionPanelProps["tone"]>, string> = {
  dark: "bg-ink text-white",
  mist: "bg-mist text-ink",
  terracotta: "bg-terracotta bg-wavy-fine text-white",
};

export default function SectionPanel({
  tone = "dark",
  flush = false,
  children,
  className = "",
}: SectionPanelProps) {
  return (
    <div
      className={[
        "rounded-frame",
        flush ? "p-2" : "p-8 lg:p-12",
        TONES[tone],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
