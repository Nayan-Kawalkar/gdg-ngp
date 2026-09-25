"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, secondaryNav, socials } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { IconChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const darkHeroRoutes = ["/jobs-in-nagpur", "/collaborate", "/community"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // The transparent top-of-page state assumes a light hero. Routes whose hero is
  // dark would lose the black wordmark and links against it, so they start in
  // the solid pill state.
  const darkHero = darkHeroRoutes.includes(pathname);
  const solid = scrolled || darkHero;
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setMoreOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <>
      <header
        // Anchored during page transitions - see globals.css.
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
              solid
                ? "border border-black/8 bg-cream/80 backdrop-blur-xl"
                : "border border-transparent bg-transparent",
            )}
          >
            <Link
              href="/"
              className="press flex shrink-0 items-center rounded-full pl-1.5 pr-2"
              aria-label="GDG Nagpur, home"
            >
              {/* The SVG's viewBox is cropped to the artwork, so this height is
                  the logo's real visible height - no built-in padding. */}
              <Image
                src="/gdg-logo.svg"
                alt="GDG Nagpur"
                width={1156}
                height={192}
                priority
                style={{ width: "auto" }}
                className="h-7 w-auto sm:h-8"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="press rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}

              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-expanded={moreOpen}
                  className={cn(
                    "press flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium hover:bg-ink/5 hover:text-ink",
                    moreOpen ? "bg-ink/5 text-ink" : "text-ink-soft",
                  )}
                >
                  More
                  <IconChevronDown
                    className={cn(
                      "size-4 transition-transform duration-300",
                      moreOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "absolute right-0 top-[calc(100%+0.6rem)] w-[21rem] origin-top-right rounded-3xl border border-black/8 bg-paper p-2 transition-all duration-200",
                    moreOpen
                      ? "visible scale-100 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 scale-[0.98] opacity-0",
                  )}
                >
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="press block rounded-2xl px-4 py-3 hover:bg-cream"
                    >
                      <span className="block text-[0.95rem] font-medium">{item.label}</span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft/80">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ButtonLink href={socials.discord} size="sm" variant="ink">
                  Join the community
                </ButtonLink>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="press flex size-10 items-center justify-center rounded-full border border-black/8 bg-paper lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="block h-[1.5px] w-4 rounded-full bg-ink" />
                  <span className="block h-[1.5px] w-4 rounded-full bg-ink" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "visible" : "invisible pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink-deep/40 backdrop-blur-sm transition-opacity duration-400",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-[2.5rem] bg-cream px-5 pb-10 pt-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/gdg-logo.svg"
              alt="GDG Nagpur"
              width={1156}
              height={192}
              style={{ width: "auto" }}
              className="h-7 w-auto"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="press flex size-10 items-center justify-center rounded-full border border-black/8 bg-paper text-xl leading-none"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col">
            {[...primaryNav, ...secondaryNav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${80 + i * 35}ms` : "0ms" }}
                className={cn(
                  "press border-b border-black/8 py-4 font-heading text-[1.6rem] tracking-[-0.03em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href={socials.discord} variant="ink" size="lg" magnetic={false}>
              Join the community
            </ButtonLink>
            <ButtonLink href="/events" variant="paper" size="lg" magnetic={false}>
              See upcoming events
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
