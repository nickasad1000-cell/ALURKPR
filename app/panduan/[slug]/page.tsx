import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { panduanArtikel } from "@/content/panduan";
import { Container, Breadcrumb } from "@/components/ui";
import { SITE_ORIGIN, RIVISI } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return panduanArtikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const artikel = panduanArtikel.find((a) => a.slug === slug);
  if (!artikel) return { title: "Panduan tidak ditemukan" };
  return {
    title: artikel.judul,
    description: artikel.ringkasan,
    alternates: { canonical: `/panduan/${slug}` },
  };
}

export default async function PanduanArtikelPage({ params }: { params: Params }) {
  const { slug } = await params;
  const artikel = panduanArtikel.find((a) => a.slug === slug);
  if (!artikel) notFound();

  return <ArtikelView artikel={artikel} />;
}

function ArtikelView({ artikel }: { artikel: (typeof panduanArtikel)[number] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.judul,
    description: artikel.ringkasan,
    datePublished: "2026-08-30",
    dateModified: RIVISI,
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-ink">
            {artikel.kategori}
          </span>
          <span className="text-xs font-semibold text-ink-soft">
            Terakhir diperbarui: {new Date(`${RIVISI}T00:00:00`).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
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
        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-accent-soft/60 p-5 text-sm leading-relaxed text-ink-soft">
          <AlertTriangle className="size-5 shrink-0 text-accent-ink" aria-hidden="true" />
          <span>
            Angka bunga, plafon, dan batas penghasilan dapat berubah mengikuti
            kebijakan. Verifikasi ke BP Tapera dan bank penyalur sebelum
            mengajukan.
          </span>
        </div>
      </article>
      <nav className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link
          href="/perjalanan"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-deep"
        >
          <Wallet className="size-4" aria-hidden="true" />
          Ikuti alur 8 tahap
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