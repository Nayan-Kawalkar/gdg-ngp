import Marquee from "@/components/ui/Marquee";
import { IconGavel, IconMic } from "@/components/ui/Icons";
import { pastSpeakers, type Accent } from "@/data/speak";
import { cn } from "@/lib/cn";

const tile: Record<Accent, string> = {
  blue: "bg-blue-mist text-blue-deep",
  red: "bg-red-mist text-red-deep",
  yellow: "bg-yellow-mist text-amber",
  green: "bg-green-mist text-green-deep",
};

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

/**
 * Credibility strip: three featured people as cards, then everyone in a slow
 * marquee of chips. TODO(photos): swap initials tiles for portraits.
 */
export default function PastSpeakers() {
  const featured = pastSpeakers.slice(0, 3);

  return (
    <>
      <div data-reveal-group className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
        {featured.map((person) => {
          const KindIcon = person.kind === "Judge" ? IconGavel : IconMic;
          return (
            <article
              key={person.id}
              data-reveal-item
              className="card-sticker card-pop group flex flex-col p-7 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl font-heading text-xl font-medium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6",
                    tile[person.accent],
                  )}
                >
                  {initials(person.name)}
                </span>
                <span className="chip label-caps px-3 py-1.5 text-[0.66rem] text-ink-soft">
                  <KindIcon className="size-3.5" />
                  {person.kind}
                </span>
              </div>
              <h3 className="mt-6 text-[1.25rem] tracking-[-0.03em]">{person.name}</h3>
              <p className="mt-1 text-[0.875rem] text-ink-soft">
                {person.role}, {person.company}
              </p>
              <p className="mt-auto pt-6 text-[0.95rem] leading-snug">
                &ldquo;{person.topic}&rdquo;
              </p>
            </article>
          );
        })}
      </div>

      <div data-reveal="fade-in" className="mt-10">
        <Marquee duration={46}>
          {pastSpeakers.map((person) => (
            <span
              key={person.id}
              className="chip mx-2 gap-3 py-2 pl-2 pr-5 text-[0.88rem]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-[0.72rem] font-medium",
                  tile[person.accent],
                )}
              >
                {initials(person.name)}
              </span>
              <span className="font-medium">{person.name}</span>
              <span className="text-ink-soft/70">{person.topic}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}
