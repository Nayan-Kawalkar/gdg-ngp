import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Plane } from "@/components/devfest/icons";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
 * DevFest primitives. The template's visual grammar:
 *   - orange outline "tag" pills over every section title
 *   - bold navy Poppins headings, slate Google Sans body
 *   - fully rounded pill buttons: orange (primary), navy outline, navy solid
 *   - white rounded cards with a soft navy-tinted shadow
 *   - airplane-window frames and dashed flight paths as recurring motifs
 * ------------------------------------------------------------------------- */

/** The soft, navy-tinted card shadow the template uses everywhere. */
export const dfCardShadow = "shadow-[0_18px_40px_-24px_rgba(4,30,68,0.35)]";

export function DfTag({
  children,
  caps = true,
  tone = "light",
  className,
}: {
  children: ReactNode;
  caps?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-df text-[0.7rem] font-semibold",
        caps ? "uppercase tracking-[0.1em]" : "text-[0.8rem] font-medium tracking-normal",
        tone === "light"
          ? "border-df-amber/70 bg-white/75 text-df-amber"
          : "border-df-amber/80 bg-df-midnight/40 text-df-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * GDG mark + "Google Developer Groups / Nagpur", as the template sets it in the
 * header and footer. Text rather than an image, so the chapter name is exact.
 */
export function GdgLockup({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/devfest/gdg-mark.png"
        alt=""
        width={480}
        height={333}
        style={{ width: "auto" }}
        className="h-8 w-auto sm:h-9"
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block whitespace-nowrap font-df text-[0.9rem] font-medium sm:text-[0.95rem]",
            tone === "light" ? "text-df-navy" : "text-white",
          )}
        >
          {/* The smallest phones get the short name, so the menu button fits. */}
          <span className="max-[359px]:hidden">Google Developer Groups</span>
          <span className="hidden max-[359px]:inline">GDG</span>
        </span>
        <span className={cn("block text-[0.8rem]", tone === "light" ? "text-df-slate" : "text-white/60")}>
          Nagpur
        </span>
      </span>
    </span>
  );
}

/** Tag + heading + lede, with an optional action on the right at lg. */
export function DfIntro({
  eyebrow,
  title,
  sub,
  action,
  tone = "light",
  headingId,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  headingId?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <DfTag tone={tone}>{eyebrow}</DfTag>
        <h2
          id={headingId}
          data-motion-text="words"
          className={cn(
            "mt-4 text-balance font-df text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[2.75rem]",
            tone === "light" ? "text-df-navy" : "text-white",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {sub ? (
          <p
            data-reveal="fade-up"
            className={cn(
              "mt-4 max-w-xl text-[1rem] leading-[1.7] sm:text-[1.0625rem]",
              tone === "light" ? "text-df-slate" : "text-white/75",
            )}
          >
            {sub}
          </p>
        ) : null}
      </div>
      {action ? (
        <div data-reveal="fade-up" className="flex shrink-0 flex-wrap gap-3">
          {action}
        </div>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "outline" | "navy" | "white";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] text-white shadow-[0_12px_24px_-12px_rgba(254,76,1,0.7)] hover:brightness-105",
  outline: "border border-df-midnight/35 bg-white/80 text-df-navy hover:border-df-midnight hover:bg-white",
  navy: "bg-df-midnight text-white hover:bg-df-navy",
  white: "bg-white text-df-navy hover:bg-df-mist",
};

/** Pill link. `#hash` and internal paths use Next's Link; others open plainly. */
export function DfButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "press group inline-flex items-center justify-center gap-2 rounded-full font-df font-semibold transition-[background-color,border-color,filter,transform] duration-300",
    size === "md" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-5 text-[0.85rem]",
    buttonVariants[variant],
    className,
  );
  const external = /^(https?:|mailto:)/.test(href) || href === "#";
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Arrow that nudges on hover of a parent `.group`. */
export function DfArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
        className,
      )}
    />
  );
}

/**
 * The small circular arrow button at the foot of template cards. `active`
 * fills it navy (a selected card), the same as its hover state.
 */
export function ArrowCircle({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        active
          ? "border-transparent bg-df-midnight text-white"
          : "border-df-mist bg-white text-df-navy group-hover:border-transparent group-hover:bg-df-midnight group-hover:text-white",
        className,
      )}
    >
      <ArrowRight className="size-3.5" />
    </span>
  );
}

/**
 * Airplane window: a thick, softly lit bezel around an image, the way the
 * template frames Nagpur and the wing view. `imagePosition` pans the image
 * inside the frame (object-position).
 */
export function PlaneWindow({
  src,
  alt = "",
  imagePosition = "center",
  sizes = "(max-width: 1024px) 70vw, 28vw",
  className,
  children,
}: {
  src: string;
  alt?: string;
  imagePosition?: string;
  sizes?: string;
  className?: string;
  /** Drawn inside the pane, over the view - e.g. a <WindowShade />. */
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[5/6] rounded-[34%/28%] bg-[linear-gradient(160deg,white,var(--color-df-mist)_55%,var(--color-df-steel))] p-[7%] shadow-[0_30px_60px_-30px_rgba(4,30,68,0.45),inset_0_2px_6px_rgba(255,255,255,0.9)]",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[30%/24%] shadow-[inset_0_6px_18px_rgba(4,30,68,0.35)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/* Glass glare */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(125deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_38%)]"
        />
        {children}
      </div>
    </div>
  );
}

/**
 * Dashed flight path ending in a plane. Purely decorative. The dash drifts
 * along the curve so the plane reads as moving; reduced motion stops it.
 */
export function FlightPath({
  className,
  planeClassName,
  d = "M4 70 C 60 70, 110 20, 196 18",
  viewBox = "0 0 220 80",
  planeAt = { x: 196, y: 18, rotate: -8 },
}: {
  className?: string;
  planeClassName?: string;
  d?: string;
  viewBox?: string;
  planeAt?: { x: number; y: number; rotate: number };
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={cn("overflow-visible", className)}>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 6"
        className="df-dash"
      />
      <g transform={`translate(${planeAt.x - 12} ${planeAt.y - 12}) rotate(${planeAt.rotate} 12 12)`}>
        <Plane width="24" height="24" className={cn("text-df-blue", planeClassName)} />
      </g>
    </svg>
  );
}
