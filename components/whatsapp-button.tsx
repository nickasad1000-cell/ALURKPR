"use client";

import { MessageCircle } from "lucide-react";
import { waUrl } from "@/lib/brand";
import { track } from "@/lib/analytics";
import { btnWhatsApp } from "./ui";

/**
 * Tombol WhatsApp konsisten. Menyala event `wa_clicked` (analytics) saat
 * diklik, dengan `source` untuk melacak dari halaman mana.
 */
export function WhatsAppButton({
  pesan,
  source,
  label = "Tanya via WhatsApp",
  className = "",
}: {
  pesan: string;
  source: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={waUrl(pesan)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("wa_clicked", { source })}
      className={`${btnWhatsApp} ${className}`}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
