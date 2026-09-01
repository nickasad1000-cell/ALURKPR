"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronDown, Clock } from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { IconKunci, TAHAP_ICONS } from "@/components/blueprint-icons";
import {
  koordinatJalur,
  koordinatToken,
  urutanPapan,
} from "@/lib/papan-jalur";

const KOLOM = 2;
const TOTAL = tahapKpr.length;
const POIN_JALUR = koordinatJalur(KOLOM, TOTAL);
const POLYLINE = POIN_JALUR.map((p) => `${p.x},${p.y}`).join(" ");
const POSISI = tahapKpr.map((_, i) => koordinatToken(i, KOLOM, TOTAL));

const navBtn =
  "inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-line bg-surface px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40";

function Tanda({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute text-primary/40 ${className}`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 0v16M0 8h16" />
      </svg>
    </span>
  );
}

function Tile({
  t,
  i,
  aktif,
  buka,
  order,
  onToggle,
}: {
  t: (typeof tahapKpr)[number];
  i: number;
  aktif: boolean;
  buka: boolean;
  order: number;
  onToggle: () => void;
}) {
  const Icon = TAHAP_ICONS[i];
  const isFinal = i === TOTAL - 1;

  return (
    <article style={{ order }} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={buka}
        aria-controls={`panel-${t.nomor}`}
        aria-current={aktif ? "step" : undefined}
        className={`relative w-full min-h-24 rounded-[2px] border bg-surface p-5 text-left shadow-sm transition-colors duration-200 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary sm:min-h-28 sm:p-6 ${
          aktif ? "border-primary ring-1 ring-primary/30" : "border-line"
        }`}
      >
        <Tanda className="left-2 top-2" />
        <Tanda className="right-2 top-2" />
        <Tanda className="bottom-2 left-2" />
        <Tanda className="bottom-2 right-2" />

        <span className="absolute left-0 top-0 grid min-w-9 place-items-center bg-primary px-1.5 py-1 font-mono text-[11px] font-bold text-white">
          {String(t.nomor).padStart(2, "0")}
        </span>

        <div className="flex items-start justify-between gap-4 pt-3">
          <div className="flex items-center gap-3">
            <div
              className={`grid size-11 place-items-center border-2 bg-paper text-primary sm:size-12 ${
                isFinal ? "border-accent" : "border-primary/30"
              }`}
            >
              <Icon className="size-5 sm:size-6" />
            </div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft/70">
              Tahap {t.nomor}
            </p>
          </div>
          {t.fakta && (
            <div className="shrink-0 text-right">
              <p className="font-display text-lg font-bold leading-none text-primary sm:text-xl">
                {t.fakta.nilai}
              </p>
              <p className="mt-1 max-w-44 text-[10px] uppercase leading-tight tracking-[0.14em] text-ink-soft/80">
                {t.fakta.label}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 id={`tile-${t.nomor}`} className="font-display text-base font-semibold leading-snug text-ink sm:text-lg">
            {t.judulSingkat}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {t.ringkasan}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${buka ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
            {buka ? "Tutup detail" : "Lihat detail"}
          </span>
          {isFinal && (
            <BadgeCheck className="size-5 text-accent" aria-hidden="true" />
          )}
        </div>
      </button>

      <motion.div
        id={`panel-${t.nomor}`}
        role="region"
        aria-labelledby={`tile-${t.nomor}`}
        aria-hidden={!buka}
        inert={!buka}
        initial={{ height: 0 }}
        animate={{ height: buka ? "auto" : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="border-x border-b border-dashed border-line bg-paper/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink">
              <Clock className="size-3" aria-hidden="true" />
              {t.estimasiWaktu}
            </span>
            {t.biayaTerkait.map((b) => (
              <span key={b} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                {b}
              </span>
            ))}
          </div>

          {t.dokumen.length > 0 && (
            <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {t.dokumen.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 border-l-2 border-accent/50 pl-3 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-bold text-ink">Skema subsidi: </span>
            {t.perbedaanSubsidi}
          </p>

          <div className="mt-5">
            <Link
              href={`/panduan/${t.slug}`}
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-primary/30 bg-surface px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary"
            >
              Detail lengkap di panduan
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function PapanJalur() {
  const reduce = useReducedMotion();
  const [kunci, setKunci] = useState(0);
  const [terbuka, setTerbuka] = useState<ReadonlySet<number>>(new Set());

  const toggle = (i: number) =>
    setTerbuka((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  const pindah = (delta: number) =>
    setKunci((k) => Math.min(TOTAL - 1, Math.max(0, k + delta)));

  const p = POSISI[kunci];

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={POLYLINE}
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="5 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            className="stroke-primary/25"
          />
        </svg>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-20 hidden lg:block"
        initial={false}
        animate={{ top: `${p.top}%`, left: `${p.left}%` }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 26 }
        }
      >
        <div className="grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-lg ring-4 ring-paper">
          <IconKunci className="size-5" />
        </div>
      </motion.div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p
          role="status"
          aria-live="polite"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
        >
          Posisi kamu —{" "}
          <span className="font-bold text-primary">
            Tahap {String(kunci + 1).padStart(2, "0")} dari {TOTAL}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={navBtn}
            onClick={() => pindah(-1)}
            disabled={kunci === 0}
            aria-label="Pindah ke tahap sebelumnya"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <button
            type="button"
            className={navBtn}
            onClick={() => pindah(1)}
            disabled={kunci === TOTAL - 1}
            aria-label="Pindah ke tahap berikutnya"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MotionConfig reducedMotion="user">
        <div
          className="grid grid-cols-1 gap-y-2 gap-x-6 lg:grid-cols-2 lg:gap-y-4"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              pindah(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              pindah(-1);
            }
          }}
        >
          {tahapKpr.map((t, i) => (
            <Tile
              key={t.nomor}
              t={t}
              i={i}
              aktif={kunci === i}
              buka={terbuka.has(i)}
              order={urutanPapan(i, KOLOM)}
              onToggle={() => {
                toggle(i);
                setKunci(i);
              }}
            />
          ))}
        </div>
      </MotionConfig>
    </div>
  );
}