import { type WorkItem } from "../content";
import YouTubeCard from "./YouTubeCard";
import LinkedInPostCard from "./LinkedInPostCard";
import { EmptyState } from "./TodoBadge";

// Renders a list of work items, dispatching each to the right card by `type`.
//
// `bare`    — strip the white card wrappers so the work floats (editorial look).
// `masonry` — CSS multi-column layout so tall LinkedIn embeds and short video
//             thumbnails pack cleanly instead of leaving big grid gaps. Use it
//             whenever a grid mixes embeds and videos.

export default function WorkGrid({
  items,
  emptyMessage,
  bare = false,
  masonry = false,
}: {
  items: WorkItem[];
  emptyMessage?: string;
  bare?: boolean;
  masonry?: boolean;
}) {
  if (!items || items.length === 0) {
    return <EmptyState message={emptyMessage ?? "Nothing here yet — add entries in content.ts."} />;
  }

  const renderItem = (item: WorkItem, i: number) =>
    item.type === "youtube" ? (
      <YouTubeCard key={`${item.youtubeId}-${i}`} video={item} bare={bare} />
    ) : (
      <LinkedInPostCard key={`li-${i}`} post={item} bare={bare} />
    );

  if (masonry) {
    return (
      <div className="columns-1 gap-8 sm:columns-2 [&>*]:mb-8 [&>*]:break-inside-avoid">
        {items.map(renderItem)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map(renderItem)}
    </div>
  );
}
