/**
 * Registry provenance data regulasi: satu sumber kebenaran untuk angka
 * yang tampil di antarmuka. Tiap data punya riwayat sumber, status,
 * dan mekanisme deteksi konflik antar publikasi resmi.
 *
 * Kebijakan konflik (P0):
 * - SOURCE FOUND    → gunakan, tampilkan sumber
 * - SOURCE CONFLICT → flag untuk resolusi manusia, jangan silent pick
 * - SOURCE MISSING  → jangan fabricate
 * - DATA STALE      → tandai usang bila checked_at > 90 hari
 */

export type StatusSumber = "aktif" | "konflik" | "usang";

export type TipeSumber =
  | "KEPMEN"
  | "PERMEN"
  | "SITUS_RESMI"
  | "PUBLIKASI"
  | "INTERNAL";

export type EntriSumber = {
  /** Kunci data — mis. "flpp.batas-penghasilan.zona1" */
  kunci: string;
  /** Nilai angka atau range */
  nilai: string;
  unit: string;
  yurisdiksi: string;
  program: string;
  /** Efektif sejak (YYYY-MM-DD) */
  berlakuMulai: string;
  /** Berlaku sampai (opsional) */
  berlakuSampai?: string;
  tipe: TipeSumber;
  url: string;
  judul: string;
  /** Terakhir dicek (YYYY-MM-DD) */
  dicek: string;
  confidence: "tinggi" | "sedang";
  status: StatusSumber;
};

/** Hari maksimal sebelum data dianggap usang. */
const STALE_HARI = 90;

/**
 * Registry entri — data dikunci per data_point.
 * Untuk data_point yang punya lebih dari satu entri dengan nilai berbeda,
 * status ditandai "konflik".
 */
const ENTRI_BAWAH: EntriSumber[] = [
  // --- Batas penghasilan MBR FLPP (rumah tapak) ---
  // Sumber resmi (Permen PKP via BP Tapera situs resmi)
  {
    kunci: "flpp.batas-penghasilan.zona1",
    nilai: "belumKawin Rp8,5 jt / kawin Rp10 jt",
    unit: "Rp/bulan",
    yurisdiksi: "Nasional (Zona 1)",
    program: "FLPP",
    berlakuMulai: "2026-08-06",
    tipe: "PERMEN",
    url: "https://bptapera.go.id/kpr-flpp",
    judul: "BP Tapera — Ketentuan KPR FLPP (situs resmi)",
    dicek: "2026-08-06",
    confidence: "tinggi",
    status: "aktif",
  },
  // Publikasi regional BP Tapera Juli 2026 (Jawa Timur) — berbeda dengan
  // situs resmi: belum menikah Rp8 jt / sudah menikah Rp11 jt
  {
    kunci: "flpp.batas-penghasilan.zona1",
    nilai: "belumKawin Rp8 jt / kawin Rp11 jt",
    unit: "Rp/bulan",
    yurisdiksi: "Jawa Timur (Zona 1)",
    program: "FLPP",
    berlakuMulai: "2026-07-01",
    tipe: "PUBLIKASI",
    url: "https://bptapera.go.id/berita/jawa-timur-2026",
    judul: "BP Tapera — Publikasi FLPP Jawa Timur (Juli 2026)",
    dicek: "2026-09-13",
    confidence: "tinggi",
    status: "aktif",
  },
  // Zona 2–4 tidak punya konflik publikasi: cukup satu entri per zona
  {
    kunci: "flpp.batas-penghasilan.zona2",
    nilai: "belumKawin Rp9 jt / kawin Rp11 jt",
    unit: "Rp/bulan",
    yurisdiksi: "Nasional (Zona 2)",
    program: "FLPP",
    berlakuMulai: "2026-08-06",
    tipe: "PERMEN",
    url: "https://bptapera.go.id/kpr-flpp",
    judul: "BP Tapera — Ketentuan KPR FLPP (situs resmi)",
    dicek: "2026-08-06",
    confidence: "tinggi",
    status: "aktif",
  },
  {
    kunci: "flpp.batas-penghasilan.zona3",
    nilai: "belumKawin Rp10,5 jt / kawin Rp12 jt",
    unit: "Rp/bulan",
    yurisdiksi: "Nasional (Zona 3)",
    program: "FLPP",
    berlakuMulai: "2026-08-06",
    tipe: "PERMEN",
    url: "https://bptapera.go.id/kpr-flpp",
    judul: "BP Tapera — Ketentuan KPR FLPP (situs resmi)",
    dicek: "2026-08-06",
    confidence: "tinggi",
    status: "aktif",
  },
  {
    kunci: "flpp.batas-penghasilan.zona4",
    nilai: "belumKawin Rp12 jt / kawin Rp14 jt",
    unit: "Rp/bulan",
    yurisdiksi: "Nasional (Zona 4)",
    program: "FLPP",
    berlakuMulai: "2026-08-06",
    tipe: "PERMEN",
    url: "https://bptapera.go.id/kpr-flpp",
    judul: "BP Tapera — Ketentuan KPR FLPP (situs resmi)",
    dicek: "2026-08-06",
    confidence: "tinggi",
    status: "aktif",
  },
];

const REGISTRI: Record<string, EntriSumber[]> = {};
for (const e of ENTRI_BAWAH) {
  (REGISTRI[e.kunci] ??= []).push(e);
}

/** Kembalikan semua entri untuk suatu data key. */
export function entriSumber(kunci: string): readonly EntriSumber[] {
  return REGISTRI[kunci] ?? [];
}

/** Hari sejak checked_at. */
function hariSejak(dicek: string): number {
  const now = new Date();
  const d = new Date(`${dicek}T00:00:00`);
  return Math.floor((now.getTime() - d.getTime()) / 86_400_000);
}

/**
 * Deteksi konflik: bila ada >1 entri aktif dengan nilai berbeda
 * untuk kunci yang sama → status "konflik".
 */
export function detectConflict(kunci: string): StatusSumber {
  const entri = entriSumber(kunci).filter((e) => e.status === "aktif");
  // SOURCE MISSING → jangan fabricate: tak ada data, tak ada konflik/stale.
  if (entri.length === 0) return "aktif";
  const nilaiSet = new Set(entri.map((e) => e.nilai));
  if (nilaiSet.size > 1) return "konflik";
  if (hariSejak(entri[0].dicek) > STALE_HARI) return "usang";
  return "aktif";
}

/**
 * Kembalikan array peringatan untuk data key tertentu.
 * Dipanggil dari eligibility engine untuk menampilkan ke pengguna.
 */
export function peringatanSumber(kunci: string): string[] {
  const status = detectConflict(kunci);
  const entri = entriSumber(kunci);
  if (status === "konflik") {
    const list = entri
      .filter((e) => e.status === "aktif")
      .map(
        (e) =>
          `"${e.nilai}" (${e.judul} — ${e.tipe === "PERMEN" ? "Permen" : "publikasi regional"})`,
      )
      .join(" VS ");
    return [
      `Konflik sumber resmi: ${list}. Diambil dari sumber tertinggi (Permen) tapi perlu dikonfirmasi ke BP Tapera / bank penyalur sebelum pengajuan.`,
    ];
  }
  if (status === "usang") {
    return [
      `Data "${kunci}" sudah lebih dari ${STALE_HARI} hari sejak dicek — konfirmasi ulang ke sumber resmi.`,
    ];
  }
  return [];
}
