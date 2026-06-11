import Button from "./Button";

type StatementBlockProps = {
  eyebrow?: string;
  children: React.ReactNode;
  cta?: { text: string; href: string; variant?: "primary" | "secondary" | "ghost" };
  align?: "left" | "right";
};

export default function StatementBlock({
  eyebrow,
  children,
  cta,
  align = "left",
}: StatementBlockProps) {
  return (
    <div className={["flex", align === "right" ? "lg:justify-end" : ""].filter(Boolean).join(" ")}>
      <div className="max-w-2xl">
        {eyebrow && <p className="type-micro mb-5 text-ink/45">{eyebrow}</p>}
        <div className="type-statement">{children}</div>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant={cta.variant ?? "secondary"}>
              {cta.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
