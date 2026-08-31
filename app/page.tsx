import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Home as HomeIcon,
  Landmark,
  Percent,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  angsuranBulanan,
  biayaAwal,
  formatRupiah,
  totalPembayaran,
} from "@/lib/finance";
import { panduanArtikel } from "@/content/panduan";
import { Container, Eyebrow, SectionHeading, btnPrimary, btnSecondary } from "@/components/ui";
import { ProfilKamu } from "@/components/profil-kamu";
import { AlurJalur } from "@/components/alur-jalur";
import { BlokDemografis } from "@/components/blok-demografis";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_HARGA = 240_000_000;
const HERO_DP = 10;
const HERO_TENOR = 20;
const heroPlafon = Math.round(HERO_HARGA * (1 - HERO_DP / 100));
const heroAngsuran = angsuranBulanan(heroPlafon, 5, HERO_TENOR);
const heroTotal = totalPembayaran(heroPlafon, 5, HERO_TENOR);
const heroBiayaAwal = biayaAwal(HERO_HARGA, HERO_DP).total;

const fitur = [
  {
    icon: BookOpen,
    judul: "Panduan bertahap",
    teks: "8 tahap dari cek keuangan sampai kunci di tangan, lengkap dengan dokumen & estimasi waktu.",
  },
  {
    icon: Calculator,
    judul: "Simulasi jujur",
    teks: "Lihat angsuran, total bayar, dan bunga keseluruhan — bukan cuma promo bunga tahun pertama.",
  },
  {
    icon: Landmark,
    judul: "Banding kanal bank",
    teks: "Perbandingan subsidi FLPP vs komersial dan bunga indikatif beberapa bank penyalur.",
  },
  {
    icon: ShieldCheck,
    judul: "Pakar? Bukan — jelas & sederhana",
    teks: "Istilah berat dibimbing glosarium, sehingga kamu bicara pada level yang sama dengan petugas bank.",
  },
];

const artikelUnggulan = panduanArtikel.filter((a) =>
  ["kpr-subsidi-flpp", "perbedaan-kpr-subsidi-dan-komersial", "dp-dan-biaya-initial-kpr"].includes(a.slug),
);

export default function Home() {
  return (
    <>
      {/* Hero */}
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
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-soft">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              Edukasi KPR Indonesia · data indikatif 2026
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Rumah pertama itu mungkin, kalau alurnya kamu pahami dulu.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Pelan tapi pasti: cek kelayakan, hitung angsuran, bandingkan
              subsidi vs komersial, sampai tanda tangan akad. Semua dijelaskan
              langkah demi langkah dalam bahasa manusia.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/kalkulator" className={btnPrimary}>
                <Calculator className="size-4" aria-hidden="true" />
                Hitung angsuran
              </Link>
              <Link href="/syarat" className={btnSecondary}>
                Cek kelayakan FLPP
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft">
              <li className="flex items-center gap-1.5">
                <Percent className="size-4 text-primary" aria-hidden="true" />
                Bunga FLPP ± 5% flat
              </li>
              <li className="flex items-center gap-1.5">
                <Wallet className="size-4 text-primary" aria-hidden="true" />
                DP mulai 1%
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Gratis digunakan
              </li>
            </ul>
            <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">Harga subsidi berganti tiap tahun kalender.</span>{" "}
              Batas FLPP saat ini <span className="font-bold text-primary">Rp 166 jt</span> —
              cocokkan dulu dengan budget-mu sebelum memilih rumah.
            </p>
          </div>

          {/* Kartu simulasi hero */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Wireframe rumah blueprint */}
            <svg
              className="pointer-events-none absolute -right-8 -top-14 hidden w-64 text-primary/25 lg:block"
              viewBox="0 0 220 170"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M30 90 L110 30 L190 90" />
              <path d="M45 80 V155 H175 V80" />
              <path d="M88 155 V108 H132 V155" />
              <path d="M60 100 H82 V122 H60 Z" />
              <path d="M138 100 H160 V122 H138 Z" />
              <path d="M20 155 H200" strokeDasharray="6 5" />
              <path d="M110 30 V16" strokeDasharray="3 4" />
              <path d="M104 16 H116" />
              <path d="M30 208" />
              <path d="M45 168 H175" strokeDasharray="2 4" opacity="0.6" />
              <path d="M45 164 V172 M175 164 V172" opacity="0.6" />
            </svg>
            <div className="relative border border-line bg-surface p-7 shadow-xl shadow-stone-900/5">
              {/* Crosshair marks */}
              <span className="pointer-events-none absolute left-2.5 top-2.5 text-primary/35" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor"><path d="M8 0v16M0 8h16" /></svg>
              </span>
              <span className="pointer-events-none absolute right-2.5 top-2.5 text-primary/35" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor"><path d="M8 0v16M0 8h16" /></svg>
              </span>
              <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-px bg-primary/40" />
                <span className="h-px flex-1 bg-primary/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft/70">
                  Spec-01
                </span>
                <span className="h-px w-6 bg-primary/20" />
                <span className="h-2 w-px bg-primary/40" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink-soft">Simulasi contoh</p>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
                  FLPP 5% · 20 th
                </span>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Angsuran bulanan
                </p>
                <p className="mt-1 font-display text-4xl font-semibold tabular-nums text-primary sm:text-5xl">
                  {formatRupiah(heroAngsuran)}
                </p>
              </div>
              <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-ink-soft">Harga rumah</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">
                    {formatRupiah(HERO_HARGA)}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Uang muka</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">{HERO_DP}%</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Total bayar (20 th)</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">
                    {formatRupiah(heroTotal)}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Tenor</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">
                    {HERO_TENOR} tahun
                  </dd>
                </div>
              </dl>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 rounded-xl bg-primary-soft/60 px-4 py-3 text-sm">
                <span className="font-semibold text-primary-deep">Biaya awal (DP + biaya)</span>
                <span className="font-display text-lg font-semibold tabular-nums text-ink">
                  ± {formatRupiah(heroBiayaAwal)}
                </span>
              </p>
              <Link
                href="/kalkulator"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-deep"
              >
                Simulasikan milikmu
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Fitur */}
      <section className="border-y border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Kenapa AlurKPR"
            title="Yang membedakan panduan ini"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fitur.map((f) => (
              <div key={f.judul} className="rounded-3xl border border-line bg-paper p-6">
                <f.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-semibold">
                  {f.judul}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {f.teks}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Profil Kamu */}
      <section className="mt-20 sm:mt-24">
        <Container>
          <div className="grid gap-10 rounded-[2.5rem] border border-line bg-surface p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>Rekomendasi personal</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Tidak yakin mulai dari subsidi atau komersial?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                5 pertanyaan singkat cukup untuk mengarahkanmu ke skema yang
                paling sesuai penghasilan dan tujuanmu — lalu dapat langkah
                selanjutnya yang jelas.
              </p>
              <Link
                href="/profil-kamu"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-sm transition hover:bg-primary-deep"
              >
                Kenali profil KPR-mu
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-xs text-ink-soft">
                Simulasi kilat — tanpa daftar akun, tanpa data pribadi diminta.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
              <ProfilKamu />
            </div>
          </div>
        </Container>
      </section>

      {/* Alat perencanaan */}
      <section className="mt-20 sm:mt-24">
        <Container>
          <SectionHeading
            eyebrow="Alat perencanaan gratis"
            title="Lima alat untuk mulai merencanakan"
            description="Gunakan sesuai urutan: tahu kemampuan beli, bandingkan sewa vs beli, kumpulkan DP, hitung angsuran, lalu dapatkan rekomendasi skema."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                href: "/mampu-beli",
                icon: Percent,
                judul: "Kemampuan beli",
                teks: "Hitung harga rumah yang mampu kamu beli dari penghasilan.",
              },
              {
                href: "/planner-dp",
                icon: Wallet,
                judul: "Planner tabungan DP",
                teks: "Beres waktu menabung DP dan setoran bulanan yang dibutuhkan.",
              },
              {
                href: "/sewa-vs-beli",
                icon: HomeIcon,
                judul: "Sewa vs beli",
                teks: "Kapan membeli mulai lebih murah daripada menyewa.",
              },
              {
                href: "/kalkulator",
                icon: Calculator,
                judul: "Kalkulator KPR",
                teks: "Simulasi angsuran, total bayar, dan biaya awal sebelum akad.",
              },
              {
                href: "/profil-kamu",
                icon: Landmark,
                judul: "Profil Kamu",
                teks: "Rekomendasi skema subsidi atau komersial dalam 5 pertanyaan.",
              },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <t.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                  {t.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.teks}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Buka alat
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Jalur pengajuan KPR — diagram alur 8 tahap */}
      <AlurJalur />

      {/* Demografis & fakta KPR */}
      <section className="mt-20 sm:mt-24">
        <Container>
          <BlokDemografis />
        </Container>
      </section>

      {/* Artikel unggulan */}
      <section className="mt-20 sm:mt-24">
        <Container>
          <SectionHeading
            eyebrow="Baca selanjutnya"
            title="Tiga topik yang paling sering dicari"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {artikelUnggulan.map((a) => (
              <Link
                key={a.slug}
                href={`/panduan/${a.slug}`}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-ink">
                  {a.kategori}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                  {a.judul}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {a.ringkasan}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Baca selengkapnya
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="mt-20 sm:mt-24">
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
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <Eyebrow>
                  <span className="text-white/80">Mulai dari menghitung</span>
                </Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Coba kalkulatornya, lalu cek apakah kamu lolos syarat FLPP.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                  Simulasi angsuran dan biaya awal dalam hitungan detik, plus
                  pemeriksaan kelayakan sesuai aturan subsidi pemerintah.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href="/kalkulator"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary-deep transition hover:bg-accent-soft"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Buka kalkulator
                </Link>
                <Link
                  href="/syarat"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Cek kelayakan
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}