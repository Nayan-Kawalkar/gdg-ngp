import type { Metadata } from "next";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import Faq from "@/components/ui/Faq";
import Counter from "@/components/ui/Counter";
import { IconCalendar, IconDownload, IconMail } from "@/components/ui/Icons";
import AudienceMix from "@/components/collaborate/AudienceMix";
import SponsorTiers from "@/components/collaborate/SponsorTiers";
import CollaborateForm from "@/components/collaborate/CollaborateForm";
import {
  audienceStats,
  coHostSteps,
  collaborateFaqs,
  pastPartners,
  pastVenues,
  type Accent,
} from "@/data/collaborate";
import { site, socials } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Sponsor a GDG Nagpur event or co-host one with us. Reach thousands of students and developers in Nagpur - sponsorship tiers, audience numbers and an enquiry form.",
};

const dot: Record<Accent, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

export default function CollaboratePage() {
  const partners = pastPartners();
  const venues = pastVenues();

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Collaborate"
        lines={["Put your name in front", "of Nagpur's builders."]}
        lede="Sponsor an event, co-host one on your campus, or bring us a problem worth a hackathon. Everything we run is free to attend - partners are how that stays true."
        washes={["blue", "green"]}
        actions={
          <>
            <ButtonLink href="#sponsor" variant="onDark" size="lg">
              Sponsor an event
            </ButtonLink>
            <ButtonLink href="#partner" variant="blue" size="lg">
              Co-host with us
            </ButtonLink>
          </>
        }
        stats={audienceStats.slice(0, 3).map((s) => ({
          value: `${new Intl.NumberFormat("en-IN").format(s.value)}${s.suffix}`,
          label: s.label.toLowerCase(),
          dot: dot[s.accent],
        }))}
      />

      {/* Get audience */}
      <Section id="audience" tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <SectionHeader
                eyebrow="The audience"
                title="Who you reach when you back us."
                lede="Students who will be hiring-age next year, and the developers already building here. They show up in person and stay for the whole day."
              />
              <div data-reveal-group className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-ink/8">
                {audienceStats.map((stat) => (
                  <div key={stat.id} data-reveal-item className="bg-paper p-6 sm:p-8">
                    <span aria-hidden="true" className={cn("block size-2.5 rounded-full", dot[stat.accent])} />
                    <p className="mt-5 font-heading text-[2.25rem] leading-none tracking-[-0.045em] sm:text-[2.75rem]">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-[0.85rem] text-ink-soft">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal="fade-up" className="card-inset p-8 sm:p-10">
              <Eyebrow>Who is in the room</Eyebrow>
              <div className="mt-8">
                <AudienceMix />
              </div>
              <p className="mt-8 text-[0.82rem] text-ink-soft/70">
                Share of registrations across the last twelve months of events.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tiers */}
      <Section id="sponsor" tone="cream" className="scroll-mt-16">
        <Container>
          <SectionHeader
            eyebrow="Sponsorship"
            title="Three ways to back an event."
            lede="No rate card - every package is scoped to the event. These are the starting shapes."
          />
          <SponsorTiers />
        </Container>
      </Section>

      {/* Past partners */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Backed by"
            title="Who has been in our corner."
            lede="Sponsors and the venues that opened their doors."
          />
          <ul data-reveal-group className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ...partners.map((name) => ({ name, kind: "Sponsor" })),
              ...venues.map((name) => ({ name, kind: "Venue" })),
            ].map((p) => (
              <li
                key={p.name}
                data-reveal-item
                className="card-inset group flex min-h-32 flex-col justify-between p-6"
              >
                <span className="label-caps text-[0.64rem] text-ink-soft/50">{p.kind}</span>
                {/* TODO(logos): swap the wordmark for the partner's logo once permitted. */}
                <span className="font-heading text-[1.15rem] leading-tight tracking-[-0.03em] transition-colors duration-300 group-hover:text-blue-deep">
                  {p.name}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Co-host */}
      <Section id="partner" tone="ink" className="scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
        <Container className="relative">
          <SectionHeader
            tone="dark"
            eyebrow="Co-host with us"
            title="Your room, our programme."
            lede="Colleges, companies and other communities co-host study jams, workshops and hackathons with us all year."
            action={
              <ButtonLink href="#enquire" variant="onDark">
                Pitch an event
              </ButtonLink>
            }
          />
          <ol data-reveal-group className="mt-14 grid gap-4 md:grid-cols-3">
            {coHostSteps.map((step, i) => (
              <li key={step.title} data-reveal-item className="card-sticker-dark card-pop p-8 sm:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className={cn("size-2.5 rounded-full", dot[step.accent])} />
                  <span className="label-caps text-white/45">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.35rem] tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-white/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Enquiry */}
      <Section id="enquire" tone="cream" className="scroll-mt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Get in touch</Eyebrow>
              <h2 data-motion-text="words" className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.6rem]">
                Start with a message.
              </h2>
              <p className="mt-5 text-[0.975rem] leading-[1.7] text-ink-soft">
                Tell us roughly what you have in mind and an organizer will set up a call.
                Prefer to skip the form?
              </p>
              <ul className="mt-8 space-y-2">
                {[
                  { Icon: IconCalendar, label: "Book a 20-minute call", href: socials.calendly },
                  { Icon: IconDownload, label: "Download the media kit", href: socials.mediaKit },
                  { Icon: IconMail, label: site.email, href: `mailto:${site.email}` },
                ].map(({ Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                      className="press group flex items-center gap-3.5 rounded-2xl py-2.5 pr-3 text-[0.95rem] font-medium hover:text-blue-deep"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/8 bg-paper transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                        <Icon className="size-[1.1rem]" />
                      </span>
                      <span className="min-w-0 break-words">{label}</span>
                      <ArrowIcon className="ml-auto size-3.5 shrink-0 opacity-40" />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Not wrapped in data-reveal: hidden fields cannot take focus. */}
            <CollaborateForm />
          </div>
        </Container>
      </Section>

      <Faq items={collaborateFaqs} title="What partners usually ask." tone="paper" />
    </>
  );
}
