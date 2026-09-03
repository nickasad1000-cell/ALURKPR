/**
 * Nilai CSS `order` agar grid menampilkan papan secara serpentine
 * (index DOM berurutan, urutan visual mengikuti tatapan zig-zag 2 kolom).
 */
export function urutanPapan(index: number, columns: number): number {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const reversed = row % 2 === 1;
  return reversed ? row * columns + (columns - 1 - col) : index;
}

export type Point = { x: number; y: number };

/**
 * Cubic bezier dari posisi pin kartu `start` ke pin kartu `end`.
 * Sama dengan kurva connector pada referensi pinboard.
 */
export function makeCurve(start: Point, end: Point): string {
  const distance = Math.abs(end.y - start.y);
  const bend = Math.max(18, Math.min(52, distance * 0.42));
  const direction = end.y >= start.y ? 1 : -1;
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + bend * direction} ${end.x} ${end.y - bend * direction} ${end.x} ${end.y}`;
}
