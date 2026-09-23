import { IconExternal } from "@/components/ui/Icons";
import type { NewsCategory, NewsItem } from "@/data/news";
import { formatNewsDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export const categoryTint: Record<NewsCategory, string> = {
  AI: "bg-blue-mist text-blue-deep",
  Web: "bg-yellow-mist text-amber",
  Mobile: "bg-green-mist text-green-deep",
  Cloud: "bg-blue-mist text-blue-deep",
  Career: "bg-red-mist text-red-deep",
  Industry: "bg-cream-dark text-ink-soft",
};

export function externalProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};
}

/** Headline card for one story. Shared by the home teaser and /tech-news. */
export default function NewsCard({
  item,
  revealItem = true,
}: {
  item: NewsItem;
  /** Off when a component owns its own stagger (useStaggerReveal). */
  revealItem?: boolean;
}) {
  return (
    <a
      href={item.href}
      {...externalProps(item.href)}
      {...(revealItem ? { "data-reveal-item": "" } : {})}
      className="card-sticker card-pop group flex flex-col p-7 sm:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "label-caps inline-flex rounded-full px-3 py-1.5 text-[0.68rem]",
            categoryTint[item.category],
          )}
        >
          {item.category}
        </span>
        <time dateTime={item.publishedAt} className="text-[0.78rem] text-ink-soft/70">
          {formatNewsDate(item.publishedAt)}
        </time>
      </div>

      <h3 className="mt-6 text-[1.3rem] leading-[1.1] tracking-[-0.03em] sm:text-[1.4rem]">
        {item.headline}
      </h3>
      <p className="mt-3.5 text-[0.925rem] leading-[1.7] text-ink-soft">{item.summary}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/8 pt-6">
        <span className="truncate text-[0.82rem] text-ink-soft/70">{item.source}</span>
        <span className="inline-flex items-center gap-1.5 font-heading text-[0.88rem] font-medium">
          Read
          <IconExternal className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
