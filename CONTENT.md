# GDG Nagpur — content guide

What each type of content looks like, which fields are required, how long text can be, and what size
images need to be. Use it when preparing content for the site or replacing the placeholders.

- **Where content lives:** one TypeScript file per type in `src/data/`. There is no CMS or backend
  yet — to change content, edit the file and redeploy.
- **Placeholders:** anything marked `PLACEHOLDER` / `TODO` in a data file, and every link that is just
  `"#"`, still needs real content. See the checklist at the end.
- **"Recommended" limits** come from how the layout renders at phone and desktop widths. Going over
  them won't break the page, but text gets cut off with "…" or cards grow uneven. **"Hard" limits**
  are enforced by the form or page.

---

## 1. Image sizes at a glance

| Image | Where it shows | Shape on screen | Provide | Format / weight |
|---|---|---|---|---|
| Event banner (`imageUrl`) | Event cards (home, events, about) | ≈ 2 : 1, cropped to fill | **1200 × 600 px** | JPG or WebP, **≤ 250 KB**. Not auto-resized, so compress it. |
| Community photos (`/public/community/`) | Home hero, home mosaic, About hero, Community page | 4 : 5 portrait **and** 1 : 1 square crops | **≥ 1600 px** on the long edge, subject centred | JPG, ≤ 500 KB |
| Home hero photo (`community-01.jpg`) | Big photo card on the home page | 4 : 5 portrait (square on tablets) | **1200 × 1500 px** portrait if possible | JPG, ≤ 500 KB |
| Event recap photos (`gallery`) | Event detail page, recap section | 4 : 5 and 1 : 1, alternating | **≥ 1600 px** long edge | JPG, ≤ 500 KB |
| Mentor photo | Mentor card | 64 × 64 px, rounded square | **400 × 400 px** square, face centred | JPG or WebP, ≤ 100 KB |
| Speaker photo | Event detail page, speakers | 64 × 64 px, rounded square | **400 × 400 px** square | JPG or WebP, ≤ 100 KB |
| Organizer / core team portrait | *Not shown yet* (initials tiles) | — | **800 × 800 px** square, for when portraits are switched on | JPG |
| Certificate photo, Star tier | Uploaded by the volunteer | Circle, 440 px in the download | **≥ 600 × 600 px**, face centred | JPG or PNG |
| Certificate photo, Outstanding tier | Uploaded by the volunteer | Tall panel ≈ 1 : 2, 1120 × 2262 px in the download | **Portrait photo, as tall as possible**, person centred | JPG or PNG |
| Header logo `gdg-logo.svg` | Navbar | 28–32 px tall | SVG, **no empty margin** around the artwork | SVG |
| Mark `gdg-mark.svg` | Footer, chat header, favicon | 40 px tall | SVG | SVG |
| Video thumbnails | Share Your Knowledge page | 16 : 9 | Nothing: pulled from YouTube via `videoId` | — |
| Social share image | Link previews on WhatsApp, LinkedIn, X | 1.91 : 1 | **1200 × 630 px** (not set up yet) | PNG or JPG, ≤ 300 KB |

Why these sizes:
- **Community photos.** Every current placeholder is **1600 × 1200 landscape (4 : 3)**, but the site
  shows them in portrait and square frames. So roughly the outer 20 % on each side is cropped away.
  Keep people and the important part of the scene **in the middle 60 %** of the frame.
- **Event banners** are cropped to fill a wide, short strip. If a poster has text on it, make a
  separate 2 : 1 banner version with the text in the centre, or leave the text off entirely. Cards
  without `imageUrl` show a coloured placeholder, which is fine.
- **Certificate uploads** are resized in the browser to 1400 px on the long edge. That is sharp on
  screen, though the tall Outstanding panel can look slightly soft if the PNG is printed large.
  iPhone **HEIC** photos don't open in most browsers, so convert them to JPG first.
- **Logos:** the header SVG's `viewBox` is cropped tight to the artwork. A replacement logo with
  built-in padding will render smaller than intended, so trim it the same way.

---

## 2. Text lengths at a glance

| Text | Recommended | What happens if longer |
|---|---|---|
| Event title | ≤ 60 characters (≤ 35 to fit the home "Next up" card) | Wraps on cards; **cut with "…"** in the home "Next up" card |
| Event summary | 100–130 characters | Event cards show **3 lines**, then "…". The detail page shows it all. |
| Event venue | ≤ 30 characters | Cut with "…" in the home "Next up" card |
| Event description | 2–3 paragraphs of 60–90 words | — |
| Event takeaways | 3–5 bullets, ≤ 90 characters each | — |
| Agenda item | Title ≤ 50, detail ≤ 100 characters | — |
| Mentor bio | ≤ 160 characters | Not cut, but long bios make the grid uneven |
| Mentor role + company | ≤ 40 characters together | Wraps |
| Opportunity title | ≤ 60 characters | **2 lines** max in the home strip, then "…" |
| Opportunity description | 200–600 characters, key facts first | Board cards show the first **2 lines** (≈ 90 characters); the popup shows everything |
| News headline | ≤ 70 characters | Wraps |
| News summary | 120–180 characters | Not cut, but longer ones make cards uneven |
| News source | ≤ 30 characters | Cut with "…" |
| Live session title | ≤ 55 characters | Wraps |
| Video title | ≤ 60 characters | Wraps |
| Stat label | ≤ 22 characters | Wraps under the number |
| Timeline milestone | Title ≤ 60, body ≤ 220 characters | — |
| FAQ answer | ≤ 300 characters | — |
| Certificate name | **Hard: 40** characters | The input stops accepting text; long names shrink to fit one line |
| Certificate designation | **Hard: 48** characters | The input stops accepting text |
| Certificate "for …" line | ≤ 100 characters (2 lines) | A third line crowds the signature row |
| Chat question | **Hard: 300** characters | The input stops accepting text |

---

## 3. Formats used everywhere

| Kind | Format | Example |
|---|---|---|
| Date | `YYYY-MM-DD` (calendar date, no time) | `"2026-10-11"` |
| Time | Free text, shown as written | `"10:00 AM - 5:00 PM IST"` |
| Link | Full URL starting `https://` — `"#"` marks a placeholder | `"https://gdg.community.dev/..."` |
| `id` | Unique within its list, never shown | `"evt-012"` |
| `slug` | Lowercase words joined by hyphens, unique. **Never change it once shared** — it is the page URL | `"flutter-forward-study-jam"` → `/events/flutter-forward-study-jam` |
| `accent` | One of `blue`, `red`, `yellow`, `green` | Card tint and dots. Vary it between neighbouring items. |
| Image path | File in `/public`, written from the site root | `"/community/community-05.jpg"` |

Fixed value lists — use these exact spellings:

| Field | Allowed values |
|---|---|
| Event `format` | `DevFest`, `Build with AI`, `Study Jam`, `Bootcamp`, `Workshop`, `Roadshow`, `Fireside Chat` |
| Event `status` | `upcoming`, `ongoing`, `past` |
| Sponsor `tier` | `Platinum`, `Gold`, `Community`, `Venue` |
| Mentor `expertise` | `Frontend`, `Backend`, `Mobile`, `ML/AI`, `Cloud`, `DevOps`, `Product`, `Design`, `Career` |
| Opportunity `type` | `Job`, `Internship`, `Scholarship`, `1:1 Help` |
| Opportunity `workMode` | `On-site`, `Hybrid`, `Remote` |
| News `category` | `AI`, `Web`, `Mobile`, `Cloud`, `Career`, `Industry` |
| Live session `level` | `Beginner`, `Intermediate`, `All levels` |
| Certificate `tier` | `volunteer`, `star`, `outstanding` |
| Past speaker `kind` | `Speaker`, `Judge` |

---

## 4. Content types

In each table: ✅ = required, ◻️ = optional.

### 4.1 Events — `src/data/events.ts`

Feeds the events directory, the event pages (`/events/<slug>`), the home page, the About page, the
Collaborate partner list and the chatbot.

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `slug` | ✅ | text | The page URL. Never change it after sharing. |
| `title` | ✅ | text | ≤ 60 characters |
| `format` | ✅ | value list | See §3 |
| `status` | ✅ | `upcoming` / `ongoing` / `past` | **Set by hand.** Move each event along as it happens. It controls the badge, the filters, the Register vs Recap button, and what shows as "Next up". |
| `date` | ✅ | date | Start date |
| `endDate` | ◻️ | date | Multi-day events only. Cards then show "16 - 19 Sep". |
| `time` | ✅ | text | Shown as written |
| `venue` | ✅ | text | ≤ 30 characters |
| `city` | ✅ | text | e.g. `Nagpur` |
| `summary` | ✅ | text | 100–130 characters. Used on cards and at the top of the detail page. |
| `capacity` | ✅ | number | Shown as "300 seats" |
| `attended` | ◻️ | number | Past events. When set, cards show "84 attended" instead of seats. |
| `registerUrl` | ◻️ | link | The **Register free** button on upcoming and ongoing events |
| `recapUrl` | ◻️ | link | The **View the recap** button on past events |
| `imageUrl` | ◻️ | image path or URL | Card banner, 1200 × 600, see §1. Without it the card shows a coloured placeholder. |
| `accent` | ✅ | colour | Placeholder tint and the detail-page header colour |
| `description` | ◻️ | list of paragraphs | "About" section on the detail page |
| `takeaways` | ◻️ | list of text | "What you leave with" list |
| `agenda` | ◻️ | list | Each item is `{ time, title, detail?, kind? }`. Set `kind: "break"` for coffee and lunch rows. |
| `speakers` | ◻️ | list | Each is `{ id, name, role, company, topic?, photo?, linkedin? }`. `photo` is 400 × 400. |
| `sponsors` | ◻️ | list | Each is `{ name, tier, url? }`. Also shown on the Collaborate page: Venue-tier entries as venues, the rest as sponsors. |
| `gallery` | ◻️ | list of image paths | Photo grid in the event page's "Recap" section |
| `youtubeId` | ◻️ | text | Only the id from the YouTube URL (the part after `v=`). Embeds the recording. |

Every optional section on the detail page hides itself when its field is empty, so a new event can
start with just the required fields.

```ts
{
  id: "evt-011",
  slug: "gemini-study-jam-2026",
  title: "Gemini Study Jam",
  format: "Study Jam",
  status: "upcoming",
  date: "2026-11-08",
  time: "11:00 AM - 3:00 PM IST",
  venue: "IIIT Nagpur, Butibori",
  city: "Nagpur",
  summary: "Four hands-on hours with the Gemini API: prompting, function calling and shipping a small app.",
  capacity: 60,
  registerUrl: "https://gdg.community.dev/events/details/...",
  imageUrl: "/events/gemini-study-jam-2026.jpg",
  accent: "green",
},
```

### 4.2 Mentors — `src/data/mentors.ts`

Only **approved** mentors go in this list; applications come through the form. The list feeds the
mentor directory, its filters, the mentorship page counts and the chatbot.

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `name` | ✅ | text | |
| `role` | ✅ | text | Shown as "role · company", ≤ 40 characters together |
| `company` | ✅ | text | |
| `bio` | ✅ | text | ≤ 160 characters |
| `expertise` | ✅ | list from §3 | 1–3 areas. Drives the directory filters and the "areas covered" count. |
| `availability` | ✅ | text | Shown as written, e.g. `"2 sessions a month"` |
| `photo` | ◻️ | image path | 400 × 400 square. Without it the card shows initials. |
| `linkedin` | ◻️ | link | LinkedIn button on the card |
| `since` | ✅ | year as text | Year they joined. **Not shown on the site yet.** |

### 4.3 Opportunities — `src/data/opportunities.ts`

Only **reviewed** listings go here. They feed the opportunity board, **Jobs in Nagpur**, the home
opportunities strip and the chatbot. Lists are sorted newest `postedAt` first.

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `type` | ✅ | value list | See §3 |
| `title` | ✅ | text | Role, scholarship name, or for 1:1 Help the request itself. ≤ 60 characters. |
| `company` | ✅ | text | For 1:1 Help, use something like `"Community member"` |
| `city` | ✅ | text | **Must be exactly `Nagpur`** for a Job or Internship to appear on the Jobs in Nagpur page |
| `workMode` | ✅ | value list | See §3 |
| `description` | ✅ | text | 200–600 characters, key facts first. Cards show 2 lines; the popup shows everything. |
| `postedAt` | ✅ | date | Sort order and "Posted" date |
| `deadline` | ◻️ | date | Shows "Closes 10 Oct". Without it the listing says "Open until filled". |
| `applyUrl` | ✅ | link | The **Apply** button |
| `postedBy` | ✅ | text | Credited on the listing |
| `posterRole` | ◻️ | text | Shown next to the poster's name in the popup |

**Companies hiring from the community**, `companiesHiring` in the same file, appear in the dark band
on `/opportunities`:

| Field | | Type | Notes |
|---|---|---|---|
| `name` | ✅ | text | |
| `openRoles` | ✅ | number | Shown as "3 open roles" |
| `city` | ✅ | text | |
| `note` | ✅ | text | ≤ 30 characters, e.g. `"Frontend and QA"` |

### 4.4 Tech news — `src/data/news.ts`

The newest story becomes the lead story on `/tech-news`. The home page shows the latest 3. There are
no images; the cards are text only.

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `source` | ✅ | text | Publication name, ≤ 30 characters |
| `category` | ✅ | value list | See §3. Drives the category tabs. |
| `headline` | ✅ | text | ≤ 70 characters |
| `summary` | ✅ | text | 120–180 characters: why it matters to developers here |
| `href` | ✅ | link | The original story, opens in a new tab |
| `publishedAt` | ✅ | date | Sort order and card date |

### 4.5 YouTube Lives and videos — `src/data/knowledge.ts`

**Live sessions** (`liveSessions`) are listed by date. The first one is marked "Up next", and each
row links to the YouTube channel.

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `title` | ✅ | text | ≤ 55 characters |
| `host` | ✅ | text | |
| `date` | ✅ | date | Also generates the weekday shown |
| `time` | ✅ | text | e.g. `"7:00 PM IST"` |
| `level` | ✅ | value list | See §3 |

**Videos** (`recentVideos`):

| Field | | Type | Notes |
|---|---|---|---|
| `id` | ✅ | text | Unique |
| `title` | ✅ | text | ≤ 60 characters |
| `by` | ✅ | text | e.g. `"GDG Nagpur"`, `"Community reel"` |
| `duration` | ✅ | text | `"mm:ss"`, e.g. `"32:10"` |
| `videoId` | ◻️ | text | YouTube id. With it, the card plays the video in place. Without it, the card links to the channel. |
| `accent` | ✅ | colour | Placeholder tint when there's no `videoId` |

### 4.6 Numbers (stats)

| List | File | Where it shows |
|---|---|---|
| `stats` (4 items) | `src/data/home.ts` | Home stats band. **The first two** also appear under the home hero. |
| `impactStats` (4 items) | `src/data/about.ts` | About page "Impact" band |

Each item is `{ id, value, suffix, label, accent }`. Impact stats add `note`, one line of context.
`value` is a whole number, shown with Indian digit grouping (e.g. 6,500). `suffix` is `"+"` or `""`.

The Collaborate page picks stats **by id**: `attendees`, `events` and `cities` from `impactStats`,
and `members` from `stats`. Keep those ids when you update the numbers.

### 4.7 People

| List | File | Fields | Notes |
|---|---|---|---|
| Organizer (`organizer`) | `src/data/home.ts` | `name, role, bio, photo?, linkedin?, instagram?` | Footer, home organizer strip, About team section, certificate signature. **`photo` isn't displayed yet.** |
| Core team (`coreTeam`) | `src/data/about.ts` | `id, name, role, photo?, linkedin?, instagram?` | About page grid, any number of people. **`photo` isn't displayed yet.** |
| Past speakers and judges (`pastSpeakers`) | `src/data/speak.ts` | `id, name, role, company, topic, kind, accent` | Speak page. **The first 3 are featured as cards**; all of them scroll in the strip. `topic` ≤ 50 characters. |

### 4.8 Community channels — `src/data/site.ts` and `src/data/community.ts`

- `communityChannels` (site.ts): `{ id, name, handle, blurb, href, accent }` for Discord, WhatsApp
  and X. `blurb` ≤ 110 characters. These appear on the home page and the Community page.
- `channelStats` (community.ts): `{ members, note, online? }` per channel id. `online` is Discord
  only and shows "64 online now". These are hand-entered numbers.

### 4.9 Volunteer certificates — `src/data/volunteers.ts`

One entry per volunteer the organizers select. Their private link is `/certificates/<token>`.

| Field | | Type | Notes |
|---|---|---|---|
| `token` | ✅ | text | **Long and random** (24+ letters and digits). Never a name or a sequence number. |
| `name` | ✅ | text | Pre-fills the certificate. The volunteer can edit it (hard limit 40). |
| `tier` | ✅ | `volunteer` / `star` / `outstanding` | Volunteer: no photo. Star: round photo. Outstanding: tall portrait panel. |
| `designation` | ✅ | text | Pre-filled. Editable on Star and Outstanding only (hard limit 48). |
| `contribution` | ✅ | text | Printed after "for", e.g. `"volunteering at DevFest Nagpur 2025"`. ≤ 100 characters. |
| `issuedOn` | ✅ | date | Printed as "1 September 2026" |
| `certificateId` | ✅ | text | Printed on the certificate, e.g. `"GDGNGP-2026-0301"` |

### 4.10 Chatbot FAQ — `src/data/faq.ts`

The chatbot answers most questions from the content above automatically: events, mentors, jobs,
news and channels. This file covers general questions it can't work out from data.

| Field | | Type | Notes |
|---|---|---|---|
| `q` | ✅ | text | The question, in plain words |
| `a` | ✅ | text | Shown word for word, ≤ 300 characters. **Only write what is true** — no dates or counts, because those go stale. |
| `tags` | ◻️ | list of text | Other words people use for this question, which helps matching |
| `links` | ◻️ | list | Each is `{ label, href }`, shown as buttons under the answer |

### 4.11 Site settings and links — `src/data/site.ts`

| Setting | Current state |
|---|---|
| `site.email`, `site.city`, names | Set |
| `socials.instagram`, `linkedin`, `x`, `youtube`, `chapter` | Set, but check each one opens the right page |
| `socials.discord` | **`"#"` placeholder.** Used by every "Join the community" button. |
| `socials.whatsapp` | **`"#"` placeholder** |
| `socials.calendly` | **`"#"` placeholder.** Collaborate page, "Book a call". |
| `socials.mediaKit` | **`"#"` placeholder.** Collaborate page, "Download the media kit". Put the PDF in `/public` and link it. |

Navigation menus (`primaryNav`, `secondaryNav`, `footerColumns`) are also in this file.

### 4.12 Fixed page copy

Other page text lives in the data file for its page. Some sections are built for an exact number of
items, either a fixed grid or a heading that names the count:

| File | Content | Items to keep |
|---|---|---|
| `src/data/home.ts` | `valueProps` ("Why join"), `topics` (scrolling ticker) | **5** value props (2 wide cards, then 3). Topics: any number, each ≤ 20 characters. |
| `src/data/about.ts` | `milestones` (timeline), `pillars` | Any number of each (pillars are designed for 3) |
| `src/data/speak.ts` | Formats, what we look for, what you get, selection steps, FAQ | Formats: **5**. The rest: any number. |
| `src/data/collaborate.ts` | Sponsor tiers, audience mix (%), co-host steps, FAQ | Tiers: **3**, the middle one is `featured`. Steps: **3**. Audience %: should add up to 100. |
| `src/data/knowledge.ts` | Paths, video do's and don'ts, FAQ | Paths: **3** |
| `src/data/community.ts` | First-week steps, code of conduct points | Steps: **3**. Points: any number. |

**Headings that name a count.** If you change how many items one of these lists has, update its
heading too. The heading lives in the file shown, not in the data file.

| Heading | File | Tied to |
|---|---|---|
| "Five reasons this is worth your Saturday." | `src/components/home/WhyJoin.tsx` | `valueProps` |
| "Five ways to take the mic." | `src/app/speak/page.tsx` | `speakFormats` |
| "Three ways to back an event." | `src/app/collaborate/page.tsx` | `tiers` |
| "Your first week, in three steps." | `src/app/community/page.tsx` | `startSteps` |
| "Three ways in" (label) | `src/app/share-your-knowledge/page.tsx` | `paths` |
| "Three steps, no fee, no catch." | `src/components/mentorship/HowItWorks.tsx` | Steps inside that file |
| "Seven years, fifty events, one borrowed projector." | `src/components/about/Timeline.tsx` | The chapter's real history; keep it true |

---

## 5. Photos in `/public/community/`

The site expects exactly **`community-01.jpg` to `community-12.jpg`**. To replace a photo, save the new
one under the same name.

| File | Used in |
|---|---|
| `community-01` | **Home hero** (the big photo), home mosaic |
| `community-02`, `03` | Home mosaic. `02` also appears on the About hero. |
| `community-04` | About hero |
| `community-05`, `06`, `07` | Home mosaic and Community page. `07` also appears on the About hero. |
| `community-08` | Community page |
| `community-09`, `11` | Home mosaic |
| `community-10` | Home mosaic and About hero |
| `community-12` | Spare |

Event recap galleries can point at these files or at new ones. The placeholder events currently
reuse `02`, `05`, `07` and `11`. A folder per event under `/public/events/` keeps real recap photos
organised.

---

## 6. Content still needed before launch

- [ ] Real **events**, with 2 : 1 banners, recap photos, and YouTube ids for recorded talks
- [ ] Real, approved **mentors**: every current profile is a placeholder
- [ ] Real **opportunities** and **companies hiring**: every current listing is a placeholder
- [ ] Real **tech news** links: every current headline is illustrative
- [ ] **Community photos**: curated shots, ideally portrait, ≥ 1600 px
- [ ] **Organizer and core team**: names, roles, links. Portraits need a small code change to display.
- [ ] **Past speakers and judges**: people who have agreed to be listed
- [ ] **YouTube Live schedule** and recent **video ids**
- [ ] **Stats**: confirm every number, and the audience-mix percentages on Collaborate
- [ ] **Channel member counts** and the Discord online number
- [ ] **Links**: Discord, WhatsApp, Calendly and the media-kit PDF
- [ ] **Social share image**: 1200 × 630
- [ ] **Certificate recipients**: real volunteers with real random tokens
- [ ] **Privacy page**: organizer review of `src/app/privacy/page.tsx`
