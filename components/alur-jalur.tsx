"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Clock, ArrowRight } from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { Container, btnSecondary } from "@/components/ui";
import { TAHAP_ICONS } from "@/components/blueprint-icons";

function Crosshair({ className = "" }: { className?: string }) {
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

function StepCard({
  t,
  i,
}: {
  t: (typeof tahapKpr)[number];
  i: number;
}) {
  const Icon = TAHAP_ICONS[i];
  const isFinal = i === tahapKpr.length - 1;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-20 sm:pl-24"
    >
      {/* Node ikon pada spine */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div
          className={`relative z-10 grid size-12 place-items-center border-2 bg-surface text-primary shadow-sm sm:size-14 ${
            isFinal ? "border-accent" : "border-primary/30"
          }`}
        >
          <Icon className="size-6 sm:size-7" />
          <span className="absolute -right-2.5 -top-2.5 grid size-6 place-items-center bg-primary font-display text-[10px] font-bold text-white sm:size-7 sm:text-xs">
            {String(t.nomor).padStart(2, "0")}
          </span>
        </div>
        {isFinal && (
          <div
            className="mt-3 grid size-9 place-items-center rounded-full bg-accent text-white shadow-lg ring-4 ring-paper"
            aria-hidden="true"
          >
            <BadgeCheck className="size-4" />
          </div>
        )}
      </div>

      {/* Kartu annotation sheet */}
      <Link
        href={`/panduan/${t.slug}`}
        className="group relative block border border-line bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-6"
      >
        <Crosshair className="left-2 top-2" />
        <Crosshair className="right-2 top-2" />
        <Crosshair className="bottom-2 left-2" />
        <Crosshair className="bottom-2 right-2" />

        {/* Garis dimensi dekoratif */}
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft/70">
          <span className="h-px w-3 bg-line" aria-hidden="true" />
          Tahap {String(t.nomor).padStart(2, "0")}
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="h-px w-3 bg-line" aria-hidden="true" />
        </div>

        <div className="relative">
          <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:text-lg">
            {t.judulSingkat}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {t.ringkasan}
          </p>
        </div>

        <div className="relative mt-4 flex items-center justify-between border-t border-dashed border-line pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink">
            <Clock className="size-3" aria-hidden="true" />
            {t.estimasiWaktu}
          </span>
          <ArrowRight
            className="size-4 text-line transition-all group-hover:translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.li>
  );
}

export function AlurJalur() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <section className="relative mt-20 overflow-hidden sm:mt-28">
      {/* Tekstur grid blueprint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(11 107 79 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 107 79 / 0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative">
        {/* Header lembar gambar */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Alur pengajuan KPR
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Jalur pengajuan KPR
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              Delapan tahap dari cek keuangan sampai akad dan KPR cair. Ikuti
              jalurnya satu per satu, setiap pemberhentian terhubung ke panduan
              lengkapnya.
            </p>
          </div>
          {/* Label gambar teknik */}
          <div className="hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ink-soft/70 sm:block">
            <p>Dwg No. KPR-08</p>
            <p>Skala: NTS</p>
            <p>Rev. 2026.1</p>
          </div>
        </div>

        {/* Lembar gambar */}
        <div
          ref={targetRef}
          className="relative mt-12 border border-line bg-surface/70 p-6 shadow-sm backdrop-blur-sm sm:p-10"
        >
          <Crosshair className="left-3 top-3" />
          <Crosshair className="right-3 top-3" />
          <Crosshair className="bottom-3 left-3" />
          <Crosshair className="bottom-3 right-3" />

          <div className="relative mx-auto max-w-3xl py-2">
            {/* Spine bergaya garis ukur teknik */}
            <div
              className="absolute left-6 top-2 bottom-2 w-px sm:left-7"
              aria-hidden="true"
            >
              {/* tick marks */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, var(--color-line) 0 6px, transparent 6px 12px)",
                }}
              />
              {/* garis progres */}
              <motion.div
                style={{ height: progressHeight }}
                className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-accent"
              />
            </div>

            <ol className="relative space-y-8 sm:space-y-10">
              {tahapKpr.map((t, i) => (
                <StepCard key={t.nomor} t={t} i={i} />
              ))}
            </ol>
          </div>

          {/* Title block / cartouche */}
          <div className="mt-10 border border-line bg-paper text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
              <div className="p-3">
                <p className="text-ink-soft/70">Proyek</p>
                <p className="mt-0.5 font-bold text-ink">AlurKPR</p>
              </div>
              <div className="p-3">
                <p className="text-ink-soft/70">Gambar</p>
                <p className="mt-0.5 font-bold text-ink">Jalur KPR 8 Tahap</p>
              </div>
              <div className="border-t border-line p-3 sm:border-t-0">
                <p className="text-ink-soft/70">Status</p>
                <p className="mt-0.5 font-bold text-primary">Disetujui</p>
              </div>
              <div className="border-l border-t border-line p-3 sm:border-l-0 sm:border-t-0">
                <p className="text-ink-soft/70">Revisi</p>
                <p className="mt-0.5 font-bold text-ink">2026.1</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/panduan" className={btnSecondary}>
            Baca detail semua tahap
          </Link>
        </div>
      </Container>
    </section>
  );
}
