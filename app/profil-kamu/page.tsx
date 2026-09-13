import type { Metadata } from "next";
import { ProfilKamu } from "@/components/profil-kamu";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Profil Kamu — Rekomendasi KPR dalam 5 Pertanyaan",
  description:
    "Jawab 5 pertanyaan singkat soal penghasilan, pekerjaan, dan target. Dapat rekomendasi skema KPR subsidi atau komersial yang cocok, plus langkah berikutnya.",
  alternates: { canonical: "/profil-kamu" },
};

export default function ProfilKamuPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <SectionHeading
          as="h1"
          eyebrow="Rekomendasi personal"
          title="Profil Kamu: mulai dari mana?"
          description="Bingung mulai dari subsidi atau komersial? Jawab 5 pertanyaan ini untuk menemukan skema yang paling sesuai dengan kondisimu."
          align="center"
        />
        <div className="mt-10">
          <ProfilKamu />
        </div>
      </Container>
    </section>
  );
}