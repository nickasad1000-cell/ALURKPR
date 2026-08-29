import Link from "next/link";
import type { Tahap } from "@/lib/types";

export function TahapCard({ tahap }: { tahap: Tahap }) {
  return (
    <Link
      href={`/panduan/${tahap.slug}`}
      className="group flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-4xl font-semibold tabular-nums text-primary/25 transition group-hover:text-primary">
          {String(tahap.nomor).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-deep">
          Tahap {tahap.nomor}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
        {tahap.judulSingkat}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {tahap.ringkasan}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        Baca panduan
        <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}