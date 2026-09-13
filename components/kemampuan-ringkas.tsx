"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Info } from "lucide-react";
import { formatRupiah, formatAngkaId, parseNumberId, hargaMaksimalMampu } from "@/lib/finance";
import { inputCls, btnPrimary } from "./ui";

const DBR_PERSEN = 30;
const TENOR = 20;
const BUNGA = 5;
const DP = 1;

export function KemampuanRingkas() {
  const [raw, setRaw] = useState("8.000.000");

  const penghasilan = useMemo(() => parseNumberId(raw), [raw]);
  const hasil = useMemo(() => {
    if (!Number.isFinite(penghasilan) || penghasilan <= 0) return null;
    return hargaMaksimalMampu({
      penghasilanBulanan: penghasilan,
      cicilanLainBulanan: 0,
      dbrPersen: DBR_PERSEN,
      dpPersen: DP,
      tenorTahun: TENOR,
      bungaTahunanPersen: BUNGA,
    });
  }, [penghasilan]);

  return (
    <div className="rounded-3xl border border-line bg-surface p-7 shadow-xl shadow-stone-900/5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
        Berapa kemampuanmu?
      </p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
        Satu input dulu — penghasilanmu.
      </p>

      <label htmlFor="penghasilan-kemampuan" className="mt-6 block text-sm font-bold text-ink">
        Penghasilan bulanan bersih
      </label>
      <input
        id="penghasilan-kemampuan"
        type="text"
        inputMode="numeric"
        value={raw}
        onChange={(e) => setRaw(formatAngkaId(e.target.value))}
        className={`${inputCls} mt-2 text-xl font-semibold tabular-nums`}
        aria-describedby="asumsi-kemampuan"
      />

      <dl className="mt-6 divide-y divide-line border-y border-line">
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="text-sm text-ink-soft">Angsuran aman per bulan</dt>
          <dd className="font-display text-xl font-semibold tabular-nums text-primary">
            {hasil ? formatRupiah(hasil.angsuranMaksimal) : "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="text-sm text-ink-soft">Kisaran harga rumah (indikatif)</dt>
          <dd className="font-display text-xl font-semibold tabular-nums text-primary">
            {hasil ? formatRupiah(hasil.hargaMaksimal) : "—"}
          </dd>
        </div>
      </dl>

      <Link
        href="/kalkulator?mode=income"
        className={`${btnPrimary} mt-6 w-full`}
      >
        <Calculator className="size-4" aria-hidden="true" />
        Hitung penuh di kalkulator
      </Link>

      <p id="asumsi-kemampuan" className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-ink-soft">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Asumsi indikatif: angsuran maksimal {DBR_PERSEN}% penghasilan, FLPP 5% flat,
        tenor {TENOR} tahun, DP {DP}%. Sumber & tanggal cek di halaman kalkulator.
      </p>
    </div>
  );
}