import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import EventsHero from "@/components/events/EventsHero";
import EventsDirectory from "@/components/events/EventsDirectory";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Every event GDG Nagpur runs or has run - study jams, DevFests, bootcamps, workshops and more. Filter by status and format.",
};

/** Skeleton for the Suspense boundary that useSearchParams requires. */
function DirectoryFallback() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-sticker h-[32rem] animate-pulse opacity-60" />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <>
      <EventsHero />

      <Section tone="cream" pad="bottom">
        <Container>
          {/* useSearchParams needs a Suspense boundary for this route to stay
              statically prerenderable. */}
          <Suspense fallback={<DirectoryFallback />}>
            <EventsDirectory />
          </Suspense>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="card-inset flex flex-col items-start gap-6 p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
            <div>
              <h2 className="max-w-lg text-[1.75rem] leading-[1.1] sm:text-[2.25rem]">
                Want us to run something at your college or company?
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                We co-host study jams, workshops and build sprints with campuses and
                teams across Nagpur. Bring the room, we will bring the programme.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/collaborate" variant="ink" size="lg">
                Collaborate with us
              </ButtonLink>
              <ButtonLink href="/speak" variant="paper" size="lg">
                Apply to speak
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
