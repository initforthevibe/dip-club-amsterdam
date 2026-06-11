type SectionPanelProps = {
  tone?: "dark" | "mist" | "terracotta";
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
  children,
  className = "",
}: SectionPanelProps) {
  return (
    <div
      className={["rounded-frame p-8 lg:p-12", TONES[tone], className].join(" ")}
    >
      {children}
    </div>
  );
}
