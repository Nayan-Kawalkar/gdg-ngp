import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { IconPin } from "@/components/ui/Icons";
import { opportunities, type Opportunity } from "@/data/opportunities";
import { cn } from "@/lib/cn";

const typeTint: Record<Opportunity["type"], string> = {
  Job: "bg-brand-blue text-white",
  Internship: "bg-brand-green text-white",
  Scholarship: "bg-brand-yellow text-ink",
  "1:1 Help": "bg-brand-red text-white",
};

function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <a
      href="/opportunities"
      className="card-inset card-pop group mx-2.5 flex w-[19rem] shrink-0 flex-col p-7 sm:w-[21rem]"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "label-caps inline-flex rounded-full px-3 py-1.5 text-[0.66rem]",
            typeTint[item.type],
          )}
        >
          {item.type}
        </span>
        <ArrowIcon className="size-4 text-ink-soft" />
      </div>

      <h3 className="mt-5 line-clamp-2 font-heading text-[1.15rem] leading-[1.15] tracking-[-0.03em]">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.9rem] text-ink-soft">{item.company}</p>

      <div className="mt-6 flex items-center gap-2 border-t border-ink/8 pt-4 text-[0.8rem] text-ink-soft/80">
        <IconPin className="size-3.5 shrink-0" />
        <span className="truncate">{item.city} &middot; {item.workMode}</span>
      </div>
      <p className="mt-2 text-[0.78rem] text-ink-soft/60">Posted by {item.postedBy}</p>
    </a>
  );
}

/**
 * Two counter-scrolling rows so the board reads as "always moving" without
 * needing a carousel the user has to operate.
 */
export default function OpportunitiesStrip() {
  const half = Math.ceil(opportunities.length / 2);
  const rowA = opportunities.slice(0, half);
  const rowB = opportunities.slice(half);

  return (
    <Section tone="paper" className="overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Opportunities"
          title="Jobs, internships and help, posted by people you can name."
          lede="Every listing carries who shared it, so you always know who to ask about it."
          action={
            <ButtonLink href="/opportunities" variant="outline">
              Browse the board
            </ButtonLink>
          }
        />
      </Container>

      <div data-reveal="fade-in" className="mt-14 space-y-5 lg:mt-16">
        <Marquee duration={52}>
          {rowA.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </Marquee>
        <Marquee duration={58} reverse>
          {rowB.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </Marquee>
      </div>

      <Container className="mt-12">
        <div
          data-reveal="fade-up"
          className="card-inset flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div>
            <h3 className="text-[1.25rem] sm:text-[1.4rem]">Hiring, or know of something?</h3>
            <p className="mt-2 max-w-md text-[0.925rem] text-ink-soft">
              One form for jobs, internships, scholarships and 1:1 help requests. We review
              before it goes live.
            </p>
          </div>
          <ButtonLink href="/opportunities/share" variant="ink">
            Share an opportunity
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
