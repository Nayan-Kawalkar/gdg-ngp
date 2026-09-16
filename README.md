# GDG Nagpur — 2026 site

Next.js 16 (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.

**Frontend only.** No backend, no Firebase, no API routes. Every list on the page reads
from a typed mock file in `src/data/`, and the newsletter form is UI-only.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

```
src/
├── app/
│   ├── globals.css              # ALL design tokens (@theme), primitives, motion CSS
│   ├── layout.tsx               # self-hosted fonts, Navbar/Footer, motion providers
│   └── page.tsx                 # home page, ten sections in order
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── ui/                      # Button, Section, Shapes, Counter, Marquee, Icons,
│   │                            # SmoothScroll (Lenis), MotionProvider (GSAP)
│   └── home/                    # the ten home-page bands
├── data/                        # site.ts, events.ts, home.ts  ← all content lives here
└── lib/                         # motion.ts (GSAP setup + tokens), format.ts, cn.ts
public/
├── fonts/                       # Google Sans + Google Sans Display (self-hosted)
├── community/                   # 12 placeholder event photos
├── gdg-logo.svg, gdg-mark.svg, favicon.svg
```

## Design system

Carried over from the previous site's `DESIGN.md`, unchanged in substance:

- **Type** — Google Sans (body) / Google Sans Display (headings), self-hosted via
  `next/font/local`. Tight negative tracking on headings only.
  ⚠️ Google Sans is Google's brand typeface. Replace with licensed files before any
  commercial use outside a GDG chapter context.
- **Color** — full tonal scale per Google brand color (mist → soft → 200 → core → deep)
  on a warm cream ground. Decorative shapes use mist/soft; core is for buttons, badges
  and section fills.
- **Surfaces** — no shadows, no black strokes. Cards separate with a hairline
  `black/8` edge or a background-tint difference.
- **Buttons** — always a borderless pill (`.btn-solid`).
- **Shapes** — two large cropped shapes per section, never a scatter of small icons.

Retheme by editing the `@theme {}` block in `globals.css` only; no component holds a
hardcoded hex.

## Motion

One attribute-driven system, set up once in `components/ui/MotionProvider.tsx`:

| Attribute | Effect |
|---|---|
| `data-motion-text="words"` | masked word-by-word heading reveal |
| `data-motion-text="lines"` | masked line reveal (pre-split markup) |
| `data-reveal="fade-up \| fade-in \| scale \| slide-left \| slide-right"` | single-element reveal |
| `data-reveal-group` + `data-reveal-item` | staggered group |
| `data-image-reveal` | clip-path wipe + image settle |
| `data-parallax-layer` / `data-parallax-image` inside `data-parallax-section` | scroll parallax |
| `data-magnetic="0.24"` | pointer-following button |
| `data-mouse-parallax` + `data-mouse-depth` | mouse-reactive depth layers |
| `data-reveal-delay` / `data-motion-delay` | sequence siblings (seconds) |

Two rules the system enforces:

- `prefers-reduced-motion: reduce` skips setup entirely — no smooth scroll, no reveals,
  nothing hidden.
- Elements are only hidden once JS has confirmed it will animate them (`html.has-motion`),
  and anything already on screen or scrolled past plays immediately rather than waiting
  for a ScrollTrigger. So content is never lost on a reload that restores scroll position,
  a `#hash` landing, or with JS disabled.

## Placeholders to replace

- `src/data/site.ts` — `socials.discord` and `socials.whatsapp` are `#`. Add the real invites.
- `src/data/home.ts` — `organizer.photo` is unset, so the footer/organizer strip render an
  initials tile. Drop a portrait into `public/team/` and set the path.
- `public/community/*.jpg` — placeholder photos from a past Build with AI event.
- `src/data/events.ts`, `home.ts` — mock events, news and opportunities.
