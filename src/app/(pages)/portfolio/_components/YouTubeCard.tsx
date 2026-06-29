import { type YoutubeVideoItem, isTodo } from "../content";
import YouTubeFacade from "./YouTubeFacade";
import MetricList from "./MetricList";
import LinkedInProofCard from "./LinkedInProofCard";
import { TodoBadge } from "./TodoBadge";

// A single client/founder video: the embed, who it was for, the per-video
// metrics Gus supplied, and an optional "reshared on LinkedIn" proof point.

export default function YouTubeCard({ video }: { video: YoutubeVideoItem }) {
  const clientLine = [video.clientName, video.clientTitle]
    .filter((s) => s && !isTodo(s))
    .join(" — ");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-medium">
      <YouTubeFacade youtubeId={video.youtubeId} title={video.title} />

      <div className="flex flex-1 flex-col px-1 pt-4">
        {isTodo(video.title) ? (
          <TodoBadge label="Title needed" />
        ) : (
          <h3 className="mb-0 text-base font-semibold leading-snug text-primary">{video.title}</h3>
        )}

        {clientLine && <p className="mb-0 mt-1 text-sm text-gray">{clientLine}</p>}

        {video.metrics?.length > 0 && (
          <div className="mt-3">
            <MetricList metrics={video.metrics} />
          </div>
        )}

        {video.linkedInProof && <LinkedInProofCard proof={video.linkedInProof} />}
      </div>
    </div>
  );
}
