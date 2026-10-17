// Pre-builds responsive WebP variants of every image in public/images into
// public/images/_opt, so a static export can serve small, modern images.
// Safe to run repeatedly: existing up-to-date outputs are skipped.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "public", "images");
const OUT_DIR = path.join(SRC_DIR, "_opt");
const WIDTHS = [384, 640, 828, 1200, 1920];
const QUALITY = 72;
const EXT = new Set([".png", ".jpg", ".jpeg"]);

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => EXT.has(path.extname(f).toLowerCase()));

let made = 0;
let skipped = 0;

for (const file of files) {
  const input = path.join(SRC_DIR, file);
  const base = path.basename(file, path.extname(file));
  const srcMtime = fs.statSync(input).mtimeMs;

  for (const width of WIDTHS) {
    const out = path.join(OUT_DIR, `${base}-${width}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcMtime) {
      skipped++;
      continue;
    }
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    made++;
  }
}

console.log(
  `optimize-images: ${files.length} sources, ${made} created, ${skipped} up to date`,
);
