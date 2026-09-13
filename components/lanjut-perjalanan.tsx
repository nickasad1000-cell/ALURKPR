"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { tahapKpr } from "@/content/tahap";

const STORAGE_KEY = "alurkpr-perjalanan-v1";

type Simpan = Record<string, { status?: "belum" | "disiapkan" | "siap"; selesai: string[] }>;

const pendengar = new Set<() => void>();

function bacaSnap(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

function bacaSnapServer(): string {
  return "{}";
}

function langgan(cb: () => void): () => void {
  pendengar.add(cb);
  window.addEventListener("storage", cb);
  window.addEventListener("focus", cb);
  return () => {
    pendengar.delete(cb);
    window.removeEventListener("storage", cb);
    window.removeEventListener("focus", cb);
  };
}

/** Tahap yang paling jauh dicapai user (status "siap" / selesai terbanyak). */
function progresTertinggi(simpan: Simpan) {
  let terbaik: { nomor: number; selesai: number } | null = null;
  for (const t of tahapKpr) {
    const s = simpan[t.slug];
    if (!s) continue;
    const selesai = s.selesai?.length ?? 0;
    const siap = s.status === "siap";
    const nilai = siap ? 1000 + selesai : selesai;
    if (nilai > 0 && (terbaik === null || t.nomor > terbaik.nomor)) {
      terbaik = { nomor: t.nomor, selesai };
    }
  }
  return terbaik;
}

export function LanjutPerjalanan() {
  const raw = useSyncExternalStore(langgan, bacaSnap, bacaSnapServer);
  const simpan = useMemo(() => {
    try {
      return (JSON.parse(raw) as Simpan) ?? {};
    } catch {
      return {};
    }
  }, [raw]);

  const terakhir = progresTertinggi(simpan);
  const berikut = terakhir
    ? tahapKpr.find((t) => t.nomor === terakhir.nomor + 1)
    : null;

  return (
    <div className="mt-9 rounded-3xl border border-line bg-surface/80 p-6">
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-bold text-ink">Kamu sudah sampai mana?</h2>
      </div>
      {terakhir ? (
        <>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {berikut
              ? `Selesai sampai Tahap ${terakhir.nomor} (${terakhir.selesai} hasil). Lanjut dari posisimu — bukan ulang dari awal.`
              : `Selesai sampai Tahap ${terakhir.nomor} (${terakhir.selesai} hasil). Perjalananmu hampir tuntas!`}
          </p>
          <ul className="mt-4">
            <li>
              <Link
                href={
                  berikut
                    ? `/perjalanan/${berikut.slug}`
                    : `/perjalanan#setelah-kunci`
                }
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-deep"
              >
                {berikut
                  ? `Lanjut: ${berikut.judulSingkat}`
                  : "Lihat apa yang dilakukan setelah kunci"}
                <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Belum ada progres tersimpan. Mulai dari tahap pertama — 5 menit
            biasanya cukup.
          </p>
          <ul className="mt-4">
            <li>
              <Link
                href="/perjalanan/01-keuangan"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-deep"
              >
                Mulai dari Tahap 1
                <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}