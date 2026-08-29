"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cekKelayakan } from "@/lib/eligibility";
import type { KelayakanResult } from "@/lib/types";
import { inputCls } from "./ui";

export function KelayakanForm() {
  const [penghasilan, setPenghasilan] = useState("5000000");
  const [hargaUnit, setHargaUnit] = useState("150000000");
  const [dewasaAtauMenikah, setDewasaAtauMenikah] = useState(false);
  const [sudahPunyaRumah, setSudahPunyaRumah] = useState(false);
  const [pernahSubsidi, setPernahSubsidi] = useState(false);
  const [hasil, setHasil] = useState<KelayakanResult | null>(null);

  const sumbit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasil(
      cekKelayakan({
        penghasilan: Number(penghasilan) || 0,
        hargaUnit: Number(hargaUnit) || 0,
        dewasaAtauMenikah,
        sudahPunyaRumah,
        pernahSubsidi,
      }),
    );
  };

  return (
    <form onSubmit={sumbit} className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
      <h2 className="font-display text-lg font-semibold">Cek kelayakan KPR subsidi</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Berdasarkan aturan umum FLPP untuk rumah tapak — indikatif.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold">Penghasilan pokok / bulan</span>
          <div className="mt-1.5 flex items-center">
            <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={100000}
              value={penghasilan}
              onChange={(e) => setPenghasilan(e.target.value)}
              className={`${inputCls} rounded-l-none`}
              aria-label="Penghasilan pokok per bulan dalam Rupiah"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold">Harga unit rumah</span>
          <div className="mt-1.5 flex items-center">
            <span className="rounded-l-xl border border-r-0 border-line bg-paper px-3 py-2.5 text-sm font-bold text-ink-soft">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={1000000}
              value={hargaUnit}
              onChange={(e) => setHargaUnit(e.target.value)}
              className={`${inputCls} rounded-l-none`}
              aria-label="Harga unit rumah dalam Rupiah"
            />
          </div>
        </label>
      </div>

      <fieldset className="mt-6 space-y-3">
        <legend className="text-sm font-bold">Kondisi pemohon</legend>
        {[
          {
            id: "dewasa",
            label: "Saya berusia ≥ 21 tahun atau sudah menikah",
            value: dewasaAtauMenikah,
            set: setDewasaAtauMenikah,
          },
          {
            id: "belum-punya",
            label: "Saya belum pernah memiliki rumah",
            value: !sudahPunyaRumah,
            set: (v: boolean) => setSudahPunyaRumah(!v),
          },
          {
            id: "belum-subsidi",
            label: "Saya belum pernah menerima subsidi perumahan pemerintah",
            value: !pernahSubsidi,
            set: (v: boolean) => setPernahSubsidi(!v),
          },
        ].map((item) => (
          <label key={item.id} className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={item.value}
              onChange={(e) => item.set(e.target.checked)}
              className="mt-0.5 size-4.5 accent-primary"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-white transition hover:bg-primary-deep"
      >
        Periksa kelayakan
      </button>

      {hasil ? (
        <div className={`mt-6 rounded-2xl border p-5 ${hasil.layak ? "border-primary/30 bg-primary-soft" : "border-accent/40 bg-accent-soft/60"}`}>
          <div className="flex items-center gap-2.5">
            {hasil.layak ? (
              <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
            ) : (
              <AlertTriangle className="size-6 text-accent" aria-hidden="true" />
            )}
            <p className="font-display text-lg font-semibold">
              {hasil.layak ? "Kelihatannya kamu memenuhi syarat!" : "Belum lolos semua syarat"}
            </p>
          </div>
          {hasil.alasan.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {hasil.alasan.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="mt-4 space-y-2">
            {hasil.syarat.map((s) => (
              <li key={s.label} className="flex items-start gap-2.5 text-sm">
                {s.lolos ? (
                  <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 size-4.5 shrink-0 text-danger" aria-hidden="true" />
                )}
                <span>
                  <span className={s.lolos ? "" : "line-through decoration-danger/60"}>{s.label}</span>
                  {s.catatan ? <span className="block text-xs text-ink-soft">{s.catatan}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}