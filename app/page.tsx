import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Wallet,
  BookOpen,
  Landmark,
} from "lucide-react";
import { Container, Eyebrow, btnPrimary, btnSecondary } from "@/components/ui";
import { KemampuanRingkas } from "@/components/kemampuan-ringkas";
import { AlurJalur } from "@/components/alur-jalur";
import { panduanArtikel } from "@/content/panduan";
import { FAKTA } from "@/lib/fakta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const posisiSekarang = [
  {
    href: "/perjalanan/01-keuangan",
    label: "Baru mulai dari nol",
    keterangan: "Mulai dari siapkan keuangan",
  },
  {
    href: "/perjalanan/03-skema",
    label: "Masih riset skema",
    keterangan: "Subsidi vs komersial, pilih rute",
  },
  {
    href: "/perjalanan/05-dana-dokumen",
    label: "Siap ajukan ke bank",
    keterangan: "Lengkapi dana & dokumen",
  },
  {
    href: "/perjalanan/06-analisis-appraisal",
    label: "Sedang diproses bank",
    keterangan: "Analisis kredit & appraisal",
  },
  {
    href: "/perjalanan#setelah-kunci",
    label: "Kunci sudah di tangan",
    keterangan: "Kelola cicilan & rumah",
  },
];

const slideUnggulan = ["kpr-subsidi-flpp", "kpr-komersial", "dp-dan-biaya-initial-kpr"];

function PosisiSekarang() {
  return (
    <div className="mt-9 rounded-3xl border border-line bg-surface/80 p-6">
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-bold text-ink">Kamu sekarang di mana?</h2>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Lanjut dari posisimu — bukan ulang dari awal.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {posisiSekarang.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-primary/40 hover:text-primary"
            >
              {p.label}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const unggulan = slideUnggulan
    .map((slug) => panduanArtikel.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      {/* Hero — journey-entry */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(11 107 79 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 107 79 / 0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(50rem 26rem at 85% -10%, rgba(11,107,79,0.10), transparent), radial-gradient(36rem 22rem at 5% 110%, rgba(201,154,60,0.08), transparent)",
          }}
        />
        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2" aria-hidden="true">
              <svg viewBox="0 0 80 60" className="h-12 w-auto text-primary/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 35 L40 10 L75 35" />
                <path d="M15 30 V55 H65 V30" />
                <path d="M35 55 V40 H45 V55" />
                <path d="M25 38 H33 V46 H25 Z" />
                <path d="M47 38 H55 V46 H47 Z" />
                <path d="M5 55 H75" strokeDasharray="4 3" />
              </svg>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-soft">
                <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                Edukasi KPR Indonesia · data indikatif 2026
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
              Mau beli rumah dengan KPR?{" "}
              <span className="text-primary">Mulai dari sini.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Ikuti 8 tahap — dari siapkan keuangan sampai kunci di tangan.
              Satu keputusan per layar, angka dengan sumber, tanpa jargon.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/perjalanan" className={btnPrimary}>
                Mulai perjalanan
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/syarat" className={btnSecondary}>
                Cek kelayakan FLPP
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
                Tanpa daftar akun
              </li>
              <li className="flex items-center gap-1.5">
                <Wallet className="size-4 text-primary" aria-hidden="true" />
                Gratis digunakan
              </li>
              <li className="flex items-center gap-1.5">
                <Landmark className="size-4 text-primary" aria-hidden="true" />
                Bunga FLPP {FAKTA.bungaFlpp.nilai}% flat
              </li>
            </ul>
            <PosisiSekarang />
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <KemampuanRingkas />
          </div>
        </Container>
      </section>

      {/* Peta 8 tahap */}
      <AlurJalur />

      {/* 3 panduan unggulan */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Baca dulu</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Tiga hal yang paling sering ditanyakan
              </h2>
            </div>
            <Link href="/panduan" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep">
              Semua panduan
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {unggulan.map((a) => (
              <Link
                key={a.slug}
                href={`/panduan/${a.slug}`}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <BookOpen className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                  {a.judul}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {a.ringkasan}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Baca panduan
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA journey akhir */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-deep px-7 py-14 text-white sm:px-14">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(36rem 24rem at 85% -20%, rgba(11,107,79,0.9), transparent), radial-gradient(24rem 20rem at 0% 120%, rgba(201,154,60,0.35), transparent)",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <Eyebrow>
                  <span className="text-white/80">8 tahap menuju kunci</span>
                </Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Tahap 1: siapkan keuangan dulu.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                  Sebelum riset rumah, tahu dulu posisi keuanganmu — berapa
                  cicilan yang aman, dan apakah kamu masuk kategori subsidi.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href="/perjalanan/01-keuangan"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary-deep transition hover:bg-accent-soft"
                >
                  Mulai dari Tahap 1
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/perjalanan"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Lihat semua tahap
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}