import {
  Users,
  Percent,
  TrendingUp,
  Wallet,
  CalendarDays,
  Home as HomeIcon,
  Clock,
  Ban,
} from "lucide-react";

const HARGA_SUBSIDI = 166_000_000;
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const fakta: {
  icon: typeof Users;
  nilai: string;
  label: string;
  catatan: string;
  sorot?: boolean;
}[] = [
  {
    icon: Users,
    nilai: "21–58",
    label: "Usia pemohon",
    catatan: "Minimal 21, maksimal 58 tahun saat pengajuan.",
  },
  {
    icon: Percent,
    nilai: "5%",
    label: "Bunga KPR subsidi",
    catatan: "Flat sampai lunas (FLPP).",
  },
  {
    icon: TrendingUp,
    nilai: "Floating",
    label: "Bunga komersial",
    catatan: "Mengikuti peraturan perbankan, ditinjau tiap tahun.",
  },
  {
    icon: Wallet,
    nilai: "1%",
    label: "DP subsidi (mulai)",
    catatan: `≈ ${rupiah.format(Math.round(HARGA_SUBSIDI * 0.01))} dari harga subsidi.`,
  },
  {
    icon: CalendarDays,
    nilai: "10–20",
    label: "Tenor subsidi",
    catatan: "Pilihan 10, 15, atau 20 tahun. Komersial ikut ketentuan bank.",
  },
  {
    icon: HomeIcon,
    nilai: "166 jt",
    label: "Harga rumah subsidi",
    catatan: "Mengikuti ketetapan pemerintah tahun berjalan.",
    sorot: true,
  },
  {
    icon: Clock,
    nilai: "±1 bulan",
    label: "Sampai kunci di tangan",
    catatan: "Jika berkas lengkap dan rumah ready stock.",
  },
  {
    icon: Ban,
    nilai: "SLIK Kol-5",
    label: "Penyebab gagal pengajuan",
    catatan: "Kendala BI checking dari awal, mis. kredit macet.",
  },
];

export function BlokDemografis() {
  return (
    <div className="rounded-[2.5rem] border border-line bg-surface p-7 shadow-sm sm:p-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          Demografis & fakta
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Sekilas profil dan aturan KPR
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Ringkasan angka yang berlaku umum di lapangan — cocokkan dengan
          kondisi dan skema pilihanmu.
        </p>
      </div>
      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fakta.map((f) => (
          <div
            key={f.label}
            className={`rounded-3xl border p-6 ${
              f.sorot
                ? "border-accent/40 bg-accent-soft"
                : "border-line bg-paper"
            }`}
          >
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
              <f.icon
                className={`size-4 ${f.sorot ? "text-accent-ink" : "text-primary"}`}
                aria-hidden="true"
              />
              {f.label}
            </dt>
            <dd className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              {f.nilai}
            </dd>
            <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
              {f.catatan}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-xs text-ink-soft">
        Data & estimasi berdasarkan praktik Syahfalah Group, per 2026.
        Bunga, DP, dan harga subsidi bisa berubah — verifikasi ke bank atau
        ketentuan pemerintah saat pengajuan.
      </p>
    </div>
  );
}