import { type WorkItem } from "../content";
import YouTubeCard from "./YouTubeCard";
import LinkedInPostCard from "./LinkedInPostCard";
import { EmptyState } from "./TodoBadge";

// Renders a list of work items in a responsive 1/2/3-column grid, dispatching
// each item to the right card by its `type`. A grid can freely mix YouTube
// videos and standalone LinkedIn posts.

export default function WorkGrid({
  items,
  emptyMessage,
}: {
  items: WorkItem[];
  emptyMessage?: string;
}) {
  if (!items || items.length === 0) {
    return <EmptyState message={emptyMessage ?? "Nothing here yet — add entries in content.ts."} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) =>
        item.type === "youtube" ? (
          <YouTubeCard key={`${item.youtubeId}-${i}`} video={item} />
        ) : (
          <LinkedInPostCard key={`li-${i}`} post={item} />
        )
      )}
    </div>
  );
}
