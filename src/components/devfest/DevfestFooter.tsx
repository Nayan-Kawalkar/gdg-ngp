import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { IconInstagram, IconLinkedIn, IconX, IconYouTube } from "@/components/ui/Icons";
import { Heart } from "@/components/devfest/icons";
import { GdgLockup } from "@/components/devfest/ui";
import { socials } from "@/data/site";

const social = [
  { label: "Instagram", href: socials.instagram, Icon: IconInstagram },
  { label: "LinkedIn", href: socials.linkedin, Icon: IconLinkedIn },
  { label: "X", href: socials.x, Icon: IconX },
  { label: "YouTube", href: socials.youtube, Icon: IconYouTube },
];

/** Navy footer from the template: mark + name, social circles, credit line. */
export default function DevfestFooter() {
  return (
    <footer className="bg-df-midnight text-white">
      <Container className="flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" className="press" aria-label="GDG Nagpur main site">
          <GdgLockup tone="dark" />
        </Link>

        <ul className="flex items-center gap-2">
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="press flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors duration-300 hover:border-white hover:bg-white hover:text-df-midnight"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <p className="flex items-center gap-1.5 text-[0.88rem] text-white/80">
          Built with <Heart className="size-4 text-df-orange" /> <span className="sr-only">love</span> by GDG
          Nagpur
        </p>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4 text-center text-[0.75rem] text-white/45 sm:text-left">
          &copy; 2026 GDG Nagpur &middot; Community-run &middot; Not an official Google product
        </Container>
      </div>
    </footer>
  );
}
