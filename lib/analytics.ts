"use client";

/**
 * Analytics ringan untuk GA4. Memuat skrip gtag sekali lalu mencatat event
 * konversi kustom (sesuai rencana alur #2). Tanpa dependensi eksternal.
 *
 * Dibalik layar: menginjeksi skrip gtag bila NEXT_PUBLIC_GA_MEASUREMENT_ID
 * terpasang; bila tidak, semua panggilan menjadi no-op (aman di dev).
 *
 * Skrip gtag dipasang setelah idle (requestIdleCallback) supaya beban eksternal
 * tidak menghambat render awal (menekan long task & TBT). Event yang masuk
 * sebelum skrip tiba diantrekan ke dataLayer dan di-replay otomatis oleh
 * gtag.js saat selesai dimuat — pola GA4 standar.
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

let inisiasi: "belum" | "menunggu" | "terpasang" = "belum";
let jadwalDibuat = false;

function pasangSkrip() {
  if (inisiasi === "terpasang") return;
  inisiasi = "terpasang";

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
}

function jadwalkanPemasangan() {
  if (jadwalDibuat) return;
  jadwalDibuat = true;

  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(pasangSkrip, { timeout: 3000 });
  } else {
    window.setTimeout(pasangSkrip, 2500);
  }
}

export function ensureGtag(): boolean {
  if (typeof window === "undefined") return false;
  if (!GA_ID) return false;
  if (inisiasi === "terpasang") return true;

  // Stub gtag segera: event yang dikirim sebelum skrip tiba tetap masuk
  // dataLayer dan akan di-replay begitu gtag.js selesai dimuat.
  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  if (!w.gtag) {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer!.push(args);
    };
  }

  jadwalkanPemasangan();
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
