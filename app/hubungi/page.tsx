import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { HubungiForm } from "./hubungi-form";
import { Container, SectionHeading } from "@/components/ui";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ALAMAT, BRAND_NAME, WHATSAPP_DISPLAY } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Kirim pertanyaan atau masukan seputar panduan KPR. Tim AlurKPR membalas pesan yang kamu kirim melalui formulir atau WhatsApp.",
  alternates: { canonical: "/hubungi" },
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
            <div className="rounded-3xl border border-primary/25 bg-primary-soft/60 p-6">
              <p className="text-sm font-bold">WhatsApp — balas cepat</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Konsultasi seputar panduan & langkah pengajuan KPR — dikelola {BRAND_NAME}.
              </p>
              <WhatsAppLink
                source="hubungi"
                pesan="Halo, saya dari situs AlurKPR. Saya ingin bertanya soal KPR / perumahan."
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1a7a42] px-5 text-sm font-bold text-white hover:bg-[#156535]"
              >
                {WHATSAPP_DISPLAY}
              </WhatsAppLink>
            </div>
            <p className="rounded-3xl border border-accent/40 bg-accent-soft/60 p-6 text-xs leading-relaxed text-ink-soft">
              Kami tidak meminta data keuangan sensitif (rekening, NPWP, kata
              sandi). Jangan pernah membagikannya di formulir mana pun.
            </p>
            <p className="rounded-3xl border border-line bg-surface p-6 text-xs leading-relaxed text-ink-soft">
              {ALAMAT}
            </p>
          </div>
          <HubungiForm />
        </div>
      </Container>
    </section>
  );
}