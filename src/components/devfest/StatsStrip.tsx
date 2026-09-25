import { Container } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";
import { Calendar, People, Routes, Ticket } from "@/components/devfest/icons";
import { devfestStats } from "@/data/devfest";
import { cn } from "@/lib/cn";

const icons = { people: People, routes: Routes, calendar: Calendar, ticket: Ticket } as const;

/** The template's stats band under About: icon, big number, small label. */
export default function StatsStrip() {
  return (
    <section aria-label="DevFest in numbers" className="border-y border-df-mist bg-white">
      <Container>
        <ul data-reveal-group className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 lg:grid-cols-4">
          {devfestStats.map((stat, i) => {
            const Icon = icons[stat.icon];
            return (
              <li key={stat.id} data-reveal-item className="flex items-center gap-4 lg:justify-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14",
                    i % 2 === 0 ? "bg-df-sky/10 text-df-blue" : "bg-df-amber/10 text-df-orange",
                  )}
                >
                  <Icon className="size-6 sm:size-7" />
                </span>
                <p className="min-w-0">
                  <span className="block font-df text-[1.6rem] font-bold leading-none tracking-[-0.02em] text-df-navy sm:text-[2rem]">
                    {stat.prefix}
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1.5 block text-[0.82rem] leading-snug text-df-slate sm:text-[0.85rem]">
                    {stat.label}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
