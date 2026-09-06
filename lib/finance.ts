/** Kalkulasi keuangan KPR. Semua angka dalam Rupiah penuh. */

const formatterRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(n: number): string {
  return formatterRupiah.format(Math.round(n));
}

/**
 * Parse input angka yang mungkin memakai pemisah ribuan bergaya Indonesia
 * ("8.000.000"), spasi, atau format mata uang ("Rp 8.000.000"). Mengembalikan
 * angka asli, atau `fallback` bila rupanya tidak valid.
 */
export function parseNumberId(input: string, fallback = 0): number {
  const cleaned = String(input).trim().replace(/[^\d.,-]/g, "");
  if (!cleaned) return fallback;
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Format input mentah menjadi angka dengan pemisah ribuan Indonesia ("8.000.000")
 * — untuk input teks yang diformat langsung saat pengguna mengetik.
 */
export function formatAngkaId(raw: string): string {
  const digits = raw
    .replace(/\D/g, "")
    .replace(/^0+(?=\d)/, "")
    .slice(0, 15);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Plafon pinjaman = harga rumah dikurangi uang muka. */
export function plafondMaksimal(harga: number, dpPercent: number): number {
  return Math.round(harga * (1 - dpPercent / 100));
}

/**
 * Angsuran bulanan dengan skema anuitas.
 * rateYearlyPct: suku bunga efektif per tahun dalam persen (mis. 5 untuk 5%).
 */
export function angsuranBulanan(
  plafon: number,
  rateYearlyPct: number,
  tenorYears: number,
): number {
  const n = tenorYears * 12;
  if (n <= 0 || plafon <= 0) return 0;
  const r = rateYearlyPct / 100 / 12;
  if (r === 0) return Math.round(plafon / n);
  const pow = Math.pow(1 + r, n);
  return Math.round((plafon * r * pow) / (pow - 1));
}

export type BarisAmortisasi = {
  bulan: number;
  angsuran: number;
  pokok: number;
  bunga: number;
  saldo: number;
};

/** Tabel amortisasi penuh per bulan. */
export function jadwalAmortisasi(
  plafon: number,
  rateYearlyPct: number,
  tenorYears: number,
): BarisAmortisasi[] {
  const n = tenorYears * 12;
  const r = rateYearlyPct / 100 / 12;
  const angsuran = angsuranBulanan(plafon, rateYearlyPct, tenorYears);
  let saldo = plafon;
  const rows: BarisAmortisasi[] = [];
  for (let i = 1; i <= n; i++) {
    const bunga = Math.round(saldo * r);
    const pokok = angsuran - bunga;
    saldo = Math.max(0, saldo - pokok);
    rows.push({ bulan: i, angsuran, pokok, bunga, saldo });
  }
  return rows;
}

/** Total keseluruhan yang dibayar selama tenor (plafon + bunga). */
export function totalPembayaran(
  plafon: number,
  rateYearlyPct: number,
  tenorYears: number,
): number {
  return angsuranBulanan(plafon, rateYearlyPct, tenorYears) * tenorYears * 12;
}

/**
 * Total pembayaran untuk skema dua lapis (fixed lalu floating), sesuai
 * praktik bank: angsuran fixed berjalan `fixedYears`, lalu SISA POKOK
 * dijadwalkan ulang pada bunga floating atas sisa tenor.
 *
 * Mengembalikan total bayar, angsuran masa floating, dan total bunga.
 * Tanpa floatingRate, hasilnya sama dengan skema flat sederhana.
 */
export function totalPembayaranBertahap(
  plafon: number,
  fixedRateYearlyPct: number,
  floatingRateYearlyPct: number | null,
  tenorYears: number,
  fixedYears: number,
): { total: number; angsuranFloating: number | null; bunga: number } {
  const angsuranAwal = angsuranBulanan(plafon, fixedRateYearlyPct, tenorYears);
  const n = tenorYears * 12;
  const nFixed = Math.min(Math.max(0, fixedYears), tenorYears) * 12;

  if (!floatingRateYearlyPct || nFixed >= n) {
    const total = angsuranAwal * n;
    return { total, angsuranFloating: null, bunga: total - plafon };
  }

  const rows = jadwalAmortisasi(plafon, fixedRateYearlyPct, tenorYears);
  const sisaSetelahFixed = rows[nFixed - 1]?.saldo ?? plafon;
  const tenorSisa = tenorYears - fixedYears;
  const floating = angsuranBulanan(
    sisaSetelahFixed,
    floatingRateYearlyPct,
    tenorSisa,
  );
  const total = angsuranAwal * nFixed + floating * tenorSisa * 12;
  return { total, angsuranFloating: floating, bunga: total - plafon };
}

export type RincianBiayaAwal = {
  dp: number;
  provisi: number;
  admin: number;
  bphtb: number;
  notaris: number;
  asuransi: number;
  total: number;
};

/**
 * Estimasi biaya awal (indikatif, di luar booking fee).
 * Asumsi umum pasar: provisi 1% plafon, admin flat, BPHTB 5% × (harga − NPOPTKP 60jt),
 * notaris/PPAT 1% harga, asuransi jiwa+kebakaran 0,45% plafon.
 */
export function biayaAwal(harga: number, dpPercent: number): RincianBiayaAwal {
  const dp = Math.round(harga * (dpPercent / 100));
  const plafon = plafondMaksimal(harga, dpPercent);
  const provisi = Math.round(plafon * 0.01);
  const admin = 500_000;
  const bphtb = Math.max(0, Math.round((harga - 60_000_000) * 0.05));
  const notaris = Math.round(harga * 0.01);
  const asuransi = Math.round(plafon * 0.0045);
  const total = dp + provisi + admin + bphtb + notaris + asuransi;
  return { dp, provisi, admin, bphtb, notaris, asuransi, total };
}

export type InputKemampuanBeli = {
  penghasilanBulanan: number;
  cicilanLainBulanan?: number;
  dbrPersen: number; // rasio maksimal angsuran terhadap penghasilan bersih
  dpPersen: number;
  tenorTahun: number;
  bungaTahunanPersen: number;
};

export type HasilKemampuanBeli = {
  angsuranMaksimal: number;
  plafonMaksimal: number;
  hargaMaksimal: number;
};

/**
 * Menghitung harga rumah maksimal yang mampu dibeli (reverse calculator).
 *
 * Angsuran maksimal = (penghasilan − cicilan lain) × dbr%; lalu plafon
 * maksimal diselesaikan dari formula anuitas:
 *
 *   angsuran = P·r·(1+r)^n / ((1+r)^n − 1)
 *   => P = angsuran·((1+r)^n − 1) / (r·(1+r)^n)
 *
 * Lengkapnya harga = plafon/(1 − dp%).
 */
export function hargaMaksimalMampu(
  input: InputKemampuanBeli,
): HasilKemampuanBeli {
  const { penghasilanBulanan, cicilanLainBulanan = 0, dbrPersen } = input;
  const n = input.tenorTahun * 12;
  const r = input.bungaTahunanPersen / 100 / 12;

  const bersih = Math.max(0, penghasilanBulanan - cicilanLainBulanan);
  const angsuranMaksimal = Math.round((bersih * dbrPersen) / 100);
  if (n <= 0 || angsuranMaksimal <= 0) {
    return { angsuranMaksimal, plafonMaksimal: 0, hargaMaksimal: 0 };
  }

  // Bunga ≤ 0% diperlakukan linear (tanpa bunga): plafon = angsuran × n.
  // Konsisten dengan penanganan r === 0 di angsuranBulanan.
  const dpFaktor = 1 - input.dpPersen / 100;
  if (r <= 0) {
    const plafon = angsuranMaksimal * n;
    return {
      angsuranMaksimal,
      plafonMaksimal: plafon,
      hargaMaksimal: Math.round(plafon / dpFaktor),
    };
  }

  const pow = Math.pow(1 + r, n);
  const plafon = Math.round(
    (angsuranMaksimal * (pow - 1)) / (r * pow),
  );
  const harga = Math.round(plafon / dpFaktor);
  return { angsuranMaksimal, plafonMaksimal: plafon, hargaMaksimal: harga };
}

/**
 * Berapa bulan yang dibutuhkan untuk mencapai target tabungan (mis. DP)
 * dengan tabungan awal dan setoran bulanan tetap. 0 = sudah tercapai,
 * Infinity = tidak akan tercapai karena setoran 0.
 */
export function bulanUntukMenabung(
  target: number,
  tabunganAwal: number,
  perBulan: number,
): number {
  const sisa = Math.max(0, target - tabunganAwal);
  if (sisa <= 0) return 0;
  if (perBulan <= 0) return Infinity;
  return Math.ceil(sisa / perBulan);
}

/**
 * Kebutuhan tabungan bulanan agar target tercapai dalam jumlah bulan tertentu.
 * 0 = sudah tercapai sejak awal. Infinity = target waktu tidak valid.
 */
export function tabunganBulananUntuk(
  target: number,
  tabunganAwal: number,
  jumlahBulan: number,
): number {
  const sisa = Math.max(0, target - tabunganAwal);
  if (sisa <= 0) return 0;
  if (jumlahBulan <= 0) return Infinity;
  return Math.ceil(sisa / jumlahBulan);
}

/**
 * Total kumulatif biaya beli (dana awal + angsuran tetap) selama N tahun.
 * Angsuran hanya dihitung sampai tenor kredit berakhir (`tenorTahun`) —
 * setelah lunas, tidak ada lagi biaya angsuran. Bila `tenorTahun` tidak
 * diisi, angsuran dianggap berjalan sepanjang periode (perilaku lama).
 */
export function biayaBeliKumulatif(
  danaAwal: number,
  angsuranBulan: number,
  tahun: number,
  tenorTahun?: number,
): number {
  const tahunAktif =
    tenorTahun === undefined
      ? Math.max(0, tahun)
      : Math.min(Math.max(0, tahun), Math.max(0, tenorTahun));
  return Math.max(0, danaAwal) + Math.max(0, angsuranBulan) * 12 * tahunAktif;
}

/** Total kumulatif biaya sewa selama N tahun dengan kenaikan sewa tahunan (%). */
export function biayaSewaKumulatif(
  sewaBulanan: number,
  kenaikanTahunanPersen: number,
  tahun: number,
): number {
  let total = 0;
  let sewa = sewaBulanan;
  for (let t = 0; t < Math.max(0, tahun); t++) {
    total += sewa * 12;
    sewa *= 1 + kenaikanTahunanPersen / 100;
  }
  return Math.round(total);
}

/**
 * Tahun impas (break-even): tahun pertama saat biaya kumulatif beli sudah
 * tidak lebih mahal dari kumulatif sewa. `null` bila beli selalu lebih mahal
 * sampai batas horizon. `tenorTahun` membatasi berapa lama angsuran masih
 * dihitung (setelah KPR lunas, biaya beli berhenti tumbuh).
 */
export function tahunImpas(
  danaAwal: number,
  angsuranBulan: number,
  sewaBulanan: number,
  kenaikanTahunanPersen: number,
  tenorTahun?: number,
  horizonTahun = 40,
): number | null {
  for (let t = 1; t <= horizonTahun; t++) {
    if (
      biayaBeliKumulatif(danaAwal, angsuranBulan, t, tenorTahun) <=
      biayaSewaKumulatif(sewaBulanan, kenaikanTahunanPersen, t)
    ) {
      return t;
    }
  }
  return null;
}
