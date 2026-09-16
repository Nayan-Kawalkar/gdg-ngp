import { Container, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { IconDiscord, IconWhatsApp, IconX } from "@/components/ui/Icons";
import { communityChannels } from "@/data/site";
import { cn } from "@/lib/cn";

const icons = {
  discord: IconDiscord,
  whatsapp: IconWhatsApp,
  x: IconX,
} as const;

const accentFill = {
  blue: "group-hover:bg-brand-blue",
  green: "group-hover:bg-brand-green",
  ink: "group-hover:bg-white",
} as const;

const accentText = {
  blue: "group-hover:text-white",
  green: "group-hover:text-white",
  ink: "group-hover:text-ink",
} as const;

/** Pre-footer dark band: the three places the community actually lives. */
export default function CommunityCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-20 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />

      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">Community</Eyebrow>
          <h2
            data-motion-text="words"
            className="mt-5 text-[2.25rem] leading-[1.03] sm:text-5xl lg:text-[3.5rem]"
          >
            Pick a room and say hello.
          </h2>
          <p
            data-reveal="fade-up"
            className="mt-5 max-w-lg text-[1.0375rem] leading-relaxed text-white/60"
          >
            All three are free and open. Most people start on WhatsApp for the
            announcements and end up living in Discord.
          </p>
        </div>

        <div data-reveal-group className="mt-14 grid gap-4 md:grid-cols-3">
          {communityChannels.map((channel) => {
            const Icon = icons[channel.id as keyof typeof icons] ?? IconDiscord;
            return (
              <a
                key={channel.id}
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                data-reveal-item
                className={cn(
                  "group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-8",
                  accentFill[channel.accent],
                  accentText[channel.accent],
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="size-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <ArrowIcon className="size-5 -rotate-45" />
                </div>

                <div>
                  <h3 className="font-heading text-[1.6rem] tracking-[-0.03em]">
                    {channel.name}
                  </h3>
                  <p className="mt-1 text-[0.85rem] opacity-60">{channel.handle}</p>
                  <p className="mt-4 text-[0.9rem] leading-relaxed opacity-70">
                    {channel.blurb}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
