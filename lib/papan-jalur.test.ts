import { describe, expect, it } from "vitest";
import {
  koordinatJalur,
  koordinatToken,
  susunSerpentine,
  urutanPapan,
} from "./papan-jalur";

describe("susunSerpentine", () => {
  it("2 kolom: baris genap kiri→kanan, ganjil kanan→kiri", () => {
    expect(susunSerpentine(0, 2)).toEqual({ baris: 0, kolom: 0 });
    expect(susunSerpentine(1, 2)).toEqual({ baris: 0, kolom: 1 });
    expect(susunSerpentine(2, 2)).toEqual({ baris: 1, kolom: 1 });
    expect(susunSerpentine(3, 2)).toEqual({ baris: 1, kolom: 0 });
    expect(susunSerpentine(7, 2)).toEqual({ baris: 3, kolom: 0 });
  });

  it("1 kolom (mobile): semua di kolom 0", () => {
    expect(susunSerpentine(2, 1)).toEqual({ baris: 2, kolom: 0 });
    expect(susunSerpentine(5, 1)).toEqual({ baris: 5, kolom: 0 });
  });
});

describe("urutanPapan", () => {
  it("urutan visual 2×4 = [0,1,3,2,4,5,7,6] dan unik", () => {
    const orders = Array.from({ length: 8 }, (_, i) => urutanPapan(i, 2));
    expect(orders).toEqual([0, 1, 3, 2, 4, 5, 7, 6]);
    expect(new Set(orders).size).toBe(8);
  });

  it("1 kolom: berurutan", () => {
    for (let i = 0; i < 8; i++) expect(urutanPapan(i, 1)).toBe(i);
  });
});

describe("koordinatToken", () => {
  it("titik tengah kotak pada grid 2×4 (persen)", () => {
    expect(koordinatToken(0, 2, 8)).toEqual({ top: 12.5, left: 25 });
    expect(koordinatToken(1, 2, 8)).toEqual({ top: 12.5, left: 75 });
    expect(koordinatToken(2, 2, 8)).toEqual({ top: 37.5, left: 75 });
    expect(koordinatToken(7, 2, 8)).toEqual({ top: 87.5, left: 25 });
  });

  it("1 kolom: top bertambah rata, left selalu 50", () => {
    for (let i = 0; i < 8; i++) {
      expect(koordinatToken(i, 1, 8).left).toBe(50);
    }
    expect(koordinatToken(0, 1, 8).top).toBeCloseTo(6.25);
    expect(koordinatToken(7, 1, 8).top).toBeCloseTo(93.75);
  });
});

describe("koordinatJalur", () => {
  it("menghasilkan 8 titik sesuai urutan baca", () => {
    const titik = koordinatJalur(2, 8);
    expect(titik).toHaveLength(8);
    expect(titik[0]).toEqual({ x: 25, y: 12.5 });
    expect(titik[7]).toEqual({ x: 25, y: 87.5 });
  });
});