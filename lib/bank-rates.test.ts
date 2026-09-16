import { describe, expect, it } from "vitest";
import { getBankRates, seedBankRates } from "./bank-rates";

describe("seedBankRates", () => {
  it("berisi minimal 5 bank dengan id unik", () => {
    expect(seedBankRates.length).toBeGreaterThanOrEqual(5);
    const ids = seedBankRates.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("bidang wajib terisi dan bernilai valid", () => {
    for (const r of seedBankRates) {
      expect(r.bank_name.trim().length).toBeGreaterThan(0);
      expect(r.kpr_type).toMatch(/^(subsidi|komersial)$/);
      expect(r.fixed_rate).toBeGreaterThan(0);
      expect(r.max_tenor_years).toBeGreaterThan(0);
      expect(r.min_dp_percent).toBeGreaterThanOrEqual(0);
      expect(Number.isFinite(new Date(r.updated_at).getTime())).toBe(true);
    }
  });

  it("terdapat setidaknya satu bank subsidi", () => {
    expect(seedBankRates.some((r) => r.kpr_type === "subsidi")).toBe(true);
  });
});

describe("getBankRates", () => {
  it("selalu mengembalikan bentuk { data, sumber } yang valid", async () => {
    const res = await getBankRates();
    expect(res.data.length).toBeGreaterThan(0);
    expect(["db", "seed"]).toContain(res.sumber);
    for (const r of res.data) expect(r.updated_at).toBeTruthy();
  });

  it("sumber 'seed' menyertakan tanggal dicek", async () => {
    const res = await getBankRates();
    if (res.sumber === "seed") {
      expect(res.dicek).toBeTruthy();
    }
  });
});