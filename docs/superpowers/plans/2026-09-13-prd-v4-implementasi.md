# Plan: Implementasi PRD V4 AlurKPR (2026-09-13)

Tanggal: 2026-09-13
Status: Siap dieksekusi
Repo: `C:\Users\Syahfalah\projects\alurkpr`
Cabang: `main` (HEAD `a284fc3`)

## Ringkasan

Menuntaskan jarak PRD V4 (target skor 9.0–9.5) dari kondisi baseline (5.8–7.5).
Semua tugas ditulis "test-first" untuk logika, dan "verifikasi manual" untuk
konten/UI. Kerja per-milestone diakhiri gate: `npm run lint`, `npm test`,
`npm run build`, lalu commit + push + `vercel --prod`.

Perintah dasar (jalankan dari root repo):
- Test satu file: `npx vitest run lib/finance.test.ts`
- Test penuh: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`
- E2E: `npx playwright test`

Catatan lingkungan (jangan dilanggar):
- JANGAN hapus `.next` lalu jalankan `tsc` langsung — LayoutProps/validator
  adalah hasil generate build. Regenerate via `npm run build`.
- `rg` tidak andal di mesin ini — pakai Select-String untuk pencarian teks.
- Git push dengan `GIT_TERMINAL_PROMPT=0`. Vercel CLI: `AppData\Roaming\npm\vercel.cmd`.

## Keputusan yang sudah diputuskan asisten (dipakai sebagai dasar, bisa dibatalkan)

1. Hero: form KemampuanRingkas keluar dari hero; hero = 1 CTA "Mulai perjalanan"
   + baris jalur "Keuangan → Rumah → KPR → Akad → Kunci" + blok "3 angka
   perkiraan" statis (PRD §6), alat inti maks 3.
2. `/mulai` TIDAK dibuat; "Mulai dari sini" mengarah ke `/perjalanan`;
   `/profil-kamu` tetap 301 ke `/perjalanan/03-skema`.
3. Autoplay papan jalur dihapus (`components/papan-jalur.tsx`).
4. P0 dulu (kebenaran data), baru UI.
5. Redirect lama dipertahankan semua.
6. `/hubungi` diganti `/kontak` + 301 permanen.

## Tiga hal yang menunggu verifikasi data (default dipakai kalau riset buntu)

- (a) Peta wilayah per tier harga Kepmen 1722 (5 angka: 166/173/182/185/240 jt).
  - Default: Zona harga default = Jawa non-Jabodetabek = Rp166 jt.
- (b) Angka tier "peserta Tapera" (kode saat ini hanya punya belum kawin/kawin).
  - Default: pertahankan 2 tier, tulis catatan "tier peserta Tapera: dicek ulang".
- (c) Aturan usia pemohon terkini (PRD §10: jangan pakai "21/menikah" tanpa sitasi).
  - Default: tulis "perlu dicek ulang" + tautan sumber bila ada.

---

# M0 — Kebenaran data (P0)

## T0.1 Verifikasi 3 data resmi
- Riset web sumber resmi (tapera.go.id, jdih.kemenkeu.go.id / jdih PUPR,
  Permen PKP 5/2025 jo 11/2025 jo 1/2026, Kepmen 1722/KPTS/M/2026).
- Isi hasil ke seluruh "Angka" berikut beserta `sumber` + `dicek`.
- Kalau sumber tidak ketemu: pakai default di atas dan tandai status "indikatif".

## T0.2 Batas penghasilan memakai status kawin
Tujuan: cek kelayakan memakai batas status yang benar, bukan selalu belum kawin.

1. TDD — tambah kasus di `lib/eligibility.test.ts`:
   - kawin, zona 1, penghasilan 9,5 jt → lolos (batas kawin 10 jt);
     belum-kawin, zona 1, 9,5 jt → gagal;
     kawin, zona 1, 10,5 jt → gagal.
   - Harus pakai `statusKeluarga` di input.
2. `lib/types.ts`: tambah ke `KelayakanInput`:
   ```ts
   statusKeluarga: "belum-kawin" | "kawin";
   ```
3. `lib/eligibility.ts` `cekKelayakan`: batas efektif =
   ```ts
   const batasEfektif = input.statusKeluarga === "kawin" ? batas.kawin : batas.belumKawin;
   ```
   - Label syarat penghasilan memakai `batasEfektif`; catatan yang menyebut
     "bila sudah menikah" disesuaikan (hapus bila status sudah menyatakan kawin).
   - Tambah field di `SyaratCheck`? Tidak perlu — hanya label/catatan.
4. Jalankan `npx vitest run lib/eligibility.test.ts` sampai hijau.
5. Koneksi ke form: T4.2 menambah select status keluarga.

## T0.3 Tabel 5 zona harga terpisah dari zona penghasilan
Tujuan: plafon harga unit per Kepmen 1722 (5 tier), bukan konstanta 166 jt.

1. TDD — `lib/eligibility.test.ts`: harga unit 200 jt di zona harga 5 → lolos;
   zona harga 1 → gagal.
2. Buat `lib/zona.ts` (murni, tanpa "use client"):
   ```ts
   export type ZonaHarga = 1 | 2 | 3 | 4 | 5;
   export type HargaSubsidiZona = {
     zona: ZonaHarga;
     label: string;        // diisi hasil riset T0.1; default "Zona {n}"
     maks: number;
     sumber: string;
   };
   export const HARGA_SUBSIDI_PER_ZONA: HargaSubsidiZona[] = [
     { zona: 1, label: "Default: Jawa non-Jabodetabek (dicek ulang)", maks: 166_000_000, sumber: "Kepmen 1722/KPTS/M/2026" },
     { zona: 2, label: "Zona 2 (dicek ulang)", maks: 173_000_000, sumber: "Kepmen 1722/KPTS/M/2026" },
     { zona: 3, label: "Zona 3 (dicek ulang)", maks: 182_000_000, sumber: "Kepmen 1722/KPTS/M/2026" },
     { zona: 4, label: "Zona 4 (dicek ulang)", maks: 185_000_000, sumber: "Kepmen 1722/KPTS/M/2026" },
     { zona: 5, label: "Zona 5 (dicek ulang)", maks: 240_000_000, sumber: "Kepmen 1722/KPTS/M/2026" },
   ];
   export const OPSI_ZONA_HARGA = HARGA_SUBSIDI_PER_ZONA.map((z) => ({
     nilai: z.zona, label: `Zona ${z.zona} — ${z.label} (maks ${z.maks.toLocaleString("id-ID")})`,
   }));
   export function hargaMaksUntukZona(z: ZonaHarga): number {
     return HARGA_SUBSIDI_PER_ZONA.find((x) => x.zona === z)?.maks ?? 166_000_000;
   }
   ```
3. `lib/eligibility.ts`: hapus `HARGA_MAKS_TAPAK_DEFAULT`, re-export
   `export { hargaMaksUntukZona } from "./zona";` untuk kompatibilitas konsumer
   yang ada (cek konsumer via Select-String setelah perubahan).
4. `lib/types.ts` `KelayakanInput`: tambah `zonaHarga: 1 | 2 | 3 | 4 | 5;`.
5. `lib/eligibility.ts` syarat harga unit:
   ```ts
   const plafonHarga = hargaMaksUntukZona(input.zonaHarga);
   label: `Harga unit ≤ Rp${formatJuta(plafonHarga)} (Zona harga ${input.zonaHarga})`,
   lolos: input.hargaUnit <= plafonHarga,
   ```
6. `lib/fakta.ts`: tambah `hargaSubsidiZona` (nilai "166–240", unit "jt per zona",
   status "indikatif") dan perbarui `hargaSubsidiIndikatif` memakai tier terendah.
7. Jalankan test hijau. Koneksi ke form: T4.2.

## T0.4 Bunga flat FLPP (bukan anuitas)
Tujuan: simulasi subsidi memakai bunga flat, bukan anuitas.

1. TDD — `lib/finance.test.ts`:
   - `angsuranFlat(100_000_000, 5, 20)` = 833.333
     (pokok 100jt/240 + bunga 100jt×5%/12 = 416.667 + 416.667).
   - `jadwalFlat`: baris ke-12 saldo = plafon − pokok×12; bunga konstan.
   - `totalPembayaranFlat` = angsuranFlat × n.
   - `hargaMaksimalMampu({ ..., skema: "flat" })`: balik formula flat.
   - `hargaMaksimalMampu` default "anuitas" tetap menghasilkan hasil lama
     (regresi: test lama tetap hijau).
2. `lib/finance.ts`:
   ```ts
   export function angsuranFlat(plafon: number, rateYearlyFlatPct: number, tenorYears: number): number {
     const n = tenorYears * 12;
     if (n <= 0 || plafon <= 0) return 0;
     const rate = rateYearlyFlatPct / 100 / 12;
     return Math.round(plafon / n + plafon * rate);
   }
   export function totalPembayaranFlat(plafon: number, rateYearlyFlatPct: number, tenorYears: number): number {
     return angsuranFlat(plafon, rateYearlyFlatPct, tenorYears) * tenorYears * 12;
   }
   export type BarisFlat = { bulan: number; angsuran: number; pokok: number; bunga: number; saldo: number };
   export function jadwalFlat(plafon: number, rateYearlyFlatPct: number, tenorYears: number): BarisFlat[] {
     const n = tenorYears * 12; const angsuran = angsuranFlat(plafon, rateYearlyFlatPct, tenorYears);
     const pokok = Math.round(plafon / n); const bunga = Math.round(plafon * (rateYearlyFlatPct / 100 / 12));
     return Array.from({ length: n }, (_, i) => {
       const k = i + 1; return { bulan: k, angsuran, pokok, bunga, saldo: Math.max(0, plafon - pokok * k) };
     });
   }
   ```
3. `hargaMaksimalMampu`: tambah `skema?: "anuitas" | "flat"` di
   `InputKemampuanBeli`. Cabang flat:
   ```ts
   if (skema === "flat") {
     // P*(1/n + r) = angsuranMaks -> P = angsuranMaks / (1/n + r); r = annual/100/12
     const denominator = 1 / n + r;
     const plafon = denominator > 0 ? Math.round(angsuranMaksimal / denominator) : 0;
     return { angsuranMaksimal, plafonMaksimal: plafon, hargaMaksimal: Math.round(plafon / dpFaktor) };
   }
   ```
4. Jalankan `npx vitest run lib/finance.test.ts` hijau.
5. Koneksi UI: T4.1 (kalkulator memakai flat untuk FLPP/syariah).

## T0.5 Skema syariah tidak ikut ranking bunga
Tujuan: non-ranking "Bunga terendah" untuk skema syariah; pembanding murni.

1. TDD — buat `lib/bank-banding.test.ts`:
   - `urutBank` dengan filter "semua", sortir "bunga": BSI (skema syariah)
     tidak pernah muncul di posisi terendah — urutan = konvensional naik,
     lalu syariah di blok sendiri (tetap terurut naik antar-syariah).
   - `bankTerendahKonvensional` mengabaikan syariah.
   - sortir "dp" dan "nama" tetap semua campur.
2. `lib/types.ts` `BankRate`: tambah `skema?: "konvensional" | "syariah"`.
3. `lib/bank-rates.ts` seed: `bsi-komersial` diberi `skema: "syariah"`.
4. Buat `lib/bank-banding.ts` (murni):
   ```ts
   export type FilterBank = "semua" | "subsidi" | "komersial";
   export type SortirBank = "bunga" | "dp" | "nama";
   export function urutBank(list: BankRate[], filter: FilterBank, sortir: SortirBank): BankRate[];
   export function bankTerendahKonvensional(list: BankRate[]): number | null;
   ```
   Aturan "bunga": pisah konvensional vs syariah; kelompokkan konvensional
   naik dulu, lalu syariah naik (tanpa lencana "terendah").
5. Koneksi UI: T4.1/T4.3 (banding-kan-bank memakai helper).
6. Jalankan test hijau.

## T0.6 Mesin biaya awal berstatus & nullable
Tujuan: biaya awal per-item dengan status + nilai yang bisa belum diketahui
(PRD §11).

1. TDD — buat `lib/biaya.test.ts`:
   - Setiap item punya kategori/status valid; nilai `null` tidak ikut total.
   - `totalTerestimasi` = jumlah item bertipe angka.
   - Item BPHTB bila wilayah kosong → nilai null + catatan "tergantung
     wilayah/NPOPTKP setempat".
2. Buat `lib/biaya.ts`:
   ```ts
   export type KategoriBiaya = "program" | "bank" | "notaris" | "pajak" | "pengembang" | "simulasi";
   export type StatusBiaya = "resmi" | "indikatif" | "internal";
   export type ItemBiaya = { kategori: KategoriBiaya; label: string; nilai: number | null; status: StatusBiaya; catatan?: string };
   export type RincianBiaya = { items: ItemBiaya[]; totalTerestimasi: number; totalStatus: Map<StatusBiaya, number> };
   export function rincianBiayaAwal(harga: number, dpPercent: number, opts?: { lokasi?: string }): RincianBiaya;
   ```
   Default item: DP (indikatif), Provisi 1% plafon (indikatif), Admin Rp500rb
   (indikatif), BPHTB (null bila tanpa lokasi; status indikatif), Notaris/PPAT
   1% (indikatif), Asuransi 0,45% (indikatif), Booking fee (null; indikatif,
   "bisa jadi bagian dari DP").
3. `lib/finance.ts` `biayaAwal` dipertahankan (test lama tetap jalan).
4. Koneksi UI: T4.1 (kalkulator + alat rent-vs-beli/planner-dp).
5. Jalankan test hijau.

## T0.7 Penanda data bank stale (seed)
Tujuan: pengguna tahu data perbandingan adalah contoh seed, bukan penawaran.

1. TDD — `lib/bank-rates.test.ts`: `getBankRates` tanpa Supabase mengembalikan
   `{ data: seedBankRates, sumber: "seed" }`.
2. `lib/bank-rates.ts`:
   ```ts
   export type SumberBankRates = { data: BankRate[]; sumber: "db" | "seed"; dicek?: string };
   export async function getBankRates(): Promise<SumberBankRates>;
   ```
   `sumber: "db"` bila data Supabase terpakai.
3. `app/syarat/page.tsx`: panggil dan teruskan `sumber` + `dicek` ke
   `BandingKanBank`.
4. Koneksi UI: T4.3.

# M1 — Rute & navigasi

## T1.1 `/hubungi` → `/kontak`
- Buat `app/kontak/page.tsx` + `app/kontak/kontak-form.tsx` (salin isi
  `app/hubungi/*`, ganti nama komponen `HubungiForm`→`KontakForm`, canonical
  `/kontak`, judul tetap "Hubungi kami", `source` WA "hubungi" tetap).
- Hapus `app/hubungi/`.
- `next.config.ts` `redirects`: tambah
  `{ source: "/hubungi", destination: "/kontak", permanent: true }`.
- Perbarui link:
  - `components/footer.tsx` kolomInfo "/hubungi" → "/kontak"
  - `app/sitemap.ts` "/hubungi" → "/kontak"
  - `public/llms.txt` (lihat T5.1)
  - Cari sisa via Select-String `"/hubungi"` → ganti semua.
- Verifikasi: `npm run build`; cek di browser `/hubungi` mengarah 301 ke `/kontak`.

## T1.2 Hapus autoplay papan jalur
`components/papan-jalur.tsx`:
- Hapus `DELAY_AUTO`, state `jeda`, `tersembunyi`, `berjalan`, `useEffect`
  timeout, listener `visibilitychange`, tombol Play/Pause, import `Pause`/`Play`
  dan `useEffect`.
- Status teks selalu: `Jelajah manual — Tahap {pad(kunci+1)} dari {TOTAL}`.
- Pertahankan: stepper/kunci, buka-tutup, tombol Sebelumnya/Berikutnya,
  `MotionConfig reducedMotion` dan `reduce` untuk animasi (masih dipakai tile).
- Verifikasi: `npm test` & `npm run build`; di browser moving otomatis hilang,
  navigasi manual tetap jalan.

# M2 — Beranda (PRD §6)

## T2.1 Hero tanpa form + blok "3 angka perkiraan"
`app/page.tsx`:
- Kolom kanan hero: GANTI `<KemampuanRingkas />` dengan blok statis
  "Angka perkiraan" (label "perkiraan", asumsi 8jt/bln & FLPP 5% flat):
  - Angsuran aman: `formatRupiah(8.000.000 × 30%)`
  - Kisaran harga: `hargaMaksimalMampu({..., skema:"flat", DP 1, tenor 20})`
  - Dana awal: perkiraan FLPP (min-dp 1% + provisi 1%)
  - Link "Atur sendiri di kalkulator" → `/kalkulator?mode=income`
  - Catatan asumsi + sumber tanggal cek.
- Hero kiri: pertahankan H1 "Mau beli rumah dengan KPR? Mulai dari sini."
  dan 1 CTA primer "Mulai perjalanan". Hapus CTA sekunder "Cek kelayakan FLPP"
  atau turunkan jadi tautan kecil (PRD: 1 CTA per layar). Tambahkan baris jalur
  kecil "Keuangan → Rumah → KPR → Akad → Kunci".
- Ganti `PosisiSekarang` (5 pil) dengan quick start 3 intent (PRD §6):
  1. "Baru mulai dari nol" → `/perjalanan/01-keuangan`
  2. "Sudah tahu kisaran rumah" → `/perjalanan/02-kemampuan-target`
  3. "Sudah menemukan rumah" → `/perjalanan/05-dana-dokumen`
  (label+keterangan+arrow, gaya visual sama).
- `KemampuanRingkas` dipindah ke section "Alat inti" (T2.2).

## T2.2 Alat inti maks 3
`app/page.tsx` (section baru setelah `AlurJalur`):
- Judul "Alat inti — tiga alat yang paling sering dipakai".
- 3 kartu: Kemampuan beli (embed `<KemampuanRingkas />` interaktif di kartu
  pertama — form tetap hidup), Simulasi KPR (`/kalkulator`), Checklist dokumen
  (`/checklist`). Kartu 2-3 = kartu tautan.

## T2.3 Blok "Lanjutkan perjalanan"
- Buat `components/lanjut-perjalanan.tsx` ("use client"):
  - Baca localStorage `alurkpr-perjalanan-v1` (key yang dipakai
    `perjalanan-kontrol.tsx`), cari tahap dengan `status === "siap"` atau
    selesai terbanyak; tampilkan "Selesai sampai Tahap N (X hasil)" + CTA
    "Lanjut: {judul tahap berikutnya}" → `/perjalanan/{slug}`.
  - Kalau belum ada progres: tampilkan "Mulai dari Tahap 1" sederhana.
- `app/page.tsx`: render di bawah hero (section "Kamu sudah sampai mana?").
- Verifikasi manual di browser (isi progress di 1 tahap → buka beranda).

## T2.4 Red flags + trust + CTA akhir
`app/page.tsx`:
- Section "Tiga hal yang biasanya bikin pengajuan gagal": data tidak konsisten
  antar dokumen; dana awal di luar DP tidak dihitung; booking unit sebelum cek
  legalitas. Link ke `/perjalanan/01-keuangan`, `/kalkulator`, `/syarat`.
- Blok trust: chip "Sumber: BP Tapera · Kementerian PKP · Kepmen 1722",
  chip "Dicek 6 Agustus 2026", dan kalimat disclosure (lihat T5.3), lalu
  CTA journey akhir (pertahankan section CTA yang ada, H2 jadi
  "Mulai dari Tahap 1: siapkan keuangan").

# M3 — Halaman tahap

## T3.1 Blok "Kalau hanya 2 menit" per tahap
1. TDD — `content/content.test.ts`: tambah `t.duaMenit.trim().length > 0`
   untuk semua tahap.
2. `lib/types.ts` `Tahap`: tambah `duaMenit: string;`.
3. `content/tahap.ts`: isi `duaMenit` semua 8 tahap (1–2 kalimat ringkas:
   keputusan utama tahap itu).
4. `components/perjalanan-detail.tsx`: render blok ringkas dengan judul
   "Kalau hanya 2 menit" tepat di bawah header (setelah fakta) — ringkasan
   pemakaian cepat sebelum "Tujuan tahap ini".
5. Jalankan `npx vitest run content/content.test.ts` hijau.

## T3.2 Satu CTA lanjut + sumber resmi
`components/perjalanan-detail.tsx`:
- Pastikan hanya satu tombol primer "Lanjut: {next.judulSingkat}" di blok
  "Siap lanjut?" (sudah benar). WhatsApp tetap sekunder (tahap 8 pakai WA).
- Tambah blok sumber di bawah fakta bila ada: `Sumber: {fakta.sumber}` +
  link resmi (tapera.go.id) memakai komponen `SumberLink` (T6.1) bila URL
  ada di data.
- Perbaiki klaim usia di `app/syarat/page.tsx` `syaratUmum`:
  "Usia minimal 21 tahun atau sudah menikah" → "Usia sesuai aturan skema
  (untuk FLPP untuk pertama, pastikan persyaratan usia di aturan terbaru)"
  + hasil riset T0.1; bila tidak ada sumber: "Usia sesuai aturan skema -
  perlu dicek ulang ke bank penyalur."
- Hal yang sama di `content/tahap.ts` Tahap 1 `lakukan` baris MBR
  ("usia minimal 21 tahun atau sudah menikah") → sesuaikan hasil T0.1.

# M4 — Alat integrasi

## T4.1 Kalkulator FLPP flat vs komersial anuitas
`components/kalkulator.tsx`:
- `buatPilihan`: tambah `skemaHitung: "flat" | "anuitas"` — FLPP = "flat",
  BSI/murabahah = "flat", konvensional lain = "anuitas". BSI kemungkinan
  tampil dari `rates` (cek `skema` field baru T0.5).
- `hasil` useMemo: dipakai fungsi sesuai `skemaHitung`:
  ```ts
  const angsuran = bank.skemaHitung === "flat"
    ? angsuranFlat(plafon, bank.fixedRate, tenorEfektif)
    : angsuranBulanan(plafon, bank.fixedRate, tenorEfektif);
  const total = bank.skemaHitung === "flat"
    ? totalPembayaranFlat(plafon, bank.fixedRate, tenorEfektif)
    : bertahap.total;
  const bunga = total - plafon;
  ```
  `hargaDariPenghasilan`: terusan `skemaHitung` ke `hargaMaksimalMampu`.
- `tabel`: untuk flat pakai `jadwalFlat`, anuitas `jadwalAmortisasi`.
- Label hasil: primer/subjudul "Angsuran bulanan" tetap; untuk FLPP tambah
  catatan kecil "Estimasi cicilan FLPP — bunga flat 5%/tahun, bukan persetujuan
  kredit." (PRD §9.1).
- Disklaemer bawah dibuat kondisional: flat vs anuitas, dan tampilkan bahwa
  anggka indikatif.
- Ganti `biayaAwal` dengan `rincianBiayaAwal` (T0.6): daftar item per-item +
  status; nilai `null` tampil sebagai "Belum bisa dihitung (cek wilayah)".
  `Total dana awal` = `totalTerestimasi` + catatan item null belum termasuk.
- Koneksi analytics: T6.1.
- Verifikasi: `npm test`, `npm run build`, uji manual hitung FLPP = flat.

## T4.2 Form kelayakan: status kawin + zona harga
`components/kelayakan-form.tsx`:
- Tambah select "Status keluarga" (Belum kawin / Sudah menikah) → `statusKeluarga`.
- Tambah select "Zona harga unit" (5 opsi dari `OPSI_ZONA_HARGA`) → `zonaHarga`.
- Input `hargaUnit` default 150 jt tetap; `zonaHarga` default 1.
- Copy hasil (PRD §14): heading layak dari
  "Kelihatannya kamu memenuhi syarat!" → "Perkiraan awal: kamu memenuhi syarat"
  + catatan "Konfirmasi final oleh bank penyalur & verifikasi Tapera Mobile."
  Heading gagal "Belum lolos semua syarat" tetap.
- Pesan "Sangat cocok" dilarang — pastikan tidak muncul (scan di M7).
- Tambah CTA resmi di hasil layak: link eksternal ke situs BP Tapera memakai
  `SumberLink` (T6.1) "Cek plafon & syarat resmi di BP Tapera".
- `app/syarat/page.tsx`: `BandingKanBank` pakai bentuk baru `SumberBankRates`
  (T0.7) dan teruskan penanda seed.

## T4.3 Perbandingan bank: helper + penanda seed + syariah
`components/banding-kan-bank.tsx`:
- Gunakan `urutBank` + `bankTerendahKonvensional` dari `lib/bank-banding.ts`
  (T0.5). Lencana "Bunga terendah" hanya untuk konvensional; bank syariah
  diberi label "Skema syariah" + keterangan "margin tetap — tidak dibandingkan
  satu-ke-satu dengan konvensional."
- Option sortir "Bunga terendah" → "Bunga konvensional terendah" (hindari ranking
  campur).
- Props baru: `dariSeed: boolean`, `dicekSeed?: string`. Bila `dariSeed`,
  tampilkan kotak penanda di bawah tabel: "Data contoh (seed) per 15 Januari
  2026 — belum angka bank resmi. Hubungi bank untuk angka mutakhir & penawaran."
- `app/syarat/page.tsx`: teruskan `sumber`/`dicek` dari `getBankRates`.

## T4.4 Checklist master terkelompok (KTP sekali)
1. TDD — `content/content.test.ts` tambah untuk `content/checklist`:
   - Tidak ada label duplikat; KTP muncul tepat 1 kali.
   - Semua item punya `kelompok` master & `grup` valid.
   - Setiap nama dokumen di `tahapKpr` punya pasangan di master
     (normalisasi: lowercase + strip tanda baca).
2. Buat `content/checklist.ts`:
   ```ts
   export type GrupChecklist = "sekarang" | "nanti" | "tergantung" | "diminta-bank";
   export const GRUP_CHECKLIST_LABEL: Record<GrupChecklist, string> = {
     sekarang: "Siapkan sekarang",
     nanti: "Menjelang akad / serah terima",
     tergantung: "Tergantung kondisi pemohon",
     "diminta-bank": "Baru diminta saat proses",
   };
   export type ItemChecklist = { id: string; label: string; kelompok: KelompokDokumen; grup: GrupChecklist; alasan: string };
   export const MASTER_DOKUMEN: ItemChecklist[] = [/* 29 item unik */];
   ```
   Aturan grup contoh: KTP/KK/NPWP/slip gaji/rekening = "sekarang";
   sertifikat/IMB/bukti lunas & saksi = "nanti"; dokumen wiraswasta/status
   kawin = "tergantung"; bukti tambahan pendapatan/SP3K = "diminta-bank".
3. `components/checklist-dokumen.tsx`: ganti sumber `tahapKpr.flatMap` dengan
   `MASTER_DOKUMEN`; group tampilan per `grup` (urutan sekarang → nanti →
   tergantung → diminta-bank); tetap localStorage `alurkpr-checklist-v1`
   (id baru = `master::{kelompok}::{label}`; progres lama hilang — tulis
   catatan ringan "daftar diperbarui" bila total berubah).
   Headline: "Dokumen yang mulai kamu siapkan" untuk grup sekarang.
   Track `checklist_item_complete` (T6.1).
4. `components/perjalanan-detail.tsx` & `papan-jalur.tsx`: link `/checklist`
   tetap (rute dipertahankan). Setiap tahap tetap menampilkan dokumen
   kontekstualnya sendiri.
5. `next.config.ts`: komentar "DIKECUALIKAN" dipertahankan.
6. Jalankan test & build hijau.

# M5 — Konten & SEO

## T5.1 `public/llms.txt` baru
Tulis ulang:
- Navigasi: `/`, `/perjalanan`, `/kalkulator`, `/syarat`, `/syarat#bank`,
  `/alat`, `/alat/planner-dp`, `/alat/sewa-vs-beli`, `/checklist`, `/glosarium`,
  `/faq`, `/tentang`, `/kontak`, `/privasi`.
- 8 tahap dengan slug `/perjalanan/01-keuangan` dst.
- Artikel `/panduan/*` yang aktif.
- Data indikatif 2026 yang benar: bunga FLPP 5% flat/tahun; DP 1%; harga
  166–240 jt per zona (5 tier, indikatif); batas penghasilan per zona × status
  kawin; aplikasi resmi Tapera Mobile; catatan tenor 40 th "kebijakan belum
  aktif". Hapus semua rute lama (`/panduan/tahap-*`, `/mampu-beli`,
  `/planner-dp`, `/sewa-vs-beli`, `/profil-kamu`, `/hubungi`, "usia 21–58",
  "tenor 10–20").

## T5.2 Copy larangan & usia (PRD §14)
- `content/tahap.ts:377` (tahap 8): "Kunci tanpa dokumen = rumah tapi tanpa
  identitas; pastikan sertifikat & IMB ikut diserahkan." →
  "Pastikan sertifikat & IMB ikut diserahkan bersama kunci — tanpa dokumen,
  unit belum bisa dianggap sah milikmu."
- Perbaiki klaim usia (T3.2) di `app/syarat/page.tsx` & `content/tahap.ts`.
- Larangan universal — pastikan tidak muncul: "sangat cocok", "Kunci tanpa
  dokumen", "independen" (di brand, T5.3), "Disetujui" (T6.2). Scan silang
  via Select-String di M7.

## T5.3 Disclosure brand (hapus "independen")
- `lib/brand.ts` `DISCLOSURE` →
  "AlurKPR adalah media edukasi & simulasi pengajuan KPR yang dikelola oleh
  Syahfalah Group (pengembang properti di Lumajang). Situs ini tidak menjual
  produk keuangan dan tidak menerima komisi dari bank. Seluruh angka bersifat
  indikatif; keputusan kredit final ada di bank penyalur."
- Pastikan tidak ada teks "independen" lain (grep `independen` di
  `app/`, `components/`, `content/`, `lib/`; app/tentang tidak memakainya).

## T5.4 Sitemap & rivisi
- `app/sitemap.ts`: "/hubungi" → "/kontak".
- `lib/site.ts`: `RIVISI` set ke tanggal deploy.
- Pastikan canonical `/kontak`, metadata title "Hubungi Kami".

# M6 — Analytics & aksesibilitas

## T6.1 Taxonomy event §18
`lib/analytics.ts` `AnalyticsEvent` — tambah:
```ts
| "journey_start" | "stage_view" | "stage_complete" | "calculator_start"
| "calculator_complete" | "checklist_item_complete" | "official_source_click"
| "whatsapp_click" | "journey_exit";
```
Pertahankan event lama (tidak menghapus telemetri yang ada), merapikan
`wa_clicked`→`whatsapp_click` bila dipakai. Wiring baru:
- `app/perjalanan/page.tsx` + `app/perjalanan/[slug]/page.tsx`: tambah
  komponen client kecil `components/stage-tracker.tsx` — mount pertama
  `journey_start` (hanya sekali via localStorage `alurkpr-analytics-journey`)
  di halaman indeks; `stage_view` di halaman detail (param `slug`).
- `components/perjalanan-kontrol.tsx`: `setStatus("siap")` →
  `track("stage_complete", { slug, status })` (ganti `jalur_status` untuk nilai
  "siap"; pertahankan `jalur_status` untuk nilai lain bila diinginkan).
- `components/kalkulator.tsx`: `useEffect` mount → `calculator_start`;
  `useEffect` pada `[hargaEfektif, dpEfektif, tenorEfektif, bankId]` →
  `calculator_complete` (ganti `calc_result_viewed`).
- `components/checklist-dokumen.tsx`: `ubah` → `checklist_item_complete`
  (sebelumnya `checklist_saved`).
- `components/banding-kan-bank.tsx`: filter → `calc_result_viewed` tetap +
  tambah param sortir.
- Komponen WhatsApp (`whatsapp-button.tsx`, `whatsapp-link.tsx`):
  `wa_clicked` → `whatsapp_click` (atau tambah event baru lalu hapus lama).
- Buat `components/sumber-link.tsx` ("use client"): `<a target="_blank">`
  yang track `official_source_click` dengan `{ url }`. Pakai di T4.2 (link
  BP Tapera) dan T3.2 (sumber tahap yang punya URL resmi).
- `components/analytics-away.tsx` ("use client", dipasang di layout): listener
  klik dokumen; bila path saat ini `/perjalanan/*` dan target link bukan
  `/kontak|/faq|/kalkulator|/perjalanan|/panduan|/glosarium|/syarat|/checklist|/alat`,
  maka `track("journey_exit")`.
- Verifikasi: `npm run build`, cek tiada event lama yang "kriminal" tersisa
  (Select-String `calc_result_viewed|jalur_status` — yang tersisa boleh yang
  memang disengaja).

## T6.2 Interaksi ≥44px & label gambar "Disetujui"
- `components/alur-jalur.tsx` cartouche "Status → Disetujui" →
  "Status → Referensi" (PRD §13 melarang klaim persetujuan).
- Audit tombol < 44px pada aksi primer: mode toggle kalkulator
  (`min-h-10` → `min-h-11`), preset DP (`min-h-10`, kecil di touch — target
  44px: `min-h-11`), pill quick start beranda (beri `min-h-[44px]`),
  tombol "Cetak/Reset" checklist (`h-10` → `h-11`).
- Verifikasi visual: halaman beranda, kalkulator, checklist pada viewport
  360px, 768px, 1280px; tidak ada scroll horizontal.

# M7 — QA & rilis

## T7.1 E2E Playwright
- `package.json`: devDeps `@playwright/test`, `playwright`; scripts
  `"e2e": "playwright test"`. Instal browser: `npx playwright install chromium`.
- `playwright.config.ts`: `webServer` menjalankan `npm run dev` (baseURL
  localhost), project chromium, viewport 360×800 dan 1280×800.
- `tests/e2e/journey.spec.ts`:
  - Beranda → klik "Mulai perjalanan" → landing `/perjalanan` → klik
    "Mulai dari Tahap 1" → `/perjalanan/01-keuangan` → h1 terlihat → tombol
    "Lanjut: Tentukan Kemampuan & Target Rumah" → sampai tahap 8 →
    CTA WhatsApp terlihat.
  - Redirect: `/mampu-beli` → `/kalkulator?mode=income`; `/profil-kamu` →
    `/perjalanan/03-skema`; `/panduan/tahap-1-cek-keuangan-dan-kelayakan` →
    `/perjalanan/01-keuangan`; `/hubungi` → `/kontak`.
  - Responsif: `/`, `/perjalanan/05-dana-dokumen` tidak scroll horizontal di
    360px dan 1280px.
  - Kelayakan: isi form di `/syarat` (status kawin "Sudah menikah",
    zona harga 1, penghasilan 9.500.000, harga 150.000.000) → hasil layak
    terlihat dan heading "Perkiraan awal: kamu memenuhi syarat".

## T7.2 Gate penuh
- `npm run lint` (0 error), `npm test` (semua hijau), `npm run build` (SSG OK),
  `npx playwright test` (hijau).
- Scan larangan text:
  - Select-String `Kunci tanpa dokumen`, `Status... Disetujui`, `independen`
    (kecuali "tidak independen" bila ada), `sangat cocok` → semua 0 di
    `app/ components/ content/ lib/ public/llms.txt`.
  - Pastikan `public/llms.txt` tanpa rute lama (`/panduan/tahap-`,
    `/mampu-beli`, `/planner-dp`, `/sewa-vs-beli`, `/profil-kamu`, `/hubungi`;

## T7.3 Commit & deploy
- `git add -A`; commit pesan sesuai gaya repo
  (mis. `feat: PRD V4 M0-M7 — data flat FLPP, zona harga 5 tier, hero baru,
  /kontak, checklist master, analytics §18, e2e`).
- `git push` (GIT_TERMINAL_PROMPT=0).
- `vercel --prod` (CLI `AppData\Roaming\npm\vercel.cmd`).
- Smoke test https://alurkpr.vercel.app: beranda, 1 tahap, kalkulator,
  `/hubungi`→`/kontak`, `/syarat`, `/checklist`, llms.txt.

---

## Cara mengeksekusi
- Bekerja per-milestone, task per task. Logika = test dulu lalu implementasi.
- Setiap task dengan perubahan kode diakhiri `npm test` + `npm run build`.
- Commit sekali per milestone (M0, M1, M2, M3, M4, M5, M6, M7) kecuali ada
  perubahan kecil yang ingin digabung; push + `vercel --prod` setelah M7
  (atau setiap milestone bila diminta).