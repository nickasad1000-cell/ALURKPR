import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BATAS_PENGHASILAN_PER_ZONA, type ZonaFlpp } from "./eligibility";
import { entriSumber } from "./sumber";
import { hargaMaksUntukZona } from "./zona";
import { FAKTA } from "./fakta";
import { panduanArtikel } from "../content/panduan";
import { tahapKpr } from "../content/tahap";

const formatJuta = (n: number): string => {
  const juta = n / 1_000_000;
  return `${Number.isInteger(juta) ? juta : juta.toFixed(1).replace(".", ",")} jt`;
};

describe("konsistensi registry sumber ↔ eligibility", () => {
  for (const z of [1, 2, 3, 4] as ZonaFlpp[]) {
    it(`zona ${z}: entri sumber cocok dengan BATAS_PENGHASILAN_PER_ZONA`, () => {
      const b = BATAS_PENGHASILAN_PER_ZONA[z];
      const kanonik = `belumKawin Rp${formatJuta(b.belumKawin)} / kawin Rp${formatJuta(b.kawin)}`;
      const entri = entriSumber(`flpp.batas-penghasilan.zona${z}`);
      expect(entri.some((e) => e.nilai === kanonik)).toBe(true);
    });
  }
});

describe("konsistensi FAKTA ↔ zona.ts", () => {
  it("range harga FAKTA cocok dengan batas min/max zona.ts", () => {
    const min = hargaMaksUntukZona(1) / 1_000_000;
    const max = hargaMaksUntukZona(5) / 1_000_000;
    expect(FAKTA.hargaSubsidiZona.nilai).toBe(`${min}–${max}`);
  });
});

describe("konsistensi prosa panduan ↔ data", () => {
  it("artikel FLPP memakai range penghasilan, harga, dan label regulasi terbaru", () => {
    const flpp = panduanArtikel.find((a) => a.slug === "kpr-subsidi-flpp");
    expect(flpp).toBeDefined();
    const teks = (flpp?.isi ?? []).join(" ");

    const minGaji = BATAS_PENGHASILAN_PER_ZONA[1].belumKawin / 1_000_000;
    const maxGaji = BATAS_PENGHASILAN_PER_ZONA[4].kawin / 1_000_000;
    expect(teks).toContain(`Rp${String(minGaji).replace(".", ",")}–${maxGaji} juta/bulan`);

    const minHarga = hargaMaksUntukZona(1) / 1_000_000;
    const maxHarga = hargaMaksUntukZona(5) / 1_000_000;
    expect(teks).toContain(`Rp${minHarga} hingga Rp${maxHarga} juta`);

    expect(teks).toContain(FAKTA.bungaFlpp.sumber);
  });
});

describe("konsistensi fakta tahap ↔ provenance", () => {
  it("fakta tahap 3 (bunga FLPP) resmi dan menunjuk sumber FAKTA", () => {
    const t3 = tahapKpr.find((t) => t.nomor === 3);
    expect(t3?.fakta?.status).toBe("resmi");
    expect(t3?.fakta?.sumber).toBe(FAKTA.bungaFlpp.sumber);
    expect(t3?.fakta?.terakhirDicek).toBe(FAKTA.bungaFlpp.dicek);
  });

  it("setiap fakta berstatus resmi punya sumber + tanggal dicek valid", () => {
    for (const t of tahapKpr) {
      if (t.fakta?.status !== "resmi") continue;
      expect(t.fakta.sumber?.trim(), `tahap ${t.nomor}`).toBeTruthy();
      expect(t.fakta.terakhirDicek, `tahap ${t.nomor}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("konsistensi llms.txt ↔ data", () => {
  const teks = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");

  it("harga FLPP sesuai hargaMaksUntukZona(1)", () => {
    expect(teks).toContain(`Rp ${hargaMaksUntukZona(1).toLocaleString("id-ID")}`);
  });

  it("bunga dan DP sesuai FAKTA", () => {
    expect(teks).toContain(`${FAKTA.bungaFlpp.nilai}% flat`);
    expect(teks).toContain(`mulai ${FAKTA.dpFlpp.nilai}%`);
  });
});
