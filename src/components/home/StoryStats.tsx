import { Container, Eyebrow } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import { Circle, Quarter } from "@/components/ui/Shapes";
import { stats } from "@/data/home";
import { cn } from "@/lib/cn";

const dot = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
} as const;

/** Dark band: who we are, in a sentence and four numbers. */
export default function StoryStats() {
  return (
    <section
      data-parallax-section
      className="relative overflow-hidden bg-ink-deep py-20 text-white sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-30" />
      <div
        aria-hidden="true"
        data-parallax-layer
        data-parallax-speed="0.08"
        className="pointer-events-none absolute -right-28 -top-20 w-[24rem] text-white/[0.04] lg:w-[34rem]"
      >
        <Circle className="w-full" />
      </div>
      <div
        aria-hidden="true"
        data-parallax-layer
        data-parallax-speed="-0.05"
        className="pointer-events-none absolute -bottom-20 left-[-6rem] w-[18rem] text-white/[0.03] lg:w-[26rem]"
      >
        <Quarter className="w-full" />
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow tone="dark">The chapter</Eyebrow>
            <h2
              data-motion-text="words"
              className="mt-5 max-w-xl text-[2.25rem] leading-[1.03] sm:text-5xl lg:text-[3.5rem]"
            >
              Started in a college classroom. Now the room everyone in Nagpur tech ends up
              in.
            </h2>
            <p
              data-reveal="fade-up"
              className="mt-6 max-w-lg text-[1.0375rem] leading-relaxed text-white/60"
            >
              GDG Nagpur is volunteer-run and has been since day one. No tickets, no
              paywall, no upsell at the end of the talk. What we have is 15,000+ people
              who keep turning up, and a track record you can check.
            </p>
            <div data-reveal="fade-up" data-reveal-delay="0.1" className="mt-9">
              <ButtonLink href="/about" variant="onDark" size="lg">
                <span className="group inline-flex items-center gap-2">
                  Read our story
                  <ArrowIcon />
                </span>
              </ButtonLink>
            </div>
          </div>

          <div data-reveal-group className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-white/10">
            {stats.map((stat) => (
              <div
                key={stat.id}
                data-reveal-item
                className="group relative bg-ink-deep p-7 transition-colors duration-500 hover:bg-white/[0.04] sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-2.5 rounded-full transition-transform duration-500 group-hover:scale-150",
                    dot[stat.accent],
                  )}
                />
                <p className="mt-6 font-heading text-[2.5rem] leading-none tracking-[-0.04em] sm:text-[3.25rem]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2.5 text-[0.85rem] text-white/50 sm:text-[0.9rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
