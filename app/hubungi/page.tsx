import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { HubungiForm } from "./hubungi-form";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Kirim pertanyaan atau masukan seputar panduan KPR. Tim AlurKPR membalas pesan yang kamu kirim melalui formulir ini.",
};

export default function HubungiPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Hubungi kami"
          title="Ada yang belum jelas?"
          description="Pertanyaan, koreksi data, atau ide topik panduan — kirim lewat form di bawah. Kami baca setiap pesan."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <Mail className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold">Email</p>
              <p className="mt-1 text-sm text-ink-soft">halo@alurkpr.id</p>
            </div>
            <div className="rounded-3xl border border-line bg-surface p-6">
              <MessageCircle className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold">Balas dalam</p>
              <p className="mt-1 text-sm text-ink-soft">
                1–3 hari kerja. Untuk urusan mendesak, berkonsultasilah langsung
                dengan bank penyalur dan pihak berwenang.
              </p>
            </div>
            <p className="rounded-3xl border border-accent/40 bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
              Kami tidak meminta data keuangan sensitif (rekening, NPWP, kata
              sandi). Jangan pernah membagikannya di formulir mana pun.
            </p>
          </div>
          <HubungiForm />
        </div>
      </Container>
    </section>
  );
}