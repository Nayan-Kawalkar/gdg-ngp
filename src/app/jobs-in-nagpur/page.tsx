import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import OpportunityBoard from "@/components/opportunities/OpportunityBoard";
import CopyLinkButton from "@/components/opportunities/CopyLinkButton";
import { nagpurJobs } from "@/data/opportunities";

const description =
  "Jobs and internships in Nagpur, shared by people in the GDG Nagpur community - with every poster credited so you know who to ask.";

// Its own title, description and OG tags: PRD 5.5 wants this page shared on
// socials independently of the main board.
export const metadata: Metadata = {
  title: "Jobs in Nagpur",
  description,
  openGraph: {
    title: "Jobs in Nagpur | GDG Nagpur",
    description,
    type: "website",
  },
};

function BoardFallback() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-sticker h-[22rem] animate-pulse opacity-60" />
      ))}
    </div>
  );
}

export default function JobsInNagpurPage() {
  const jobs = nagpurJobs();
  const posters = new Set(jobs.map((j) => j.postedBy)).size;
  const companies = new Set(jobs.map((j) => j.company)).size;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-deep pb-16 pt-32 text-white sm:pt-36 lg:pb-20 lg:pt-44">
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[8%] top-[-30%] size-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.28),transparent_62%)]" />

        <Container className="relative">
          <Eyebrow tone="dark">Jobs in Nagpur</Eyebrow>
          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-6 max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.96]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">Work in Nagpur,</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-blue-200">shared by people</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-blue-200">you can name.</span>
            </span>
          </h1>
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.5"
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/65 sm:text-[1.125rem]"
          >
            Every job and internship here is in Nagpur and was posted by someone in the
            community. Their name is on the listing, so you can ask them what the team is
            actually like before you apply.
          </p>

          <div
            data-reveal="fade-up"
            data-reveal-delay="0.6"
            className="mt-9 flex flex-row flex-wrap items-center gap-3"
          >
            <ButtonLink href="#jobs" variant="onDark" size="lg">
              See the jobs
            </ButtonLink>
            <CopyLinkButton />
          </div>

          <dl
            data-reveal="fade-up"
            data-reveal-delay="0.7"
            className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-[1.75rem] bg-white/10"
          >
            {[
              { v: jobs.length, l: jobs.length === 1 ? "open role" : "open roles" },
              { v: companies, l: companies === 1 ? "company" : "companies" },
              { v: posters, l: posters === 1 ? "person sharing" : "people sharing" },
            ].map((s) => (
              <div key={s.l} className="bg-ink-deep p-5 sm:p-6">
                <dd className="font-heading text-[1.75rem] leading-none tracking-[-0.04em] sm:text-[2.25rem]">
                  {s.v}
                </dd>
                <dt className="mt-2 text-[0.8rem] text-white/50 sm:text-[0.85rem]">{s.l}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section id="jobs" tone="cream">
        <Container>
          <SectionHeader
            eyebrow="Open now"
            title="Jobs and internships in the city."
            lede="Newest first. Open one for the description, the apply link and who shared it."
            action={
              <ButtonLink href="/opportunities" variant="outline">
                All opportunities
              </ButtonLink>
            }
          />
          <div className="mt-12">
            <Suspense fallback={<BoardFallback />}>
              <OpportunityBoard nagpurOnly types={["Job", "Internship"]} />
            </Suspense>
          </div>
        </Container>
      </Section>

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="card-inset flex flex-col items-start gap-6 p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
            <div>
              <h2 className="max-w-lg text-[1.75rem] leading-[1.1] sm:text-[2.25rem]">
                Hiring in Nagpur?
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                Post it here and it reaches the people who show up to every study jam and
                DevFest in the city. Reviewed, credited to you, and free.
              </p>
            </div>
            <ButtonLink href="/opportunities/share" variant="ink" size="lg">
              Share a job
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
