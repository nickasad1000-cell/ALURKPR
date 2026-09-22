import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MessageCircle,
  Minus,
  Percent,
  Plus,
  Wallet,
} from "lucide-react";
import {
  angsuranBulanan,
  biayaAwal,
  formatRupiah,
} from "@/lib/finance";
import { FAKTA } from "@/lib/fakta";
import { hargaMaksUntukZona } from "@/lib/zona";
import { faq } from "@/content/faq";
import { WA_PESAN_UMUM } from "@/lib/brand";
import { Container, Eyebrow, SectionHeading, btnPrimary, btnSecondary, btnTertiary } from "@/components/ui";
import { ProfilKamu } from "@/components/profil-kamu";
import { AlurJalur } from "@/components/alur-jalur";
import { BlokDemografis } from "@/components/blok-demografis";
import { GaleriRumah } from "@/components/galeri-rumah";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_HARGA = hargaMaksUntukZona(1);
const HERO_DP = Number(FAKTA.dpFlpp.nilai);
const HERO_TENOR = 20;
const heroPlafon = Math.round(HERO_HARGA * (1 - HERO_DP / 100));
const heroAngsuran = angsuranBulanan(heroPlafon, Number(FAKTA.bungaFlpp.nilai), HERO_TENOR);
const heroBiayaAwalJt = (
  biayaAwal(HERO_HARGA, HERO_DP).total / 1_000_000
).toLocaleString("id-ID", { maximumFractionDigits: 1 });

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
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Rumah pertama itu mungkin, kalau alurnya kamu pahami dulu.
              </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Hitung angsuran, cek kelayakan subsidi, dan bandingkan skema KPR
              lebih dulu — sebelum janjian ke bank. Langkah demi langkah, dalam
              bahasa yang tidak bikin kepala pusing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/kalkulator" className={btnPrimary}>
                <Calculator className="size-4" aria-hidden="true" />
                Hitung angsuran
              </Link>
              <Link href="/syarat" className={btnSecondary}>
                Cek kelayakan FLPP
              </Link>
              <Link
                href="/panduan/tahap-1-cek-keuangan-dan-kelayakan"
                className={btnTertiary}
              >
                Baru mulai dari nol? Baca Tahap 1 dulu
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft">
              <li className="flex items-center gap-1.5">
                <Percent className="size-4 text-primary" aria-hidden="true" />
                Bunga FLPP ± {FAKTA.bungaFlpp.nilai}% flat
              </li>
              <li className="flex items-center gap-1.5">
                <Wallet className="size-4 text-primary" aria-hidden="true" />
                DP mulai {FAKTA.dpFlpp.nilai}%
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Gratis digunakan
              </li>
            </ul>
            <p className="mt-5 text-sm text-ink-soft">
              Atau kalau masih bingung dari mana mulai,{" "}
              <WhatsAppLink
                source="hero"
                pesan={WA_PESAN_UMUM}
                className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-4 transition hover:text-primary-deep"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                tanya langsung di WhatsApp
              </WhatsAppLink>
              .
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
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Spec-01
                </span>
                <span className="h-px w-6 bg-primary/20" />
                <span className="h-2 w-px bg-primary/40" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink-soft">Simulasi contoh</p>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep">
                  FLPP {FAKTA.bungaFlpp.nilai}% · {HERO_TENOR} th (asumsi)
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
              <dl className="mt-7 grid grid-cols-3 gap-2 border-t border-line pt-6 text-sm sm:gap-4">
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
                  <dt className="text-ink-soft">Tenor</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">
                    {HERO_TENOR} tahun
                  </dd>
                </div>
              </dl>
              <p className="mt-5 rounded-xl bg-primary-soft/60 px-4 py-3 text-sm leading-relaxed">
                <span className="font-semibold text-primary-deep">
                  Yang dibayar di muka cuma booking fee ±Rp100 rb–1 jt untuk
                  mengunci unit.
                </span>{" "}
                DP dan biaya akad (±Rp{heroBiayaAwalJt} jt pada contoh ini) baru dibayar
                saat proses lanjut —{" "}
                <Link
                  href="/panduan/dp-dan-biaya-initial-kpr"
                  className="font-bold text-primary underline underline-offset-2 hover:text-primary-deep"
                >
                  lihat rinciannya
                </Link>
                .
              </p>
              <Link href="/kalkulator" className={`${btnSecondary} mt-7 w-full`}>
                Simulasikan milikmu
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Alur pengajuan KPR — diagram alur 8 tahap */}
      <AlurJalur />
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="grid gap-10 rounded-[2.5rem] border border-line bg-surface p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>Rekomendasi personal</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Subsidi atau komersial?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                5 pertanyaan untuk tahu skema KPR yang cocok — subsidi atau
                komersial — plus langkah berikutnya.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
              <ProfilKamu />
              <p className="mt-6 border-t border-line pt-4 text-center text-xs leading-relaxed text-ink-soft">
                Butuh versi layar penuh?{" "}
                <Link
                  href="/profil-kamu"
                  className="font-bold text-primary underline underline-offset-2 hover:text-primary-deep"
                >
                  Buka di halaman Profil Kamu
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Jalur pengajuan KPR — diagram alur 8 tahap */}
      <AlurJalur />

      {/* Demografis & fakta KPR */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <BlokDemografis />
        </Container>
      </section>

      {/* Galeri rumah nyata dari pengembang */}
      <GaleriRumah />

      {/* Tanya populer */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Pertanyaan yang paling sering muncul"
              description="Jawaban singkat; rincian lebih lanjut di halaman FAQ."
            />
            <div className="space-y-3">
              {faq.slice(0, 3).map((f) => (
                <details
                  key={f.pertanyaan}
                  className="group rounded-3xl border border-line bg-surface px-6 py-5 shadow-sm open:border-primary/40 sm:px-7"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="font-display text-base font-semibold leading-snug sm:text-lg">
                      {f.pertanyaan}
                    </h3>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition group-open:hidden">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                    <span className="hidden size-7 shrink-0 place-items-center rounded-full border border-primary bg-primary-soft text-primary transition group-open:grid">
                      <Minus className="size-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {f.jawaban}
                  </p>
                </details>
              ))}
              <Link href="/faq" className={btnSecondary}>
                Lihat semua pertanyaan di halaman FAQ
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA banner */}
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