import { Container } from "@/components/ui/Section";
import { ArrowCircle, DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { IconDiscord, IconWhatsApp, IconX } from "@/components/ui/Icons";
import { devfestCommunity } from "@/data/devfest";
import { socials } from "@/data/site";
import { cn } from "@/lib/cn";

const channelMeta = {
  discord: { href: socials.discord, Icon: IconDiscord },
  whatsapp: { href: socials.whatsapp, Icon: IconWhatsApp },
  x: { href: socials.x, Icon: IconX },
} as const;

/** The three community rooms, as link cards. */
export default function CommunitySection() {
  return (
    <section aria-labelledby="community-title" className="bg-df-paper py-20 lg:py-28">
      <Container>
        <DfIntro
          headingId="community-title"
          eyebrow={devfestCommunity.eyebrow}
          title={devfestCommunity.title}
          sub={devfestCommunity.sub}
        />
        <ul data-reveal-group className="mt-12 grid gap-5 md:grid-cols-3">
          {devfestCommunity.channels.map((channel) => {
            const { href, Icon } = channelMeta[channel.id];
            // "#" is a placeholder link (see data/site.ts): keep it in this tab.
            const external = href.startsWith("http");
            return (
              <li key={channel.id} data-reveal-item>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className={cn(
                    "group flex h-full flex-col rounded-3xl bg-white p-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:p-7",
                    dfCardShadow,
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-2xl bg-df-midnight text-white transition-colors duration-300 group-hover:bg-df-orange"
                    >
                      <Icon className="size-5" />
                    </span>
                    <ArrowCircle />
                  </span>
                  <span className="mt-5 font-df text-[1.2rem] font-semibold text-df-navy">{channel.name}</span>
                  <span className="text-[0.85rem] font-medium text-df-blue">{channel.handle}</span>
                  <span className="mt-3 text-[0.93rem] leading-[1.65] text-df-slate">{channel.body}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
