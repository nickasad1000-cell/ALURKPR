# Plan Adversarial — AlurKPR v5 (2026-09-02)

Tujuan: serang rencana komprehensif dengan asumsi kemungkinan terburuk — jika PR ini
digebah oleh reviewer brutal atau diekspose di halaman demo publik, apa yang bocor?
Guarantee bahwa audit B (adversarial) benar-benar menjadi checklist pengunci, bukan hiasan.

---

## A1 — "Siapa yang dibohongi?" (ketidakjujuran angka)

- **`heroTotal` & `heroBiayaAwal`** dihapus dari hero, TAPI masih dipakai-import di
  `app/page.tsx`? Jika masih dipakai untuk kartu lain dengan presisi ↑, cek konsistensi
  naratif (harga rumah 166jt di hero vs angka di kalkulator). Risiko: dua angka berbeda
  untuk hal sama tampil di halaman yang sama.
  **Keputusan:** hapus variabel `heroBiayaAwal` bila tak terpakai; jika terpakai, pilih
  SATU sumber kebenaran (`lib/finance.ts`) dan tampilkan dengan label "estimasi".
- **`biayaAwal`** perhitungan (provisi, administrasi, asuransi, notaris + pajak) → angka
  yang dihasilkan dipakai di banner "Biaya awal". Setelah di-strike, pastikan teks
  "±Rp100rb booking" tidak lagi memakai format presisi penuh rupiah. Bila `formatRupiah`
  menampilkan `.00`, gunakan tanpa sen (ada `formatAngkaId`?). Cek helper.

## A2 — Ligatur 'fi': apa yang gagal?

- Jika kita men-set `font-feature-settings` pada `body` SEMENTARA `Fraunces` memakai
  `font-variant-ligatures` sendiri (dari Google Fonts), CSS kita mungkin kedahuluan.
  **Keputusan:** set pada `body` DAN `html` (dua selector), dan tetap pertahankan di
  heading (heading Pakai Fraunces — ligatur `fi` muncul di "definisi" heading kalau ada).
- Potongan `ss01` kita terluka? Cek apakah menonaktifkan `liga` juga menonaktifkan `ss01`
  (fitur berbeda). Simpan `"ss01"` dalam daftar supaya tidak menampar.

## A3 — Harga bebas `kalkulator`

- Kalau `HARGA_MIN/MAX` hanya di range slider tapi input text menerima angka 80.000.000.000,
  grafik/simulasi bisa menghasilkan infinity/NaN di awal render. **Harus ada guard:**
  `Math.min(HARGA_MAX, Math.max(HARGA_MIN, n))` HANYA untuk perhitungan (bukan untuk
  state input) → angka tetap aman.
- `formatAngkaId` harus menangani `1_000_000.5` tanpa memunculkan desimal · pastikan
  `toLocaleString("id-ID")` bisa terima `maximumFractionDigits:0`.

## A4 — Loop alur KPR: resource leak

- Komponen `papan-jalur` punya interval autoplay. Jika halaman dirender server-side
  (Next App Router) dan ada `useEffect` yang set `setInterval` tanpa cleanup → warn di
  konsol. **Keputusan:**
  - `useEffect(() => { if (openIndex === null) { const id = setInterval(...); return () => clearInterval(id);} else return; }, [openIndex])`.
  - Jangan sebar "Mainkan demo" → hapus seluruh `useEffect` untuk tombol. Circuit-pause
    harus bekerja: interval hanya hidup saat `openIndex === null`.
- Pastikan reducer/depedensi tidak memasukkan objek baru tiap render (stale closure).

## A5 — Token kunci & panel solid

- Saat panel terbuka, token disembunyikan — tapi jika panel = `absolute` overlay,
  akses keyboard (focus) pindah ke panel; token tersembunyi membuat pengguna keyboard
  kehilangan tahu posisi. **Keputusan kecil:** saat panel terbuka, token move ke posisi
  tahap aktif dengan `aria-hidden="true"` agar tidak ganda-announce.
- Panel dengan `bg-surface` opaque: pastikan `line`/jalur SVG di belakang tidak bocor di
  ujung (radius sama). Gunakan `rounded-2xl` konsisten + `shadow` ringan untuk memisahkan
  dari jalur.

## A6 — Ikon 3D per tahap

- Jika pakai CSS `box-shadow` untuk menghasilkan bevel/3D pada `span` kecil (28px), pastikan
  tidak menggeser tata letak layout tile (rantai inline). Lebih aman: bungkus dalam
  `slot`-style, fix-size `w-10 h-10` dan `shrink-0`, `relative` untuk `pseudo` bevel.
- Warna ramp tidak boleh improvisasi hex baru (audit B5): reuse token:
  - netral `bg-ink-soft/10` + `text-ink`
  - hijau `bg-primary-soft`/`text-primary-deep`
  - gold `bg-accent-soft`/`text-accent-ink`
  Bukan alpha mix aneh.

## A7 — "Banding kanal bank" typo

- Grep `kanal` bila ada. `kanal`= kanal; maksudnya "Bandingkan bank" atau "Banding skema".
- Jaman sekarang "kanal" definisi iklan — konsistensi: ganti ke "Bandingkan unit sasaran".

## A8 — Post-commit: perintah bahwa deploy otomatis kalau Vercel terkonfigurasi.

- Jika repo dinamis & ada Git-hook/pre-commit yang menyulap, pastikan `npm run build`
  tidak perlu input. Saat push, Vercel mungkin mem-build ulang versi main otomatis —
  tidak perlu `vercel --prod` ganda. Panggil `git status` + `git log --oneline -3`
  sebelum apa pun.

---

## Checklist adversarial "adakan aku gagal" (final check, harus semua ✓)

- [ ] `syncHarga` dengan angka 168_500_000: state harga = 168500000 (bukan 168/169).
- [ ] Ligatur "fi" tidak terbentuk (verifikasi manual di hero & kalkulator).
- [ ] Tidak ada string `Pelan tapi pasti`, `Total bayar (20 th)`, `semangat literasi`,
      `Revisi`, `Baca selanjutnya`, `Banding kanal` tersisa setelah implementasi.
- [ ] `font-feature-settings` ada di `html`+`body`, `ss01` tetap.
- [ ] Interval autoplay tidak berjalan saat panel terbuka; bersih saat unmount.
- [ ] Token kunci tersembunyi saat panel terbuka (`aria-hidden` saat tantangan).
- [ ] Grid hero di 320px tidak pecah (3 item → 3 kolom? Cek di viewport kecil:
      gunakan `grid-cols-1 sm:grid-cols-3` bila perlu).
- [ ] `npm run lint && npm test && npm run build` PASS.
- [ ] Commit difokuskan (jangan masukkan file audit/plan ke commit bila tidak diminta).