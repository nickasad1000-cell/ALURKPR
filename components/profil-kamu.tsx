"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  RotateCcw,
  Sparkles,
  Wallet,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { btnPrimary, btnSecondary } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";

type Penghasilan = "di-bawah-4" | "4-8" | "8-12" | "di-atas-12";

type Profil = {
  penghasilan: Penghasilan;
  pekerjaan: "karyawan" | "wiraswasta" | "freelancer";
  cicilanLain: "ya" | "tidak";
  skema: "subsidi" | "komersial" | "belum-tahu";
  timeline: "sekitar" | "1tahun" | "lebih";
};

const stepCount = 5;

function buildRekomendasi(p: Profil) {
  const gaji = p.penghasilan;
  const bisaSubsidi = gaji === "4-8" || gaji === "di-bawah-4";
  const garisSubsidi =
    "FLPP cocok untuk penghasilan pokok ≤ Rp8 juta dan harga unit dalam plafon per zona.";

  if (p.skema === "komersial") {
    return {
      ringkas: "KPR komersial",
      judul: "Kamu cocok mengejar KPR komersial",
      poin: [
        "Fleksibilitas plafon & pilihan unit lebih luas (rumah baru, bekas, hingga refinancing).",
        "Bunga fixed promo di 1–3 tahun awal — bandingkan total bayar, bukan angsuran promo.",
        "DP minimum umumnya 10–15% — siapkan dana awal termasuk BPHTB & notaris.",
      ],
      langkah: ["Bandingkan skema bank", "Hitung angsuran & biaya awal", "Booking unit & ajukan pre-approval"],
    };
  }

  if (p.skema === "subsidi") {
    if (!bisaSubsidi) {
      return {
        ringkas: "KPR subsidi (kondisional)",
        judul: "Target subsidi bagus — tapi cek batas penghasilan",
        poin: [
          garisSubsidi,
          "Di atas batas itu, kamu bisa mengajukan FLPP hanya jika didukung kebijakan terbaru — verifikasi ke bank penyalur.",
          "Alternatif: KPR komersial dengan DP kecil, atau kombinasi KPR & tabungan.",
        ],
        langkah: ["Cek kelayakan subsidi resmi", "Bandingkan bank komersial", "Hitung dengan kalkulator"],
      };
    }
    return {
      ringkas: "KPR subsidi (FLPP)",
      judul: "Kamu sangat cocok untuk KPR subsidi",
      poin: [
        garisSubsidi,
        "Bunga flat 5% & tenor hingga 20 tahun — fokus pada cek kelayakan & plafon zona.",
        "DP bisa mulai 1% — siapkan dana awal kecil tapi total biaya tetap ada.",
      ],
      langkah: ["Cek kelayakan FLPP", "Bandingkan plafon per zona", "Pilih unit FLPP terdaftar"],
    };
  }

  if (!bisaSubsidi) {
    return {
      ringkas: "KPR komersial",
      judul: "Mulai dari KPR komersial",
      poin: [
        "Dengan penghasilan di atas Rp8 juta, plafon komersial memberi ruang lebih.",
        "Bandingkan bunga fixed & floating beberapa bank, lalu hitung total bayar.",
      ],
      langkah: ["Bandingkan bank", "Hitung angsuran", "Siapkan dokumen pengajuan"],
    };
  }

  return {
    ringkas: "KPR subsidi (FLPP)",
    judul: "Kamu cocok dengan KPR subsidi",
    poin: [
      garisSubsidi,
      "Kunjungi cek kelayakan untuk memverifikasi syarat MBR (usia, belum punya rumah, belum subsidi).",
      "Setelah layak, pilih unit terdaftar di zona mu & ajukan pre-approval.",
    ],
    langkah: ["Cek kelayakan", "Pilih unit FLPP", "Ajukan KPR ke bank"],
  };
}

const opsiPenghasilan: { key: Penghasilan; label: string }[] = [
  { key: "di-bawah-4", label: "Di bawah Rp4 jt" },
  { key: "4-8", label: "Rp4–8 jt" },
  { key: "8-12", label: "Rp8–12 jt" },
  { key: "di-atas-12", label: "Di atas Rp12 jt" },
];

const opsiPekerjaan: { key: Profil["pekerjaan"]; label: string; sub: string }[] = [
  { key: "karyawan", label: "Karyawan tetap", sub: "Punya slip gaji" },
  { key: "wiraswasta", label: "Wiraswasta / usaha", sub: "Punya omzet & laporan usaha" },
  { key: "freelancer", label: "Freelancer", sub: "Penghasilan tidak tetap" },
];

const opsiCicilan: { key: Profil["cicilanLain"]; label: string; sub: string }[] = [
  { key: "ya", label: "Ada", sub: "Motor, kendaraan, atau KTA" },
  { key: "tidak", label: "Tidak ada", sub: "Bersih dari cicilan lain" },
];

const opsiSkema: { key: Profil["skema"]; label: string; sub: string }[] = [
  { key: "subsidi", label: "KPR subsidi (FLPP)", sub: "Bunga rendah, rumah pertama" },
  { key: "komersial", label: "KPR komersial", sub: "Lebih bebas, plafon luas" },
  { key: "belum-tahu", label: "Belum tahu", sub: "Biar kami bantu arahkan" },
];

const opsiTimeline: { key: Profil["timeline"]; label: string }[] = [
  { key: "sekitar", label: "Mulai ada dalam ~1 tahun" },
  { key: "1tahun", label: "Dalam 1–3 tahun" },
  { key: "lebih", label: "Di atas 3 tahun (masih menabung)" },
];

const pertanyaan: { key: keyof Profil; label: string }[] = [
  { key: "penghasilan", label: "Berapa penghasilan pokokmu sebulan?" },
  { key: "pekerjaan", label: "Apa status pekerjaanmu?" },
  { key: "cicilanLain", label: "Saat ini punya cicilan lain?" },
  { key: "skema", label: "Skema KPR apa yang kamu incar?" },
  { key: "timeline", label: "Kapan kamu menargetkan beli rumah?" },
];

export function ProfilKamu() {
  const [step, setStep] = useState(0);
  const [profil, setProfil] = useState<Profil>({
    penghasilan: "4-8",
    pekerjaan: "karyawan",
    cicilanLain: "tidak",
    skema: "belum-tahu",
    timeline: "1tahun",
  });

  const rekomendasi = buildRekomendasi(profil);

  const pilih = (k: keyof Profil, v: string) => {
    setProfil((prev) => ({ ...prev, [k]: v }));
    if (step < stepCount - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(stepCount);
      track("profil_completed", { skema: v });
    }
  };

  const currentKey = pertanyaan[step]?.key ?? "penghasilan";
  const progress = ((step + 1) / (stepCount + 1)) * 100;
  const selesai = step >= stepCount;

  if (selesai) {
    return (
      <div className="w-full" aria-live="polite">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-line bg-surface p-8 shadow-xl shadow-stone-900/5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Sparkles className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Hasil untuk kamu
                </p>
                <p className="font-display text-lg font-semibold">{rekomendasi.ringkas}</p>
              </div>
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">
              {rekomendasi.judul}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {rekomendasi.poin.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-accent-soft/60 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                Langkah berikutnya
              </p>
              <ol className="mt-3 space-y-2">
                {rekomendasi.langkah.map((l, i) => (
                  <li key={l} className="flex items-center gap-3 text-sm font-semibold">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface text-xs font-bold tabular-nums text-accent-ink">
                      {i + 1}
                    </span>
                    {l}
                  </li>
                ))}
              </ol>
            </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link href="/kalkulator" className={btnPrimary}>
            <Wallet className="size-4" aria-hidden="true" />
            Hitung angsuran
          </Link>
          <Link href="/syarat" className={btnSecondary}>
            Cek kelayakan
          </Link>
        </div>
            <WhatsAppButton
              source="profil_completed"
              label="Tanya lanjutan via WhatsApp"
              pesan={`Halo, saya baru selesai mengisi "Profil Kamu" di AlurKPR (penghasilan ${label(profil.penghasilan)}, ${label(profil.pekerjaan)}, ${label(profil.skema)}). Rekomendasi awal: ${rekomendasi.ringkas}. Saya ingin konsultasi lanjutan.`}
            />
            <button
              type="button"
              onClick={() => setStep(0)}
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-sm font-bold text-ink-soft transition hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Ulangi dari awal
            </button>
          </div>
        </div>
      </div>
    );
  }

  const options = opsiUntuk(currentKey);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-ink-soft">
          Pertanyaan {step + 1} dari {stepCount}
        </p>
        <h2
          id={`pertanyaan-${step}`}
          aria-live="polite"
          className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
        >
          {pertanyaan[step].label}
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby={`pertanyaan-${step}`}>
          {options.map((o) => (
            <OptionButton
              key={o.key}
              label={o.label}
              sub={"sub" in o ? (o as { sub: string }).sub : undefined}
              aktif={profil[currentKey] === o.key}
              onClick={() => pilih(currentKey, o.key)}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali
            </button>
          ) : (
            <span />
          )}
          <span className="hidden text-xs text-ink-soft sm:block">
            Klik salah satu pilihan
          </span>
        </div>
      </div>
    </div>
  );
}

function label(k: string): string {
  const map: Record<string, string> = {
    "di-bawah-4": "di bawah Rp4 jt",
    "4-8": "Rp4–8 jt",
    "8-12": "Rp8–12 jt",
    "di-atas-12": "di atas Rp12 jt",
    karyawan: "karyawan tetap",
    wiraswasta: "wiraswasta",
    freelancer: "freelancer",
    ya: "ada cicilan lain",
    tidak: "tanpa cicilan lain",
    subsidi: "KPR subsidi",
    komersial: "KPR komersial",
    "belum-tahu": "belum tahu skema",
    sekitar: "target ~1 tahun",
    "1tahun": "target 1–3 tahun",
    lebih: "target >3 tahun",
  };
  return map[k] ?? k;
}

function opsiUntuk(key: keyof Profil) {
  switch (key) {
    case "penghasilan":
      return opsiPenghasilan;
    case "pekerjaan":
      return opsiPekerjaan;
    case "cicilanLain":
      return opsiCicilan;
    case "skema":
      return opsiSkema;
    case "timeline":
      return opsiTimeline;
  }
}

function OptionButton({
  label,
  sub,
  aktif,
  onClick,
}: {
  label: string;
  sub?: string;
  aktif: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={aktif}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition ${
        aktif
          ? "border-primary bg-primary-soft"
          : "border-line bg-surface hover:border-primary/40 hover:bg-paper"
      }`}
    >
      <span
        className={`grid size-5 shrink-0 place-items-center rounded-full border transition ${
          aktif ? "border-primary bg-primary text-white" : "border-line text-transparent"
        }`}
        aria-hidden="true"
      >
        <Check className="size-3" />
      </span>
      <span>
        <span className="block text-sm font-bold">{label}</span>
        {sub ? <span className="mt-0.5 block text-xs text-ink-soft">{sub}</span> : null}
      </span>
    </button>
  );
}