"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import type { BankRate } from "@/lib/types";
import {
  angsuranBulanan,
  biayaAwal,
  formatRupiah,
  jadwalAmortisasi,
  plafondMaksimal,
  totalPembayaran,
} from "@/lib/finance";
import { track } from "@/lib/analytics";
import { btnSecondary } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";

const btnSecondaryClass = btnSecondary;

type PilihanBank = {
  id: string;
  label: string;
  kprType: BankRate["kpr_type"];
  fixedRate: number;
  fixedYears: number;
  floatingRate: number | null;
  maxTenor: number;
  minDp: number;
};

function buatPilihan(rates: BankRate[]): PilihanBank[] {
  const flpp: PilihanBank = {
    id: "flpp",
    label: "FLPP · KPR Subsidi — 5% flat · 20 tahun",
    kprType: "subsidi",
    fixedRate: 5,
    fixedYears: 20,
    floatingRate: null,
    maxTenor: 20,
    minDp: 1,
  };
  const komersial = rates.map((r) => ({
    id: r.id,
    label: `${r.bank_name} — ${r.fixed_rate}% (${r.fixed_years} th)${r.floating_rate ? ` → ${r.floating_rate}%` : ""}`,
    kprType: r.kpr_type,
    fixedRate: r.fixed_rate,
    fixedYears: r.fixed_years,
    floatingRate: r.floating_rate,
    maxTenor: r.max_tenor_years,
    minDp: r.min_dp_percent,
  }));
  return [flpp, ...komersial];
}

const DP_PRESETS = [0, 1, 5, 10, 15, 20, 25, 30];

export function Kalkulator({ rates }: { rates: BankRate[] }) {
  const pilihan = useMemo(() => buatPilihan(rates), [rates]);
  const [harga, setHarga] = useState(240_000_000);
  const [dpPct, setDpPct] = useState(10);
  const [tenor, setTenor] = useState(20);
  const [bankId, setBankId] = useState(pilihan[0].id);
  const [lihatBiaya, setLihatBiaya] = useState(false);
  const [lihatAmortisasi, setLihatAmortisasi] = useState(false);

  const bank = pilihan.find((b) => b.id === bankId) ?? pilihan[0];
  const tenorEfektif = Math.min(tenor, bank.maxTenor);
  const tenorTerpotong = tenorEfektif !== tenor;
  const dpTerlaluKecil = dpPct < bank.minDp;

  const hasil = useMemo(() => {
    const plafon = plafondMaksimal(harga, dpPct);
    const angsuran = angsuranBulanan(plafon, bank.fixedRate, tenorEfektif);
    const angsuranFloating = bank.floatingRate
      ? angsuranBulanan(plafon, bank.floatingRate, tenorEfektif)
      : null;
    const total = totalPembayaran(plafon, bank.fixedRate, tenorEfektif);
    const bunga = total - plafon;
    const biaya = biayaAwal(harga, dpPct);
    return { plafon, angsuran, angsuranFloating, total, bunga, biaya };
  }, [harga, dpPct, tenorEfektif, bank.fixedRate, bank.floatingRate]);

  const tabel = useMemo(() => {
    if (!lihatAmortisasi) return null;
    const rows = jadwalAmortisasi(hasil.plafon, bank.fixedRate, tenorEfektif);
    return [...rows.slice(0, 12), ...rows.slice(-12)];
  }, [lihatAmortisasi, hasil.plafon, bank.fixedRate, tenorEfektif]);

  useEffect(() => {
    track("calc_result_viewed", { bank: bank.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Panel input */}
      <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
        <h2 className="font-display text-lg font-semibold">Atur kebutuhanmu</h2>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="harga" className="text-sm font-bold">
              Harga rumah
            </label>
            <span className="font-semibold tabular-nums text-primary">
              {formatRupiah(harga)}
            </span>
          </div>
          <input
            id="harga"
            type="range"
            min={50_000_000}
            max={1_000_000_000}
            step={1_000_000}
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
            aria-valuetext={formatRupiah(harga)}
            className="mt-3 w-full"
          />
          <div className="mt-1 flex justify-between text-[11px] font-semibold text-ink-soft">
            <span>Rp50 jt</span>
            <span>Rp1 M</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="dp" className="text-sm font-bold">
              Uang muka (DP)
            </label>
            <span className="font-semibold tabular-nums text-primary">{dpPct}%</span>
          </div>
          <input
            id="dp"
            type="range"
            min={0}
            max={50}
            step={1}
            value={dpPct}
            onChange={(e) => setDpPct(Number(e.target.value))}
            aria-valuetext={`${dpPct} persen dari harga rumah`}
            className="mt-3 w-full"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DP_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDpPct(p)}
                className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                  dpPct === p
                    ? "border-primary bg-primary-soft text-primary-deep"
                    : "border-line text-ink-soft hover:border-primary/40"
                }`}
                aria-pressed={dpPct === p}
              >
                {p}%
              </button>
            ))}
          </div>
          {dpTerlaluKecil ? (
            <p className="mt-2 text-xs font-semibold text-accent">
              DP minimum skema ini {bank.minDp}% — angka di bawah hanya untuk edukasi.
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="tenor" className="text-sm font-bold">
              Tenor
            </label>
            <span className="font-semibold tabular-nums text-primary">
              {tenorEfektif} tahun
            </span>
          </div>
          <input
            id="tenor"
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenor}
            onChange={(e) => setTenor(Number(e.target.value))}
            aria-valuetext={`${tenorEfektif} tahun`}
            className="mt-3 w-full"
          />
          {tenorTerpotong ? (
            <p className="mt-2 text-xs font-semibold text-accent">
              Skema ini maksimal {bank.maxTenor} tahun.
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <label htmlFor="bank" className="text-sm font-bold">
            Skema / bank
          </label>
          <select
            id="bank"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {pilihan.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            {bank.floatingRate
              ? `Fixed ${bank.fixedYears} tahun pertama ${bank.fixedRate}%, lalu floating ±${bank.floatingRate}%.`
              : `Bunga flat ${bank.fixedRate}% sepanjang ${bank.fixedYears} tahun masa skema.`}{" "}
            Bunga & syarat bersifat indikatif.
          </p>
        </div>
      </div>

      {/* Panel hasil */}
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Angsuran bulanan
            </p>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
              Plafon {formatRupiah(hasil.plafon)}
            </span>
          </div>
          <p className="mt-2 font-display text-4xl font-semibold tabular-nums text-primary sm:text-5xl" aria-live="polite">
            {formatRupiah(hasil.angsuran)}
          </p>
          {hasil.angsuranFloating ? (
            <p className="mt-2 text-sm text-ink-soft">
              Perkiraan setelah masa fixed:{" "}
              <span className="font-bold tabular-nums text-ink">
                {formatRupiah(hasil.angsuranFloating)}
              </span>{" "}
              /bulan
            </p>
          ) : null}

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-ink-soft">Total bayar ({tenorEfektif} th)</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(hasil.total)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Bunga total</dt>
              <dd className="mt-0.5 font-bold tabular-nums text-accent">{formatRupiah(hasil.bunga)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Uang muka</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(hasil.biaya.dp)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Perkiraan dana awal</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(hasil.biaya.total)}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setLihatBiaya((v) => !v)}
            className="mt-5 flex w-full items-center justify-between rounded-2xl border border-line px-5 py-3.5 text-sm font-bold transition hover:border-primary/40"
            aria-expanded={lihatBiaya}
          >
            Rincian biaya awal
            <span aria-hidden="true">{lihatBiaya ? "−" : "+"}</span>
          </button>
          {lihatBiaya ? (
            <ul className="mt-3 space-y-2 rounded-2xl bg-paper p-5 text-sm">
              {[
                ["Uang muka", hasil.biaya.dp],
                ["Provisi (1% plafon)", hasil.biaya.provisi],
                ["Administrasi bank (indikatif)", hasil.biaya.admin],
                ["BPHTB", hasil.biaya.bphtb],
                ["Notaris / PPAT & balik nama (indikatif)", hasil.biaya.notaris],
                ["Asuransi jiwa + kebakaran (indikatif)", hasil.biaya.asuransi],
              ].map(([label, nilai]) => (
                <li key={label as string} className="flex items-center justify-between gap-4">
                  <span className="text-ink-soft">{label}</span>
                  <span className="font-semibold tabular-nums">{formatRupiah(nilai as number)}</span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4 border-t border-line pt-2 font-bold">
                <span>Total dana awal</span>
                <span className="tabular-nums">{formatRupiah(hasil.biaya.total)}</span>
              </li>
            </ul>
          ) : null}

          <button
            type="button"
            onClick={() => setLihatAmortisasi((v) => !v)}
            className="mt-3 flex w-full items-center justify-between rounded-2xl border border-line px-5 py-3.5 text-sm font-bold transition hover:border-primary/40"
            aria-expanded={lihatAmortisasi}
          >
            Ringkasan jadwal angsuran
            <span aria-hidden="true">{lihatAmortisasi ? "−" : "+"}</span>
          </button>
          {tabel ? (
            <div className="mt-3 max-h-96 overflow-auto rounded-2xl border border-line" role="region" aria-label="Jadwal angsuran">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Ringkasan jadwal angsuran 12 bulan pertama dan 12 bulan terakhir
                </caption>
                <thead className="sticky top-0 bg-paper text-xs font-bold uppercase tracking-wider text-ink-soft">
                  <tr>
                    <th scope="col" className="px-4 py-3">Bulan</th>
                    <th scope="col" className="px-4 py-3 text-right">Angsuran</th>
                    <th scope="col" className="px-4 py-3 text-right">Pokok</th>
                    <th scope="col" className="px-4 py-3 text-right">Bunga</th>
                    <th scope="col" className="px-4 py-3 text-right">Sisa</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {tabel.map((r) => (
                    <tr key={r.bulan} className="border-t border-line">
                      <td className="px-4 py-2.5 font-semibold tabular-nums">{r.bulan}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{formatRupiah(r.angsuran)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{formatRupiah(r.pokok)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{formatRupiah(r.bunga)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{formatRupiah(r.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
          Simulasi memakai metode anuitas murni dan tarif biaya indikatif pasar.
          Nilai aktual (bunga, LTV, provisi, asuransi, bebannya) ditetapkan bank
          saat akad — jadikan ini acuan awal untuk bernegosiasi, bukan janji
          final.
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary-soft/60 p-6">
          <p className="font-display text-base font-semibold text-primary-deep">
            Sudah paham angsuranmu? Lanjutkan supaya tidak mentok.
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <Link href="/syarat" className={btnSecondaryClass}>
              Cek kelayakan FLPP
            </Link>
            <WhatsAppButton
              source="kalkulator"
              pesan={`Halo Syahfalah Group, saya sudah menghitung simulasi KPR di AlurKPR: harga ${formatRupiah(harga)}, DP ${dpPct}%, tenor ${tenorEfektif} th, perkiraan angsuran ${formatRupiah(hasil.angsuran)}/bln. Saya ingin konsultasi lanjutan.`}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Konsultasi gratis seputar skema, plafon, dan unit rumah di area
            Lumajang.
          </p>
        </div>
      </div>
    </div>
  );
}