import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Tahap 1 — Kompas jangka (cek keuangan & kelayakan) */
export function IconKompas(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="6" r="2.5" />
      <path d="M16 8.5 9.5 26" />
      <path d="M16 8.5 22.5 26" />
      <path d="M12 21.6a7 7 0 0 0 8 0" />
    </svg>
  );
}

/** Tahap 2 — Penanda lokasi (riset rumah & lokasi) */
export function IconRisetRumah(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 26.5c4.4-6.2 6.6-9.6 6.6-13.4a6.6 6.6 0 1 0-13.2 0c0 3.8 2.2 7.2 6.6 13.4Z" />
      <path d="M12.6 12.6a3.4 3.4 0 1 0 6.8 0 3.4 3.4 0 0 0-6.8 0Z" />
    </svg>
  );
}

/** Tahap 3 — Jalur bercabang dua (pilih skema kredit) */
export function IconCabang(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 26V14" />
      <path d="M16 14c0-4-4.5-4.5-7-7" />
      <path d="M16 14c0-4 4.5-4.5 7-7" />
      <circle cx="9" cy="7" r="1.4" />
      <circle cx="23" cy="7" r="1.4" />
      <circle cx="16" cy="26" r="1.4" />
    </svg>
  );
}

/** Tahap 4 — Dokumen dengan tanda setuju (pre-approval & booking) */
export function IconDokSetuju(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5h10l4 4v18H9z" />
      <path d="M19 5v4h4" />
      <path d="M12.3 17.5l2.6 2.6 4.6-5.2" />
    </svg>
  );
}

/** Tahap 5 — Tumpukan berkas (pengajuan KPR ke bank) */
export function IconBerkas(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 4h9.5L24 7.5V20" />
      <path d="M7 8.5h11l4 4V26H7z" />
      <path d="M18 8.5v4h4" />
      <path d="M10.5 15h7" />
      <path d="M10.5 18.5h7" />
      <path d="M10.5 22h4.5" />
    </svg>
  );
}

/** Tahap 6 — Grafik analisis & appraisal properti */
export function IconAppraisal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4v22h21" />
      <path d="M11 21.5v-6" />
      <path d="M15.5 21.5v-10" />
      <path d="M20 21.5v-4" />
      <path d="M8 11l5.5-3.5 4 4L23 7" />
    </svg>
  );
}

/** Tahap 7 — Kunci (akad & serah terima) */
export function IconKunci(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="4" />
      <path d="M13 13 24 24" />
      <path d="M21.2 21.2l1.9-1.9" />
      <path d="M18.3 18.3l1.9-1.9" />
    </svg>
  );
}

/** Tahap 8 — Rumah di atas garis tanah (kelola cicilan & rumah) */
export function IconRumah(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 15 16 6.5 26 15" />
      <path d="M9 12.4V26h14V12.4" />
      <path d="M13.5 26v-6h5v6" />
      <path d="M5 26h22" />
    </svg>
  );
}

export const TAHAP_ICONS = [
  IconKompas,
  IconRisetRumah,
  IconCabang,
  IconDokSetuju,
  IconBerkas,
  IconAppraisal,
  IconKunci,
  IconRumah,
] as const;

type RampTahap = { bg: string; icon: string };

const RAMP_TAHAP: RampTahap[] = [
  { bg: "from-paper to-line", icon: "text-ink-soft" },
  { bg: "from-paper to-line", icon: "text-ink-soft" },
  { bg: "from-primary-soft to-primary", icon: "text-white" },
  { bg: "from-primary-soft to-primary", icon: "text-white" },
  { bg: "from-primary-soft to-primary", icon: "text-white" },
  { bg: "from-primary-soft to-primary", icon: "text-white" },
  { bg: "from-accent-soft to-accent", icon: "text-white" },
  { bg: "from-accent-soft to-accent", icon: "text-white" },
];

/** Plat ikon 3D per tahap: background gradien + bevel, warna mengikuti rampa. */
export function PelatTahap({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  const Icon = TAHAP_ICONS[index];
  const r = RAMP_TAHAP[index] ?? RAMP_TAHAP[0];
  return (
    <span
      aria-hidden="true"
      className={`pelat-3d grid size-11 shrink-0 place-items-center rounded-[7px] border border-black/10 bg-gradient-to-b sm:size-12 ${r.bg} ${className}`}
    >
      <Icon className={`size-5 sm:size-6 ${r.icon}`} />
    </span>
  );
}
