# PRD ALURKPR — TOTAL REDESIGN & RESTRUCTURING v2

> **Status**: Rekonstruksi ringkas hasil sesi 13 Sep 2026 (disepakati user sebagai kanon eksekusi).
> Dokumen PRD v2 asli milik owner tetap versi kanonik tertinggi; bila ada perbedaan dengan file ini, PRD v2 asli yang menang.
> Semua fakta regulasi di lapisan "FAKTA FINAL" sudah diverifikasi lewat pencarian web (Kompas, dll.) dan TIDAK boleh diganggu lagi.

---

## 1. TUJUAN PRODUK

**SIMPLIFIKASI adalah tujuannya** — bukan sekadar PRD-compliance.

- Satu jalur: **8 tahap menuju kunci**. Setiap layar = satu keputusan. Sisanya dipangkas, bukan ditambah.
- Produk = **DECISION + PREPARATION GUIDE** (bukan blog, bukan kumpulan kalkulator, bukan bank directory).
- Membantu orang tahu cara punya rumah via KPR (subsidi FLPP = fokus, plus komersial) dari awal sampai **terima kunci**.
- Terukur, terarah, minim tulisan tak perlu.
- UI/UX premium & interaktif — **ANTI AI-slop / anti AI-generic**. Density rendah, whitespace lega, satu pesan per layar.
- Subsidi vs komersial = **SATU jalur 8 tahap sama**; beda hanya di Tahap 03 (pilih skema) & 05 (syarat/verifikasi MBR).

Brand: Syahfalah Group / Syahfalah Zulkarnaen (pengembang · Lumajang, Jl. Bondoyudo No. 55; WA 6281333372016; alurkpr.vercel.app).

---

## 2. FAKTA FINAL (VERIFIED — jangan diganggu)

1. **SiKasep & SiKumbang → Tapera Mobile** (integrasi BP Tapera, migrasi resmi **13 Apr 2026**).
   - Semua sebutan "SiKasep"/"SiKumbang" dalam bentuk apa pun — termasuk catatan sejarah/migrasi — = **HARAM**. Dihapus total, **0 match**. Nama aplikasi = **Tapera Mobile** (BP Tapera).
2. **Zona harga subsidi = 5 ZONA** (Kepmen PKP No. 1722/KPTS/M/2026, berlaku **6 Agt 2026**):
   - Jawa (non-Jabodetabek) & Sumatera (non-Kepri/Babel/Mentawai): **Rp166 jt** (→ zona Lumajang)
   - Kalimantan (non-Murung Raya/Mahakam Ulu): **Rp182 jt**
   - Sulawesi + Babel + Kepri (non-Anambas) + Mentawai: **Rp173 jt**
   - Maluku/Maluku Utara, Bali & Nusa Tenggara, Jabodetabek, Anambas, Murung Raya, Mahakam Ulu: **Rp185 jt**
   - Papua (6 provinsi): **Rp240 jt**
3. **Referensi regulasi penghasilan MBR**: **Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1 Tahun 2026** (perubahan kedua). Jangan tulis "Permen PKP No. 5 Tahun 2025" sebagai satu-satunya rujukan.
4. **Rp166 jt BUKAN harga nasional** → selalu berlabel **zona/indikatif** (mis. "zona Jawa · indikatif"). Nilai inti boleh tetap 166 utk Lumajang (zona Jawa) asal berlabel.
5. **Kalkulator/simulasi**: label "estimasi/indikatif", hindari absolut.

---

## 3. ARSITEKTUR INFORMASI

### 3.1 Journey 8 tahap (utama — route `/perjalanan`)

1. **01 Siapkan Keuangan** — `01-keuangan`
2. **02 Tentukan Kemampuan & Target Rumah** — `02-kemampuan-target`
3. **03 Pilih Skema KPR** — `03-skema`
4. **04 Cari & Verifikasi Rumah** — `04-cari-verifikasi`
5. **05 Siapkan Dana, Dokumen & Ajukan** — `05-dana-dokumen`
6. **06 Analisis Bank & Appraisal** — `06-analisis-appraisal`
7. **07 Persetujuan & Akad** — `07-akad`
8. **08 Serah Terima & Kunci** — `08-kunci`

Journey berakhir **🔑 Kunci**. Aftercare ("Setelah Kunci": kelola cicilan, pemeliharaan, pelunasan/take-over) = konten **sekunder** di bawah jalur utama, bukan tahap ke-9.

### 3.2 Halaman & URL (PRD #103, redirect #102)

| Halaman | URL |
|---|---|
| Perjalanan (hub 8 tahap) | `/perjalanan` |
| Detail tahap | `/perjalanan/{slug}` |
| Kalkulator | `/kalkulator` |
| Panduan (perpustakaan) | `/panduan` |
| Alat (sekunder) | `/alat` |
| Tentang | `/tentang` |
| Privasi | `/privasi` |
| Kontak | `/kontak` |
| Cek Kelayakan | `/syarat` (tetap) |

Redirect:
- `/profil-kamu` → `/perjalanan/03-skema`
- `/mampu-beli` → `/kalkulator?mode=income`
- `/checklist` → `/perjalanan/05-dana-dokumen`
- `/planner-dp` → `/alat/planner-dp`
- `/sewa-vs-beli` → `/alat/sewa-vs-beli`
- Slug panduan lama `tahap-1-...`..`tahap-8-...` → `/perjalanan/{slug-baru}` (matriks per-rute)

### 3.3 Nav (PRD #32/#98/#99)

- Primary: **Perjalanan · Kalkulator · Panduan · Tentang** + CTA "Mulai".
- Turun dari primary nav: Profil Kamu, Kemampuan Beli, Planner DP, Sewa vs Beli, Checklist, Hubungi, Cek Kelayakan.
- Footer minimal + link jalan-jalan singkat.

### 3.4 Homepage (PRD #25–31)

- Hero: "Mau beli rumah dengan KPR? Mulai dari sini." + CTA "Mulai perjalanan".
- Blok "Kamu sekarang di mana?" (masuk-pertengahan).
- Preview 8 tahap (peta saja).
- "Berapa kemampuanmu?" — kalkulator ringkas.
- 3 panduan unggulan (subsidi / komersial / dana & biaya awal).
- Trust pendek. Footer minimal.
- **Maks 2 tool utama + 1 CTA journey per layar.**

---

## 4. TEMPLATE TAHAP (PRD #51–54)

Header: `03/08` + status (Belum mulai / Sedang disiapkan / Siap lanjut).
Lalu blok berurutan:

1. **TUJUAN** — satu kalimat hasil yang dicapai di tahap ini.
2. **SIAPKAN INI** — item/prasyarat yang harus ada sebelum lanjut.
3. **LAKUKAN** — urutan aksi (landasan: dokumen lama yang sudah tervalidasi).
4. **UANG** — pos biaya yang muncul di tahap ini.
5. **DOKUMEN** — daftar dokumen (master 5 kelompok: Identitas / Penghasilan / Keuangan / Properti / Akad).
6. **PERLU DIPERHATIKAN** — hal yang sering salah / red flag.
7. **HASIL TAHAP** — checklist hasil yang harus terpenuhi.
8. **SIAP LANJUT?** — self-check satu layar, satu keputusan.
9. **BERIKUTNYA** — handoff ke tahap berikutnya (no-dead-end, PRD #50/#122–125).

Tiap tahap: status dokumen per item (✓ siap / ○ belum) + conditional checklist yang bisa dicetak/diekspor.

---

## 5. TATA KELOLA DATA & COPY (PRD #71, #73, #84–89)

- **One-screen-one-decision**; CTA 3 kelas (#71): primer = aksi lanjut jalur; sekunder = dukung keputusan; tersier = eksplorasi.
- **No-dead-end**: tiap layar punya jalan keluar & tiap CTA mengarah ke langkah bermakna.
- **Anti AI-slop/AI-generic** (#73): tanpa pola template (glassmorphism/ungu/holo), tanpa kalimat boilerplate ("dengan jujur...", "Simulasi jujur").
- **SOURCE + DATE LAYER** (#85–86): tiap angka punya sumber & tanggal cek (kepmen, permen, kalkulator zona). Bukan "menurut situs".
- **Data governance object**: `{ name, value, unit, source, checkedAt, status }` untuk setiap angka di kode.
- Copy bersifat mutlak; istilah lama (SiKasep/SiKumbang) **0 match**.
- "Estimasi/indikasi" bukan kepastian. Jangan hapus route tanpa redirect.

---

## 6. ARSITEKTUR ALAT (SEKUNDER, PRD #34–42/#69)

Alat menjadi **pendamping di dalam tahap**, bukan tujuan terpisah:
- Kalkulator (angsuran) → pendamping Tahap 02.
- Planner DP → pendamping Tahap 03.
- Checklist dokumen → pendamping Tahap 05.
- Cek Kelayakan → pendamping Tahap 01/05.
- Bandingkan bank → pendamping Tahap 03/06.
- Glosarium/FAQ → inline tooltip + collapsible di dalam tahap (konten lama dipertahankan di bawah, bukan halaman terpisah).

---

## 7. KPI & PENERIMAAN

- KPI per halaman: klik "mulai perjalanan", lanjut-tahap-berikutnya, kontak/WA di tahap akhir.
- Acceptance criteria (PRD #150–158): tiap halaman = 1 keputusan; 0 dead-end; tiap angka ada sumber+date; 0 sebutan istilah lama; redirect tua berfungsi; lint/test/build hijau.

---

## 8. NON-GOALS / JANGAN

- Bukan blog artikel panjang.
- Bukan katalog bank.
- Bukan grid 5 kalkulator di homepage.
- Bukan "pengumuman/berita" SiKasep/SiKumbang — istilah dihapus total.
- Jangan hapus nilai inti `HERO_HARGA`, `HARGA_MAKS_TAPAK_DEFAULT`, logika kalkulator (kecuali label zona/indikatif).
- Jangan commit `.env*`.