import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./ui";

const kolomPanduan = [
  { href: "/panduan", label: "Semua panduan" },
  { href: "/panduan/tahap-1-cek-keuangan-dan-kelayakan", label: "Tahap 1 · Cek keuangan" },
  { href: "/panduan/tahap-3-pilih-skema-kredit", label: "Tahap 3 · Pilih skema" },
  { href: "/panduan/tahap-7-akad-kredit-dan-serah-terima", label: "Tahap 7 · Akad & serah terima" },
  { href: "/panduan/kpr-subsidi-flpp", label: "Seluk-beluk FLPP" },
];

const kolomAlat = [
  { href: "/kalkulator", label: "Kalkulator KPR" },
  { href: "/syarat", label: "Cek kelayakan FLPP" },
  { href: "/syarat#bank", label: "Perbandingan bank" },
  { href: "/faq", label: "Pertanyaan umum" },
  { href: "/glosarium", label: "Glosarium istilah" },
];

const kolomInfo = [
  { href: "/tentang", label: "Tentang AlurKPR" },
  { href: "/hubungi", label: "Hubungi kami" },
  { href: "/panduan/manajemen-keuangan-sebelum-kpr", label: "Kelola keuangan" },
  { href: "/panduan/perbedaan-kpr-subsidi-dan-komersial", label: "Subsidi vs komersial" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Panduan Indonesia untuk membeli rumah pertama dengan KPR — dari
              cek kelayakan sampai kunci di tangan.
            </p>
          </div>

          {[
            { judul: "Panduan", items: kolomPanduan },
            { judul: "Alat & referensi", items: kolomAlat },
            { judul: "Informasi", items: kolomInfo },
          ].map((kol) => (
            <nav key={kol.judul} aria-label={kol.judul}>
              <h3 className="text-sm font-bold text-ink">{kol.judul}</h3>
              <ul className="mt-4 space-y-2.5">
                {kol.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-soft transition hover:text-primary"
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
          <p className="text-xs leading-relaxed text-ink-soft">
            Suku bunga, plafon, dan persyaratan di situs ini bersifat indikatif
            dan dapat berubah mengikuti kebijakan pemerintah/BPS maupun
            keputusan bank. Selalu konfirmasi angka resmi ke Kementerian PUPR
            dan bank penyalur sebelum pengajuan.
          </p>
          <p className="mt-3 text-xs text-ink-soft">
            © {new Date().getFullYear()} AlurKPR. Dibuat dengan semangat literasi
            perumahan.
          </p>
        </div>
      </Container>
    </footer>
  );
}