"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { BankRate } from "@/lib/types";
import {
  angsuranBulanan,
  biayaAwal,
  formatAngkaId,
  formatRupiah,
  hargaMaksimalMampu,
  jadwalAmortisasi,
  parseNumberId,
  plafondMaksimal,
  totalPembayaranBertahap,
} from "@/lib/finance";
import { track } from "@/lib/analytics";
import { btnSecondary, inputCls } from "./ui";
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

const HARGA_MIN = 50_000_000;
const HARGA_MAX = 1_000_000_000;
const HARGA_STEP = 1_000_000;
const DP_MIN = 0;
const DP_MAX = 50;
const TENOR_MIN = 5;
const TENOR_MAX = 30;

function clampInt(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function KalkulatorWithDp({ rates }: { rates: BankRate[] }) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("dp");
  // Gunakan has !== null agar ?dp=0 tetap dihormati (0 adalah DP yang sah).
  const parsed = raw !== null ? Number(raw) : NaN;
  const initialDp = Number.isFinite(parsed) ? Math.min(50, Math.max(0, parsed)) : 10;
  return <Kalkulator rates={rates} initialDp={initialDp} />;
}

export function Kalkulator({
  rates,
  initialDp = 10,
}: {
  rates: BankRate[];
  initialDp?: number;
}) {
  const pilihan = useMemo(() => buatPilihan(rates), [rates]);
  const [harga, setHarga] = useState(240_000_000);
  const [draftHarga, setDraftHarga] = useState("240.000.000");
  const [dpPct, setDpPct] = useState(initialDp);
  const [draftDp, setDraftDp] = useState(String(initialDp));
  const [tenor, setTenor] = useState(20);
  const [draftTenor, setDraftTenor] = useState("20");
  const [bankId, setBankId] = useState(pilihan[0].id);
  const [lihatBiaya, setLihatBiaya] = useState(false);
  const [lihatAmortisasi, setLihatAmortisasi] = useState(false);
  const [mode, setMode] = useState<"harga" | "penghasilan">("harga");
  const [penghasilan, setPenghasilan] = useState("8000000");
  const [cicilanLain, setCicilanLain] = useState("0");
  const [dbr, setDbr] = useState(30);

  const syncHarga = (raw: string) => {
    const terformat = formatAngkaId(raw);
    setDraftHarga(terformat);
    const n = parseNumberId(terformat);
    if (!terformat || !Number.isFinite(n)) return;
    setHarga(n);
  };

  const selesaiHarga = () => setDraftHarga(harga.toLocaleString("id-ID"));

  const syncDp = (raw: string) => {
    setDraftDp(raw);
    const n = parseNumberId(raw);
    if (raw.trim() === "" || !Number.isFinite(n)) return;
    setDpPct(clampInt(n, DP_MIN, DP_MAX));
  };

  const selesaiDp = () => setDraftDp(String(dpPct));

  const syncTenor = (raw: string) => {
    setDraftTenor(raw);
    const n = parseNumberId(raw);
    if (raw.trim() === "" || !Number.isFinite(n)) return;
    setTenor(clampInt(n, TENOR_MIN, TENOR_MAX));
  };

  const selesaiTenor = () => setDraftTenor(String(tenor));

  const formatBlurRupiah = (
    setter: (v: string) => void,
    raw: string,
  ) => {
    const n = parseNumberId(raw);
    setter(Number.isFinite(n) ? n.toLocaleString("id-ID") : "");
  };

  const bank = pilihan.find((b) => b.id === bankId) ?? pilihan[0];
  const tenorEfektif = Math.min(tenor, bank.maxTenor);
  const tenorTerpotong = tenorEfektif !== tenor;
  const dpEfektif = Math.max(dpPct, bank.minDp);
  const dpNaikkan = dpEfektif !== dpPct;

  const hargaDariPenghasilan = useMemo(() => {
    if (mode !== "penghasilan") return null;
    const penghasilanN = parseNumberId(penghasilan);
    const cicilanN = parseNumberId(cicilanLain);
    if (!Number.isFinite(penghasilanN) || penghasilanN <= 0) return 0;
    const h = hargaMaksimalMampu({
      penghasilanBulanan: penghasilanN,
      cicilanLainBulanan: Number.isFinite(cicilanN) ? cicilanN : 0,
      dbrPersen: dbr,
      dpPersen: dpEfektif,
      tenorTahun: tenorEfektif,
      bungaTahunanPersen: bank.fixedRate,
    });
    if (!Number.isFinite(h.hargaMaksimal) || h.hargaMaksimal <= 0) return 0;
    return h.hargaMaksimal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, penghasilan, cicilanLain, dbr, dpEfektif, tenorEfektif, bank.id]);

  const hargaEfektif =
    mode === "penghasilan" ? (hargaDariPenghasilan ?? 0) : harga;

  const hasil = useMemo(() => {
    const plafon = plafondMaksimal(hargaEfektif, dpEfektif);
    const angsuran = angsuranBulanan(plafon, bank.fixedRate, tenorEfektif);
    // Skema bertingkat: masa fixed di atas plafon awal, lalu sisa pokok
    // dijadwalkan ulang pada bunga floating atas sisa tenor (praktik bank).
    const bertahap = totalPembayaranBertahap(
      plafon,
      bank.fixedRate,
      bank.floatingRate,
      tenorEfektif,
      bank.fixedYears,
    );
    const angsuranFloating = bertahap.angsuranFloating;
    const total = bertahap.total;
    const bunga = bertahap.bunga;
    const biaya = biayaAwal(hargaEfektif, dpEfektif);
    return { plafon, angsuran, angsuranFloating, total, bunga, biaya };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hargaEfektif, dpEfektif, tenorEfektif, bank.id]);

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

        <div
          className="mt-5 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-paper p-1"
          role="group"
          aria-label="Mode kalkulator"
        >
          <button
            type="button"
            onClick={() => setMode("harga")}
            aria-pressed={mode === "harga"}
            className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
              mode === "harga"
                ? "bg-primary text-white shadow-sm"
                : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            Dari harga
          </button>
          <button
            type="button"
            onClick={() => setMode("penghasilan")}
            aria-pressed={mode === "penghasilan"}
            className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
              mode === "penghasilan"
                ? "bg-primary text-white shadow-sm"
                : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            Dari penghasilan
          </button>
        </div>

        {mode === "harga" ? (
          <div className="mt-6">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="harga" className="text-sm font-bold">
              Harga rumah
            </label>
            <span className="inline-flex items-center gap-1">
              <span className="text-xs font-bold text-ink-soft" aria-hidden="true">
                Rp
              </span>
              <input
                id="harga"
                type="text"
                inputMode="numeric"
                aria-label="Harga rumah dalam rupiah — bisa diketik langsung"
                value={draftHarga}
                onChange={(e) => syncHarga(e.target.value)}
                onBlur={selesaiHarga}
                onFocus={(e) => e.target.select()}
                className="w-28 rounded-lg border border-line bg-white px-2.5 py-1.5 text-right text-sm font-bold tabular-nums text-primary transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-32"
              />
            </span>
          </div>
          <input
            type="range"
            min={HARGA_MIN}
            max={HARGA_MAX}
            step={HARGA_STEP}
            value={harga}
            onChange={(e) => {
              const n = Number(e.target.value);
              setHarga(n);
              setDraftHarga(n.toLocaleString("id-ID"));
            }}
            aria-label="Harga rumah dalam rupiah (geser slider)"
            aria-valuetext={formatRupiah(harga)}
            className="mt-3 w-full"
          />
          <div className="mt-1 flex justify-between text-[11px] font-semibold text-ink-soft">
            <span>Rp50 jt</span>
            <span>Rp1 M</span>
          </div>
        </div>
        ) : (
          <div className="mt-6 space-y-5">
            <p className="rounded-xl bg-primary-soft/60 px-4 py-3 text-xs leading-relaxed text-ink-soft">
              Harga rumah diturunkan dari penghasilan, DP, tenor, dan skema yang
              kamu pilih. Penghasilan lebih tinggi atau DP lebih besar = harga
              yang mampu lebih tinggi.
            </p>

            <label className="block">
              <span className="text-sm font-bold">Penghasilan / bulan</span>
              <span className="mt-2 flex items-center">
                <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  name="penghasilan"
                  aria-label="Penghasilan per bulan dalam Rupiah"
                  value={penghasilan}
                  onChange={(e) => setPenghasilan(formatAngkaId(e.target.value))}
                  onBlur={() => formatBlurRupiah(setPenghasilan, penghasilan)}
                  onFocus={(e) => e.target.select()}
                  className={`${inputCls} rounded-l-none`}
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-bold">
                Cicilan lain / bulan{" "}
                <span className="font-normal text-ink-soft">(opsional)</span>
              </span>
              <span className="mt-2 flex items-center">
                <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  name="cicilan-lain"
                  aria-label="Cicilan lain per bulan dalam Rupiah"
                  value={cicilanLain}
                  onChange={(e) => setCicilanLain(formatAngkaId(e.target.value))}
                  onBlur={() => formatBlurRupiah(setCicilanLain, cicilanLain)}
                  onFocus={(e) => e.target.select()}
                  className={`${inputCls} rounded-l-none`}
                />
              </span>
            </label>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="dbr" className="text-sm font-bold">
                  Rasio angsuran (DBR)
                </label>
                <span className="font-semibold tabular-nums text-primary">
                  {dbr}%
                </span>
              </div>
              <input
                id="dbr"
                type="range"
                min={20}
                max={40}
                step={1}
                value={dbr}
                onChange={(e) => setDbr(Number(e.target.value))}
                aria-label="Rasio angsuran maksimal dari penghasilan bersih (geser slider)"
                aria-valuetext={`${dbr} persen`}
                className="mt-3 w-full"
              />
              <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                Bank umumnya membatasi maksimal 30%. Angka di atasnya hanya untuk
                edukasi.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="dp" className="text-sm font-bold">
              Uang muka (DP)
            </label>
            <span className="inline-flex items-center gap-1">
              <input
                id="dp"
                type="text"
                inputMode="numeric"
                aria-label="Uang muka dalam persen — bisa diketik langsung"
                value={draftDp}
                onChange={(e) => syncDp(e.target.value)}
                onBlur={selesaiDp}
                onFocus={(e) => e.target.select()}
                className="w-16 rounded-lg border border-line bg-white px-2.5 py-1.5 text-right text-sm font-bold tabular-nums text-primary transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-xs font-bold text-ink-soft" aria-hidden="true">
                %
              </span>
            </span>
          </div>
          <input
            id="dp-slider"
            type="range"
            min={DP_MIN}
            max={DP_MAX}
            step={1}
            value={dpPct}
            onChange={(e) => {
              const n = Number(e.target.value);
              setDpPct(n);
              setDraftDp(String(n));
            }}
            aria-label="Uang muka dalam persen (geser slider)"
            aria-valuetext={`${dpPct} persen dari harga rumah`}
            className="mt-3 w-full"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DP_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setDpPct(p);
                  setDraftDp(String(p));
                }}
                className={`inline-flex min-h-10 items-center rounded-full border px-3 py-1 text-xs font-bold transition ${
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
          {dpNaikkan ? (
            <p className="mt-2 text-xs font-semibold text-accent-ink">
              DP minimum skema ini {bank.minDp}% — dihitung pakai {dpEfektif}%.
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="tenor" className="text-sm font-bold">
              Tenor
            </label>
            <span className="inline-flex items-center gap-1">
              <input
                id="tenor"
                type="text"
                inputMode="numeric"
                aria-label="Tenor dalam tahun — bisa diketik langsung"
                value={draftTenor}
                onChange={(e) => syncTenor(e.target.value)}
                onBlur={selesaiTenor}
                onFocus={(e) => e.target.select()}
                className="w-16 rounded-lg border border-line bg-white px-2.5 py-1.5 text-right text-sm font-bold tabular-nums text-primary transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-xs font-bold text-ink-soft" aria-hidden="true">
                tahun
              </span>
            </span>
          </div>
          <input
            id="tenor-slider"
            type="range"
            min={TENOR_MIN}
            max={TENOR_MAX}
            step={1}
            value={tenor}
            onChange={(e) => {
              const n = Number(e.target.value);
              setTenor(n);
              setDraftTenor(String(n));
            }}
            aria-label="Tenor dalam tahun (geser slider)"
            aria-valuetext={`${tenorEfektif} tahun`}
            className="mt-3 w-full"
          />
          <div className="mt-1 flex justify-between text-[11px] font-semibold text-ink-soft">
            <span>5 th</span>
            <span>30 th</span>
          </div>
          {tenorTerpotong ? (
            <p className="mt-2 text-xs font-semibold text-accent-ink">
              Skema ini maksimal {bank.maxTenor} tahun — dihitung pakai {tenorEfektif} tahun.
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
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
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
          {mode === "penghasilan" ? (
            <p className="mt-3 rounded-xl border border-primary/25 bg-primary-soft/40 px-4 py-2 text-xs leading-relaxed text-primary-deep">
              Angka di bawah dihitung dari harga yang mampu berdasarkan
              penghasilanmu: <span className="font-bold tabular-nums">{formatRupiah(hargaEfektif)}</span>.
            </p>
          ) : null}
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
              <dd className="mt-0.5 font-bold tabular-nums text-accent-ink">{formatRupiah(hasil.bunga)}</dd>
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
            aria-controls="rincian-biaya-awal"
          >
            Rincian biaya awal
            <span aria-hidden="true">{lihatBiaya ? "−" : "+"}</span>
          </button>
          {lihatBiaya ? (
            <ul id="rincian-biaya-awal" className="mt-3 space-y-2 rounded-2xl bg-paper p-5 text-sm">
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
            aria-controls="jadwal-angsuran"
          >
            Ringkasan jadwal angsuran
            <span aria-hidden="true">{lihatAmortisasi ? "−" : "+"}</span>
          </button>
          {tabel ? (
            <div id="jadwal-angsuran" className="mt-3 max-h-96 overflow-auto rounded-2xl border border-line" role="region" aria-label="Jadwal angsuran">
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
              pesan={`Halo, saya sudah menghitung simulasi KPR di AlurKPR: harga ${formatRupiah(hargaEfektif)}, DP ${dpPct}%, tenor ${tenorEfektif} th, perkiraan angsuran ${formatRupiah(hasil.angsuran)}/bln. Saya ingin konsultasi lanjutan.`}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Konsultasi gratis seputar skema, plafon, dan langkah pengajuan.{" "}
            {mode === "harga" ? (
              <>
                Belum tahu kisaran kemampuannya?{" "}
                <Link href="/mampu-beli" className="font-bold text-primary hover:text-primary-deep">
                  Cek dulu kemampuan beli
                </Link>
                .
              </>
            ) : (
              <>
                Mau lihat perhitungan kemampuan yang lebih lengkap?{" "}
                <Link href="/mampu-beli" className="font-bold text-primary hover:text-primary-deep">
                  Buka halaman Kemampuan beli
                </Link>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}