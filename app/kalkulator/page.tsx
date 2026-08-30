import type { Metadata } from "next";
import { getBankRates } from "@/lib/bank-rates";
import { Kalkulator } from "@/components/kalkulator";
import { Container, SectionHeading } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kalkulator KPR & Biaya Awal",
  description:
    "Simulasikan angsuran KPR subsidi dan komersial: plafon, angsuran, total pembayaran, hingga rincian biaya awal sebelum akad.",
};

export default async function KalkulatorPage() {
  const rates = await getBankRates();
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Simulasi"
          title="Kalkulator KPR & biaya awal"
          description="Geser angka kebutuhanmu dan lihat angsuran, total bayar, bunga keseluruhan, sampai perkiraan dana awal yang harus disiapkan."
          align="center"
        />
        <div className="mt-10">
          <Kalkulator rates={rates} />
        </div>
      </Container>
    </section>
  );
}