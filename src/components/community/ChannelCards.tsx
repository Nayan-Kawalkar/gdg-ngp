import { ArrowIcon } from "@/components/ui/Button";
import { IconDiscord, IconWhatsApp, IconX } from "@/components/ui/Icons";
import { communityChannels, type CommunityChannel } from "@/data/site";
import { channelStats } from "@/data/community";
import { cn } from "@/lib/cn";

const icons = { discord: IconDiscord, whatsapp: IconWhatsApp, x: IconX } as const;

const fill: Record<CommunityChannel["accent"], string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  ink: "bg-ink",
};

const tile: Record<CommunityChannel["accent"], string> = {
  blue: "bg-blue-mist text-blue-deep",
  green: "bg-green-mist text-green-deep",
  ink: "bg-ink/5 text-ink",
};

const format = new Intl.NumberFormat("en-IN");

/**
 * The three channels, big. On hover the channel's colour rises from the
 * bottom edge and the text flips to white - the whole card is the link.
 */
export default function ChannelCards() {
  return (
    <div data-reveal-group className="grid gap-5 lg:grid-cols-3">
      {communityChannels.map((channel) => {
        const Icon = icons[channel.id as keyof typeof icons] ?? IconDiscord;
        const stat = channelStats[channel.id];
        return (
          <a
            key={channel.id}
            href={channel.href}
            {...(channel.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            data-reveal-item
            className="card-sticker card-pop group relative isolate flex min-h-[22rem] flex-col overflow-hidden p-8 transition-colors duration-500 hover:text-white sm:p-10"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
                fill[channel.accent],
              )}
            />

            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-2xl transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white",
                  tile[channel.accent],
                )}
              >
                <Icon className="size-8" />
              </span>
              <ArrowIcon className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
            </div>

            <h3 className="mt-10 font-heading text-[2.25rem] leading-none tracking-[-0.045em]">
              {channel.name}
            </h3>
            <p className="mt-2 text-[0.88rem] opacity-60">{channel.handle}</p>
            <p className="mt-5 text-[0.95rem] leading-[1.65] opacity-75">{channel.blurb}</p>

            {stat ? (
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-current/10 pt-6 text-[0.85rem]">
                <span>
                  <span className="font-heading text-[1.3rem] tracking-[-0.03em]">
                    {format.format(stat.members)}+
                  </span>{" "}
                  <span className="opacity-60">{stat.note}</span>
                </span>
                {stat.online ? (
                  <span className="inline-flex items-center gap-2 opacity-80">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-brand-green" />
                    </span>
                    {stat.online} online now
                  </span>
                ) : null}
              </div>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
