import type { CertificateTier } from "@/data/volunteers";

/** Certificate canvas: A4 landscape ratio (297 x 210 = 1.414). */
export const CERT_W = 1600;
export const CERT_H = 1131;

export type Frame = {
  shape: "circle" | "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Corner radius for rect frames. */
  r?: number;
};

/** Where each tier's photo sits on the certificate. Volunteer has none. */
export function photoFrame(tier: CertificateTier): Frame | null {
  if (tier === "star") return { shape: "circle", x: 150, y: 575, w: 220, h: 220 };
  if (tier === "outstanding") return { shape: "rect", x: 0, y: 0, w: 560, h: CERT_H, r: 0 };
  return null;
}

/**
 * An uploaded photo plus how it sits in its frame. `x`/`y` are offsets from
 * centred, in certificate units; `scale` >= 1 zooms past "cover".
 */
export type Photo = {
  src: string;
  /** Natural size, so placement can keep the aspect ratio. */
  iw: number;
  ih: number;
  x: number;
  y: number;
  scale: number;
};

/** Drawn size of the photo: "cover" the frame, then zoom. */
export function drawnSize(photo: Photo, frame: Frame) {
  const cover = Math.max(frame.w / photo.iw, frame.h / photo.ih);
  return { w: photo.iw * cover * photo.scale, h: photo.ih * cover * photo.scale };
}

/** Keep the photo covering the frame - no empty edges after a pan or zoom-out. */
export function clampPhoto(photo: Photo, frame: Frame): Photo {
  const { w, h } = drawnSize(photo, frame);
  const maxX = Math.max(0, (w - frame.w) / 2);
  const maxY = Math.max(0, (h - frame.h) / 2);
  return {
    ...photo,
    x: Math.min(maxX, Math.max(-maxX, photo.x)),
    y: Math.min(maxY, Math.max(-maxY, photo.y)),
  };
}

/** Top-left and size of the photo's <image> for a given frame. */
export function photoPlacement(photo: Photo, frame: Frame) {
  const { w, h } = drawnSize(photo, frame);
  return {
    x: frame.x + (frame.w - w) / 2 + photo.x,
    y: frame.y + (frame.h - h) / 2 + photo.y,
    w,
    h,
  };
}

/** Greedy word wrap by an approximate character budget per line. */
export function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && (line + " " + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Font size that keeps a single line inside `maxWidth`. Google Sans Display
 * averages about 0.5em per character, which is close enough for names.
 */
export function fitFontSize(text: string, maxWidth: number, base: number, min = 48) {
  const fitted = maxWidth / (Math.max(text.length, 1) * 0.5);
  return Math.round(Math.max(min, Math.min(base, fitted)));
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
