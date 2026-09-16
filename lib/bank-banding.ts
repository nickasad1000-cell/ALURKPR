import type { BankRate } from "./types";

/**
 * Utilitas perbandingan antar bank.
 *
 * Prinsip: produk syariah (murabahah) dan konvensional memakai cara hitung yang
 * berbeda, sehingga TIDAK dibandingkan satu-ke-satu. Pada sortir "bunga",
 * konvensional diurutkan naik dulu, lalu syariah dalam blok sendiri (naik),
 * dan lencana "bunga terendah" hanya untuk konvensional.
 */

export type FilterBank = "semua" | "subsidi" | "komersial";
export type SortirBank = "bunga" | "dp" | "nama";

/** Urutan default (nofilter) memakai urutan data asli. */
export function filterBankList(
  list: BankRate[],
  filter: FilterBank,
): BankRate[] {
  return filter === "semua" ? list : list.filter((b) => b.kpr_type === filter);
}

export function bankTerendahKonvensional(list: BankRate[]): number | null {
  const konv = list.filter((b) => b.skema !== "syariah");
  if (konv.length === 0) return null;
  return Math.min(...konv.map((b) => b.fixed_rate));
}

/**
 * Sortir utama. `fungsi` boleh undefined (tanpa sorting, urutan asli).
 * Implementasi di bawah dipakai bila perlu lebih dari satu level sortir.
 */
type Pembanding = (a: BankRate, b: BankRate) => number;

const byNama: Pembanding = (a, b) => a.bank_name.localeCompare(b.bank_name, "id");
const byFixedAsc: Pembanding = (a, b) => a.fixed_rate - b.fixed_rate;
const byDpAsc: Pembanding = (a, b) => a.min_dp_percent - b.min_dp_percent;

/**
 * Urutkan daftar bank sesuai filter + sortir.
 * Rule "bunga": konvensional dulu (naik), lalu syariah (naik) — supaya bunga
 * syariah tidak pernah masuk ranking terendah campuran.
 */
export function urutBank(
  list: BankRate[],
  filter: FilterBank,
  sortir: SortirBank,
): BankRate[] {
  const tersaring = filterBankList(list, filter);

  if (sortir === "nama") return [...tersaring].sort(byNama);
  if (sortir === "dp") return [...tersaring].sort((a, b) => byDpAsc(a, b) || byNama(a, b));

  // "bunga": konvensional naik, disusul syariah naik.
  const konv = tersaring.filter((b) => b.skema !== "syariah");
  const syariah = tersaring.filter((b) => b.skema === "syariah");
  return [
    ...[...konv].sort((a, b) => byFixedAsc(a, b) || byNama(a, b)),
    ...[...syariah].sort((a, b) => byFixedAsc(a, b) || byNama(a, b)),
  ];
}