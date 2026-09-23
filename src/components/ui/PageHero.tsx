import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type Wash = "blue" | "red" | "yellow" | "green";

/* Literal class strings - Tailwind only generates what it can read in source. */
const lightWash: Record<Wash, string> = {
  blue: "bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_62%)]",
  red: "bg-[radial-gradient(circle_at_center,var(--color-red-mist),transparent_62%)]",
  yellow: "bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]",
  green: "bg-[radial-gradient(circle_at_center,var(--color-green-mist),transparent_62%)]",
};

const darkWash: Record<Wash, string> = {
  blue: "bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.28),transparent_62%)]",
  red: "bg-[radial-gradient(circle_at_center,rgba(234,67,53,0.2),transparent_62%)]",
  yellow: "bg-[radial-gradient(circle_at_center,rgba(251,188,4,0.16),transparent_62%)]",
  green: "bg-[radial-gradient(circle_at_center,rgba(52,168,83,0.22),transparent_62%)]",
};

export type HeroStat = { value: ReactNode; label: string; dot?: string };

/**
 * The inner-page hero every non-home route opens with: eyebrow, a masked
 * line-by-line headline, lede, a CTA row and an optional stat row, over two
 * soft tonal washes.
 *
 * Server component - all motion comes from the shared data attributes, with
 * delays that sequence the entrance because everything is on screen at load.
 * A `dark` hero also needs its route in Navbar's `darkHeroRoutes`.
 */
export default function PageHero({
  eyebrow,
  lines,
  accent = 1,
  lede,
  actions,
  stats,
  tone = "light",
  washes = ["blue", "yellow"],
  before,
  children,
}: {
  eyebrow: string;
  /** Headline, one entry per masked line. */
  lines: string[];
  /** How many trailing lines take the accent colour. */
  accent?: number;
  lede?: ReactNode;
  actions?: ReactNode;
  stats?: HeroStat[];
  tone?: "light" | "dark";
  washes?: [Wash, Wash];
  /** Rendered above the eyebrow, e.g. a back link. */
  before?: ReactNode;
  /** Rendered after the stat row. */
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  const wash = dark ? darkWash : lightWash;
  const firstAccent = lines.length - accent;

  return (
    <section
      className={cn(
        "relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pb-16 lg:pt-44",
        dark ? "bg-ink-deep text-white" : "bg-cream",
      )}
    >
      {dark ? (
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -right-[10%] top-[-28%] size-[36rem] rounded-full",
            wash[washes[0]],
          )}
        />
        <div
          className={cn(
            "absolute -left-[12%] bottom-[-38%] size-[30rem] rounded-full",
            wash[washes[1]],
          )}
        />
      </div>

      <Container className="relative">
        {before ? <div className="mb-8">{before}</div> : null}
        <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>

        <h1
          data-motion-text="lines"
          data-motion-delay="0.1"
          className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
        >
          {lines.map((line, i) => (
            <span key={line}>
              <span className="motion-line-mask">
                <span
                  className={cn(
                    "motion-line",
                    i >= firstAccent && (dark ? "text-blue-200" : "text-brand-blue"),
                  )}
                >
                  {line}
                </span>
              </span>
              {i < lines.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        {lede ? (
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.45"
            className={cn(
              "mt-7 max-w-xl text-[1.0625rem] leading-relaxed sm:text-[1.125rem]",
              dark ? "text-white/65" : "text-ink-soft",
            )}
          >
            {lede}
          </p>
        ) : null}

        {actions ? (
          <div
            data-reveal="fade-up"
            data-reveal-delay="0.56"
            className="mt-9 flex flex-row flex-wrap items-center gap-3"
          >
            {actions}
          </div>
        ) : null}

        {stats?.length ? (
          <dl
            data-reveal="fade-up"
            data-reveal-delay="0.66"
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {stats.map((stat) => (
              // dt first for valid markup; flex order puts the number before the label.
              <div key={stat.label} className="flex items-center gap-2.5">
                <dt
                  className={cn(
                    "order-2 text-[0.9rem]",
                    dark ? "text-white/55" : "text-ink-soft",
                  )}
                >
                  {stat.label}
                </dt>
                <dd className="order-1 flex items-center gap-2.5 font-heading text-[1.15rem] tracking-[-0.03em]">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2 rounded-full",
                      stat.dot ?? (dark ? "bg-white/40" : "bg-ink/25"),
                    )}
                  />
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
      </Container>
    </section>
  );
}
