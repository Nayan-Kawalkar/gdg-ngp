import { ArrowIcon } from "@/components/ui/Button";
import { IconMic, IconPlay, IconVideo } from "@/components/ui/Icons";
import { paths, type Accent, type Path } from "@/data/knowledge";
import { cn } from "@/lib/cn";

const icons: Record<Path["id"], typeof IconMic> = {
  reel: IconVideo,
  session: IconMic,
  live: IconPlay,
};

const tile: Record<Accent, string> = {
  blue: "bg-blue-mist text-blue-deep",
  red: "bg-red-mist text-red-deep",
  yellow: "bg-yellow-mist text-amber",
  green: "bg-green-mist text-green-deep",
};

/** The three ways in. Each card is one link to its section or form tab. */
export default function PathCards() {
  return (
    <div data-reveal-group className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
      {paths.map((path, i) => {
        const Icon = icons[path.id];
        return (
          <a
            key={path.id}
            href={path.href}
            data-reveal-item
            className="card-inset card-pop group flex flex-col p-8 sm:p-9"
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110",
                  tile[path.accent],
                )}
              >
                <Icon className="size-6" />
              </span>
              <span aria-hidden="true" className="label-caps text-ink-soft/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-[1.45rem] tracking-[-0.03em]">{path.title}</h3>
            <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">{path.body}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-9 font-heading text-[0.95rem] font-medium">
              {path.cta}
              <span className="flex size-7 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
                <ArrowIcon className="size-3.5" />
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
