import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Guard copy PRD §5: istilah klaim berlebihan ("jujur", "selevel") dan nama
 * produk lama (SiKasep/SiKumbang) tidak boleh muncul di kode/konten yang
 * dikirim ke pengguna. Ledakan halaman marketing tidak boleh mengembalikannya.
 */
const AKAR = process.cwd();
const DIR = ["app", "components", "content", "lib", "public"];
const EKSTENSI = [".ts", ".tsx", ".txt"];

const TERLARANG: { nama: string; pola: RegExp }[] = [
  { nama: 'klaim "jujur"', pola: /jujur/i },
  { nama: 'klaim "selevel"', pola: /selevel/i },
  { nama: 'istilah lama "SiKasep"', pola: /SiKasep/i },
  { nama: 'istilah lama "SiKumbang"', pola: /SiKumbang/i },
  {
    nama: "label lama Permen PKP No. 5 Tahun 2025",
    pola: /No\.\s*5\s*Tahun\s*2025/i,
  },
];

function berkasSumber(): string[] {
  const hasil: string[] = [];
  const telusuri = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (e.name === "node_modules" || e.name === ".next") continue;
        telusuri(join(dir, e.name));
        continue;
      }
      if (!EKSTENSI.some((x) => e.name.endsWith(x))) continue;
      if (/\.(test|spec)\./.test(e.name)) continue;
      hasil.push(relative(AKAR, join(dir, e.name)));
    }
  };
  for (const dir of DIR) telusuri(join(AKAR, dir));
  return hasil;
}

describe("guard copy (PRD §5)", () => {
  const berkas = berkasSumber();

  it("memindai berkas sumber yang diharapkan", () => {
    expect(berkas.length).toBeGreaterThan(20);
    expect(berkas).toContain(join("app", "page.tsx"));
  });

  for (const { nama, pola } of TERLARANG) {
    it(`tidak memakai ${nama}`, () => {
      const pelanggar = berkas.filter((f) =>
        pola.test(readFileSync(join(AKAR, f), "utf8")),
      );
      expect(pelanggar, `Dilarang PRD §5: ${nama}`).toEqual([]);
    });
  }
});
