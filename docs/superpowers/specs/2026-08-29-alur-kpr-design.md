# ALUR KPR — Design Spec

Tanggal: 2026-08-29
Status: Approved (user), siap implementasi
Brand: **Syahfalah Group** (logo: `WhatsApp Image 2026-08-26 at 13.09.55.jpeg`, disalin ke `public/brand/`)
Repo: github.com/nickasad1000-cell/ALURKPR • Deploy: Vercel (`kpr`, fallback `kprsubsidi`)

## 1. Tujuan

Website edukasi untuk calon pembeli rumah: memahami **alur pembelian rumah secara KPR** secara runtut —
pemilihan unit → booking fee → kelengkapan berkas → wawancara bank → survey bank → SP3K/ACC →
akad kredit/realisasi → STB (serah terima bangunan) → angsuran. Plus panduan **memilih unit yang benar**
(value, spesifikasi, lokasi, legalitas). Visual interaktif dan jelas agar bisa dipahami semua kalangan.

Audiens: pembeli rumah Indonesia, termasuk yang awam istilah perbankan. Bahasa: **Indonesia**.

## 2. Keputusan Scope (hasil brainstorming)

| Keputusan | Pilihan |
|---|---|
| Peran utama | Informatif + kalkulator (tanpa login publik) |
| Jenis KPR | Keduanya — subsidi (FLPP) & komersial, dengan pembagian jelas |
| Stack | Next.js 15 App Router + TypeScript + Tailwind CSS v4 + GSAP ScrollTrigger + Lenis + Framer Motion |
| Pendekatan | **C — Hybrid**: homepage one-page journey + halaman tools terpisah |
| Arah desain | **Bold editorial premium** |
| Supabase | Hanya tabel `bank_rates` (read-only publik via anon key + RLS); admin edit via Supabase Dashboard |
| Branding | Generik edukasi berlogo Syahfalah Group; nama developer: Syahfalah Group |

## 3. Fitur v1

### Interaktif
1. **Timeline alur interaktif** — 9 tahap, pinned scroll di homepage (GSAP), garis progres emas, klik tahap → detail.
2. **Kalkulator KPR** (`/kalkulator`) — mode subsidi (flat 5%) & komersial (fixed→floating); input harga, DP%, tenor, bank preset (dari Supabase/seed); output angsuran/bulan, total bunga, total pembayaran, tabel amortisasi, dan **estimasi biaya awal** (DP, booking fee, provisi, admin, BPHTB, notaris, asuransi).
3. **Cek kelayakan subsidi** (`/cek-subsidi`) — wizard singkat → hasil layak/tidak + alasan.
4. **Checklist dokumen interaktif** — per tahap, centang, progress bar, simpan di `localStorage`, reset, **print-friendly**.

### Konten
5. Section **"Memilih Unit yang Benar"** — value, spek, lokasi, legalitas + matriks perbandingan centang.
6. **Toggle Subsidi vs Komersial** — perbandingan syarat/bunga/tenor/batasan.
7. **FAQ accordion** (`/faq` + JSON-LD FAQPage).
8. **Galeri foto** — 11 foto (fasad/interior/gate) grid editorial, WebP/AVIF.
9. **Glosarium istilah** — SP3K, akad, STB, SLIK, dll (di `/panduan`).

### v2 (deferred)
Login + sinkronisasi progres (Supabase Auth), form lead marketing, blog/artikel SEO, halaman admin rates.

## 4. Arsitektur & Sitemap

```
/            Homepage journey: hero → kenapa paham alur → memilih unit →
             TIMELINE 9 TAHAP (pinned) → subsidi vs komersial → galeri → FAQ ringkas → CTA
/panduan     Index 9 tahap + glosarium
/panduan/[slug]  Detail tahap: penjelasan, dokumen (checklist), estimasi waktu,
                 biaya, tips, kesalahan umum, catatan subsidi-vs-komersial
/kalkulator  Kalkulator KPR + preset bank + biaya awal + amortisasi
/cek-subsidi Wizard kelayakan subsidi
/faq         FAQ lengkap
```

- Konten tahapan = data terstruktur TypeScript di `content/` (mudah diedit tanpa sentuh komponen).
- Bank rates: server-fetch dari Supabase, **ISR revalidate 3600s**; **fallback otomatis** ke seed lokal
  bila env Supabase belum diisi (situs 100% jalan tanpa Supabase).
- Checklist: `localStorage` (tanpa login), tombol reset, CSS print.

## 5. Desain Visual (Bold Editorial Premium)

| Token | Nilai |
|---|---|
| paper | `#F7F4EE` |
| ink | `#14171B` |
| accent (emerald) | `#0B6B4F` |
| gold | `#C99A3C` |
| danger | `#B4443C` |

- Font: **Fraunces** (display serif, judul raksasa, angka tahap 01–09) + **Plus Jakarta Sans** (body/UI), self-host via `next/font`.
- Grid 12 kolom, maks 1240px, asimetris editorial, section bergantian paper/ink, card sudut tajam border 1px hairline.
- Motion: GSAP ScrollTrigger (pinned timeline, scrub progress), Lenis smooth scroll, reveal fade+rise, count-up statistik. Hormati `prefers-reduced-motion`.
- Ikon: Lucide (line). Foto: portrait card, rasio konsisten, overlay tipis penyatu tone.

## 6. Konten 9 Tahap (model data)

```ts
type Tahap = {
  nomor: number; judul: string; slug: string;
  ringkasan: string; penjelasan: string[];
  dokumen: string[]; estimasiWaktu: string;
  biayaTerkait: string[]; tips: string[];
  kesalahanUmum: string[]; perbedaanSubsidi: string;
}
```

1. Pemilihan Unit — value, spesifikasi, lokasi, legalitas sertifikat, fasilitas.
2. Booking Fee — fungsi, besaran wajar, kuitansi, refund, beda dengan DP.
3. Kelengkapan Berkas — KTP/KK/NPWP, slip gaji vs rekening koran, karyawan vs wiraswasta.
4. Wawancara Bank — yang ditanya, jawab jujur & konsisten, jebakan umum.
5. Survey Bank — verifikasi tempat tinggal/kerja, appraisal unit.
6. SP3K / ACC — definisi, masa berlaku, wajib cek plafon/bunga/tenor.
7. Akad Kredit / Realisasi — notaris, rincian biaya (provisi, BPHTB, notaris, asuransi), pencairan.
8. STB — cek kondisi unit sebelum berita acara, masa retensi.
9. Angsuran — autodebet, jatuh tempo, denda, pelunasan dipercepat.

Disclaimer edukasi di footer + halaman kalkulator: angka indikatif, bukan penawaran resmi.

## 7. Supabase

```sql
create table public.bank_rates (
  id uuid primary key default gen_random_uuid(),
  bank_name text not null,
  kpr_type text not null check (kpr_type in ('subsidi','komersial')),
  fixed_rate numeric(5,2) not null,
  fixed_years int not null,
  floating_rate numeric(5,2),
  max_tenor_years int not null,
  min_dp_percent numeric(5,2) not null,
  notes text,
  updated_at timestamptz not null default now()
);
alter table public.bank_rates enable row level security;
-- policy: anon SELECT only
```

Seed: BTN, BSI, Mandiri, BCA, BRI (subsidi: flat 5%; komersial: fixed indikatif) — diberi label "indikatif".
Migrasi & seed sebagai file SQL di `supabase/`, + skrip Node `pg` untuk eksekusi via CLI oleh user.

## 8. Performa / SEO / A11y

- Gambar: pipeline `sharp` → WebP + AVIF multi-ukuran (≤150KB/foto), `next/image`.
- Font self-host, preload, swap. Budget JS homepage < 250KB gzip; GSAP/Lenis dynamic import.
- Metadata per halaman, OG image, `sitemap.xml`, `robots.txt`, JSON-LD (`FAQPage`, `HowTo`, `BreadcrumbList`), `lang="id"`.
- Kontras AA, fokus keyboard terlihat, landmark semantik.

## 9. Testing & Gates

- `vitest` unit test: rumus anuitas, biaya awal, aturan kelayakan subsidi.
- Gate rilis: `npm run test` + `npm run lint` + `npm run build` hijau.

## 10. Deployment & Keamanan

- Repo lokal: `C:\Users\Syahfalah\Projects\ALURKPR`.
- Push GitHub: token via header sekali-jalan (`git -c http.extraHeader=...`), tidak disimpan permanen.
- Vercel CLI + token: project `kpr` (fallback `kprsubsidi`), connect repo, env:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `.env.local` gitignored; yang di-commit hanya `.env.example` tanpa nilai.
- **Setelah selesai: rotate token GitHub/Vercel/Supabase** yang pernah dipaste di chat.
