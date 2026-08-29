import type { FaqItem } from "../lib/types";

export const faq: FaqItem[] = [
  {
    pertanyaan: "Apa itu KPR?",
    jawaban:
      "KPR (Kredit Pemilikan Rumah) adalah pinjaman dari bank untuk membeli rumah yang dijamin oleh rumah itu sendiri. Kamu membayar DP, lalu mengangsur sisa harga (plafon) selama tenor tertentu, dan rumah menjadi milik penuh saat lunas.",
  },
  {
    pertanyaan: "Apa bedanya KPR subsidi dan KPR komersial?",
    jawaban:
      "KPR subsidi (FLPP) ditujukan untuk Masyarakat Berpenghasilan Rendah: bunga rendah (±5% flat), DP ringan, tetapi terbatas pada rumah pertama dengan harga sesuai plafon zona. KPR komersial bebas untuk siapa saja, harga dan lokasi bebas, tapi bunga mengikuti pasar dan DP umumnya lebih besar.",
  },
  {
    pertanyaan: "Siapa yang berhak mengajukan KPR subsidi FLPP?",
    jawaban:
      "Warga Negara Indonesia, usia minimal 21 tahun atau sudah menikah, belum pernah memiliki rumah, belum pernah menerima subsidi perumahan, dan penghasilan pokok di bawah batas MBR (untuk rumah tapak ± Rp8 juta/bulan sesuai ketentuan terakhir). Rincian bisa berubah — selalu cek pengumuman resmi Kementerian PUPR.",
  },
  {
    pertanyaan: "Berapa bunga KPR subsidi FLPP dan berapa tenornya?",
    jawaban:
      "Saat ini bunga FLPP sekitar 5% flat per tahun dengan tenor hingga 20 tahun. Bunga flat dihitung dari plafon awal, jadi angsuran relatif stabil. Nilai bisa disesuaikan pemerintah sewaktu-waktu.",
  },
  {
    pertanyaan: "Berapa DP minimum untuk KPR?",
    jawaban:
      "Untuk KPR subsidi bisa 0–1% bahkan program khusus tanpa DP. Untuk komersial umumnya 10–30% tergantung bank, tenor, dan penilaian risiko (LTV). Semakin besar DP, semakin kecil plafon dan angsuran.",
  },
  {
    pertanyaan: "Apa saja biaya di luar DP yang harus disiapkan?",
    jawaban:
      "Utamanya BPHTB (±5% × (harga − NPOPTKP 60jt)), biaya provisi (sekitar 1% plafon), administrasi bank, biaya notaris/PPAT untuk PPJB–AJB–balik nama, dan premi asuransi jiwa/kebakaran. Siapkan buffer 5–10% nilai rumah di luar DP.",
  },
  {
    pertanyaan: "Berapa lama proses pengajuan KPR?",
    jawaban:
      "Dengan berkas lengkap, berkisar 2–6 minggu untuk seluruh alur: pre-approval hingga akad. Analisis kredit dan appraisal biasanya menghabiskan 1–3 minggu. Lambatnya sering karena kelengkapan dokumen debitur atau kesiapan dokumen pengembang.",
  },
  {
    pertanyaan: "Apa itu BPHTB dan siapa yang membayarnya?",
    jawaban:
      "BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan) adalah pajak atas peralihan hak properti, umumnya dibayar pembeli sebesar 5% dari (nilai transaksi dikurangi NPOPTKP Rp60 juta). Masuk komponen biaya awal akad.",
  },
  {
    pertanyaan: "Apakah bisa take over KPR ke bank lain?",
    jawaban:
      "Bisa. Take over memindahkan sisa utang KPR ke bank lain yang menawarkan bunga lebih rendah. Hitung total penghematan versus biaya take over (administrasi, appraisal ulang). Ini cara umum menekan biaya bunga jangka panjang.",
  },
  {
    pertanyaan: "Kalau gagal bayar cicilan, apa konsekuensinya?",
    jawaban:
      "Keterlambatan dikenakan denda dan tercatat di SLIK (BI Checking) yang memengaruhi kredibilitasmu ke seluruh bank. Jika macet berlarut-larut, bank dapat melakukan restrukturisasi, atau tahap akhir maka rumah disita. Jaga arus kas dan segera negosiasi bila kesulitan.",
  },
  {
    pertanyaan: "Apakah wajib memakai notaris untuk akad KPR?",
    jawaban:
      "Ya. Akad kredit melibatkan notaris/PPAT untuk membuat PPJB/AJB dan akad yang syarat keabsahannya secara hukum, termasuk pembebanan hak tanggungan. Biaya notaris ditanggung pembeli dan bervariasi sesuai nilai transaksi.",
  },
  {
    pertanyaan: "Bolehkah membeli rumah surplus/ke-2 dengan KPR subsidi?",
    jawaban:
      "Tidak. KPR subsidi FLPP hanya untuk rumah pertama dan ada kewajiban menempati sendiri. Membeli rumah kedua/sewakan lewat subsidi melanggar aturan dan bisa memicu penalti/pengembalian subsidi.",
  },
  {
    pertanyaan: "Apa itu SKUMBUH/SiKUMBUH dan mengapa penting?",
    jawaban:
      "SiKUMBUH (Sistem Kumpulan Pengembang) adalah sistem verifikasi data KPR subsidi dari Kementerian PUPR. Pengembang dan bank memakai datanya untuk memvalidasi kelayakan debitur MBR — makanya pastikan data KTP dan status rumahmu benar dan konsisten sejak awal.",
  },
  {
    pertanyaan: "Kalkulator di situs ini bisa dipercaya?",
    jawaban:
      "Sebagai estimasi, ya — memakai metode anuitas standar perbankan dan biaya indikatif pasar. Angka pasti plafon, bunga, dan biaya tergantung keputusan bank dan kebijakan terkini, jadi jadikan simulasi sebagai acuan sebelum bertanya ke bank.",
  },
];