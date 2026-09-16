/**
 * Zona harga maksimal rumah tapak bersubsidi FLPP.
 * Rujukan: Keputusan Menteri PKP No. 1722/KPTS/M/2026 tentang Kriteria
 * Rumah Umum Tapak Dalam Fasilitasi Pemerintah Pusat (berlaku 06-08-2026).
 * Angka indikatif sampai wilayah per zona dicek ulang ke dokumen resmi.
 */

export type ZonaHarga = 1 | 2 | 3 | 4 | 5;

export type HargaSubsidiZona = {
  zona: ZonaHarga;
  /** Nama wilayah sesuai Kepmen 1722/KPTS/M/2026. */
  label: string;
  /** Plafon harga jual maksimal rumah tapak di zona ini (Rupiah). */
  maks: number;
  sumber: string;
};

export const HARGA_SUBSIDI_PER_ZONA: HargaSubsidiZona[] = [
  {
    zona: 1,
    label:
      "Jawa (selain Jabodetabek), Sumatera (selain Kep. Riau, Bangka Belitung, Mentawai)",
    maks: 166_000_000,
    sumber: "Kepmen 1722/KPTS/M/2026",
  },
  {
    zona: 2,
    label: "Sulawesi, Bangka Belitung, Kep. Mentawai, Kep. Riau (selain Anambas)",
    maks: 173_000_000,
    sumber: "Kepmen 1722/KPTS/M/2026",
  },
  {
    zona: 3,
    label: "Kalimantan (selain Kab. Murung Raya dan Kab. Mahakam Ulu)",
    maks: 182_000_000,
    sumber: "Kepmen 1722/KPTS/M/2026",
  },
  {
    zona: 4,
    label:
      "Jabodetabek, Bali, Nusa Tenggara, Maluku, Maluku Utara, Kep. Anambas, Kab. Murung Raya, Kab. Mahakam Ulu",
    maks: 185_000_000,
    sumber: "Kepmen 1722/KPTS/M/2026",
  },
  {
    zona: 5,
    label: "Papua, Papua Barat, Papua Tengah, Papua Pegunungan, Papua Barat Daya, Papua Selatan",
    maks: 240_000_000,
    sumber: "Kepmen 1722/KPTS/M/2026",
  },
];

export const OPSI_ZONA_HARGA: { nilai: ZonaHarga; label: string }[] =
  HARGA_SUBSIDI_PER_ZONA.map((z) => ({
    nilai: z.zona,
    label: `Zona harga ${z.zona} — ${z.label} (maks Rp${z.maks.toLocaleString("id-ID")})`,
  }));

export function hargaMaksUntukZona(z: ZonaHarga): number {
  return HARGA_SUBSIDI_PER_ZONA.find((x) => x.zona === z)!.maks;
}