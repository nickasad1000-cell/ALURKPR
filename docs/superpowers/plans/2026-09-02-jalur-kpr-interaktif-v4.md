# Plan — Redesign Interaktif "Jalur Pengajuan KPR" (v4)

- **Tanggal:** 2026-09-02
- **Status:** Rencana (belum implementasi) — **sudah melewati audit adversarial**, revisi telah dibakar ke dokumen ini (lihat 1.5).
- **Cakupan:** Seksi homepage "Jalur pengajuan KPR" (`components/alur-jalur.tsx`) diubah menjadi papan jalur interaktif bergaya "papan permainan" dengan ikon unik per tahap + fakta demografis tiap kotak.
- **Tidak termasuk:** Restrukturisasi navigasi/alat site (dipisah sebagai **Fase B**, lihat bagian 11).

---

## 1. Konteks

Seksi saat ini (`alur-jalur.tsx`) adalah *timeline vertikal scroll-driven*:
- Spine garis ukur + progres `useScroll` → `progressHeight` (0%→100%).
- 8 `StepCard` animate `whileInView`, ikon `TAHAP_ICONS`, `estimasiWaktu` chip, link ke `/panduan/[slug]`.
- Kerangka "lembar gambar teknik": grid blueprint, crosshair, label `Dwg No. KPR-08`, cartouche.

Data sudah kuat: `content/tahap.ts` (8 tahap) berisi `dokumen`, `estimasiWaktu`, `biayaTerkait`, `perbedaanSubsidi`, `tips`, `kesalahanUmum`.

**Masalah yang mau diselesaikan:**
1. Interaksi pasif — hanya scroll; tidak ada elemen yang "dimainkan"/diklik selain link.
2. Tidak ada **demografis per tahap** (blok `BlokDemografis` terpisah hanya angka umum, bukan per-tahap).
3. Ikon unik sudah ada (`TAHAP_ICONS`) tetapi tidak dipakai sebagai "potongan" papan; nomor kecil.

## 2. Prinsip yang TIDAK Boleh Dilanggar (non-negotiable)

1. **Metafora jujur.** Nama & visual boleh playful **"papan jalur"**, tapi **TIDAK boleh memakai ular** ("ular" = turun/kembali, menyesatkan untuk proses finansial yang linear). Yang dipakai: jalur berliku **menuju kunci** (tangga/kemajuan). Jika ada ikon "ular", tinjau ulang.
2. **Zero dependency baru.** Pakai `framer-motion` + `lucide-react` (sudah ada) dan SVG inline. Tidak menambah library (mis. chessboard/recharts).
3. **A11y penuh** — keyboard, `aria-expanded`, `aria-current`, reduced-motion, target sentuh ≥ 44px.
4. **Konten singkat di homepage.** Panel detail TIDAK menyalin `penjelasan`/`tips` penuh (itu domain `/panduan`). Hanya ringkasan + dokumen + biaya + satu fakta demografis + CTA.
5. **Performa.** Homepage tetap ringan: LCP ≤ 2,5 s (mobile), delta JS bundle sedapat mungkin < 40 KB gzip terhadap baseline, animasi lewat `transform`/`offset-path` (GPU), bukan `layout`/`top`.
6. **Konsistensi brand.** Pertahankan: grid blueprint, crosshair, `Dwg No.`, cartouche, font Fraunces, palet (`--color-primary`, `--color-accent`, `--color-paper`).

## 3. Arah Desain (dari 3 opsi yang pernah ditawarkan)

| Opsi | Ide | Keputusan |
|---|---|---|
| A. Papan ular tangga | Papan berliku + token + ikon per kotak | **DIPILIH (disempurnakan): "Papan Jalur Menuju Kunci"** — tetap linear 1→8, tanpa metafora ular. |
| B. Peta SVG meander | Jalur berkelok dengan milestone bernomor | Jadi *fallback visual* untuk mode reduced-motion/mobile kecil (single-column berliku). |
| C. Stepper "token kamu" | Tombol Lanjut/Kembali menelusuri tahap | Jadi **interaksi sekunder** (nav Previous/Next) di dalam papan. |

### Konsep final — "Papan Jalur Menuju Kunci"
- Lembar blueprint berisi **8 kotak besar** disusun **serpentine** (zig-zag):
  - **Desktop (lg):** 2 kolom × 4 baris (1↗2 lalu 4↘3, dst) — jalur panah digambar di antara kotak.
  - **Mobile:** 1 kolom penuh; di belakangnya garis **S** dekoratif + panah CTA "lanjut" setiap 1–2 kotak.
- Tiap kotak (`Tile`):
  - Header kotak (klik untuk expand): nomor besar (01–08), `TAHAP_ICONS[i]`, `judulSingkat`, ringkasan 1 baris (`line-clamp-2`), dan **fakta demografis** (nilai besar + label kecil — **menggantikan** chip `estimasiWaktu` di posisi tersebut; chip waktu pindah ke panel detail).
  - Panel detail (accordion, **boleh lebih dari satu terbuka** untuk memudahkan membandingkan, mis. tahap 3 vs 5): daftar `dokumen` (centang), `biayaTerkait` (chips), `estimasiWaktu`, catatan `perbedaanSubsidi` (1 baris, label "Skema subsidi"), CTA `Detail lengkap →` ke `/panduan/[slug]`.
- **Token kunci**: pin ikon `IconKunci` di posisi "kamu sekarang".⚠️ **Revisi audit:** token TIDAK mengikuti path SVG (`offsetPath` lemah terhadap scaling responsif), melainkan **koordinat grid** dari `susunSerpentine` (CSS top/left %), digerakkan via transform (GPU). Scroll hanya menghias *drawing* path; **posisi token ditentukan satu-satunya oleh interaksi** (klik kotak / Prev/Next) → satu sumber kebenaran, tidak ada konflik scroll-vs-nav.
- **Navigasi sekunder**: tombol `← Sebelumnya` / `Berikutnya →` (dan keyboard arrow) menggeser fokus + highlight token.
- **START** (kotak 1) & **FINISH / "Kunci di tangan"** (kotak 8, di-highlight accent + `IconKunci` BadgeCheck tetap).
- Header, `Dwg No.`, dan cartouche dipertahankan dari versi lama.

## 4. Spesifikasi Konten & Data

### 4.1 Field baru (opsional, aman untuk test)
Perluas `Tahap` di `lib/types.ts` dengan field opsional:

```ts
fakta?: { nilai: string; label: string };
```

Gunakan `t.fakta ?? null` → kalau kosong, kotak tidak menampilkan blok fakta (fallback aman).

Isi `fakta` untuk 8 tahap (demografis singkat, TIDAK duplikat dengan `BlokDemografis`):

| No | `nilai` | `label` |
|---|---|---|
| 1 | 30–40% | Batas cicilan sehat dari penghasilan |
| 2 | 3–5 unit | Idealnya survei sebelum booking |
| 3 | 5% | Flat s.d. lunas · FLPP |
| 4 | ±Rp250rb–1jt | Kisaran booking fee |
| 5 | 1–3 hari | Kelengkapan berkas bank |
| 6 | 1–3 minggu | Analisis + appraisal |
| 7 | ±1 bulan | Hingga kunci di tangan |
| 8 | 1–3% / th | Dana pemeliharaan rumah |

*(Nilai mengikuti `estimasiWaktu`/`biayaTerkait` yang sudah ada — pastikan konsisten.)*

### 4.2 Test data
Perluas `content/content.test.ts` dengan grup baru:
- `tahapKpr` tetap 8 & nomor 1..8 (sudah ada).
- Jika `fakta` ada: `nilai.trim()` & `label.trim()` non-kosong; pasangan `(nilai, label)` unik dalam 8 tahap.
- ⚠️ **Revisi audit:** TIDAK ada tes "label ≠ label `BlokDemografis`" — duplikasi numerik seperti "5%" tidak bisa dihilangkan lewat aturan label yang kaku; cukup jaga unik antar tahap + review manual scope.
- Tambah test untuk helper murni papan (lihat 5.5).

## 5. Arsitektur Komponen

### 5.1 File baru → `components/papan-jalur.tsx` ("use client")
Menggantikan isi dalam seksi (shell header/cartouche tetap di `alur-jalur.tsx` atau dipindah ringan).

```
PapanJalur
├─ <svg> jalur panah serpentine (desktop) + garis S (mobile)
│    • id path utk offsetPath token
├─ token <motion.g> IconKunci (offsetDistance dari useScroll)
├─ grid kotak: Desktop grid-cols-2, Mobile grid-cols-1
│    └─ Tile (button aria-expanded + panel)
│        ├─ nomor 01..08
│        ├─ TAHAP_ICONS[i]
│        ├─ judulSingkat / ringkasan(line-clamp-2)
│        ├─ chip estimasiWaktu
│        ├─ fakta demografis (nilai+label)
│        └─ panel detail: dokumen, biaya, perbedaanSubsidi, Link /panduan
├─ nav Prev/Next + indikator "Langkah X/8"
```

### 5.2 Penempatan
Ganti `<AlurJalur />` di `app/page.tsx` dengan section baru yang menggunakan `PapanJalur`. Keputusan: **pertahankan nama section & id** (tidak ada anchor terpisah) — perubahan DOM internal saja. Opsional: simpan `alur-jalur.tsx` lama sebagai cadangan (tidak dihapus) hingga Fase B selesai.

### 5.3 Interaksi
- **Expand panel:** **multi-open** (boleh lebih dari satu terbuka) — user kerap membandingkan tahap (mis. 3 vs 5); klik header kotak toggles; `aria-expanded`; panel animasi `height:auto` via framer-motion (bukan `max-height` CSS). Konten panel SELALU di DOM (collapse visual, bukan `display:none`) agar AT & crawler tetap membacanya.
- **Token & scroll:** `useScroll` pada section hanya menghias *drawing* path (stroke color/`offsetDistance` visual opsional). **Posisi token = satu sumber kebenaran: state `kunciPos`** yang berubah lewat klik kotak / Prev/Next. Koordinat token dihitung dari `susunSerpentine` (top/left % grid) lalu digerakkan `transform` (GPU). Tidak ada konflik scroll-vs-nav.
- **Prev/Next:** tombol + ArrowLeft/ArrowRight (saat fokus di dalam papan) memindahkan `kunciPos` + fokus kotak berikutnya; di ujung (1/8) tombol disable.
- **Header kotak = SATU `<button>`** (nomor+ikon+judul+ringkasan+fakta). Tidak ada interaktif bersarang; link `/panduan` hanya muncul di panel terbuka.

### 5.4 Aksesibilitas
- `Tile` header = `<button>`; panel = `<div id=... role=region aria-labelledby=...>`.
- `aria-current="step"` pada kotak yang jadi posisi token.
- Token pin = `aria-hidden` dekoratif (bukan elemen fokus); yang difokus adalah tombol kotak + tombol nav.
- `sr-only` label untuk tombol prev/next (`Langkah aktif: X dari 8`).
- Fokus terlihat jelas (fokus ring `focus-visible:ring-primary`).
- `MotionConfig reducedMotion="user"` membungkus semua animasi (konsisten dengan file lain).
- Skip scroll-animasi untuk AT: konten lengkap tetap ada di DOM (bukan reveal-on-scroll eksklusif).

### 5.5 Logic murni (dapat diuji)
`lib/papan-jalur.ts` (baru, tanpa React):
- `susunSerpentine(index, cols)` → `{ baris, kolom, arah }` untuk grid (2×4 desktop).
- `koordinatToken(index, cols)` → persentase top/left untuk posisi pin.
- Test di `lib/papan-jalur.test.ts`. (⚠️ Tidak ada `posisiToken(progress)` — token tidak scroll-driven.)

## 6. Performa

- ⚠️ **Revisi audit:** ukur BASELINE dulu (catat ukuran gzip chunk seksi `<AlurJalur>` saat ini dari `.next/static` atau DevTools) → target delta inkremental ≤ +40 KB gzip. Tanpa baseline, klaim "berat/tidak berat" tak bisa diverifikasi.
- Path SVG dekoratif statis (bukan animasi per-frame canvas). Token digerakkan `transform` translate dari koordinat grid (GPU), BUKAN `offset-path` (rapuh terhadap scaling serta beda dukungan Safari tua).
- `line-clamp` mencegah layout jitter saat hover/expand. Panel `height` animasi dalam style transform-independent (layout opaque area kecil).
- Cap: 8 tile × (1 svg ikon + chip) — tidak ada gambar raster baru.
- Verifikasi: `npm run lint && npm test && npm run build`; ukur LCP/TBT Lighthouse mobile vs baseline commit `8acdc27` DAN vs ukuran chunk.

## 7. Mobile (spesifik)

- Mobile: 1 kolom; garis S dekoratif; **panah arah antar kotak** (ikon `ArrowDown`/`CornerDownRight`) agar jelas arah.
- Target sentuh: header kotak min-h-12; tombol prev/next min-h-11; chip boleh kecil (dekoratif), header kotak yang jadi area tap utama.
- Hindari horizontal scroll: seluruh lebar dalam `Container` + padding `p-5 sm:p-10`.
- Perbaiki temuan audit: chip preset DP `py-1` → `min-h-10` (file terpisah, lihat 11.3).

## 8. SEO & Integrasi

- Section tetap statis-prerender (client component SSR). Tidak ada konten baru yang dimuat eksklusif via JS.
- Link ke `/panduan/[slug]` tetap — sitemap & internal anchor tidak berubah.
- `aria-label` diplomatis; heading `Jalur pengajuan KPR` dipertahankan (teks dipertahankan untuk konsistensi).

## 9. Definisi Selesai (Acceptance Criteria)

1. `npm run lint`, `npm test` (46 + tests baru), `npm run build` hijau.
2. Desktop: 8 kotak serpentine 2×4 dengan jalur panah terlihat; klik kotak membuka panel (multi-open); token berpindah saat klik / Prev / Next; tombol ujung disable.
3. Mobile 320px & 390px: single-column, tidak ada horizontal scroll, semua target tap ≥ 44px (area header kotak).
4. Keyboard: Tab fokus kotak, Enter/Space toggle, Arrow kiri/kanan pindah token; `aria-expanded`, `aria-current`, `role=region` benar; link `/panduan` hanya di panel terbuka (tidak bersarang).
5. `prefers-reduced-motion: reduce` → tanpa scroll-draw, panel instan, token statis.
6. Lighthouse mobile: LCP ≤ 2,5 s, TBT ≤ +200 ms dari baseline, a11y ≥ 95; delta chunk ≤ +40 KB gzip dari baseline terukur.
7. Tidak ada console error (jalankan dev & build-static).

## 10. Risiko, Asumsi, Mitigasi

| Risiko | Level | Mitigasi |
|---|---|---|
| Metafora "ular" menyesatkan | Tinggi | Pakai jalur linear berliku (tanpa ular); nama "Papan Jalur Menuju Kunci". |
| Homepage jadi berat (JS/HTML) | Sedang | Transform-only token; SVG dekoratif statis; baseline terukur dulu; batas +40 KB gzip. |
| Panel detail menduplikasi `/panduan` | Sedang | Hanya ringkasan + dokumen + biaya + 1 fakta; CTA jelas. |
| Konflik "token scroll vs nav" | Sedang | Satu sumber kebenaran (`kunciPos` dari interaksi); scroll hanya menghias path. |
| `offset-path` scaling/dukungan browser | Rendah | Sudah dibuang di audit — token pakai koordinat grid + transform. |
| Fakta duplikat dgn `BlokDemografis` | Rendah | Test unik antar tahap; scope "fakta per-tahap" dijaga manual. |
| Typechurn mengganggu test | Rendah | `fakta?` opsional; test lama tak terpengaruh (terverifikasi pada `content.test.ts`). |
| Reduced-motion & screenreader | Sedang | Konten penuh di DOM (bukan `display:none`); MotionConfig `user`; panel `region/aria`; token `aria-hidden`. |
| Browser lama tanpa IntersectionObserver/framer | Rendah | Fallback statis: garis + kartu penuh, tanpa token animasi. |

## 11. Fase Eksekusi

### Fase A — Papan interaktif (inti, ≤ 2 sesi)
1. `lib/types.ts` + `content/tahap.ts`: tambah `fakta?` (8 data) + test.
2. `lib/papan-jalur.ts` + test (serpentine & token).
3. `components/papan-jalur.tsx` (tile, panel, token, nav, svg path, reduced-motion).
4. Integrasi `app/page.tsx`; pertahankan header/cartouche.
5. Perbaikan mobile hitam: chip preset DP `min-h-10` (revisi dari audit).
6. Verifikasi A/C lengkap (bagian 9).

### Fase B — Restrukturisasi navigasi & alur (opsional, sesudah Fase A)
Berasal dari temuan audit situs:
1. Pindahkan blok `ProfilKamu` ke bawah grid alat (user kalkulator tidak harus menunggu quiz).
2. Ganti label submenu nav "Alat" → "Simulator".
3. Evaluasi konsolidasi `MampuBeli` ke dalam kalkulator (tab "Dari penghasilan") — keputusan terpisah, tidak wajib.

### Fase C — Optimasi performa kalkulator (sudah dilakukan 2026-09-02)
- `/kalkulator` diubah dari dinamik (ƒ) → statik (○, ISR 1 jam): `searchParams` dipindah ke client (`useSearchParams` + `Suspense`). Panggilan Supabase (s.d. 2,5 dtk) tidak lagi terjadi per-buka-halaman.

## 12. Keputusan yang Masih Terbuka (untuk user)

1. **Grid desktop:** 2 kolom (rekomendasi, lebih "papan") vs 3 kolom irregular (lebih geometris).
2. ~~Perilaku token auto-follow scroll~~ → **RESOLVED oleh audit:** token mengikuti interaksi (klik/Prev/Next), bukan scroll. Scroll hanya menghias path.
3. **Panel detail default:** semua tertutup (rekomendasi, ringan) vs kotak 8 terbuka sebagai "capaian akhir".
4. **Kotak 8 "FINISH":** tetap jadi kotak + badge (rekomendasi) vs dijadikan strip capaian tersendiri.

## 13. Lampiran — Hasil Audit Adversarial (pra-implementasi)

Audit kritis atas draf plan ini menemukan & menyelesaikan cacat berikut:

1. **Dua sumber kebenaran token** (scroll `offsetProgress` melawan nav `kunciPos`) → rawan "jerk". **Fix:** token `kunciPos` tunggal dari interaksi; scroll hanya cat dekoratif path.
2. **`offset-path` rapuh pada scaling responsif** (path SVG meregang → pin tak lagi pada kotak sebenarnya; juga dukungan Safari tua tak merata). **Fix:** koordinat dari `susunSerpentine` → top/left % + `transform`.
3. **Accordion 1-terbuka menghambat perbandingan** antar tahap (mis. 3 vs 5 soal skema) — kasus inti target user. **Fix:** multi-open.
4. **Header kotak & link `/panduan` bersarang** → fokus/keyboard bingung. **Fix:** semua area header = satu `<button>`; link hanya di panel terbuka.
5. **Konten panel "disembunyikan"** via gambar/`display:none` → jelek untuk SEO & AT. **Fix:** konten selalu di DOM; collapse visual via `height` + `aria-expanded`.
6. **"Fakta" vs `estimasiWaktu` chip rebutan ruang** dalam tile → montok. **Fix:** fakta demografis menggantikan chip waktu di tile; chip waktu pindah ke panel.
7. **Klaim performa "≤40 KB" tanpa baseline** → tidak terverifikasi. **Fix:** ukur baseline chunk saat ini dulu; target delta (+40 KB gzip), bukan absolut.
8. **Tes anti-duplikasi label vs `BlokDemografis` terlalu kaku** (nilai "5%" wajar muncul dua tempat). **Fix:** cukup unik `(nilai,label)` antar 8 tahap + review manual scope.
9. **Ekspektasi test interaktif** tidak didukung (repo tanpa RTL/testing-library). **Fix:** unit-test hanya logic murni (`papan-jalur.ts`); perilaku UI = manual + Lighthouse.
10. **Screenreader "token" sebagai fokus** → noisy. **Fix:** pin `aria-hidden`, fokus pada tombol kotak & nav.