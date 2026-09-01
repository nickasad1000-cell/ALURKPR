# Plan Komprehensif — AlurKPR v5 (2026-09-02)

Berpasangan dengan `2026-09-02-audit-anti-slop-v1.md`. Ini PLAN (aksi). Fase diberi label
agar kredibilitas terjaga; setiap fase ditutup dengan verifikasi.

---

## Fase 1 — Matikan ligatur `fi` (globals.css, P0)

**Langkah:**
1. Buka `app/globals.css`, baris `body { font-feature-settings: "ss01"; }`.
2. Ubah menjadi `font-feature-settings: "ss01", "liga" 0, "clig" 0;`.
   Jika ditulis di `html`/`body`, pastikan selector `.font-feature-manual` tidak pernah
   menimpanya (tidak ada sekarang — cek dengan grep `font-feature-settings`).
3. Tambahkan komentar ringkas? Aturan agen: NO comments unless asked — jangan tambah.
4. Verifikasi visual: cari `fi` di halaman (mis. "afiliasi", "definisi"), pastikan terpisah.

**Verifikasi fase:** `npx next lint` bersih. Tidak ada test yang menyentuh CSS (unit di
vitest tidak memeriksa layout).

---

## Fase 2 — Input harga bebas (kalkulator.tsx, P0)

**Sebelum:** lihat deklarasi `HARGA_MIN/MAX/STEP` + `syncHarga`.

**Perubahan `syncHarga`:**
```
const syncHarga = (n: number) => {
  if (Number.isNaN(n)) return;
  setHarga(n);                       // bebas, TIDAK dibulatkan ke STEP
};
```
- Hapus pembulatan `Math.round(n / STEP) * STEP` **di dalam handler input**.
- **Pertahankan** semua pembatas slider (`HARGA_MIN`, `HARGA_MAX`, `STEP`) — hanya
  berlaku untuk `<input type=range>`, bukan untuk input angka bebas.
- Handler input text/angka → `syncHarga(Number(raw.replace(/[^\d]/g, "")))` tanpa clamp.
- Jika `n > HARGA_MAX` pada kalkulasi: tampilkan badge kecil "melebihi plafon simulasi"
  — jangan diam-diam reset (poin B7). Tambahkan konstanta unik untuk ini? Tidak perlu
  konstanta baru; gunakan kondisi inline.
- `formatAngkaId` (dipakai di harga/penghasilan/cicilan) TETAP dipakai untuk tampilan
  ribuan, tetapi **jangan** pernah mengubah state — hanya tampilan.

**Verifikasi fase:** unit test `kalkulator.test.ts` → tambah: mengetik "168500000"
menghasilkan harga tetap 168500000 (bukan 168000000 / 169000000). Cek test helper yang
sudah ada untuk format.

---

## Fase 3 — Hero card: hapus Total bayar, coret Biaya awal + highlight booking (app/page.tsx, P0)

**Lokasi:** hero card `dl` di `app/page.tsx` (sekitar baris 195–218).

1. Hapus baris `<dl-item>Total bayar (20 th) … Rp {format(heroTotal)}`.
2. Ubah nilai `grid-cols-2` → `grid-cols-3` bila item tersisa 3 (Harga rumah, Uang muka, Tenor).
3. Banner biaya awal:
   - Teks lama "Biaya awal (DP + biaya) ± Rp {format(heroBiayaAwal)}"
   - Baru: dua baris:
     - Dicoret: `Biaya awal (DP + biaya) ±Rp 11.500.000` (pakai `line-through` + `text-ink-soft/60`).
     - Highlight: `Cukup siapkan biaya booking ±Rp100 ribu` (bubble `bg-accent-soft`, teks `accent-ink`, border `accent/30`).
4. Hapus pemakaian `heroBiayaAwal`/`heroTotal` bila tidak dipakai lagi — cek apakah variabel
   masih dipakai di kalkulasi lain; bila tidak, hapus deklarasi untuk hindari `unused` lint.

**Catatan konsistensi (B/5):** fakta tahap 4 `content/tahap.ts` tetap menyebut
"±Rp250rb–1jt" = kisaran booking umum; teks hero "mulai ±Rp100rb" → ubah jadi
"±Rp100rb" tanpa kata "mulai" agar tidak bentrok dengan tahap 4. (Pertahankan
ketelitian: bisa beda antar bank/developer.)

**Verifikasi fase:** `npm run build` (tidak ada referensi hilang). Manual: lihat hero di
browser (B4 — dipastikan 320px aman, 2 blok menumpuk).

---

## Fase 4 — Copy AI-generic di home + halaman profil (app/page.tsx, app/profil-kamu/page.tsx, P1/6)

Draft pengganti untuk setiap lokasi:

**a) Hero subtitle (`Pelan tapi pasti…`):**
Lama: "Pelan tapi pasti: cek kelayakan, hitung angsuran, dan simulasikan KPR — semua
gratis, tanpa perlu akun."
Baru: "Hitung angsuran, cek kelayakan subsidi, dan simulasikan KPR langsung di sini —
lebih dulu sebelum janjian ke bank."

**b) Seksi "Alat perencanaan gratis"**
Lama: eyebrow "Alat perencanaan gratis" / jdl "Lima alat untuk mulai merencanakan"
Baru: eyebrow "Mulai dari sini" / jdl "Lima alat cepat untuk cek kelayakanmu".
Pertahankan struktur `SectionHeading`; cukup ganti string.

**c) Seksi "Rekomendasi personal" + halaman profil**
- Home card: jdl "Rekomendasi personal" desc "Tidak yakin mulai dari subsidi atau
  komersial? Jawab 5 pertanyaan singkat dan kenali profil KPR-mu." → deskripsi lebih
  spesifik: "Tidak yakin ambil subsidi atau komersial? Jawab 5 pertanyaan singkat untuk
  tahu skema yang lebih masuk akal buat kondisi keuanganmu."
- Card "Kenali profil KPR-mu": pertahankan judul; cek subjudul bila ada.
- Halaman `app/profil-kamu/page.tsx`: title "Profil Kamu: mulai dari mana?" ok; desc
  "Bingung mulai dari subsidi atau komersial? Jawab 5 pertanyaan ini dan kami arahkan
  ke alur yang paling masuk akal untuk kondisimu." → "…kami arahkan" ganti "untuk
  menemukan skema yang paling pas dengan kondisimu." (hindari "kami" sebagai narator,
  prefer to user). Metada title tetap.

**d) Seksi "Kenapa AlurKPR"**
Lama: judul "Yang membedakan panduan ini dari artikel lainya" (typo "lainya")
Baru: "Kenapa AlurKPR / Kenapa panduan ini beda".
- Card "Banding kanal bank" → "Bandingkan bank" (fix typo; "kanal" ambigu — ganti "bank").
- Card "Pakar? Bukan — jelas & sederhana" → "Dibuat untuk orang awam, tanpa istilah miring."
  (harga diri rendah, bukan sarkasme).

**e) Seksi "Baca selanjutnya / Tiga topik"**
- HAPUS seluruh blok (heading + 3 kartu). Cek apakah ada halaman artikel individual yang
  ditautkan; bila tidak, ini halaman mati → hapus. Jangan hapus blok "fakta terverifikasi"
  bila terpisah (verifikasi di `blok-demografis.tsx`).

**Verifikasi fase:** `npm run build`, grep hasil untuk string lama (pastikan kosong).
Lint bersih.

---

## Fase 5 — Footer: tagline & deretan alat (footer.tsx, P1/7, P1/8)

1. Hapus "Dibuat dengan semangat literasi perumahan."
2. Kolom "Alat & referensi": ubah list satu kolom → `grid grid-cols-2 gap-x-4` (baris
   dalam kolom) ATAU sisakan 6 item utama + tautan "Lihat semua alat" bila halaman daftar
   alat ada. Pilih opsi grid-2 (tidak menambah rute baru).
3. Pertahankan struktur `footer` + `copyright`. Ganti klaim "Setiap tahun di-update"
   (B1) → hapus atau ubah "Konten diverifikasi terakhir: Sep 2026".

**Verifikasi fase:** build + cek footer tidak boorok di mobile (2 kolom di dalam kolom).

---

## Fase 6 — Alur KPR: hapus heading/desc + "Revisi 2026.2" (alur-jalur.tsx, P1)

`alur-jalur.tsx:41-48`: HAPUS `<h2>Jalur pengajuan KPR</h2>` + deskripsi
"Delapan tahap dari cek keuangan sampai akad dan KPR cair."
- Pertahankan eyebrow "Alur pengajuan KPR" (kotak kecil) — tetap di sana.
- Cartouche "Revisi 2026.2 / Rev. 2026.2" (Cek letak — mungkin di header alur atau detail)
  → hapus dari markup & dari state bila merujuk.

**Verifikasi:** build; tidak ada string `Revisi`/`Rev. 2026` di komponen.

---

## Fase 7 — Alur KPR rework (papan-jalur.tsx + blueprint-icons.tsx, P0/10)

Fitur yang diminta (verifikasi tertulis di prompt pengguna):
1. **Infinite loop**: tahap berjalan otomatis 0→7→0 dst, tiap ~1.6s per tahap, TANPA
   tombol "Mainkan demo" dan TANPA ikon `RotateCcw` (refresh).
2. **Jeda saat panel terbuka**: klik sebuah tile → panel detail terbuka → autoplay DIJEDA.
   Tutup panel → autoplay lanjut (beberapa detik kemudian / immediate).
3. **Tile**: tampilkan HANYA ikon + judul singkat (nomor tetap). Ringkasan/fakta/detail
   dipindah ke panel terbuka.
4. **Panel solid**: `bg-surface` (opaque) + border `line`, bukan semi-transparan
   (`bg-surface/70` → whole opaque). Latarbelakang garis jalur tidak ikut lihat.
5. **Token kunci**: saat panel terbuka, token (kunci) DISEMBUNYIKAN (atau diarahkan
   menyamping agar tidak menutupi teks). Saat tertutup, tampil di posisi kunci.
6. **Ikon 3D-style**: setiap tahap memakai ikon dalam "plate" 3D: `chip` dengan
   background berwarna ramp + bevel tip tip + shadow bawah + sedikit perspektif/pressure.
   Warna ramp: tahap 1–2 = `ink`/netral lembut, 3–6 = `primary` family, 7–8 = `accent`/gold.
   Implementasi via CSS utility (gradient + shadow) — tidak perlu gambar.
7. Panel detail: font tetap (sans), ukuran jelas; gunakan `SectionHeading` kecil / list
   bersarang.

**Struktur implementasi (belum menulis kode — plan):**
- Komponen `IkonTahap3D` di `blueprint-icons.tsx` (baru) membungkus `TAHAP_ICONS[i]`
  dalam `span` dengan kelas plate (warna per tahap disuntik sebagai props/array).
- `papan-jalur.tsx`: state `openIndex: number | null` dan `autoPaused: boolean`.
  - Autoplay dengan `setInterval` 1600ms hanya berjalan saat `openIndex === null`.
  - Tombol "Mainkan demo"/refresh dihapus dari JSX & respons dari `data.paused` dsb.
  - Token kunci: `{openIndex === null && <Token …/>}` (atau `transform` geser keluar).
  - Panel: `aria-expanded`, button panel = seluruh tile (bukan hanya ikon).
  - Pastikan timer dibersihkan pada `unmount` (B7).

**Verifikasi fase:** `npm run build`, unit test jika ada `papan-jalur.test.ts*`. Manual:
autoplay berjalan, klik tile → jeda, tutup → lanjut. Token tidak menutup teks.

---

## Fase 8 — ProfilKamu tombol selesai (P0/9)

`profil-kamu.tsx` state "selesai" (sekitar baris 226–250):
1. Rapikan indentasi (baris manipulasi currently misaligned — baca penuh dulu).
2. Buat kolom vertikal:
   - `Link hitung-angsuran` `w-full btnPrimary` (Hitung angsuran)
   - `WhatsAppButton` `w-full` (tanya lanjutan via WhatsApp) — butuh props tambahan?
     Cek `whatsapp-button.tsx` API; cukup tambahkan className eksternal atau siapkan
     varian full-width di komponen.
   - `Link cek-kelayakan` `w-full btnSecondary`.
   - `button // ulangi` `mt-4 text-ink-soft underline`.
3. Pastikan gap antar elemen (mis. `space-y-3`) dan tidak overflow di 320px.

**Verifikasi:** build + manual di halaman `/profil-kamu` (jawab 5 kuis, tampilan akhir).
Indentasi konsisten `prettier`? Cek `format`/lint env — `npx prettier --check`.

---

## Fase 9 — Verifikasi menyeluruh

- `npm run lint`
- `npm test` (vitest — JANGAN ganti test yang sudah mengecek clearfix; tambah test harga
  bebas saja)
- `npm run build` (Next static export — 37 halaman)
- Grep untuk string yang dihapus: `Pelan tapi pasti`, `Total bayar (20 th)`,
  `semangat literasi`, `Revisi`, `Baca selanjutnya`, `Banding kanal`.

---

## Fase 10 — Commit, push, deploy (hanya bila pengguna minta)

- Commit pesan deskriptif (gaya repo: `feat(ui+ux): …`).
- Push `git push origin main` (gh CLI tidak terpasang — gunakan git/GCM; beri info).
- Deploy `vercel --prod --yes` → https://alurkpr.vercel.app