"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Info, PiggyBank, Wallet } from "lucide-react";
import Link from "next/link";
import {
  bulanUntukMenabung,
  formatRupiah,
  tabunganBulananUntuk,
  parseNumberId,
} from "@/lib/finance";
import { track } from "@/lib/analytics";
import { btnPrimary, btnSecondary, inputCls } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";

type Mode = "lama" | "bulanan";

export function PlannerDp() {
  const [mode, setMode] = useState<Mode>("lama");
  const [harga, setHarga] = useState("300000000");
  const [dpPersen, setDpPersen] = useState(20);
  const [tabunganAwal, setTabunganAwal] = useState("0");
  const [setoranBulanan, setSetoranBulanan] = useState("2500000");
  const [jumlahBulan, setJumlahBulan] = useState("24");

  const hargaN = parseNumberId(harga);
  const tabunganAwalN = parseNumberId(tabunganAwal);
  const setoranBulananN = parseNumberId(setoranBulanan);
  const jumlahBulanN = parseNumberId(jumlahBulan, 0);

  const hasil = useMemo(() => {
    const targetDp = Math.round(hargaN * (dpPersen / 100));
    const data =
      mode === "lama"
        ? {
            bulan: bulanUntukMenabung(targetDp, tabunganAwalN, setoranBulananN),
            perBulan: setoranBulananN,
          }
        : {
            bulan: Math.max(0, jumlahBulanN),
            perBulan: tabunganBulananUntuk(targetDp, tabunganAwalN, jumlahBulanN),
          };
    return { targetDp, ...data };
  }, [mode, hargaN, dpPersen, tabunganAwalN, setoranBulananN, jumlahBulanN]);

  useEffect(() => {
    track("calc_result_viewed", { tool: "planner-dp" });
  }, [hasil.targetDp, mode]);

  const tercapai = hasil.bulan === 0;
  const tahun = Math.floor((hasil.bulan || 0) / 12);
  const sisaBulan = (hasil.bulan || 0) % 12;
  const durasiTeks =
    hasil.bulan === Infinity
      ? "tidak akan tercapai"
      : `${tahun} tahun ${sisaBulan} bulan`.trim().replace("0 tahun ", "").replace(" 0 bulan", "");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
        <h2 className="font-display text-lg font-semibold">Atur target DP-mu</h2>

        <div
          className="mt-5 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-paper p-1"
          role="group"
          aria-label="Mode planner DP"
        >
          <button
            type="button"
            onClick={() => setMode("lama")}
            aria-pressed={mode === "lama"}
            className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
              mode === "lama"
                ? "bg-primary text-white shadow-sm"
                : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            Berapa lama?
          </button>
          <button
            type="button"
            onClick={() => setMode("bulanan")}
            aria-pressed={mode === "bulanan"}
            className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
              mode === "bulanan"
                ? "bg-primary text-white shadow-sm"
                : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            Berapa sebulan?
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <label className="block">
            <span className="text-sm font-bold">Harga target rumah</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="number"
                min={0}
                step={5000000}
                name="harga-target"
                inputMode="numeric"
                aria-label="Harga target rumah dalam Rupiah"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="dp-planner" className="text-sm font-bold">Uang muka (DP)</label>
              <span className="font-semibold tabular-nums text-primary">{dpPersen}%</span>
            </div>
            <input
              id="dp-planner"
              type="range"
              min={0}
              max={30}
              step={1}
              value={dpPersen}
              onChange={(e) => setDpPersen(Number(e.target.value))}
              aria-valuetext={`${dpPersen} persen dari harga rumah`}
              className="mt-3 w-full"
            />
          </div>

          <label className="block">
            <span className="text-sm font-bold">Tabungan awal</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="number"
                min={0}
                step={500000}
                name="tabungan-awal"
                inputMode="numeric"
                aria-label="Tabungan awal dalam Rupiah"
                value={tabunganAwal}
                onChange={(e) => setTabunganAwal(e.target.value)}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          {mode === "lama" ? (
            <label className="block">
              <span className="text-sm font-bold">Setoran per bulan</span>
              <div className="mt-1.5 flex items-center">
                <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
                <input
                  type="number"
                  min={0}
                  step={100000}
                  name="setoran-bulanan"
                  inputMode="numeric"
                  aria-label="Setoran tabungan per bulan dalam Rupiah"
                  value={setoranBulanan}
                  onChange={(e) => setSetoranBulanan(e.target.value)}
                  className={`${inputCls} rounded-l-none`}
                />
              </div>
              <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                Berapa lama sampai DP terkumpul dengan setoran ini.
              </p>
            </label>
          ) : (
            <label className="block">
              <span className="text-sm font-bold">Target tercapai dalam</span>
              <div className="mt-1.5 flex items-center">
                <input
                  type="number"
                  min={1}
                  step={1}
                  name="jumlah-bulan"
                  inputMode="numeric"
                  aria-label="Jumlah bulan untuk mencapai target"
                  value={jumlahBulan}
                  onChange={(e) => setJumlahBulan(e.target.value)}
                  className={`${inputCls}`}
                />
                <span className="ml-2 text-sm font-bold text-ink-soft">bulan</span>
              </div>
              <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                Berapa setoran per bulan agar tercapai dalam waktu ini.
              </p>
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            {mode === "lama" ? "Perkiraan waktu mencapai DP" : "Setoran bulanan yang dibutuhkan"}
          </p>

          {mode === "lama" && !tercapai ? (
            <p
              className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold tabular-nums text-primary sm:text-4xl"
              aria-live="polite"
            >
              <CalendarDays className="size-7" aria-hidden="true" />
              {hasil.bulan === Infinity ? "Tidak tercapai" : durasiTeks}
            </p>
          ) : (
            <p
              className="mt-2 font-display text-3xl font-semibold tabular-nums text-primary sm:text-4xl"
              aria-live="polite"
            >
              {tercapai ? "Sudah tercapai" : `${formatRupiah(hasil.perBulan)}/bln`}
            </p>
          )}

          {tercapai ? (
            <p className="mt-3 flex items-start gap-2 rounded-2xl bg-primary-soft/60 p-4 text-xs leading-relaxed text-ink-soft">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              Tabungan awalmu sudah mencukupi DP — bisa langsung lanjut ke simulasi angsuran.
            </p>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">
              Target DP <span className="font-bold tabular-nums text-ink">{formatRupiah(hasil.targetDp)}</span>{" "}
              ({dpPersen}% dari harga target).{" "}
              {mode === "lama" && hasil.bulan !== Infinity
                ? `Kurang ${durasiTeks} dari setoran ${formatRupiah(hasil.perBulan)}/bulan.`
                : mode === "bulanan"
                  ? `Setor ${formatRupiah(hasil.perBulan)}/bulan selama ${jumlahBulanN} bulan.`
                  : "Setor minimal Rp1/bulan agar ada pergerakan."}
            </p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-ink-soft">Harga target</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(hargaN)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Tabungan awal</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{formatRupiah(tabunganAwalN)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
            Belum termasuk inflasi nilai rumah dan hasil tabungan. Angka ini estimasi sederhana
            untuk perencanaan; sisihkan dana tambahan untuk biaya awal lain di samping DP.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary-soft/60 p-6">
          <p className="flex items-center gap-2 font-display text-base font-semibold text-primary-deep">
            <PiggyBank className="size-5" aria-hidden="true" />
            Dari DP, lanjut merencanakan
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <Link href="/kalkulator" className={btnPrimary}>
              <Wallet className="size-4" aria-hidden="true" />
              Hitung angsuran
            </Link>
            <Link href="/mampu-beli" className={btnSecondary}>
              Cek kemampuan beli
            </Link>
          </div>
          <div className="mt-3">
            <WhatsAppButton
              source="planner-dp"
              label="Tanya tentang target DP"
              pesan={`Halo, saya pakai planner DP di AlurKPR: target harga ${formatRupiah(hargaN)}, DP ${dpPersen}%. Saya ingin konsultasi lanjutan.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
