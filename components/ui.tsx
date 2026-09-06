import type { ElementType, ReactNode } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

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
        className={`mt-3 font-display font-semibold tracking-tight text-balance ${
          as === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
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
  `w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 ${btnFocus}`;

export const btnWhatsApp =
  `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-wa px-6 text-sm font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] hover:bg-wa-deep active:scale-[0.98] ${btnFocus}`;

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="font-semibold text-primary hover:text-primary-deep hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="font-semibold text-ink-soft"
                >
                  {item.label}
                </span>
              )}
              {i < items.length - 1 ? (
                <span className="text-line" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function DisclaimerNasihat({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
      <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
      <span>
        {children ??
          "Halaman ini bersifat edukasi dan bukan nasihat keuangan resmi. Angka, batas penghasilan, dan kuota FLPP dapat berubah sesuai kebijakan pemerintah serta penilaian tiap bank."}
      </span>
    </p>
  );
}
