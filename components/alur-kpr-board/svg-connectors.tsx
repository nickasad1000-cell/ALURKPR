"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { makeCurve, type Point } from "./types";

type SvgConnectorsProps = {
  containerRef: RefObject<HTMLElement | null>;
  /** Dipanggil oleh induk setelah animasi/resize untuk memicu recalculate. */
  signal?: number;
  onMeasure?: (count: number) => void;
};

/**
 * SVG overlay yang menghitung kurva bezier dari pin satu kartu ke pin
 * kartu berikutnya berdasarkan `getBoundingClientRect()` (urutan DOM bebas
 * karena kartu di-reorder via CSS `order`).
 */
export function SvgConnectors({ containerRef, signal = 0, onMeasure }: SvgConnectorsProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const cr = container.getBoundingClientRect();
    if (cr.width === 0 && cr.height === 0) return;

    const pins: { index: number; point: Point }[] = [];
    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-pin-index]"));

    for (const node of nodes) {
      const pinEl = node.querySelector<HTMLElement>(".pin");
      if (!pinEl) continue;
      const index = Number(node.getAttribute("data-pin-index"));
      const pr = pinEl.getBoundingClientRect();
      pins.push({
        index,
        point: {
          x: pr.left + pr.width / 2 - cr.left,
          y: pr.top + pr.height / 2 - cr.top,
        },
      });
    }

    pins.sort((a, b) => a.index - b.index);

    const next: string[] = [];
    for (let i = 0; i < pins.length - 1; i++) {
      next.push(makeCurve(pins[i].point, pins[i + 1].point));
    }

    setSize({ w: cr.width, h: cr.height });
    setPaths(next);
    onMeasure?.(pins.length);
  }, [containerRef, onMeasure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, measure]);

  // Recalculate saat signal berubah (dari onAnimationComplete panel).
  useEffect(() => {
    if (signal > 0) {
      const id = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(id);
    }
  }, [signal, measure]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      preserveAspectRatio="none"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} className="connector-line" />
      ))}
    </svg>
  );
}
