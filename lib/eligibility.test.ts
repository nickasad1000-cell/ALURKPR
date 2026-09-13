import { describe, expect, it } from "vitest";
import { cekKelayakan, BATAS_PENGHASILAN_PER_ZONA } from "./eligibility";

const lolosSemua = {
  penghasilan: 5_000_000,
  belumPunyaRumah: true,
  belumPernahSubsidi: true,
  hargaUnit: 150_000_000,
  dewasaAtauMenikah: true,
  zona: 1 as const,
};

describe("cekKelayakan", () => {
  it("semua syarat terpenuhi → layak", () => {
    const r = cekKelayakan(lolosSemua);
    expect(r.layak).toBe(true);
    expect(r.alasan).toHaveLength(0);
    expect(r.syarat.every((s) => s.lolos)).toBe(true);
  });

  it("penghasilan di atas batas zona (belum kawin & kawin) → tidak layak", () => {
    // Zona 1: batas belum kawin 8,5jt, kawin 10jt → 10,5jt pasti di atas keduanya
    const r = cekKelayakan({ ...lolosSemua, penghasilan: 10_500_000 });
    expect(r.layak).toBe(false);
    expect(r.alasan.length).toBeGreaterThan(0);
  });

  it("penghasilan 9jt zona 1: gagal untuk belum kawin, tapi diberi catatan opsi kawin", () => {
    const r = cekKelayakan({ ...lolosSemua, penghasilan: 9_000_000 });
    expect(r.layak).toBe(false);
    const syaratPenghasilan = r.syarat.find((s) => s.label.includes("Penghasilan"));
    expect(syaratPenghasilan?.catatan).toContain("menikah");
  });

  it("penghasilan 9jt di zona 4 (Jabodetabek, batas 12jt) → lolos syarat penghasilan", () => {
    const r = cekKelayakan({ ...lolosSemua, penghasilan: 9_000_000, zona: 4 });
    expect(r.layak).toBe(true);
  });

  it("batas zona mengikuti tabel aturan FLPP terbaru (Permen PKP No. 1 Tahun 2026)", () => {
    expect(BATAS_PENGHASILAN_PER_ZONA[1].belumKawin).toBe(8_500_000);
    expect(BATAS_PENGHASILAN_PER_ZONA[2].belumKawin).toBe(9_000_000);
    expect(BATAS_PENGHASILAN_PER_ZONA[3].belumKawin).toBe(10_500_000);
    expect(BATAS_PENGHASILAN_PER_ZONA[4].belumKawin).toBe(12_000_000);
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
      penghasilan: 20_000_000,
      belumPunyaRumah: false,
    });
    expect(r.alasan.length).toBe(2);
  });
});
