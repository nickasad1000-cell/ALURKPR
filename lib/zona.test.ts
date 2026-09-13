import { describe, expect, it } from "vitest";
import {
  HARGA_SUBSIDI_PER_ZONA,
  OPSI_ZONA_HARGA,
  hargaMaksUntukZona,
} from "./zona";

describe("HARGA_SUBSIDI_PER_ZONA", () => {
  it("berisi 5 zona dengan plafon sesuai Kepmen 1722/KPTS/M/2026", () => {
    expect(HARGA_SUBSIDI_PER_ZONA).toHaveLength(5);
    expect(HARGA_SUBSIDI_PER_ZONA.map((z) => z.maks)).toEqual([
      166_000_000, 173_000_000, 182_000_000, 185_000_000, 240_000_000,
    ]);
  });
  it("zona unik & berurutan 1..5", () => {
    const zonas = HARGA_SUBSIDI_PER_ZONA.map((z) => z.zona);
    expect(zonas).toEqual([1, 2, 3, 4, 5]);
  });
  it("label zona berisi wilayah dan sumber resmi", () => {
    for (const z of HARGA_SUBSIDI_PER_ZONA) {
      expect(z.label.length).toBeGreaterThan(10);
      expect(z.sumber).toContain("Kepmen 1722");
    }
  });
  it("plafon zona 1 mencakup wilayah Jawa & memakai batas terendah", () => {
    expect(HARGA_SUBSIDI_PER_ZONA[0].label).toContain("Jawa");
  });
});

describe("hargaMaksUntukZona", () => {
  it("mengembalikan plafon tiap zona", () => {
    expect(hargaMaksUntukZona(1)).toBe(166_000_000);
    expect(hargaMaksUntukZona(5)).toBe(240_000_000);
  });
  it("zona tidak dikenal → fallback 166jt", () => {
    expect(hargaMaksUntukZona(undefined)).toBe(166_000_000);
  });
});

describe("OPSI_ZONA_HARGA", () => {
  it("5 opsi berurutan", () => {
    expect(OPSI_ZONA_HARGA.map((o) => o.nilai)).toEqual([1, 2, 3, 4, 5]);
  });
  it("label berisi angka plafon terformat", () => {
    expect(OPSI_ZONA_HARGA[0].label).toContain("166");
    expect(OPSI_ZONA_HARGA[4].label).toContain("240");
  });
});