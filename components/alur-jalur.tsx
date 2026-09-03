"use client";

import { Container, SectionHeading } from "@/components/ui";
import { AlurKprBoard } from "@/components/alur-kpr-board";

export function AlurJalur() {
  return (
    <section className="mt-20 sm:mt-28">
      <Container>
        <SectionHeading
          eyebrow="Alur pengajuan KPR"
          title="Delapan tahap dari cek keuangan sampai kunci di tangan"
        />
        <div className="mt-10">
          <AlurKprBoard />
        </div>
      </Container>
    </section>
  );
}
