export type KategoriPanduan =
  | "subsidi"
  | "komersial"
  | "keuangan"
  | "proses"
  | "perbandingan";

export type PanduanArtikel = {
  slug: string;
  kategori: KategoriPanduan;
  judul: string;
  deskripsi: string;
  ringkasan: string;
  isi: string[];
};

export const panduanArtikel: PanduanArtikel[] = [
  {
    slug: "kpr-subsidi-flpp",
    kategori: "subsidi",
    judul: "Seluk-Beluk KPR Subsidi FLPP",
    deskripsi:
      "Apa itu FLPP, siapa penerimanya, berapa bunga dan tenor, serta langkah mengurusnya.",
    ringkasan:
      "FLPP adalah program subsidi pembiayaan perumahan dari pemerintah untuk Masyarakat Berpenghasilan Rendah (MBR) dengan bunga rendah dan DP ringan.",
    isi: [
      "FLPP (Fasilitas Likuiditas Pembiayaan Perumahan) adalah skema subsidi pemerintah berupa dana murah yang diteruskan bank penyalur untuk KPR MBR. Praktisnya kamu menikmati bunga rendah — saat ini sekitar 5% flat — dengan DP ringan, dan tenor hingga 20 tahun.",
      "Sasaran program ini rumah tangga MBR: penghasilan di bawah batas yang berlaku — untuk rumah tapak, Rp8,5–14 juta/bulan tergantung zona wilayah dan status pernikahan (Permen PKP No. 5/2025 jo. No. 11/2025 jo. No. 1 Tahun 2026). Syarat lain: usia minimal 21 tahun atau sudah menikah, belum pernah punya rumah, dan belum pernah menerima subsidi perumahan pemerintah.",
      "Harga unit juga dibatasi plafon per zona: bervariasi antara Rp166 hingga Rp240 juta untuk rumah tapak tergantung wilayah (mengacu ketetapan terbaru). Rumah yang bisa dibeli harus termasuk unit perumahan terdaftar penerima FLPP.",
      "Alur pengajuan: pilih pengembang mitra FLPP → booking unit → pengembang memasukkan datamu ke sistem resmi BP Tapera → bank penyalur memproses kredit → akad → serah terima. Verifikasi MBR adalah pintu masuknya, jadi pastikan datamu bersih dan konsisten — statusnya bisa kamu pantau di aplikasi Tapera Mobile.",
      "Catat kelebihan: bunga rendah, DP ringan, dan ada perlindungan tenor panjang. Kekurangan: pilihan unit dan lokasi terbatas pada proyek terdaftar, serta ada kewajiban tinggal sendiri dan larangan kuat menjual dalam jangka waktu tertentu.",
      "Angka bunga, plafon, dan batas penghasilan bisa berubah mengikuti kebijakan. Selalu cek informasi resmi BP Tapera dan bank penyalur sebelum mengajukan.",
    ],
  },
  {
    slug: "kpr-komersial",
    kategori: "komersial",
    judul: "KPR Komersial: Konvensional, Syariah & Strateginya",
    deskripsi:
      "Cara kerja KPR komersial, perbedaan fixed dan floating, serta pilihan konvensional vs syariah.",
    ringkasan:
      "KPR komersial adalah kredit perumahan tanpa subsidi: bunga mengikuti pasar, plafon lebih leluasa, tersedia untuk siapa saja yang lolos analisis bank.",
    isi: [
      "Bagi yang tidak memenuhi kriteria MBR atau membidik rumah di atas plafon subsidi, KPR komersial adalah jalannya. Tidak ada verifikasi MBR; yang menentukan hanyalah kelayakan kredit di mata bank.",
      "Suku bunga komersial umumnya berlapis: periode 'fixed' rendah di 1–3 tahun pertama (promo) lalu beralih ke 'floating' yang bergerak naik-turun mengikuti suku bunga acuan. Karena itu simulasi jangka panjang wajib — jangan terkecoh angka promo.",
      "KPR syariah berjalan dengan akad murabahah (jual-beli dengan margin): tidak ada suku bunga, 'harga jual' sudah final di awal, sehingga angsuran tetap hingga lunas tanpa kejutan kenaikan floating. Cocok juga bagi yang menghindari riba.",
      "Syarat relatif sama dengan subsidi tapi lebih elastis pada penghasilan: KTP/KK, slip gaji atau bukti usaha, rekening koran, NPWP. Beberapa bank memberikan tenor hingga 30 tahun.",
      "Strategi: ajukan ke lebih dari satu bank untuk membandingkan fixed periode, nominal floating, provisi, dan biaya administrasi; pastikan juga ketentuan pelunasan dipercepat agar fleksibel di masa depan.",
      "Semua nilai (bunga, tenor, biaya) sangat bervariasi antar bank dan berubah seiring suku bunga acuan. Gunakan data perbandingan di situs ini sebagai titik awal, lalu konfirmasi langsung ke bank.",
    ],
  },
  {
    slug: "perbedaan-kpr-subsidi-dan-komersial",
    kategori: "perbandingan",
    judul: "Subsidi vs Komersial: Mana yang Tepat untukmu?",
    deskripsi:
      "Perbandingan menyeluruh bunga, DP, plafon, syarat, dan trade-off kedua skema KPR.",
    ringkasan:
      "Keduanya memberimu rumah — bedanya di bunga, DP, batas harga, dan fleksibilitas. Pilih berdasarkan penghasilan dan kebutuhan.",
    isi: [
      "KPR subsidi (FLPP) menang telak di biaya: bunga sekitar 5% flat, DP ringan, tenor hingga 20 tahun. Trade-off-nya: hanya untuk MBR, unit harus rumah pertama, harga dibatasi plafon zona, dan lokasi terbatas pada proyek terdaftar.",
      "KPR komersial menang di fleksibilitas: siapapun bisa mengajukan, harga bebas, lokasi bebas, rumah ke-2/3 pun boleh. Konsekuensinya bunga berbasis pasar — di awal murah, di belakang bisa naik — dan DP umumnya lebih besar (mulai 10–20% atau lebih).",
      "Simpelnya: kalau penghasilan dan target harga dalam koridor MBR, subsidi jelas lebih hemat. Kalau penghasilan di atas batas, menginginkan rumah lebih besar/lokasi lebih bebas, atau ini bukan rumah pertama — komersial.",
      "Ada zona abu-abu: penghasilanmu pas di atas batas MBR namun ingin rumah subsidi — ini tidak diperbolehkan dan verifikasi akan menolak. Sebaliknya, pemilik status MBR tetap boleh mengajukan komersial.",
      "Jalankan simulasi di kalkulator situs ini untuk sisi bunga + tenor, lalu bandingkan total bayar (bunga total + DP + biaya). Angka total bayarlah yang tepat dipakai untuk membandingkan kedua skema.",
    ],
  },
  {
    slug: "cara-membaca-simulasi-angsuran",
    kategori: "keuangan",
    judul: "Cara Membaca Simulasi Angsuran dengan Benar",
    deskripsi:
      "Kolom bunga, tenor, dan total bayar — apa yang angka-angka simulasi sebenarnya sampaikan.",
    ringkasan:
      "Angsuran hanyalah puncak gunung es: total pembayaran selama tenor dan bunga total adalah angka yang harus menjadi dasar keputusan.",
    isi: [
      "Simulasi KPR biasanya menampilkan angsuran bulanan untuk kombinasi harga, DP, tenor, dan bunga. Angka ini dihitung dengan metode anuitas: di awal cicilan, sebagian besar terisi bunga; makin lama, porsi pokok makin besar.",
      "Jebakan paling umum: memilih tenor paling pendek supaya 'cepat lunas' tanpa sadar angsuran menjadi tidak realistis, atau memilih tenor terpanjang karena angsurannya kecil tanpa sadar total bunga membengkak puluhan persen.",
      "Katakan plafon Rp240 juta, bunga 5%, tenor 20 tahun: angsuran sekitar Rp1,58 juta, total bayar sekitar Rp380 juta (bunga ± Rp140 juta). Naikkan tenor ke 25 tahun, angsuran turun sedikit tapi total bunga bisa melebihi Rp180 juta.",
      "Karena itu selalu lihat tiga angka saat membandingkan: (1) angsuran bulanan, (2) total bayar hingga lunas, (3) bunga total. Kalkulator di situs ini menampilkan ketiganya sekaligus.",
      "Ingat, simulasi memakai skema anuitas murni. Bank bisa menambahkan biaya rutin (asuransi, administrasi) dan ada premi yang dibayar sekali di awal — tambahkan biaya tersebut agar angkanya lebih akurat.",
    ],
  },
  {
    slug: "dp-dan-biaya-initial-kpr",
    kategori: "keuangan",
    judul: "DP dan Biaya-Biaya Awal KPR (di Luar Angsuran)",
    deskripsi:
      "Rincian uang muka, BPHTB, provisi, administrasi, notaris, dan asuransi yang perlu disiapkan.",
    ringkasan:
      "Rumah tidak hanya dibayar dari angsuran: siapkan DP plus biaya awal 5–10% nilai rumah untuk birokrasi, pajak, dan asuransi.",
    isi: [
      "Uang muka (DP) adalah pembayaran pertama yang mengurangi harga: umumnya 0–10% untuk KPR subsidi, 10–30% untuk komersial tergantung bank (LTV). Lebih besar DP = plafon & angsuran lebih kecil.",
      "Di luar DP, ada biaya birokrasi-pajak: BPHTB sebesar 5% × (harga jual − NPOPTKP Rp60 juta). Untuk rumah 210jt, BPHTB-nya sekitar Rp7,5 juta.",
      "Biaya bank: provisi (sekitar 1% plafon), administrasi (ratusan ribu hingga jutaan, bisa ditanggung bank). Biaya notaris/PPAT untuk PPJB, AJB, dan balik nama bervariasi 0,5–2% nilai transaksi.",
      "Asuransi: jiwa kredit (melunasi sisa utang bila debitur meninggal) dan asuransi kebakaran umumnya wajib; premi dihitung terhadap plafon dan bisa dipotong dari plafon kredit.",
      "Taksiran sehat: siapkan DP + buffer 5–10% nilai rumah untuk seluruh biaya awal. Tombol 'Biaya Awal' di kalkulator situs ini menghitung estimasi rinciannya agar kamu tidak terkejut.",
      "Semua angka di atas adalah indikasi umum pasar dan tarif daerah; minta rincian biaya tertulis ke bank dan notaris sebelum akad.",
    ],
  },
  {
    slug: "manajemen-keuangan-sebelum-kpr",
    kategori: "keuangan",
    judul: "Menata Keuangan Sebelum Mengambil KPR",
    deskripsi:
      "Rasio cicilan yang sehat, dana darurat, dan langkah 12 bulan sebelum mengajukan pinjaman rumah.",
    ringkasan:
      "Sehatnya kredit ditentukan sebelum akad: kelola utang, bangun dana darurat, dan pastikan rasio cicilan tidak mencekik.",
    isi: [
      "Aturan praktis: total angsuran bulanan hendaknya tidak lebih dari 30–40% penghasilan bersih. Bank menilai ini lewat rasio terhadap slip gaji, tetapi yang berhitung setiap bulan adalah kamu.",
      "Prioritas pertama: lunasi atau kurangi utang konsumtif (KTA, kartu kredit, gadai). Setiap utang konsumtif menurunkan kapasitas plafon dan menaikkan risiko finansialmu.",
      "Bangun dana darurat 3–6 bulan pengeluaran sebelum akad. Kehilangan pekerjaan atau krisis di tahun-tahun pertama KPR adalah momen paling rentan; dana darurat adalah penyelamat.",
      "Di area 6–12 bulan sebelum pengajuan: jaga riwayat rekening tetap sehat (jangan sampai saldo terus tipis atau sering telat bayar), hindari mengajukan pinjaman lain berdekatan (semua tercatat di SLIK dan bisa menurunkan penilaian bank), dan stabilkan pekerjaan.",
      "Siapkan juga 'pos biaya awal' terpisah dari DP: BPHTB, notaris, provisi, asuransi. Mengambil semuanya dari DP adalah resep keuangan jebol di tengah jalan.",
      "Terakhir, jangan habiskan seluruh tabungan pada rumah. Sisa dana untuk perbaikan, furnitur, dan kebutuhan pindahan sering dilupakan dan memicu utang baru.",
    ],
  },
  {
    slug: "alur-lengkap-ambil-kpr",
    kategori: "proses",
    judul: "Alur Lengkap Mengambil KPR: dari Nol sampai Serah Terima",
    deskripsi:
      "Rangkuman 8 tahapan KPR dengan perkiraan waktu dan biaya di tiap langkahnya.",
    ringkasan:
      "Gambaran utuh alur KPR dalam 8 tahap — sehingga tahu kapan mengeluarkan uang dan dokumen apa yang dibutuhkan.",
    isi: [
      "Satu-satunya cara memegang rumah dengan damai adalah memahami keseluruhan jalannya sejak awal. Alur ini dibagi 8 tahap, dan kamu bisa baca masing-masing secara terperinci di halaman panduan tahap.",
      "Tahap 1–2: cek keuangan & kelayakan, lalu riset kebutuhan dan lokasi. Ini fase paling murah — biayanya waktu, bukan uang — dan paling menentukan kualitas keputusan.",
      "Tahap 3–4: pilih skema (subsidi vs komersial), ajukan pre-approval, dan booking unit dengan booking fee. Uang mulai keluar di sini, pastikan SP2 jelas.",
      "Tahap 5–6: pengajuan lengkap ke bank, analisis kredit + appraisal. Ini fase 'menunggu' yang paling menguji kesabaran, 1–3 minggu.",
      "Tahap 7–8: akad di notaris, bayar biaya legalitas, terima kunci, lalu kelola cicilan jangka panjang. Dari nol sampai kunci di tangan bisa 2–6 bulan.",
      "Gunakan navigasi panduan tahap di situs ini untuk detail tiap fase: dokumen, estimasi waktu, biaya, tips, dan kesalahan umumnya.",
    ],
  },
];