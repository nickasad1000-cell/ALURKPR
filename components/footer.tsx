import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./ui";
import { WhatsAppLink } from "./whatsapp-link";
import { ALAMAT, BRAND_NAME, DISCLOSURE, WHATSAPP_DISPLAY } from "@/lib/brand";

const kolomPerjalanan = [
  { href: "/perjalanan", label: "Semua tahap" },
  { href: "/perjalanan/01-keuangan", label: "1 · Siapkan keuangan" },
  { href: "/perjalanan/03-skema", label: "3 · Pilih skema KPR" },
  { href: "/perjalanan/05-dana-dokumen", label: "5 · Siapkan dana & ajukan" },
  { href: "/perjalanan/07-akad", label: "7 · Akad kredit" },
  { href: "/perjalanan#setelah-kunci", label: "Setelah kunci" },
];

const kolomPanduan = [
  { href: "/panduan", label: "Semua panduan" },
  { href: "/panduan/kpr-subsidi-flpp", label: "Seluk-beluk FLPP" },
  { href: "/panduan/manajemen-keuangan-sebelum-kpr", label: "Kelola keuangan" },
  { href: "/panduan/perbedaan-kpr-subsidi-dan-komersial", label: "Subsidi vs komersial" },
];

const kolomInfo = [
  { href: "/tentang", label: "Tentang AlurKPR" },
  { href: "/hubungi", label: "Hubungi kami" },
  { href: "/faq", label: "FAQ" },
  { href: "/glosarium", label: "Glosarium" },
  { href: "/privasi", label: "Kebijakan privasi" },
];

const referensi = [
  { href: "/syarat", label: "Cek kelayakan" },
  { href: "/kalkulator", label: "Kalkulator KPR" },
  { href: "/kalkulator?mode=income", label: "Kemampuan beli" },
  { href: "/alat/planner-dp", label: "Rencana tabung DP" },
  { href: "/alat/sewa-vs-beli", label: "Sewa vs beli" },
  { href: "/checklist", label: "Checklist dokumen" },
  { href: "/alat", label: "Semua alat" },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1.2fr_1.2fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Panduan Indonesia untuk membeli rumah pertama dengan KPR — dari
              cek keuangan sampai kunci di tangan.
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
            { judul: "Perjalanan", items: kolomPerjalanan },
            { judul: "Panduan", items: kolomPanduan },
            { judul: "Informasi", items: kolomInfo },
          ].map((kol) => (
            <nav key={kol.judul} aria-label={kol.judul}>
              <h2 className="text-sm font-bold text-ink">{kol.judul}</h2>
              <ul className="mt-4 space-y-2">
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

        <nav aria-label="Alat dan referensi" className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
          {referensi.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-ink-soft">{DISCLOSURE}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Suku bunga, plafon, dan persyaratan di situs ini bersifat indikatif
            dan dapat berubah mengikuti kebijakan BP Tapera, Kementerian
            Perumahan dan Kawasan Permukiman (PKP), maupun keputusan bank.
            Selalu konfirmasi angka resmi ke BP Tapera dan bank penyalur
            sebelum pengajuan.
          </p>
          <p className="mt-3 text-xs text-ink-soft">
            © {new Date().getFullYear()} AlurKPR · {BRAND_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}