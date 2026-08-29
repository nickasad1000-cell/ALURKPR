import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { tahapKpr } from "@/content/tahap";
import { panduanArtikel } from "@/content/panduan";

export default function sitemap(): MetadataRoute.Sitemap {
  const statis = [
    "",
    "/panduan",
    "/kalkulator",
    "/syarat",
    "/faq",
    "/glosarium",
    "/tentang",
    "/hubungi",
  ];
  const dinamis = [...tahapKpr, ...panduanArtikel].map((x) => ({
    url: `${SITE_ORIGIN}/panduan/${x.slug}`,
    lastModified: new Date(),
  }));
  return [
    ...statis.map((path) => ({ url: `${SITE_ORIGIN}${path}`, lastModified: new Date() })),
    ...dinamis,
  ];
}