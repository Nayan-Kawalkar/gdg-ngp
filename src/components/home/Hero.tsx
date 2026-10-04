import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { GDGDots, Ring } from "@/components/ui/Shapes";
import { IconArrowDown, IconPin } from "@/components/ui/Icons";
import { getFeaturedEvents } from "@/data/events";
import { communityPhotos, stats } from "@/data/home";
import { formatEventDate } from "@/lib/format";
import { site, socials } from "@/data/site";

/**
 * Hero. Everything animates through the shared data-attribute motion system
 * (see MotionProvider), so this stays a server component - the delays sequence
 * the entrance because all of it is on screen at load.
 */
export default function Hero() {
  const next = getFeaturedEvents(1)[0];
  const headlineStats = stats.slice(0, 2);

  return (
    <section
      data-mouse-parallax
      className="relative overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:flex lg:items-center lg:pb-20 lg:pt-36"
    >
      {/* Soft tonal wash instead of a hard-edged shape slab */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] top-[-20%] size-[46rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_65%)]" />
        <div className="absolute -left-[14%] bottom-[-24%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]" />
        <div
          data-mouse-depth="0.045"
          className="absolute left-[46%] top-[14%] hidden w-24 text-blue-soft/70 xl:block"
        >
          <Ring className="w-full animate-floaty" />
        </div>
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------- Copy ---------------- */}
          <div>
            <span
              data-reveal="fade-up"
              className="chip px-3.5 py-2 text-[0.8rem] text-ink-soft"
            >
              <GDGDots className="size-4" />
              {site.city}
              <span aria-hidden="true" className="mx-0.5 h-3 w-px bg-ink/12" />
              Google Developer Groups
            </span>

            <h1
              data-motion-text="lines"
              data-motion-delay="0.15"
              className="mt-7 text-[clamp(2.75rem,7.5vw,5.25rem)] leading-[0.95]"
            >
              <span className="motion-line-mask">
                <span className="motion-line">Build.</span>
              </span>{" "}
              <span className="motion-line-mask">
                <span className="motion-line">Learn.</span>
              </span>{" "}
              <span className="motion-line-mask">
                <span className="motion-line text-brand-blue">Grow together.</span>
              </span>
            </h1>

            <p
              data-reveal="fade-up"
              data-reveal-delay="0.55"
              className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
            >
              The developer community for Nagpur. We run events where you build something
              real, connect you with mentors for free, and put opportunities in front of
              you.
            </p>

            <div
              data-reveal="fade-up"
              data-reveal-delay="0.68"
              className="mt-8 flex flex-row flex-wrap items-center gap-3"
            >
              <ButtonLink href={socials.discord} variant="ink" size="lg">
                Join the community
              </ButtonLink>
              <ButtonLink href="/events" variant="paper" size="lg">
                See upcoming events
              </ButtonLink>
            </div>

            <dl
              data-reveal="fade-up"
              data-reveal-delay="0.8"
              className="mt-10 flex items-center gap-8 border-t border-black/8 pt-7"
            >
              {headlineStats.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-[1.75rem] leading-none tracking-[-0.04em]">
                    {new Intl.NumberFormat("en-IN").format(stat.value)}
                    {stat.suffix}
                  </dd>
                  <dd className="mt-1.5 text-[0.82rem] text-ink-soft">{stat.label}</dd>
                </div>
              ))}
              <div className="hidden sm:block">
                <dt className="sr-only">Cost</dt>
                <dd className="font-heading text-[1.75rem] leading-none tracking-[-0.04em]">
                  Free
                </dd>
                <dd className="mt-1.5 text-[0.82rem] text-ink-soft">Always has been</dd>
              </div>
            </dl>
          </div>

          {/* ---------------- Visual ---------------- */}
          <div
            data-reveal="scale"
            data-reveal-delay="0.35"
            data-mouse-depth="0.02"
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <figure className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] border border-black/8 bg-cream-dark sm:aspect-square lg:aspect-4/5">
              <Image
                src={communityPhotos[0]}
                alt="Developers at a GDG Nagpur event"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-deep/85 to-transparent"
              />

              {next ? (
                <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <Link
                    href="/events"
                    className="group flex items-center gap-4 rounded-[1.75rem] bg-paper/95 p-4 backdrop-blur-sm transition-colors hover:bg-paper"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-soft/70">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-brand-green" />
                        </span>
                        Next up
                      </span>
                      <span className="mt-1.5 block truncate font-heading text-[1.05rem] tracking-[-0.02em]">
                        {next.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2 truncate text-[0.8rem] text-ink-soft">
                        <span>{formatEventDate(next)}</span>
                        <span aria-hidden="true" className="size-1 rounded-full bg-ink/20" />
                        <span className="inline-flex min-w-0 items-center gap-1">
                          <IconPin className="size-3.5 shrink-0" />
                          <span className="truncate">{next.venue}</span>
                        </span>
                      </span>
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <ArrowIcon className="size-4" />
                    </span>
                  </Link>
                </figcaption>
              ) : null}
            </figure>

            {/* Sticker accents, above the photo so the overlap reads as deliberate */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-6 z-10 size-20 rotate-12 rounded-[1.75rem] bg-brand-yellow sm:-right-6 sm:-top-8 sm:size-24"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-7 top-1/2 z-10 size-16 -translate-y-1/2 rounded-full bg-brand-green sm:size-20"
            />
          </div>
        </div>

        <a
          href="#events"
          className="press mt-14 hidden items-center gap-2.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink lg:inline-flex"
        >
          Scroll
          <span className="flex size-9 items-center justify-center rounded-full border border-ink/12">
            <IconArrowDown className="size-4 animate-floaty" />
          </span>
        </a>
      </Container>
    </section>
  );
}
