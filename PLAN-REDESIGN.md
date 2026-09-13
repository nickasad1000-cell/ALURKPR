# PLAN REDESIGN ALURKPR — Snapshot (disimpan 13 Sep 2026)

Dokumen ini adalah titik-simpan milestone-nya. Besok tinggal baca file ini + lanjut eksekusi dari M0. Bahasa: Indonesia. Stack: Next 16 (App Router) + React 19 + Tailwind v4 + framer-motion(motion/react) + lucide + Supabase. Brand: Syahfalah Group / Syahfalah Zulkarnaen (pengembang · Lumajang, Jl. Bondoyudo No. 55; WA 6281333372016; sito alurkpr.vercel.app).

---

## TUJUAN (kesepakatan final dengan owner)

**SIMPLIFIKASI** adalah tujuan itu sendiri — bukan sekadar PRD-compliance.
Satu prinsip: **"Satu jalur: 8 tahap menuju kunci. Setiap layar satu keputusan. Sisanya dipangkas, bukan ditambah."**
Tujuan produk: membantu orang tahu cara punya rumah via KPR (subsidi FLPP = fokus, dan komersial) dari awal sampai **terima kunci** — terukur, terarah, minim tulisan tak perlu.
UI/UX harus premium, menarik, interaktif, mudah — tapi **ANTI AI-slop / anti AI-generic**. Style budget rendah, whitespace lega, satu pesan per layar.

Subsidi vs komersial = **SATU jalur 8 tahap sama**, beda hanya di Tahap 03 (pilih skema) & 05 (syarat/verifikasi MBR).

---

## FAKTA FINAL TERVERIFIKASI (harus dipatuhi — JANGAN diganggu lagi)

1. **SiKasep DAN SiKumbang → Tapera Mobile** (integrasi BP Tapera, migrasi resmi berlaku **13 Apr 2026**).
   - Kompas 14/04/2026: *"Tapera Mobile adalah integrasi antara Sikumbang dan Sikasep."*
   - Migrasi: aplikasi pelacakan/pengajuan FLPP publik → **Tapera Mobile**; portal data pengembang/stok rumah subsidi → **portal BP Tapera / BP Tapera**.
   - Aturan copy: semua sebutan "SiKasep"/"SiKumbang" dalam bentuk apa pun — termasuk catatan sejarah/migrasi — = **HARAM**. Hapus total, tidak boleh tersisa satu pun. Nama aplikasi kini = **Tapera Mobile** (oleh BP Tapera).
2. **Zona harga subsidi = 5 ZONA** (Kepmen PKP No. 1722/KPTS/M/2026, berlaku **6 Agt 2026**):
   - Jawa (non-Jabodetabek) & Sumatera (non-Kepri/Babel/Mentawai): **Rp166 jt** (→ zona Lumajang!)
   - Kalimantan (non-Murung Raya/Mahakam Ulu): **Rp182 jt**
   - Sulawesi + Babel + Kepri (non-Anambas) + Mentawai: **Rp173 jt**
   - Maluku/Maluku Utara, Bali & Nusa Tenggara, Jabodetabek, Anambas, Murung Raya, Mahakam Ulu: **Rp185 jt**
   - Papua (6 provinsi): **Rp240 jt**
3. **Referensi regulasi penghasilan MBR**: **Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1 Tahun 2026** (perubahan kedua). Jangan lagi menulis "Permen PKP No. 5 Tahun 2025" sebagai klaim satu-satunya.
4. **Rp166 jt BUKAN harga nasional** → selalu berlabel **zona/indikatif** (mis. "zona Jawa · indikatif"). Nilai inti boleh tetap 166 utk Lumajang (zona Jawa) asal berlabel.
5. **Kalkulator/simulasi**: label "estimasi/indikatif"; hindari absolut. Aplikasi portal lama: Tapera Mobile (cek status MBR).

---

## KEPUTUSAN KONTRAK (adversarial — sudah disepakati)

- Hapus/migrasi semua: `SiKasep`→`Tapera Mobile`, `SiKumbang`→`BP Tapera / portal BP Tapera`. **Tanpa catatan sejarah/migrasi — istilah lama dihapus total sesuai PRD#45.**
- Update label regulasi di content: "Permen PKP No. 5 Tahun 2025" → sebutkan jo. perubahan terbaru.
- `HERO_HARGA=166_000_000` & `HARGA_MAKS_TAPAK_DEFAULT=166_000_000`: **jangan dihapus nilai intinya**; beri label zona/indikatif. Logika kalkulator TIDAK diubah.
- Redesign homepage: HERO jangan calculator-centric; jadi **journey-entry** (hero "Mau beli rumah dengan KPR? Mulai dari sini." + CTA "Mulai perjalanan" + blok "Kamu sekarang di mana?" + preview 8 tahap).
- Nav baru (PRD#98): **Perjalanan · Kalkulator · Panduan · Tentang**; turunkan: Profil Kamu, Kemampuan beli, Planner DP, Sewa vs beli, Checklist, Hubungi, Cek Kelayakan.
- Journey 8 tahap baru → `content/tahap.ts` (perlu restrukturisasi; cukup "journey glue" — lihat M1).
- Glosarium/FAQ/panduan → inline tooltip + collapsible di dalam tahap (bukan halaman terpisah; konten lama dipertahankan di bawah).
- Tools menjadi pendamping di dalam tahap (kalkulator→tahap 02, player DP→03, checklist→05), bukan tujuan terpisah.
- Homepage maks 2 tool utama + 1 journey CTA. Bukan 5-tool grid.
- KPI per halaman: klik "mulai perjalanan", lanjut-tahap-berikutnya, kontak/WA di tahap akhir.

---

## ARAH UI/UX (anti-slop — kerjakan di M1–M2)
Lihat skill `design-taste-frontend` (loaded, sudah dibaca) — "editorial-utility", density rendah, tanpa gradien ungu/glassmorphism AI, satu hero keputusan. Visual identity "jalur/petunjuk jalan": angka tahap besar, garis progresi, checklist centang, micro-interaction scroll dimaknai. Font brand sudah ada (Fraunces/Plus Jakarta Sans) — jangan ganti.

---

## STATUS AUDIT (per 13 Sep 2026)

Sudah dibaca (audit tuntas):
- app/page.tsx, app/**/* (syarat, kalkulator/mampu-beli/profil-kamu/checklist/planner-dp/sewa-vs-beli/panduan[slug]/hubungi/tentang), components/** (header, footer, kalkulator, mampu-beli, kelayakan-form, checklist-dokumen, profil-kamu, pemula, skema, bandingkan-bank), lib/** (finance, eligibility, bank-rates, site, brand, supabase, types, utils), content/tahap.ts (8 tahap existing), content/panduan.ts, content/faq.ts, content/glosarium.ts, content/glosarium-test.ts, content/tahap.ts, content/panduan.ts, content/faq.ts, content/glosarium.ts.

Belum dibaca penuh (opsional, untuk akurasi saat eksekusi): sisa content/tahap.ts baris 95-137, lib/finance.ts segmen selanjutnya, cache halaman yang menyebut fakta. (Sebaiknya saat eksekusi M0, baca penuh file yang akan diedit dulu.)

Ditemukan (item WAJIB dikerjakan M0):
- `content/tahap.ts:53,106` — SiKumbang & SiKasep → migrasi
- `content/panduan.ts:30` — SiKumbang/SiKasep
- `content/faq.ts:65-67,72` — SiKumbang & SiKasep
- `content/glosarium.ts:35-36` — SiKumbang & SiKasep
- `lib/eligibility.ts:7(-9)` + `lib/bank-rates.ts` komentar — rujukan Permen PKP No. 5 Tahun 2025 (single ref)
- `content/faq.ts:17` + `content/panduan.ts:28` — "(Permen PKP No. 5 Tahun 2025)"
- `components/kelayakan-form.tsx:50` — "(Permen PKP No. 5 Tahun 2025)"
- `app/syarat/page.tsx:63` — "(Permen PKP No. 5 Tahun 2025)"
- `lib/types.ts:45` — komentar zona "(Permen PKP No. 5 Tahun 2025)"
- **Hal yang dengan sengaja TIDAK diubah di M0**: logika angka kalkulator/eligibility (kecuali komentar), `HERO_HARGA`, `HARGA_MAKS_TAPAK_DEFAULT`, distro zona penghasilan 4 zona (tetap), angka batas penghasilan & plafon (tetap). M0 = hanya lapisan COPY/fakta + komentar.

---

## PLAN EKSEKUSI (urut)

### M0 — Lapisan fakta (migrasi nama + regulasi) — ✅ SELESAI 13 Sep 2026
Dieksekusi langsung (bukan subagent). Semua istilah lama dihapus total (tanpa catatan sejarah):
- `content/tahap.ts` — SiKumbang & SiKasep → Tapera Mobile.
- `content/panduan.ts` — SiKumbang/SiKasep → sistem resmi BP Tapera / aplikasi Tapera Mobile; label Permen diperbarui.
- `content/faq.ts` — entri "Apa itu SiKumbang dan SiKasep?" → "Apa itu Tapera Mobile?"; hapus "(termasuk portal SiKumbang)"; label Permen diperbarui.
- `content/glosarium.ts` — 2 entri SiKumbang/SiKasep → 1 entri Tapera Mobile.
- `lib/eligibility.ts`, `lib/types.ts`, `components/kelayakan-form.tsx`, `app/syarat/page.tsx`, `lib/eligibility.test.ts` — label "Permen PKP No. 5 Tahun 2025" → "Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1/2026".
Verifikasi M0: `npm run lint` = 0 error (3 warning lama di `components/papan-jalur.tsx`, tak terkait); `npm run test` = 64/64 lulus; `npm run build` = sukses 37/37; grep `SiKasep|SiKumbang|Permen PKP No. 5 Tahun 2025` pada `*.ts/*.tsx` = **0 match**.

Instruksi asli (arsip):
1. `content/tahap.ts` — ganti SiKumbang (baris ~53, tahap 2 tips) & SiKasep (baris ~106, tahap 4) → Tapera Mobile / BP Tapera (lihat FAKTA 1). TANPA catatan sejarah.
2. `content/panduan.ts` — baris ~30, dan cek seluruh file: SiKumbang & SiKasep → migrasi total.
3. `content/faq.ts` — entri "Apa itu SiKumbang dan SiKasep?" (baris ~65-67) → diganti jadi entri Tapera Mobile (tanpa menyebut istilah lama); cek juga baris ~72.
4. `content/glosarium.ts` — entri "SiKumbang"/"SiKasep" (baris ~35-36) → diganti jadi Tapera Mobile / BP Tapera (tanpa menyebut istilah lama); sinkronkan juga istilah "SiKumbang" di baris lain bila ada.
5. `content/elas*` (glosarium/eligibility rujukan regulasi) — luruskan sebutan "Permen PKP No. 5 Tahun 2025" → tambah jo. perubahan (sesuai FAKTA 3) JIKA ada klaim menyesatkan menjadi satu-satunya rujukan.
6. `lib/eligibility.ts` & `lib/bank-rates.ts` — komentar rujukan regulasi (bukan logika).
7. `lib/types.ts:45`, `components/kelayakan-form.tsx:50`, `app/syarat/page.tsx:63` — sinkronisasi sebutan regulasi.
   Tambahan petunjuk copy: label harga tetap "166 jt" tapi beri tanda zona/indikatif bila muncul sebagai angka global tanpa konteks.
   Verifikasi M0: `npm run lint`, `npm run test` (vitest), `npm run build`, grep `SiKasep|SiKumbang` → **WAJIB NOL HASIL** (0 match, tanpa tersisa catatan sejarah), grep `Permen PKP No. 5 Tahun 2025` (laporkan lokasi tersisa).

### M1 — Journey Glue (konten + struktur nav)
- Restruktur `content/tahap.ts` ke 8 tahap PRD (01 siapkan keuangan… 08 serah terima/kunci); pisahkan akad vs serah terima (setelah "Setelah Akad" jadi konten sekunder).
- Perbarui header nav (PRD#98) + footer ringan.
- Rute baru `/perjalanan` (hub 8 tahap) + sub-rute per tahap (opsional) + redirect dari slug lama.

### M2 — Homepage redesign (anti-slop)
- Hero journey-entry (bukan kalkulator-centric): judul satu kalimat, CTA tunggal "Mulai perjalanan", blok "Kamu sekarang di mana?", preview 8 tahap.
- Maks 2 tool utama + 1 CTA journey. Hapus 5-tool grid. Pangkas fakta & fitur jadi indikatif.

### M3 — UI/UX polish
- Terapkan arah visual "jalur menuju kunci": angka tahap besar, garis progresi, micro-interaction (scroll dimaknai), checklist interaktif; mobile-first; perhatian density & whitespace; anti-slop guardrails.

### M4 — Content migration & redirect (SEO)
- Redirect slug lama (sesuai matrix di jenwis skill) + glosarium/FAQ inline; pastikan tidak ada 404 penting.

### M5 — Verifikasi akhir
- Lint+test+build+audit kualitas + cek konten deprecated tersisa.

---

## CATATAN / BLOCKER
- Tidak ada blocker teknis (Vercel token beres; Supabase cloud hidup). Docker tidak terpasang — tidak menghalangi.
- JANGAN commit `.env*`; `.env.local` sudah terisi.
- Regulasi masih bisa berubah — semua copy indikatif + label "cek sumber resmi".

(Selesai. Besok: baca file ini → mulai M0.)
