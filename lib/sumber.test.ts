import { describe, expect, it } from "vitest";
import {
  detectConflict,
  entriSumber,
  peringatanSumber,
  type StatusSumber,
} from "./sumber";

describe("entriSumber", () => {
  it("mengembalikan entri untuk kunci yang dikenal", () => {
    expect(entriSumber("flpp.batas-penghasilan.zona1").length).toBeGreaterThanOrEqual(1);
  });
  it("kunci tak dikenal → array kosong (SOURCE MISSING: jangan fabricate)", () => {
    expect(entriSumber("flpp.batas-penghasilan.zona99")).toEqual([]);
  });
});

describe("detectConflict", () => {
  it("zona 1 → KONFLIK (situs resmi VS publikasi regional)", () => {
    expect(detectConflict("flpp.batas-penghasilan.zona1")).toBe(
      "konflik" satisfies StatusSumber,
    );
  });
  it("zona 2 → aktif (tanpa konflik publikasi)", () => {
    expect(detectConflict("flpp.batas-penghasilan.zona2")).toBe("aktif");
  });
});

describe("peringatanSumber", () => {
  it("zona 1 → ada peringatan konflik yang menyebut dua sumber", () => {
    const p = peringatanSumber("flpp.batas-penghasilan.zona1");
    expect(p.length).toBe(1);
    expect(p[0]).toContain("Konflik sumber resmi");
    expect(p[0]).toContain("VS");
    expect(p[0]).toContain("Permen");
  });
  it("zona 2 → tanpa peringatan", () => {
    expect(peringatanSumber("flpp.batas-penghasilan.zona2")).toEqual([]);
  });
  it("kunci tak dikenal → tanpa peringatan (bukan fabricate)", () => {
    expect(peringatanSumber("flpp.batas-penghasilan.zona99")).toEqual([]);
  });
});