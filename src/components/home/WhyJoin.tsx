import { Container, Section, SectionHeader } from "@/components/ui/Section";
import {
  IconBadge,
  IconBriefcase,
  IconCode,
  IconCompass,
  IconUsers,
} from "@/components/ui/Icons";
import { valueProps } from "@/data/home";
import { cn } from "@/lib/cn";

const icons = {
  learn: IconCode,
  mentorship: IconCompass,
  network: IconUsers,
  opportunities: IconBriefcase,
  recognition: IconBadge,
} as const;

const accents = {
  blue: "bg-blue-mist text-blue-deep",
  red: "bg-red-mist text-red-deep",
  yellow: "bg-yellow-mist text-amber",
  green: "bg-green-mist text-green-deep",
} as const;

/**
 * Value props. First card spans two columns on desktop so the grid reads as an
 * editorial layout rather than five identical boxes.
 */
export default function WhyJoin() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          eyebrow="Why join"
          title="Five reasons that this is worth your weekend."
          lede="Not a mailing list. The chapter exists to get you further than you would get alone."
        />

        <div
          data-reveal-group
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6"
        >
          {valueProps.map((prop, index) => {
            const Icon = icons[prop.id as keyof typeof icons] ?? IconCode;
            // Two wide cards on the first row, three narrower ones on the second.
            const span = index < 2 ? "lg:col-span-3" : "lg:col-span-2";

            return (
              <article
                key={prop.id}
                data-reveal-item
                className={cn(
                  "card-inset card-pop group relative flex flex-col overflow-hidden p-8 sm:p-9",
                  span,
                )}
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110",
                    accents[prop.accent],
                  )}
                >
                  <Icon className="size-6" />
                </span>

                <h3 className="mt-7 text-[1.3rem] tracking-[-0.03em] sm:text-[1.45rem]">{prop.title}</h3>
                <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">
                  {prop.body}
                </p>

                <span
                  aria-hidden="true"
                  className="label-caps mt-auto pt-9 text-[0.68rem] text-ink-soft/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
