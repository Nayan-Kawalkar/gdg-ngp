import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import {
  IconDiscord,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconWhatsApp,
  IconX,
  IconYouTube,
} from "@/components/ui/Icons";
import { footerColumns, site, socials } from "@/data/site";
import { organizer } from "@/data/home";

const socialLinks = [
  { label: "Instagram", href: socials.instagram, Icon: IconInstagram },
  { label: "LinkedIn", href: socials.linkedin, Icon: IconLinkedIn },
  { label: "X", href: socials.x, Icon: IconX },
  { label: "YouTube", href: socials.youtube, Icon: IconYouTube },
  { label: "Discord", href: socials.discord, Icon: IconDiscord },
  { label: "WhatsApp", href: socials.whatsapp, Icon: IconWhatsApp },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-[0.35]" />

      <Container className="relative">
        {/* Newsletter + identity */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-20">
          <div>
            <Image
              src="/gdg-mark.svg"
              alt=""
              width={170}
              height={96}
              style={{ width: "auto" }}
              className="h-10 w-auto"
            />
            <h2 className="mt-8 max-w-lg text-[2rem] leading-[1.05] sm:text-[2.6rem]">
              Get the next event before it fills up.
            </h2>
            <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-white/60">
              One email per event. No digests, no newsletters you did not ask for.
            </p>

            {/* Frontend-only: wired to a real endpoint later. */}
            <form
              className="mt-7 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-white/30"
              action="#"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <IconMail className="ml-3 size-5 shrink-0 text-white/40" />
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-solid h-10 shrink-0 bg-white px-5 text-sm text-ink"
              >
                Notify me
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="press flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition-colors hover:bg-white hover:text-ink"
                >
                  <Icon className="size-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/40">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="press text-[0.925rem] text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Organizer credit */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-lg font-medium text-white"
            >
              SI
            </span>
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/40">
                Organizer
              </p>
              <p className="mt-1 font-heading text-[1.1rem] tracking-[-0.02em]">
                {organizer.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={organizer.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="press group inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[0.85rem] text-white/75 transition-colors hover:bg-white hover:text-ink"
            >
              <IconLinkedIn className="size-4" /> LinkedIn <ArrowIcon className="size-3.5" />
            </a>
            <a
              href={organizer.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="press group inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[0.85rem] text-white/75 transition-colors hover:bg-white hover:text-ink"
            >
              <IconInstagram className="size-4" /> Instagram <ArrowIcon className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="py-8 text-[0.8rem] text-white/45">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.name}. Community-run.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={`mailto:${site.email}`}
                className="press transition-colors hover:text-white"
              >
                {site.email}
              </a>
              <Link href={site.codeOfConduct} className="press transition-colors hover:text-white">
                Code of conduct
              </Link>
              <Link href="/privacy" className="press transition-colors hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
          <p className="mt-5 max-w-3xl leading-relaxed text-white/35">{site.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
