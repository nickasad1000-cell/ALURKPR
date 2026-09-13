import type { MetadataRoute } from "next";
import { SITE_ORIGIN, RIVISI } from "@/lib/site";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";

export default function sitemap(): MetadataRoute.Sitemap {
  const statis = [
    "",
    "/perjalanan",
    "/panduan",
    "/kalkulator",
    "/alat",
    "/alat/planner-dp",
    "/alat/sewa-vs-beli",
    "/syarat",
    "/checklist",
    "/faq",
    "/glosarium",
    "/tentang",
    "/hubungi",
    "/privasi",
  ].map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: RIVISI,
  }));
  const tahap = tahapKpr.map((t) => ({
    url: `${SITE_ORIGIN}/perjalanan/${t.slug}`,
    lastModified: RIVISI,
  }));
  const artikel = panduanArtikel.map((a) => ({
    url: `${SITE_ORIGIN}/panduan/${a.slug}`,
    lastModified: RIVISI,
  }));
  return [...statis, ...tahap, ...artikel];
}