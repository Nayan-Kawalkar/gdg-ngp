import { Container } from "@/components/ui/Section";
import { DfIntro, FlightPath, dfCardShadow } from "@/components/devfest/ui";
import { devfestDays, devfestScheduleIntro } from "@/data/devfest";
import { cn } from "@/lib/cn";

/** The two days as a pair of date cards, joined by a flight path. */
export default function ScheduleSection() {
  return (
    <section
      id="schedule"
      aria-labelledby="schedule-title"
      className="scroll-mt-20 bg-df-paper py-20 lg:py-28"
    >
      <Container>
        <DfIntro
          headingId="schedule-title"
          eyebrow={devfestScheduleIntro.eyebrow}
          title={devfestScheduleIntro.title}
          sub={devfestScheduleIntro.sub}
        />

        <div className="relative mt-12">
          <FlightPath
            className="pointer-events-none absolute -top-9 left-1/2 hidden w-28 -translate-x-1/2 text-df-sky/70 lg:block"
            viewBox="0 0 120 50"
            d="M6 44 C 30 8, 84 2, 108 22"
            planeAt={{ x: 108, y: 22, rotate: 32 }}
          />
          <ol data-reveal-group className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            {devfestDays.map((day, i) => (
              <li
                key={day.label}
                data-reveal-item
                className={cn("rounded-[1.75rem] bg-white p-6 sm:p-8", dfCardShadow)}
              >
                <div className="flex items-center gap-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl font-df",
                      i === 0 ? "bg-df-amber/10 text-df-orange" : "bg-df-midnight text-white",
                    )}
                  >
                    <span className="text-[2rem] font-bold leading-none">{day.day}</span>
                    <span className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
                      {day.month}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-df text-[1.4rem] font-bold text-df-navy">{day.label}</h3>
                    <p className="mt-0.5 text-[0.95rem] text-df-slate">{day.date}</p>
                  </div>
                </div>
                <p className="mt-6 text-[0.98rem] leading-[1.75] text-df-slate">{day.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
