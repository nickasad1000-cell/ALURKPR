import Link from "next/link";
import type { CSSProperties } from "react";
import { BadgeCheck, Clock } from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { Container, SectionHeading, btnSecondary } from "@/components/ui";

const BARIS = ["12%", "37%", "62%", "87%"] as const;
const INDEKS_BARIS = [0, 0, 1, 1, 2, 2, 3, 3] as const;
const SISI = ["L", "R", "R", "L", "L", "R", "R", "L"] as const;

const ROAD = "absolute hidden rounded-full bg-primary-deep lg:block";
const DASH_H =
  "absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,transparent_0_8px,#c99a3c_8px_16px)]";
const DASH_V =
  "absolute inset-y-3 left-1/2 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,transparent_0_8px,#c99a3c_8px_16px)]";

export function AlurJalur() {
  return (
    <section className="mt-20 sm:mt-24">
      <Container>
        <SectionHeading
          eyebrow="Alur pengajuan KPR"
          title="Jalur pengajuan KPR"
          description="Delapan tahap dari cek keuangan sampai akad dan KPR cair. Ikuti jalaurnya satu per satu, setiap pemberhentian terhubung ke panduan lengkapnya."
        />

        <ol className="relative mx-auto mt-12 max-w-6xl pb-2 lg:h-[46rem]">
          <div
            className="absolute bottom-2 left-[17px] top-2 w-2.5 rounded-full bg-primary-deep lg:hidden"
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>

          <div
            className={`${ROAD} left-[26%] top-0 h-[12%] w-2.5 -translate-x-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[12%] h-2.5 w-[48%] -translate-y-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_H} />
          </div>
          <div
            className={`${ROAD} left-[74%] top-[12%] h-[25%] w-2.5 -translate-x-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[37%] h-2.5 w-[48%] -translate-y-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_H} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[37%] h-[25%] w-2.5 -translate-x-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[62%] h-2.5 w-[48%] -translate-y-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_H} />
          </div>
          <div
            className={`${ROAD} left-[74%] top-[62%] h-[25%] w-2.5 -translate-x-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[87%] h-2.5 w-[48%] -translate-y-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_H} />
          </div>
          <div
            className={`${ROAD} left-[26%] top-[87%] h-[13%] w-2.5 -translate-x-1/2`}
            aria-hidden="true"
          >
            <div className={DASH_V} />
          </div>
          <div
            className="absolute right-[calc(26%-5px)] top-[12%] hidden size-10 -translate-y-[5px] rounded-tr-full border-r-[10px] border-t-[10px] border-primary-deep lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute left-[calc(26%-5px)] top-[37%] hidden size-10 -translate-y-[5px] rounded-tl-full border-l-[10px] border-t-[10px] border-primary-deep lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute right-[calc(26%-5px)] top-[62%] hidden size-10 -translate-y-[5px] rounded-tr-full border-r-[10px] border-t-[10px] border-primary-deep lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute left-[calc(26%-5px)] top-[87%] hidden size-10 -translate-y-[5px] rounded-tl-full border-l-[10px] border-t-[10px] border-primary-deep lg:block"
            aria-hidden="true"
          />
          <span
            className="absolute left-[26%] top-0 hidden size-3 -translate-x-1/2 rounded-full bg-accent lg:block"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 left-[26%] hidden size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-md ring-4 ring-paper lg:grid"
            aria-hidden="true"
          >
            <BadgeCheck className="size-4" />
          </span>

          {tahapKpr.map((t, i) => {
            const baris = BARIS[INDEKS_BARIS[i]];
            const kiri = SISI[i] === "L";
            const vars = {
              "--top": baris,
              "--left": kiri ? "0%" : "80%",
              "--lebar": "20%",
            } as CSSProperties;
            return (
              <>
                <span
                  key={`num-${t.nomor}`}
                  style={{ "--top": baris } as CSSProperties}
                  className={`absolute top-[var(--top)] z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-white shadow-md ring-4 ring-paper lg:grid ${
                    kiri ? "left-[26%]" : "left-[74%]"
                  }`}
                  aria-hidden="true"
                >
                  {t.nomor}
                  {t.nomor === 7 && (
                    <span
                      className="absolute -right-1.5 -top-1.5 rounded-full bg-accent p-1 text-white"
                      aria-hidden="true"
                    >
                      <BadgeCheck className="size-3" />
                    </span>
                  )}
                </span>
                <li
                  key={t.nomor}
                  style={vars}
                  className="relative pb-8 pl-14 last:pb-0 lg:absolute lg:top-[var(--top)] lg:left-[var(--left)] lg:w-[var(--lebar)] lg:-translate-y-1/2 lg:p-0"
                >
                  <span
                    className="absolute left-0 top-0 grid size-11 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-white ring-4 ring-paper lg:hidden"
                    aria-hidden="true"
                  >
                    {t.nomor}
                  </span>
                  <Link
                    href={`/panduan/${t.slug}`}
                    className="block rounded-2xl border border-line bg-surface p-4 shadow-sm transition hover:border-primary hover:shadow-md"
                  >
                    <h3 className="font-display text-[15px] font-semibold leading-snug line-clamp-2">
                      {t.judulSingkat}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft line-clamp-3">
                      {t.ringkasan}
                    </p>
                    <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink">
                      <Clock className="size-3" aria-hidden="true" />
                      {t.estimasiWaktu}
                    </p>
                  </Link>
                </li>
              </>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <Link href="/panduan" className={btnSecondary}>
            Baca detail semua tahap
          </Link>
        </div>
      </Container>
    </section>
  );
}
