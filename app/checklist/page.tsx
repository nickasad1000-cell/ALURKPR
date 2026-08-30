import type { Metadata } from "next";
import { ChecklistDokumen } from "@/components/checklist-dokumen";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Checklist Dokumen KPR",
  description:
    "Ceklis interaktif dokumen pengajuan KPR per tahap, tersimpan otomatis di perangkatmu, lengkap dengan tombol cetak. Jangan sampai berkas kurang saat bank memintanya.",
  alternates: { canonical: "/checklist" },
};

export default function ChecklistPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Siapkan berkas"
          title="Checklist dokumen KPR dari awal sampai akad"
          description="Centang tiap dokumen yang sudah kamu siapkan. Progresmu disimpan otomatis di perangkat ini, dan bisa dicetak saat berkas makin lengkap."
          align="center"
        />
        <div className="mt-10">
          <ChecklistDokumen />
        </div>
      </Container>
    </section>
  );
}