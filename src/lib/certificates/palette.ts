/**
 * Literal colours for the certificate SVG.
 *
 * The one place outside globals.css that holds hex values, on purpose: the
 * certificate is exported as a standalone image, where CSS custom properties
 * from the page do not exist. These mirror the @theme tokens - keep them in
 * sync if the palette changes.
 */
export const C = {
  ink: "#1a1a1a",
  inkSoft: "#454746",
  cream: "#fbf9f2",
  creamDark: "#f1eee3",
  paper: "#ffffff",
  blue: "#4285f4",
  blueSoft: "#d2e3fc",
  blueMist: "#e8f0fe",
  blueDeep: "#1a73e8",
  red: "#ea4335",
  redSoft: "#fad2cf",
  yellow: "#fbbc04",
  yellowSoft: "#feefc3",
  yellowDeep: "#f9ab00",
  green: "#34a853",
  greenSoft: "#ceead6",
} as const;

/** Families declared by the certificate's own @font-face block. */
export const FONT_DISPLAY = "GDG Cert Display";
export const FONT_SANS = "GDG Cert Sans";

/** Font files the @font-face block points at (served from /public/fonts). */
export const certificateFonts = [
  { family: FONT_DISPLAY, weight: 400, url: "/fonts/GoogleSansDisplay-Regular.ttf" },
  { family: FONT_DISPLAY, weight: 500, url: "/fonts/GoogleSansDisplay-Medium.ttf" },
  { family: FONT_SANS, weight: 400, url: "/fonts/GoogleSans-Regular.ttf" },
  { family: FONT_SANS, weight: 500, url: "/fonts/GoogleSans-Medium.ttf" },
] as const;

export function fontFaceCss(resolve: (url: string) => string = (u) => u): string {
  return certificateFonts
    .map(
      (f) =>
        `@font-face{font-family:"${f.family}";font-weight:${f.weight};src:url("${resolve(f.url)}") format("truetype");}`,
    )
    .join("");
}
