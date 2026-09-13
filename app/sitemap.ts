import type { MetadataRoute } from "next";
import { SITE_ORIGIN, RIVISI } from "@/lib/site";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";

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
  const dinamis = [...tahapKpr, ...panduanArtikel].map((x) => ({
    url: `${SITE_ORIGIN}/panduan/${x.slug}`,
    lastModified: RIVISI,
  }));
  return [...statis, ...dinamis];
}
