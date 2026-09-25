import { useId } from "react";
import { routeTone } from "@/components/devfest/routeTone";
import type { Route } from "@/data/devfest";
import { cn } from "@/lib/cn";

/** Each route's stamp lands at its own slight angle, like a real one. */
const tilt: Record<Route["id"], number> = {
  explore: -9,
  learn: 7,
  build: -4,
  connect: 10,
  celebrate: -12,
};

/**
 * A round passport stamp for one route: DEVFEST NAGPUR round the top, the
 * dates round the bottom, the route name across the middle. Inked in the
 * route's colour. `fresh` plays the stamp hitting the page.
 */
export default function Stamp({
  route,
  fresh = false,
  className,
}: {
  route: Pick<Route, "id" | "name" | "color">;
  fresh?: boolean;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const top = `st${id}t`;
  const bottom = `st${id}b`;

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block", fresh && "df-stamp-in", className)}
      style={{ rotate: `${tilt[route.id]}deg` }}
    >
      <svg viewBox="0 0 120 120" className={cn("size-full font-df opacity-90 mix-blend-multiply", routeTone[route.color].icon)}>
        <defs>
          <path id={top} d="M 22 60 A 38 38 0 0 1 98 60" />
          <path id={bottom} d="M 16 60 A 44 44 0 0 0 104 60" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="60" cy="60" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2.5" />
        <text fill="currentColor" fontSize="10.5" fontWeight="700" letterSpacing="2.2">
          <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
            DEVFEST NAGPUR
          </textPath>
        </text>
        <text fill="currentColor" fontSize="9" fontWeight="600" letterSpacing="1.6">
          <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
            12·13 DEC 2026
          </textPath>
        </text>
        <path
          fill="currentColor"
          transform="translate(51 34) scale(0.75)"
          d="M21.6 11.2c.6.3.6 1.2 0 1.5l-2 .9-5.3.1-4.5 6.6a.9.9 0 0 1-.8.4H7.7a.6.6 0 0 1-.6-.8l2.4-6.2-4 .1-1.7 2.3a.7.7 0 0 1-.6.3H2.2a.4.4 0 0 1-.4-.5l.8-3.9-.8-3.9a.4.4 0 0 1 .4-.5h1c.2 0 .4.1.6.3l1.7 2.3 4 .1L7.1 4.1a.6.6 0 0 1 .6-.8H9a.9.9 0 0 1 .8.4l4.5 6.6 5.3.1Z"
        />
        <text
          x="60"
          y="68"
          fill="currentColor"
          fontSize={route.name.length > 7 ? 14 : 16}
          fontWeight="800"
          letterSpacing="1"
          textAnchor="middle"
        >
          {route.name.toUpperCase()}
        </text>
        <line x1="30" y1="78" x2="90" y2="78" stroke="currentColor" strokeWidth="1.5" />
        <text x="60" y="89" fill="currentColor" fontSize="8" fontWeight="700" letterSpacing="1.5" textAnchor="middle">
          ROUTE STAMPED
        </text>
      </svg>
    </span>
  );
}
