import { Container, Eyebrow } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";
import { Circle } from "@/components/ui/Shapes";
import { impactStats } from "@/data/about";
import { cn } from "@/lib/cn";

const dot = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
} as const;

/** Dark band. Deliberately different metrics from the home stats strip. */
export default function Impact() {
  return (
    <section
      data-parallax-section
      className="relative overflow-hidden bg-ink-deep py-20 text-white sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-30" />
      <div
        aria-hidden="true"
        data-parallax-layer
        data-parallax-speed="0.07"
        className="pointer-events-none absolute -left-24 -top-24 w-[22rem] text-white/[0.04] lg:w-[30rem]"
      >
        <Circle className="w-full" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">Impact</Eyebrow>
          <h2
            data-motion-text="words"
            className="mt-5 text-[2.25rem] leading-[1.03] sm:text-5xl lg:text-[3.25rem]"
          >
            What seven years adds up to.
          </h2>
        </div>

        <dl
          data-reveal-group
          className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              data-reveal-item
              className="group bg-ink-deep p-7 transition-colors duration-500 hover:bg-white/[0.04] sm:p-8"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block size-2.5 rounded-full transition-transform duration-500 group-hover:scale-150",
                  dot[stat.accent],
                )}
              />
              <dd className="mt-6 font-heading text-[2.5rem] leading-none tracking-[-0.04em] sm:text-[3rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-[0.95rem] font-medium">{stat.label}</dt>
              <dd className="mt-1.5 text-[0.82rem] leading-relaxed text-white/45">
                {stat.note}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
