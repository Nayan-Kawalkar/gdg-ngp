import Marquee from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Section";
import { Plane, Suitcase } from "@/components/devfest/icons";
import { devfestTopics } from "@/data/devfest";
import { cn } from "@/lib/cn";

/* Bags cycle through the Google colours, the DevFest blues and orange, and
   three shapes: a hard case, a tall trolley case (with wheels), a duffel. */
const bagColours = [
  "bg-df-blue",
  "bg-brand-red",
  "bg-brand-yellow",
  "bg-brand-green",
  "bg-df-amber",
  "bg-df-midnight",
  "bg-df-sky",
];
const bagShapes = [
  { body: "h-14 rounded-[14px]", wheels: false },
  { body: "h-[4.4rem] rounded-[12px]", wheels: true },
  { body: "h-12 rounded-[22px]", wheels: false },
];

/**
 * The content's topic marquee, as a baggage-claim belt: every topic is a
 * luggage tag on a bag riding the carousel. Hover pauses the belt and lifts
 * a bag. The list is also given as plain text for screen readers.
 */
export default function TopicStrip() {
  return (
    <section aria-label="Topics" className="relative overflow-hidden bg-df-paper pt-6">
      <Container>
        <p className="inline-flex items-center gap-2 rounded-md bg-df-midnight px-2.5 py-1.5 font-df text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
          <Suitcase aria-hidden="true" className="size-4 text-df-amber" />
          Baggage claim
          <span className="text-white/50">&middot;</span>
          <span className="text-df-amber">Belt DF26</span>
        </p>
      </Container>
      <p className="sr-only">Topics: {devfestTopics.join(", ")}</p>

      <div aria-hidden="true" className="mt-1">
        <Marquee duration={46}>
          {devfestTopics.map((topic, i) => {
            const shape = bagShapes[i % bagShapes.length];
            return (
              <div key={topic} className="df-belt flex h-[7.25rem] shrink-0 items-end px-3.5 pb-[1.3rem] sm:px-4">
                <span
                  className={cn(
                    "relative mb-px flex items-center px-4 shadow-[inset_0_-6px_0_rgb(0_0_0/0.12)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2",
                    bagColours[i % bagColours.length],
                    shape.body,
                  )}
                >
                  {/* handle */}
                  <span className="absolute -top-2.5 left-1/2 h-3 w-9 -translate-x-1/2 rounded-t-lg border-[3px] border-b-0 border-df-ink/35" />
                  {/* straps */}
                  <span className="absolute inset-y-0 left-3 w-1.5 bg-white/20" />
                  <span className="absolute inset-y-0 right-3 w-1.5 bg-white/20" />
                  {shape.wheels ? (
                    <>
                      <span className="absolute -bottom-1.5 left-3 size-2.5 rounded-full bg-df-ink" />
                      <span className="absolute -bottom-1.5 right-3 size-2.5 rounded-full bg-df-ink" />
                    </>
                  ) : null}
                  {/* the luggage tag */}
                  <span className="relative flex items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-2.5 py-1 font-df text-[0.82rem] font-semibold text-df-navy shadow-[0_2px_0_rgb(0_0_0/0.12)]">
                    <span className="size-1.5 rounded-full border border-df-steel" />
                    {topic}
                    <Plane className="size-3 text-df-amber" />
                  </span>
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
