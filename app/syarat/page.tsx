import type { Metadata } from "next";
import { ArrowRight, Info, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getBankRates } from "@/lib/bank-rates";
import { seedBankRates } from "@/lib/bank-rates";
import { KelayakanForm } from "@/components/kelayakan-form";
import { Container, SectionHeading, btnPrimary } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Syarat, Kelayakan & Perbandingan Bank",
  description:
    "Cek kelayakan KPR subsidi FLPP secara cepat, lihat syarat umum pengajuan, dan bandingkan suku bunga indikatif bank penyalur.",
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
  const subsidi = rates.filter((r) => r.kpr_type === "subsidi");
  const komersial = rates.filter((r) => r.kpr_type === "komersial");

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
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
              Angka yang dipakai alat ini (batas penghasilan, harga plafon,
              syarat MBR) bersifat indikatif dan bisa diperbarui pemerintah.
              Hasil di sini bukan keputusan resmi — gunakan sebagai panduan,
              lalu konfirmasi ke bank penyalur & data Kementerian PUPR.
              <a
                href="/faq"
                className="mt-3 inline-flex items-center gap-1.5 font-bold text-accent"
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
            title="Skema bank penyalur (indikatif)"
            description="Garis besar tawaran bank yang umum muncul — bunga, jangka waktu fixed, DP minimum, dan tenor maksimum."
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              { judul: "KPR Subsidi (FLPP)", data: subsidi, soft: true },
              { judul: "KPR Komersial", data: komersial, soft: false },
            ].map(({ judul, data, soft }) => (
              <div key={judul} className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
                <div className={`px-7 py-5 ${soft ? "bg-primary-soft" : "bg-paper"}`}>
                  <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                    <Landmark className="size-5 text-primary" aria-hidden="true" />
                    {judul}
                  </h2>
                </div>
                <ul className="divide-y divide-line">
                  {(data.length > 0 ? data : seedBankRates.filter((r) => r.kpr_type === (soft ? "subsidi" : "komersial"))).map(
                    (b) => (
                      <li key={b.id} className="px-7 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold">{b.bank_name}</p>
                          <p className="text-sm font-bold tabular-nums text-primary">
                            {b.fixed_rate}%{b.floating_rate ? ` → ${b.floating_rate}%` : ""}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-ink-soft">{b.notes}</p>
                        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-soft">
                          <div className="flex gap-1.5">
                            <dt className="font-bold">Fixed:</dt>
                            <dd>{b.fixed_years} th</dd>
                          </div>
                          <div className="flex gap-1.5">
                            <dt className="font-bold">DP min:</dt>
                            <dd>{b.min_dp_percent}%</dd>
                          </div>
                          <div className="flex gap-1.5">
                            <dt className="font-bold">Tenor:</dt>
                            <dd>s.d. {b.max_tenor_years} th</dd>
                          </div>
                        </dl>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 text-center sm:flex-row sm:text-left">
            <Info className="size-8 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-display text-base font-semibold">
                Angka-angka di atas adalah indikasi pasar, bukan penawaran resmi.
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Suku bunga dan ketentuan berbeda antar wilayah, waktu, dan profil
                debitur. Bawa hasil kalkulator ke bank sebagai bahan negosiasi.
              </p>
            </div>
            <Link href="/kalkulator" className={btnPrimary}>
              Simulasikan
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}