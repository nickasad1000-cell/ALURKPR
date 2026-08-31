"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Info, Wallet } from "lucide-react";
import Link from "next/link";
import { hargaMaksimalMampu, formatRupiah, angsuranBulanan } from "@/lib/finance";
import { track } from "@/lib/analytics";
import { btnPrimary, btnSecondary, inputCls } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";

export function MampuBeli() {
  const [penghasilan, setPenghasilan] = useState("8000000");
  const [cicilan, setCicilan] = useState("0");
  const [dbr, setDbr] = useState(30);
  const [dp, setDp] = useState(10);
  const [tenor, setTenor] = useState(20);
  const [bunga, setBunga] = useState(5);

  const hasil = useMemo(() => {
    const r = hargaMaksimalMampu({
      penghasilanBulanan: Number(penghasilan) || 0,
      cicilanLainBulanan: Number(cicilan) || 0,
      dbrPersen: dbr,
      dpPersen: dp,
      tenorTahun: tenor,
      bungaTahunanPersen: bunga,
    });
    track("calc_result_viewed", { tool: "mampu-beli" });
    return r;
  }, [penghasilan, cicilan, dbr, dp, tenor, bunga]);

  const danaAwal = Math.round((hasil.hargaMaksimal * dp) / 100);
  const angsuranAktual = angsuranBulanan(hasil.plafonMaksimal, bunga, tenor);
  const bersih = Math.max(0, (Number(penghasilan) || 0) - (Number(cicilan) || 0));
  const diBawahBatasKetat = bersih > 0 && angsuranAktual / bersih <= 0.3;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Panel input */}
      <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
        <h2 className="font-display text-lg font-semibold">Isi kemampuan finansialmu</h2>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-bold">Penghasilan pokok / bulan</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="number"
                min={0}
                step={500000}
                name="penghasilan"
                inputMode="numeric"
                aria-label="Penghasilan pokok per bulan dalam Rupiah"
                value={penghasilan}
                onChange={(e) => setPenghasilan(e.target.value)}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-bold">Cicilan lain / bulan (opsional)</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="number"
                min={0}
                step={100000}
                name="cicilan-lain"
                inputMode="numeric"
                aria-label="Cicilan lain per bulan dalam Rupiah"
                value={cicilan}
                onChange={(e) => setCicilan(e.target.value)}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="dbr" className="text-sm font-bold">Rasio angsuran (DBR)</label>
              <span className="font-semibold tabular-nums text-primary">{dbr}%</span>
            </div>
            <input
              id="dbr"
              type="range"
              min={20}
              max={40}
              step={1}
              value={dbr}
              onChange={(e) => setDbr(Number(e.target.value))}
              aria-valuetext={`${dbr} persen dari penghasilan bersih`}
              className="mt-3 w-full"
            />
            <p className="mt-1 text-[11px] font-semibold text-ink-soft">
              Bank umumnya membatasi maksimal 30%. Angka lebih tinggi hanya untuk edukasi.
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="dp" className="text-sm font-bold">Uang muka (DP)</label>
              <span className="font-semibold tabular-nums text-primary">{dp}%</span>
            </div>
            <input
              id="dp"
              type="range"
              min={0}
              max={30}
              step={1}
              value={dp}
              onChange={(e) => setDp(Number(e.target.value))}
              aria-valuetext={`${dp} persen dari harga rumah`}
              className="mt-3 w-full"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="tenor" className="text-sm font-bold">Tenor</label>
              <span className="font-semibold tabular-nums text-primary">{tenor} tahun</span>
            </div>
            <input
              id="tenor"
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenor}
              onChange={(e) => setTenor(Number(e.target.value))}
              aria-valuetext={`${tenor} tahun`}
              className="mt-3 w-full"
            />
          </div>

          <label className="block">
            <span className="text-sm font-bold">Estimasi bunga / tahun</span>
            <div className="mt-1.5 flex items-center">
              <input
                type="number"
                min={1}
                step={0.25}
                name="bunga"
                inputMode="decimal"
                aria-label="Estimasi bunga per tahun dalam persen"
                value={bunga}
                onChange={(e) => setBunga(Number(e.target.value))}
                className={`${inputCls}`}
              />
              <span className="ml-2 text-sm font-bold text-ink-soft">%</span>
            </div>
          </label>
        </div>
      </div>

      {/* Panel hasil */}
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Perkiraan harga rumah yang mampu
            </p>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
              Angsuran maks {formatRupiah(hasil.angsuranMaksimal)}/bln
            </span>
          </div>
          <p className="mt-2 font-display text-4xl font-semibold tabular-nums text-primary sm:text-5xl" aria-live="polite">
            {formatRupiah(hasil.hargaMaksimal)}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Plafon pinjaman ±{" "}
            <span className="font-bold tabular-nums text-ink">{formatRupiah(hasil.plafonMaksimal)}</span>
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-ink-soft">Dana awal DP ({dp}%)</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(danaAwal)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Tenor</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{tenor} tahun</dd>
            </div>
          </dl>

          {diBawahBatasKetat ? (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-soft/60 p-4 text-xs leading-relaxed text-ink-soft">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              Angsuran KPR masih di bawah batas rasio ketat 30% — ruang yang nyaman.
            </p>
          ) : (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-accent-soft/60 p-4 text-xs leading-relaxed text-ink-soft">
              <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
              Angsuran mendekati batas rasio bank — perusahaan keuangan bisa menolak bila
              beban cicilan sudah &ldquo;merah&rdquo;. Siapkan DP lebih besar atau berkonsultasi lebih dulu.
            </p>
          )}
        </div>

        <div className="rounded-3xl bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
            Angka bersifat indikatif untuk edukasi. DBR, bunga, LTV, dan kebijakan bank
            menentukan persis bagaimana pengajuanmu disetujui.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary-soft/60 p-6">
          <p className="font-display text-base font-semibold text-primary-deep">
            Tahu kisaran ini? Cek apakah ada unit yang cocok.
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <Link href="/kalkulator" className={btnPrimary}>
              <Wallet className="size-4" aria-hidden="true" />
              Simulasikan angsuran
            </Link>
            <Link href="/profil-kamu" className={btnSecondary}>
              Dapatkan rekomendasi
            </Link>
          </div>
          <div className="mt-3">
            <WhatsAppButton
              source="mampu-beli"
              label="Tanya unit di kisaran ini"
              pesan={`Halo, saya cek kemampuan beli di AlurKPR: perkiraan harga maksimal ${formatRupiah(hasil.hargaMaksimal)}, DP ${dp}%, tenor ${tenor} th. Saya ingin konsultasi lanjutan.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
