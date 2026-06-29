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
  postUrl: string;
  authorName?: string;         // who posted it
  authorTitle?: string;        // "Co-founder, OpenPhone (now Quo)"
  metrics: Metric[];           // reactions, comments, reposts
  /** Optional local screenshot of the post, e.g. '/images/portfolio/openphone-sona.png'. */
  screenshotSrc?: string;
};

/** Anything that can appear in a work grid. */
export type WorkItem = YoutubeVideoItem | LinkedInPostItem;

export type AudioPodcastItem = {
  type: 'audio';
  title: string;
  coverArtSrc: string;         // '/images/portfolio/name.jpg' (local file — preferred)
  podcastUrl: string;          // Spotify / Apple / show site
  description?: string;        // 1 line max
};

export type CredibilityAnchor = {
  id: 'own-channel' | 'lex-fridman';
  headline: string;            // "#1 AI Podcast in the World"
  credential: string;          // "Former Lead Editor — Lex Fridman Podcast"
  featuredYoutubeId: string;   // embedded as the visual anchor
  channelUrl: string;
  metrics: Metric[];           // channel-level (or featured-video) metrics you provide
};

export type HeroContent = { name: string; title: string; tagline: string };

export type WhatIDoContent = { heading: string; paragraphs: string[] };

export type ContactCTA = {
  heading: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;         // where the main button points (default: '/contact')
  linkedInUrl?: string;        // optional LinkedIn button. TODO(GUS) hides it behind a badge.
};

// ─── POPULATE THESE ──────────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  name: 'Gus Joseph',
  title: 'Content Consultant',
  tagline:
    'TODO(GUS): one-line positioning, e.g. "I create content that converts, and I help founders do the same."',
};

export const credibilityAnchors: CredibilityAnchor[] = [
  {
    id: 'own-channel',
    headline: 'ZootNaps VR',
    credential: 'My YouTube Channel',
    featuredYoutubeId: '4Bwx8oMiQ8g', // "The Video that got me hired by Lex Fridman"
    channelUrl: 'https://www.youtube.com/@zootnaps',
    metrics: [
      { label: 'Subscribers', value: '12K' },
      { label: 'Total Views', value: '3.5M' },
    ],
  },
  {
    id: 'lex-fridman',
    headline: '#1 AI Podcast in the World',
    credential: 'Former Lead Editor — Lex Fridman Podcast',
    featuredYoutubeId: '98HZanvAJ8Y', // Brian Greene episode
    channelUrl: 'https://www.youtube.com/@lexfridman',
    metrics: [
      { label: 'Views', value: '2.1M' },     // for the featured Brian Greene episode
      { label: 'Comments', value: '2,400' },
    ],
  },
];

export const whatIDoContent: WhatIDoContent = {
  heading: 'What I do',
  paragraphs: [
    'TODO(GUS): 2–3 sentences on the "create + help others create" positioning — full production and post-production, from ideation and filming through editing and distribution.',
  ],
};

// ── My own content (YouTube channel + personal LinkedIn) ─────────────────────
export const myContent: WorkItem[] = [
  {
    type: 'youtube',
    youtubeId: 'XnU7sTGjZBA',
    title: 'Which VR Headset Should I Buy?',
    metrics: [
      { label: 'Views', value: '629K' },
      { label: 'Comments', value: '2,556' },
    ],
  },
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
    title: 'Podcast Gear Comparison Guide',
    postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7262142418974584832',
    metrics: [
      { label: 'Reactions', value: '50' },
      { label: 'Comments', value: '16' },
    ],
  },
];

// ── Lex Fridman Podcast — selected edits ─────────────────────────────────────
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

// ── Client & founder work ────────────────────────────────────────────────────
export const clientWork: WorkItem[] = [
  // OpenPhone (now Quo) — Daryna Kulya
  {
    type: 'youtube',
    youtubeId: 'p8DdE5oTChI',
    title: 'Pinks Windows Customer Story',
    clientName: 'Daryna Kulya',
    clientTitle: 'OpenPhone (now Quo)',
    metrics: [{ label: 'TODO(GUS)', value: 'TODO(GUS)' }], // add views/likes when you have them
    linkedInProof: {
      founderName: 'Daryna Kulya',
      founderTitle: 'OpenPhone (now Quo)',
      postUrl: 'TODO(GUS)',                                 // Gus: add the LinkedIn post URL
      metric: { label: 'TODO(GUS)', value: 'TODO(GUS)' },   // "I'll find the LinkedIn stats"
    },
  },
  {
    type: 'linkedin',
    title: 'First 1,000 Customers',
    authorName: 'Daryna Kulya',
    authorTitle: 'OpenPhone (now Quo)',
    postUrl:
      'https://www.linkedin.com/posts/darynakulya_if-youve-ever-thought-i-wish-i-could-find-activity-7345518826563751939-RhuA',
    metrics: [
      { label: 'Reactions', value: '97' },
      { label: 'Comments', value: '10' },
    ],
  },
  {
    type: 'linkedin',
    title: 'Sona Launch (founder-facing)',
    authorName: 'Daryna Kulya',
    authorTitle: 'OpenPhone (now Quo)',
    postUrl:
      'https://www.linkedin.com/posts/darynakulya_today-marks-an-important-day-in-openphones-activity-7318659930708680705-wlhH',
    metrics: [
      { label: 'Reactions', value: '465' },
      { label: 'Comments', value: '77' },
      { label: 'Reposts', value: '10' },
    ],
  },
  {
    type: 'linkedin',
    title: 'Product Updates',
    authorTitle: 'OpenPhone (now Quo)',
    postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7254876809429671940',
    metrics: [
      { label: 'Reactions', value: '234' },
      { label: 'Comments', value: '41' },
      { label: 'Reposts', value: '24' },
    ],
  },
  {
    type: 'linkedin',
    title: 'Sona Launch (product)',
    authorTitle: 'OpenPhone (now Quo)',
    postUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7318647389936918528',
    metrics: [
      { label: 'Reactions', value: '340' },
      { label: 'Comments', value: '61' },
      { label: 'Reposts', value: '35' },
    ],
  },
  // Copenhagen Atomics — Thomas Jam Pedersen (founder)
  {
    type: 'linkedin',
    title: 'We are building the most efficient nuclear…',
    authorName: 'Thomas Jam Pedersen',
    authorTitle: 'Copenhagen Atomics',
    postUrl:
      'https://www.linkedin.com/posts/thomas-jam-pedersen-9595a4_we-are-building-the-most-efficient-nuclear-ugcPost-7312398829243326465-2UIi',
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
    metrics: [
      { label: 'Reactions', value: '370' },
      { label: 'Comments', value: '26' },
      { label: 'Reposts', value: '13' },
    ],
  },
  // TODO(GUS): "will add more when I return" — drop new client entries here.
];

export const audioPodcasts: AudioPodcastItem[] = [
  {
    type: 'audio',
    title: 'Founder Facing',
    coverArtSrc: '/images/portfolio/founder-facing.png',
    podcastUrl: 'TODO(GUS)', // add the Spotify / Apple / show link
  },
  {
    type: 'audio',
    title: 'The Dallas-Fort Worth Real Estate Podcast',
    coverArtSrc: '/images/portfolio/dallas-fort-worth-real-estate.png',
    podcastUrl: 'TODO(GUS)',
  },
  {
    type: 'audio',
    title: 'Killing Time with Brynn & Malaika',
    coverArtSrc: '/images/portfolio/killing-time.png',
    podcastUrl: 'TODO(GUS)',
  },
  // TODO(GUS): more shows you worked on? Candidates found on your Mac — confirm if any belong here:
  //   "In-Authentic" (J.R. Refound), "Forbidden Fruit" (Cosmic Days), an Austin podcast.
];

export const contactCTA: ContactCTA = {
  heading: 'Want to work together?',
  subtext: 'TODO(GUS): one short line inviting employers or founders to reach out.',
  primaryLabel: 'Get in touch',
  primaryHref: '/contact',
  linkedInUrl: 'https://www.linkedin.com/in/gusjoseph',
};
