import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, KeyRound, MessageCircle } from "lucide-react";
import { tahapKpr, setelahKunci } from "@/content/tahap";
import { FAKTA, sumberFakta } from "@/lib/fakta";
import { PelatTahap } from "@/components/blueprint-icons";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { Container, SectionHeading, btnPrimary, btnSecondary, btnWhatsApp } from "@/components/ui";

export const metadata: Metadata = {
  title: "Perjalanan KPR · Alur 8 Tahap",
  description:
    "Ikuti 8 tahap membeli rumah pertama dengan KPR: siapkan keuangan, pilih skema, cari rumah, ajukan kredit, sampai kunci di tangan.",
  alternates: { canonical: "/perjalanan" },
};

export default function PerjalananPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Perjalanan KPR"
            title="8 tahap menuju kunci di tangan"
            description="Setiap tahap punya satu keputusan dan satu hasil yang jelas. Selesaikan satu per satu — tanpa lompat, tanpa buntu."
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/perjalanan/01-keuangan" className={btnPrimary}>
              Mulai dari Tahap 1
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/kalkulator" className={btnSecondary}>
              Hitung angsuran dulu
            </Link>
            <Link href="/checklist" className={btnSecondary}>
              Checklist dokumen cetak
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-14">
        <Container>
          <ol className="space-y-4">
            {tahapKpr.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/perjalanan/${t.slug}`}
                  className="group grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <span className="flex items-start gap-4">
                    <PelatTahap index={t.nomor - 1} className="size-12 sm:size-14" />
                    <span className="sr-only">Tahap {t.nomor}</span>
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                      Tahap {String(t.nomor).padStart(2, "0")} dari 08
                    </p>
                    <h2 className="mt-0.5 font-display text-lg font-semibold group-hover:text-primary sm:text-xl">
                      {t.judul}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {t.ringkasan}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {t.estimasiWaktu}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                      Buka tahap
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="mt-20">
        <Container>
          <SectionHeading
            eyebrow="Angka yang kami pakai"
            title="Asumsi kunci, dengan sumber & tanggal cek"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[FAKTA.bungaFlpp, FAKTA.hargaSubsidiIndikatif, FAKTA.dbrSaran].map((f) => (
              <div key={f.nama} className="rounded-3xl border border-line bg-surface p-6">
                <p className="font-display text-xl font-semibold text-primary">
                  {f.nilai}
                  <span className="ml-1 text-sm font-semibold text-ink-soft">{f.unit}</span>
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink">{f.nama}</p>
                <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">{sumberFakta(f)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="setelah-kunci"
        aria-labelledby="setelah-kunci-title"
        className="mt-20 scroll-mt-24 border-t border-line bg-surface"
      >
        <Container className="py-16">
          <SectionHeading
            eyebrow="Setelah kunci di tangan"
            title="Cicilan masih berjalan — kelola baik-baik"
            description={setelahKunci.ringkasan}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {setelahKunci.poin.map((p, i) => (
              <article
                key={p.judul}
                className="rounded-3xl border border-line bg-paper p-6 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft font-display text-lg font-bold text-accent-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{p.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.teks}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WhatsAppLink
              source="perjalanan_aftercare"
              pesan="Halo, saya sudah kunci di tangan. Saya ingin bertanya soal mengelola cicilan / perawatan rumah."
              className={btnWhatsApp}
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Tanya via WhatsApp
            </WhatsAppLink>
            <Link href="/panduan/manajemen-keuangan-sebelum-kpr" className={btnSecondary}>
              <KeyRound className="size-4" aria-hidden="true" />
              Kelola keuangan pasca-KPR
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}