import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import ShareOpportunityForm from "@/components/opportunities/ShareOpportunityForm";

export const metadata: Metadata = {
  title: "Share an Opportunity",
  description:
    "Share a job, internship, scholarship or 1:1 help request with the GDG Nagpur community. Every listing is reviewed and credits whoever posted it.",
};

const rules = [
  "Real openings only - no referral chains, paid courses or MLM.",
  "One listing per role. Edit rather than repost.",
  "Your name goes on the listing, so people know who to ask.",
  "Reviewed by the organizers, usually within a few days.",
];

export default function ShareOpportunityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pb-12 pt-28 sm:pt-32 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] top-[-30%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]" />
        </div>
        <Container className="relative">
          <Link
            href="/opportunities"
            className="press group inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-soft hover:text-ink"
          >
            <ArrowIcon className="size-4 rotate-180" />
            Opportunities
          </Link>
          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.98]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">Share something</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-brand-blue">worth applying to.</span>
            </span>
          </h1>
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.45"
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
          >
            One form for jobs, internships, scholarships and requests for help. Pick a type
            and it asks only for what that type needs.
          </p>
        </Container>
      </section>

      <Section tone="cream" pad="bottom">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>House rules</Eyebrow>
              <ul className="mt-6 space-y-4">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue"
                    />
                    <span className="text-[0.95rem] leading-[1.7] text-ink-soft">{rule}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Not wrapped in data-reveal: hidden fields cannot take focus. */}
            <ShareOpportunityForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
