import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  className?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-dark",
  secondary: "bg-mist text-ink hover:bg-ink/10",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

export default function Button({
  href,
  variant = "secondary",
  children,
  className = "",
}: ButtonProps) {
  const isHttp = href.startsWith("http");
  const isExternal = isHttp || href.startsWith("mailto:");
  const classes = [
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
    VARIANTS[variant],
    className,
  ].join(" ");
  const arrow = <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>;

  if (isExternal) {
    return (
      <a
        href={href}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
