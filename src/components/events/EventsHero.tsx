import { Container, Eyebrow } from "@/components/ui/Section";
import { eventCounts } from "@/data/events";
import { cn } from "@/lib/cn";

/**
 * Quiet hero - the grid below is the visual, so this just frames it.
 * Counts are derived from the data, never hardcoded.
 */
export default function EventsHero() {
  const counts = eventCounts();

  const summary = [
    { value: counts.past, label: counts.past === 1 ? "past" : "past", dot: "bg-ink/25" },
    { value: counts.ongoing, label: "happening now", dot: "bg-brand-green" },
    { value: counts.upcoming, label: "coming up", dot: "bg-brand-blue" },
  ];

  return (
    <section className="relative overflow-hidden bg-cream pb-12 pt-32 sm:pt-36 lg:pb-14 lg:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] top-[-30%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_62%)]" />
        <div className="absolute -left-[14%] bottom-[-40%] size-[28rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-red-mist),transparent_62%)]" />
      </div>

      <Container className="relative">
        <Eyebrow>Events</Eyebrow>

        <h1
          data-motion-text="lines"
          data-motion-delay="0.1"
          className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
        >
          <span className="motion-line-mask">
            <span className="motion-line">Everything the chapter</span>
          </span>{" "}
          <span className="motion-line-mask">
            <span className="motion-line">has ever run.</span>
          </span>
        </h1>

        <p
          data-reveal="fade-up"
          data-reveal-delay="0.45"
          className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
        >
          Filter by when it happened or what kind of thing it was. Past events link to
          their recap; upcoming ones link straight to registration.
        </p>

        <dl
          data-reveal="fade-up"
          data-reveal-delay="0.58"
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {summary.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span aria-hidden="true" className={cn("size-2 rounded-full", item.dot)} />
              <dd className="font-heading text-[1.15rem] tracking-[-0.03em]">
                {item.value}
              </dd>
              <dt className="text-[0.9rem] text-ink-soft">{item.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
