type SectionPanelProps = {
  tone?: "dark" | "mist";
  children: React.ReactNode;
  className?: string;
};

export default function SectionPanel({
  tone = "dark",
  children,
  className = "",
}: SectionPanelProps) {
  return (
    <div
      className={[
        "rounded-frame p-8 lg:p-12",
        tone === "dark" ? "bg-ink text-white" : "bg-mist text-ink",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
