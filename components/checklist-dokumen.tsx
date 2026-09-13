"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CheckSquare, FileText, Printer, RotateCcw } from "lucide-react";
import Link from "next/link";
import { tahapKpr } from "@/content/tahap";
import { track } from "@/lib/analytics";
import { btnSecondary } from "./ui";

const STORAGE_KEY = "alurkpr-checklist-v1";

type Item = { id: string; tahap: number; label: string; tahapSlug: string };

const itemDokumen: Item[] = tahapKpr.flatMap((t) =>
  t.dokumen
    .filter((d) => !d.startsWith("Tidak ada"))
    .map((d) => ({
      id: `${t.slug}::${d}`,
      tahap: t.nomor,
      label: d,
      tahapSlug: t.slug,
    })),
);

const kelompok = itemDokumen.reduce<Record<number, Item[]>>((acc, item) => {
  (acc[item.tahap] = acc[item.tahap] ?? []).push(item);
  return acc;
}, {});

const pendengar = new Set<() => void>();

function beriTahu() {
  for (const cb of pendengar) cb();
}

function bacaSnap(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

function bacaSnapServer(): string {
  return "{}";
}

function langgan(cb: () => void): () => void {
  pendengar.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    pendengar.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function tulis(next: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* penyimpanan penuh / tidak tersedia */
  }
  beriTahu();
}

function hapus() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* abaikan */
  }
  beriTahu();
}

export function ChecklistDokumen() {
  const raw = useSyncExternalStore(langgan, bacaSnap, bacaSnapServer);
  const cetak = useMemo(() => {
    try {
      return (JSON.parse(raw) as Record<string, boolean>) ?? {};
    } catch {
      return {};
    }
  }, [raw]);

  const total = itemDokumen.length;
  const selesai = itemDokumen.filter((i) => cetak[i.id]).length;
  const persen = Math.round((selesai / total) * 100);

  function ubah(item: Item, nilai: boolean) {
    const next = { ...cetak, [item.id]: nilai };
    tulis(next);
    track("checklist_saved", { progress_persen: persenBaru(next, total) });
  }

  function reset() {
    hapus();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Kemajuan dokumen
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
              {selesai}/{total} siap
            </p>
          </div>
          <span className="font-display text-3xl font-semibold tabular-nums text-primary">
            {persen}%
          </span>
        </div>
        <div
          className="mt-4 h-2.5 overflow-hidden rounded-full bg-paper"
          role="progressbar"
          aria-valuenow={persen}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progres kelengkapan dokumen"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${persen}%` }}
          />
        </div>

        <div className="no-print mt-6 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className={`${btnSecondary} h-10 px-4 text-xs`}
          >
            <Printer className="size-4" aria-hidden="true" />
            Cetak / simpan PDF
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-bold text-ink-soft transition hover:border-accent/40 hover:text-accent-ink"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset semua
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {Object.entries(kelompok)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([nomor, items]) => {
            const tahap = tahapKpr.find((t) => t.nomor === Number(nomor));
            const tercentang = items.filter((i) => cetak[i.id]).length;
            return (
              <section
                key={nomor}
                aria-labelledby={`kelompok-${nomor}`}
                className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-7"
              >
                <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                      Tahap {nomor}
                    </p>
                    <h2 id={`kelompok-${nomor}`} className="mt-0.5 font-display text-base font-semibold">
                      {tahap?.judul ?? "Dokumen"}
                    </h2>
                  </div>
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
                    {tercentang}/{items.length}
                  </span>
                </header>
                <ul className="mt-4 space-y-1">
                  {items.map((item, indeks) => {
                    const checked = Boolean(cetak[item.id]);
                    const idCb = `cb-${nomor}-${indeks}`;
                    return (
                      <li key={item.id}>
                        <label
                          htmlFor={idCb}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-paper ${
                            checked ? "opacity-85" : ""
                          }`}
                        >
                          <input
                            id={idCb}
                            type="checkbox"
                            name={item.label}
                            checked={checked}
                            onChange={(e) => ubah(item, e.target.checked)}
                            className="mt-1 size-4 accent-primary"
                          />
                          <span
                            className={`text-sm leading-relaxed ${
                              checked ? "text-ink-soft line-through" : "text-ink"
                            }`}
                          >
                            {item.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
      </div>

      <div className="no-print mt-8 rounded-3xl bg-primary-soft p-7">
        <p className="flex items-center gap-2 font-display text-base font-semibold text-primary-deep">
          <CheckSquare className="size-5 text-primary" aria-hidden="true" />
          Semua berkas siap?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Simpan progresmu otomatis di perangkat ini. Setelah lengkap, lanjut ke tahap
          pengajuan sambil menyiapkan dana awal.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link href="/panduan/tahap-5-pengajuan-kpr-ke-bank" className={`${btnSecondary} h-10 px-4 text-xs`}>
            <FileText className="size-4" aria-hidden="true" />
            Baca tahap pengajuan
          </Link>
          <Link href="/kalkulator" className={`${btnSecondary} h-10 px-4 text-xs`}>
            Hitung dana awal
          </Link>
        </div>
      </div>
    </div>
  );
}

function persenBaru(cetak: Record<string, boolean>, total: number): number {
  const selesai = itemDokumen.filter((i) => cetak[i.id]).length;
  return Math.round((selesai / total) * 100);
}