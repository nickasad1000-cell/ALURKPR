import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";

// Tanggal revisi konten terakhir (konstan, bukan timestamp build agar sitemap stabil).
const RIVISI = "2026-08-30";

export default function sitemap(): MetadataRoute.Sitemap {
  const statis = [
    "",
    "/panduan",
    "/kalkulator",
    "/mampu-beli",
    "/planner-dp",
    "/sewa-vs-beli",
    "/profil-kamu",
    "/syarat",
    "/faq",
    "/glosarium",
    "/tentang",
    "/hubungi",
  ].map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: RIVISI,
  }));
  const dinamis = [...tahapKpr, ...panduanArtikel].map((x) => ({
    url: `${SITE_ORIGIN}/panduan/${x.slug}`,
    lastModified: RIVISI,
  }));
  return [...statis, ...dinamis];
}
