"use client";

import { CERT_H, CERT_W } from "@/lib/certificates/geometry";
import { certificateFonts, fontFaceCss } from "@/lib/certificates/palette";

/**
 * Certificate export, entirely in the browser.
 *
 * An SVG drawn to a canvas through an <img> cannot fetch anything external -
 * fonts and images must already be inside it. So we clone the live SVG,
 * swap every font URL and <image href> for a data: URL, then rasterize.
 */

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Fonts and the GDG mark are the same on every export - fetch them once.
const cache = new Map<string, Promise<string>>();

function toDataUrl(url: string): Promise<string> {
  if (url.startsWith("data:")) return Promise.resolve(url);
  let pending = cache.get(url);
  if (!pending) {
    pending = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`Could not load ${url}`);
      return res.blob().then(blobToDataUrl);
    });
    // A failed fetch should be retried next time, not cached.
    pending.catch(() => cache.delete(url));
    cache.set(url, pending);
  }
  return pending;
}

async function selfContainedSvg(svg: SVGSVGElement): Promise<string> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", String(CERT_W));
  clone.setAttribute("height", String(CERT_H));
  clone.removeAttribute("class");

  // Fonts: rebuild the @font-face block with the files embedded.
  const embedded = new Map<string, string>(
    await Promise.all(certificateFonts.map(async (f) => [f.url, await toDataUrl(f.url)] as const)),
  );
  const style = clone.querySelector("style");
  if (!style) throw new Error("Certificate SVG is missing its <style> block");
  style.textContent = fontFaceCss((url) => embedded.get(url) ?? url);

  // Images: the GDG mark and the volunteer's photo.
  await Promise.all(
    [...clone.querySelectorAll("image")].map(async (image) => {
      const href = image.getAttribute("href");
      if (href) image.setAttribute("href", await toDataUrl(href));
    }),
  );

  return new XMLSerializer().serializeToString(clone);
}

/** Rasterize the certificate. `scale` 2 gives a 3200 x 2262 PNG. */
export async function certificateToPng(svg: SVGSVGElement, scale = 2): Promise<Blob> {
  const markup = await selfContainedSvg(svg);
  const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));

  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    // Embedded fonts can land a beat after decode in some browsers.
    await new Promise((r) => setTimeout(r, 120));

    const canvas = document.createElement("canvas");
    canvas.width = CERT_W * scale;
    canvas.height = CERT_H * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG export failed"))), "image/png"),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** A4 landscape PDF with the PNG filling the page. jsPDF loads only on demand. */
export async function certificateToPdf(svg: SVGSVGElement): Promise<Blob> {
  const [png, { jsPDF }] = await Promise.all([certificateToPng(svg, 2), import("jspdf")]);
  const dataUrl = await blobToDataUrl(png);
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4", compress: true });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  pdf.addImage(dataUrl, "PNG", 0, 0, w, h);
  return pdf.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Read an uploaded photo, downscaled so the longest edge is at most `max`px
 * (a phone photo is 12MP; the certificate needs a fraction of that). The
 * file never leaves the browser.
 */
export function readPhoto(file: File, max = 1400): Promise<{ src: string; iw: number; ih: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const iw = Math.round(img.naturalWidth * ratio);
      const ih = Math.round(img.naturalHeight * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = iw;
      canvas.height = ih;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas is not available"));
        return;
      }
      ctx.drawImage(img, 0, 0, iw, ih);
      URL.revokeObjectURL(url);
      resolve({ src: canvas.toDataURL("image/jpeg", 0.9), iw, ih });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file could not be read as an image."));
    };
    img.src = url;
  });
}
