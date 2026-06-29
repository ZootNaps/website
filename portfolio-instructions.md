# Portfolio Page — Build Brief (`/portfolio`)

> **What this file is:** a complete, build-ready brief for adding a personal **portfolio page** to this
> Next.js site. It was produced in a planning session with Gus. A fresh Claude Code chat should be able
> to read this and build the page with minimal back-and-forth.
>
> **How to use it (next chat):** read this top to bottom, then ask Gus for the items in
> **"What Gus must provide"** (or scaffold first with `TODO(GUS)` placeholders and let him fill them in).
>
> **Housekeeping:** this file lives at the repo root, so it auto-loads into every Claude Code session for
> this project. That's intentional for the build. **Delete or rename it once the portfolio page is done.**

---

## 1. The mission (locked)

Gus is building an **evergreen personal portfolio** he can send to potential employers when applying for
jobs. It is **generic** — NOT tailored to any single job posting.

**Positioning:** Gus Joseph = **content consultant / head-of-content**.
Narrative in one line: *"I create content that converts, and I help others create content that converts."*
Full **production + post-production** skillset (ideation → filming → editing → distribution).

**Two co-equal "#1" credibility anchors at the top of the page:**
1. **Gus's own YouTube content.**
2. **The Lex Fridman Podcast** — Gus was its **former lead editor**; framed as *"the #1 AI podcast in the world."*
   (Label clearly as a **former** role — not current.)

The page is a **wall of work**, not an essay. Minimal copy. Let the videos and metrics speak.

---

## 2. Hard rules (do not violate)

1. **NEVER fabricate anything.** No invented view counts, likes, reshares, client names, quotes, or video
   IDs. Every value Gus hasn't supplied uses the literal string `TODO(GUS)` and renders as a **visually
   obvious placeholder** (e.g. an amber badge) so Gus can see exactly what's missing.
2. **NO agency metrics.** Do not put the South Lamar Studios marketing numbers anywhere (no "95% success
   rate", no "3x ROI", no "$800K revenue"). **Only per-video / per-client content metrics** that Gus
   provides personally.
3. **NEVER self-host video.** All video is embedded from YouTube (zero hosting cost, no big files).
4. **Keep the page UNLISTED:** `noindex`, kept out of the sitemap, and **not linked** in the nav/header/footer.
5. **Keep copy minimal.** Short section labels; no long bios.

---

## 3. Page structure (top → bottom)

| # | Section | What it shows | Embeds | Metrics |
|---|---------|---------------|--------|---------|
| 1 | **Hero** | Name, title ("Content Consultant"), one-line tagline. Dark teal bg, white text. 2 lines max. | none | none |
| 2 | **Two co-equal #1 anchors** | Side-by-side cards (stack on mobile), equal weight: (a) Gus's own channel, (b) Lex Fridman ("Former Lead Editor"). Each: featured video + channel-level metrics + channel link. | YouTube | channel-level, from Gus |
| 3 | **What I do** | 2–3 sentences on the create + help-others-create positioning. White bg. | none | none |
| 4 | **Client / founder video work** | The core proof. Video-by-video grid. Each card: embed + client name/title + per-video metrics + optional "founder reshared on LinkedIn" proof point. Cream bg, widest container. Grid 1/2/3 cols. | YouTube | per-video, from Gus |
| 5 | **Audio podcast cover-art wall** | Grid of cover art for audio-only shows Gus worked on (image + title + link out). White bg. Grid 2/3/4 cols. | none (images) | none |
| 6 | **Contact CTA** | "Want to work together?" + primary button to `/contact` (confirm with Gus). Optional LinkedIn button. Dark teal bg. | none | none |

---

## 4. Technical scaffold (confirmed against this repo)

Create **three files** in the existing `(pages)` route group → page is reachable at **`/portfolio`**:

1. **`src/app/(pages)/portfolio/layout.tsx`** — server component. Mirrors `contact/layout.tsx`: a
   pass-through layout that exports `metadata`. **This is where `robots: { index: false, follow: false }`
   lives** (client components can't export metadata).
   ```tsx
   import type { Metadata } from "next";
   export const metadata: Metadata = {
     title: "Portfolio | Gus Joseph",
     description: "Content work by Gus Joseph — YouTube, podcasts, client videos.",
     robots: { index: false, follow: false },
   };
   export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
     return <>{children}</>;
   }
   ```
2. **`src/app/(pages)/portfolio/page.tsx`** — starts with `'use client'` (Framer Motion / interactivity,
   same as `contact/page.tsx`). Wraps everything in `MainLayout`. Renders **only** from `./content`.
   Do **not** export metadata here.
3. **`src/app/(pages)/portfolio/content.ts`** — the single source of truth for all links, IDs, metrics,
   captions. **Gus edits only this file.** Full shape in §6.

**Unlisted recipe (both steps required):**
- `robots: { index: false, follow: false }` in `layout.tsx` (above).
- Do **NOT** add `/portfolio` to the `staticPages` array in `src/app/sitemap.ts` (omission is sufficient).
- Optional belt-and-suspenders: add `'/portfolio'` to the `exclude` array in `next-sitemap.config.js`.
- Do **NOT** add a `Disallow` for it in robots.txt (that would advertise the URL). Do **NOT** link it in
  `Header.tsx` / `Footer.tsx`.

**Stack:** Next.js 15.3.1 (App Router), TypeScript, Tailwind **v4** (config lives in `globals.css` via
`@theme` — no `tailwind.config.js` extension needed), Framer Motion, `next/image`.

---

## 5. Embed recipes (verified against current docs)

### YouTube — use the facade component (performance + zero cost)
Use **`@next/third-parties/google` → `YouTubeEmbed`**. It renders a lightweight thumbnail + play button
(~15–20 KB) and only injects the real iframe on click. 20 videos = 20 thumbnails at load, **not** 20 heavy
iframes (~500 KB each). Video stays on YouTube's CDN → **no hosting cost**.

```bash
# CONFIRMED NOT YET INSTALLED in this repo (as of this brief) — run this first:
npm install @next/third-parties
```
```tsx
import { YouTubeEmbed } from '@next/third-parties/google';

<YouTubeEmbed
  videoid="ELEVEN_CHAR_ID"
  height={400}
  playlabel="Play: video title"
  params="rel=0&modestbranding=1"
/>
```
Props: `videoid` (required), `height`/`width`, `playlabel` (use it — a11y/SEO), `params` (query string),
`style`. Put metrics as plain JSX below the embed. Works fine inside a `'use client'` page.

> For the two top anchor videos (first viewport), you may use a **direct** iframe **without** `loading="lazy"`
> so they appear instantly. Everything below the fold should use the facade or `loading="lazy"`.

### LinkedIn — prefer the fallback card (default), iframe only if needed
LinkedIn's native embed (post "···" menu → "Embed this post") is **flaky**: only works for fully public
posts, loads LinkedIn's full JS runtime, can render **blank** if the viewer isn't logged in or a CSP/cookie
banner blocks it, and **isn't styleable**. For a portfolio Gus sends to employers, **a static card is the
safer default** — it never fails, loads <100 ms, puts the metric front and center.

```tsx
// Screenshot the post (100% zoom, sidebar hidden) → save to /public/linkedin/
function LinkedInProofCard({ screenshotSrc, altText, metric, postUrl }: {
  screenshotSrc: string; altText: string; metric: string; postUrl: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
      <a href={postUrl} target="_blank" rel="noopener noreferrer">
        <Image src={screenshotSrc} alt={altText} width={504} height={380} className="w-full object-cover" />
      </a>
      <div className="p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{metric}</span>
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary underline">
          View on LinkedIn
        </a>
      </div>
    </div>
  );
}
```
Cap native LinkedIn iframes at **2–3 max** if Gus insists on live ones.

### Spotify / Apple (audio flagships, optional)
Copy-paste iframes; add `loading="lazy"` yourself (Spotify/Apple don't include it). Spotify episode height
`152` (compact) or `352` (expanded). These are lightweight audio players — zero hosting cost.

### Audio podcast cover-art wall
Responsive grid of `next/image` cover art, each linking out. **Download covers to
`/public/images/portfolio/`** — do NOT hotlink external CDNs (they 403 or change URLs). Use `fill` +
`sizes` + an `aspect-square` parent (prevents layout shift). No iframes, no players → fast regardless of count.

---

## 6. The single content file — `content.ts` (edit ONLY this to add work)

```ts
// src/app/(pages)/portfolio/content.ts
// Edit THIS FILE to add videos, metrics, podcasts, links. Never fabricate — use TODO(GUS) strings.

export type Metric = { label: string; value: string }; // e.g. { label: "Views", value: "1.2M" }

export type LinkedInProofPoint = {
  founderName: string;
  founderTitle: string;        // "CEO, Acme Corp"
  postUrl: string;
  metric: Metric;              // engagement on the LinkedIn post
};

export type YoutubeVideoItem = {
  type: 'youtube';
  youtubeId: string;           // 11-char ID from youtube.com/watch?v=XXXXXXXXXXX
  title: string;
  clientName?: string;         // omit for Gus's own videos
  clientTitle?: string;        // "CEO, Company Name"
  metrics: Metric[];           // Gus supplies — views, likes, etc.
  linkedInProof?: LinkedInProofPoint;
  section: 'own' | 'client';
  order: number;               // lower = shown first within its section
};

export type AudioPodcastItem = {
  type: 'audio';
  title: string;
  coverArtSrc: string;         // '/images/portfolio/name.jpg' (local, preferred)
  podcastUrl: string;          // Spotify / Apple / show site
  description?: string;        // 1 line max
  order: number;
};

export type CredibilityAnchor = {
  id: 'own-channel' | 'lex-fridman';
  headline: string;            // "#1 AI Podcast in the World"
  credential: string;          // "Former Lead Editor — Lex Fridman Podcast"
  featuredYoutubeId: string;   // embedded as the visual anchor
  channelUrl: string;
  metrics: Metric[];           // channel-level metrics Gus provides
};

export type HeroContent = { name: string; title: string; tagline: string };

// ─── POPULATE THESE ──────────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  name: 'Gus Joseph',
  title: 'Content Consultant',
  tagline: 'TODO(GUS): one-line positioning, e.g. "I create content that converts, and I help founders do the same."',
};

export const credibilityAnchors: CredibilityAnchor[] = [
  {
    id: 'own-channel',
    headline: 'TODO(GUS): channel headline (e.g. subscriber count or niche claim)',
    credential: 'My YouTube Channel',
    featuredYoutubeId: 'TODO(GUS)',
    channelUrl: 'TODO(GUS)',
    metrics: [{ label: 'TODO(GUS)', value: 'TODO(GUS)' }],
  },
  {
    id: 'lex-fridman',
    headline: '#1 AI Podcast in the World',
    credential: 'Former Lead Editor — Lex Fridman Podcast',
    featuredYoutubeId: 'TODO(GUS)',          // a representative episode Gus edited
    channelUrl: 'https://www.youtube.com/@lexfridman',
    metrics: [{ label: 'TODO(GUS)', value: 'TODO(GUS)' }],
  },
];

export const clientVideos: YoutubeVideoItem[] = [
  // TODO(GUS): one entry per client/founder video. Example:
  // {
  //   type: 'youtube', youtubeId: 'XXXXXXXXXXX', title: 'Video title',
  //   clientName: 'First Last', clientTitle: 'CEO, Company',
  //   metrics: [{ label: 'Views', value: 'TODO(GUS)' }, { label: 'Likes', value: 'TODO(GUS)' }],
  //   linkedInProof: { founderName: 'First Last', founderTitle: 'CEO, Company',
  //     postUrl: 'https://linkedin.com/posts/...', metric: { label: 'Post Views', value: 'TODO(GUS)' } },
  //   section: 'client', order: 1,
  // },
];

export const audioPodcasts: AudioPodcastItem[] = [
  // TODO(GUS): one entry per audio-only podcast. Put cover art in /public/images/portfolio/.
  // { type: 'audio', title: 'Podcast Name', coverArtSrc: '/images/portfolio/name.jpg',
  //   podcastUrl: 'https://...', description: 'Optional one-liner', order: 1 },
];
```

---

## 7. Reuse the existing design system (don't reinvent)

On-brand is nice-to-have, not required — but these components/tokens make it fast and consistent.

**Components** (all already in the repo):
- `MainLayout` — `@/components/layout/MainLayout` — `{ children }`. Outermost wrapper; adds Header/Footer +
  `pt-20`. Use exactly like `contact/page.tsx`.
- `Section` — `@/components/ui/Section` — `background: 'white'|'light'|'primary'|'secondary'`,
  `spacing: 'sm'|'md'|'lg'|'none'`, `container`, `containerSize`, `id`, `className`. `light` = cream,
  `primary` = dark teal + white text.
- `Container` — `@/components/ui/Container` — `size: 'sm'|'md'|'lg'|'xl'|'full'`. Use `xl` for the video grid.
- `Typography` — `@/components/ui/Typography` — `variant: h1..h4|subheading|body-lg|body|small`,
  `color: default|primary|secondary|white|gray`. Headings get Plus Jakarta Sans automatically.
- `Button` — `@/components/ui/Button` — `variant: 'primary'(coral)|'secondary'(teal)|'outline'`,
  `size`, `href`. On dark (`primary`) backgrounds use `outline` or a white button (coral-on-teal lacks contrast).
- **Do NOT** use `LogoCarousel` for the cover-art wall — use a plain Tailwind `grid`.

**Tokens** (Tailwind v4 utilities, from `globals.css`):
- `bg-primary`/`text-primary` = `#2a3d45` (dark teal) · `bg-secondary`/`text-secondary` = `#e76f51` (coral)
- `bg-bg` = `#f8f3ed` (cream page bg) · `bg-bg-light` = `#fcf9f4` · `text-gray` = `#718096`
- Fonts: `font-sans` = Inter (body) · `font-display` = Plus Jakarta Sans (headings, auto on h1–h6)
- Helpers: `.card`, `shadow-soft/medium/strong/glow`, `.text-gradient`

---

## 8. Performance rules

- **YouTube:** always use the `YouTubeEmbed` facade (or `loading="lazy"` on raw iframes below the fold).
  Loading all iframes up front = 7+ MB on 15 videos → unusable on mobile.
- **Reserve space** for every embed/image to avoid layout shift: iframe wrapper `relative pb-[56.25%]`
  (16:9) with `iframe absolute inset-0 w-full h-full`; images via `next/image` `fill` + `aspect-square`.
- **First viewport** (top anchor videos): load immediately (no `lazy`). **Everything below:** lazy.
- **LinkedIn:** prefer static cards (zero iframes). If native, cap at 2–3.
- **Cover art:** download locally to `/public/images/portfolio/`; never hotlink. If an external image host
  is unavoidable, add its hostname to `next.config.ts` `images.remotePatterns` (currently only
  `images.ctfassets.net` is allowed) — flag it, don't silently break.

---

## 9. What Gus must provide

Collect these (or scaffold with `TODO(GUS)` and fill in later):

- [ ] **Hero tagline** — one sentence positioning.
- [ ] **Own YouTube:** channel URL + a featured video ID + any channel metrics (subs/views — exact numbers).
- [ ] **Lex Fridman:** a representative episode video ID he edited + any numbers to show (label as *former* lead editor).
- [ ] **Client/founder videos** — per video: YouTube ID, title, client name + title/company, per-video
  metrics (views/likes/reshares), and (if any) the LinkedIn proof point (founder name, post URL, post metric).
- [ ] **Audio podcasts** — per show: name, cover art image (file → `/public/images/portfolio/`), link, optional one-liner.
- [ ] **Cover art hosting:** local files vs external URLs (if external, list domains for `remotePatterns`).
- [ ] **Contact CTA target:** `/contact`, email, or Calendly? Include a LinkedIn button? (URL if yes.)
- [ ] **Headshot** (optional) for the hero.

---

## 10. Suggested build order (next chat)

1. `npm install @next/third-parties` (confirmed not yet installed).
2. Create `content.ts` with the full type shapes + `TODO(GUS)` placeholders (§6).
3. Create `layout.tsx` (metadata + noindex) and `page.tsx` (`'use client'` + `MainLayout`).
4. Build sections 1→6 (§3), rendering from `content.ts`, reusing `Section`/`Container`/`Typography`/`Button`.
5. Build small presentational components: `YouTubeCard`, `LinkedInProofCard`, `PodcastCoverGrid`.
6. Make every `TODO(GUS)` render as an obvious amber placeholder badge.
7. Verify `/portfolio` loads, is **not** in the sitemap, and isn't linked anywhere. Confirm fast load on mobile.
8. Hand back to Gus to drop in real links + metrics via `content.ts`.
