"use client";

import Link from "next/link";
import { Container, btnSecondary } from "@/components/ui";
import { PapanJalur } from "@/components/papan-jalur";

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

export function AlurJalur() {
  return (
    <section className="relative mt-20 overflow-hidden sm:mt-28">
      {/* Tekstur grid blueprint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(11 107 79 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 107 79 / 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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
            <p>Rev. 2026.2</p>
          </div>
        </div>

        {/* Lembar gambar */}
        <div className="relative mt-12 border border-line bg-surface/70 p-5 shadow-sm backdrop-blur-sm sm:p-10">
          <Crosshair className="left-3 top-3" />
          <Crosshair className="right-3 top-3" />
          <Crosshair className="bottom-3 left-3" />
          <Crosshair className="bottom-3 right-3" />

          <div className="relative">
            <PapanJalur />
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
                <p className="mt-0.5 font-bold text-ink">2026.2</p>
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