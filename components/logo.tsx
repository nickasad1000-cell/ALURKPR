import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="AlurKPR — Beranda"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9h4.5v-4.5h5V19H19v-9" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold leading-none tracking-tight">
        Alur<span className="text-primary">KPR</span>
      </span>
    </Link>
  );
}