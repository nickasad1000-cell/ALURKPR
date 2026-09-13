import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";
import type { PanduanArtikel } from "@/content/panduan";
import { SectionHeading } from "./ui";

export function DaftarPanduan({ artikel }: { artikel: PanduanArtikel[] }) {
  return (
    <div>
      <Link
        href="/perjalanan"
        className="group mb-14 flex flex-col gap-4 rounded-3xl border border-primary/25 bg-primary-soft p-7 transition hover:border-primary/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary-deep">
            Alur bertahap yang wajib kamu lewati
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-balance">
            Ikuti 8 tahap dari cek keuangan sampai kunci di tangan
          </h2>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-primary-deep">
          Buka perjalanan
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>

      <section>
        <SectionHeading eyebrow="Artikel mendalam" title="Topik pilihan" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artikel.map((a) => (
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
    </div>
  );
}