"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, Info, Scale, Wallet } from "lucide-react";
import Link from "next/link";
import {
  angsuranBulanan,
  biayaAwal,
  biayaBeliKumulatif,
  biayaSewaKumulatif,
  formatAngkaId,
  formatRupiah,
  tahunImpas,
  parseNumberId,
} from "@/lib/finance";
import { track } from "@/lib/analytics";
import { btnPrimary, btnSecondary, inputCls } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";

const TAHUN_TITIK = [1, 5, 10, 15, 20, 25, 30];

export function RentVsBeli() {
  const [harga, setHarga] = useState("300.000.000");
  const [dp, setDp] = useState(20);
  const [bunga, setBunga] = useState(5);
  const [tenor, setTenor] = useState(20);
  const [sewa, setSewa] = useState("1.500.000");
  const [kenaikan, setKenaikan] = useState(5);

  const hargaN = parseNumberId(harga);
  const sewaN = parseNumberId(sewa);

  const hasil = useMemo(() => {
    const awal = biayaAwal(hargaN, dp);
    const angsuran = angsuranBulanan(hargaN - awal.dp, bunga, tenor);
    const impas = tahunImpas(awal.total, angsuran, sewaN, kenaikan, tenor, 30);
    const titik = TAHUN_TITIK.map((t) => ({
      tahun: t,
      beli: biayaBeliKumulatif(awal.total, angsuran, t, tenor),
      sewa: biayaSewaKumulatif(sewaN, kenaikan, t),
    }));
    return { awal, angsuran, impas, titik };
  }, [hargaN, dp, bunga, tenor, sewaN, kenaikan]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      track("calc_result_viewed", { tool: "rent-vs-beli" });
    }, 1500);
    return () => window.clearTimeout(id);
  }, [hasil.impas]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
        <h2 className="font-display text-lg font-semibold">Skenario beli vs sewa</h2>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-bold">Harga rumah (jika dibeli)</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="text"
                name="harga"
                inputMode="numeric"
                autoComplete="off"
                aria-label="Harga rumah jika dibeli dalam Rupiah"
                value={harga}
                onChange={(e) => setHarga(formatAngkaId(e.target.value))}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="dp-rvb" className="text-sm font-bold">Uang muka (DP)</label>
              <span className="font-semibold tabular-nums text-primary">{dp}%</span>
            </div>
            <input
              id="dp-rvb"
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

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-bold">Bunga KPR / th</span>
              <div className="mt-1.5 flex items-center">
                <input
                  type="number"
                  min={1}
                  step={0.25}
                  name="bunga"
                  inputMode="decimal"
                  aria-label="Bunga KPR per tahun dalam persen"
                  value={bunga}
                  onChange={(e) => setBunga(Number(e.target.value))}
                  className={`${inputCls}`}
                />
                <span className="ml-2 text-sm font-bold text-ink-soft">%</span>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-bold">Tenor</span>
              <div className="mt-1.5 flex items-center">
                <input
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  name="tenor"
                  inputMode="numeric"
                  aria-label="Tenor KPR dalam tahun"
                  value={tenor}
                  onChange={(e) =>
                    setTenor(Math.min(30, Math.max(1, Number(e.target.value) || 1)))
                  }
                  className={`${inputCls}`}
                />
                <span className="ml-2 text-sm font-bold text-ink-soft">th</span>
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold">Sewa saat ini / bulan</span>
            <div className="mt-1.5 flex items-center">
              <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">Rp</span>
              <input
                type="text"
                name="sewa"
                inputMode="numeric"
                autoComplete="off"
                aria-label="Sewa per bulan dalam Rupiah"
                value={sewa}
                onChange={(e) => setSewa(formatAngkaId(e.target.value))}
                className={`${inputCls} rounded-l-none`}
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-bold">Kenaikan sewa / tahun</span>
            <div className="mt-1.5 flex items-center">
              <input
                type="number"
                min={0}
                step={0.5}
                name="kenaikan"
                inputMode="decimal"
                aria-label="Kenaikan sewa per tahun dalam persen"
                value={kenaikan}
                onChange={(e) => setKenaikan(Number(e.target.value))}
                className={`${inputCls}`}
              />
              <span className="ml-2 text-sm font-bold text-ink-soft">%</span>
            </div>
            <p className="mt-1 text-[11px] font-semibold text-ink-soft">
              Penyewa umumnya menanggung inflasi sewa tiap tahun (5–10%).
            </p>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Angsuran KPR estimasi
            </p>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
              Dana awal {formatRupiah(hasil.awal.total)}
            </span>
          </div>
          <p
            className="mt-2 font-display text-4xl font-semibold tabular-nums text-primary sm:text-5xl"
            aria-live="polite"
          >
            {formatRupiah(hasil.angsuran)}/bln
          </p>

          <div className="mt-6 border-t border-line pt-6">
            <p className="flex items-center gap-2 font-display text-lg font-semibold">
              <Scale className="size-5 text-primary" aria-hidden="true" />
              Tahun impas (break-even)
            </p>
            {hasil.impas === null ? (
              <p className="mt-2 rounded-2xl bg-accent-soft/60 p-4 text-sm leading-relaxed text-ink-soft">
                Dalam 30 tahun, kumulatif biaya sewa tetap lebih murah dari beli pada asumsi ini.
                Skenario beli baru unggul bila sewa naik lebih cepat atau harga rumah tumbuh.
              </p>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Mulai tahun ke-<span className="font-bold tabular-nums text-primary">{hasil.impas}</span>,
                akumulasi pengeluaran <strong>beli</strong> sudah sebanding dengan{" "}
                <strong>sewa</strong> — dan seterusnya terus lebih murah (belum memperhitungkan
                nilai jual rumah yang biasanya mengikuti inflasi).
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            Perbandingan kumulatif (Rp, total keluar)
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-sm">
              <caption className="sr-only">
                Tabel perbandingan biaya kumulatif membeli versus menyewa per tahun
              </caption>
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-soft">
                  <th scope="col" className="py-2 pr-4 font-bold">Tahun</th>
                  <th scope="col" className="py-2 pr-4 font-bold">Total beli</th>
                  <th scope="col" className="py-2 pr-4 font-bold">Total sewa</th>
                  <th scope="col" className="py-2 font-bold">Lebih murah</th>
                </tr>
              </thead>
              <tbody>
                {hasil.titik.map((t) => (
                  <tr key={t.tahun} className="border-b border-line/60 last:border-0">
                    <td className="py-2.5 pr-4 font-semibold tabular-nums">Th {t.tahun}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{formatRupiah(t.beli)}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{formatRupiah(t.sewa)}</td>
                    <td className="py-2.5 font-semibold">
                      {t.beli <= t.sewa ? "Beli" : t.sewa < t.beli ? "Sewa" : "Sebanding"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
            Beli dihitung dari dana awal + angsuran tetap yang berhenti saat KPR
            lunas sesuai tenor; sewa memakai kenaikan tahunan. Belum termasuk
            nilai sisa rumah, inflasi, kesempatan investasi uang muka, atau
            biaya pemeliharaan rumah. Untuk keputusan, gabungkan kenyamanan dan
            tujuan jangka panjang.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary-soft/60 p-6">
          <p className="flex items-center gap-2 font-display text-base font-semibold text-primary-deep">
            <Home className="size-5" aria-hidden="true" />
            Mempunyai rumah, langkah berikutnya
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <Link href="/kalkulator" className={btnPrimary}>
              <Wallet className="size-4" aria-hidden="true" />
              Simulasikan angsuran
            </Link>
            <Link href="/perjalanan/03-skema" className={btnSecondary}>
              Kenali profil KPR
            </Link>
          </div>
          <div className="mt-3">
            <WhatsAppButton
              source="rent-vs-beli"
              label="Konsultasi via WhatsApp"
              pesan={`Halo, saya bandingkan beli vs sewa di AlurKPR (harga ${formatRupiah(hargaN)}, angsuran ${formatRupiah(hasil.angsuran)}/bln). Saya ingin konsultasi lanjutan.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}