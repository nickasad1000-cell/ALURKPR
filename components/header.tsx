"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { btnFocus } from "./ui";

const nav = [
  { href: "/profil-kamu", label: "Profil Kamu" },
  { href: "/panduan", label: "Panduan" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/syarat", label: "Kelayakan & Bank" },
  { href: "/glosarium", label: "Glosarium" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color] ${btnFocus} ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary-deep"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${btnFocus} ${
                  isActive(item.href)
                    ? "bg-primary-soft text-primary-deep"
                    : "text-ink-soft hover:bg-surface"
                }`}
              >
                {item.label}
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
