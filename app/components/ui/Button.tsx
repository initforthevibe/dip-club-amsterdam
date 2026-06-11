import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "ink";
  children: React.ReactNode;
  className?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-dark",
  secondary: "bg-mist text-ink hover:bg-ink/10",
  ghost: "border border-white/40 text-white hover:bg-white/10",
  ink: "bg-ink text-white hover:bg-ink/85",
};

const CIRCLE: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white/25",
  secondary: "bg-ink/10",
  ghost: "border border-white/50",
  ink: "bg-white/20",
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
    "group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-colors duration-200",
    VARIANTS[variant],
    className,
  ].join(" ");
  const arrow = (
    <span
      aria-hidden="true"
      className={[
        "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45",
        CIRCLE[variant],
      ].join(" ")}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );

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
