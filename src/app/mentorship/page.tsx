import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MentorBadge } from "@/components/mentorship/MentorCard";
import MentorDirectory from "@/components/mentorship/MentorDirectory";
import HowItWorks from "@/components/mentorship/HowItWorks";
import MentorshipFaq from "@/components/mentorship/MentorshipFaq";
import { mentorStats } from "@/data/mentors";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "Free mentorship from working engineers, designers and product people. Browse the GDG Nagpur mentor directory and send a request.",
};

function DirectoryFallback() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-sticker h-[26rem] animate-pulse opacity-60" />
      ))}
    </div>
  );
}

export default function MentorshipPage() {
  const stats = mentorStats();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream pb-14 pt-32 sm:pt-36 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] top-[-25%] size-[36rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-green-mist),transparent_62%)]" />
          <div className="absolute -left-[12%] bottom-[-35%] size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_62%)]" />
        </div>

        <Container className="relative">
          <Eyebrow>Mentorship</Eyebrow>

          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">Free mentorship, from</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line">people who do the job.</span>
            </span>
          </h1>

          <p
            data-reveal="fade-up"
            data-reveal-delay="0.45"
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
          >
            Every mentor here was reviewed by the chapter before going live. Pick one, send
            a request, get an actual hour of their time. No fee, no membership.
          </p>

          <div
            data-reveal="fade-up"
            data-reveal-delay="0.58"
            className="mt-9 flex flex-row flex-wrap items-center gap-3"
          >
            <ButtonLink href="#directory" variant="ink" size="lg">
              Browse mentors
            </ButtonLink>
            <ButtonLink href="/mentorship/become-a-mentor" variant="paper" size="lg">
              Become a mentor
            </ButtonLink>
          </div>

          <dl
            data-reveal="fade-up"
            data-reveal-delay="0.68"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <div className="flex items-baseline gap-2.5">
              <dd className="font-heading text-[1.5rem] tracking-[-0.04em]">
                {stats.total}
              </dd>
              <dt className="text-[0.9rem] text-ink-soft">mentors available</dt>
            </div>
            <div className="flex items-baseline gap-2.5">
              <dd className="font-heading text-[1.5rem] tracking-[-0.04em]">
                {stats.areas}
              </dd>
              <dt className="text-[0.9rem] text-ink-soft">areas covered</dt>
            </div>
            <div className="flex items-baseline gap-2.5">
              <dd className="font-heading text-[1.5rem] tracking-[-0.04em]">Free</dd>
              <dt className="text-[0.9rem] text-ink-soft">always</dt>
            </div>
          </dl>
        </Container>
      </section>

      <HowItWorks />

      {/* Directory */}
      <Section id="directory" tone="cream">
        <Container>
          <SectionHeader
            eyebrow="The directory"
            title="Pick someone who has done it before."
            lede="Filter by what you need. Every badge on this page was earned through the chapter's review."
          />
          <div className="mt-12">
            {/* useSearchParams needs a Suspense boundary for static prerender. */}
            <Suspense fallback={<DirectoryFallback />}>
              <MentorDirectory />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Become a mentor band */}
      <section className="relative overflow-hidden bg-ink-deep py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
        <Container className="relative">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-6">
                <MentorBadge />
              </div>
              <h2
                data-motion-text="words"
                className="text-[2rem] leading-[1.05] sm:text-[2.75rem]"
              >
                Been doing this a while? Pass it on.
              </h2>
              <p
                data-reveal="fade-up"
                className="mt-5 text-[1.0375rem] leading-relaxed text-white/60"
              >
                An hour a month is enough to change how someone else&rsquo;s year goes. We review
                every application, and approved mentors go live with the badge.
              </p>
            </div>
            <ButtonLink href="/mentorship/become-a-mentor" variant="onDark" size="lg">
              Apply to mentor
            </ButtonLink>
          </div>
        </Container>
      </section>

      <MentorshipFaq />
    </>
  );
}
