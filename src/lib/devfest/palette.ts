/**
 * Literal DevFest colours for the boarding pass canvas.
 *
 * Like lib/certificates/palette.ts, the one place for DevFest hex values
 * outside globals.css: the pass is drawn to a <canvas> and saved as an image,
 * where the page's CSS custom properties do not exist. These mirror the
 * --color-df-* and --color-brand-* tokens - keep them in sync.
 */
export const DF = {
  blue: "#054eae",
  orange: "#fe4c01",
  amber: "#fe640c",
  sky: "#1e84d1",
  navy: "#041e44",
  midnight: "#052451",
  paper: "#fcfcfc",
  mist: "#e3eaf2",
  steel: "#a2b1c6",
  slate: "#42566f",
  ink: "#0d1a2a",
} as const;

/** The pass's sky backdrop (tints of df-sky toward df-paper). */
export const SKY = { top: "#cfe4f8", mid: "#e8f2fb" } as const;

/**
 * Route colours on the pass: `band` fills the stub header, `onBand` is the
 * text on it, `strong` is the route name as text on white (the deeper
 * shades, so yellow and green stay readable).
 */
export const ROUTE_INK = {
  blue: { band: "#4285f4", onBand: "#ffffff", strong: "#1a73e8" },
  green: { band: "#34a853", onBand: "#ffffff", strong: "#1e8e3e" },
  red: { band: "#ea4335", onBand: "#ffffff", strong: "#c5221f" },
  yellow: { band: "#fbbc04", onBand: "#041e44", strong: "#a15c00" },
  orange: { band: "#fe640c", onBand: "#ffffff", strong: "#fe4c01" },
} as const;
