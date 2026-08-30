"use client";

/**
 * Analytics ringan untuk GA4. Memuat skrip gtag sekali lalu mencatat event
 * konversi kustom (sesuai rencana alur #2). Tanpa dependensi eksternal.
 *
 * Dibalik layar: menginjeksi skrip gtag bila NEXT_PUBLIC_GA_MEASUREMENT_ID
 * terpasang; bila tidak, semua panggilan menjadi no-op (aman di dev).
 */

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA4_ID;

export { GA_ID };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function ensureGtag(): boolean {
  if (typeof window === "undefined") return false;
  if (!GA_ID) return false;
  if (window.gtag) return true;

  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  if (!w.gtag) {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer!.push(args);
    };
  }

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  const inline = document.createElement("script");
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
  return true;
}

export type AnalyticsEvent =
  | "calc_result_viewed"
  | "eligibility_passed"
  | "eligibility_failed"
  | "profil_completed"
  | "form_submitted"
  | "wa_clicked"
  | "next_step_clicked"
  | "checklist_saved";

/** Catat event konversi. No-op bila GA belum dikonfigurasi. */
export function track(event: AnalyticsEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!ensureGtag()) return;
  window.gtag?.("event", event, params);
}

/** Parameter umum lintas event (sumber halaman). */
export function trackWithPage(event: AnalyticsEvent, extra?: Record<string, unknown>) {
  track(event, {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...extra,
  });
}
