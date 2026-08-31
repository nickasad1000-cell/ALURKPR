import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  Wallet,
} from "lucide-react";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";
import { Container, Eyebrow, Breadcrumb } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/site";

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
  return {
    title: data.judul,
    description: data.ringkasan,
    alternates: { canonical: `/panduan/${slug}` },
  };
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.judul,
    description: artikel.ringkasan,
    datePublished: "2026-08-30",
    dateModified: "2026-08-30",
    inLanguage: "id-ID",
    author: { "@type": "Organization", name: "AlurKPR" },
    publisher: { "@type": "Organization", name: "AlurKPR", url: SITE_ORIGIN },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/panduan/${artikel.slug}`,
    },
  };
  return (
    <Container className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Panduan", item: `${SITE_ORIGIN}/panduan` },
              {
                "@type": "ListItem",
                position: 3,
                name: artikel.judul,
                item: `${SITE_ORIGIN}/panduan/${artikel.slug}`,
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Panduan", href: "/panduan" },
          { label: artikel.judul },
        ]}
      />
      <Link
        href="/panduan"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Semua panduan
      </Link>
      <article className="mx-auto mt-8 max-w-3xl">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-ink">
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

      <ArtikelTerkait currentSlug={artikel.slug} kategori={artikel.kategori} />
    </Container>
  );
}

function ArtikelTerkait({
  currentSlug,
  kategori,
}: {
  currentSlug: string;
  kategori: (typeof panduanArtikel)[number]["kategori"];
}) {
  const senada = panduanArtikel.filter((a) => a.kategori === kategori && a.slug !== currentSlug);
  const lain = panduanArtikel.filter((a) => a.kategori !== kategori && a.slug !== currentSlug);
  const terkait = [...senada, ...lain].slice(0, 3);
  if (terkait.length === 0) return null;
  return (
    <section aria-labelledby="artikel-terkait" className="mx-auto mt-14 max-w-3xl">
      <h2
        id="artikel-terkait"
        className="font-display text-xl font-semibold tracking-tight text-balance"
      >
        Artikel terkait
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {terkait.map((t) => (
          <Link
            key={t.slug}
            href={`/panduan/${t.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition hover:border-primary/40"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-accent-ink">
              {t.kategori}
            </span>
            <span className="mt-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
              {t.judul}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
              Baca
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TahapView({ slug }: { slug: string }) {
  const idx = tahapKpr.findIndex((t) => t.slug === slug);
  const tahap = tahapKpr[idx];
  const prev = idx > 0 ? tahapKpr[idx - 1] : null;
  const next = idx < tahapKpr.length - 1 ? tahapKpr[idx + 1] : null;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tahap.judul,
    description: tahap.ringkasan,
    step: tahap.penjelasan.map((langkah, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Langkah ${i + 1}`,
      text: langkah,
    })),
    inLanguage: "id-ID",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Panduan", item: `${SITE_ORIGIN}/panduan` },
      {
        "@type": "ListItem",
        position: 3,
        name: tahap.judul,
        item: `${SITE_ORIGIN}/panduan/${tahap.slug}`,
      },
    ],
  };

  return (
    <Container className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Panduan", href: "/panduan" },
          { label: tahap.judulSingkat },
        ]}
      />
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
                <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
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
                  <Wallet className="mt-0.5 size-[18px] shrink-0 text-accent-ink" aria-hidden="true" />
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
            <AlertTriangle className="size-5 text-accent-ink" aria-hidden="true" />
            Kesalahan umum
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.kesalahanUmum.map((k) => (
              <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <AlertTriangle className="mt-0.5 size-[18px] shrink-0 text-accent-ink" aria-hidden="true" />
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

      <section aria-labelledby="alat-bantu" className="mx-auto mt-12 max-w-3xl rounded-3xl bg-primary-soft p-7">
        <h2 id="alat-bantu" className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary-deep">
          <Calculator className="size-5 text-primary" aria-hidden="true" />
          Alat bantu terkait tahap ini
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link
            href="/kalkulator"
            className="rounded-2xl border border-primary/20 bg-surface p-4 transition hover:border-primary/40"
          >
            <p className="text-sm font-bold">Hitung angsuran</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Simulasi plafon, tenor & biaya awal.
            </p>
          </Link>
          <Link
            href="/mampu-beli"
            className="rounded-2xl border border-primary/20 bg-surface p-4 transition hover:border-primary/40"
          >
            <p className="text-sm font-bold">Kemampuan beli</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Harga rumah yang mampu kamu beli.
            </p>
          </Link>
          <Link
            href="/profil-kamu"
            className="rounded-2xl border border-primary/20 bg-surface p-4 transition hover:border-primary/40"
          >
            <p className="text-sm font-bold">Profil KPR</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Rekomendasi skema dalam 5 pertanyaan.
            </p>
          </Link>
        </div>
      </section>

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