"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { btnFocus } from "./ui";

const nav = [
  { href: "/profil-kamu", label: "Rekomendasi Skema" },
  { href: "/panduan", label: "Panduan" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/syarat", label: "Syarat & Bank" },
];

// Referensi hukum & istilah — dilipat agar nav utama tidak terlalu penuh.
const referensiNav = [
  { href: "/glosarium", label: "Glosarium" },
  { href: "/faq", label: "FAQ" },
];

// Kumpulan alat pendamping (bukan halaman utama). Kontak sengaja tidak
// ditaruh di sini — "Hubungi kami" hidup di footer & menu mobile tersendiri.
const toolNav = [
  { href: "/mampu-beli", label: "Kemampuan beli" },
  { href: "/planner-dp", label: "Rencana tabung DP" },
  { href: "/sewa-vs-beli", label: "Sewa vs beli" },
  { href: "/checklist", label: "Checklist dokumen" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [buka, setBuka] = useState<"alat" | "referensi" | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const tutupMenu = () => {
    setOpen(false);
    setBuka(null);
  };

  useEffect(() => {
    if (!buka) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBuka(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [buka]);

  useEffect(() => {
    if (!open && !buka) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setBuka(null);
        if (open) toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, buka]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <span onClick={tutupMenu}>
          <Logo />
        </span>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={tutupMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-[background-color,color] ${btnFocus} ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary-deep"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div ref={dropdownRef} className="relative flex items-center gap-0.5">
            {(
              [
                { id: "referensi", label: "Referensi", items: referensiNav, ariaLabel: "Referensi — FAQ dan glosarium" },
                { id: "alat", label: "Alat & Simulasi", items: toolNav, ariaLabel: "Alat dan simulasi KPR" },
              ] as const
            ).map((m) => (
              <div key={m.id} className="relative">
                <button
                  type="button"
                  onClick={() => setBuka((v) => (v === m.id ? null : m.id))}
                  aria-expanded={buka === m.id}
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-[background-color,color] ${btnFocus} ${
                    buka === m.id ? "bg-surface text-ink" : "text-ink-soft hover:bg-surface hover:text-ink"
                  }`}
                >
                  {m.label}
                  <ChevronDown
                    className={`size-4 transition-transform ${buka === m.id ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {buka === m.id ? (
                  <div
                    role="group"
                    aria-label={m.ariaLabel}
                    className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-line bg-surface p-1.5 shadow-xl shadow-ink/5"
                  >
                    {m.items.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setBuka(null)}
                        className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-primary-soft hover:text-primary-deep"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Link
            href="/syarat"
            onClick={tutupMenu}
            className={`ml-1.5 inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-bold text-white shadow-sm transition-[background-color,transform] hover:bg-primary-deep active:scale-[0.98] ${btnFocus}`}
          >
            Cek Kelayakan
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink transition lg:hidden ${btnFocus}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper lg:hidden"
          aria-label="Navigasi mobile"
        >
          <div className="grid gap-1 px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${btnFocus} ${
                  isActive(item.href)
                    ? "bg-primary-soft text-primary-deep"
                    : "text-ink-soft hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-4 pt-3 text-xs font-bold uppercase tracking-wider text-ink-soft">
              Referensi
            </p>
            {referensiNav.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(r.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${btnFocus} ${
                  isActive(r.href)
                    ? "bg-primary-soft text-primary-deep"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                {r.label}
              </Link>
            ))}
            <p className="mt-3 px-4 pt-3 text-xs font-bold uppercase tracking-wider text-ink-soft">
              Alat & Simulasi
            </p>
            {toolNav.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${btnFocus} text-ink-soft hover:bg-surface hover:text-ink`}
              >
                {t.label}
              </Link>
            ))}
            <Link
              href="/hubungi"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${btnFocus} text-ink-soft hover:bg-surface hover:text-ink`}
            >
              Hubungi kami
            </Link>
            <Link
              href="/syarat"
              onClick={() => setOpen(false)}
              className={`mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-white ${btnFocus}`}
            >
              Cek Kelayakan
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
