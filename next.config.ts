import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const redirects: NextConfig["redirects"] = async () => [
  // Slug tahap lama → rute baru Perjalanan (PRD §102).
  {
    source: "/panduan/tahap-1-cek-keuangan-dan-kelayakan",
    destination: "/perjalanan/01-keuangan",
    permanent: true,
  },
  {
    source: "/panduan/tahap-2-riset-kebutuhan-dan-lokasi",
    destination: "/perjalanan/02-kemampuan-target",
    permanent: true,
  },
  {
    source: "/panduan/tahap-3-pilih-skema-kredit",
    destination: "/perjalanan/03-skema",
    permanent: true,
  },
  {
    source: "/panduan/tahap-4-preapproval-dan-booking-unit",
    destination: "/perjalanan/04-cari-verifikasi",
    permanent: true,
  },
  {
    source: "/panduan/tahap-5-pengajuan-kpr-ke-bank",
    destination: "/perjalanan/05-dana-dokumen",
    permanent: true,
  },
  {
    source: "/panduan/tahap-6-analisis-kredit-dan-appraisal",
    destination: "/perjalanan/06-analisis-appraisal",
    permanent: true,
  },
  {
    source: "/panduan/tahap-7-akad-kredit-dan-serah-terima",
    destination: "/perjalanan/07-akad",
    permanent: true,
  },
  {
    source: "/panduan/tahap-8-setelah-akad-cicilan-dan-strategi",
    destination: "/perjalanan/08-kunci",
    permanent: true,
  },
  // Alat lama → rute kanonis baru (PRD §102). /checklist DIKECUALIKAN:
  // dipertahankan sebagai checklist print/export pendamping Tahap 5.
  {
    source: "/profil-kamu",
    destination: "/perjalanan/03-skema",
    permanent: true,
  },
  {
    source: "/mampu-beli",
    destination: "/kalkulator?mode=income",
    permanent: true,
  },
  {
    source: "/planner-dp",
    destination: "/alat/planner-dp",
    permanent: true,
  },
  {
    source: "/sewa-vs-beli",
    destination: "/alat/sewa-vs-beli",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  redirects,
};

export default nextConfig;