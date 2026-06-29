import Image from "next/image";
import { type AudioPodcastItem, isTodo } from "../content";
import { SquarePlaceholder, EmptyState, TodoBadge } from "./TodoBadge";

// The audio-only cover-art wall. Pure next/image grid — no players, no iframes —
// so it stays fast no matter how many shows are added. Each cover is a local
// file from /public/images/portfolio/ (never hotlinked) and links out to the show.

function PodcastCover({ podcast }: { podcast: AudioPodcastItem }) {
  const imageIsTodo = isTodo(podcast.coverArtSrc);
  const linkIsTodo = isTodo(podcast.podcastUrl);

  const cover = imageIsTodo ? (
    <SquarePlaceholder message="Cover art needed" />
  ) : (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-soft transition-transform duration-300 group-hover:scale-[1.02]">
      <Image
        src={podcast.coverArtSrc}
        alt={isTodo(podcast.title) ? "Podcast cover art" : `${podcast.title} cover art`}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <div className="group flex flex-col gap-2">
      {linkIsTodo ? (
        cover
      ) : (
        <a href={podcast.podcastUrl} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${podcast.title}`}>
          {cover}
        </a>
      )}

      <div className="px-0.5">
        {isTodo(podcast.title) ? (
          <TodoBadge label="Title needed" />
        ) : (
          <p className="mb-0 text-sm font-semibold leading-snug text-primary">{podcast.title}</p>
        )}
        {podcast.description && !isTodo(podcast.description) && (
          <p className="mb-0 mt-0.5 text-xs text-gray">{podcast.description}</p>
        )}
        {linkIsTodo && !imageIsTodo && (
          <div className="mt-1.5">
            <TodoBadge label="Listen link needed" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PodcastCoverGrid({ podcasts }: { podcasts: AudioPodcastItem[] }) {
  if (!podcasts || podcasts.length === 0) {
    return (
      <EmptyState message="Audio-only shows will appear here as a cover-art wall. Add entries to audioPodcasts in content.ts and drop the cover images into /public/images/portfolio/." />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {podcasts.map((podcast, i) => (
        <PodcastCover key={i} podcast={podcast} />
      ))}
    </div>
  );
}
