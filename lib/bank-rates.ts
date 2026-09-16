import "server-only";
import type { BankRate } from "./types";
import { getSupabase } from "./supabase";

/**
 * Data perbandingan suku bunga bank — SEED (indikatif, per 2026).
 * Saat Supabase terhubung, data di tabel `bank_rates` akan menggantikan ini.
 * Nilai suku bunga dan DP bisa berbeda per wilayah & berkala — verifikasi ke bank.
 */
export const seedBankRates: BankRate[] = [
  {
    id: "btn-subsidi",
    bank_name: "BTN (Mitra FLPP)",
    kpr_type: "subsidi",
    fixed_rate: 5,
    fixed_years: 20,
    floating_rate: null,
    max_tenor_years: 20,
    min_dp_percent: 1,
    notes: "Penyalur FLPP terbesar; DP mulai 1%.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "btn-komersial",
    bank_name: "BTN",
    kpr_type: "komersial",
    fixed_rate: 7.25,
    fixed_years: 3,
    floating_rate: 9.5,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Kondisi: fixed 3 tahun pertama.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "bri-komersial",
    bank_name: "BRI",
    kpr_type: "komersial",
    fixed_rate: 7,
    fixed_years: 3,
    floating_rate: 9.25,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Fixed 3 tahun, lalu floating.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "bni-komersial",
    bank_name: "BNI",
    kpr_type: "komersial",
    fixed_rate: 7,
    fixed_years: 3,
    floating_rate: 9,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Tersedia program khusus untuk ekspatriat.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "mandiri-komersial",
    bank_name: "Bank Mandiri",
    kpr_type: "komersial",
    fixed_rate: 7.15,
    fixed_years: 3,
    floating_rate: 9.5,
    max_tenor_years: 30,
    min_dp_percent: 10,
    notes: "Tenor hingga 30 tahun.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "bca-komersial",
    bank_name: "BCA",
    kpr_type: "komersial",
    fixed_rate: 6.6,
    fixed_years: 3,
    floating_rate: 9.3,
    max_tenor_years: 25,
    min_dp_percent: 15,
    notes: "DP minimum 15%.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "cimb-komersial",
    bank_name: "CIMB Niaga",
    kpr_type: "komersial",
    fixed_rate: 6.9,
    fixed_years: 3,
    floating_rate: 9.4,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Promo sering untuk debitur existing.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
  {
    id: "bsi-komersial",
    bank_name: "Bank Syariah Indonesia",
    kpr_type: "komersial",
    fixed_rate: 7.4,
    fixed_years: 25,
    floating_rate: null,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Skema murabahah — angsuran tetap (flat) hingga lunas.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "syariah",
  },
  {
    id: "danamon-komersial",
    bank_name: "Bank Danamon",
    kpr_type: "komersial",
    fixed_rate: 6.75,
    fixed_years: 2,
    floating_rate: 9,
    max_tenor_years: 25,
    min_dp_percent: 10,
    notes: "Fixed 2 tahun pertama.",
    updated_at: "2026-01-15T00:00:00.000Z",
    skema: "konvensional",
  },
];

export type SumberBankRates = {
  data: BankRate[];
  sumber: "db" | "seed";
  /** Tanggal data diperbarui (nilai seed), dalam ISO string. */
  dicek?: string;
};

const TIMEOUT_MS = 2500;

/**
 * Mengambil data suku bunga bank dari Supabase; bila gagal/terlambat/absent,
 * kembali ke seed lokal agar halaman selalu tersaji. Penanda `sumber` memberi
 * tahu pengguna apakah angkanya dari DB live atau contoh seed.
 */
export async function getBankRates(): Promise<SumberBankRates> {
  const supabase = getSupabase();
  if (!supabase) return { data: seedBankRates, sumber: "seed", dicek: seedDate() };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const { data, error } = await supabase
      .from("bank_rates")
      .select("*")
      .order("kpr_type", { ascending: true })
      .abortSignal(controller.signal);

    if (error || !data || data.length === 0) {
      return { data: seedBankRates, sumber: "seed", dicek: seedDate() };
    }
    return { data: data as BankRate[], sumber: "db" };
  } catch {
    return { data: seedBankRates, sumber: "seed", dicek: seedDate() };
  } finally {
    clearTimeout(timer);
  }
}

/** Tanggal seed terbaru di file seed (dipakai penanda "data contoh per …"). */
function seedDate(): string {
  const dates = seedBankRates
    .map((r) => r.updated_at)
    .filter(Boolean)
    .sort()
    .reverse();
  return dates[0] ?? "";
}

/** Memunculkan fallback seed ke tabel Supabase (opsional; dipakai setup awal). */
export async function syncSeedToSupabase(): Promise<{ ok: boolean; detail: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, detail: "Env Supabase belum dikonfigurasi." };
  const { error } = await supabase.from("bank_rates").upsert(seedBankRates);
  return error
    ? { ok: false, detail: error.message }
    : { ok: true, detail: "Seed berhasil disinkronkan." };
}