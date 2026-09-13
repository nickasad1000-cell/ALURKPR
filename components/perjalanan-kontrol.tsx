"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "alurkpr-perjalanan-v1";

export type StatusTahap = "belum" | "disiapkan" | "siap";

type Simpan = Record<
  string,
  { status?: StatusTahap; selesai: string[] } | undefined
>;

const pilihan: { nilai: StatusTahap; label: string }[] = [
  { nilai: "belum", label: "Belum mulai" },
  { nilai: "disiapkan", label: "Sedang disiapkan" },
  { nilai: "siap", label: "Siap lanjut" },
];

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

function tulis(next: Simpan) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* penyimpanan penuh / tidak tersedia */
  }
  beriTahu();
}

export function PerjalananKontrol({
  slug,
  hasilTahap,
}: {
  slug: string;
  hasilTahap: string[];
}) {
  const raw = useSyncExternalStore(langgan, bacaSnap, bacaSnapServer);
  const simpan = useMemo(() => {
    try {
      return (JSON.parse(raw) as Simpan) ?? {};
    } catch {
      return {};
    }
  }, [raw]);

  const data = simpan[slug];
  const status = data?.status ?? "belum";
  const selesai = data?.selesai ?? [];

  function setStatus(nilai: StatusTahap) {
    const next = { ...simpan, [slug]: { status: nilai, selesai } };
    tulis(next);
    track("jalur_status", { slug, status: nilai });
  }

  function toggleHasil(label: string) {
    const ada = selesai.includes(label);
    const nextSelesai = ada ? selesai.filter((x) => x !== label) : [...selesai, label];
    tulis({ ...simpan, [slug]: { status, selesai: nextSelesai } });
    track("jalur_hasil_checked", { slug, selesai: nextSelesai.length });
  }

  const persen = Math.round((selesai.length / hasilTahap.length) * 100);

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            Progres tahap ini
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
            {selesai.length}/{hasilTahap.length} hasil terpenuhi
          </p>
        </div>
        <span className="font-display text-3xl font-semibold tabular-nums text-primary">
          {persen}%
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3" role="group" aria-label="Status tahap">
        {pilihan.map((p) => {
          const aktif = status === p.nilai;
          return (
            <button
              key={p.nilai}
              type="button"
              onClick={() => setStatus(p.nilai)}
              aria-pressed={aktif}
              className={`inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-bold transition ${
                aktif
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-paper text-ink-soft hover:border-primary/40 hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-1">
        {hasilTahap.map((label) => {
          const on = selesai.includes(label);
          const id = `hasil-${slug}-${label}`;
          return (
            <li key={label}>
              <label
                htmlFor={id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-paper ${
                  on ? "opacity-85" : ""
                }`}
              >
                <input
                  id={id}
                  type="checkbox"
                  name={label}
                  checked={on}
                  onChange={() => toggleHasil(label)}
                  className="sr-only"
                />
                {on ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                ) : (
                  <Circle className="mt-0.5 size-5 shrink-0 text-line" aria-hidden="true" />
                )}
                <span
                  className={`text-sm leading-relaxed ${
                    on ? "text-ink-soft line-through" : "text-ink"
                  }`}
                >
                  {label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}