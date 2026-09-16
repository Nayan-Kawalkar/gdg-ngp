import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import EventCard from "@/components/home/EventCard";
import { getFeaturedEvents } from "@/data/events";

export default function LatestEvents() {
  const featured = getFeaturedEvents(3);

  return (
    <Section id="events" tone="cream">
      <Container>
        <SectionHeader
          eyebrow="What's on"
          title="The next few things worth showing up for."
          lede="Ongoing and upcoming, soonest first. Seats are first-come and the popular ones close early."
          action={
            <ButtonLink href="/events" variant="outline">
              All events
            </ButtonLink>
          }
        />

        <div
          data-reveal-group
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
