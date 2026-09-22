"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, X, ZoomIn } from "lucide-react";
import { Container, SectionHeading, btnSecondary } from "./ui";
import { WhatsAppButton } from "./whatsapp-button";
import { GALERI_RUMAH, WA_PESAN_UMUM } from "@/lib/brand";

type Foto = (typeof GALERI_RUMAH)[number];

/** Foto asli hunian yang dikembangkan — bisa diklik untuk diperbesar. */
export function GaleriRumah() {
  const [terbuka, setTerbuka] = useState<number | null>(null);

  useEffect(() => {
    if (terbuka === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerbuka(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [terbuka]);

  return (
    <section className="mt-20 sm:mt-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Lihat rumahnya"
            title="Wujud hunian yang kami kembangkan"
          />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            Lumajang, Jawa Timur
          </span>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALERI_RUMAH.map((g, i) => (
            <li key={g.src}>
              <button
                type="button"
                onClick={() => setTerbuka(i)}
                aria-haspopup="dialog"
                aria-label={`Perbesar foto: ${g.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-ink/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
                  <ZoomIn className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <WhatsAppButton
            pesan={WA_PESAN_UMUM}
            source="galeri_home"
            label="Tanya ketersediaan unit"
          />
          <Link href="/hubungi" className={btnSecondary}>
            Atau isi formulir kontak
          </Link>
        </div>
      </Container>

      {terbuka !== null && (
        <FotoLightbox
          foto={GALERI_RUMAH[terbuka]}
          onTutup={() => setTerbuka(null)}
        />
      )}
    </section>
  );
}

function FotoLightbox({
  foto,
  onTutup,
}: {
  foto: Foto;
  onTutup: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Perbesar: ${foto.alt}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4"
      onClick={onTutup}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onTutup}
          aria-label="Tutup perbesar"
          className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
          <Image
            src={foto.srcLg ?? foto.src}
            alt={foto.alt}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-contain"
          />
        </div>
        <p className="mt-5 text-center text-sm text-white/90">{foto.alt}</p>
      </div>
    </div>
  );
}