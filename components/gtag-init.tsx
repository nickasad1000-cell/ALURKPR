"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { GA_ID, ensureGtag } from "@/lib/analytics";

/**
 * Memuat gtag GA4 sejak halaman terbuka (bukan hanya saat interaksi) supaya
 * page_view tercatat untuk pengunjung yang tidak mengklik apa pun, dan
 * mencatat navigasi antar-halaman (App Router) lewat event page_view.
 */
export function GtagInit() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();
    const sebelum = prev.current;
    prev.current = pathname;
    if (sebelum === null || sebelum === pathname) return;
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.href });
  }, [pathname]);

  return null;
}