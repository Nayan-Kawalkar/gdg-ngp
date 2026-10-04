import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import OpportunityBoard from "@/components/opportunities/OpportunityBoard";
import { companiesHiring, opportunityCounts } from "@/data/opportunities";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Jobs, internships, scholarships and 1:1 help requests shared by the GDG Nagpur community, with every poster credited.",
};

function BoardFallback() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-sticker h-[22rem] animate-pulse opacity-60" />
      ))}
    </div>
  );
}

export default function OpportunitiesPage() {
  const counts = opportunityCounts();
  const summary = [
    { value: counts.jobs, label: counts.jobs === 1 ? "job" : "jobs", dot: "bg-brand-blue" },
    { value: counts.internships, label: counts.internships === 1 ? "internship" : "internships", dot: "bg-brand-green" },
    { value: counts.scholarships, label: counts.scholarships === 1 ? "scholarship" : "scholarships", dot: "bg-brand-yellow" },
    { value: counts.help, label: counts.help === 1 ? "help request" : "help requests", dot: "bg-brand-red" },
  ].filter((item) => item.value > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream pb-14 pt-32 sm:pt-36 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] top-[-28%] size-[36rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_62%)]" />
          <div className="absolute -left-[12%] bottom-[-38%] size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]" />
        </div>

        <Container className="relative">
          <Eyebrow>Opportunities</Eyebrow>
          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">Posted by people</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-brand-blue">you can name.</span>
            </span>
          </h1>
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.45"
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
          >
            Jobs, internships, scholarships and requests for help, shared by the
            community. Every listing is reviewed before it goes live and credits whoever
            posted it, so you always know who to ask.
          </p>

          <div
            data-reveal="fade-up"
            data-reveal-delay="0.56"
            className="mt-9 flex flex-row flex-wrap items-center gap-3"
          >
            <ButtonLink href="#board" variant="ink" size="lg">
              Browse the board
            </ButtonLink>
            <ButtonLink href="/opportunities/share" variant="paper" size="lg">
              Share an opportunity
            </ButtonLink>
          </div>

          <dl
            data-reveal="fade-up"
            data-reveal-delay="0.66"
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {summary.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span aria-hidden="true" className={`size-2 rounded-full ${item.dot}`} />
                <dd className="font-heading text-[1.15rem] tracking-[-0.03em]">{item.value}</dd>
                <dt className="text-[0.9rem] text-ink-soft">{item.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Companies hiring from the community - PRD 5.5 highlight. Hidden
          until there is at least one real company to show. */}
      {companiesHiring.length ? (
        <section className="relative overflow-hidden bg-ink-deep py-16 text-white sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
          <Container className="relative">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow tone="dark">Hiring from the community</Eyebrow>
                <h2
                  data-motion-text="words"
                  className="mt-5 max-w-xl text-[1.85rem] leading-[1.05] sm:text-[2.4rem]"
                >
                  Companies that came here looking for you.
                </h2>
              </div>
              <ButtonLink href="/jobs-in-nagpur" variant="onDark">
                Jobs in Nagpur
              </ButtonLink>
            </div>

            <ul data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {companiesHiring.map((company) => (
                <li key={company.name} data-reveal-item className="card-sticker-dark p-7">
                  <span className="label-caps text-white/45">{company.city}</span>
                  <h3 className="mt-4 font-heading text-[1.2rem] tracking-[-0.03em]">
                    {company.name}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] text-white/55">{company.note}</p>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.78rem] font-medium">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-green" />
                    {company.openRoles} open {company.openRoles === 1 ? "role" : "roles"}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* Board */}
      <Section id="board" tone="cream">
        <Container>
          <SectionHeader
            eyebrow="The board"
            title="Everything currently open."
            lede="Newest first. Open a listing for the full description and the apply link."
          />
          <div className="mt-12">
            <Suspense fallback={<BoardFallback />}>
              <OpportunityBoard />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Share band */}
      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="card-inset flex flex-col items-start gap-6 p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
            <div>
              <h2 className="max-w-lg text-[1.75rem] leading-[1.1] sm:text-[2.25rem]">
                Hiring, or know of something?
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                One form for jobs, internships, scholarships and help requests. Everything
                is reviewed before it goes live, and you are credited on the listing.
              </p>
            </div>
            <ButtonLink href="/opportunities/share" variant="ink" size="lg">
              Share an opportunity
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
