"use client";

import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, Award, Landmark } from "lucide-react";
import Link from "next/link";
import type { BankRate } from "@/lib/types";
import { urutBank, bankTerendahKonvensional } from "@/lib/bank-banding";
import type { FilterBank, SortirBank } from "@/lib/bank-banding";
import { track } from "@/lib/analytics";
import { btnPrimary } from "./ui";

const judulFilter: Record<FilterBank, string> = {
  semua: "Semua skema",
  subsidi: "Subsidi (FLPP)",
  komersial: "Komersial",
};

export function BandingKanBank({
  banks,
  dariSeed = false,
  dicekSeed,
}: {
  banks: BankRate[];
  dariSeed?: boolean;
  dicekSeed?: string;
}) {
  const [filter, setFilter] = useState<FilterBank>("semua");
  const [sortir, setSortir] = useState<SortirBank>("bunga");

  const tampil = useMemo(() => {
    const sorted = urutBank(banks, filter, sortir);
    const terendah = bankTerendahKonvensional(sorted);
    return { sorted, terendah };
  }, [banks, filter, sortir]);

  function ubahFilter(f: FilterBank) {
    setFilter(f);
    track("calc_result_viewed", { tool: "bank-compare", filter: f });
  }

  const dicekTeks = dicekSeed
    ? new Date(dicekSeed).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "per kapan pun saat disinkronkan";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-4 shadow-sm sm:p-5">
        <div
          role="group"
          aria-label="Filter skema bank"
          className="flex flex-wrap gap-1.5"
        >
          {(["semua", "subsidi", "komersial"] as FilterBank[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => ubahFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "bg-paper text-ink-soft hover:text-ink"
              }`}
            >
              {judulFilter[f]}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm font-bold">
          <ArrowDownWideNarrow className="size-4 text-ink-soft" aria-hidden="true" />
          <span className="sr-only">Urutkan bank berdasarkan</span>
          <select
            value={sortir}
            onChange={(e) => setSortir(e.target.value as SortirBank)}
            className="rounded-xl border border-line bg-paper px-3 py-2 text-xs font-bold text-ink outline-none focus-visible:border-primary"
          >
            <option value="bunga">Bunga konvensional terendah</option>
            <option value="dp">DP minimum</option>
            <option value="nama">Nama bank</option>
          </select>
        </label>
      </div>

      <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-surface shadow-sm">
        {tampil.sorted.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-soft">
            Belum ada data bank untuk filter ini.
          </p>
        ) : (
          tampil.sorted.map((b) => (
            <div key={b.id} className="grid gap-4 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="flex flex-wrap items-center gap-2 font-bold">
                  <Landmark className="size-4 text-primary" aria-hidden="true" />
                  {b.bank_name}
                  {b.skema === "syariah" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                      Skema syariah
                    </span>
                  ) : tampil.terendah !== null && b.kpr_type === "komersial" &&
                    b.fixed_rate === tampil.terendah ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink">
                      <Award className="size-3.5" aria-hidden="true" />
                      Bunga terendah
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{b.notes}</p>
                {b.skema === "syariah" ? (
                  <p className="mt-1 text-xs text-ink-soft">
                    Margin tetap — tidak dibandingkan satu-ke-satu dengan
                    konvensional.
                  </p>
                ) : null}
                <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-soft">
                  <div className="flex gap-1.5">
                    <dt className="font-bold">Fixed:</dt>
                    <dd>{b.fixed_years} th</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-bold">DP min:</dt>
                    <dd>{b.min_dp_percent}%</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-bold">Tenor:</dt>
                    <dd>s.d. {b.max_tenor_years} th</dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                <p className="font-display text-2xl font-semibold tabular-nums text-primary">
                  {b.fixed_rate}%
                  {b.floating_rate ? (
                    <span className="text-sm text-ink-soft"> → {b.floating_rate}%</span>
                  ) : null}
                </p>
                <Link
                  href={`/kalkulator?dp=${Math.max(1, b.min_dp_percent)}`}
                  className="rounded-full border border-line px-4 py-1.5 text-xs font-bold text-ink transition hover:border-primary/40 hover:text-primary"
                >
                  Simulasikan
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {dariSeed ? (
        <div className="mt-6 rounded-2xl border border-accent/40 bg-accent-soft/60 p-4 text-sm text-ink-soft">
          <p className="font-bold text-accent-ink">Data contoh (seed)</p>
          <p className="mt-1">
            Angka di atas adalah contoh seed {dicekTeks} — bukan penawaran
            resmi bank. Hubungi bank untuk angka mutakhir & ketentuan yang
            berlaku.
          </p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 text-center sm:flex-row sm:text-left">
        <Landmark className="size-8 shrink-0 text-primary" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-display text-base font-semibold">
            Angka-angka di atas adalah indikasi pasar, bukan penawaran resmi.
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Suku bunga dan ketentuan berbeda antar wilayah, waktu, dan profil debitur.
            Bawa hasil kalkulator ke bank sebagai bahan negosiasi.
          </p>
        </div>
        <Link href="/kalkulator" className={btnPrimary}>
          Simulasikan
        </Link>
      </div>
    </div>
  );
}