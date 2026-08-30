import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow";
}) {
  const width = size === "narrow" ? "max-w-3xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const alignCls =
    align === "center" ? "text-center mx-auto" : "text-left";
  const Tag = as as ElementType;
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        className={`mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          as === "h1" ? "text-4xl sm:text-5xl" : ""
        }`}
      >
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export const btnFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const btnPrimary =
  `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] hover:bg-primary-deep active:scale-[0.98] ${btnFocus}`;

export const btnSecondary =
  `inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-bold text-ink transition-[border-color,color,transform] hover:border-primary/40 hover:text-primary active:scale-[0.98] ${btnFocus}`;

export const inputCls =
  `w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 ${btnFocus}`;
