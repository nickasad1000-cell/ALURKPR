import type { Metadata } from "next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getBankRates, seedBankRates } from "@/lib/bank-rates";
import { KelayakanForm } from "@/components/kelayakan-form";
import { BandingKanBank } from "@/components/banding-kan-bank";
import { Container, SectionHeading } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Syarat, Kelayakan & Perbandingan Bank",
  description:
    "Cek kelayakan KPR subsidi FLPP secara cepat, lihat syarat umum pengajuan, dan bandingkan suku bunga indikatif bank penyalur.",
  alternates: { canonical: "/syarat" },
};

const syaratUmum = [
  "WNI dengan KTP & Kartu Keluarga aktif",
  "Usia minimal 21 tahun atau sudah menikah",
  "Belum pernah memiliki rumah (khusus subsidi)",
  "Belum pernah menerima subsidi perumahan (khusus subsidi)",
  "Penghasilan stabil & berada dalam batas skema",
  "Riwayat kredit (SLIK/BI Checking) tidak memiliki masalah besar",
  "Melampirkan dokumen pengajuan sesuai ketentuan bank",
];

export default async function SyaratPage() {
  const rates = await getBankRates();

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow="Syarat & skema"
            title="Layak atau belum? Cek di sini dulu"
            description="Periksa kelayakan KPR subsidi dalam hitungan detik, selaraskan syarat umum pengajuan, lalu bandingkan skema yang tersedia."
          />
        </Container>
      </section>

      <section className="mt-14">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <KelayakanForm />
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                Syarat umum pengajuan
              </h2>
              <ul className="mt-5 space-y-3">
                {syaratUmum.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-accent/40 bg-accent-soft/60 p-6 text-sm leading-relaxed text-ink-soft">
              Angka yang dipakai alat ini mengacu aturan FLPP terbaru
              (Permen PKP No. 5 Tahun 2025) dan bisa diperbarui pemerintah.
              Hasil di sini bukan keputusan resmi — gunakan sebagai panduan,
              lalu konfirmasi ke bank penyalur & situs resmi BP Tapera.
              <a
                href="/faq"
                className="mt-3 inline-flex items-center gap-1.5 font-bold text-accent-ink"
              >
                Lihat FAQ terkait <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="bank" className="mt-20 scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Perbandingan"
            title="Bandingkan skema bank penyalur"
            description="Filter subsidi atau komersial, urutkan dari bunga terendah, dan lihat mana yang paling ringan DP-nya."
            align="center"
          />
          <div className="mt-10">
            <BandingKanBank
              banks={rates.length > 0 ? rates : seedBankRates}
            />
          </div>
        </Container>
      </section>
    </>
  );
}