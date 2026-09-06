import type { Metadata } from "next";
import { BookOpen, Calculator, Goal, HandHeart } from "lucide-react";
import Link from "next/link";
import { Container, Eyebrow, SectionHeading, btnPrimary, btnSecondary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tentang AlurKPR",
  description:
    "AlurKPR adalah proyek literasi keuangan perumahan: membimbing calon pemilik rumah pertama memahami alur KPR subsidi dan komersial dengan jujur dan jelas.",
  alternates: { canonical: "/tentang" },
};

const nilai = [
  {
    icon: Goal,
    judul: "Keputusan berdasarkan angka",
    teks: "Kami menyorot total bayar dan bunga keseluruhan, bukan sekadar angsuran promo pertama.",
  },
  {
    icon: BookOpen,
    judul: "Bahasa manusia",
    teks: "Tanpa jargon. Setiap istilah berat punya entri glosarium dan penjelasan konteks.",
  },
  {
    icon: Calculator,
    judul: "Alat yang jujur",
    teks: "Kalkulator dan cek kelayakan dibuat transparan dengan asumsi yang disebutkan",
  },
  {
    icon: HandHeart,
    judul: "Gratis & tanpa bias produk",
    teks: "Tidak menjual kredit, tidak rahasia klien. Kami bukan agen bank penyalur.",
  },
];

export default function TentangPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <Eyebrow>Tentang kami</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            Panduan alur KPR: dari cek keuangan sampai terima kunci rumah.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Banyak orang gagal beli rumah karena nggak paham urutannya. AlurKPR
            susun langkah-langkahnya — hitung kemampuan, cek subsidi, bandingkan
            bank, sampai akad dan serah terima. Angka yang dipakai jelas, tanpa
            embel-embel.
          </p>
        </Container>
      </section>

      <section className="mt-20">
        <Container>
          <SectionHeading
            eyebrow="Apa yang kami lakukan"
            title="Empat prinsip yang kami pegang"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nilai.map((n) => (
              <div key={n.judul} className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
                <n.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-semibold">{n.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.teks}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-20">
        <Container className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-accent/40 bg-accent-soft/60 p-8 text-sm leading-relaxed text-ink-soft">
            <h2 className="font-display text-lg font-semibold text-ink">
              Batasan penting
            </h2>
            <p className="mt-3">
              AlurKPR adalah media edukasi, bukan lembaga keuangan, konsultan,
              atau agen properti. Kami tidak menerima komisi dari bank mana pun,
              dan seluruh angka suku bunga, plafon subsidi, biaya, serta syarat
              yang ditampilkan bersifat indikatif serta dapat berubah.
            </p>
            <p className="mt-3">
              Keputusan kredit final berada di bank penyalur, dan aturan
              subsidinya di tangan BP Tapera serta Kementerian Perumahan dan
              Kawasan Permukiman (PKP). Gunakan situs ini untuk belajar dan
              mempersiapkan diri, lalu verifikasi ke sumber resmi sebelum
              menandatangani apa pun.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/kalkulator" className={btnPrimary}>
              Mulai dari kalkulator
            </Link>
            <Link href="/hubungi" className={btnSecondary}>
              Tanya-tanya dulu
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}