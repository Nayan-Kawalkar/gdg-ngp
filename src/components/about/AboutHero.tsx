import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { communityPhotos } from "@/data/home";
import { socials } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Shorter than the home hero on purpose - this page's job is to get you
 * reading, so it stops well short of a full viewport. The 2x2 photo cluster
 * also keeps it visually distinct from home's single large card.
 */
const cluster = [
  { src: communityPhotos[3], className: "aspect-square translate-y-6" },
  { src: communityPhotos[6], className: "aspect-4/5" },
  { src: communityPhotos[9], className: "aspect-4/5 translate-y-6" },
  { src: communityPhotos[1], className: "aspect-square" },
];

export default function AboutHero() {
  return (
    <section
      data-mouse-parallax
      className="relative overflow-hidden bg-cream pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-44"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] top-[-18%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-green-mist),transparent_62%)]" />
        <div className="absolute -right-[8%] bottom-[-26%] size-[38rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-blue-mist),transparent_62%)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Eyebrow>About</Eyebrow>

            <h1
              data-motion-text="lines"
              data-motion-delay="0.1"
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
            >
              <span className="motion-line-mask">
                <span className="motion-line">A community,</span>
              </span>{" "}
              <span className="motion-line-mask">
                <span className="motion-line">not a</span>
              </span>{" "}
              <span className="motion-line-mask">
                <span className="motion-line text-brand-green">mailing list.</span>
              </span>
            </h1>

            <p
              data-reveal="fade-up"
              data-reveal-delay="0.5"
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
            >
              GDG Nagpur has been volunteer-run since 2019. No tickets, no paywall, no
              upsell at the end of the talk. What follows is how the chapter got here, what
              it stands for, and who actually does the work.
            </p>

            <div
              data-reveal="fade-up"
              data-reveal-delay="0.62"
              className="mt-9 flex flex-row flex-wrap items-center gap-3"
            >
              <ButtonLink href="#journey" variant="ink" size="lg">
                Read the journey
              </ButtonLink>
              <ButtonLink href={socials.discord} variant="paper" size="lg">
                Join the community
              </ButtonLink>
            </div>
          </div>

          <div
            data-reveal="scale"
            data-reveal-delay="0.3"
            data-mouse-depth="0.018"
            className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-none"
          >
            {cluster.map((item, i) => (
              <figure
                key={item.src}
                className={cn(
                  "relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-cream-dark sm:rounded-[2rem]",
                  item.className,
                )}
              >
                <Image
                  src={item.src}
                  alt="GDG Nagpur community"
                  fill
                  priority={i < 2}
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
