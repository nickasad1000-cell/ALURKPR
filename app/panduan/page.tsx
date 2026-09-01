import type { Metadata } from "next";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";
import { Container, SectionHeading } from "@/components/ui";
import { DaftarPanduan } from "@/components/daftar-panduan";

export const metadata: Metadata = {
  title: "Panduan KPR",
  description:
    "Panduan 8 tahap membeli rumah dengan KPR ditambah artikel mendalam tentang subsidi FLPP, KPR komersial, biaya awal, dan manajemen keuangan.",
  alternates: { canonical: "/panduan" },
};

export default function PanduanPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Perpustakaan panduan"
            title="Dari cek keuangan sampai kunci di tangan"
            description="Mulai dari alur 8 tahap yang runtut, lalu perdalam topik yang relevan dengan situasimu."
          />
        </Container>
      </section>

      <section className="mt-14">
        <Container>
          <DaftarPanduan tahap={tahapKpr} artikel={panduanArtikel} />
        </Container>
      </section>
    </>
  );
}