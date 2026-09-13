import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  CircleAlert,
  Landmark,
  ListChecks,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Container, Eyebrow, btnPrimary } from "@/components/ui";
import { KemampuanRingkas } from "@/components/kemampuan-ringkas";
import { AlurJalur } from "@/components/alur-jalur";
import { LanjutPerjalanan } from "@/components/lanjut-perjalanan";
import { panduanArtikel } from "@/content/panduan";
import { FAKTA, sumberFakta } from "@/lib/fakta";
import { hargaMaksimalMampu } from "@/lib/finance";
import { formatRupiah } from "@/lib/finance";
import { DISCLOSURE } from "@/lib/brand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const quickStart = [
  {
    href: "/perjalanan/01-keuangan",
    label: "Baru mulai dari nol",
    keterangan: "Mulai dari siapkan keuangan",
  },
  {
    href: "/perjalanan/02-kemampuan-target",
    label: "Sudah tahu kisaran rumah",
    keterangan: "Kalkulasi rentang harga yang masuk akal",
  },
  {
    href: "/perjalanan/05-dana-dokumen",
    label: "Sudah menemukan rumah",
    keterangan: "Siapkan dana, dokumen, dan ajukan",
  },
];

const slideUnggulan = ["kpr-subsidi-flpp", "kpr-komersial", "dp-dan-biaya-initial-kpr"];

const redFlag = [
  {
    href: "/perjalanan/01-keuangan",
    judul: "Data tidak konsisten antar dokumen",
    isi: "Nama, penghasilan, atau alamat beda di KTP, slip gaji, dan rekening — sering jadi alasan kredit ditolak.",
  },
  {
    href: "/kalkulator",
    judul: "Dana awal di luar DP tidak dihitung",
    isi: "BPHTB, notaris, provisi, dan asuransi sering dilupakan — siapkan buffernya sejak awal.",
  },
  {
    href: "/syarat",
    judul: "Booking unit sebelum cek legalitas",
    isi: "Pastikan status lahan dan perizinan pengembang jelas sebelum menyerahkan uang booking.",
  },
];

const alatInti = [
  {
    href: "/kalkulator",
    ikon: Calculator,
    judul: "Simulasi KPR",
    isi: "Angsuran, tenor, dan plafon — termasuk skenario subsidi dan komersial.",
  },
  {
    href: "/checklist",
    ikon: ListChecks,
    judul: "Checklist dokumen",
    isi: "Dokumen per tahap, bisa diceklis dan disimpan di perangkatmu.",
  },
];

/** Angka perkiraan statis hero — asumsi 8 jt/bulan & FLPP 5% flat. */
const PERKIRAAN = (() => {
  const penghasilan = 8_000_000;
  const dbr = Number(FAKTA.dbrSaran.nilai);
  const dp = Number(FAKTA.dpFlpp.nilai);
  const bunga = Number(FAKTA.bungaFlpp.nilai);
  const angsuranAman = Math.round((penghasilan * dbr) / 100);
  const hasil = hargaMaksimalMampu({
    penghasilanBulanan: penghasilan,
    cicilanLainBulanan: 0,
    dbrPersen: dbr,
    dpPersen: dp,
    tenorTahun: 20,
    bungaTahunanPersen: bunga,
    skema: "flat",
  });
  const danaAwal = Math.round(
    hasil.hargaMaksimal * (dp / 100) + hasil.plafonMaksimal * 0.01,
  );
  return { angsuranAman, hargaMaksimal: hasil.hargaMaksimal, danaAwal };
})();

function QuickStart() {
  return (
    <div className="mt-9 rounded-3xl border border-line bg-surface/80 p-6">
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-bold text-ink">Kamu di tahap mana?</h2>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Pilih posisimu — lanjut dari sana, bukan dari nol.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {quickStart.map((q) => (
          <li key={q.href}>
            <Link
              href={q.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-sm transition hover:border-primary/40 hover:text-primary"
            >
              <span>
                <span className="block font-semibold text-ink group-hover:text-primary">
                  {q.label}
                </span>
                <span className="block text-xs text-ink-soft">{q.keterangan}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AngkaPerkiraan() {
  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-display text-xl font-semibold text-ink">
          Angka perkiraan
        </h2>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-danger">
          perkiraan
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Penghasilan 8 juta/bulan, FLPP {FAKTA.bungaFlpp.nilai}% flat, DP{" "}
        {FAKTA.dpFlpp.nilai}%, tenor 20 tahun (asumsi), tanpa cicilan lain.
      </p>
      <dl className="mt-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm text-ink-soft">Angsuran aman</dt>
          <dd className="text-right">
            <p className="font-display text-2xl font-semibold text-ink">
              {formatRupiah(PERKIRAAN.angsuranAman)}
            </p>
            <p className="text-xs text-ink-soft">per bulan ({FAKTA.dbrSaran.nilai}% dari penghasilan)</p>
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm text-ink-soft">Kisaran harga rumah</dt>
          <dd className="text-right">
            <p className="font-display text-2xl font-semibold text-primary">
              {formatRupiah(PERKIRAAN.hargaMaksimal)}
            </p>
            <p className="text-xs text-ink-soft">maksimal, FLPP 5% flat · tenor 20 th (asumsi)</p>
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm text-ink-soft">Dana awal disiapkan</dt>
          <dd className="text-right">
            <p className="font-display text-2xl font-semibold text-ink">
              {formatRupiah(PERKIRAAN.danaAwal)}
            </p>
            <p className="text-xs text-ink-soft">perkiraan FLPP: DP 1% + provisi 1%</p>
          </dd>
        </div>
      </dl>
      <p className="mt-6 text-xs leading-relaxed text-ink-soft">
        {sumberFakta(FAKTA.bungaFlpp)}
      </p>
      <Link
        href="/kalkulator?mode=income"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
      >
        Atur sendiri di kalkulator
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
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
            <div className="mt-8">
              <Link href="/perjalanan" className={btnPrimary}>
                Mulai perjalanan
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <p className="mt-3 inline-flex items-center gap-x-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft" aria-hidden="true">
                Keuangan
                <ArrowRight className="size-3" />
                Rumah
                <ArrowRight className="size-3" />
                KPR
                <ArrowRight className="size-3" />
                Akad
                <ArrowRight className="size-3" />
                Kunci
              </p>
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
            <QuickStart />
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <AngkaPerkiraan />
          </div>
        </Container>
      </section>

      {/* Lanjutkan perjalanan — progres tersimpan */}
      <section className="mt-2">
        <Container>
          <LanjutPerjalanan />
        </Container>
      </section>

      {/* Peta 8 tahap */}
      <AlurJalur />

      {/* Alat inti — maks 3 */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Alat</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Alat inti — tiga alat yang paling sering dipakai
            </h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <KemampuanRingkas />
            </div>
            <div className="flex flex-col gap-4">
              {alatInti.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex flex-1 flex-col justify-between rounded-3xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div>
                    <a.ikon className="size-6 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-primary">
                      {a.judul}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.isi}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Buka alat
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

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
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary">
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

      {/* Red flags — hal yang bikin pengajuan gagal */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Sebelum ajukan</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Tiga hal yang biasanya bikin pengajuan gagal
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {redFlag.map((r) => (
              <Link
                key={r.href + r.judul}
                href={r.href}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-7 transition hover:-translate-y-0.5 hover:border-danger/60 hover:shadow-md"
              >
                <CircleAlert className="size-6 text-danger" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-danger">
                  {r.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.isi}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-danger">
                  Hindari — cek caranya
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust + CTA journey akhir */}
      <section className="mt-20 sm:mt-28">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-soft">
              Sumber: BP Tapera · Kementerian PKP · Kepmen 1722
            </span>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-soft">
              Dicek 6 Agustus 2026
            </span>
          </div>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {DISCLOSURE}
          </p>
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
                  Mulai dari Tahap 1: siapkan keuangan.
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