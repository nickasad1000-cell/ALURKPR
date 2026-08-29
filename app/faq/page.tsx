import type { Metadata } from "next";
import Script from "next/script";
import { Minus, Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pertanyaan yang Sering Diajukan (FAQ)",
  description:
    "Jawaban atas pertanyaan umum seputar KPR: subsidi FLPP, DP, biaya awal, take over, gagal bayar, dan cara memakai kalkulator.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: f.jawaban },
    })),
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang paling sering diajukan"
            description="Kumpulan jawaban ringkas. Kalau belum terjawab, gunakan pencarian hukum atau hubungi kami."
            align="center"
          />
        </Container>
      </section>
      <section className="mt-12">
        <Container className="mx-auto max-w-4xl">
          <div className="space-y-3">
            {faq.map((f, i) => (
              <details
                key={f.pertanyaan}
                className="group rounded-3xl border border-line bg-surface px-7 py-5 shadow-sm open:border-primary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h2 className="font-display text-base font-semibold leading-snug sm:text-lg">
                    <span className="mr-2 text-primary/50 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.pertanyaan}
                  </h2>
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
          </div>
        </Container>
      </section>
    </>
  );
}