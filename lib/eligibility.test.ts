import { describe, expect, it } from "vitest";
import { cekKelayakan } from "./eligibility";

const lolosSemua = {
  penghasilan: 5_000_000,
  belumPunyaRumah: true,
  belumPernahSubsidi: true,
  hargaUnit: 150_000_000,
  dewasaAtauMenikah: true,
};

describe("cekKelayakan", () => {
  it("semua syarat terpenuhi → layak", () => {
    const r = cekKelayakan(lolosSemua);
    expect(r.layak).toBe(true);
    expect(r.alasan).toHaveLength(0);
    expect(r.syarat.every((s) => s.lolos)).toBe(true);
  });

  it("penghasilan > 8jt → tidak layak dengan alasan", () => {
    const r = cekKelayakan({ ...lolosSemua, penghasilan: 9_000_000 });
    expect(r.layak).toBe(false);
    expect(r.alasan.length).toBeGreaterThan(0);
  });

  it("sudah punya rumah → tidak layak", () => {
    expect(cekKelayakan({ ...lolosSemua, belumPunyaRumah: false }).layak).toBe(
      false,
    );
  });

  it("pernah subsidi → tidak layak", () => {
    expect(
      cekKelayakan({ ...lolosSemua, belumPernahSubsidi: false }).layak,
    ).toBe(false);
  });

  it("harga unit di atas plafon konservatif → tidak layak", () => {
    expect(cekKelayakan({ ...lolosSemua, hargaUnit: 250_000_000 }).layak).toBe(
      false,
    );
  });

  it("belum dewasa/menikah → tidak layak", () => {
    expect(
      cekKelayakan({ ...lolosSemua, dewasaAtauMenikah: false }).layak,
    ).toBe(false);
  });

  it("beberapa pelanggaran sekaligus → beberapa alasan", () => {
    const r = cekKelayakan({
      ...lolosSemua,
      penghasilan: 9_000_000,
      belumPunyaRumah: false,
    });
    expect(r.alasan.length).toBe(2);
  });
});
