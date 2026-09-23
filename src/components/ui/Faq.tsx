import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/data/site";

export type FaqItem = { q: string; a: string };

/**
 * Question list on native <details>, so it opens with the keyboard and works
 * with JS off. The plus icon rotates into a minus on open.
 */
export default function Faq({
  items,
  eyebrow = "Questions",
  title,
  tone = "cream",
  id,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  tone?: "cream" | "paper";
  id?: string;
}) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div data-reveal-group className="mt-12 max-w-3xl">
          {items.map((faq) => (
            <details key={faq.q} data-reveal-item className="group border-b border-ink/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-medium tracking-[-0.02em] marker:hidden sm:text-[1.15rem]">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-paper transition-colors duration-300 group-open:bg-ink group-open:text-white"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-[0.975rem] leading-[1.75] text-ink-soft">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <p data-reveal="fade-up" className="mt-10 text-[0.95rem] text-ink-soft">
          Still stuck?{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </Section>
  );
}
