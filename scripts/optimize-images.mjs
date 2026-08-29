/**
 * Optimasi gambar statis: konversi PNG/JPEG di public/images/raw ke WebP
 * pada public/images (dengan beberapa lebar sampai yang terbesar).
 *
 * Pemakaian:
 *   npm run images
 */
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const RAW = join(process.cwd(), "public", "images", "raw");
const OUT = join(process.cwd(), "public", "images");
const WIDTHS = [720, 1080, 1600, 2048];

async function main() {
  if (!existsSync(RAW)) {
    console.log("Tidak ada folder public/images/raw — tidak ada yang dioptimasi.");
    return;
  }
  mkdirSync(OUT, { recursive: true });
  const files = readdirSync(RAW).filter((f) => /\.(png|jpe?g)$/i.test(f));
  if (files.length === 0) {
    console.log("public/images/raw kosong.");
    return;
  }

  for (const file of files) {
    const src = join(RAW, file);
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    const meta = await sharp(src).metadata();
    const maxW = Math.min(meta.width ?? Infinity, WIDTHS[WIDTHS.length - 1]);
    const widths = WIDTHS.filter((w) => w <= maxW);
    if (widths.length === 0) widths.push(maxW);

    for (const width of widths) {
      const out = join(OUT, `${base}-${width}.webp`);
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(out);
      console.log(`✓ ${base}-${width}.webp`);
    }
  }
  console.log("Selesai. Hasil di public/images/ — hapus file raw bila tidak diperlukan.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});