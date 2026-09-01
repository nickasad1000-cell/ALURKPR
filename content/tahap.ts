import type { Tahap } from "../lib/types";

export const tahapKpr: Tahap[] = [
  {
    nomor: 1,
    slug: "tahap-1-cek-keuangan-dan-kelayakan",
    judul: "Cek Keuangan & kelayakan Sebelum Apa Pun",
    judulSingkat: "Cek kelayakan & keuangan",
    ringkasan:
      "Hitung penghasilan, cicilan maksimal, dan pastikan kamu memenuhi syarat sebelum mulai mencari rumah.",
    fakta: { nilai: "30–40%", label: "Batas cicilan sehat dari penghasilan" },
    penjelasan: [
      "Langkah pertama justru bukan mencari rumah, melainkan bersiap dari sisi finansial dan administrasi. Cek batas cicilan sehat: idealnya angsuran tidak lebih dari 30–40% penghasilan bersih bulanan.",
      "Hitung dana yang sudah terkumpul: uang muka (DP), biaya awal (BPHTB, provisi, administrasi, notaris, asuransi), plus dana darurat minimal 3–6 bulan pengeluaran.",
      "Jika kamu menargetkan KPR subsidi (FLPP), pastikan memenuhi persyaratan MBR: usia minimal 21 tahun atau sudah menikah, belum punya rumah, belum pernah menerima subsidi, dan penghasilan pokok sesuai batas yang berlaku.",
      "Gunakan cek kelayakan di situs ini untuk simulasi cepat. Kalau belum lolos, kamu masih punya waktu untuk menabung lebih banyak atau menurunkan target harga rumah.",
    ],
    dokumen: ["KTP", "Kartu Keluarga", "Slip gaji / keterangan penghasilan 3 bulan terakhir"],
    estimasiWaktu: "1–2 minggu (bisa sambil riset rumah)",
    biayaTerkait: ["Tidak ada", "Opsional: konsultasi perencana keuangan"],
    tips: [
      "Lunasi atau kurangi utang konsumtif (KTA, kartu kredit) agar rasio utang terhadap pendapatan mengecil.",
      "Pakai simulasi kalkulator di situs ini untuk tahu angsuran di berbagai tenor sebelum bernegosiasi.",
      "Siapkan buffer minimal 10% di atas target biaya awal — selalu ada biaya yang muncul di luar rencana.",
    ],
    kesalahanUmum: [
      "Menyamakan limit cicilan bank dengan kemampuan finansial nyata — bank menilai berdasarkan data, kamu yang menjalani angsuran bulanannya.",
      "Lupa menghitung biaya awal di luar DP sehingga dana jebol di tengah proses.",
      "Tidak mengecek status subsidi terlebih dahulu, kemudian kecewa karena tidak lolos MBR.",
    ],
    perbedaanSubsidi:
      "Untuk subsidi, cek kelayakannya lebih ketat dan ada verifikasi MBR oleh sistem Kementerian PUPR. Untuk komersial, kelayakan hanya dinilai bank (suku bunga & plafon lebih longgar).",
  },
  {
    nomor: 2,
    slug: "tahap-2-riset-kebutuhan-dan-lokasi",
    judul: "Tentukan Kebutuhan, Lokasi, dan Tipe Rumah",
    judulSingkat: "Riset rumah & lokasi",
    ringkasan:
      "Definisikan kebutuhan (jumlah kamar, akses, lingkungan) dan bandingkan beberapa pilihan sebelum diikat dengan booking fee.",
    fakta: { nilai: "3–5 unit", label: "Survei sebelum membayar booking fee" },
    penjelasan: [
      "Buat daftar prioritas: radius kerja, akses transportasi, sekolah, rumah sakit, pasar, dan arah pengembangan kota. Lokasi memengaruhi harga, kenaikan nilai, dan kualitas hidup jangka panjang.",
      "Tentukan spesifikasi rumah: tipe 36, 45, atau lebih, jumlah kamar, tanah kavling, dan rencana renovasi. Sesuaikan dengan budget yang dihitung di tahap 1.",
      "Kunjungi minimal 3–5 pilihan: situs properti, pameran, dan tour langsung ke lokasi. Cek legalitas proyek: SHM/IMB, perizinan PSU (prasarana, sarana, utilitas), dan reputasi pengembang.",
      "Bandingkan juga bedanya beli dari pengembang (harga bundling, PPJB) vs rumah sekunder / second (negosiasi lebih leluasa tapi cek legalitas lebih teliti).",
    ],
    dokumen: ["Tidak ada dokumen khusus — bawa catatan kebutuhan & budget"],
    estimasiWaktu: "2–6 minggu (bervariasi tergantung pencarian)",
    biayaTerkait: ["Transportasi survei", "Opsional: jasa konsultan properti"],
    tips: [
      "Cek peta rawan banjir dan akses jalan di musim hujan — kelihatan murah sekarang bisa mahal kemudian.",
      "Pastikan pengembang terdaftar dan proyeknya tercatat di sistem resmi (mis. data Kementerian PUPR untuk rumah subsidi).",
      "Tanyakan progress PSU dan jadwal serah terima sebelum menandatangani PPJB.",
    ],
    kesalahanUmum: [
      "Kepincut harga murah tanpa cek legalitas tanah dan izin proyek.",
      "Membeli di lokasi jauh hanya karena harga murah, lalu biaya transportasi bulanan mengikis tabungan.",
      "Terburu-buru membayar booking fee sebelum membandingkan beberapa opsi.",
    ],
    perbedaanSubsidi:
      "Rumah subsidi sudah ditentukan kisarannya per zona oleh pemerintah; komersial bebas harga pasar. Survei lokasi justru lebih penting untuk subsidi karena pilihan terbatas pada perumahan MBR yang terdaftar.",
  },
  {
    nomor: 3,
    slug: "tahap-3-pilih-skema-kredit",
    judul: "Pilih Skema Kredit: Subsidi vs Komersial",
    judulSingkat: "Pilih skema kredit",
    ringkasan:
      "Kenali perbedaan KPR subsidi FLPP dan KPR komersial agar memilih skema yang tepat dan biaya jangka panjang terkendali.",
    fakta: { nilai: "5%", label: "Flat hingga lunas · skema FLPP" },
    penjelasan: [
      "KPR subsidi (FLPP) menawarkan suku bunga rendah 5% flat untuk tenor hingga 20 tahun dengan DP ringan, tetapi hanya untuk MBR, rumah pertama, dan harga unit dalam batas per zona.",
      "KPR komersial (konvensional & syariah) bebas untuk semua orang, plafon lebih besar, namun bunga mengikuti pasar — bisa naik saat suku bunga acuan naik.",
      "Bandingkan suku bunga: bank sering menawarkan 'fixed' rendah di 1–3 tahun pertama lalu floating. Hitung total pembayaran, bukan hanya angka promo di tahun pertama.",
      "Gunakan perbandingan bank di situs ini dan jalankan simulasi untuk kedua skema sebelum memutuskan.",
    ],
    dokumen: ["Tidak ada dokumen baru — hanya analisis perbandingan"],
    estimasiWaktu: "1–2 minggu riset dan perbandingan",
    biayaTerkait: ["Tidak ada"],
    tips: [
      "Untuk subsidi, pastikan unit yang dipilih ada dalam daftar proyek penerima FLPP.",
      "Untuk komersial, tanyakan ketentuan prepayment (pelunasan sebagian) dan penaltinya.",
      "Jangan hanya membandingkan bunga; bandingkan juga biaya provisi, administrasi, dan asuransi antar bank.",
    ],
    kesalahanUmum: [
      "Terkunci pada 'fixed 5% pertama' promo tanpa menghitung suku bunga floating setelahnya.",
      "Memilih skema hanya dari besaran angsuran bulanan tanpa menghitung total bayar hingga lunas.",
      "Mengabaikan biaya-biaya kecil yang diakumulasi bank secara bulanan (asuransi, admin).",
    ],
    perbedaanSubsidi:
      "Ini tahap tempat dua skema dipertemukan: subsidi menang di bunga & DP, komersial menang di fleksibilitas & jumlah unit.",
  },
  {
    nomor: 4,
    slug: "tahap-4-preapproval-dan-booking-unit",
    judul: "Ajukan Pre-Approval & Booking Unit (DP/Booking Fee)",
    judulSingkat: "Pre-approval & booking",
    ringkasan:
      "Kunci unit dengan booking fee dan lakukan pra-persetujuan kredit agar proses pengajuan selanjutnya lebih mulus.",
    fakta: { nilai: "±Rp250rb–1jt", label: "Kisaran booking fee unit" },
    penjelasan: [
      "Pra-persetujuan kredit (pre-approval) adalah penilaian awal bank atas kemampuan kreditmu. Ini memberi 'harga diri' saat bernegosiasi dan mempercepat proses ketika unit sudah ditemukan.",
      "Saat unit ditemukan, kamu membayar booking fee (fee wajib, umumnya mulai ratusan ribu hingga jutaan) untuk mengunci unit. Booking fee biasanya dapat menjadi bagian dari DP jika deal selesai.",
      "Perhatikan ketentuan refund booking fee pada SP2 (surat pemesanan) — sekecil apa pun, pastikan tertulis hitam di atas putih.",
      "Untuk rumah subsidi, pengembang akan menginput data ke sistem FLPP; status pemesanan dan verifikasi awal bisa dicek melalui sistem milik pemerintah.",
    ],
    dokumen: ["KTP", "KK", "Slip gaji", "Rekening koran 3 bulan", "NPWP", "Buku nikah (jika menikah)"],
    estimasiWaktu: "1–2 hari untuk booking; pre-approval 3–7 hari kerja",
    biayaTerkait: ["Booking fee", "Opsional: biaya pengurusan dokumen"],
    tips: [
      "Baca SP2 dengan teliti: jumlah, status refundable, tenggat pembayaran DP dan akad.",
      "Siapkan dokumen dalam bentuk scan PDF berkualitas agar proses bank cepat.",
      "Kalau bisa, ajukan pre-approval ke 2 bank sekaligus sebagai pembanding.",
    ],
    kesalahanUmum: [
      "Membayar booking fee ke pengembang tanpa cek legalitas proyek dan rekening resmi.",
      "Tidak membaca klausul refund — kerugian besar saat batal deal.",
      "Booking unit yang masih berstatus SP2 tanpa verifikasi — pastikan proyeknya lancar dan pengembang terdaftar.",
    ],
    perbedaanSubsidi:
      "Booking unit subsidi umumnya disertai verifikasi MBR oleh sistem PUPR sebelum unit benar-benar terkunci; komersial tidak ada tahap verifikasi MBR.",
  },
  {
    nomor: 5,
    slug: "tahap-5-pengajuan-kpr-ke-bank",
    judul: "Ajukan KPR ke Bank Penyalur",
    judulSingkat: "Pengajuan KPR",
    ringkasan:
      "Serahkan dokumen pengajuan lengkap ke bank pilihan dan pastikan data konsisten untuk hindari penolakan karena administrasi.",
    fakta: { nilai: "1–3 hari", label: "Kelengkapan berkas pengajuan" },
    penjelasan: [
      "Isi formulir aplikasi KPR dengan lengkap dan konsisten: identitas, penghasilan, pekerjaan, dan tanggungan. Ketidaksesuaian data adalah penyebab umum penolakan atau koreksi berkali-kali.",
      "Lampirkan seluruh dokumen sesuai kebutuhan bank: KTP & KK calon debitur dan pasangan, slip gaji/bukti penghasilan, rekening koran, NPWP, dokumen jaminan (SHM/PPJB/IMB), dan rencana anggaran bila wiraswasta.",
      "Pilih jenis kredit yang sesuai: KPR konvensional fixed/floating, KPR syariah (murabahah), atau KPR bersubsidi (FLPP). Ketiganya punya alur dan persyaratan berbeda.",
      "Jangan ragu bertanya ke petugas: berapa lama estimasi, apa saja biaya yang dibebankan, dan syarat apa lagi yang perlu dipersiapkan.",
    ],
    dokumen: [
      "Formulir aplikasi",
      "Fotokopi KTP & KK",
      "Slip gaji/keterangan penghasilan",
      "Rekening koran/tabungan 3 bulan",
      "NPWP",
      "Dokumen objek: SHM, IMB, PPJB (sesuai status)",
    ],
    estimasiWaktu: "1–3 hari untuk kelengkapan berkas",
    biayaTerkait: ["Biaya administrasi bank", "Provisi (sekitar 1% plafon)"],
    tips: [
      "Pastikan seluruh dokumen difotokopi/discan dalam satu paket rapi; bank menghargai kelengkapan.",
      "Usahakan melakukan pengajuan tidak bersamaan dengan permohonan kredit besar lain (rasio utang berpengaruh).",
      "Bila wiraswasta, siapkan SIUP/NIB, laporan keuangan, dan bukti usaha 6–12 bulan.",
    ],
    kesalahanUmum: [
      "Data penghasilan disembunyikan supaya plafon naik — bisa berujung analisis ditolak di tahap verifikasi.",
      "Menyerahkan berkas setengah jadi lalu menunda-nunda — proses molor dan unit bisa lepas.",
      "Tidak menyimpan salinan aplikasi dan bukti terima berkas.",
    ],
    perbedaanSubsidi:
      "Bank penyalur subsidi memvalidasi penghasilan terhadap batas MBR; komersial lebih fleksibel tapi analisis kredit lebih ketat proporsional plafon.",
  },
  {
    nomor: 6,
    slug: "tahap-6-analisis-kredit-dan-appraisal",
    judul: "Proses Analisis Kredit & Penilaian Properti (Appraisal)",
    judulSingkat: "Analisis kredit & appraisal",
    ringkasan:
      "Bank menilai kelayakan debitur dan properti. Cek berita dan tanggapi permintaan data tambahan dengan cepat.",
    fakta: { nilai: "1–3 minggu", label: "Analisis kredit + appraisal" },
    penjelasan: [
      "Bank melakukan analisis kredit: mengecek BI Checking (SLIK), rasio pendapatan terhadap angsuran, stabilitas pekerjaan, dan riwayat pembayaran. Hasilnya menentukan persetujuan atau penolakan.",
      "Secara paralel, bank melakukan appraisal properti — penilaian fisik dan lokasi oleh surveyor untuk memastikan unit bernilai wajar sesuai harga pengajuan (LTV).",
      "Segala temuan (harga over, sertifikat belum balik nama, biji hitam) umumnya bisa ditindaklanjuti dengan dokumen tambahan; jangan panik, tanyakan solusinya ke bank.",
      "Setelah acc, bank menerbitkan surat persetujuan kredit (SP3K) berisi plafon, bunga, tenor, dan syarat. Baca sampai selesai sebelum lanjut ke akad.",
    ],
    dokumen: ["Surat persetujuan kredit (SP3K)", "Dokumen tambahan sesuai permintaan bank"],
    estimasiWaktu: "1–3 minggu (analisis + appraisal)",
    biayaTerkait: ["Biaya appraisal (dibebankan bank/borrower tergantung kebijakan)"],
    tips: [
      "Responsif terhadap pertanyaan bank; ketepatan tanggapan mempercepat proses.",
      "Tenang jika hasil BI Checking ada catatan kecil — diskusikan dengan pihak bank.",
      "Minta salinan hasil appraisal dari bank bila memungkinkan untuk referensi.",
    ],
    kesalahanUmum: [
      "Mengajukan ke banyak bank sekaligus tanpa strategi — bisa bikin riwayat pengajuan banyak di SLIK.",
      "Menyetujui bunga/floating tanpa memahami level yang ditawarkan di SP3K.",
      "Menganggap 'acc kredit' berarti proses selesai; akad dan balik nama masih menunggu.",
    ],
    perbedaanSubsidi:
      "Subsidi: appraisal sekaligus cek harga terhadap plafon zona. Komersial: appraisal bebas mengacu pasar; nilai pembiayaan dihitung dari LTV terhadap hasil appraisal.",
  },
  {
    nomor: 7,
    slug: "tahap-7-akad-kredit-dan-serah-terima",
    judul: "Akad Kredit, Penandatanganan & Serah Terima Kunci",
    judulSingkat: "Akad & serah terima",
    ringkasan:
      "Tahap finalisasi: akad kredit di notaris, balik nama sertifikat, dan terima unit lengkap dengan kunci dan dokumen.",
    fakta: { nilai: "1–4 minggu", label: "Proses akad sampai kunci" },
    penjelasan: [
      "Di hadapan notaris/PPAT, kamu menandatangani akad kredit (syariah: akad murabahah) serta PPJB/AJB dengan pengembang. Di sinilah hak dan kewajiban dikunci secara hukum.",
      "Bank membayarkan plafon kredit ke pengembang/penjual. Kamu mulai memegang cicilan sejak akad, dan pengembang menyerahkan unit beserta kunci serta dokumen (sertifikat, IMB, SHGB/SHM, bukti PBB).",
      "Urutan legalitas: untuk rumah baru umumnya PPJB dulu (di akad), lalu AJB + balik nama sertifikat setelah selesai bayar/akad — ikuti arahan notaris agar banding tidak berlarut.",
      "Periksa semua dokumen serah terima: sertifikat, denah sesuai, kunci, dan kelengkapan rumah. Buat berita acara serah terima (BAST) sebagai bukti.",
    ],
    dokumen: ["KTP", "KK", "Buku nikah", "SP3K", "PPJB/SP2", "Identitas saksi", "Dana untuk biaya akad & pajak"],
    estimasiWaktu: "1–4 minggu (tergantung kesiapan pengembang & notaris)",
    biayaTerkait: [
      "Biaya notaris/PPAT",
      "BPHTB (5% × (harga − NPOPTKP))",
      "Biaya balik nama & sertifikat",
      "Biaya akad & asuransi",
    ],
    tips: [
      "Hadir dengan seluruh identitas asli dan bawa uang lebih karena biaya akad bisa bervariasi.",
      "Minta penjelasan notaris atas setiap pasal yang kamu tandatangani — jangan malu bertanya.",
      "Catat semua nomor dokumen dan jadwal serah terima kunci.",
    ],
    kesalahanUmum: [
      "Tidak membaca akad sampai selesai lalu menyesal atas klausul biaya/adendum.",
      "Lupa mengecek BAST & kelengkapan rumah sebelum terima kunci.",
      "Menunda pengurusan balik nama — sertifikat atas nama pengembang bisa menyusahkan kemudian.",
    ],
    perbedaanSubsidi:
      "Subsidi: ada kewajiban jual kepada MBR & pengecekan data debitur FLPP. Komersial: tanpa verifikasi MBR, proses akad murni kesepakatan bank-pengembang-debitur.",
  },
  {
    nomor: 8,
    slug: "tahap-8-setelah-akad-cicilan-dan-strategi",
    judul: "Setelah Akad: Kelola Cicilan & Rencana Pemeliharaan",
    judulSingkat: "Kelola cicilan & rumah",
    ringkasan:
      "Bayar cicilan tepat waktu, sisihkan dana pemeliharaan, dan rancang strategi pelunasan atau take-over bila perlu.",
    fakta: { nilai: "1–3%", label: "Dana perawatan rumah tiap tahun" },
    penjelasan: [
      "Mulai periode cicilan bulanan. Utamakan membayar sesuai jatuh tempo untuk menjaga riwayat SLIK tetap bersih.",
      "Sisihkan dana perawatan tahunan (±1–3% nilai rumah) untuk renovasi kecil, perbaikan atap, plafon, dan PSU yang rusak.",
      "Evaluasi opsi keuangan jangka panjang: pelunasan dipercepat sebagian/seluruh (bila tanpa penalti), take over ke bank dengan bunga lebih rendah, atau refinancing saat nilai rumah naik.",
      "Jaga asuransi rumah tetap aktif, dan pertimbangkan asuransi jiwa kredit sehingga keluarga tidak terbebani bila terjadi risiko.",
    ],
    dokumen: ["Buku tabungan/autodebet cicilan", "Polis asuransi", "Bukti pembayaran PBB/retribusi"],
    estimasiWaktu: "Jangka panjang (selama tenor), evaluasi 1–2 tahun sekali",
    biayaTerkait: [
      "Biaya PBB tahunan",
      "Iuran lingkungan/RTRW",
      "Asuransi rumah",
      "Biaya perawatan tak terduga",
    ],
    tips: [
      "Buat reminder jatuh tempo dan sisihkan pos angsuran di hari gajian.",
      "Kalau mendapat bonus/CATU, lunasi sebagian untuk memangkas bunga selama tanpa penalti.",
      "Urus balik nama SHGB→SHM bila memenuhi syarat; jual-beli di kemudian hari jauh lebih mudah.",
    ],
    kesalahanUmum: [
      "Tebal di bulan pertama lalu telat bayar — denda & catatan negatif SLIK.",
      "Menganggap rumah tidak butuh perawatan sampai ada kerusakan besar.",
      "Tidak membandingkan bunga bank lain selama bertahun-tahun; take-over bisa menghemat puluhan hingga ratusan juta rupiah total bunga.",
    ],
    perbedaanSubsidi:
      "Subsidi: ada aturan ketat soal jual sebelum masa tertentu. Komersial: bebas dijual/disewakan (tetap periksa klausul bank).",
  },
];