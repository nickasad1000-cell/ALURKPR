# Audit Komprehensif + Adversarial — AlurKPR (v5, 2026-09-02)

Sifat: **audit tulis saja** — temuan diranking, tanpa mengedit. Implementasi mengikuti plan terpisah.
Metode: korpus = `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/profil-kamu/page.tsx`,
`components/{ui,alur-jalur,papan-jalur,blueprint-icons,kalkulator,profil-kamu,footer,whatsapp-button,blok-demografis}.tsx`,
`content/tahap.ts`, `lib/finance.ts`. Kriteria = disiplin 21st-ui-review + anti-pattern hallmark.

---

## Bagian A — Temuan reliabel (audit komprehensif)

Tingkat: **P0 wajib diperbaiki** · P1 sebaiknya · P2 pertimbangkan.

### 1. Ligatur `fi` merusak kata formal (P0, teknis)
Fraunces & Plus Jakarta Sans memadukan `f`+`i` jadi satu glif (`fi`), contoh "**afiliasi**",
"**biaya provisi (f+i)**", "**definisi**". Solusi terpilih pengguna: matikan ligatur `fi` saja,
font tetap. `app/globals.css` body saat ini hanya `font-feature-settings: "ss01";` →
tambahkan `"liga" 0, "clig" 0` (CSS `font-variant-ligatures: none` juga alternatif, tapi
`font-feature-settings` konsisten dengan pola yang sudah dipakai).

### 2. Harga rumah dikalkulator dipaksa bulat (P0, perilaku)
`syncHarga` membulatkan ke kelipatan STEP (1 juta) saat mengetik → pengguna tidak bisa
memasukkan harga berapa pun (mis. 168.500.000). Permintaan pengguna: input bebas, tanpa
pembulatan. Slider tetap punya batas (HARGA_MIN/MAX) dan langkahnya sendiri.

### 3. "Total bayar (20 th)" di hero card (P0, kebenaran + redundansi)
Hero card menampilkan angka masa depan (≈Rp260.297.040) yang nilainya spekulatif dan
menduplikasi kalkulator. Dihapus → grid `grid-cols-2` menjadi `grid-cols-3` (Harga,
Uang muka, Tenor). "Total bayar" dinamis tetap tersedia di dalam kalkulator.

### 4. "Biaya awal (DP + biaya) ± Rp 11.502.930" menyesatkan (P0)
Rumus `biayaAwal` memasukkan provisi/administrasi/asuransi sekaligus, lalu banner menyebut
"±Rp11,5jt" yang membingungkan untuk target DP 1% (booking). Permintaan: angka dicoret
(line-through) dan diganti highlight: **"Cukup siapkan biaya booking ±Rp100 ribu"**.

### 5. Ketidakkonsistenan pengungkapan biaya booking (P0, konsistensi konten)
- Hero card: → booking 100rb (setelah perubahan #4).
- Tahap 4 `content/tahap.ts:101`: fakta "±Rp250rb–1jt".
- `kalkulator.tsx` label booking/kuncian belum tentu sesuai.
Tidak harus satu angka global, tapi harus ada alasan jelas dan teks yang tidak saling
menyalahkan (catat di fakta tahap 4 sebagai "kisaran", di hero sebagai "mulai ±Rp100rb").

### 6. Copy AI-generic di home + halaman profil (P1, penulisan)
- Hero subtitle "Pelan tapi pasti: cek kelayakan, hitung angsuran, dan simulasikan KPR —
  semua gratis, tanpa perlu akun." → klise triptych + "gratis tanpa perlu akun" apa adanya.
- "Alat perencanaan gratis / Lima alat untuk mulai merencanakan..." — kata "perencanaan"
  diulang, judul hambar.
- "Rekomendasi personal / Tidak yakin mulai dari subsidi atau komersial?" + halaman
  profil "5 pertanyaan ini dan kami arahkan" — pembaca tidak men-centang "kami arahkan";
  gunakan sudut pandang langsung ke pembaca & janji spesifik.
- "Kenapa AlurKPR / Yang membedakan panduan ini dari artikel lainya" (sic — typo) → copy ulang.
- Fitur card "Banding kanal bank" (typo, harus "Bandingkan"), frase ambigu "kanal".
- "Pakar? Bukan — jelas & sederhana" — kontradiksi nyaring "Pakar? Bukan" = pola debat sarkastik.

### 7. Elemen sales-yang-hilang & halaman mati (P1, konten)
- Footer "Dibuat dengan semangat literasi perumahan." → hapus (klaim valuasi diri).
- Home "Baca selanjutnya / Tiga topik yang paling sering dicari" → hapus seluruh block
  (3 card) bila tidak ada halaman artikel terhubung yang memadai (cek dulu; home luring
  lebih utuh tanpa ancar-ancar artikel).
- "Revisi 2026.2" dalam alur KPR → hapus (serasah metadata).

### 8. "Alat & referensi" di footer terlalu panjang (P1, organisasi halaman)
List 10 tautan kolom panjang → `grid grid-cols-2` di dalam kolom (atau pangkas duplikat),
sehingga tetap ringkas tanpa kehilangan referensi.

### 9. Tombol akhir kuis ProfilKamu berdempetan/tumpang tindih (P0, layout)
State "selesai": `grid gap-3 sm:grid-cols-2` (Hitung angsuran + Cek kelayakan) lalu
`WhatsAppButton` langsung tanpa jarak → rapat dan menumpuk. Diperbaiki jadi tumpukan
full-width dengan jarak (btnPrimary→WhatsApp full width→btnSecondary→Ulangi `mt-4`),
indentasi yang rusak juga dirapikan.

### 10. Alur KPR — noise visual pada jalur (P1, layout)
- Garis jalur SVG yang mengganggu (menerobos lihat panel karena panel semi-transparan).
- Token kunci menutupi teks info saat panel terbuka.
- Ikon per tahap datar & tidak menggambarkan "3D".
- Tile menampilkan terlalu banyak info sehingga kehilangan fokus.
- "Mainkan demo" tombol + ikon refresh → dihapus (infinite loop otomatis).
"Jeda saat panel terbuka" dipilih oleh pengguna untuk loop tak berujung.

### 11. Pemerataan tipografi & spasi (P2, polish)
- Beberapa heading memakai ink-soft/ink campuran; konsistensikan kontras heading = ink.
- `leading` judul cukup, periksa heading 2 lini di Fraunces (cap height besar).
- Spasi antar-seksi: seragamkan `mt-` antara seksi agar ritme konsisten.

---

## Bagian B — Temuan adversarial (audit "musuh internal")

Asumsi jahat dan tekanan kualitas dari hallmark.

### B1. "Siapa yang dikelabui?" — metric yang diciptakan
- "Revisi 2026.2", "Setiap tahun di-update" (footer) → angka versi yang tidak punya bukti.
  Tanpa changelog publik, jangan klaim. **Hapus/mengganti dengan tanggal verifikasi terakhir.**
- "±Rp11.502.930" dan "±Rp260.297.040"— presisi rupiah di situasi estimasi = kepercayaan palsu.
  **Angka bulat + label estimasi**, bukan presisi sentinel.

### B2. "No fake chrome"
- Semua tombol/ikon harus fungsional. Cek profil-kamu & navbar "Simulator" dropdown:
  apa pun yang tampak seperti tombol tapi menuju tempat tak ada = lip-tekstur. Dari
  temuan #10, tombol "Mainkan demo" dihapus bukan diganti tombol dekoratif lain.

### B3. "Typography purity" (Fraunces sebagai display)
- Fraunces dipakai untuk banyak heading besar; di kalkulator hasil numerik juga memakai
  Fraunces — periksa tabular/stack untuk angka agar kolom sejajar (bila tabel/dua kolom harga).
- Periksa tidak ada italic serif display (Fraunces talic melengkung "ti") — hindari.

### B4. "Mobile 320–768" 
- Risiko utama: hero card `grid-cols-2` (menjadi `grid-cols-3`) harus aman di 320px.
- Banner hero dengan coretan + highlight booking: jangan sampai 2 elemen disejajarkan
  horizontal di mobile; biarkan tumpuk.
- Alur KPR baru: tile berisi ikon+judul — pastikan di 320px ikon tidak mendesak judul;
  glove container tetap `overflow-x-auto` bila perlu, bukan mengecil.

### B5. "No invented scale" — warna/ukuran adversarial
- Warna `primary`, `primary-deep`, `accent` dipakai konsisten di seluruh situs — jangan
  improvisasi hex baru. Ikon 3D per tahap mewarisi ramp: netral (ink/soft) → hijau
  (primary) → gold (accent). Bukan palet baru.
- `font-feature-settings` harus diset pada `body` (wariskan ke semua kecuali yang
  menimpanya) agar perubahan ligatur terasa di seluruh situs, bukan hanya hero.

### B6. "Tone tidak menyalahkan / tidak menyombongkan"
- "Pakar? Bukan — jelas & sederhana" → ganti agar rendah hati ("Kami bukan pakar,
  kami penerjemah proses." → terlalu dramatis; pakai "Dibuat untuk orang awam, tanpa
  istilah miring aneh.").
- "semangat literasi perumahan" → hapus (klaim misionaris).
- "gratis, tanpa akun, tanpa ribet" → hapus redundansi; satu klaim saja.

### B7. Celah yang bisa "ditelikung" pengujian
- `syncHarga` bebas input → batas HARGA_MIN/MAX tetap diterapkan? Harus dijaga:
  > HARGA_MAX dikalkulator: jika melebihi max, tampil pesan tidak (jangan diam-diam reset).
- `formatAngkaId` → jangan pernah menampilkan `Rp1000.5` — pastikan desimal diabaikan/
  dibulatkan hanya untuk tampilan, bukan untuk state.
- Loop infinite alur KPR: pastikan `requestAnimationFrame`/interval dibersihkan saat
  panel dibuka & komponen unmount (tidak bocor timer).

---

## Ringkasan prioritas
P0: 1 (ligatur), 2 (harga bebas), 3 (hapus Total bayar), 4 (coret biaya awal + booking
100rb highlight), 9 (tombol profil), 10 (alur KPR rework). P1: 5, 6, 7, 8 + sebagian B.
P2: 11 + B3, B4. Seluruh perubahan PO dijadwalkan di plan komprehensif; B1–B7 di plan adversarial.