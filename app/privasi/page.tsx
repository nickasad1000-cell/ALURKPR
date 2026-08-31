import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ALAMAT, BRAND_NAME, WHATSAPP_DISPLAY } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Bagaimana AlurKPR mengumpulkan, menyimpan, dan melindungi data pribadimu — serta cara mengajukan permintaan akses, perbaikan, atau penghapusan data.",
  alternates: { canonical: "/privasi" },
};

const pokok = [
  {
    judul: "Data yang kami kumpulkan",
    isi: [
      "Saat mengirim formulir hubungi kami, kamu mengisi nama, alamat email, dan isi pertanyaan. Data ini kamu berikan secara sukarela.",
      "Kalkulator, cek kelayakan, dan checklist dokumen berjalan penuh di perangkatmu. Data keuangan tidak pernah dikirim ke server kami.",
      "Kami tidak meminta, memproses, atau menyimpan data sensitif seperti nomor rekening, PIN, atau paspor.",
    ],
  },
  {
    judul: "Cara data digunakan",
    isi: [
      "Nama dan email dipakai untuk membalas pertanyaan yang kamu kirim.",
      "Konten yang kamu kirim bisa kami jadikan masukan untuk memperbaiki panduan (tanpa data pribadi).",
      "Kami tidak menjual, menyewakan, atau membagikan data pribadimu kepada pihak lain untuk tujuan pemasaran.",
    ],
  },
  {
    judul: "Penyimpanan",
    isi: [
      "Pesan dari formulir disimpan di platform database berenkripsi pada penyedia hosting kami untuk keperluan pembahasan.",
      "Kami menyimpan data sesingkat yang diperlukan untuk menjawab pesanmu, lalu meninjaunya berkala untuk penghapusan.",
    ],
  },
  {
    judul: "Cookie & analitik",
    isi: [
      "Kami menggunakan Google Analytics dengan IP dianonimkan untuk memahami halaman mana yang berguna. Google memproses data ini sesuai kebijakan privasinya.",
      "Gerakan di luar itu (preferensi tema dsb.) disimpan di perangkatmu (localStorage) dan tidak dikirim ke server.",
    ],
  },
  {
    judul: "Perlindungan data",
    isi: [
      "Formulir kami dilengkapi pertahanan terhadap spam dan penyalahgunaan otomatis.",
      "Akses ke data dibatasi hanya untuk pengelola situs, dan koneksi ke server selalu dienkripsi (HTTPS).",
    ],
  },
  {
    judul: "Hakmu (sesuai UU PDP)",
    isi: [
      `Kamu berhak meminta informasi, perbaikan, atau penghapusan data pribadimu kapan saja dengan menghubungi ${BRAND_NAME}.`,
      "Permintaan ditindaklanjuti maksimal 14 hari kerja, dan kami mengonfirmasi melalui email atau WhatsApp yang kamu pakai.",
    ],
  },
];

export default function PrivasiPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow="Kebijakan privasi"
            title="Data pribadimu tidak pernah kami perjualbelikan"
            description="Halaman ini menjelaskan apa yang kami kumpulkan dari situs AlurKPR, bagaimana kami memproteksinya, dan cara menghapusnya bila kamu minta."
            align="center"
          />
          <p className="mt-4 text-center text-xs text-ink-soft">
            Terakhir diperbarui: 30 Agustus 2026
          </p>

          <div className="mt-12 space-y-6">
            {pokok.map(({ judul, isi }) => (
              <section
                key={judul}
                className="rounded-3xl border border-line bg-surface p-7 shadow-sm"
              >
                <h2 className="font-display text-lg font-semibold">{judul}</h2>
                <ul className="mt-3 space-y-2">
                  {isi.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-ink-soft">
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-primary/25 bg-primary-soft/60 p-7">
            <p className="text-sm font-bold">Minta penghapusan data</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Sebutkan nama dan email yang kamu pakai saat mengirim pesan, dan
              tim kami mengurus sisanya.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <WhatsAppLink
                source="privasi"
                pesan="Halo, saya ingin mengajukan permintaan penghapusan data pribadi di AlurKPR. Nama saya: ..."
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1a7a42] px-5 text-sm font-bold text-white hover:bg-[#156535]"
              >
                {WHATSAPP_DISPLAY}
              </WhatsAppLink>
              <a
                href="mailto:halo@alurkpr.id?subject=Permintaan%20penghapusan%20data"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-bold text-ink transition hover:text-primary"
              >
                <Mail className="size-4" aria-hidden="true" />
                halo@alurkpr.id
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">{ALAMAT}</p>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-ink-soft">
            Ada pertanyaan seputar privasi? Baca{" "}
            <Link href="/hubungi" className="font-bold text-primary hover:text-primary-deep">
              halaman kontak
            </Link>{" "}
            atau lihat{" "}
            <Link href="/tentang" className="font-bold text-primary hover:text-primary-deep">
              tentang kami
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}