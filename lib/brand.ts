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

/** Katalog foto rumah (public/images/*.webp). */
export const GALERI_RUMAH = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery-${String(i + 1).padStart(2, "0")}-720.webp`,
  alt: `Foto rumah & interior hunian Syahfalah Group, Gambiran Lumajang (${i + 1}/${12})`,
}));

/**
 * Membangun deep-link WhatsApp dengan pesan awal.
 * @param pesan Teks bebas; otomatis di-encode.
 */
export function waUrl(pesan: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const WA_PESAN_UMUM =
  "Halo Syahfalah Group, saya dari situs AlurKPR ingin bertanya soal KPR / unit rumah.";