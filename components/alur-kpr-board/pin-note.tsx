"use client";

import Link from "next/link";
import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Tahap } from "@/lib/types";
import { urutanPapan } from "./types";

const CARD_COLORS = [
  "bg-[#ecfdf5]", // tahap 1 — hijau mint
  "bg-[#fefce8]", // tahap 2 — kuning pucat
  "bg-[#eff6ff]", // tahap 3 — biru langit
  "bg-[#fdf4ff]", // tahap 4 — ungu muda
  "bg-[#fff7ed]", // tahap 5 — oranye pucat
  "bg-[#fef2f2]", // tahap 6 — merah muda
  "bg-[#f0fdf4]", // tahap 7 — hijau lembut
  "bg-accent", // tahap 8 — gold milestone
];

const pad = (n: number) => String(n).padStart(2, "0");

export type PinNoteHandle = {
  pinPoint: () => { x: number; y: number } | null;
};

type PinNoteProps = {
  step: Tahap;
  index: number;
  total: number;
  columns: number;
  buka: boolean;
  isOpened: boolean;
  onToggle: () => void;
  onResize?: () => void;
};

export const PinNote = memo(function PinNote({
  step,
  index,
  total,
  columns,
  buka,
  isOpened,
  onToggle,
  onResize,
}: PinNoteProps) {
  const reduce = useReducedMotion();
  const order = urutanPapan(index, columns);
  const cardColor = CARD_COLORS[index % CARD_COLORS.length];
  const isFinal = index === total - 1;

  return (
    <li
      role="listitem"
      aria-setsize={total}
      aria-posinset={index + 1}
      data-pin-index={index}
      className="flow-node relative"
      style={{ order }}
    >
      {/* Pin di LUAR element clip-path — kartu lurus, tidak di-rotate (v7.2) */}
      <div className="pin" aria-hidden="true" />

      <div className={`note-card relative ${cardColor}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={buka}
          aria-controls={`panel-${step.nomor}`}
          className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
        >
          <span className="min-w-0">
            <span className="note-number block text-lg leading-none sm:text-xl">
              {pad(step.nomor)}
            </span>
            <span className="mt-1 block font-display text-base font-semibold leading-snug text-ink sm:text-lg">
              {step.judulSingkat}
            </span>
            {step.fakta && (
              <span className="mt-1.5 inline-block rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-bold text-ink-soft">
                {step.fakta.nilai} · {step.fakta.label}
              </span>
            )}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 shrink-0 text-ink/50 transition-transform duration-200 ${buka ? "rotate-180" : ""}`}
          />
        </button>

        {/* Progress checkmark — sudah pernah dibuka */}
        {isOpened && !buka && (
          <span className="absolute right-2 top-2 text-green-600" aria-label="Sudah dibuka">
            ✓
          </span>
        )}

        {/* Panel expand — in-place, framer-motion */}
        <AnimatePresence>
          {buka && (
            <motion.div
              id={`panel-${step.nomor}`}
              role="region"
              aria-labelledby={`tile-${step.nomor}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }}
              onAnimationComplete={() => onResize?.()}
              className="overflow-hidden"
            >
              <div className="border-t border-ink/10 px-4 pb-4 sm:px-5 sm:pb-5">
                <h4 id={`tile-${step.nomor}`} className="mt-3 sr-only">
                  {step.judul}
                </h4>

                {step.ringkasan && (
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">{step.ringkasan}</p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink/60">
                  {step.estimasiWaktu && <p>⏱ Estimasi: {step.estimasiWaktu}</p>}
                  {step.biayaTerkait.length > 0 && (
                    <p>Biaya: {step.biayaTerkait.join(" · ")}</p>
                  )}
                </div>

                {step.dokumen.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">
                      Dokumen
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {step.dokumen.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-xs text-ink/70">
                          <span className="mt-0.5 inline-flex size-3.5 shrink-0 items-center justify-center rounded border border-ink/20 bg-white/60" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.tips.length > 0 && (
                  <div className="mt-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                    <p className="text-xs font-semibold text-primary">Tips</p>
                    {step.tips.map((tip) => (
                      <p key={tip} className="mt-1 text-xs leading-relaxed text-ink/70">
                        • {tip}
                      </p>
                    ))}
                  </div>
                )}

                {step.kesalahanUmum.length > 0 && (
                  <div className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3">
                    <p className="text-xs font-semibold text-red-700">Hindari</p>
                    {step.kesalahanUmum.map((k) => (
                      <p key={k} className="mt-1 text-xs leading-relaxed text-red-600/80">
                        ✗ {k}
                      </p>
                    ))}
                  </div>
                )}

                {step.perbedaanSubsidi && (
                  <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                    <p className="text-xs font-semibold text-amber-700">Subsidi vs Komersial</p>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
                      {step.perbedaanSubsidi}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/panduan/${step.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Baca panduan lengkap <ChevronDown className="size-3 -rotate-90" />
                  </Link>
                  {isFinal && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-ink">
                      ✓ Kunci di tangan
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
});
