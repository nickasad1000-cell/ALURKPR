"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  Users,
  Percent,
  TrendingUp,
  Wallet,
  CalendarDays,
  Home as HomeIcon,
  Clock,
  Ban,
} from "lucide-react";

const HARGA_SUBSIDI = 166_000_000;
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const fakta: {
  icon: typeof Users;
  nilai: string;
  label: string;
  catatan: string;
  sorot?: boolean;
}[] = [
  {
    icon: Users,
    nilai: "21–58",
    label: "Usia pemohon",
    catatan: "Minimal 21, maksimal 58 tahun saat pengajuan.",
  },
  {
    icon: Percent,
    nilai: "5%",
    label: "Bunga KPR subsidi",
    catatan: "Flat sampai lunas (FLPP).",
  },
  {
    icon: TrendingUp,
    nilai: "Floating",
    label: "Bunga komersial",
    catatan: "Mengikuti peraturan perbankan, ditinjau tiap tahun.",
  },
  {
    icon: Wallet,
    nilai: "1%",
    label: "DP subsidi (mulai)",
    catatan: `≈ ${rupiah.format(Math.round(HARGA_SUBSIDI * 0.01))} dari harga subsidi.`,
  },
  {
    icon: CalendarDays,
    nilai: "10–20",
    label: "Tenor subsidi",
    catatan: "Pilihan 10, 15, atau 20 tahun. Komersial ikut ketentuan bank.",
  },
  {
    icon: HomeIcon,
    nilai: "166 jt",
    label: "Harga rumah subsidi",
    catatan: "Mengikuti ketetapan pemerintah tahun berjalan.",
    sorot: true,
  },
  {
    icon: Clock,
    nilai: "±1 bulan",
    label: "Sampai kunci di tangan",
    catatan: "Jika berkas lengkap dan rumah ready stock.",
  },
  {
    icon: Ban,
    nilai: "SLIK Kol-5",
    label: "Penyebab gagal pengajuan",
    catatan: "Kendala BI checking dari awal, mis. kredit macet.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

export function BlokDemografis() {
  return (
    <div className="relative border border-line bg-surface p-7 shadow-sm sm:p-10">
      <Crosshair className="left-3 top-3" />
      <Crosshair className="right-3 top-3" />
      <Crosshair className="bottom-3 left-3" />
      <Crosshair className="bottom-3 right-3" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Demografis & fakta
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ringkasan Aturan KPR
            </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Ringkasan angka yang berlaku umum di lapangan — cocokkan dengan
            kondisi dan skema pilihanmu.
          </p>
        </div>
        <div className="hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ink-soft/70 sm:block">
          <p>Referensi cepat</p>
          <p>Ringkasan</p>
        </div>
      </div>

      <MotionConfig reducedMotion="user">
      <motion.dl
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {fakta.map((f) => (
          <motion.div
            key={f.label}
            variants={cardVariants}
            className={`group relative p-6 transition-colors ${
              f.sorot ? "bg-accent-soft" : "bg-surface hover:bg-paper"
            }`}
          >
            {/* Garis dimensi atas */}
            <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
              <span className={`h-2 w-px ${f.sorot ? "bg-accent" : "bg-primary/40"}`} />
              <span className={`h-px flex-1 ${f.sorot ? "bg-accent/50" : "bg-primary/20"}`} />
              <span className={`h-2 w-px ${f.sorot ? "bg-accent" : "bg-primary/40"}`} />
            </div>

            <dt className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
              f.sorot ? "text-accent-ink" : "text-ink-soft"
            }`}>
              <span
                className={`grid size-7 place-items-center border ${
                  f.sorot
                    ? "border-accent/50 bg-accent/15 text-accent-ink"
                    : "border-primary/25 bg-primary/5 text-primary"
                }`}
              >
                <f.icon className="size-3.5" aria-hidden="true" />
              </span>
              {f.label}
            </dt>
            <dd className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
              {f.nilai}
            </dd>
            <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
              {f.catatan}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
      </MotionConfig>

      {/* Catatan spesifikasi */}
      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-[auto_1fr]">
        <div className="bg-paper p-5 sm:w-44">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/70">
            Catatan
          </p>
          <p className="mt-1 text-sm font-bold text-primary-deep">
            Sumber & asumsi
          </p>
        </div>
        <div className="bg-paper p-5">
          <p className="text-xs leading-relaxed text-ink-soft">
            Angka usia, bunga, DP, dan tenor mengacu ketentuan program FLPP
            (dikelola BP Tapera) per peraturan terbaru. Harga rumah subsidi
            mengikuti ketetapan pemerintah tahun berjalan. Semua bersifat
            indikatif — selalu verifikasi angka resmi ke bank penyalur dan
            BP Tapera sebelum pengajuan.
          </p>
        </div>
      </div>
    </div>
  );
}
