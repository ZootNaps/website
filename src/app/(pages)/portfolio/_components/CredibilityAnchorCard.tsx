import Typography from "@/components/ui/Typography";
import { type CredibilityAnchor, isTodo } from "../content";
import YouTubeFacade from "./YouTubeFacade";
import MetricList from "./MetricList";
import ExternalLink from "./ExternalLink";
import { TodoBadge } from "./TodoBadge";

// One of the two co-equal "#1" credibility anchors at the top of the page.
// Both cards get identical structure and visual weight: credential → headline →
// featured video → channel metrics → channel link.

export default function CredibilityAnchorCard({ anchor }: { anchor: CredibilityAnchor }) {
  const headlineIsTodo = isTodo(anchor.headline);

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-black/5 bg-white p-6 shadow-medium md:p-8">
      <div>
        <p className="mb-0 text-sm font-semibold uppercase tracking-wide text-secondary">
          {anchor.credential}
        </p>
        <div className="mt-2">
          {headlineIsTodo ? (
            <TodoBadge label="Headline needed" />
          ) : (
            <Typography variant="h3" as="h3" color="primary" className="mb-0">
              {anchor.headline}
            </Typography>
          )}
        </div>
      </div>

      <YouTubeFacade youtubeId={anchor.featuredYoutubeId} title={anchor.credential} eager />

      <MetricList metrics={anchor.metrics} className="mt-1" />

      <div className="mt-auto pt-2">
        {isTodo(anchor.channelUrl) ? (
          <TodoBadge label="Channel link needed" />
        ) : (
          <ExternalLink href={anchor.channelUrl} variant="button">
            Visit channel →
          </ExternalLink>
        )}
      </div>
    </div>
  );
}
