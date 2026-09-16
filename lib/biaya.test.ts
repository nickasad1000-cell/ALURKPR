import { describe, expect, it } from "vitest";
import { rincianBiayaAwal } from "./biaya";
import type { ItemBiaya } from "./biaya";

describe("rincianBiayaAwal", () => {
  it("setiap item punya kategori & status valid; nilai null tidak ikut total", () => {
    const r = rincianBiayaAwal(300_000_000, 20);
    expect(r.items.length).toBeGreaterThanOrEqual(5);
    for (const i of r.items) {
      expect(["program", "bank", "notaris", "pajak", "pengembang", "simulasi"]).toContain(i.kategori);
      expect(["resmi", "indikatif", "internal"]).toContain(i.status);
    }
    const sumNilai = r.items.reduce((acc, i) => acc + (i.nilai ?? 0), 0);
    expect(r.totalTerestimasi).toBe(sumNilai);
  });

  it("booking fee & BPHTB tanpa lokasi = null", () => {
    const r = rincianBiayaAwal(300_000_000, 20);
    const bphtb = r.items.find((i) => i.label === "BPHTB");
    const booking = r.items.find((i) => i.label === "Booking fee");
    expect(bphtb?.nilai).toBeNull();
    expect(bphtb?.catatan).toContain("wilayah");
    expect(booking?.nilai).toBeNull();
    expect(r.adaNull).toBe(true);
  });

  it("BPHTB terhitung bila lokasi diberikan", () => {
    const r = rincianBiayaAwal(300_000_000, 20, { lokasi: "Jabodetabek" });
    const bphtb = r.items.find((i) => i.label === "BPHTB");
    // 5% × (300jt − 60jt) = 12jt
    expect(bphtb?.nilai).toBe(12_000_000);
  });

  it("totalPerStatus merangkum nilai bertipe angka per status", () => {
    const r = rincianBiayaAwal(300_000_000, 20);
    const sumIndikatif = r.items
      .filter((i) => i.status === "indikatif")
      .reduce((acc: number, i: ItemBiaya) => acc + (i.nilai ?? 0), 0);
    expect(r.totalPerStatus.indikatif).toBe(sumIndikatif);
  });
});