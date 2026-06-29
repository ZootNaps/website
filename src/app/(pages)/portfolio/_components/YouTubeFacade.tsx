"use client";

import { useState } from "react";
import { isTodo } from "../content";
import { VideoPlaceholder } from "./TodoBadge";

// A self-contained YouTube facade — no third-party scripts, no external CSS.
// At rest it shows only the thumbnail (~30KB from i.ytimg.com) + a play button.
// On click it swaps in the real iframe, so a page with 8 videos loads 8 light
// images, not 8 heavy iframes. Video stays on YouTube's CDN → zero hosting cost.
//
// Uses youtube-nocookie.com (privacy-friendly) and needs only `frame-src` to
// allow YouTube in the site CSP — no jsdelivr/script allowances required.
//
// If the ID is still a `TODO(GUS)` placeholder we render an amber box instead.

export default function YouTubeFacade({
  youtubeId,
  title,
  eager = false,
}: {
  youtubeId: string;
  title: string;
  eager?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (isTodo(youtubeId)) {
    return <VideoPlaceholder />;
  }

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-soft">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-black shadow-soft"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external YT thumbnail; no Next optimization needed */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors duration-300 group-hover:bg-secondary">
          <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-7 w-7" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
