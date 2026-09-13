import { describe, expect, it } from "vitest";
import type { BankRate } from "./types";
import { bankTerendahKonvensional, urutBank } from "./bank-banding";

const bank = (over: Partial<BankRate>): BankRate => ({
  id: "b",
  bank_name: "Bank",
  kpr_type: "komersial",
  fixed_rate: 7,
  fixed_years: 3,
  floating_rate: 9,
  max_tenor_years: 25,
  min_dp_percent: 10,
  notes: null,
  updated_at: "2026-01-15T00:00:00.000Z",
  skema: "konvensional",
  ...over,
});

const bt = bank({ id: "btn", bank_name: "BTN", kpr_type: "subsidi", fixed_rate: 5 });
const bca = bank({ id: "bca", bank_name: "BCA", fixed_rate: 8, min_dp_percent: 20 });
const bni = bank({ id: "bni", bank_name: "BNI", fixed_rate: 6.5, min_dp_percent: 10 });
const mandiri = bank({ id: "mandiri", bank_name: "Mandiri", fixed_rate: 7, min_dp_percent: 5 });
const bsi = bank({ id: "bsi", bank_name: "BSI", fixed_rate: 5.5, min_dp_percent: 10, skema: "syariah" });

const LIST = [mandiri, bca, bni, bt, bsi];

describe("urutBank", () => {
  it("filter 'semua' + sortir 'bunga': konvensional naik dulu, syariah blok sendiri", () => {
    const urut = urutBank(LIST, "semua", "bunga");
    const ids = urut.map((b) => b.id);
    // Konvensional: btn 5, bni 6.5, mandiri 7, bca 8 → lalu syariah bsi 5.5
    expect(ids).toEqual(["btn", "bni", "mandiri", "bca", "bsi"]);
  });

  it("BSI (syariah) tidak pernah berada di posisi pertama saat sortir bunga", () => {
    const urut = urutBank(LIST, "semua", "bunga");
    expect(urut[0].id).not.toBe("bsi");
    expect(urut[0].skema).not.toBe("syariah");
  });

  it("filter 'komersial' mengeluarkan subsidi", () => {
    const urut = urutBank(LIST, "komersial", "bunga");
    expect(urut.every((b) => b.kpr_type === "komersial")).toBe(true);
  });

  it("filter 'subsidi' hanya subsidi", () => {
    const urut = urutBank(LIST, "subsidi", "bunga");
    expect(urut.map((b) => b.id)).toEqual(["btn"]);
  });

  it("sortir 'dp' campur semua skema, DP naik", () => {
    const urut = urutBank(LIST, "semua", "dp");
    const dps = urut.map((b) => b.min_dp_percent);
    expect(dps).toEqual([...dps].sort((a, b) => a - b));
    // syariah ikut campur di sortir DP
    expect(urut.some((b) => b.id === "bsi")).toBe(true);
  });

  it("sortir 'nama' campur semua skema, urut abjad", () => {
    const urut = urutBank(LIST, "semua", "nama");
    const nama = urut.map((b) => b.bank_name);
    expect(nama).toEqual([...nama].sort((a, b) => a.localeCompare(b, "id")));
  });

  it("tidak mengubah input", () => {
    const before = LIST.map((b) => b.id);
    urutBank(LIST, "semua", "bunga");
    expect(LIST.map((b) => b.id)).toEqual(before);
  });
});

describe("bankTerendahKonvensional", () => {
  it("mengabaikan syariah", () => {
    // bsi 5.5 adalah terendah, tapi terendah konvensional = bt 5
    expect(bankTerendahKonvensional(LIST)).toBe(5);
  });
  it("list kosong → null", () => {
    expect(bankTerendahKonvensional([])).toBeNull();
  });
  it("hanya syariah → null", () => {
    expect(bankTerendahKonvensional([bsi])).toBeNull();
  });
});