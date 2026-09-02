import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./ui";
import { WhatsAppLink } from "./whatsapp-link";
import { ALAMAT, BRAND_NAME, DISCLOSURE, WHATSAPP_DISPLAY } from "@/lib/brand";

const kolomPanduan = [
  { href: "/panduan", label: "Semua panduan" },
  { href: "/panduan/tahap-1-cek-keuangan-dan-kelayakan", label: "Tahap 1 · Cek keuangan" },
  { href: "/panduan/tahap-3-pilih-skema-kredit", label: "Tahap 3 · Pilih skema" },
  { href: "/panduan/tahap-7-akad-kredit-dan-serah-terima", label: "Tahap 7 · Akad & serah terima" },
  { href: "/panduan/kpr-subsidi-flpp", label: "Seluk-beluk FLPP" },
];

const kolomAlat = [
  { href: "/profil-kamu", label: "Profil Kamu" },
  { href: "/kalkulator", label: "Kalkulator KPR" },
  { href: "/mampu-beli", label: "Kemampuan beli" },
  { href: "/planner-dp", label: "Planner DP" },
  { href: "/sewa-vs-beli", label: "Sewa vs beli" },
  { href: "/syarat", label: "Cek kelayakan FLPP" },
  { href: "/checklist", label: "Checklist dokumen" },
  { href: "/syarat#bank", label: "Perbandingan bank" },
  { href: "/faq", label: "Pertanyaan umum" },
  { href: "/glosarium", label: "Glosarium istilah" },
];

const kolomInfo = [
  { href: "/tentang", label: "Tentang AlurKPR" },
  { href: "/hubungi", label: "Hubungi kami" },
  { href: "/privasi", label: "Kebijakan privasi" },
  { href: "/panduan/manajemen-keuangan-sebelum-kpr", label: "Kelola keuangan" },
  { href: "/panduan/perbedaan-kpr-subsidi-dan-komersial", label: "Subsidi vs komersial" },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Panduan Indonesia untuk membeli rumah pertama dengan KPR — dari
              cek kelayakan sampai kunci di tangan.
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <dt className="sr-only">WhatsApp</dt>
                <dd>
                  <WhatsAppLink
                    source="footer"
                    pesan="Halo, saya dari situs AlurKPR. Saya ingin bertanya soal KPR / perumahan."
                    className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary-deep"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {WHATSAPP_DISPLAY}
                  </WhatsAppLink>
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="sr-only">Alamat</dt>
                <dd className="text-ink-soft">{ALAMAT}</dd>
              </div>
            </dl>
          </div>

          {[
            { judul: "Panduan", items: kolomPanduan },
            { judul: "Alat & referensi", items: kolomAlat, duaKolom: true },
            { judul: "Informasi", items: kolomInfo },
          ].map((kol) => (
            <nav key={kol.judul} aria-label={kol.judul}>
              <h2 className="text-sm font-bold text-ink">{kol.judul}</h2>
              <ul className={`mt-4 ${kol.duaKolom ? "grid grid-cols-2 gap-x-4" : "space-y-2"}`}>
                {kol.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1.5 text-sm text-ink-soft transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-ink-soft">{DISCLOSURE}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Suku bunga, plafon, dan persyaratan di situs ini bersifat indikatif
            dan dapat berubah mengikuti kebijakan pemerintah/BPS maupun
            keputusan bank. Selalu konfirmasi angka resmi ke Kementerian PUPR
            dan bank penyalur sebelum pengajuan.
          </p>
          <p className="mt-3 text-xs text-ink-soft">
            © {new Date().getFullYear()} AlurKPR · {BRAND_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}