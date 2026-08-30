"use client";

import type { ReactNode } from "react";
import { waUrl } from "@/lib/brand";
import { track } from "@/lib/analytics";

/**
 * Tautan WhatsApp teks (untuk area server seprti footer) yang menyala event
 * `wa_clicked` saat diklik.
 */
export function WhatsAppLink({
  pesan,
  source,
  children,
  className,
}: {
  pesan: string;
  source: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={waUrl(pesan)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("wa_clicked", { source })}
      className={className}
    >
      {children}
    </a>
  );
}
