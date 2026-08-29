export type Tahap = {
  nomor: number;
  slug: string;
  judul: string;
  judulSingkat: string;
  ringkasan: string;
  penjelasan: string[];
  dokumen: string[];
  estimasiWaktu: string;
  biayaTerkait: string[];
  tips: string[];
  kesalahanUmum: string[];
  perbedaanSubsidi: string;
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
  sudahPunyaRumah: boolean;
  pernahSubsidi: boolean;
  hargaUnit: number;
  dewasaAtauMenikah: boolean;
};

export type SyaratCheck = { label: string; lolos: boolean; catatan?: string };

export type KelayakanResult = {
  layak: boolean;
  alasan: string[];
  syarat: SyaratCheck[];
};
