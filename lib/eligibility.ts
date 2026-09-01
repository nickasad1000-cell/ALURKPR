import type { KelayakanInput, KelayakanResult, SyaratCheck } from "./types";

/**
 * Aturan kelayakan KPR Subsidi (FLPP) — INDIKATIF untuk edukasi.
 * Mengacu aturan umum BP2PD/Kementerian PKP; detail bisa berubah per kebijakan terbaru.
 */
export const ATURAN_FLPP = {
  penghasilanMaksTapak: 8_000_000,
  hargaMaksTapakDefault: 166_000_000, // batas terendah antar-zona; real: 166jt–240jt tergantung lokasi
} as const;

export function cekKelayakan(input: KelayakanInput): KelayakanResult {
  const syarat: SyaratCheck[] = [
    {
      label: "Usia minimal 21 tahun atau sudah menikah",
      lolos: input.dewasaAtauMenikah,
      catatan: input.dewasaAtauMenikah
        ? undefined
        : "Pemohon harus berusia ≥ 21 tahun atau sudah menikah.",
    },
    {
      label: "Belum pernah memiliki rumah",
      lolos: input.belumPunyaRumah,
      catatan: input.belumPunyaRumah
        ? undefined
        : "Centang ini bila belum pernah memiliki rumah — KPR subsidi hanya untuk rumah pertama.",
    },
    {
      label: "Belum pernah menerima subsidi perumahan dari pemerintah",
      lolos: input.belumPernahSubsidi,
      catatan: input.belumPernahSubsidi
        ? undefined
        : "Centang ini bila belum pernah menerima subsidi FLPP — hanya diberikan satu kali seumur hidup.",
    },
    {
      label: `Penghasilan pokok ≤ Rp8 juta/bulan (rumah tapak)`,
      lolos: input.penghasilan <= ATURAN_FLPP.penghasilanMaksTapak,
      catatan:
        input.penghasilan > ATURAN_FLPP.penghasilanMaksTapak
          ? "Penghasilan melebihi batas MBR — pertimbangkan KPR komersial."
          : undefined,
    },
    {
      label: `Harga unit ≤ Rp166 juta (batas konservatif zona; real 166–240 jt)`,
      lolos: input.hargaUnit <= ATURAN_FLPP.hargaMaksTapakDefault,
      catatan:
        input.hargaUnit > ATURAN_FLPP.hargaMaksTapakDefault
          ? "Harga unit kemungkinan di atas plafon subsidi di banyak zona — cek plafon zona lokasi unitmu."
          : undefined,
    },
  ];

  const alasan = syarat
    .filter((s) => !s.lolos)
    .map((s) => s.catatan ?? `Tidak memenuhi: ${s.label}`);

  return { layak: alasan.length === 0, alasan, syarat };
}
