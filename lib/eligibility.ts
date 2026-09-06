import type { KelayakanInput, KelayakanResult, SyaratCheck } from "./types";

export type ZonaFlpp = 1 | 2 | 3 | 4;

/**
 * Batas penghasilan MBR untuk KPR FLPP (rumah tapak) per zona wilayah.
 * Rujukan: Permen Perumahan dan Kawasan Permukiman (PKP) No. 5 Tahun 2025
 * sebagaimana dipublikasikan BP Tapera. Angka di bawah memakai batas untuk
 * pemohon BELUM KAWIN; pemohon kawin/peserta Tapera umumnya lebih tinggi
 * (zona 1: 10 jt, zona 2: 11 jt, zona 3: 12 jt, zona 4/Jabodetabek: 14 jt).
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

/** Plafon harga rumah tapak subsidi — batas terendah antar-zona. */
export const HARGA_MAKS_TAPAK_DEFAULT = 166_000_000;

function formatJuta(n: number): string {
  const juta = n / 1_000_000;
  return `${Number.isInteger(juta) ? juta : juta.toFixed(1).replace(".", ",")} jt`;
}

export function cekKelayakan(input: KelayakanInput): KelayakanResult {
  const batas = BATAS_PENGHASILAN_PER_ZONA[input.zona];

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
      label: `Penghasilan maksimal Rp${formatJuta(batas.belumKawin)}/bulan (Zona ${input.zona}, belum kawin)`,
      lolos: input.penghasilan <= batas.belumKawin,
      catatan:
        input.penghasilan > batas.belumKawin
          ? input.penghasilan <= batas.kawin
            ? `Masih bisa lolos bila kamu sudah menikah — batas zona ini untuk yang kawin Rp${formatJuta(batas.kawin)}/bulan.`
            : "Penghasilan melebihi batas MBR zona ini — pertimbangkan KPR komersial."
          : undefined,
    },
    {
      label: `Harga unit ≤ Rp166 juta (batas terendah antar-zona; di zona lain bisa lebih tinggi)`,
      lolos: input.hargaUnit <= HARGA_MAKS_TAPAK_DEFAULT,
      catatan:
        input.hargaUnit > HARGA_MAKS_TAPAK_DEFAULT
          ? "Harga melebihi plafon subsidi terbawah — cek plafon resmi untuk zona lokasi unitmu di situs BP Tapera."
          : undefined,
    },
  ];

  const alasan = syarat
    .filter((s) => !s.lolos)
    .map((s) => s.catatan ?? `Tidak memenuhi: ${s.label}`);

  return { layak: alasan.length === 0, alasan, syarat };
}
