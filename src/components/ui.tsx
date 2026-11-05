import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <span className="brand">
      <svg viewBox="0 0 36 40" fill="none" aria-hidden="true">
        <path d="M3 2h20l11 9-11 9H3l10-9L3 2Z" fill="currentColor" />
        <path
          d="M3 22h20l11 8-11 8H3l10-8-10-8Z"
          fill="currentColor"
          opacity=".72"
        />
        <path
          d="M3 2v18l10-9L3 2Zm0 20v16l10-8-10-8Z"
          fill="currentColor"
          opacity=".4"
        />
      </svg>
      {!markOnly && <span>BETAROG</span>}
    </span>
  );
}
export function Eyebrow({
  number,
  children,
}: {
  number?: string;
  children: ReactNode;
}) {
  return (
    <p className="eyebrow">
      {number && <span>{number} / </span>}
      {children}
    </p>
  );
}
export function SectionHeading({
  number,
  label,
  children,
  copy,
}: {
  number: string;
  label: string;
  children: ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <Eyebrow number={number}>{label}</Eyebrow>
        <h2>{children}</h2>
      </div>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "primary",
  direction = "right",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "text" | "outline";
  direction?: "right" | "up" | "down";
  className?: string;
}) {
  const Icon =
    direction === "up"
      ? ArrowUpRight
      : direction === "down"
        ? ArrowDown
        : ArrowRight;
  return (
    <Link
      href={href}
      className={`button button-${variant} ${className}`}
      data-magnetic
    >
      {children}
      <Icon size={19} aria-hidden="true" />
    </Link>
  );
}
export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips" aria-label="Technology stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
