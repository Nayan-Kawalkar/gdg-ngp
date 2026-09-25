import type { RouteColor } from "@/data/devfest";

/**
 * Route colours: the four Google colours plus the DevFest amber. The icon uses
 * the deeper shade so it keeps its contrast on the pale tile.
 */
export const routeTone: Record<
  RouteColor,
  { icon: string; tile: string; dot: string; ring: string }
> = {
  blue: { icon: "text-blue-deep", tile: "bg-blue-mist", dot: "bg-brand-blue", ring: "ring-brand-blue" },
  green: { icon: "text-green-deep", tile: "bg-green-mist", dot: "bg-brand-green", ring: "ring-brand-green" },
  red: { icon: "text-red-deep", tile: "bg-red-mist", dot: "bg-brand-red", ring: "ring-brand-red" },
  yellow: { icon: "text-amber", tile: "bg-yellow-mist", dot: "bg-brand-yellow", ring: "ring-brand-yellow" },
  orange: { icon: "text-df-orange", tile: "bg-df-amber/10", dot: "bg-df-amber", ring: "ring-df-amber" },
};
