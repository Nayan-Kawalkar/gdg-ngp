"use client";

import { useId } from "react";
import { Plane } from "@/components/devfest/icons";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * A dashed flight path with a plane flying it on a loop. The flight is SVG
 * <animateMotion>, so it costs no JavaScript per frame. Until hydration, and
 * under reduced motion, the plane waits at the end of the path (`planeAt`).
 */
export default function FlyingPath({
  d,
  viewBox,
  planeAt,
  duration = 7,
  delay = 0,
  className,
}: {
  d: string;
  viewBox: string;
  /** Where the plane sits when it is not flying. */
  planeAt: { x: number; y: number; rotate: number };
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  const pathId = `fp${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox={viewBox} aria-hidden="true" className={cn("overflow-visible", className)}>
      <path
        id={pathId}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 6"
        className="df-dash"
      />
      {still ? (
        <g transform={`translate(${planeAt.x - 12} ${planeAt.y - 12}) rotate(${planeAt.rotate} 12 12)`}>
          <Plane width="24" height="24" className="text-df-blue" />
        </g>
      ) : (
        <g>
          <animateMotion
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
            rotate="auto"
            keyPoints="0;1;1"
            keyTimes="0;0.82;1"
            calcMode="spline"
            keySplines="0.45 0 0.25 1; 0 0 1 1"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
          <g transform="translate(-12 -12)">
            <Plane width="24" height="24" className="text-df-blue" />
          </g>
        </g>
      )}
    </svg>
  );
}
