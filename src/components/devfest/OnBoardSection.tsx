import { Container } from "@/components/ui/Section";
import { DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { Badge, Board, Camera, Hammer, Seed, Stamp } from "@/components/devfest/icons";
import { devfestOnBoard, devfestOnBoardIntro } from "@/data/devfest";
import { cn } from "@/lib/cn";

const icons = { badge: Badge, board: Board, camera: Camera, seed: Seed, build: Hammer, stamp: Stamp } as const;

/** The small touches: six white cards with orange and blue icon tiles. */
export default function OnBoardSection() {
  return (
    <section aria-labelledby="onboard-title" className="bg-df-paper py-20 lg:py-28">
      <Container>
        <DfIntro
          headingId="onboard-title"
          eyebrow={devfestOnBoardIntro.eyebrow}
          title={devfestOnBoardIntro.title}
          sub={devfestOnBoardIntro.sub}
        />
        <ul data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {devfestOnBoard.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} data-reveal-item className={cn("rounded-3xl bg-white p-6 sm:p-7", dfCardShadow)}>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl",
                    i % 2 === 0 ? "bg-df-amber/10 text-df-orange" : "bg-df-sky/10 text-df-blue",
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-df text-[1.1rem] font-semibold text-df-navy">{item.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-[1.65] text-df-slate">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
