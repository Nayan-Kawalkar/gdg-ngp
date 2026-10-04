import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import NewsCard from "@/components/news/NewsCard";
import { latestNews } from "@/data/news";

export default function TechNews() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeader
          eyebrow="Tech news"
          title="What moved recently."
          lede="Curated by the organizers. Three stories, no filler, each one with the part that matters to you."
          action={
            <ButtonLink href="/tech-news" variant="outline">
              All news
            </ButtonLink>
          }
        />

        <div data-reveal-group className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {latestNews(3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
