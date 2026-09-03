"use client";

import Link from "next/link";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { tahapKpr } from "@/content/tahap";
import { PinNote } from "./pin-note";
import { SvgConnectors } from "./svg-connectors";

const KOLOM = 2;
const TOTAL = tahapKpr.length;
const STORAGE_KEY = "alurkpr-opened";

const pendengar = new Set<() => void>();

function beriTahu() {
  for (const cb of pendengar) cb();
}

function bacaSnap(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

// Server snapshot — kosong, agar tidak ada hydration mismatch.
function bacaSnapServer(): string {
  return "[]";
}

function langgan(cb: () => void): () => void {
  pendengar.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    pendengar.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function tulis(next: number[]) {
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

export function AlurKprBoard() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const [rerender, setRerender] = useState(0);

  const raw = useSyncExternalStore(langgan, bacaSnap, bacaSnapServer);
  const opened = new Set<number>(
    (() => {
      try {
        const arr = JSON.parse(raw) as unknown;
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    })() as number[],
  );

  const toggle = useCallback(
    (active: Set<number>, i: number) => {
      const next = new Set(active);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      tulis([...next]);
      setRerender((n) => n + 1);
    },
    [],
  );

  const resetProgress = useCallback(() => {
    hapus();
    setRerender((n) => n + 1);
  }, []);

  const handleRecalculate = useCallback(() => {
    setRerender((n) => n + 1);
  }, []);

  return (
    <div className="pinboard-bg pinboard-grain relative rounded-[2px] px-4 py-8 sm:px-8 sm:py-10">
      {/* Header ribbon — formal, tanpa rotasi (v7.2) */}
      <div className="board-ribbon mb-8 text-center text-lg sm:text-xl">
        Alur Pengajuan KPR
      </div>

      {/* Grid 2 kolom + SVG connectors */}
      <div ref={flowRef} className="relative">
        <SvgConnectors containerRef={flowRef} signal={rerender} />
        <ol
          role="list"
          aria-label="Tahapan pengajuan KPR"
          className="grid grid-cols-1 gap-x-[clamp(26px,8vw,42px)] gap-y-6 sm:grid-cols-2 sm:gap-y-10"
        >
          {tahapKpr.map((t, i) => (
            <PinNote
              key={t.nomor}
              step={t}
              index={i}
              total={TOTAL}
              columns={KOLOM}
              buka={opened.has(i)}
              isOpened={opened.has(i)}
              onToggle={() => toggle(opened, i)}
              onResize={handleRecalculate}
            />
          ))}
        </ol>
      </div>

      {/* Reset progress */}
      {opened.size > 0 && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={resetProgress}
            className="text-xs text-ink/40 transition-colors hover:text-ink/60"
          >
            Mulai ulang progress
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link
          href="/panduan"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-bold text-ink transition-[border-color,color,transform] hover:border-primary/40 hover:text-primary active:scale-[0.98]"
        >
          Baca detail semua tahap
        </Link>
      </div>
    </div>
  );
}
