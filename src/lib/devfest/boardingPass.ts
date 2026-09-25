import type { Route } from "@/data/devfest";
import { DF, ROUTE_INK, SKY } from "@/lib/devfest/palette";

/**
 * The souvenir boarding pass from the /devfest check-in kiosk, drawn straight
 * onto a <canvas> with the 2D API. The kiosk preview is the bare ticket
 * (notches punched through, so it can "print" out of a slot); the saved PNG
 * is the same ticket drawn over a sky, at 1200x630 - the size social networks
 * crop image previews to. It uses the page's already-loaded Poppins, so there
 * are no fonts to embed (unlike the SVG certificates) - wait for
 * `document.fonts` before the final draw.
 */
export const TICKET_W = 1080;
export const TICKET_H = 490;
export const SHARE_W = 1200;
export const SHARE_H = 630;

export type Cabin = "first" | "business";
export type PassDetails = {
  name: string;
  route: Route;
  cabin: Cabin;
  /** All five passport stamps collected: the pass gets a bonus stamp. */
  complete: boolean;
};

const FONT = "Poppins, sans-serif";
const PLANE =
  "M21.6 11.2c.6.3.6 1.2 0 1.5l-2 .9-5.3.1-4.5 6.6a.9.9 0 0 1-.8.4H7.7a.6.6 0 0 1-.6-.8l2.4-6.2-4 .1-1.7 2.3a.7.7 0 0 1-.6.3H2.2a.4.4 0 0 1-.4-.5l.8-3.9-.8-3.9a.4.4 0 0 1 .4-.5h1c.2 0 .4.1.6.3l1.7 2.3 4 .1L7.1 4.1a.6.6 0 0 1 .6-.8H9a.9.9 0 0 1 .8.4l4.5 6.6 5.3.1Z";

/** The weights the pass uses; load these before drawing. */
export const PASS_FONTS = [`800 50px ${FONT}`, `700 24px ${FONT}`, `600 13px ${FONT}`];

/** FNV-1a, for stable seats and barcodes from a name. */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Same name, route and cabin: same seat. Business sits in rows 1-6. */
export function seatFor(name: string, routeId: string, cabin: Cabin): string {
  const h = hash(`${name.trim().toUpperCase()}|${routeId}|${cabin}`);
  const row = cabin === "business" ? 1 + (h % 6) : 7 + (h % 30);
  return `${row}${"ABCDEF"[(h >>> 8) % 6]}`;
}

export const gateFor = (route: Route) => route.zones[0];

function font(c: CanvasRenderingContext2D, weight: number, size: number) {
  c.font = `${weight} ${size}px ${FONT}`;
}

/** Text with letter spacing, drawn a character at a time (works everywhere). */
function tracked(
  c: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: "left" | "right" = "left",
) {
  const widths = [...text].map((ch) => c.measureText(ch).width);
  const total = widths.reduce((a, w) => a + w, 0) + spacing * (text.length - 1);
  let cursor = align === "right" ? x - total : x;
  [...text].forEach((ch, i) => {
    c.fillText(ch, cursor, y);
    cursor += widths[i] + spacing;
  });
  return total;
}

/** Largest size (down to `min`) at which `text` fits `maxWidth`. */
function fitSize(c: CanvasRenderingContext2D, text: string, weight: number, max: number, maxWidth: number, min = 18) {
  let size = max;
  font(c, weight, size);
  while (size > min && c.measureText(text).width > maxWidth) {
    size -= 1;
    font(c, weight, size);
  }
  return size;
}

function plane(c: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string, angle = 0) {
  c.save();
  c.translate(cx, cy);
  c.rotate(angle);
  c.scale(size / 24, size / 24);
  c.translate(-12, -12);
  c.fillStyle = color;
  c.fill(new Path2D(PLANE));
  c.restore();
}

function rounded(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function displayName(name: string) {
  const clean = name.trim().replace(/\s+/g, " ").toUpperCase();
  return clean || "YOUR NAME HERE";
}

/** "NAYAN KAWALKAR" -> "NAYAN K." for the stub. */
function shortName(name: string) {
  const parts = name.trim().toUpperCase().split(/\s+/).filter(Boolean);
  if (!parts.length) return "YOUR NAME";
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

/** Bars of a (decorative) barcode, seeded by the passenger. */
function barcode(c: CanvasRenderingContext2D, seed: string, x: number, y: number, w: number, h: number, color: string) {
  let s = hash(seed) || 1;
  const next = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  c.fillStyle = color;
  let cursor = x;
  while (cursor < x + w) {
    const bar = 1.5 + Math.floor(next() * 4) * 1.5;
    if (cursor + bar > x + w) break;
    c.fillRect(cursor, y, bar, h);
    cursor += bar + 2 + Math.floor(next() * 3) * 1.5;
  }
}

/** The "passport complete" stamp, pressed onto the main part of the pass. */
function bonusStamp(c: CanvasRenderingContext2D, cx: number, cy: number) {
  c.save();
  c.translate(cx, cy);
  c.rotate(-0.24);
  c.globalAlpha = 0.85;
  c.strokeStyle = DF.orange;
  c.fillStyle = DF.orange;
  c.lineWidth = 5;
  c.beginPath();
  c.arc(0, 0, 66, 0, Math.PI * 2);
  c.stroke();
  c.lineWidth = 1.8;
  c.setLineDash([5, 4]);
  c.beginPath();
  c.arc(0, 0, 55, 0, Math.PI * 2);
  c.stroke();
  c.setLineDash([]);
  c.textAlign = "center";
  font(c, 700, 12);
  c.fillText("PASSPORT", 0, -24);
  font(c, 800, 30);
  c.fillText("5/5", 0, 10);
  font(c, 700, 12);
  c.fillText("ROUTES", 0, 30);
  plane(c, 0, 46, 16, DF.orange);
  c.restore();
}

function drawTicket(c: CanvasRenderingContext2D, pass: PassDetails, logo: HTMLImageElement | null) {
  const W = TICKET_W;
  const H = TICKET_H;
  const M = 760; // where the stub tears off
  const dark = pass.cabin === "business";
  const ink = dark ? "#ffffff" : DF.navy;
  const muted = dark ? "rgba(255,255,255,0.62)" : DF.slate;
  const route = ROUTE_INK[pass.route.color];
  const named = Boolean(pass.name.trim());
  const seat = named ? seatFor(pass.name, pass.route.id, pass.cabin) : "--";
  const gate = gateFor(pass.route).toUpperCase();

  c.save();
  rounded(c, 0, 0, W, H, 30);
  c.clip();

  // Body, header band, stub
  c.fillStyle = dark ? DF.midnight : "#ffffff";
  c.fillRect(0, 0, W, H);
  c.fillStyle = dark ? "rgba(255,255,255,0.06)" : DF.midnight;
  c.fillRect(0, 0, M, 86);
  c.fillStyle = dark ? "rgba(255,255,255,0.04)" : "#f5f8fc";
  c.fillRect(M, 86, W - M, H - 86);
  c.fillStyle = route.band;
  c.fillRect(M, 0, W - M, 86);

  // Header: BOARDING PASS ✈ ........ DEVFEST NAGPUR 2026
  c.fillStyle = "#ffffff";
  font(c, 700, 24);
  const titleWidth = tracked(c, "BOARDING PASS", 40, 53, 5);
  plane(c, 40 + titleWidth + 30, 44, 28, DF.amber, -0.2);
  c.fillStyle = "rgba(255,255,255,0.72)";
  font(c, 600, 15);
  tracked(c, "DEVFEST NAGPUR 2026", M - 40, 51, 3.5, "right");

  // Stub header: DF26 ........ ROUTE
  c.fillStyle = route.onBand;
  font(c, 800, 30);
  c.fillText("DF26", M + 32, 56);
  font(c, 700, 14);
  tracked(c, pass.route.name.toUpperCase(), W - 32, 53, 3, "right");

  // Passenger
  c.fillStyle = muted;
  font(c, 600, 13);
  tracked(c, "PASSENGER", 40, 132, 3);
  const name = displayName(pass.name);
  c.fillStyle = named ? ink : dark ? "rgba(255,255,255,0.3)" : DF.steel;
  font(c, 800, fitSize(c, name, 800, 50, M - 80, 24));
  c.fillText(name, 40, 184);

  // NAG - - - ✈ - - - NEXT
  c.fillStyle = ink;
  font(c, 800, 56);
  c.fillText("NAG", 40, 272);
  const nagWidth = c.measureText("NAG").width;
  const nextWidth = c.measureText("NEXT").width;
  c.fillText("NEXT", M - 40 - nextWidth, 272);
  const from = 40 + nagWidth + 26;
  const to = M - 40 - nextWidth - 26;
  c.save();
  c.strokeStyle = dark ? "rgba(255,255,255,0.3)" : DF.steel;
  c.lineWidth = 2.5;
  c.setLineDash([8, 9]);
  c.beginPath();
  c.moveTo(from, 252);
  c.lineTo(to, 252);
  c.stroke();
  c.restore();
  const mid = (from + to) / 2;
  c.fillStyle = dark ? DF.midnight : "#ffffff";
  c.beginPath();
  c.arc(mid, 252, 24, 0, Math.PI * 2);
  c.fill();
  plane(c, mid, 252, 36, DF.amber);
  c.fillStyle = muted;
  font(c, 600, 12);
  tracked(c, "NAGPUR", 40, 300, 2.5);
  tracked(c, "WHAT'S NEXT", M - 40, 300, 2.5, "right");

  // Details
  c.fillStyle = dark ? "rgba(255,255,255,0.1)" : DF.mist;
  c.fillRect(40, 324, M - 80, 2);
  const details: { label: string; value: string; x: number; width: number; color?: string }[] = [
    { label: "FLIGHT", value: "DF26", x: 40, width: 100 },
    { label: "DATE", value: "12–13 DEC", x: 150, width: 150 },
    { label: "ROUTE", value: pass.route.name.toUpperCase(), x: 310, width: 140, color: dark ? route.band : route.strong },
    { label: "GATE", value: gate, x: 460, width: 190 },
    { label: "SEAT", value: seat, x: 660, width: 60 },
  ];
  details.forEach((d) => {
    c.fillStyle = muted;
    font(c, 600, 12);
    tracked(c, d.label, d.x, 358, 2.5);
    c.fillStyle = d.color ?? ink;
    font(c, 700, fitSize(c, d.value, 700, 21, d.width - 8, 14));
    c.fillText(d.value, d.x, 390);
  });

  // Footer: the DevFest lockup, and an honest note
  if (logo && logo.naturalWidth) {
    const h = 40;
    const w = h * (logo.naturalWidth / logo.naturalHeight);
    if (dark) {
      c.fillStyle = "#ffffff";
      rounded(c, 30, 406, w + 20, h + 16, 12);
      c.fill();
    }
    c.drawImage(logo, 40, 414, w, h);
  }
  c.fillStyle = muted;
  font(c, 600, 11);
  tracked(c, "SOUVENIR PASS · NOT A TICKET", M - 40, 446, 2, "right");

  // Stub
  const S = M + 32;
  c.fillStyle = muted;
  font(c, 600, 12);
  tracked(c, "PASSENGER", S, 132, 2.5);
  c.fillStyle = named ? ink : dark ? "rgba(255,255,255,0.3)" : DF.steel;
  const short = shortName(pass.name);
  font(c, 700, fitSize(c, short, 700, 24, W - S - 32, 14));
  c.fillText(short, S, 164);
  c.fillStyle = ink;
  font(c, 800, 26);
  c.fillText("NAG → NEXT", S, 212);
  c.fillStyle = muted;
  font(c, 600, 12);
  tracked(c, "SEAT", S, 252, 2.5);
  tracked(c, "CLASS", S + 108, 252, 2.5);
  c.fillStyle = ink;
  font(c, 700, 22);
  c.fillText(seat, S, 281);
  c.fillText(pass.cabin === "business" ? "BUSINESS" : "FIRST", S + 108, 281);
  barcode(c, `${name}|${seat}|${pass.route.id}`, S, 304, W - S - 32, 66, dark ? "rgba(255,255,255,0.85)" : DF.navy);
  c.fillStyle = muted;
  font(c, 600, 11);
  tracked(c, "DF26 · 12–13 DEC 2026", S, 396, 1.6);
  c.fillStyle = DF.amber;
  font(c, 700, 13);
  tracked(c, "BOARDING SOON", S, 440, 2.5);

  // Tear line between pass and stub
  c.save();
  c.strokeStyle = dark ? "rgba(255,255,255,0.22)" : DF.mist;
  c.lineWidth = 2;
  c.setLineDash([7, 7]);
  c.beginPath();
  c.moveTo(M, 30);
  c.lineTo(M, H - 30);
  c.stroke();
  c.restore();

  if (pass.complete) {
    c.save();
    c.globalCompositeOperation = dark ? "screen" : "multiply";
    bonusStamp(c, 618, 176);
    c.restore();
  }

  c.restore();

  // The notches: punched clean through, so the sky shows.
  c.save();
  c.globalCompositeOperation = "destination-out";
  [0, H].forEach((y) => {
    c.beginPath();
    c.arc(M, y, 20, 0, Math.PI * 2);
    c.fill();
  });
  c.restore();
}

// One reusable layer for the ticket, so the notches can be punched out of it
// without touching whatever it is drawn over.
let layer: HTMLCanvasElement | null = null;

function ticketLayer(pass: PassDetails, logo: HTMLImageElement | null) {
  layer ??= document.createElement("canvas");
  layer.width = TICKET_W;
  layer.height = TICKET_H;
  const t = layer.getContext("2d");
  if (t) drawTicket(t, pass, logo);
  return layer;
}

/** The kiosk preview: the ticket and its shadow, transparent around them. */
export const PREVIEW_W = TICKET_W + 80;
export const PREVIEW_H = TICKET_H + 72;

export function drawPreview(canvas: HTMLCanvasElement, pass: PassDetails, logo: HTMLImageElement | null) {
  const c = canvas.getContext("2d");
  if (!c) return;
  if (canvas.width !== PREVIEW_W) canvas.width = PREVIEW_W;
  if (canvas.height !== PREVIEW_H) canvas.height = PREVIEW_H;
  c.clearRect(0, 0, PREVIEW_W, PREVIEW_H);
  // The shadow is drawn here, not with a CSS filter (which can tint the
  // area round a canvas in some renderers).
  c.save();
  c.shadowColor = "rgba(4,30,68,0.26)";
  c.shadowBlur = 36;
  c.shadowOffsetY = 20;
  c.drawImage(ticketLayer(pass, logo), 40, 6);
  c.restore();
}

/** The image to save and share: 1200x630 - sky, clouds, a flight path, the pass. */
export function renderShareImage(pass: PassDetails, logo: HTMLImageElement | null): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SHARE_W;
  canvas.height = SHARE_H;
  const c = canvas.getContext("2d");
  if (!c) return canvas;

  // Sky
  const sky = c.createLinearGradient(0, 0, 0, SHARE_H);
  sky.addColorStop(0, SKY.top);
  sky.addColorStop(0.55, SKY.mid);
  sky.addColorStop(1, DF.paper);
  c.fillStyle = sky;
  c.fillRect(0, 0, SHARE_W, SHARE_H);
  [
    [110, 70, 150],
    [1080, 560, 190],
    [980, 60, 120],
    [180, 590, 170],
  ].forEach(([x, y, r]) => {
    const cloud = c.createRadialGradient(x, y, 0, x, y, r);
    cloud.addColorStop(0, "rgba(255,255,255,0.95)");
    cloud.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = cloud;
    c.fillRect(x - r, y - r, r * 2, r * 2);
  });

  // A dashed flight path behind the pass
  c.save();
  c.strokeStyle = "rgba(4,30,68,0.25)";
  c.lineWidth = 2;
  c.setLineDash([7, 9]);
  c.beginPath();
  c.moveTo(-20, 610);
  c.bezierCurveTo(360, 600, 820, 260, 1150, 36);
  c.stroke();
  c.restore();
  plane(c, 1160, 30, 30, DF.blue, -0.62);

  // The pass
  const ticket = ticketLayer(pass, logo);
  c.save();
  c.shadowColor = "rgba(4,30,68,0.28)";
  c.shadowBlur = 44;
  c.shadowOffsetY = 20;
  c.drawImage(ticket, (SHARE_W - TICKET_W) / 2, 62);
  c.restore();
  return canvas;
}
