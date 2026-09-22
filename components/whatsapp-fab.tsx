"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { waUrl, WA_PESAN_UMUM } from "@/lib/brand";
import { track } from "@/lib/analytics";
import { btnFocus } from "./ui";

/**
 * Tombol WhatsApp melayang (kanan bawah). Muncul setelah 600 ms supaya tidak
 * mengganggu CTA utama saat halaman baru terbuka; tersembunyi saat cetak.
 */
export function WhatsAppFab() {
  const [tampil, setTampil] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setTampil(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <a
      href={waUrl(WA_PESAN_UMUM)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("wa_clicked", { source: "fab" })}
      aria-label="Tanya via WhatsApp — buka di aplikasi baru"
      className={`fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-wa text-white shadow-xl shadow-wa/25 transition-[opacity,transform,background-color] duration-300 hover:bg-wa-deep active:scale-95 print:hidden ${btnFocus} ${
        tampil ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}