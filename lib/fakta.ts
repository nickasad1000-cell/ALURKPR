import { HARGA_SUBSIDI_PER_ZONA, type ZonaHarga } from "./zona";

export type StatusFakta = "resmi" | "indikatif" | "internal";

export type DataFakta = {
  nama: string;
  nilai: string;
  unit: string;
  sumber: string;
  dicek: string;
  status: StatusFakta;
};

const KEPMEN_HARGA = "Kepmen 1722/KPTS/M/2026";
const DICEK_HARGA = "2026-08-06";

/**
 * Fakta harga per zona diturunkan dari lib/zona.ts supaya daftar harga rumah
 * subsidi hanya punya satu sumber. Di sini hanya ditambahkan provenance.
 */
function faktaHargaZona(z: ZonaHarga): DataFakta {
  const data = HARGA_SUBSIDI_PER_ZONA.find((x) => x.zona === z)!;
  return {
    nama: `Zona harga ${z} — ${data.label}`,
    nilai: data.maks.toLocaleString("id-ID"),
    unit: "Rp",
    sumber: data.sumber,
    dicek: DICEK_HARGA,
    status: "resmi",
  };
}

const HARGA_MIN_JT =
  Math.min(...HARGA_SUBSIDI_PER_ZONA.map((z) => z.maks)) / 1_000_000;
const HARGA_MAX_JT =
  Math.max(...HARGA_SUBSIDI_PER_ZONA.map((z) => z.maks)) / 1_000_000;

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
    nilai: faktaHargaZona(1).nilai,
    unit: "Rp",
    sumber: KEPMEN_HARGA,
    dicek: DICEK_HARGA,
    status: "indikatif",
  },
  hargaSubsidiZona: {
    nama: "Range harga jual rumah tapak subsidi per zona",
    nilai: `${HARGA_MIN_JT}–${HARGA_MAX_JT}`,
    unit: "jt per zona",
    sumber: KEPMEN_HARGA,
    dicek: DICEK_HARGA,
    status: "resmi",
  },
  hargaSubsidiZona1: faktaHargaZona(1),
  hargaSubsidiZona2: faktaHargaZona(2),
  hargaSubsidiZona3: faktaHargaZona(3),
  hargaSubsidiZona4: faktaHargaZona(4),
  hargaSubsidiZona5: faktaHargaZona(5),
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