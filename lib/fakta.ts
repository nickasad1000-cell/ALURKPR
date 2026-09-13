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
    unit: "% flat/tahun (s.d. 40 th)",
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
  hargaSubsidiZona: {
    nama: "Range harga jual rumah tapak subsidi per zona",
    nilai: "166–240",
    unit: "jt per zona",
    sumber: "Kepmen 1722/KPTS/M/2026 (6 Agt 2026)",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiZona1: {
    nama: "Zona harga 1 (Jawa non-Jabodetabek; Sumatera non-Kepri/Babel/Mentawai)",
    nilai: "166.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiZona2: {
    nama: "Zona harga 2 (Sulawesi; Babel; Mentawai; Kepri non-Anambas)",
    nilai: "173.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiZona3: {
    nama: "Zona harga 3 (Kalimantan non-Murung Raya/Mahakam Ulu)",
    nilai: "182.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiZona4: {
    nama: "Zona harga 4 (Jabodetabek; Bali; NT; Maluku; Maluku Utara; Anambas; Murung Raya; Mahakam Ulu)",
    nilai: "185.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026",
    dicek: "2026-08-06",
    status: "resmi",
  },
  hargaSubsidiZona5: {
    nama: "Zona harga 5 (Papua & seluruh provinsi kawasan Papua)",
    nilai: "240.000.000",
    unit: "Rp",
    sumber: "Kepmen 1722/KPTS/M/2026",
    dicek: "2026-08-06",
    status: "resmi",
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