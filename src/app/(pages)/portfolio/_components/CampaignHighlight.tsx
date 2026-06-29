import Typography from "@/components/ui/Typography";
import { type ClientCampaign, type Metric } from "../content";
import WorkGrid from "./WorkGrid";

// A client campaign framed as ONE story: a prominent headline stat strip + the
// real posts that prove it. A light, editorial panel (not a heavy white card) so
// the campaign-level numbers read as the headline and the embedded posts read as
// the evidence underneath.

function CampaignStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <span className="font-serif-display text-4xl font-bold leading-none text-primary md:text-5xl">
        {metric.value}
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-gray">
        {metric.label}
      </span>
    </div>
  );
}

export default function CampaignHighlight({ campaign }: { campaign: ClientCampaign }) {
  return (
    <div className="rounded-3xl bg-bg-light p-6 ring-1 ring-black/5 md:p-10">
      {/* Header: who + what program */}
      <div className="text-center md:text-left">
        <p className="mb-0 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Client Campaign
        </p>
        <Typography variant="h3" as="h3" color="primary" className="mt-2 mb-0 font-serif-display">
          {campaign.client}
        </Typography>
        <p className="mb-0 mt-1.5 text-sm font-medium text-gray">{campaign.label}</p>
      </div>

      {/* Headline stat strip — the campaign-level result */}
      <div className="mt-7 flex flex-wrap justify-center gap-x-12 gap-y-6 md:justify-start">
        {campaign.stats.map((stat, i) => (
          <CampaignStat key={i} metric={stat} />
        ))}
      </div>

      {campaign.note && (
        <p className="mb-0 mt-5 text-center text-sm text-gray md:text-left">{campaign.note}</p>
      )}

      {/* Proof: the actual posts/videos from the campaign */}
      {campaign.items.length > 0 && (
        <div className="mt-8 border-t border-black/5 pt-8">
          <WorkGrid items={campaign.items} bare masonry />
        </div>
      )}
    </div>
  );
}
