import type { Metadata } from "next";
import { PlannerDp } from "@/components/planner-dp";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Planner Tabungan DP Rumah",
  description:
    "Rencanakan tabungan uang muka (DP) rumah: berapa lama menabung dengan setoran tertentu, atau berapa setoran per bulan agar DP tercapai dalam waktu yang kamu tentukan.",
  alternates: { canonical: "/planner-dp" },
};

export default function PlannerDpPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Menabung dulu"
          title="Berapa waktu yang dibutuhkan untuk mengumpulkan DP?"
          description="Masukkan target harga, persentase DP, dan tabunganmu. Alat ini menghitung berapa lama waktu yang dibutuhkan — atau berapa setoran per bulan agar target tercapai."
          align="center"
        />
        <div className="mt-10">
          <PlannerDp />
        </div>
      </Container>
    </section>
  );
}