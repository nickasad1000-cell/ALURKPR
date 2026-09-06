"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  Pause,
  Play,
} from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { PelatTahap } from "@/components/blueprint-icons";
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
const pad = (n: number) => String(n).padStart(2, "0");
const DELAY_AUTO = 2400;

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
  reduce,
}: {
  t: (typeof tahapKpr)[number];
  i: number;
  aktif: boolean;
  buka: boolean;
  order: number;
  onToggle: () => void;
  reduce: boolean;
}) {
  const isFinal = i === TOTAL - 1;

  return (
    <article style={{ order }} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={buka}
        aria-controls={`panel-${t.nomor}`}
        aria-current={aktif ? "step" : undefined}
        className={`relative w-full rounded-[2px] border bg-surface p-5 text-left shadow-sm transition-[border-color,box-shadow,transform,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary ${
          aktif
            ? "border-primary bg-paper ring-2 ring-primary/30 shadow-[0_14px_30px_-14px_rgb(11_107_79/0.55)]"
            : "border-line"
        }`}
      >
        <Tanda className="left-2 top-2" />
        <Tanda className="right-2 top-2" />
        <Tanda className="bottom-2 left-2" />
        <Tanda className="bottom-2 right-2" />

        {aktif && !buka ? (
          <span className="absolute right-2 top-2 z-10 inline-block rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            kamu&nbsp;di&nbsp;sini
          </span>
        ) : null}

        <span className="absolute left-0 top-0 grid min-w-9 place-items-center bg-primary px-1.5 py-1 font-mono text-[11px] font-bold text-white">
          {String(t.nomor).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-3 pt-5">
          <PelatTahap index={i} />
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft/70">
              Tahap {t.nomor}
            </p>
            <h3 id={`tile-${t.nomor}`} className="mt-0.5 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
              {t.judulSingkat}
            </h3>
          </div>
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
            <BadgeCheck className="size-5 text-accent-ink" aria-hidden="true" />
          )}
        </div>
      </button>

      <motion.div
        id={`panel-${t.nomor}`}
        role="region"
        aria-labelledby={`tile-${t.nomor}`}
        aria-hidden={!buka}
        inert={!buka}
        initial={false}
        animate={{ height: buka ? "auto" : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="border-x border-b border-line bg-surface p-5 sm:p-6">
          {t.fakta && (
            <div className="mb-4 rounded-[2px] border border-line bg-paper px-4 py-3">
              <p className="font-display text-xl font-bold leading-none text-primary sm:text-2xl">
                {t.fakta.nilai}
              </p>
              <p className="mt-1 text-[11px] uppercase leading-tight tracking-[0.14em] text-ink-soft">
                {t.fakta.label}
              </p>
            </div>
          )}

          <p className="text-sm leading-relaxed text-ink-soft">{t.ringkasan}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
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
  // Putar otomatis dimatikan total untuk pengguna reduced-motion; kontrol
  // jeda/lanjut eksplisit memenuhi WCAG 2.2.2 (konten bergerak > 5 detik).
  const [jeda, setJeda] = useState(false);
  const [tersembunyi, setTersembunyi] = useState(false);
  const stepperRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onVis = () => setTersembunyi(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const berjalan =
    !jeda && !reduce && !tersembunyi && terbuka.size === 0;

  useEffect(() => {
    if (!berjalan) return;
    const id = window.setTimeout(() => {
      setKunci((k) => (k + 1) % TOTAL);
    }, DELAY_AUTO);
    return () => window.clearTimeout(id);
  }, [kunci, berjalan]);

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

  const pindah = (delta: number) => {
    setKunci((k) => (k + delta + TOTAL) % TOTAL);
  };

  const tahuKlik = (i: number) => {
    setKunci(i);
    toggle(i);
  };

  const p = POSISI[kunci];
  const progres = TOTAL > 1 ? kunci / (TOTAL - 1) : 1;
  const selesai = kunci === TOTAL - 1;
  const tokenTersembunyi = terbuka.size > 0;

  const fokuskanStepper = (i: number) => {
    setKunci(i);
    stepperRefs.current[i]?.focus();
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p
          role="status"
          aria-live="polite"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
        >
          {selesai ? (
            <>
              Garis akhir —{" "}
              <span className="font-bold text-accent-ink">kunci di tangan</span>
            </>
          ) : (
            <>
              {berjalan ? "Putaran otomatis —" : "Jelajah manual —"}{" "}
              <span className="font-bold text-primary">
                Tahap {pad(kunci + 1)} dari {TOTAL}
              </span>
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {!reduce && (
            <button
              type="button"
              className={navBtn}
              onClick={() => setJeda((j) => !j)}
              aria-pressed={jeda}
              aria-label={jeda ? "Lanjutkan putaran otomatis papan jalur" : "Jeda putaran otomatis papan jalur"}
            >
              {jeda ? (
                <Play className="size-4" aria-hidden="true" />
              ) : (
                <Pause className="size-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{jeda ? "Lanjut" : "Jeda"}</span>
            </button>
          )}
          <button
            type="button"
            className={navBtn}
            onClick={() => pindah(-1)}
            aria-label="Pindah ke tahap sebelumnya"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <button
            type="button"
            className={navBtn}
            onClick={() => pindah(1)}
            aria-label="Pindah ke tahap berikutnya"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ol className="mb-6 flex items-center gap-1" aria-label="Navigasi tahapan KPR">
        {tahapKpr.map((t, i) => (
          <li key={t.nomor} className="flex items-center gap-1">
            <button
              ref={(el) => {
                stepperRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                setKunci(i);
                setTerbuka(new Set());
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  fokuskanStepper((i + 1) % TOTAL);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  fokuskanStepper((i - 1 + TOTAL) % TOTAL);
                }
              }}
              tabIndex={kunci === i ? 0 : -1}
              aria-current={kunci === i ? "step" : undefined}
              aria-label={`Menuju tahap ${t.nomor}: ${t.judulSingkat}`}
              className={`grid size-8 place-items-center rounded-[2px] border font-mono text-[10px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-9 ${
                kunci === i
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-line bg-paper text-ink-soft hover:border-primary/40 hover:text-primary"
              }`}
            >
              {pad(t.nomor)}
            </button>
            {i < TOTAL - 1 && (
              <span aria-hidden="true" className="hidden h-px w-3 bg-line sm:block sm:w-4" />
            )}
          </li>
        ))}
      </ol>

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
              strokeDasharray="2 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              className="stroke-primary/15"
            />
            <polyline
              points={POLYLINE}
              fill="none"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - progres}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              className="stroke-primary"
              style={{
                transition: reduce ? "none" : "stroke-dashoffset 0.65s ease",
              }}
            />
          </svg>
        </div>

        {!tokenTersembunyi && (
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
            {selesai ? (
              <div className="grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-[0_0_0_6px_rgb(123_91_27/0.15)]">
                <BadgeCheck className="size-6" />
              </div>
            ) : (
              <div className="grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-lg ring-4 ring-paper">
                <svg viewBox="0 0 32 32" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="4" />
                  <path d="M13 13 24 24" />
                </svg>
              </div>
            )}
          </motion.div>
        )}

        <MotionConfig reducedMotion="user">
        <div className="grid grid-cols-1 gap-y-2 gap-x-6 lg:grid-cols-2 lg:gap-y-4">
          {tahapKpr.map((t, i) => (
            <Tile
              key={t.nomor}
              t={t}
              i={i}
              aktif={kunci === i}
              buka={terbuka.has(i)}
              order={urutanPapan(i, KOLOM)}
              reduce={!!reduce}
              onToggle={() => tahuKlik(i)}
            />
          ))}
        </div>
        </MotionConfig>
        {/* Progress dots untuk mobile */}
        <div className="mt-6 flex justify-center gap-2 lg:hidden" aria-hidden="true">
          {tahapKpr.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${i === kunci ? 'bg-primary' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}