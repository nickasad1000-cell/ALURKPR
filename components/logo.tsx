import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="AlurKPR — Beranda"
    >
      <span className="block size-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10">
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="size-full object-cover"
          priority
        />
      </span>
      <span className="font-display text-lg font-semibold leading-none tracking-tight">
        Alur<span className="text-primary">KPR</span>
      </span>
    </Link>
  );
}
