export type StatusFakta = "resmi" | "indikatif" | "internal";

export type DataFakta = {
  nama: string;
  nilai: string;
  unit: string;
  sumber: string;
  dicek: string;
  status: StatusFakta;
};

/**
 * Satu sumber kebenaran untuk angka regulasi yang tampil di antarmuka.
 * Perubahan kebijakan hanya perlu diubah di sini — lalu dicek ulang pada
 * tanggal `dicek`. Jangan hardcode angka ini di komponen.
 */
export const FAKTA = {
  bungaFlpp: {
    nama: "Suku bunga FLPP",
    nilai: "5",
    unit: "% flat/tahun (20 th)",
    sumber: "Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1 Tahun 2026",
    dicek: "2026-08-06",
    status: "resmi",
  },
  dpFlpp: {
    nama: "DP minimal FLPP",
    nilai: "1",
    unit: "%",
    sumber: "Ketentuan KPR FLPP BP Tapera",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiIndikatif: {
    nama: "Harga jual rumah subsidi (indikatif, Zona Jawa non-Jabodetabek)",
    nilai: "166.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026 (6 Agt 2026) — 5 zona",
    dicek: "2026-08-06",
    status: "indikatif",
  },
  dbrSaran: {
    nama: "Rasio angsuran aman (aturan situs, konservatif)",
    nilai: "30",
    unit: "% dari penghasilan bersih",
    sumber: "Praktik perbankan - dipakai AlurKPR sebagai default konservatif",
    dicek: "2026-08-06",
    status: "internal",
  },
  appTapera: {
    nama: "Aplikasi pengajuan subsidi",
    nilai: "Tapera Mobile",
    unit: "kanal resmi",
    sumber: "BP Tapera (aplikasi prasyarat pengajuan)",
    dicek: "2026-08-06",
    status: "resmi",
  },
} as const satisfies Record<string, DataFakta>;

export function sumberFakta(f: DataFakta): string {
  const dicek = new Date(`${f.dicek}T00:00:00`);
  return `Sumber: ${f.sumber}. Dicek ${dicek.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}.`;
}