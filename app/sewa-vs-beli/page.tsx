import type { Metadata } from "next";
import { RentVsBeli } from "@/components/rent-vs-beli";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Bandingkan Sewa vs Beli Rumah",
  description:
    "Bandingkan akumulasi biaya menyewa versus membeli rumah dengan KPR. Temukan tahun impas (break-even) dari skenariomu sendiri.",
  alternates: { canonical: "/sewa-vs-beli" },
};

export default function SewaVsBeliPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Keputusan besar"
          title="Sewa dulu atau langsung beli?"
          description="Bandingkan total uang yang kamu keluarkan untuk menyewa versus mencicil KPR. Lihat di tahun berapa membeli mulai lebih murah — dan sisanya kembali ke prioritasmu."
          align="center"
        />
        <div className="mt-10">
          <RentVsBeli />
        </div>
      </Container>
    </section>
  );
}