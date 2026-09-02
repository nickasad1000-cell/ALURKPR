# Audit Komprehensif Page & Tab — AlurKPR (v6, 2026-09-02)

Sifat: **audit tulis saja** — temuan diranking, tanpa mengedit. Implementasi mengikuti
`2026-09-02-plan-komprehensif-v6.md`.

Metode: korpus = seluruh halaman `app/**/page.tsx` + semua `components/*.tsx` +
`app/globals.css`. Audit kali ini fokus **konsistensi lintas page/tab** (pola hero,
toggle, input nominal, ikon, copy) — mengikuti disiplin 21st-ui-review.

Status item yang SUDAH dikerjakan sesi ini ditandai `[DONE]` + verifikasinya.

---

## A — Temuan yang SUDAH diperbaiki sesi ini (verified)

| # | Temuan | Status |
|---|--------|--------|
| A1 | Teks hero "— DP & biaya lain bisa diakad belakangan." | `[DONE]` — dihapus di `app/page.tsx` hero card |
| A2 | Ikon Tahap 2 (`IconRisetRumah`) & Tahap 6 (`IconAppraisal`) duplikat kaca pembesar | `[DONE]` — `blueprint-icons.tsx`: Tahap 2 → pin lokasi, Tahap 6 → grafik analisis. 8 ikon kini metafora unik: kompas jangka / pin / cabang / dokumen-centang / berkas / grafik / kunci / rumah. Base seragam: `viewBox 32`, `strokeWidth 1.75`, round |
| A3 | Footer "Alat & referensi" 10 tautan padat | `[DONE]` — `footer.tsx:41` grid `md:grid-cols-[1.4fr_1.5fr_1fr_1fr]`, `footer.tsx:76` kolom alat `grid grid-cols-2 gap-x-4`, label dipangkas |
| A4 | Ligatur `fi` | `[DONE]` sejak v5 — `globals.css:55` `font-feature-settings: "ss01", "liga" 0, "clig" 0;` |

Catatan: Temuan A1–A3 belum di-commit (git status: 3 file modified).

---

## B — Temuan baru (ranked)

Tingkat: **P1 sebaiknya diperbaiki** · **P2 pertimbangkan**.

### B1. Hero atas halaman tidak konsisten — 3 variasi (P1)
Halaman informasi lain memakai strip `border-b border-line bg-surface` + `py-14 sm:py-20`,
sedangkan `privasi` dan `hubungi` memakai `py-14 sm:py-20` **tanpa strip**; halaman alat
memakai `py-12 sm:py-16` polos.

- Strip: `tentang:39-40`, `syarat:32-33`, `faq:31-32`, `glosarium:49-50`, `panduan:17-18`
- Polos py-12: `kalkulator:19`, `mampu-beli:14`, `planner-dp:14`, `sewa-vs-beli:14`,
  `checklist:14`, `profil-kamu:14`
- Polos py-14 (tidak cocok dengan dua pola di atas): `privasi:64`, `hubungi:17`,
  `panduan/[slug]:79`

Rekomendasi: halaman informasi (`privasi`, `hubungi`) ikut strip seperti `tentang`/`faq`;
halaman alat tetap polos py-12; subhalaman `panduan/[slug]` pertahankan (breadcrumb + judul).

### B2. Copy aneh "Tanya tentang target hinggap" (P1 — typo)
`planner-dp.tsx:265` — label tombol WhatsApp `label="Tanya tentang target hinggap"`.
Kata "hinggap" tidak relevan dengan konteks DP (sisa konsep lain). Ganti →
"Tanya tentang target DP".

### B3. Toggle segmented berbeda antara kalkulator & planner-DP (P2)
- `kalkulator.tsx:203-232`: `grid grid-cols-2 gap-1 rounded-2xl **border border-line** bg-paper p-1`,
  tombol `min-h-10 rounded-xl px-3 **text-sm** font-bold`, ada `aria-pressed`+shadow saat aktif.
- `planner-dp.tsx:63-84`: `grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1.5` **tanpa border**,
  tombol `rounded-xl px-3 py-2 **text-xs** font-bold`.

Kontrol semantik sama, dua rendering berbeda. Seragamkan ke gaya kalkulator.

### B4. Ikon "centang" hand-rolled vs lucide (P2)
- `planner-dp.tsx:274-287` mendefinisikan `CheckIcon` SVG manual;
- halaman/komponen lain memakai `Check` dari lucide-react (mis. `profil-kamu.tsx:7`).

Seragamkan ke lucide `Check`.

### B5. Kelas accent checkbox tidak konsisten (P2)
- `kelayakan-form.tsx:114` → `accent-primary`
- `checklist-dokumen.tsx:192` → `accent-[var(--color-primary)]`
- `app/hubungi/hubungi-form.tsx:106` → `accent-[var(--color-primary)]`

Keduanya valid (`--color-primary` ada di `@theme`, `globals.css:18`), tapi tidak konsisten.
Seragamkan ke `accent-primary` (pendek & themable). Catatan: `accent-color` global di
`globals.css:64-66` hanya untuk `input[type=range]`, bukan checkbox — jadi kelas ini tetap
dibutuhkan.

### B6. Submit kelayakan memakai class inline, bukan `btnPrimary` (P2)
`kelayakan-form.tsx:121-126` menduplikasi gaya `btnPrimary` secara inline
(`inline-flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold
text-white transition hover:bg-primary-deep`), padahal `btnPrimary` sudah di-import (baris 10)
dan berisi persis gaya itu. Gunakan `btnPrimary` + `w-full`.

### B7. Input nominal: format titik-ribuan vs `type="number"` (P2, refactor terbesar)
- Kalkulator memakai input **text** + `formatAngkaId` (titik ribuan otomatis,
  `kalkulator.tsx:72-79`, dipakai di harga/penghasilan/cicilan) — UX "Rp 8.000.000".
- `mampu-beli:54-88`, `planner-dp:86-183`, `sewa-vs-beli:53-165`, `kelayakan-form:43-82`
  memakai `type="number"` **tanpa** pemisah ribuan.

Valid keduanya, tapi dua "bahasa UX" untuk hal yang sama. Opsional: ekstrak pola
kalkulator menjadi helper bersama lalu terapkan ke semua alat.

### B8. Label nav vs footer untuk rute yang sama (P2, wajar)
- `/syarat`: header "Syarat & Bank" vs footer "Cek kelayakan FLPP" (keduanya benar,
  konteks berbeda — header CTA juga "Cek Kelayakan").
- `/mampu-beli`: header dropdown "Cek kemampuan beli" vs footer "Kemampuan beli".
- `/planner-dp`: header dropdown "Perencana DP" vs footer "Planner DP".

Tidak perlu disamakan paksa; tercatat supaya tidak membiak menjadi 2 label per tautan
dalam satu komponen.

---

## C — Catatan positif (dipertahankan)

- Semua alat tombol CTA memakai token `btnPrimary`/`btnSecondary`/`btnWhatsApp` yang sama.
- Slider konsisten: `aria-valuetext` + `aria-label` ada di semua range.
- `SectionHeading` + `Eyebrow` dipakai seragam; heading h1 = Fraunces.
- Checklist & tabel jadwal punya `<caption className="sr-only">`.
- Warna/ramp ikon mengikuti palet eksisting (primary → accent), tanpa hex baru.
- Footer & header sama-sama memakai `Container`, border `border-line`, `bg-surface`.

---

## Ringkasan prioritas
P1: B1 (hero privasi/hubungi), B2 (typo "hinggap"). P2: B3, B4, B5, B6, B7 (opsional).
P0 baru: tidak ada (temuan sesi ini sudah ditangani A1–A3).