import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { IconExternal } from "@/components/ui/Icons";
import NewsBoard from "@/components/news/NewsBoard";
import NewsletterForm from "@/components/news/NewsletterForm";
import { categoryTint, externalProps } from "@/components/news/NewsCard";
import { newsCategories, sortedNews } from "@/data/news";
import { formatNewsDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Tech News",
  description:
    "What moved recently in AI, web, mobile, cloud and careers - curated by the GDG Nagpur organizers, with the part that matters to you.",
};

function BoardFallback() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-sticker h-[18rem] animate-pulse opacity-60" />
      ))}
    </div>
  );
}

export default function TechNewsPage() {
  const all = sortedNews();
  const lead = all[0];

  return (
    <>
      <PageHero
        eyebrow="Tech news"
        lines={["What moved", "recently."]}
        lede="Curated by the organizers, not an algorithm. Each story comes with the one line on why it matters if you build things in Nagpur."
        washes={["yellow", "blue"]}
        actions={
          <>
            <ButtonLink href="#stories" variant="ink" size="lg">
              Read the stories
            </ButtonLink>
            <ButtonLink href="#newsletter" variant="paper" size="lg">
              Get it by email
            </ButtonLink>
          </>
        }
        stats={[
          { value: all.length, label: "stories", dot: "bg-brand-yellow" },
          { value: newsCategories.length, label: "categories", dot: "bg-brand-blue" },
          { value: "Weekly", label: "updates", dot: "bg-brand-green" },
        ]}
      />

      {/* Lead story */}
      {lead ? (
        <Section tone="cream" pad="bottom">
          <Container>
            <a
              href={lead.href}
              {...externalProps(lead.href)}
              data-reveal="fade-up"
              className="card-sticker card-pop group grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div
                data-image-reveal
                className={cn(
                  "relative flex min-h-56 flex-col justify-between overflow-hidden p-8 sm:p-10 lg:min-h-[22rem]",
                  categoryTint[lead.category],
                )}
              >
                <span className="label-caps">Lead story &middot; {lead.category}</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-24 -right-16 size-72 rounded-full bg-current opacity-[0.07] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <time
                  dateTime={lead.publishedAt}
                  className="relative font-heading text-[3.5rem] leading-none tracking-[-0.05em] sm:text-[4.5rem]"
                >
                  {formatNewsDate(lead.publishedAt)}
                </time>
              </div>

              <div className="flex flex-col p-8 sm:p-10 lg:p-12">
                <span className="text-[0.85rem] text-ink-soft/70">{lead.source}</span>
                <h2 className="mt-4 text-[2rem] leading-[1.04] tracking-[-0.04em] sm:text-[2.6rem]">
                  {lead.headline}
                </h2>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.7] text-ink-soft">
                  {lead.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-heading text-[0.95rem] font-medium">
                  Read the story
                  <span className="flex size-8 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
                    <IconExternal className="size-3.5" />
                  </span>
                </span>
              </div>
            </a>
          </Container>
        </Section>
      ) : null}

      <Section id="stories" tone="paper" className="scroll-mt-16">
        <Container>
          <SectionHeader
            eyebrow="All stories"
            title="Filter by what you build."
            lede="Newest first. Every card opens the original source in a new tab."
          />
          <div className="mt-12">
            {/* useSearchParams needs a Suspense boundary for static prerender. */}
            <Suspense fallback={<BoardFallback />}>
              <NewsBoard leadId={lead?.id} />
            </Suspense>
          </div>
        </Container>
      </Section>

      <CtaBand
        id="newsletter"
        tone="cream"
        className="scroll-mt-16"
        title="The week's stories, once a week."
        body="One email on Friday: the stories above plus the next event. Unsubscribe in one click."
        actions={<NewsletterForm />}
      />
    </>
  );
}
