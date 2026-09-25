import { Container } from "@/components/ui/Section";
import { DfIntro, PlaneWindow } from "@/components/devfest/ui";
import { Briefcase, Code, People, Pin, Spark } from "@/components/devfest/icons";
import WindowShade from "@/components/devfest/WindowShade";
import { devfestReasons, devfestWhyIntro } from "@/data/devfest";
import { cn } from "@/lib/cn";

const icons = { code: Code, pin: Pin, people: People, briefcase: Briefcase, spark: Spark } as const;

/**
 * The template's "More Than Just a Conference": centred icon + title items in
 * alternating orange and blue, and an airplane window running off the right
 * edge of the page, looking out over the clouds.
 */
export default function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-br from-df-paper via-white to-df-sky/10 py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_19rem] xl:grid-cols-[1fr_23rem]">
          <div>
            <DfIntro
              headingId="why-title"
              eyebrow={devfestWhyIntro.eyebrow}
              title={devfestWhyIntro.title}
              sub={devfestWhyIntro.sub}
            />
            <ul data-reveal-group className="mt-12 flex flex-wrap justify-center gap-y-10 sm:-mx-4 lg:mt-14">
              {devfestReasons.map((reason, i) => {
                const Icon = icons[reason.icon];
                return (
                  <li key={reason.n} data-reveal-item className="w-full text-center sm:w-1/2 sm:px-4 xl:w-1/3">
                    <Icon
                      aria-hidden="true"
                      className={cn("mx-auto size-9", i % 2 === 0 ? "text-df-amber" : "text-df-blue")}
                    />
                    <h3 className="mt-4 font-df text-[1.05rem] font-semibold leading-snug text-df-navy">
                      {reason.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[19rem] text-[0.93rem] leading-[1.65] text-df-slate">
                      {reason.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The window runs off the page edge on desktop, as in the template */}
          <div data-reveal="scale" className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-none">
            <div className="lg:translate-x-[20%] xl:translate-x-[28%]">
              <PlaneWindow
                src="/devfest/sky-tower.jpg"
                imagePosition="56% 50%"
                sizes="(max-width: 1024px) 19rem, 23rem"
              >
                <WindowShade />
              </PlaneWindow>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
