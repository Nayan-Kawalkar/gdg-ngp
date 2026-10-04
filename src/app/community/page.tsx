import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import {
  IconInstagram,
  IconLinkedIn,
  IconX,
  IconYouTube,
} from "@/components/ui/Icons";
import ChannelCards from "@/components/community/ChannelCards";
import { channelStats, conductPoints, conductUrl, startSteps } from "@/data/community";
import { communityPhotos } from "@/data/home";
import { socials } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join GDG Nagpur on Discord, WhatsApp and X. Where the community talks between events, and how to get started.",
};

const dot = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
} as const;

const follow = [
  { label: "X", handle: "@gdgnagpur", href: socials.x, Icon: IconX },
  { label: "Instagram", handle: "@gdgnagpur", href: socials.instagram, Icon: IconInstagram },
  { label: "LinkedIn", handle: "GDG Nagpur", href: socials.linkedin, Icon: IconLinkedIn },
  { label: "YouTube", handle: "@gdgnagpur", href: socials.youtube, Icon: IconYouTube },
];

export default function CommunityPage() {
  const total = Object.values(channelStats).reduce((sum, s) => sum + s.members, 0);

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Community"
        lines={["Where the chapter", "lives between events."]}
        lede="Events are a few days a month. The rest of the time it is questions, study-jam threads, job leads and people shipping things - in three places, all free."
        washes={["blue", "green"]}
        actions={
          <>
            <ButtonLink href={socials.whatsapp} variant="onDark" size="lg">
              Join WhatsApp
            </ButtonLink>
            <ButtonLink href={socials.discord} variant="blue" size="lg">
              Join Discord
            </ButtonLink>
          </>
        }
        stats={[
          {
            value: `${new Intl.NumberFormat("en-IN").format(total)}+`,
            label: "across channels",
            dot: "bg-brand-green",
          },
          { value: 3, label: "places to talk", dot: "bg-brand-blue" },
          { value: "Free", label: "always", dot: "bg-brand-yellow" },
        ]}
      />

      <Section tone="cream">
        <Container>
          <SectionHeader
            eyebrow="The rooms"
            title="Pick one. Or all three."
            lede="WhatsApp for announcements, Discord for conversation, X for following along live."
            className="mb-14 lg:mb-16"
          />
          <ChannelCards />
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="New here?"
            title="Your first week, in three steps."
          />
          <ol data-reveal-group className="mt-14 grid gap-5 md:grid-cols-3">
            {startSteps.map((step, i) => (
              <li key={step.title} data-reveal-item className="card-inset card-pop p-8 sm:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className={cn("size-2.5 rounded-full", dot[step.accent])} />
                  <span className="label-caps text-ink-soft/50">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.3rem] leading-tight tracking-[-0.03em] sm:text-[1.4rem]">
                  {step.title}
                </h3>
                <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Code of conduct - the footer's "Code of conduct" link lands here */}
      <Section id="code-of-conduct" tone="ink" className="scroll-mt-24 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow tone="dark">Code of conduct</Eyebrow>
              <h2
                data-motion-text="words"
                className="mt-5 text-[2.25rem] leading-[1.03] sm:text-5xl"
              >
                A room people want to come back to.
              </h2>
              <p data-reveal="fade-up" className="mt-5 max-w-md text-[1.0375rem] leading-relaxed text-white/60">
                Every space GDG Nagpur runs - online and in person - follows Google&rsquo;s
                community guidelines. The short version is on the right.
              </p>
              <div data-reveal="fade-up" className="mt-8">
                <ButtonLink href={conductUrl} variant="onDark">
                  Read the full guidelines
                </ButtonLink>
              </div>
            </div>
            <ul data-reveal-group className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10">
              {conductPoints.map((point, i) => (
                <li key={point} data-reveal-item className="flex gap-5 bg-ink-deep p-7 sm:p-8">
                  <span className="label-caps mt-1 text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] leading-[1.65] text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Follow along */}
      <Section tone="cream" className="overflow-hidden">
        <Container>
          <SectionHeader
            eyebrow="Follow along"
            title="Can't make it? Watch it happen."
            lede="Live threads on X, photos on Instagram, recordings on YouTube."
          />

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {communityPhotos.slice(4, 8).map((src, i) => (
              <figure
                key={src}
                data-image-reveal
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-cream-dark",
                  i % 2 === 1 && "lg:mt-10",
                )}
              >
                <Image
                  src={src}
                  alt="A GDG Nagpur event"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>

          <ul data-reveal-group className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {follow.map(({ label, handle, href, Icon }) => (
              <li key={label} data-reveal-item>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card-sticker card-pop group flex items-center gap-4 p-5"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-[1.05rem] tracking-[-0.02em]">{label}</span>
                    <span className="block truncate text-[0.82rem] text-ink-soft">{handle}</span>
                  </span>
                  <ArrowIcon className="size-4 -rotate-45 opacity-50" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
