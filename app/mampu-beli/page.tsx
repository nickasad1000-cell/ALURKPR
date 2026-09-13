import type { Metadata } from "next";
import { MampuBeli } from "@/components/mampu-beli";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kalkulator Kemampuan Beli Rumah",
  description:
    "Hitung berapa harga rumah yang mampu kamu beli berdasarkan penghasilan, cicilan lain, DP, tenor, dan bunga. Acuan indikatif untuk merencanakan KPR.",
  alternates: { canonical: "/mampu-beli" },
};

export default function MampuBeliPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Mulai dari kemampuan"
          title="Berapa harga rumah yang mampu kamu beli?"
          description="Alat ini membalik prosesnya: dari penghasilan dan beban cicilan, kita cari tahu kisaran harga rumah terbaik untukmu — bukan sebaliknya."
          align="center"
        />
        <div className="mt-10">
          <MampuBeli />
        </div>
      </Container>
    </section>
  );
}
