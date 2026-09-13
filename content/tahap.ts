import type { Tahap } from "../lib/types";

export const tahapKpr: Tahap[] = [
  {
    nomor: 1,
    slug: "01-keuangan",
    judul: "Siapkan Keuangan",
    judulSingkat: "Siapkan keuangan",
    ringkasan:
      "Tahu penghasilan bersih, cicilan maksimal yang sehat, dan posisi keuanganmu sebelum langkah lainnya.",
    estimasiWaktu: "1–2 minggu",
    fakta: {
      nilai: "30–40%",
      label: "Batas cicilan sehat dari penghasilan bersih",
      sumber: "Praktik perbankan & edukasi perencanaan keuangan",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Kamu tahu keuanganmu siap atau belum, dan berapa cicilan bulanan yang masih nyaman.",
    siapkanIni: [
      "Catatan penghasilan bersih bulanan (setelah potongan)",
      "Daftar utang dan tagihan tetap bulanan",
      "Saldo tabungan dan dana darurat",
    ],
    lakukan: [
      "Hitung penghasilan bersih bulanan dan total tagihan tetap (utang, kartu kredit, langganan).",
      "Pastikan calon angsuran tidak lebih dari 30–40% penghasilan bersih.",
      "Targetkan dana darurat 3–6 bulan pengeluaran sebelum akad.",
      "Kalau membidik KPR subsidi (FLPP): cek syarat MBR — usia minimal 21 tahun atau sudah menikah, belum punya rumah, dan belum pernah menerima subsidi.",
    ],
    uang: ["Tidak ada uang keluar — modal utamanya waktu dan data"],
    dokumen: [
      { kelompok: "identitas", nama: "KTP" },
      { kelompok: "identitas", nama: "Kartu Keluarga" },
      { kelompok: "penghasilan", nama: "Slip gaji / bukti penghasilan 3 bulan terakhir" },
      { kelompok: "keuangan", nama: "Rekening tabungan 3 bulan terakhir" },
    ],
    perhatikan: [
      "Limit cicilan bank bukan kemampuanmu yang sebenarnya — bank menilai data, kamu yang membayar tiap bulan.",
      "Biaya awal di luar DP (BPHTB, notaris, provisi, asuransi) sering dilupakan — siapkan buffernya.",
      "Kebiasaan telat bayar utang konsumtif tercatat di SLIK dan menekan penilaian bank.",
    ],
    hasilTahap: [
      "Tahu angka penghasilan bersih bulanan",
      "Tahu cicilan maksimal yang masih sehat",
      "Dana darurat 3–6 bulan tercatat",
      "Status MBR ter-identifikasi (untuk jalur subsidi)",
    ],
    siapLanjut:
      "Kalau kamu sudah tahu penghasilan bersih dan cicilan maksimal yang aman, lanjut ke tahap berikutnya.",
    menunggu: "Bisa berjalan sambil riset rumah.",
  },
  {
    nomor: 2,
    slug: "02-kemampuan-target",
    judul: "Tentukan Kemampuan & Target Rumah",
    judulSingkat: "Kemampuan & target rumah",
    ringkasan:
      "Ubah angka cicilan maksimal jadi rentang harga rumah yang realistis, lengkap dengan target tipe dan lokasi.",
    estimasiWaktu: "2–6 minggu",
    fakta: {
      nilai: "±Rp166 jt",
      label: "Zona Jawa · indikatif (harga unit FLPP)",
      sumber: "Kepmen PKP No. 1722/KPTS/M/2026",
      terakhirDicek: "2026-08-06",
    },
    tujuan:
      "Kamu tahu rentang harga rumah yang realistis, besaran dana yang perlu dikumpulkan, dan target jenis rumahnya.",
    siapkanIni: [
      "Hasil Tahap 01: angka cicilan maksimal",
      "Total dana terkumpul (tabungan + aset cair)",
      "Preferensi lokasi: radius kerja, akses, fasilitas",
    ],
    lakukan: [
      "Gunakan kalkulator angsuran: masukkan penghasilan untuk tahu plafon dan angsuran maksimal.",
      "Tetapkan DP dan biaya awal yang siap kamu keluarkan (DP + buffer ±10% nilai rumah).",
      "Definisikan kebutuhan rumah: tipe 36/45 atau lebih, jumlah kamar, prioritas lokasi.",
      "Cocokkan target harga dengan plafon subsidi per zona (Lumajang = zona Jawa, indikatif) atau harga pasar untuk komersial.",
    ],
    uang: ["Transportasi survei", "Opsional: konsultasi perencana keuangan"],
    dokumen: [
      { kelompok: "keuangan", nama: "Rangkuman penghasilan & aset (hasil Tahap 01)" },
    ],
    perhatikan: [
      "Jangan menargetkan rumah di atas kemampuan hanya karena angsurannya terlihat kecil di tenor panjang.",
      "Harga subsidi bervariasi per zona dan bisa berubah — selalu labeli angka sebagai indikatif.",
      "Gap antara tabungan dan DP itu wajar — jadikan target menabung, bukan alasan menyerah.",
    ],
    hasilTahap: [
      "Rentang harga rumah target tertulis",
      "Jumlah DP + biaya awal yang harus disiapkan jelas",
      "Gap tabungan terhadap DP terukur",
      "Prioritas lokasi & spesifikasi rumah disepakati",
    ],
    siapLanjut:
      "Kalau sudah ada angka harga maksimal dan target tipe rumah, lanjut untuk memilih skema.",
  },
  {
    nomor: 3,
    slug: "03-skema",
    judul: "Pilih Skema KPR",
    judulSingkat: "Pilih skema KPR",
    ringkasan:
      "Satu keputusan besar: subsidi FLPP atau komersial. Bandingkan bunga, DP, dan syarat sebelum memilih.",
    estimasiWaktu: "1–2 minggu",
    fakta: {
      nilai: "5%",
      label: "Bunga flat FLPP (indikatif) vs floating komersial",
      sumber: "BP Tapera & perbandingan bank penyalur",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Kamu memilih satu skema — subsidi FLPP atau komersial — dengan alasan yang jelas.",
    siapkanIni: [
      "Hasil Tahap 02: rentang harga target",
      "Status MBR dari Tahap 01",
    ],
    lakukan: [
      "Cek status MBR terhadap batas penghasilan yang berlaku (Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1 Tahun 2026).",
      "Cocokkan target harga dengan plafon zona subsidi; kalau di atasnya, otomatis jalur komersial.",
      "Bandingkan bunga FLPP (±5% flat) vs komersial (fixed 1–3 tahun lalu floating) dan hitung total bayar hingga lunas.",
      "Cek syarat: rumah pertama & belum pernah subsidi (FLPP) atau bebas (komersial).",
      "Putuskan satu skema untuk seluruh proses berikutnya.",
    ],
    uang: ["Subsidi: DP ringan (±0–1%) + booking fee", "Komersial: DP umumnya 10–30%"],
    dokumen: [
      { kelompok: "keuangan", nama: "Simulasi perbandingan skema (hasil kalkulator)" },
    ],
    perhatikan: [
      "Jangan memilih dari angsuran promo tahun pertama — hitung total bayar sampai lunas.",
      "DP komersial jauh lebih besar dari subsidi; sesuaikan dengan dana yang sudah direncanakan di Tahap 02.",
      "Kalau belum yakin, jangan lanjut — keputusan ini menentukan seluruh jalur berikutnya.",
    ],
    hasilTahap: [
      "Satu skema terpilih (subsidi atau komersial)",
      "Alasan pemilihan tertulis (bunga, DP, syarat)",
    ],
    siapLanjut:
      "Sudah ada satu skema yang dipilih? Kalau iya, lanjut mencari rumah yang cocok.",
  },
  {
    nomor: 4,
    slug: "04-cari-verifikasi",
    judul: "Cari & Verifikasi Rumah",
    judulSingkat: "Cari & verifikasi rumah",
    ringkasan:
      "Jelajahi calon rumah, verifikasi legalitasnya, lalu kunci unit dengan booking fee — sebelum mengeluarkan uang besar.",
    estimasiWaktu: "2–6 minggu",
    fakta: {
      nilai: "±Rp100rb–1jt",
      label: "Kisaran booking fee untuk mengunci unit",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Kamu menemukan satu unit yang cocok dan legal, dan menguncinya dengan booking fee.",
    siapkanIni: [
      "Daftar prioritas lokasi & kebutuhan (Tahap 02)",
      "Skema terpilih (Tahap 03)",
      "Dana untuk booking fee",
    ],
    lakukan: [
      "Kunjungi minimal 3–5 pilihan: proyek baru, situs properti, atau rumah seken.",
      "Verifikasi legalitas: SHM/IMB, perizinan PSU, dan reputasi pengembang.",
      "Untuk subsidi: pastikan unit terdaftar di proyek penerima FLPP (cek via Tapera Mobile / BP Tapera).",
      "Tanyakan ketentuan refund booking fee (SP2) sebelum membayar.",
      "Cek progres pembangunan dan jadwal serah terima.",
      "Bayar booking fee untuk mengunci unit.",
    ],
    uang: [
      "Booking fee (±Rp100 rb – 1 jt, bisa jadi bagian DP)",
      "Transportasi survei",
    ],
    dokumen: [
      { kelompok: "identitas", nama: "KTP" },
      { kelompok: "identitas", nama: "Kartu Keluarga" },
      { kelompok: "properti", nama: "SP2 / surat pemesanan unit" },
      { kelompok: "properti", nama: "Bukti legalitas unit (SHM/IMB, denah)" },
    ],
    perhatikan: [
      "Jangan bayar booking ke pengembang yang legalitas dan rekeningnya tidak jelas.",
      "Klausul refund SP2 harus hitam di atas putih — sekecil apa pun nominalnya.",
      "Untuk subsidi, unit yang tidak terdaftar FLPP tidak bisa diproses.",
    ],
    hasilTahap: [
      "Satu unit terkunci + SP2 tertandatangani",
      "Legalitas unit terverifikasi",
      "Jadwal serah terima dicatat",
    ],
    siapLanjut:
      "Unit terkunci dan legalitas beres? Siapkan dana dan dokumen pengajuan.",
  },
  {
    nomor: 5,
    slug: "05-dana-dokumen",
    judul: "Siapkan Dana, Dokumen & Ajukan",
    judulSingkat: "Siapkan dana & ajukan",
    ringkasan:
      "Lengkapi seluruh dokumen pengajuan, siapkan dana awal, lalu serahkan permohonan ke bank penyalur.",
    estimasiWaktu: "1–2 minggu (kelengkapan berkas)",
    fakta: {
      nilai: "5 kelompok",
      label: "Master dokumen: identitas · penghasilan · keuangan · properti · akad",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Pengajuan lengkap masuk ke bank dengan berkas konsisten, dan kamu memegang tanda terima.",
    siapkanIni: [
      "Unit terkunci (Tahap 04)",
      "Dana untuk DP + biaya awal",
      "Seluruh dokumen dalam 5 kelompok master",
    ],
    lakukan: [
      "Lengkapi berkas pengajuan dari 5 kelompok dokumen (identitas, penghasilan, keuangan, properti, akad).",
      "Buat fotokopi/scan rapi dan pastikan data konsisten di semua dokumen.",
      "Ajukan ke 1–2 bank (subsidi: bank penyalur FLPP, verifikasi MBR lewat Tapera Mobile).",
      "Isi formulir dengan data yang benar dan lengkap, lalu simpan salinan aplikasi dan bukti terima berkas.",
    ],
    uang: [
      "Biaya administrasi bank",
      "Provisi (±1% plafon)",
      "Biaya appraisal (di tahap analisis)",
    ],
    dokumen: [
      { kelompok: "identitas", nama: "KTP & KK calon debitur dan pasangan" },
      { kelompok: "identitas", nama: "Buku nikah (bila menikah)" },
      { kelompok: "penghasilan", nama: "Slip gaji / bukti penghasilan 3 bulan" },
      { kelompok: "penghasilan", nama: "Bukti usaha + laporan keuangan (bila wiraswasta)" },
      { kelompok: "keuangan", nama: "Rekening koran 3 bulan" },
      { kelompok: "keuangan", nama: "NPWP" },
      { kelompok: "properti", nama: "PPJB / SP2 unit" },
      { kelompok: "properti", nama: "SHM / IMB / denah (sesuai status)" },
    ],
    perhatikan: [
      "Ketidaksesuaian data antar berkas adalah penyebab umum penolakan atau koreksi berulang.",
      "Jangan sembunyikan penghasilan demi plafon naik — verifikasi akan menolak.",
      "Mengajukan ke banyak bank sekaligus menambah catatan di SLIK.",
    ],
    hasilTahap: [
      "Berkas lengkap (5 kelompok) dan konsisten",
      "Pengajuan masuk + bukti terima dari bank",
      "Estimasi waktu proses diketahui",
    ],
    siapLanjut:
      "Berkas sudah diterima bank? Cicilan menunggu giliran analisis kredit dan penilaian unit.",
  },
  {
    nomor: 6,
    slug: "06-analisis-appraisal",
    judul: "Analisis Bank & Appraisal",
    judulSingkat: "Analisis bank & appraisal",
    ringkasan:
      "Bank menilai kelayakan kreditmu dan menilai wajar-tidaknya harga unit. Responsif terhadap permintaan data tambahan.",
    estimasiWaktu: "1–3 minggu",
    fakta: {
      nilai: "1–3 minggu",
      label: "Proses analisis kredit + appraisal",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Mendapat hasil analisis bank (SP3K) dan penilaian unit yang wajar.",
    siapkanIni: [
      "Nomor pengajuan / referensi dari bank",
      "Berkas cadangan tambahan yang mungkin diminta",
    ],
    lakukan: [
      "Biarkan bank memeriksa SLIK, rasio pendapatan, stabilitas kerja, dan riwayat pembayaranmu.",
      "Jadwalkan appraisal unit — surveyor menilai fisik dan lokasi untuk memastikan harga wajar (LTV).",
      "Tanggapi cepat setiap permintaan dokumen tambahan dari bank.",
      "Setelah disetujui, baca SP3K sampai tuntas: plafon, bunga, tenor, dan syarat.",
    ],
    uang: ["Biaya appraisal (kebijakan bank / borrower, tergantung bank)"],
    dokumen: [
      { kelompok: "akad", nama: "Surat persetujuan kredit (SP3K)" },
      { kelompok: "keuangan", nama: "Dokumen tambahan sesuai permintaan bank" },
    ],
    perhatikan: [
      "Hasil SLIK yang kurang bersih bukan akhir segalanya — diskusikan solusinya dengan bank.",
      "Harga unit di atas hasil appraisal biasanya dilanjutkan dengan negosiasi DP tambahan.",
      "'Acc kredit' belum berarti selesai: akad dan serah terima masih menunggu.",
    ],
    hasilTahap: [
      "SP3K terbit dan terbaca seluruhnya",
      "Hasil appraisal jelas (nilai wajar unit)",
      "Jadwal akad disepakati",
    ],
    siapLanjut:
      "SP3K sudah di tangan dan kamu paham seluruh isinya? Saatnya akad di notaris.",
  },
  {
    nomor: 7,
    slug: "07-akad",
    judul: "Persetujuan & Akad Kredit",
    judulSingkat: "Akad kredit",
    ringkasan:
      "Tandatangani akad kredit di notaris/PPAT, bank mencairkan plafon, dan kewajibanmu dimulai.",
    estimasiWaktu: "1–4 minggu (kesiapan pengembang & notaris)",
    fakta: {
      nilai: "Di hadapan notaris",
      label: "Akad kredit + PPJB/AJB tanda-tangan & hakik wajib",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Akad kredit ditandatangani; plafon dicairkan ke pengembang; cicilan pertamamu berjalan bulan depan.",
    siapkanIni: [
      "SP3K dari bank",
      "Dana untuk biaya akad & pajak",
      "Identitas asli (KTP, KK, buku nikah)",
    ],
    lakukan: [
      "Jadwalkan akad di notaris/PPAT bersama pengembang dan bank.",
      "Baca dan minta penjelasan setiap pasal sebelum menandatangani akad kredit dan PPJB/AJB.",
      "Bank mencairkan plafon ke pengembang — pastikan rinciannya sesuai SP3K.",
      "Bayar biaya akad, BPHTB, dan balik nama sesuai rincian notaris.",
      "Ambil salinan seluruh dokumen akad.",
    ],
    uang: [
      "Biaya notaris/PPAT (±0,5–2% nilai transaksi)",
      "BPHTB: 5% × (harga − NPOPTKP)",
      "Biaya balik nama & sertifikat",
      "Biaya akad & asuransi (jiwa + kebakaran)",
    ],
    dokumen: [
      { kelompok: "identitas", nama: "KTP & KK asli calon debitur dan pasangan" },
      { kelompok: "akad", nama: "Buku nikah" },
      { kelompok: "akad", nama: "SP3K" },
      { kelompok: "akad", nama: "PPJB / SP2 unit" },
      { kelompok: "akad", nama: "Identitas saksi" },
      { kelompok: "akad", nama: "Dana biaya akad & pajak" },
    ],
    perhatikan: [
      "Baca akad sampai selesai — pasal biaya dan adendum sering menyesatkan bila dilewati.",
      "Biaya akad bervariasi; minta rincian tertulis notaris sebelum hari-H.",
      "Urus balik nama segera setelah akad, jangan ditunda-tunda.",
    ],
    hasilTahap: [
      "Akad kredit & PPJB/AJB ditandatangani",
      "Plafon dicairkan ke pengembang sesuai SP3K",
      "Biaya akad, BPHTB, dan balik nama terbayar",
      "Salinan seluruh dokumen akad dipegang",
    ],
    siapLanjut:
      "Akad beres? Kini giliran serah terima unit — dan kuncinya.",
  },
  {
    nomor: 8,
    slug: "08-kunci",
    judul: "Serah Terima & Kunci",
    judulSingkat: "Serah terima & kunci",
    ringkasan:
      "Terima unit sesuai janji, periksa kelengkapannya, tanda tangani BAST, dan kunci di tangan.",
    estimasiWaktu: "1–2 minggu (setelah akad)",
    fakta: {
      nilai: "🔑",
      label: "Garis akhir — kunci di tangan",
      terakhirDicek: "2026-09-01",
    },
    tujuan:
      "Kunci unit di tangan, seluruh dokumen serah terima lengkap, dan cicilan bulanan resmi berjalan.",
    siapkanIni: [
      "Salinan akad & bukti pelunasan biaya ke pengembang",
      "Jadwal serah terima yang disepakati",
    ],
    lakukan: [
      "Periksa unit terhadap denah dan spesifikasi yang dijanjikan (luas, finishing, PSU).",
      "Pastikan kunci, kelengkapan rumah, dan dokumen (sertifikat, IMB, SHGB/SHM, bukti PBB) diserahkan.",
      "Buat dan tandatangani berita acara serah terima (BAST).",
      "Atur pembayaran cicilan mulai bulan pertama (autodebet direkomendasikan).",
    ],
    uang: ["Iuran lingkungan / PBB tahun pertama", "Biaya pindahan & keperluan awal hunian"],
    dokumen: [
      { kelompok: "properti", nama: "Sertifikat / SHGB-SHM, IMB, bukti PBB" },
      { kelompok: "akad", nama: "Berita acara serah terima (BAST)" },
      { kelompok: "keuangan", nama: "Buku tabungan / autodebet cicilan" },
    ],
    perhatikan: [
      "Jangan tanda tangan BAST sebelum unit benar-benar sesuai janji.",
      "Kunci tanpa dokumen = rumah tapi tanpa identitas; pastikan sertifikat & IMB ikut diserahkan.",
      "Mulai cicilan tepat waktu — riwayat pembayaran tercatat di SLIK.",
    ],
    hasilTahap: [
      "Unit terperiksa dan sesuai spesifikasi",
      "Kunci + seluruh dokumen serah terima diterima",
      "BAST ditandatangani",
      "Cicilan bulanan tersiapkan (autodebet)",
    ],
    siapLanjut:
      "Kunci di tangan, dokumen lengkap, cicilan berjalan — kamu resmi pemilik rumah.",
  },
];

/**
 * KONTEN SEKUNDER — setelah kunci di tangan (bukan tahap ke-9).
 * Dipakai di hub /perjalanan & footer sebagai pengingat jangka panjang.
 */
export const setelahKunci = {
  judul: "Setelah Kunci",
  ringkasan:
    "Cicilan masih berjalan hingga puluhan tahun. Kelola tiga hal ini agar rumah tidak menjadi beban.",
  poin: [
    {
      judul: "Bayar cicilan tepat waktu",
      teks: "Utamakan angsuran di hari gajian supaya riwayat SLIK tetap bersih. Autodebet menghindarkan lupa bayar.",
    },
    {
      judul: "Sisihkan dana perawatan",
      teks: "Anggaran ±1–3% nilai rumah per tahun untuk perbaikan atap, plafon, dan PSU. Rumah yang dirawat tetap berharga.",
    },
    {
      judul: "Evaluasi bunga berkala",
      teks: "Setiap 1–2 tahun bandingkan bunga bank. Pelunasan sebagian (bila bebas penalti) atau take-over bisa memangkas total bunga puluhan juta.",
    },
    {
      judul: "Jaga asuransi tetap aktif",
      teks: "Asuransi jiwa kredit membuat keluarga tidak terbebani bila terjadi risiko. Jangan biarkan polis mati.",
    },
  ],
} as const;