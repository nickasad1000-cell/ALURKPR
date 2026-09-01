import { describe, expect, it } from "vitest";
import { faq } from "./faq";
import { glosarium } from "./glosarium";
import { panduanArtikel } from "./panduan";
import { tahapKpr } from "./tahap";

const slugKebab = (s: string) => /^[a-z0-9-]+$/.test(s);

describe("content/tahap", () => {
  it("berisi 8 tahap dengan nomor urut 1..8", () => {
    expect(tahapKpr).toHaveLength(8);
    expect(tahapKpr.map((t) => t.nomor)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("slug unik dan berformat kebab-case", () => {
    const slugs = tahapKpr.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(slugKebab(s)).toBe(true);
  });

  it("semua field wajib terisi", () => {
    for (const t of tahapKpr) {
      expect(t.judul.trim().length).toBeGreaterThan(0);
      expect(t.ringkasan.trim().length).toBeGreaterThan(0);
      expect(t.penjelasan.length).toBeGreaterThan(0);
      expect(t.dokumen.length).toBeGreaterThan(0);
      expect(t.estimasiWaktu.trim().length).toBeGreaterThan(0);
      expect(t.biayaTerkait.length).toBeGreaterThan(0);
      expect(t.tips.length).toBeGreaterThan(0);
      expect(t.kesalahanUmum.length).toBeGreaterThan(0);
      expect(t.perbedaanSubsidi.trim().length).toBeGreaterThan(0);
    }
  });

  it("fakta (opsional) terisi benar dan pasangan nilai+label unik antar tahap", () => {
    const pasangan: string[] = [];
    for (const t of tahapKpr) {
      if (!t.fakta) continue;
      expect(t.fakta.nilai.trim().length).toBeGreaterThan(0);
      expect(t.fakta.label.trim().length).toBeGreaterThan(0);
      pasangan.push(`${t.fakta.nilai} — ${t.fakta.label}`);
    }
    expect(new Set(pasangan).size).toBe(pasangan.length);
  });
});

describe("content/panduan", () => {
  it("slug unik dan berformat kebab-case", () => {
    const slugs = panduanArtikel.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(slugKebab(s)).toBe(true);
  });

  it("semua field wajib terisi dan isi minimal 3 paragraf", () => {
    for (const a of panduanArtikel) {
      expect(a.judul.trim().length).toBeGreaterThan(0);
      expect(a.deskripsi.trim().length).toBeGreaterThan(0);
      expect(a.ringkasan.trim().length).toBeGreaterThan(0);
      expect(a.isi.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("content/faq", () => {
  it("memiliki minimal 12 pertanyaan tanpa duplikat", () => {
    expect(faq.length).toBeGreaterThanOrEqual(12);
    const qs = faq.map((f) => f.pertanyaan);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it("tidak ada jawaban kosong", () => {
    for (const f of faq) expect(f.jawaban.trim().length).toBeGreaterThan(0);
  });
});

describe("content/glosarium", () => {
  it("memiliki minimal 20 istilah tanpa duplikat", () => {
    expect(glosarium.length).toBeGreaterThanOrEqual(20);
    const terms = glosarium.map((g) => g.istilah);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("tidak ada definisi kosong", () => {
    for (const g of glosarium) expect(g.definisi.trim().length).toBeGreaterThan(0);
  });
});