import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { DfArrow, DfButton, DfTag } from "@/components/devfest/ui";
import { ArrowDown } from "@/components/devfest/icons";
import FlightBoard from "@/components/devfest/FlightBoard";
import FlyingPath from "@/components/devfest/FlyingPath";
import { devfestHero } from "@/data/devfest";

/**
 * Hero, as in the template: the airport illustration full-bleed, copy on the
 * sky side, the DevFest lockup, orange + outline pills, and the hand-written
 * "Nagpur On a Higher Trajectory" note, whose planes fly their dashed paths
 * and drift with the pointer. The departures board runs along the foot, so
 * the countdown is on the first screen. (The jet that takes off as you
 * scroll away is TakeoffPlane, mounted beside this section in the page.)
 */
export default function DevfestHero() {
  return (
    <section
      id="top"
      data-mouse-parallax
      className="relative isolate flex flex-col overflow-hidden lg:min-h-[max(44rem,100svh)]"
    >
      <Image
        src="/devfest/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      {/* Keeps the copy readable. Stronger on phones, where the terminal sits
          behind the text; on desktop it only lifts the sky side. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-df-paper/90 via-df-paper/75 to-df-paper/10 lg:bg-linear-to-r lg:from-df-paper/85 lg:via-df-paper/45 lg:via-45% lg:to-transparent lg:to-65%"
      />

      <Container className="relative flex w-full flex-1 items-center pb-12 pt-28 sm:pt-32 lg:pb-14 lg:pt-28">
        <div className="max-w-[44rem]">
          <div data-reveal="fade-up">
            <DfTag caps={false}>{devfestHero.eyebrow}</DfTag>
          </div>

          <div data-reveal="scale" data-reveal-delay="0.1">
            <Image
              src="/devfest/devfest-logo.png"
              alt="DevFest Nagpur 2026"
              width={1600}
              height={497}
              priority
              sizes="(max-width: 768px) 92vw, 43rem"
              className="mt-7 h-auto w-full max-w-[43rem]"
            />
          </div>

          <h1
            data-reveal="fade-up"
            data-reveal-delay="0.25"
            className="mt-8 max-w-[38rem] font-df text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-df-navy sm:text-[2.1rem]"
          >
            {devfestHero.title}
          </h1>
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.35"
            className="mt-4 max-w-[38rem] text-[1rem] leading-[1.7] text-df-slate sm:text-[1.05rem]"
          >
            {devfestHero.sub}
          </p>

          <div data-reveal="fade-up" data-reveal-delay="0.45" className="mt-8 flex flex-wrap gap-3">
            <DfButton href={devfestHero.primary.href}>
              {devfestHero.primary.label}
              <DfArrow />
            </DfButton>
            <DfButton href={devfestHero.secondary.href} variant="outline">
              {devfestHero.secondary.label}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </DfButton>
          </div>
        </div>
      </Container>

      {/* Hand-written note: one plane climbs its trajectory, one comes in. */}
      <div
        aria-hidden="true"
        data-mouse-depth="0.025"
        className="pointer-events-none absolute right-[5%] top-[13%] hidden w-64 xl:block"
      >
        <p className="ml-10 rotate-[-9deg] font-df-script text-[2.15rem] font-semibold leading-[0.98] text-df-navy">
          {devfestHero.note.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <FlyingPath
          className="absolute -left-2 top-[7.5rem] w-40 text-df-navy/60"
          viewBox="0 0 160 150"
          d="M20 145 C 25 95, 45 55, 118 22"
          planeAt={{ x: 128, y: 18, rotate: -32 }}
          duration={6.5}
        />
        <FlyingPath
          className="absolute left-32 top-[8.5rem] w-32 text-df-navy/50"
          viewBox="0 0 130 170"
          d="M8 12 C 60 20, 95 70, 118 165"
          planeAt={{ x: 10, y: 12, rotate: 200 }}
          duration={6.5}
          delay={3.2}
        />
      </div>

      <FlightBoard />
    </section>
  );
}
