import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Scale,
  Wallet,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Alat & Kalkulator KPR",
  description:
    "Semua alat AlurKPR dalam satu tempat: kalkulator angsuran, kemampuan beli, rencana tabungan DP, sewa vs beli, dan checklist dokumen — tiap alat untuk satu keputusan.",
  alternates: { canonical: "/alat" },
};

const alat = [
  {
    icon: Calculator,
    href: "/kalkulator",
    judul: "Kalkulator KPR",
    teks: "Angsuran, total bayar, dan biaya awal dari harga serta tenor yang kamu pilih.",
  },
  {
    icon: Wallet,
    href: "/kalkulator?mode=income",
    judul: "Kemampuan beli",
    teks: "Batas harga rumah yang aman dari penghasilanmu — angsuran maksimal 30% DBR.",
  },
  {
    icon: Scale,
    href: "/alat/planner-dp",
    judul: "Rencana tabungan DP",
    teks: "Berapa lama menabung untuk DP, atau berapa setoran per bulan agar target tercapai.",
  },
  {
    icon: FileCheck2,
    href: "/alat/sewa-vs-beli",
    judul: "Sewa vs beli",
    teks: "Tahun impas (break-even) membeli versus menyewa dari skenariomu sendiri.",
  },
  {
    icon: ClipboardCheck,
    href: "/checklist",
    judul: "Checklist dokumen",
    teks: "Siapkan dokumen per tahap, centang progres, cetak untuk dibawa ke bank.",
  },
];

export default function AlatPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Satu keputusan per alat"
          title="Alat & kalkulator KPR"
          description="Semua alat di sini menjawab satu pertanyaan saja. Masukkan angkamu, dapatkan jawabannya — lalu lanjut ke tahap berikutnya di Perjalanan."
          align="center"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {alat.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex items-start gap-5 rounded-3xl border border-line bg-surface p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft">
                <a.icon className="size-6 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="font-display text-lg font-semibold group-hover:text-primary">
                  {a.judul}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{a.teks}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Buka alat
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-xs leading-relaxed text-ink-soft">
          Semua hasil bersifat indikatif dan bergantung pada asumsi suku bunga
          serta kebijakan terkini. Konfirmasi angka final ke bank penyalur atau
          BP Tapera sebelum mengambil keputusan.
        </p>
      </Container>
    </section>
  );
}