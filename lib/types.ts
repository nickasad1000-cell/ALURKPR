export type FaktaTahap = {
  nilai: string;
  label: string;
  /** Contoh sumber resmi (dokumen negara / situs resmi). */
  sumber?: string;
  /** Tanggal data terakhir diverifikasi (YYYY-MM-DD). */
  terakhirDicek?: string;
};

/** Kelompok master dokumen pengajuan KPR (PRD §52). */
export type KelompokDokumen =
  | "identitas"
  | "penghasilan"
  | "keuangan"
  | "properti"
  | "akad";

export type DokumenTahap = {
  kelompok: KelompokDokumen;
  nama: string;
};

export const KELOMPOK_DOKUMEN_LABEL: Record<KelompokDokumen, string> = {
  identitas: "Identitas",
  penghasilan: "Penghasilan",
  keuangan: "Keuangan",
  properti: "Properti",
  akad: "Akad",
};

export type Tahap = {
  nomor: number;
  slug: string;
  judul: string;
  judulSingkat: string;
  ringkasan: string;
  estimasiWaktu: string;
  fakta?: FaktaTahap;
  /** TUJUAN — satu keputusan yang dicapai di tahap ini. */
  tujuan: string;
  /** SIAPKAN INI — prasyarat sebelum lanjut. */
  siapkanIni: string[];
  /** LAKUKAN — urutan aksi. */
  lakukan: string[];
  /** UANG — pos biaya yang muncul di tahap ini. */
  uang: string[];
  /** DOKUMEN — dari master 5 kelompok. */
  dokumen: DokumenTahap[];
  /** PERLU DIPERHATIKAN — hal yang sering salah / red flag. */
  perhatikan: string[];
  /** HASIL TAHAP — checklist yang harus terpenuhi. */
  hasilTahap: string[];
  /** SIAP LANJUT? — self-check satu layar. */
  siapLanjut: string;
  /** Berapa lama menunggu antar langkah (opsional, teks bebas). */
  menunggu?: string;
};

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
};

export type FaqItem = { pertanyaan: string; jawaban: string };

export type GlosariumItem = { istilah: string; definisi: string };

export type KelayakanInput = {
  penghasilan: number;
  belumPunyaRumah: boolean;
  belumPernahSubsidi: boolean;
  hargaUnit: number;
  dewasaAtauMenikah: boolean;
  /** Zona wilayah FLPP (Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1/2026): 1-4. */
  zona: 1 | 2 | 3 | 4;
};

export type SyaratCheck = { label: string; lolos: boolean; catatan?: string };

export type KelayakanResult = {
  layak: boolean;
  alasan: string[];
  syarat: SyaratCheck[];
};