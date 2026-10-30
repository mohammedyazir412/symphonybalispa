// Custom next/image loader used for the static export (no image server).
// Local photos map to pre-built WebP variants (scripts/optimize-images.mjs);
// Unsplash and WordPress images are resized by their own CDNs.
const WIDTHS = [128, 384, 640, 828, 1200, 1920];
const QUALITY = 72;

function nearestWidth(width: number) {
  return WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
}

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("/images/") && /\.(png|jpe?g)$/i.test(src)) {
    const name = src.slice("/images/".length).replace(/\.(png|jpe?g)$/i, "");
    return `/images/_opt/${name}-${nearestWidth(width)}.webp`;
  }

  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(QUALITY));
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  try {
    const url = new URL(src);
    if (/(^|\.)wordpress\.com$|(^|\.)wp\.com$/.test(url.hostname)) {
      url.searchParams.set("w", String(width));
      return url.toString();
    }
  } catch {
    // relative or unparsable: fall through
  }

  return src;
}
