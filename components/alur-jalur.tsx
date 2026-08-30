import Link from "next/link";
import { ArrowRight, KeyRound, Clock } from "lucide-react";
import { tahapKpr } from "@/content/tahap";

type Fase = { nama: string; awal: number; akhir: number };

const fase: Fase[] = [
  { nama: "Persiapan", awal: 1, akhir: 3 },
  { nama: "Transaksi & proses kredit", awal: 4, akhir: 6 },
  { nama: "Penutupan & pasca", awal: 7, akhir: 8 },
];

export function AlurJalur() {
  return (
    <div className="rounded-[2.5rem] border border-line bg-surface p-7 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Jalur menuju kunci
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            8 tahap, dari cek keuangan sampai kunci di tangan
          </h2>
        </div>
        <Link
          href="/panduan"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
        >
          Semua panduan
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        Ikuti jalurnya berurutan. Tiap tahap punya daftar dokumen, perkiraan
        waktu, dan jebakan yang sering bikin proses buntu — jangan dilewati.
      </p>

      <div className="mt-10 space-y-10">
        {fase.map((f) => {
          const items = tahapKpr.filter((t) => t.nomor >= f.awal && t.nomor <= f.akhir);
          return (
            <div key={f.nama}>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                {f.nama}
              </p>
              <ol className="mt-3 grid gap-3 lg:grid-cols-3">
                {items.map((t) => {
                  const puncak = t.nomor === 7;
                  return (
                    <li key={t.slug} className={puncak ? "lg:col-span-1" : ""}>
                      <Link
                        href={`/panduan/${t.slug}`}
                        className="group relative flex h-full flex-col rounded-3xl border border-line bg-paper p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`grid size-10 place-items-center rounded-2xl font-display text-lg font-semibold tabular-nums ${
                              puncak
                                ? "bg-accent text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {t.nomor}
                          </span>
                          {puncak ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink">
                              <KeyRound className="size-3.5" aria-hidden="true" />
                              Kunci di tangan
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-4 font-display text-base font-semibold leading-snug group-hover:text-primary">
                          {t.judulSingkat}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                          {t.ringkasan}
                        </p>
                        <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold text-ink-soft">
                          <Clock className="size-3.5" aria-hidden="true" />
                          {t.estimasiWaktu}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
