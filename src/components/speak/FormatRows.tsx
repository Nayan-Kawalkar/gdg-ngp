import { ArrowIcon } from "@/components/ui/Button";
import { speakFormats, type Accent } from "@/data/speak";
import { cn } from "@/lib/cn";

const fill: Record<Accent, string> = {
  blue: "bg-blue-mist",
  red: "bg-red-mist",
  yellow: "bg-yellow-mist",
  green: "bg-green-mist",
};

const dot: Record<Accent, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

/**
 * The five formats as editorial rows rather than a card grid. On hover the
 * row's tint wipes in from the left and the arrow slides; each row links to
 * the form with that format preselected (`#propose-<id>`, read by
 * SpeakApplicationForm).
 */
export default function FormatRows() {
  return (
    <ol data-reveal-group className="mt-14 border-t border-ink/10 lg:mt-16">
      {speakFormats.map((format, i) => (
        <li key={format.id} data-reveal-item className="border-b border-ink/10">
          <a
            href={`#propose-${format.id}`}
            className="group relative grid items-center gap-x-8 gap-y-3 overflow-hidden rounded-[1.75rem] px-4 py-7 sm:px-6 lg:grid-cols-[4rem_1fr_1.1fr_auto] lg:py-9"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100",
                fill[format.accent],
              )}
            />

            <span className="label-caps relative text-ink-soft/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="relative flex items-center gap-4">
              <span
                aria-hidden="true"
                className={cn(
                  "size-2.5 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150",
                  dot[format.accent],
                )}
              />
              <span className="font-heading text-[1.9rem] leading-none tracking-[-0.04em] sm:text-[2.4rem]">
                {format.name}
              </span>
            </span>

            <span className="relative max-w-md text-[0.95rem] leading-[1.65] text-ink-soft">
              {format.pitch}
              <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.82rem] text-ink-soft/70">
                <span>{format.length}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{format.audience}</span>
              </span>
            </span>

            <span className="relative hidden items-center gap-2 font-heading text-[0.9rem] font-medium lg:inline-flex">
              <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Propose one
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-ink/5 transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                <ArrowIcon />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
