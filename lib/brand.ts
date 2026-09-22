/**
 * Identitas brand & kanal kontak. Dipakai lintas komponen (client & server).
 * Data ini publik — tidak berisi secret.
 */

export const BRAND_NAME = "Syahfalah Group";
export const BRAND_TAGLINE_COUNTER = "Konsultasi KPR & perumahan";

export const WHATSAPP_NUMBER = "6281333372016";
export const WHATSAPP_DISPLAY = "+62 813-3337-2016";

export const ALAMAT =
  "Jl. Bondoyudo Nomor 55, Gambiran, Lumajang, Jawa Timur";

/** Katalog foto rumah asli (public/images/gallery-01..09-720.webp). */
export const GALERI_RUMAH = [
  { src: "/images/gallery-01-720.webp", alt: "Fasad depan rumah tipe contoh hunian Syahfalah Group, Lumajang" },
  { src: "/images/gallery-02-720.webp", alt: "Gerbang masuk kawasan perumahan Syahfalah Group, Lumajang" },
  { src: "/images/gallery-03-720.webp", srcLg: "/images/gallery-03-1080.webp", alt: "Halaman rumah hunian Syahfalah Group, Lumajang" },
  { src: "/images/gallery-04-720.webp", srcLg: "/images/gallery-04-1080.webp", alt: "Ruang tamu hunian tipe contoh Syahfalah Group, Lumajang" },
  { src: "/images/gallery-05-720.webp", srcLg: "/images/gallery-05-1080.webp", alt: "Ruang keluarga hunian tipe contoh Syahfalah Group, Lumajang" },
  { src: "/images/gallery-06-720.webp", alt: "Dapur rumah tipe contoh Syahfalah Group, Lumajang" },
  { src: "/images/gallery-07-720.webp", srcLg: "/images/gallery-07-1080.webp", alt: "Kamar tidur depan hunian tipe contoh Syahfalah Group, Lumajang" },
  { src: "/images/gallery-08-720.webp", srcLg: "/images/gallery-08-1080.webp", alt: "Kamar tidur belakang hunian tipe contoh Syahfalah Group, Lumajang" },
  { src: "/images/gallery-09-720.webp", srcLg: "/images/gallery-09-1080.webp", alt: "Kamar mandi dalam hunian tipe contoh Syahfalah Group, Lumajang" },
];

/**
 * Membangun deep-link WhatsApp dengan pesan awal.
 * @param pesan Teks bebas; otomatis di-encode.
 */
export function waUrl(pesan: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const WA_PESAN_UMUM =
  "Halo, saya dari situs AlurKPR ingin bertanya soal KPR / perumahan.";

export const DISCLOSURE =
  "Edukasi independen oleh Syahfalah Group — tidak menjual produk keuangan dan tidak menerima komisi bank. Angka di situs ini indikatif dan dapat berubah; keputusan kredit final ada di bank penyalur."; 