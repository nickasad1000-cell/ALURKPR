export type PosisiPapan = { baris: number; kolom: number };

/**
 * Posisi visual (baris, kolom) tahap ke-`index` pada grid serpentine.
 * Baris genap dibaca kiri→kanan, baris ganjil kanan→kiri.
 */
export function susunSerpentine(index: number, cols: number): PosisiPapan {
  const baris = Math.floor(index / cols);
  const sisa = index % cols;
  const kolom = baris % 2 === 0 ? sisa : cols - 1 - sisa;
  return { baris, kolom };
}

/**
 * Nilai CSS `order` agar grid menampilkan papan secara serpentine
 * (index DOM berurutan, urutan visual mengikuti tatapan zig-zag).
 */
export function urutanPapan(index: number, cols: number): number {
  const { baris, kolom } = susunSerpentine(index, cols);
  return baris * cols + kolom;
}

export type Koordinat = { top: number; left: number };

/**
 * Titik tengah kotak ke-`index` dalam persen (relatif kontainer papan).
 * Dipakai untuk posisi token — satu-satunya sumber kebenaran dari interaksi,
 * bukan scroll/offset-path.
 */
export function koordinatToken(index: number, cols: number, total: number): Koordinat {
  const { baris, kolom } = susunSerpentine(index, cols);
  const totalBaris = Math.ceil(total / cols);
  return {
    top: ((baris + 0.5) / totalBaris) * 100,
    left: ((kolom + 0.5) / cols) * 100,
  };
}

/** Titik-titik jalur dekoratif (urutan baca 0..total-1) dalam persen. */
export function koordinatJalur(
  cols: number,
  total: number,
): Array<{ x: number; y: number }> {
  return Array.from({ length: total }, (_, i) => {
    const k = koordinatToken(i, cols, total);
    return { x: k.left, y: k.top };
  });
}