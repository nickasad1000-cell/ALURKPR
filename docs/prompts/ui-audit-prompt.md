# Prompt Audit UI / Visual Design

Prompt ini dipakai untuk mengaudit tampilan situs secara menyeluruh — bukan
sekadar konten, tapi *kerapian visual*: proporsi, ritme, tipografi, warna, dan
konsistensi. Jalankan dua sumber bukti secara paralel: **dokumen desain** (token
CSS, komponen UI) dan **tampilan nyata** (screenshot render di beberapa
viewport). Jangan pernah menilai hanya dari salah satu.

## A. Cara menjalankan audit

1. Mulai server render lokal dari build produksi (bukan dev mode), lalu ambil
   screenshot halaman utama di minimal 3 viewport:
   - Mobile 390×844
   - Tablet 768×1024
   - Desktop 1440×900
   Ambil juga 2 halaman tipe lain (dengan form + dengan banyak teks/detail
   accordion) untuk cek konsistensi lintas halaman.
2. Baca token desain: `app/globals.css` (warna, font, radius, shadow) dan
   komponen dasar (`components/ui.tsx`, `app/layout.tsx`, `components/header.tsx`,
   `components/footer.tsx`).
3. Catat setiap pelanggaran ke dalam tabel dengan: file:baris (atau nama
   section), masalah, alasan, saran perbaikan spesifik.
4. Keluarkan output: listing temuan per kategori + prioritas + todo list
   perbaikan yang siap dikerjakan.

## B. Area yang diperiksa

### 1. Proporsi & ritme section
- Risiko khas: setelah banyak section dihapus tapi spacing `mt-20`/`mt-28`
  tetap dipertahankan, halaman jadi "berlubang" / banyak ruang kosong tanpa
  alasan. Periksa urutan section: antar-section yang berurutan harus terasa
  berkesinambungan, bukan berpindah-pindah kecepatan (mis. hero rapat → jeda
  besar → band tipis).
- Apakah ada section yang tersisa "kesepian" (sendirian, tanpa pasangan
  visual) setelah tetangganya hilang? Putuskan: padukan ke section lain, atau
  beri penyeimbang grid 2 kolom.
- Jarak antar heading dan konten di dalam section konsisten (1 skala ruang).

### 2. Spacing & alignment
- Skala jarak: apakah hanya memakai `mt-*` setempat, ada `gap`, `grid`
  alignment yang tidak selaras antar kolom? Baseline vertikal antar elemen sebaris
  harus sama.
- Cek margin atas div dengan `space-y-*` vs `mt-*` campur aduk dalam satu blok.
- Alignment tepi kiri: heading/konten/aksi harus berada pada satu garis kiri
  kala di kolom yang sama.

### 3. Tipografi
- **Konsistensi font**: pastikan tidak ada campuran keluarga font tak
  disengaja di satu halaman; `font-display` untuk judul, `font-mono` hanya untuk
  label teknis/kode.
- **Skala ukuran**: judul section antar-section tidak boleh melompat-lompat
  secara liar (mis. satu section judul `text-3xl`, section berikut `text-4xl`
  tanpa tujuan). Definisikan skala: h1 hero, h2 section, h3 kartu.
- **Ukuran minimum teks dasar**: `text-sm` untuk paragraf pendukung minimal.
  Jangan ada teks utama < 14px.
- Line-height & leading konsisten per level; `text-balance` hanya untuk
  judul yang panjang.
- Berat (weight): jangan semua bold / semua regular dalam satu blok; gunakan
  maksimal 2 tingkat per kartu.

### 4. Warna & tone
- Konsistensi token: `primary` untuk info/aksi, `accent` untuk sorotan, `ink`
  untuk teks, `ink-soft` untuk teks sekunder, `paper`/`surface`/`line` untuk
  latar/batas. Jangan menaruh warna berani sembarangan.
- Kontras teks-atas-bg untuk semuanya (target WCAG AA ≥4.5:1 teks kecil,
  ≥3:1 teks besar).
- Bandingkan "berat visual" antar section: tidak ada satu section yang tiba-tiba
  jauh lebih gelap/cerah/ramai dari tetangganya tanpa tujuan.

### 5. Sistem komponen
- Radius & shadow konsisten (jangan campur `rounded-2xl` dengan `rounded-full`
  pada elemen sejenis tanpa alasan). Konsistensi tinggi tombol: satu gaya
  `btnPrimary`/`btnSecondary` — jangan definisikan tombol propuan inline.
- Kartu: isi, padding, dan tinggi header seragam dalam satu grid.
- Border `line` dipakai konsisten untuk kartu di atas `surface`/`paper`.

### 6. Responsif
- Pada mobile 390px: tidak ada overflow horizontal, tidak ada elemen yang
  menyentuh tepi layar tanpa padding, grid 2+ kolom harus collapse/1 kolom bila
  perlu.
- Target sentuh ≥ 44×44 px untuk link penting.
- Navbar & footer berperilaku rapi di semua lebar.

### 7. Isi vs udzur (rasio informasi)
- Section yang bisu (hanya judul + paragraf + tombol tanpa konten) dianggap
  lemah. Setiap section harus punya "bukti" visual: angka, daftar, gambar,
  kartu, atau interaksi.
- Tidak ada teks yang mengulang; setiap section menjawab satu pertanyaan.

## C. Format laporan

Per temuan:
- `Bagian / halaman`
- `Apa yang salah` (satu-dua kalimat)
- `Bukti` (screenshot region / file:baris)
- `Saran konkret` (ubah ke apa; sebut class/nilai spesifik)

Tutup dengan **ringkasan 3 prioritas tertinggi** dan **todo list bertahap**
yang bisa langsung dieksekusi tanpa riset tambahan.