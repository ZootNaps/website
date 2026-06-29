import { type YoutubeVideoItem, isTodo } from "../content";
import YouTubeFacade from "./YouTubeFacade";
import MetricList from "./MetricList";
import LinkedInProofCard from "./LinkedInProofCard";
import { TodoBadge } from "./TodoBadge";

// A single video: the embed, who it was for, the per-video metrics Gus supplied,
// and an optional "reshared on LinkedIn" proof point.
//
// `bare` strips the white card wrapper so the video floats loose in the editorial
// layout (no box-in-box). Default keeps the original card for any other caller.

export default function YouTubeCard({
  video,
  bare = false,
}: {
  video: YoutubeVideoItem;
  bare?: boolean;
}) {
  const clientLine = [video.clientName, video.clientTitle]
    .filter((s) => s && !isTodo(s))
    .join(" — ");

  const wrapper = bare
    ? "flex h-full flex-col"
    : "flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-medium";

  return (
    <div className={wrapper}>
      <YouTubeFacade youtubeId={video.youtubeId} title={video.title} />

      <div className={`flex flex-1 flex-col pt-4 ${bare ? "" : "px-1"}`}>
        {isTodo(video.title) ? (
          <TodoBadge label="Title needed" />
        ) : (
          <h3
            className={`mb-0 font-semibold leading-snug text-primary ${
              bare ? "text-lg" : "text-base"
            }`}
          >
            {video.title}
          </h3>
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
