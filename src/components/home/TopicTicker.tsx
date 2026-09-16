import Marquee from "@/components/ui/Marquee";
import { topics } from "@/data/home";

/** Dark contrast band: an endless run of what the chapter actually covers. */
export default function TopicTicker() {
  return (
    <div className="relative overflow-hidden bg-ink-deep py-5 text-white sm:py-6">
      <Marquee duration={44}>
        {topics.map((topic) => (
          <span key={topic} className="flex items-center">
            <span className="px-5 font-heading text-[0.95rem] tracking-[-0.01em] text-white/80 sm:px-7 sm:text-[1.05rem]">
              {topic}
            </span>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-white/25" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
