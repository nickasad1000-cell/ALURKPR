import { describe, expect, it } from "vitest";
import {
  angsuranBulanan,
  biayaAwal,
  jadwalAmortisasi,
  plafondMaksimal,
  totalPembayaran,
} from "./finance";

describe("plafondMaksimal", () => {
  it("harga 300jt DP 20% → plafon 240jt", () => {
    expect(plafondMaksimal(300_000_000, 20)).toBe(240_000_000);
  });
  it("DP 0% → plafon = harga", () => {
    expect(plafondMaksimal(150_000_000, 0)).toBe(150_000_000);
  });
});

describe("angsuranBulanan", () => {
  it("300jt, 5%, 20th → ± Rp1.980.000 (toleransi 2.000)", () => {
    const hasil = angsuranBulanan(300_000_000, 5, 20);
    expect(Math.abs(hasil - 1_980_000)).toBeLessThan(2_000);
  });
  it("bunga 0% → plafon dibagi jumlah bulan", () => {
    expect(angsuranBulanan(120_000_000, 0, 10)).toBe(1_000_000);
  });
  it("input tidak valid → 0", () => {
    expect(angsuranBulanan(0, 5, 20)).toBe(0);
    expect(angsuranBulanan(100, 5, 0)).toBe(0);
  });
});

describe("jadwalAmortisasi", () => {
  it("jumlah baris = tenor × 12, saldo akhir 0", () => {
    const rows = jadwalAmortisasi(240_000_000, 5, 20);
    expect(rows).toHaveLength(240);
    expect(rows[239].saldo).toBe(0);
  });
  it("pokok + bunga = angsuran di tiap baris", () => {
    const rows = jadwalAmortisasi(120_000_000, 8, 10);
    for (const r of rows) expect(r.pokok + r.bunga).toBe(r.angsuran);
  });
});

describe("totalPembayaran", () => {
  it("= angsuran × bulan", () => {
    const t = totalPembayaran(240_000_000, 5, 20);
    expect(t).toBe(angsuranBulanan(240_000_000, 5, 20) * 240);
  });
});

describe("biayaAwal", () => {
  const b = biayaAwal(300_000_000, 20);
  it("total = jumlah seluruh komponen", () => {
    expect(b.total).toBe(
      b.dp + b.provisi + b.admin + b.bphtb + b.notaris + b.asuransi,
    );
  });
  it("DP 20% dari 300jt = 60jt", () => expect(b.dp).toBe(60_000_000));
  it("BPHTB 5% × (harga − 60jt NPOPTKP) = 12jt", () =>
    expect(b.bphtb).toBe(12_000_000));
  it("BPHTB tidak negatif untuk rumah murah", () => {
    expect(biayaAwal(50_000_000, 10).bphtb).toBe(0);
  });
});
