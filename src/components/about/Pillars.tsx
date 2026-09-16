import { Container, Section, Eyebrow } from "@/components/ui/Section";
import { pillars } from "@/data/about";
import { cn } from "@/lib/cn";

const accents = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
} as const;

/**
 * Mission left, pillars stacked right - asymmetric on purpose so this does not
 * read as another three-up card row after the events grid.
 */
export default function Pillars() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Mission</Eyebrow>
            <h2
              data-motion-text="words"
              className="mt-5 text-[2.25rem] leading-[1.03] sm:text-5xl"
            >
              Make the good stuff reachable from Nagpur.
            </h2>
            <p
              data-reveal="fade-up"
              className="mt-6 max-w-md text-[1.0375rem] leading-relaxed text-ink-soft"
            >
              Plenty of people here can build. What is harder to come by locally is the
              room, the mentor and the first opportunity. The chapter exists to supply
              those three things and then get out of the way.
            </p>
          </div>

          <ol data-reveal-group className="space-y-4">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.id}
                data-reveal-item
                className="card-inset group relative overflow-hidden p-8 sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
                    accents[pillar.accent],
                  )}
                />
                <div className="flex items-start gap-5 sm:gap-7">
                  <span className="label-caps text-[0.68rem] text-ink-soft/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.3rem] leading-[1.15] tracking-[-0.03em] sm:text-[1.55rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
