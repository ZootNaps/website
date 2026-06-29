"use client";

import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

import {
  heroContent,
  credibilityAnchors,
  whatIDoContent,
  myContent,
  lexWork,
  clientWork,
  audioPodcasts,
  contactCTA,
  isTodo,
} from "./content";

import Reveal from "./_components/Reveal";
import CredibilityAnchorCard from "./_components/CredibilityAnchorCard";
import WorkGrid from "./_components/WorkGrid";
import PodcastCoverGrid from "./_components/PodcastCoverGrid";
import ExternalLink from "./_components/ExternalLink";
import { TodoBadge } from "./_components/TodoBadge";

// ─────────────────────────────────────────────────────────────────────────────
//  /portfolio — Gus Joseph's evergreen content portfolio.
//  Everything rendered here comes from ./content.ts. To add real work, edit ONLY
//  that file. This page is UNLISTED (noindex via layout.tsx, omitted from the
//  sitemap, and not linked anywhere in the site).
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* 1 ── HERO ─────────────────────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" containerSize="lg">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-0 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            {heroContent.name}
          </p>
          <Typography variant="h1" as="h1" color="white" className="mt-4 mb-0">
            {heroContent.title}
          </Typography>
          <div className="mt-6">
            {isTodo(heroContent.tagline) ? (
              <TodoBadge label="Tagline needed" />
            ) : (
              <p className="mb-0 text-lg leading-relaxed text-white/85 md:text-xl">
                {heroContent.tagline}
              </p>
            )}
          </div>
        </Reveal>
      </Section>

      {/* 2 ── TWO CO-EQUAL #1 ANCHORS ──────────────────────────────────────── */}
      <Section background="light" spacing="lg" containerSize="lg">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {credibilityAnchors.map((anchor) => (
              <CredibilityAnchorCard key={anchor.id} anchor={anchor} />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 3 ── WHAT I DO ────────────────────────────────────────────────────── */}
      <Section background="white" spacing="md" containerSize="md">
        <Reveal className="text-center">
          <Typography variant="h2" as="h2" color="primary" className="mb-6">
            {whatIDoContent.heading}
          </Typography>
          <div className="space-y-4">
            {whatIDoContent.paragraphs.map((para, i) =>
              isTodo(para) ? (
                <div key={i} className="flex justify-center">
                  <TodoBadge label="Positioning copy needed" />
                </div>
              ) : (
                <p key={i} className="mb-0 text-lg leading-relaxed text-gray">
                  {para}
                </p>
              )
            )}
          </div>
        </Reveal>
      </Section>

      {/* 4 ── MY CONTENT (own YouTube + LinkedIn) ──────────────────────────── */}
      <Section background="light" spacing="lg" containerSize="xl">
        <Reveal>
          <Typography variant="h2" as="h2" color="primary" className="mb-8 text-center">
            My Content
          </Typography>
          <WorkGrid items={myContent} emptyMessage="Add your own videos and posts to myContent in content.ts." />
        </Reveal>
      </Section>

      {/* 5 ── LEX FRIDMAN PODCAST — SELECTED EDITS ─────────────────────────── */}
      <Section background="white" spacing="lg" containerSize="xl">
        <Reveal>
          <Typography variant="h2" as="h2" color="primary" className="mb-2 text-center">
            Lex Fridman Podcast — Selected Edits
          </Typography>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-secondary">
            Former Lead Editor
          </p>
          <WorkGrid items={lexWork} emptyMessage="Add Lex episodes to lexWork in content.ts." />
        </Reveal>
      </Section>

      {/* 6 ── CLIENT / FOUNDER WORK ────────────────────────────────────────── */}
      <Section background="light" spacing="lg" containerSize="xl">
        <Reveal>
          <Typography variant="h2" as="h2" color="primary" className="mb-8 text-center">
            Client &amp; Founder Work
          </Typography>
          <WorkGrid
            items={clientWork}
            emptyMessage="Add client and founder work to clientWork in content.ts — each becomes a card with the embed/post, metrics, and an optional LinkedIn proof point."
          />
        </Reveal>
      </Section>

      {/* 7 ── AUDIO PODCAST COVER-ART WALL ─────────────────────────────────── */}
      <Section background="white" spacing="md" containerSize="xl">
        <Reveal>
          <Typography variant="h2" as="h2" color="primary" className="mb-8 text-center">
            Audio Podcast Work
          </Typography>
          <PodcastCoverGrid podcasts={audioPodcasts} />
        </Reveal>
      </Section>

      {/* 8 ── CONTACT CTA ──────────────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" containerSize="md">
        <Reveal className="text-center">
          <Typography variant="h2" as="h2" color="white" className="mb-4">
            {contactCTA.heading}
          </Typography>
          <div className="mb-8 flex justify-center">
            {isTodo(contactCTA.subtext) ? (
              <TodoBadge label="CTA subtext needed" />
            ) : (
              <p className="mb-0 max-w-xl text-lg leading-relaxed text-white/85">
                {contactCTA.subtext}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={contactCTA.primaryHref}
              variant="primary"
              size="lg"
              className="bg-white text-primary shadow-medium hover:bg-bg hover:text-primary"
            >
              {contactCTA.primaryLabel}
            </Button>
            {contactCTA.linkedInUrl &&
              (isTodo(contactCTA.linkedInUrl) ? (
                <TodoBadge label="LinkedIn URL needed" />
              ) : (
                <ExternalLink
                  href={contactCTA.linkedInUrl}
                  variant="button"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Connect on LinkedIn
                </ExternalLink>
              ))}
          </div>
        </Reveal>
      </Section>
    </MainLayout>
  );
}
