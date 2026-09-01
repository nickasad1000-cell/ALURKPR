"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { btnFocus } from "./ui";

const nav = [
  { href: "/profil-kamu", label: "Profil Kamu" },
  { href: "/panduan", label: "Panduan" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/syarat", label: "Syarat & Bank" },
  { href: "/glosarium", label: "Glosarium" },
  { href: "/faq", label: "FAQ" },
];

const toolNav = [
  { href: "/mampu-beli", label: "Cek kemampuan beli" },
  { href: "/planner-dp", label: "Perencana DP" },
  { href: "/sewa-vs-beli", label: "Sewa vs beli" },
  { href: "/checklist", label: "Checklist dokumen" },
  { href: "/hubungi", label: "Hubungi kami" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [alatOpen, setAlatOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open && !alatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAlatOpen(false);
        if (open) toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, alatOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color] ${btnFocus} ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary-deep"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAlatOpen((v) => !v)}
              aria-expanded={alatOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color] ${btnFocus} ${
                alatOpen ? "bg-surface text-ink" : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              Alat
              <ChevronDown
                className={`size-4 transition-transform ${alatOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {alatOpen ? (
              <div
                role="menu"
                aria-label="Alat perhitungan"
                className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-line bg-surface p-1.5 shadow-xl shadow-stone-900/5"
              >
                {toolNav.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    role="menuitem"
                    onClick={() => setAlatOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-primary-soft hover:text-primary-deep"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href="/syarat"
            className={`ml-2 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-bold text-white shadow-sm transition-[background-color,transform] hover:bg-primary-deep active:scale-[0.98] ${btnFocus}`}
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
              Alat
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
