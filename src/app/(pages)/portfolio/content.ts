// src/app/(pages)/portfolio/content.ts
// ─────────────────────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH for the /portfolio page.
//
//  👉 Edit ONLY this file to add videos, posts, metrics, podcasts, links, copy.
//     The React components render whatever is here — you never touch them.
//
//  ⚠️  NEVER fabricate a number, name, quote, or video ID. If you don't have a
//     real value yet, leave the literal string "TODO(GUS)". It renders on the
//     page as an obvious amber badge so you can see exactly what's still missing.
//
//  ⚠️  No agency (South Lamar Studios) metrics here — only per-video / per-post /
//     per-client / channel-level content metrics that you provide personally.
//
//  LINKEDIN EMBEDS: each LinkedIn post can carry an `embed` (the official
//  linkedin.com/embed iframe). The site CSP (src/middleware.ts) must allow
//  https://www.linkedin.com in frame-src or the embeds render blank.
//
//  PAGE STORY (top → bottom):
//    1. Hero            — "Hey, I'm Gus." + your photo + the featured VR video + channel stats
//    2. Lex Fridman     — the marquee credential, front & center
//    3. My content      — your other videos + your LinkedIn posts (add more here)
//    4. Founder work    — Copenhagen Atomics campaign + the Quo client block
//    5. Podcasts        — the audio cover-art wall
//    6. Close           — the contact call-to-action
//
//  Display order = array order. To reorder cards, move the entries up/down.
// ─────────────────────────────────────────────────────────────────────────────

/** The literal placeholder string. Anything containing this renders as an amber badge. */
export const TODO = 'TODO(GUS)';

/** True when a value is missing or is still an unfilled `TODO(GUS)` placeholder. */
export function isTodo(value: string | undefined | null): boolean {
  return !value || value.includes('TODO(GUS)');
}

// ─── TYPE SHAPES ─────────────────────────────────────────────────────────────

export type Metric = { label: string; value: string }; // e.g. { label: "Views", value: "629K" }

/**
 * The official LinkedIn embed iframe for a post. Get it from the post's
 * "⋯ → Embed this post" menu — copy the `src` and `height` out of the <iframe>.
 * width is always ~504px; the card scales it down responsively.
 */
export type LinkedInEmbed = { src: string; height: number };

export type LinkedInProofPoint = {
  founderName: string;
  founderTitle: string;        // "CEO, Acme Corp"
  postUrl: string;
  metric: Metric;              // engagement on the LinkedIn post
  /** Optional local screenshot of the post, e.g. '/images/portfolio/acme-post.png'. */
  screenshotSrc?: string;
};

/** A YouTube video card (your own content, Lex edits, or a client video). */
export type YoutubeVideoItem = {
  type: 'youtube';
  youtubeId: string;           // 11-char ID from youtube.com/watch?v=XXXXXXXXXXX
  title: string;
  clientName?: string;         // person — omit for your own videos
  clientTitle?: string;        // "CEO, Company" or context like "Lex Fridman Podcast"
  metrics: Metric[];           // views, comments, etc.
  linkedInProof?: LinkedInProofPoint; // optional "founder reshared this" proof
};

/** A standalone LinkedIn post card (no associated video). */
export type LinkedInPostItem = {
  type: 'linkedin';
  title: string;
  postUrl: string;             // public URL (the card's "View on LinkedIn" link)
  embed?: LinkedInEmbed;       // the live embed iframe — renders the actual post
  authorName?: string;         // who posted it
  authorTitle?: string;        // "Co-founder, OpenPhone (now Quo)"
  metrics: Metric[];           // reactions, comments, reposts
  /** Optional local screenshot — only used as a fallback when there is no embed. */
  screenshotSrc?: string;
};

/** Anything that can appear in a work grid. */
export type WorkItem = YoutubeVideoItem | LinkedInPostItem;

/**
 * A grouped client campaign: a headline result strip + the actual posts/videos
 * that prove it. Use this (not loose cards) when you ran a *program* for a client
 * and want the result framed as one story.
 *
 * ⚠️  `stats` are campaign-level highlights — keep them platform-native and
 *     additive (impressions, followers, a real per-post engagement rate). No
 *     rolled-up "success rate / ROI / revenue" agency numbers.
 */
export type ClientCampaign = {
  client: string;        // "Copenhagen Atomics"
  label: string;         // "6-week organic LinkedIn program · Mar–Apr 2025"
  stats: Metric[];       // 2–4 headline numbers (rendered as a prominent strip)
  note?: string;         // one short, true qualifier, e.g. "Organic — zero ad spend."
  items: WorkItem[];     // the proof: the real posts/videos from the campaign
};

/**
 * A named client block WITHOUT a headline stat strip — just the client name, a
 * one-line caption (platforms / what you did), and the real posts/videos. Use
 * this for ongoing client relationships where the work itself is the proof.
 */
export type ClientBlock = {
  client: string;        // "Quo (OpenPhone)"
  caption?: string;      // "Founder-led content — LinkedIn & YouTube"
  items: WorkItem[];
};

export type AudioPodcastItem = {
  type: 'audio';
  title: string;
  coverArtSrc: string;         // '/images/portfolio/name.jpg' (local file — preferred)
  podcastUrl: string;          // Spotify / Apple / show site
  description?: string;        // 1 line max
};

/** A heading + intro line that opens a section. */
export type SectionCopy = {
  eyebrow?: string;            // small label above the heading
  heading: string;
  intro?: string;
};

export type HeroContent = {
  greeting: string;            // the giant serif line, e.g. "Hey, I'm Gus."
  intro: string;               // 1–2 snappy sentences of positioning
  taglines: string[];          // three short taglines that preview the page
  photoSrc: string;            // your real photo
  photoAlt: string;
  /** The single video featured in the hero (your most-watched / signature piece). */
  featured: { youtubeId: string; title: string };
  /** Your channel, shown as a stat line with a link out. */
  channel: { handle: string; url: string; stats: Metric[] };
};

export type ContactCTA = {
  heading: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;         // where the main button points (default: '/contact')
  linkedInUrl?: string;        // optional LinkedIn button. TODO(GUS) hides it behind a badge.
};

// ─── 1 · HERO ────────────────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  greeting: "Hey, I'm Gus.",
  intro: "I'm a B2B content creator.",
  taglines: [
    'I make content that helps businesses convert.',
    'I worked with Lex Fridman on the #1 technology podcast in the world.',
    'I grow audiences for founders and B2B brands — and I can do the same for you.',
  ],
  // 👉 SAVE YOUR HEADSHOT to: public/images/portfolio/gus-headshot.png
  photoSrc: '/images/portfolio/gus-headshot.png',
  photoAlt: 'Gus Joseph',
  featured: {
    youtubeId: 'XnU7sTGjZBA',
    title: 'Which VR Headset Should I Buy?',
  },
  channel: {
    handle: '@zootnaps',
    url: 'https://www.youtube.com/@zootnaps',
    stats: [
      { label: 'Subscribers', value: '12K' },
      { label: 'Total Views', value: '3.5M' },
    ],
  },
};

// ─── 2 · LEX FRIDMAN PODCAST (the marquee credential) ────────────────────────

export const lexContent: SectionCopy = {
  eyebrow: 'Former Lead Editor · #1 technology podcast in the world',
  heading: 'The Lex Fridman Podcast',
  intro:
    'People always ask how I got the job. Simple — I got his attention. I left my corporate job ' +
    'mid-pandemic, taught myself to edit, and ended up helping shape one of the most influential ' +
    'shows on the internet — building a team and publishing dozens of episodes that pulled tens of ' +
    'millions of views.',
};

export const lexWork: WorkItem[] = [
  {
    type: 'youtube',
    youtubeId: '98HZanvAJ8Y',
    title: 'Brian Greene — Lex Fridman Podcast',
    clientTitle: 'Lex Fridman Podcast',
    metrics: [
      { label: 'Views', value: '2.1M' },
      { label: 'Comments', value: '2,400' },
    ],
  },
  {
    type: 'youtube',
    youtubeId: 'hwYzrSF9unk',
    title: 'Huberman — Jiu Jitsu (non-podcast edit)',
    clientTitle: 'Lex Fridman Podcast',
    metrics: [
      { label: 'Views', value: '1.7M' },
      { label: 'Comments', value: '1,800' },
    ],
  },
];

// ─── 3 · MY CONTENT (your own videos + LinkedIn posts) ───────────────────────
//  The featured VR video lives in the hero above. This is everything else you
//  make on your own. 👉 Drop new personal LinkedIn posts / videos in here.

export const myContentSection: SectionCopy = {
  heading: 'More of my own work',
  intro: 'The stuff I make when no one is assigning it — long-form, shorts, and posts.',
};

export const myContent: WorkItem[] = [
  {
    type: 'youtube',
    youtubeId: 'gth4qH6hVMc',
    title: 'How to Get the Best Tracking on Your Oculus Rift',
    metrics: [
      { label: 'Views', value: '263K' },
      { label: 'Comments', value: '407' },
    ],
  },
  {
    type: 'youtube',
    youtubeId: 'ORyfH3YE8FY',
    title: "An Early Adopter's Advice for New VR Owners",
    metrics: [
      { label: 'Views', value: '216K' },
      { label: 'Comments', value: '581' },
    ],
  },
  {
    type: 'linkedin',
    title: 'Podcast Gear Setup Comparison',
    postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7262142418974584832',
    embed: {
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7262141564569702400?collapsed=1',
      height: 543,
    },
    metrics: [
      { label: 'Reactions', value: '50' },
      { label: 'Comments', value: '16' },
    ],
  },
  // 👉 Add more of your own LinkedIn posts / videos here.
];

// ─── 4 · FOUNDER & CLIENT WORK ───────────────────────────────────────────────

export const clientsSection: SectionCopy = {
  heading: 'I help founders grow.',
  intro:
    "Since Lex, I've helped dozens of founders and execs turn what they know into content that " +
    'builds real audiences — for their company and for themselves. From deep tech to SaaS, and ' +
    'everything in between.',
};

// 4a. Campaigns — a program you ran, framed as one story (headline stat strip +
//     the real posts that prove it). See ClientCampaign for the no-agency-metrics rule.
export const clientCampaigns: ClientCampaign[] = [
  {
    client: 'Copenhagen Atomics',
    label: '6-week organic LinkedIn program · Mar–Apr 2025',
    // Only clean, additive, platform-native numbers. (Members-reached is omitted:
    // the source report had it for the founder page only, not the full program.)
    stats: [
      { label: 'Impressions', value: '157K+' },
      { label: 'New Followers', value: '1,050+' },
      { label: 'Top-Post Engagement', value: '14.7%' },
    ],
    note: 'Organic — zero ad spend. Founder + company page.',
    items: [
      {
        type: 'linkedin',
        title: 'We are building the most efficient nuclear…',
        authorName: 'Thomas Jam Pedersen',
        authorTitle: 'Copenhagen Atomics',
        postUrl:
          'https://www.linkedin.com/posts/thomas-jam-pedersen-9595a4_we-are-building-the-most-efficient-nuclear-ugcPost-7312398829243326465-2UIi',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7312398829243326465?collapsed=1',
          height: 879,
        },
        metrics: [
          { label: 'Reactions', value: '625' },
          { label: 'Comments', value: '36' },
          { label: 'Reposts', value: '25' },
        ],
      },
      {
        type: 'linkedin',
        title: "By 2050 the world's electricity demand will…",
        authorName: 'Thomas Jam Pedersen',
        authorTitle: 'Copenhagen Atomics',
        postUrl:
          'https://www.linkedin.com/posts/thomas-jam-pedersen-9595a4_by-2050-the-worlds-electricity-demand-will-activity-7313176237428883457-vpHg',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7313176236195782656?collapsed=1',
          height: 670,
        },
        metrics: [
          { label: 'Reactions', value: '370' },
          { label: 'Comments', value: '26' },
          { label: 'Reposts', value: '13' },
        ],
      },
    ],
  },
];

// 4b. Named client blocks — ongoing relationships where the work is the proof.
export const clientBlocks: ClientBlock[] = [
  {
    client: 'Quo (OpenPhone)',
    caption: 'Founder-led content — LinkedIn & YouTube',
    items: [
      {
        type: 'youtube',
        youtubeId: 'p8DdE5oTChI',
        title: 'Pinks Windows Customer Story',
        clientName: 'Daryna Kulya',
        clientTitle: 'OpenPhone (now Quo)',
        metrics: [], // optional: add real view/like metrics here when you have them
      },
      {
        type: 'linkedin',
        title: 'First 1,000 Customers',
        authorName: 'Daryna Kulya',
        authorTitle: 'OpenPhone (now Quo)',
        postUrl:
          'https://www.linkedin.com/posts/darynakulya_if-youve-ever-thought-i-wish-i-could-find-activity-7345518826563751939-RhuA',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7345518442667511808?collapsed=1',
          height: 543,
        },
        metrics: [
          { label: 'Reactions', value: '97' },
          { label: 'Comments', value: '10' },
        ],
      },
      {
        type: 'linkedin',
        title: 'Sona Launch (Founder)',
        authorName: 'Daryna Kulya',
        authorTitle: 'OpenPhone (now Quo)',
        postUrl:
          'https://www.linkedin.com/posts/darynakulya_today-marks-an-important-day-in-openphones-activity-7318659930708680705-wlhH',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7318656789653176320?collapsed=1',
          height: 543,
        },
        metrics: [
          { label: 'Reactions', value: '465' },
          { label: 'Comments', value: '77' },
          { label: 'Reposts', value: '10' },
        ],
      },
      {
        type: 'linkedin',
        title: 'Sona Launch (Quo)',
        authorTitle: 'OpenPhone (now Quo)',
        postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7254876809429671940',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7254874778975510529?collapsed=1',
          height: 543,
        },
        metrics: [
          { label: 'Reactions', value: '234' },
          { label: 'Comments', value: '41' },
          { label: 'Reposts', value: '24' },
        ],
      },
      {
        type: 'linkedin',
        title: 'Platform Update & New Features',
        authorTitle: 'OpenPhone (now Quo)',
        postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7318647389936918528',
        embed: {
          src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7318646133939916800?collapsed=1',
          height: 543,
        },
        metrics: [
          { label: 'Reactions', value: '340' },
          { label: 'Comments', value: '61' },
          { label: 'Reposts', value: '35' },
        ],
      },
    ],
  },
  // 👉 Add more clients here. Each becomes its own named block.
];

// ─── 5 · PODCASTS (audio cover-art wall) ─────────────────────────────────────

export const podcastsSection: SectionCopy = {
  heading: 'I make podcasts, too.',
  intro: 'Shows I produce and edit, end to end.',
};

export const audioPodcasts: AudioPodcastItem[] = [
  {
    type: 'audio',
    title: 'Founder Facing',
    coverArtSrc: '/images/portfolio/founder-facing.png',
    podcastUrl: '', // add the Spotify / Apple / show link
  },
  {
    type: 'audio',
    title: 'The Dallas-Fort Worth Real Estate Podcast',
    coverArtSrc: '/images/portfolio/dallas-fort-worth-real-estate.png',
    podcastUrl: '',
  },
  {
    type: 'audio',
    title: 'Killing Time with Brynn & Malaika',
    coverArtSrc: '/images/portfolio/killing-time.png',
    podcastUrl: '',
  },
];

// ─── 6 · CLOSE ───────────────────────────────────────────────────────────────

export const contactCTA: ContactCTA = {
  heading: "Let's work together.",
  subtext:
    "Hiring, collaborating, or just want to talk shop? I'm always up for a good conversation.",
  primaryLabel: 'Get in touch',
  primaryHref: '/contact',
  linkedInUrl: 'https://www.linkedin.com/in/gusjoseph',
};
