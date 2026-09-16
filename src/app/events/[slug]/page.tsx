import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import EventCard from "@/components/home/EventCard";
import EventDetailHero from "@/components/events/EventDetailHero";
import EventBody from "@/components/events/EventBody";
import { getAllSlugs, getEventBySlug, getRelatedEvents } from "@/data/events";
import { formatEventDateLong } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

/** Every event is known at build time, so prerender the lot. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event not found" };

  const description = `${formatEventDateLong(event)} at ${event.venue}. ${event.summary}`;
  return {
    title: event.title,
    description,
    openGraph: {
      title: `${event.title} | GDG Nagpur`,
      description,
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }: Params) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const related = getRelatedEvents(event);

  return (
    <>
      <EventDetailHero event={event} />
      <EventBody event={event} />

      {related.length ? (
        <Section tone="paper">
          <Container>
            <SectionHeader
              eyebrow="More like this"
              title="Other things worth your time."
              action={
                <ButtonLink href="/events" variant="outline">
                  All events
                </ButtonLink>
              }
            />
            <div
              data-reveal-group
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <EventCard key={item.id} event={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
