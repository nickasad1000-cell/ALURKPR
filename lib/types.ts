export type FaktaTahap = {
  nilai: string;
  label: string;
  /** Contoh sumber resmi (dokumen negara / situs resmi). */
  sumber?: string;
  /** Tanggal data terakhir diverifikasi (YYYY-MM-DD). */
  terakhirDicek?: string;
};

export type Tahap = {
  nomor: number;
  slug: string;
  judul: string;
  judulSingkat: string;
  ringkasan: string;
  fakta?: FaktaTahap;
  penjelasan: string[];
  dokumen: string[];
  estimasiWaktu: string;
  biayaTerkait: string[];
  tips: string[];
  kesalahanUmum: string[];
  perbedaanSubsidi: string;
};

export type SkemaBank = "konvensional" | "syariah";

export type BankRate = {
  id: string;
  bank_name: string;
  kpr_type: "subsidi" | "komersial";
  fixed_rate: number;
  fixed_years: number;
  floating_rate: number | null;
  max_tenor_years: number;
  min_dp_percent: number;
  notes: string | null;
  updated_at: string;
  /** Skema pembiayaan — syariah (murabahah) tidak dibandingkan satu-ke-satu dengan konvensional. */
  skema: SkemaBank;
};

export type FaqItem = { pertanyaan: string; jawaban: string };

export type GlosariumItem = { istilah: string; definisi: string };

export type StatusKeluarga = "belum-kawin" | "kawin";

export type KelayakanInput = {
  penghasilan: number;
  belumPunyaRumah: boolean;
  belumPernahSubsidi: boolean;
  hargaUnit: number;
  dewasaAtauMenikah: boolean;
  /** Status keluarga — menentukan batas penghasilan MBR (Permen PKP No. 5/2025 jo. No. 1/2026). */
  statusKeluarga: StatusKeluarga;
  /** Zona wilayah FLPP (Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1/2026): 1-4. */
  zona: 1 | 2 | 3 | 4;
  /** Zona harga maksimal rumah tapak (Kepmen 1722/KPTS/M/2026): 1-5. */
  zonaHarga: 1 | 2 | 3 | 4 | 5;
};

export type SyaratCheck = { label: string; lolos: boolean; catatan?: string };

export type KelayakanResult = {
  layak: boolean;
  alasan: string[];
  syarat: SyaratCheck[];
  /** Peringatan provensi/konflik sumber — ditampilkan sebagai warning kuning. */
  peringatan: string[];
};