import type { Metadata } from "next";
import { panduanArtikel } from "@/content/panduan";
import { Container, SectionHeading } from "@/components/ui";
import { DaftarPanduan } from "@/components/daftar-panduan";

export const metadata: Metadata = {
  title: "Panduan KPR",
  description:
    "Artikel mendalam tentang subsidi FLPP, KPR komersial, biaya awal, dan manajemen keuangan. Ikuti 8 tahap KPR di halaman Perjalanan.",
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
          <DaftarPanduan artikel={panduanArtikel} />
        </Container>
      </section>
    </>
  );
}