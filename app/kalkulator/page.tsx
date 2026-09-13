import type { Metadata } from "next";
import { Suspense } from "react";
import { getBankRates } from "@/lib/bank-rates";
import { Kalkulator, KalkulatorWithDp } from "@/components/kalkulator";
import { Container, SectionHeading } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kalkulator KPR & Biaya Awal",
  description:
    "Simulasikan angsuran KPR subsidi dan komersial dari harga rumah atau dari penghasilan: plafon, angsuran, total bayar, hingga rincian biaya awal sebelum akad.",
  alternates: { canonical: "/kalkulator" },
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
          description="Mulai dari harga rumah atau dari penghasilanmu: lihat angsuran, total bayar, bunga keseluruhan, sampai perkiraan dana awal yang harus disiapkan."
          align="center"
        />
        <div className="mt-10">
          <Suspense fallback={<Kalkulator rates={rates} initialDp={10} />}>
            <KalkulatorWithDp rates={rates} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}