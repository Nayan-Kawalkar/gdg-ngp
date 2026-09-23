# GDG Nagpur — 2026 site

Next.js 16 (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.

**Frontend only.** No backend, no Firebase, no API routes. Every list on the page reads
from a typed mock file in `src/data/`. Every form validates for real, but submitting is
stubbed - the success state says nothing was sent (`TODO(backend)` marks each one).

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Routes

| Route | What it is |
|---|---|
| `/` | Home - hero, events, why join, stats, news, opportunities, community |
| `/about` | Story timeline, events showcase, pillars, team, impact |
| `/events`, `/events/[slug]` | Filterable directory (`?status=`, `?format=`) and detail pages |
| `/mentorship`, `/mentorship/become-a-mentor` | Mentor directory and application |
| `/opportunities`, `/opportunities/share`, `/jobs-in-nagpur` | Board, share form, Nagpur jobs |
| `/speak` | Formats, past speakers, speaker/judge application (`#judge` opens judge) |
| `/collaborate` | Audience, sponsor tiers, co-host, enquiry form (`#sponsor`, `#partner`) |
| `/tech-news` | Lead story + category-filtered feed (`?category=ai`), newsletter |
| `/share-your-knowledge` | Reels, YouTube Live schedule, videos, submission form |
| `/community` | Discord / WhatsApp / X, first steps, code of conduct |
| `/privacy` | Plain-language privacy note |
| `/certificates/[token]` | **Private** volunteer certificate page (see below) |

Plus `not-found.tsx`, `error.tsx`, `sitemap.ts` and `robots.ts`.

## Where things live

```
src/
├── app/
│   ├── globals.css              # ALL design tokens (@theme), primitives, motion CSS
│   ├── layout.tsx               # self-hosted fonts, Navbar/Footer, motion, chat launcher
│   ├── template.tsx             # page transitions (React <ViewTransition>)
│   └── <route>/page.tsx         # one folder per route above
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── ui/                      # Button, Section, PageHero, CtaBand, Faq, FormSuccess,
│   │                            # Field, SegmentTabs, Dialog, Shapes, Counter, Marquee,
│   │                            # Icons, SmoothScroll (Lenis), MotionProvider (GSAP)
│   ├── chat/                    # site chatbot launcher + panel
│   ├── certificates/            # certificate SVG, cropper, studio, LOR dialog
│   └── <area>/                  # home, about, events, mentorship, opportunities,
│                                # speak, collaborate, news, knowledge, community
├── data/                        # ← all content lives here, one typed module per area
└── lib/                         # motion.ts, useHash.ts, validate.ts, format.ts, cn.ts,
                                 # chat/ (answer engine), certificates/ (geometry, export)
public/
├── fonts/                       # Google Sans + Google Sans Display (self-hosted)
├── community/                   # 12 placeholder event photos
├── gdg-logo.svg, gdg-mark.svg, favicon.svg
```

## Building a new page

1. `src/app/<route>/page.tsx` as a server component exporting `metadata`.
2. Open with `<PageHero>` (add the route to `darkHeroRoutes` in `Navbar.tsx` if
   `tone="dark"`), then `<Section tone>` + `<Container>` + `<SectionHeader>` bands.
3. Content in a typed `src/data/<area>.ts`; derive counts from it, never hardcode them.
4. Forms: `components/ui/Field.tsx` fields, `lib/validate.ts` checks, focus the first
   `[aria-invalid]` after submit, show `<FormSuccess>`. Never wrap a form in
   `data-reveal` - hidden fields cannot take focus. Tab deep links use `lib/useHash.ts`.
5. Add the route to `app/sitemap.ts`.

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

Page transitions live in `app/template.tsx` (not the layout - layouts persist, so
enter/exit would never fire): the old page fades out, the new one rises in, the header
stays anchored, and an event card's banner morphs into its detail hero. CSS is in the
"PAGE TRANSITIONS" block of `globals.css`.

Two rules the system enforces:

- `prefers-reduced-motion: reduce` skips setup entirely — no smooth scroll, no reveals,
  nothing hidden.
- Elements are only hidden once JS has confirmed it will animate them (`html.has-motion`),
  and anything already on screen or scrolled past plays immediately rather than waiting
  for a ScrollTrigger. So content is never lost on a reload that restores scroll position,
  a `#hash` landing, or with JS disabled.

## Chatbot

`components/chat/` - a floating launcher that lazy-loads the panel on first open. It is
**not** an AI model: `lib/chat/intents.ts` builds answers from the same data modules the
pages render (so it can never quote a stale date or count), `data/faq.ts` covers general
questions, and anything else gets an honest "not sure" with email/Discord hand-offs.
Unanswered questions are kept in `localStorage` (`gdg-chat-misses`) until analytics exist.
To teach it something new, add an intent or an FAQ entry.

## Volunteer certificates

`/certificates/<token>` - one per selected volunteer, in three tiers (Volunteer, Star
Contributor, Outstanding Contributor). Volunteers edit name/designation/photo with a live
preview and download a 3200x2262 PNG or an A4 PDF (jsPDF, loaded on click). Everything,
including the photo, stays in the browser.

The certificate is a single self-contained SVG (`components/certificates/CertificateSvg.tsx`)
with literal colours in `lib/certificates/palette.ts` - the one exception to "no hex in
components", because the export has no access to page CSS variables.

**Privacy caveat:** pages are noindex, robots-disallowed and linked from nowhere, but the
tokens ship in the JS bundle. Real privacy (server-issued tokens, the admin side for
choosing recipients and tracking downloads/LOR requests) needs the backend phase.

## Placeholders to replace

- `src/data/site.ts` - `socials.discord`, `socials.whatsapp`, `socials.calendly` and
  `socials.mediaKit` are `#`. Add the real links.
- `src/data/home.ts` - `organizer.photo` is unset, so the footer/organizer strip render an
  initials tile. Drop a portrait into `public/team/` and set the path.
- `public/community/*.jpg` - placeholder photos from a past Build with AI event.
- `src/data/events.ts`, `news.ts`, `opportunities.ts`, `mentors.ts` - mock content.
- `src/data/speak.ts` (past speakers), `collaborate.ts` (audience mix, tier benefits),
  `knowledge.ts` (lives, video ids), `community.ts` (member counts),
  `volunteers.ts` (certificate recipients) - all placeholders, marked in each file.
- `src/app/privacy/page.tsx` - organizer review before launch.
