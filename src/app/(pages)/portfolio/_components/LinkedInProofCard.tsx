import Image from "next/image";
import { type LinkedInProofPoint, isTodo } from "../content";
import ExternalLink from "./ExternalLink";
import { TodoBadge } from "./TodoBadge";

function LinkedInGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// "Founder reshared this on LinkedIn" proof point. A static card by design — it
// never fails to render (unlike LinkedIn's flaky native embed) and puts the
// engagement metric front and center. Optional local screenshot sits on top.

export default function LinkedInProofCard({ proof }: { proof: LinkedInProofPoint }) {
  const hasScreenshot = !!proof.screenshotSrc && !isTodo(proof.screenshotSrc);
  const metricIsTodo = isTodo(proof.metric.value) || isTodo(proof.metric.label);
  const nameLine = [proof.founderName, proof.founderTitle].filter((s) => s && !isTodo(s)).join(" · ");

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-bg-light">
      {hasScreenshot && (
        <a href={isTodo(proof.postUrl) ? undefined : proof.postUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={proof.screenshotSrc as string}
              alt={`LinkedIn post by ${isTodo(proof.founderName) ? "founder" : proof.founderName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </a>
      )}

      <div className="flex items-center justify-between gap-3 p-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2]">
            <LinkedInGlyph /> Reshared on LinkedIn
          </p>
          {nameLine && <p className="mt-0.5 truncate text-xs text-gray">{nameLine}</p>}
          <div className="mt-1">
            {metricIsTodo ? (
              <TodoBadge label="Post metric needed" />
            ) : (
              <span className="text-sm font-semibold text-primary">
                {proof.metric.value} <span className="font-normal text-gray">{proof.metric.label}</span>
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          {isTodo(proof.postUrl) ? (
            <TodoBadge label="Post link needed" />
          ) : (
            <ExternalLink href={proof.postUrl}>View</ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
}
