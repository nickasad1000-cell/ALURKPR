import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  Wallet,
} from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";
import { Container, Eyebrow } from "@/components/ui";

type Params = Promise<{ slug: string }>;

function cariKonten(slug: string) {
  const tahap = tahapKpr.find((t) => t.slug === slug);
  if (tahap) return { jenis: "tahap" as const, data: tahap };
  const artikel = panduanArtikel.find((a) => a.slug === slug);
  if (artikel) return { jenis: "artikel" as const, data: artikel };
  return null;
}

export async function generateStaticParams() {
  return [
    ...tahapKpr.map((t) => ({ slug: t.slug })),
    ...panduanArtikel.map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const konten = cariKonten(slug);
  if (!konten) return { title: "Panduan tidak ditemukan" };
  const data = konten.data as { judul: string; ringkasan: string };
  return { title: data.judul, description: data.ringkasan };
}

export default async function PanduanDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const konten = cariKonten(slug);
  if (!konten) notFound();

  if (konten.jenis === "artikel") {
    return <ArtikelView artikel={konten.data} />;
  }

  return <TahapView slug={slug} />;
}

function ArtikelView({ artikel }: { artikel: (typeof panduanArtikel)[number] }) {
  return (
    <Container className="py-14 sm:py-20">
      <Link
        href="/panduan"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Semua panduan
      </Link>
      <article className="mx-auto mt-8 max-w-3xl">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
          {artikel.kategori}
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          {artikel.judul}
        </h1>
        <p className="mt-5 border-l-2 border-primary pl-5 text-lg leading-relaxed text-ink-soft">
          {artikel.ringkasan}
        </p>
        <div className="mt-10 space-y-5">
          {artikel.isi.map((paragraf, i) => (
            <p key={i} className="text-base leading-relaxed text-ink sm:text-lg">
              {paragraf}
            </p>
          ))}
        </div>
      </article>
      <nav className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link
          href="/kalkulator"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-deep"
        >
          <Wallet className="size-4" aria-hidden="true" />
          Hitung angsuran
        </Link>
        <Link
          href="/panduan"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
        >
          Lanjut membaca panduan
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </nav>
    </Container>
  );
}

function TahapView({ slug }: { slug: string }) {
  const idx = tahapKpr.findIndex((t) => t.slug === slug);
  const tahap = tahapKpr[idx];
  const prev = idx > 0 ? tahapKpr[idx - 1] : null;
  const next = idx < tahapKpr.length - 1 ? tahapKpr[idx + 1] : null;

  return (
    <Container className="py-14 sm:py-20">
      <Link
        href="/panduan"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Semua panduan
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        <Eyebrow>Panduan · Tahap {tahap.nomor} dari 8</Eyebrow>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          {tahap.judul}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{tahap.ringkasan}</p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <Clock className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
              Estimasi waktu
            </p>
            <p className="mt-1 text-sm font-semibold">{tahap.estimasiWaktu}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <FileText className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
              Dokumen
            </p>
            <p className="mt-1 text-sm font-semibold">{tahap.dokumen.length} dokumen utama</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <Wallet className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
              Biaya terkait
            </p>
            <p className="mt-1 text-sm font-semibold">{tahap.biayaTerkait.length} pos biaya</p>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          {tahap.penjelasan.map((paragraf, i) => (
            <p key={i} className="text-base leading-relaxed text-ink sm:text-lg">
              {paragraf}
            </p>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-line bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <FileText className="size-5 text-primary" aria-hidden="true" />
            Dokumen yang perlu disiapkan
          </h2>
          <ul className="mt-5 space-y-2.5">
            {tahap.dokumen.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        {tahap.biayaTerkait.length > 0 ? (
          <section className="mt-6 rounded-3xl border border-line bg-surface p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <Wallet className="size-5 text-primary" aria-hidden="true" />
              Biaya terkait di tahap ini
            </h2>
            <ul className="mt-5 space-y-2.5">
              {tahap.biayaTerkait.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                  <Wallet className="mt-0.5 size-4.5 shrink-0 text-accent" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-6 rounded-3xl bg-primary-soft p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary-deep">
            <Lightbulb className="size-5 text-primary" aria-hidden="true" />
            Tips agar mulus
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl bg-accent-soft/70 p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
            <AlertTriangle className="size-5 text-accent" aria-hidden="true" />
            Kesalahan umum
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.kesalahanUmum.map((k) => (
              <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <AlertTriangle className="mt-0.5 size-4.5 shrink-0 text-accent" aria-hidden="true" />
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-primary/25 bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <Building2 className="size-5 text-primary" aria-hidden="true" />
            Beda di skema subsidi vs komersial
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{tahap.perbedaanSubsidi}</p>
        </section>
      </article>

      <nav className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/panduan/${prev.slug}`}
            className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 transition hover:border-primary/40"
          >
            <ArrowLeft className="mt-0.5 size-5 shrink-0 text-primary transition group-hover:-translate-x-0.5" aria-hidden="true" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                Tahap sebelumnya
              </span>
              <span className="mt-1 block text-sm font-semibold">{prev.judulSingkat}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/panduan/${next.slug}`}
            className="group flex items-start justify-end gap-3 rounded-2xl border border-line bg-surface p-5 text-right transition hover:border-primary/40"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                Tahap berikutnya
              </span>
              <span className="mt-1 block text-sm font-semibold">{next.judulSingkat}</span>
            </span>
            <ArrowRight className="mt-0.5 size-5 shrink-0 text-primary transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ) : null}
      </nav>
    </Container>
  );
}