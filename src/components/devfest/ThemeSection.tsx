import { Container } from "@/components/ui/Section";
import { DfArrow, DfButton, DfIntro, PlaneWindow, dfCardShadow } from "@/components/devfest/ui";
import { Plane } from "@/components/devfest/icons";
import WindowShade from "@/components/devfest/WindowShade";
import { devfestTheme } from "@/data/devfest";
import { cn } from "@/lib/cn";

/**
 * "The theme" in the template's About layout: copy on the left, an airplane
 * window with luggage tags on the right (its shade lifts as you arrive, and
 * can be pulled), then the four-step journey on a dashed route line and the
 * content's pull line.
 */
export default function ThemeSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-br from-yellow-mist via-df-paper to-df-mist/70 py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <DfIntro
              eyebrow={devfestTheme.eyebrow}
              title={devfestTheme.title}
              sub={devfestTheme.sub}
            />
            <div data-reveal="fade-up" className="mt-8">
              <DfButton href="#routes" variant="outline">
                Explore the routes
                <DfArrow />
              </DfButton>
            </div>
          </div>

          <div data-reveal="scale" className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm">
            <PlaneWindow src="/devfest/gate-d26.jpg" imagePosition="54% 50%">
              <WindowShade />
            </PlaneWindow>
            {/* Luggage tags, joined by a string, as in the template - swinging gently */}
            <div aria-hidden="true" className="df-sway pointer-events-none absolute -right-3 top-[16%] z-10 sm:-right-10">
              <span className="block rotate-[-8deg] rounded-xl border-2 border-df-amber bg-white px-4 py-2 font-df text-[1.15rem] font-extrabold tracking-wide text-df-orange shadow-[0_12px_24px_-14px_rgba(4,30,68,0.5)]">
                NAGPUR
                <Plane className="ml-1.5 inline size-4 -rotate-12 text-df-blue" />
              </span>
              <span className="mx-auto block h-7 w-px rotate-[-8deg] bg-df-slate/50" />
              <span className="block rotate-[-6deg] rounded-xl bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] px-4 py-2.5 font-df leading-tight text-white shadow-[0_14px_28px_-14px_rgba(254,76,1,0.8)]">
                <span className="block text-[1rem] font-extrabold">NAG → NEXT</span>
                <span className="block text-[0.68rem] font-semibold tracking-[0.18em] opacity-85">
                  FLIGHT DF26
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* The journey: four steps on a dashed route */}
        <ol data-reveal-group className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[3.25rem] hidden border-t-2 border-dashed border-df-sky/40 lg:block"
          />
          {devfestTheme.steps.map((step) => (
            <li
              key={step.n}
              data-reveal-item
              className={cn("relative rounded-3xl bg-white p-6 sm:p-7", dfCardShadow)}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] font-df text-[0.95rem] font-bold text-white">
                {step.n}
              </span>
              <h3 className="mt-5 font-df text-[1.15rem] font-semibold text-df-navy">{step.title}</h3>
              <p className="mt-2 text-[0.93rem] leading-[1.65] text-df-slate">{step.body}</p>
            </li>
          ))}
        </ol>

        <blockquote
          data-reveal="fade-up"
          className="mx-auto mt-14 max-w-3xl text-center font-df text-[1.2rem] font-medium leading-[1.55] text-df-navy sm:text-[1.4rem]"
        >
          <Plane aria-hidden="true" className="mx-auto mb-4 size-7 -rotate-12 text-df-amber" />
          &ldquo;{devfestTheme.pull}&rdquo;
        </blockquote>
      </Container>
    </section>
  );
}
