import type { KelayakanInput, KelayakanResult, SyaratCheck } from "./types";
import { hargaMaksUntukZona } from "./zona";
import { peringatanSumber } from "./sumber";

export type ZonaFlpp = 1 | 2 | 3 | 4;

/**
 * Batas penghasilan MBR untuk KPR FLPP (rumah tapak) per zona wilayah.
 * Rujukan: Permen Perumahan dan Kawasan Permukiman (PKP) No. 5/2025 jo.
 * No. 11/2025 jo. No. 1 Tahun 2026 (perubahan kedua), sebagaimana
 * dipublikasikan BP Tapera. Pemohon yang KAWIN memakai batas lebih tinggi;
 * peserta Tapera umumnya masuk ke baris yang sama dengan yang kawin.
 */
export const BATAS_PENGHASILAN_PER_ZONA: Record<
  ZonaFlpp,
  { belumKawin: number; kawin: number; wilayah: string }
> = {
  1: {
    belumKawin: 8_500_000,
    kawin: 10_000_000,
    wilayah: "Jawa (selain Jabodetabek), Sumatera, NTB, NTT",
  },
  2: {
    belumKawin: 9_000_000,
    kawin: 11_000_000,
    wilayah: "Kalimantan, Sulawesi, Bali, Babel, Kepri, Maluku, Maluku Utara",
  },
  3: {
    belumKawin: 10_500_000,
    kawin: 12_000_000,
    wilayah: "Papua dan seluruh provinsi di kawasan Papua",
  },
  4: {
    belumKawin: 12_000_000,
    kawin: 14_000_000,
    wilayah: "Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
  },
};

export const OPSI_ZONA: { nilai: ZonaFlpp; label: string }[] = (
  [1, 2, 3, 4] as const
).map((z) => ({
  nilai: z,
  label: `Zona ${z} — ${BATAS_PENGHASILAN_PER_ZONA[z].wilayah}`,
}));

function formatJuta(n: number): string {
  const juta = n / 1_000_000;
  return `${Number.isInteger(juta) ? juta : juta.toFixed(1).replace(".", ",")} jt`;
}

export function cekKelayakan(input: KelayakanInput): KelayakanResult {
  const batas = BATAS_PENGHASILAN_PER_ZONA[input.zona];
  const batasPenghasilan =
    input.statusKeluarga === "kawin" ? batas.kawin : batas.belumKawin;
  const hargaMaks = hargaMaksUntukZona(input.zonaHarga);

  const labelStatus =
    input.statusKeluarga === "kawin" ? "sudah menikah" : "belum kawin";

  const syarat: SyaratCheck[] = [
    {
      label: "Usia sesuai aturan skema — perlu dicek ulang ke bank penyalur",
      lolos: input.dewasaAtauMenikah,
      catatan: input.dewasaAtauMenikah
        ? undefined
        : "Syarat usia mengikuti aturan terbaru skema ini — konfirmasi ke bank penyalur.",
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
      label: `Penghasilan maksimal Rp${formatJuta(batasPenghasilan)}/bulan (Zona ${input.zona}, ${labelStatus})`,
      lolos: input.penghasilan <= batasPenghasilan,
      catatan:
        input.penghasilan > batasPenghasilan
          ? input.statusKeluarga === "belum-kawin" &&
            input.penghasilan <= batas.kawin
            ? `Masih bisa lolos bila kamu sudah menikah — batas zona ini untuk yang kawin Rp${formatJuta(batas.kawin)}/bulan.`
            : "Penghasilan melebihi batas MBR zona ini — pertimbangkan KPR komersial."
          : undefined,
    },
    {
      label: `Harga unit ≤ Rp${formatJuta(hargaMaks)} (Zona harga ${input.zonaHarga})`,
      lolos: input.hargaUnit <= hargaMaks,
      catatan:
        input.hargaUnit > hargaMaks
          ? `Harga melebihi plafon subsidi zona ini — cek plafon resmi (Kepmen 1722/KPTS/M/2026) di situs BP Tapera.`
          : undefined,
    },
  ];

  const alasan = syarat
    .filter((s) => !s.lolos)
    .map((s) => s.catatan ?? `Tidak memenuhi: ${s.label}`);

  return {
    layak: alasan.length === 0,
    alasan,
    syarat,
    peringatan: peringatanSumber(`flpp.batas-penghasilan.zona${input.zona}`),
  };
}
