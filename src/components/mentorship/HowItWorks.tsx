import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Find someone",
    body: "Filter by what you actually need help with. Every mentor lists their areas and how much time they have.",
    accent: "bg-brand-blue",
  },
  {
    title: "Send a request",
    body: "One short form. Say what you want help with - a specific question gets a faster and better answer than 'can you mentor me'.",
    accent: "bg-brand-red",
  },
  {
    title: "Have the conversation",
    body: "They reply directly and you sort out a time. No fee, no membership, no catch. Come back whenever you need to.",
    accent: "bg-brand-green",
  },
];

export default function HowItWorks() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Three steps, no fee, no catch."
          lede="Mentors are working engineers, designers and PMs who volunteered their time. Treat the hour as the scarce thing it is."
        />

        <ol data-reveal-group className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal-item className="card-inset card-pop p-8 sm:p-9">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("size-2.5 rounded-full", step.accent)}
                />
                <span className="label-caps text-ink-soft/50">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-[1.3rem] tracking-[-0.03em] sm:text-[1.45rem]">
                {step.title}
              </h3>
              <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
