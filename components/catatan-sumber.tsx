import { Info } from "lucide-react";
import { sumberFakta, type DataFakta } from "@/lib/fakta";

type Props = {
  fakta: DataFakta[];
  className?: string;
};

export function CatatanSumber({ fakta, className = "" }: Props) {
  return (
    <div
      className={`flex items-start gap-2 text-xs leading-relaxed text-ink-soft ${className}`}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
      <p>
        {fakta.map((f, i) => (
          <span key={f.nama}>
            {i > 0 ? " · " : null}
            {sumberFakta(f)}
          </span>
        ))}
      </p>
    </div>
  );
}
