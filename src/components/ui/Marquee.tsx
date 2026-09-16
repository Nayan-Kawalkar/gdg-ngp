import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * CSS-driven infinite marquee. The children are rendered twice and the track
 * translates -50%, so the seam is invisible. Pauses on hover.
 */
export default function Marquee({
  children,
  duration = 38,
  reverse = false,
  className,
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn("marquee-host relative w-full overflow-hidden", fade && "mask-edges-x", className)}
    >
      <div
        className="animate-marquee flex w-max"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
