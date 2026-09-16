import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconExternal } from "@/components/ui/Icons";
import { newsItems } from "@/data/home";
import { formatNewsDate } from "@/lib/format";
import { cn } from "@/lib/cn";

const categoryTint = {
  AI: "bg-blue-mist text-blue-deep",
  Web: "bg-yellow-mist text-amber",
  Mobile: "bg-green-mist text-green-deep",
  Cloud: "bg-blue-mist text-blue-deep",
  Career: "bg-red-mist text-red-deep",
  Industry: "bg-cream-dark text-ink-soft",
} as const;

export default function TechNews() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeader
          eyebrow="Tech news"
          title="What actually moved this week."
          lede="Curated by the organizers. Three stories, no filler, each one with the part that matters to you."
          action={
            <ButtonLink href="/tech-news" variant="outline">
              All news
            </ButtonLink>
          }
        />

        <div data-reveal-group className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
              data-reveal-item
              className="card-sticker group flex flex-col p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.1em]",
                    categoryTint[item.category],
                  )}
                >
                  {item.category}
                </span>
                <time
                  dateTime={item.publishedAt}
                  className="text-[0.78rem] text-ink-soft/70"
                >
                  {formatNewsDate(item.publishedAt)}
                </time>
              </div>

              <h3 className="mt-6 text-[1.3rem] leading-[1.12] sm:text-[1.4rem]">
                {item.headline}
              </h3>
              <p className="mt-3 text-[0.925rem] leading-relaxed text-ink-soft">
                {item.summary}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-7">
                <span className="truncate text-[0.82rem] text-ink-soft/70">
                  {item.source}
                </span>
                <span className="inline-flex items-center gap-1.5 font-heading text-[0.88rem] font-medium">
                  Read
                  <IconExternal className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
