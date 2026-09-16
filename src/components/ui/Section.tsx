import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

type Tone = "cream" | "paper" | "ink" | "cream-dark";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  "cream-dark": "bg-cream-dark text-ink",
  ink: "bg-ink-deep text-white",
};

export function Section({
  id,
  tone = "cream",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-24 lg:py-32", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/** Small uppercase label that opens a section. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "text-white/55" : "text-ink-soft/70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-7",
          tone === "dark" ? "bg-white/30" : "bg-ink/20",
        )}
      />
      {children}
    </span>
  );
}

/**
 * Section header: eyebrow + heading + optional lede and trailing action.
 * Used by every band on the home page so the rhythm stays identical.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  tone = "light",
  align = "start",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center lg:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "lg:text-center")}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          data-motion-text="words"
          className="mt-5 text-[2.25rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </h2>
        {lede ? (
          <p
            data-reveal="fade-up"
            className={cn(
              "mt-5 max-w-xl text-[1.0625rem] leading-relaxed",
              tone === "dark" ? "text-white/65" : "text-ink-soft",
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? (
        <div data-reveal="fade-up" className="shrink-0">
          {action}
        </div>
      ) : null}
    </div>
  );
}
