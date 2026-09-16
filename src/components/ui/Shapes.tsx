import { cn } from "@/lib/cn";

/**
 * Decorative geometry - solid fills, no outlines. Per DESIGN.md these are used
 * large and cropped by the section edge, two per section at most.
 */

type ShapeProps = { className?: string };

export function Circle({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="50" fill="currentColor" />
    </svg>
  );
}

export function Ring({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0Zm0 26a24 24 0 1 1 0 48 24 24 0 0 1 0-48Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HalfCircle({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 50" aria-hidden="true" className={className}>
      <path d="M0 50a50 50 0 0 1 100 0Z" fill="currentColor" />
    </svg>
  );
}

export function Quarter({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path d="M0 100V0h100A100 100 0 0 1 0 100Z" fill="currentColor" />
    </svg>
  );
}

export function Arch({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 130" aria-hidden="true" className={className}>
      <path d="M0 130V50a50 50 0 0 1 100 0v80Z" fill="currentColor" />
    </svg>
  );
}

export function Squircle({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <rect width="100" height="100" rx="34" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path d="M50 0c4 27 19 42 50 50-31 8-46 23-50 50-4-27-19-42-50-50 31-8 46-23 50-50Z" fill="currentColor" />
    </svg>
  );
}

export function Plus({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path d="M38 0h24v38h38v24H62v38H38V62H0V38h38Z" fill="currentColor" />
    </svg>
  );
}

/** Four-dot brand accent. Decorative only - never a logo substitute. */
export function GDGDots({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className={cn("size-5", className)}>
      <circle cx="12" cy="12" r="8" fill="#4285f4" />
      <circle cx="32" cy="12" r="8" fill="#ea4335" />
      <circle cx="12" cy="32" r="8" fill="#fbbc04" />
      <circle cx="32" cy="32" r="8" fill="#34a853" />
    </svg>
  );
}
