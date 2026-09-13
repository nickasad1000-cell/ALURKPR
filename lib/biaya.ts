/**
 * Mesin rincian biaya awal dengan status per-item dan nilai yang bisa
 * belum diketahui (PRD §11). Setiap item membawa kategori & status supaya
 * pengguna tahu mana angka resmi/mana estimasi/mana yang tergantung wilayah.
 */

export type KategoriBiaya =
  | "program"
  | "bank"
  | "notaris"
  | "pajak"
  | "pengembang"
  | "simulasi";

export type StatusBiaya = "resmi" | "indikatif" | "internal";

export type ItemBiaya = {
  kategori: KategoriBiaya;
  label: string;
  /** null = belum bisa dihitung tanpa info tambahan (mis. wilayah). */
  nilai: number | null;
  status: StatusBiaya;
  catatan?: string;
};

export type RincianBiaya = {
  items: ItemBiaya[];
  /** Jumlah item bertipe angka (nilai null tidak ikut). */
  totalTerestimasi: number;
  /** Total per status — dipakai label "hitungan indikatif". */
  totalPerStatus: Record<StatusBiaya, number>;
  /** Ada item yang belum bisa dihitung (nilai null). */
  adaNull: boolean;
};

export function rincianBiayaAwal(
  harga: number,
  dpPercent: number,
  opts?: { lokasi?: string },
): RincianBiaya {
  const dp = Math.round(harga * (dpPercent / 100));
  const plafon = Math.round(harga * (1 - dpPercent / 100));

  const items: ItemBiaya[] = [
    {
      kategori: "program",
      label: "Uang muka (DP)",
      nilai: dp,
      status: "indikatif",
      catatan: dpPercent > 0 ? `${dpPercent}% dari harga unit` : "Tanpa uang muka",
    },
    {
      kategori: "bank",
      label: "Provisi kredit",
      nilai: Math.round(plafon * 0.01),
      status: "indikatif",
      catatan: "±1% dari plafon",
    },
    {
      kategori: "bank",
      label: "Biaya administrasi",
      nilai: 500_000,
      status: "indikatif",
      catatan: "Flat lazim ±Rp500rb",
    },
    {
      kategori: "pajak",
      label: "BPHTB",
      nilai: opts?.lokasi
        ? Math.max(0, Math.round((harga - 60_000_000) * 0.05))
        : null,
      status: "indikatif",
      catatan: opts?.lokasi
        ? "5% × (harga − NPOPTKP 60jt), asumsi zona standar"
        : "Tergantung wilayah/NPOPTKP setempat — isi lokasi untuk estimasi",
    },
    {
      kategori: "notaris",
      label: "Notaris / PPAT",
      nilai: Math.round(harga * 0.01),
      status: "indikatif",
      catatan: "±1% dari harga unit",
    },
    {
      kategori: "bank",
      label: "Asuransi jiwa & kebakaran",
      nilai: Math.round(plafon * 0.0045),
      status: "indikatif",
      catatan: "±0,45% dari plafon per tahun (estimasi)",
    },
    {
      kategori: "pengembang",
      label: "Booking fee",
      nilai: null,
      status: "internal",
      catatan: "Bisa jadi bagian dari DP — beda antar pengembang",
    },
  ];

  const totalTerestimasi = items.reduce(
    (acc, i) => acc + (i.nilai ?? 0),
    0,
  );
  const totalPerStatus: Record<StatusBiaya, number> = {
    resmi: 0,
    indikatif: 0,
    internal: 0,
  };
  for (const i of items) {
    if (i.nilai !== null) totalPerStatus[i.status] += i.nilai;
  }

  return {
    items,
    totalTerestimasi,
    totalPerStatus,
    adaNull: items.some((i) => i.nilai === null),
  };
}