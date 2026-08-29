"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/panduan", label: "Panduan" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/syarat", label: "Kelayakan & Bank" },
  { href: "/faq", label: "FAQ" },
  { href: "/glosarium", label: "Glosarium" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
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
            className="ml-2 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-deep"
          >
            Cek Kelayakan
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          className="border-t border-line bg-paper lg:hidden"
          aria-label="Navigasi mobile"
        >
          <div className="grid gap-1 px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
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
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-white"
            >
              Cek Kelayakan
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}