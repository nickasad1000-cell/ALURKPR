import type { Metadata } from "next";
import { glosarium } from "@/content/glosarium";
import { Container, SectionHeading } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glosarium Istilah KPR",
  description:
    "Kamus istilah KPR dan properti dalam bahasa sederhana: plafon, tenor, BPHTB, PPJB, AJB, SHM, take over, dan lainnya.",
  alternates: { canonical: "/glosarium" },
};

export default function GlosariumPage() {
  const terurut = [...glosarium].sort((a, b) => a.istilah.localeCompare(b.istilah, "id"));

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosarium Istilah KPR",
    description: "Kamus istilah KPR dan properti dalam bahasa sederhana.",
    inLanguage: "id-ID",
    hasDefinedTerm: terurut.map((g) => ({
      "@type": "DefinedTerm",
      name: g.istilah,
      description: g.definisi,
      inLanguage: "id-ID",
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Glosarium", item: `${SITE_ORIGIN}/glosarium` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Kamus"
            title="Glosarium istilah KPR"
            description="Saat petugas bank bicara 'plafon' atau 'appraisal', kamu langsung paham. Cari istilah yang belum kamu kenal."
            align="center"
          />
        </Container>
      </section>
      <section className="mt-12">
        <Container size="narrow">
          <dl className="grid gap-4 sm:grid-cols-2">
            {terurut.map((g) => (
              <div
                key={g.istilah}
                className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition hover:border-primary/40"
              >
                <dt className="font-display text-base font-semibold text-primary-deep">
                  {g.istilah}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{g.definisi}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}