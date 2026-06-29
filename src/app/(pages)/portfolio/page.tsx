import Image from "next/image";

import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

import {
  heroContent,
  lexContent,
  lexWork,
  myContentSection,
  myContent,
  clientsSection,
  clientCampaigns,
  clientBlocks,
  podcastsSection,
  audioPodcasts,
  contactCTA,
  isTodo,
  type SectionCopy,
} from "./content";

import Reveal from "./_components/Reveal";
import WorkGrid from "./_components/WorkGrid";
import PodcastCoverGrid from "./_components/PodcastCoverGrid";
import CampaignHighlight from "./_components/CampaignHighlight";
import ExternalLink from "./_components/ExternalLink";
import YouTubeFacade from "./_components/YouTubeFacade";

// ─────────────────────────────────────────────────────────────────────────────
//  /portfolio — Gus Joseph's content portfolio, told as a story:
//    Hero (creator) → Lex Fridman (the credential) → my own work → founder work
//    → podcasts → close. Editorial look: serif headings, soft bands, loose embeds.
//
//  Everything rendered here comes from ./content.ts. To add real work, edit ONLY
//  that file. This page is UNLISTED (noindex via layout.tsx, omitted from the
//  sitemap, and not linked anywhere in the site).
// ─────────────────────────────────────────────────────────────────────────────

/** Shared section header: eyebrow + big serif heading + intro line. */
function SectionHeader({
  copy,
  align = "left",
}: {
  copy: SectionCopy;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {copy.eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {copy.eyebrow}
        </p>
      )}
      <h2 className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight text-primary md:text-5xl">
        {copy.heading}
      </h2>
      {copy.intro && (
        <p className="mt-5 text-lg leading-relaxed text-gray">{copy.intro}</p>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* 1 ── HERO ─────────────────────────────────────────────────────────── */}
      <Section background="light" spacing="lg" containerSize="xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: the pitch */}
          <Reveal className="lg:col-span-7">
            <h1 className="font-serif-display text-5xl font-bold leading-[1.02] tracking-tight text-primary sm:text-6xl md:text-7xl">
              {heroContent.greeting}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray md:text-xl">
              {heroContent.intro}
            </p>

            <ul className="mt-7 space-y-2.5">
              {heroContent.taglines.map((tagline, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base font-medium text-primary md:text-lg"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  {tagline}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {heroContent.channel.stats.map((stat, i) => (
                <span key={i} className="text-sm text-gray">
                  <strong className="text-base font-bold text-primary">{stat.value}</strong>{" "}
                  {stat.label}
                </span>
              ))}
              <ExternalLink href={heroContent.channel.url}>
                {heroContent.channel.handle} on YouTube
              </ExternalLink>
            </div>
          </Reveal>

          {/* Right: the face + the signature video */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="mx-auto flex max-w-sm flex-col gap-5 lg:ml-auto lg:mr-0">
              <div className="relative aspect-square w-full max-w-[300px] self-center overflow-hidden rounded-2xl bg-bg-dark ring-1 ring-black/5 lg:self-end">
                <Image
                  src={heroContent.photoSrc}
                  alt={heroContent.photoAlt}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <YouTubeFacade
                  youtubeId={heroContent.featured.youtubeId}
                  title={heroContent.featured.title}
                  eager
                />
                <p className="mb-0 mt-2.5 text-sm text-gray">{heroContent.featured.title}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 2 ── LEX FRIDMAN — the marquee credential (lavender band) ──────────── */}
      <Section background="white" spacing="lg" containerSize="lg" className="bg-lavender">
        <Reveal>
          <SectionHeader copy={lexContent} align="center" />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <WorkGrid items={lexWork} bare masonry />
        </Reveal>
      </Section>

      {/* 3 ── MY OWN WORK (videos + LinkedIn posts) ────────────────────────── */}
      <Section background="white" spacing="lg" containerSize="lg">
        <Reveal>
          <SectionHeader copy={myContentSection} />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <WorkGrid
            items={myContent}
            bare
            masonry
            emptyMessage="Add your own videos and posts to myContent in content.ts."
          />
        </Reveal>
      </Section>

      {/* 4 ── FOUNDER & CLIENT WORK ────────────────────────────────────────── */}
      <Section background="light" spacing="lg" containerSize="lg">
        <Reveal>
          <SectionHeader copy={clientsSection} />
        </Reveal>

        {/* 4a. Flagship campaigns (stat strip + proof) */}
        {clientCampaigns.length > 0 && (
          <div className="mt-12 space-y-12">
            {clientCampaigns.map((campaign) => (
              <Reveal key={campaign.client}>
                <CampaignHighlight campaign={campaign} />
              </Reveal>
            ))}
          </div>
        )}

        {/* 4b. Named client blocks */}
        {clientBlocks.map((block) => (
          <Reveal key={block.client} className="mt-16">
            <div>
              <h3 className="font-serif-display text-3xl font-semibold tracking-tight text-primary underline decoration-secondary/40 decoration-2 underline-offset-8 md:text-4xl">
                {block.client}
              </h3>
              {block.caption && (
                <p className="mb-0 mt-3 text-sm font-medium uppercase tracking-wide text-gray">
                  {block.caption}
                </p>
              )}
            </div>
            <div className="mt-8">
              <WorkGrid items={block.items} bare masonry />
            </div>
          </Reveal>
        ))}
      </Section>

      {/* 5 ── PODCASTS ─────────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" containerSize="lg">
        <Reveal>
          <SectionHeader copy={podcastsSection} />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <PodcastCoverGrid podcasts={audioPodcasts} />
        </Reveal>
      </Section>

      {/* 6 ── CLOSE ────────────────────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" containerSize="md">
        <Reveal className="text-center">
          <h2 className="font-serif-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            {contactCTA.heading}
          </h2>
          <p className="mx-auto mt-5 mb-8 max-w-xl text-lg leading-relaxed text-white/85">
            {contactCTA.subtext}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={contactCTA.primaryHref}
              variant="primary"
              size="lg"
              className="bg-white text-primary shadow-medium hover:bg-bg hover:text-primary"
            >
              {contactCTA.primaryLabel}
            </Button>
            {contactCTA.linkedInUrl && !isTodo(contactCTA.linkedInUrl) && (
              <ExternalLink
                href={contactCTA.linkedInUrl}
                variant="button"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Connect on LinkedIn
              </ExternalLink>
            )}
          </div>
        </Reveal>
      </Section>
    </MainLayout>
  );
}
