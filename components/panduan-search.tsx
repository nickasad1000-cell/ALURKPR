"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, FileText, Search } from "lucide-react";
import type { Tahap } from "@/lib/types";
import type { PanduanArtikel } from "@/content/panduan";
import { SectionHeading } from "./ui";

function normalisasi(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, " ");
}

export function PanduanSearch({
  tahap,
  artikel,
}: {
  tahap: Tahap[];
  artikel: PanduanArtikel[];
}) {
  const [q, setQ] = useState("");

  const kata = normalisasi(q).trim();
  const mencari = kata.length >= 2;

  const hasilTahap = useMemo(() => {
    if (!mencari) return tahap;
    return tahap.filter((t) =>
      normalisasi(`${t.judul} ${t.judulSingkat} ${t.ringkasan} ${t.perbedaanSubsidi}`).includes(kata),
    );
  }, [mencari, kata, tahap]);

  const hasilArtikel = useMemo(() => {
    if (!mencari) return artikel;
    return artikel.filter((a) =>
      normalisasi(`${a.judul} ${a.ringkasan} ${a.deskripsi} ${a.kategori}`).includes(kata),
    );
  }, [mencari, kata, artikel]);

  const total = hasilTahap.length + hasilArtikel.length;
  const tidakAdaHasil = mencari && total === 0;

  return (
    <div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
          aria-hidden="true"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari tahap, istilah, atau topik… mis. subsidi"
          aria-label="Cari panduan"
          className="w-full rounded-3xl border border-line bg-surface py-3.5 pl-11 pr-4 text-sm font-medium text-ink shadow-sm outline-none transition placeholder:text-ink-soft focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>

      {tidakAdaHasil ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-6 text-center text-sm text-ink-soft">
          Tidak ada hasil untuk &ldquo;{q}&rdquo;. Coba kata kunci lain seperti
          &ldquo;DP&rdquo;, &ldquo;subsidi&rdquo;, atau &ldquo;akad&rdquo;.
        </p>
      ) : (
        <>
          <section className={mencari ? "mt-8" : "mt-0"}>
            <SectionHeading eyebrow="Alur bertahap" title="Panduan 8 tahap" />
            <ol className="mt-6 space-y-4">
              {hasilTahap.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/panduan/${t.slug}`}
                    className="group grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft font-display text-2xl font-semibold text-primary-deep">
                      {String(t.nomor).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary">
                        {t.judul}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                        {t.ringkasan}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                      Baca
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <SectionHeading eyebrow="Artikel mendalam" title="Topik pilihan" />
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hasilArtikel.map((a) => (
                <Link
                  key={a.slug}
                  href={`/panduan/${a.slug}`}
                  className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-ink">
                      {a.kategori}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft">
                      <FileText className="size-3.5" aria-hidden="true" />
                      {a.isi.length} menit
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                    {a.judul}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {a.ringkasan}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Baca selengkapnya
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-3xl border border-line bg-accent-soft/60 p-6 text-sm leading-relaxed text-ink-soft">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
              <p>
                Angka bunga, plafon subsidi, dan batas penghasilan dapat berubah
                mengikuti kebijakan. Jadikan panduan ini titik awal belajar, lalu
                verifikasi ke sumber resmi.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}