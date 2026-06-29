import Image from "next/image";
import { type LinkedInPostItem, isTodo } from "../content";
import ExternalLink from "./ExternalLink";
import MetricList from "./MetricList";
import { TodoBadge } from "./TodoBadge";

const LINKEDIN_BLUE = "#0a66c2";

function LinkedInGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// A standalone LinkedIn post — work that lives on LinkedIn rather than YouTube
// (e.g. founder reshares, product launches). Static card: it never fails to render
// and puts the engagement metrics front and center. Shows a local screenshot if
// one is provided, otherwise a branded LinkedIn header block.

export default function LinkedInPostCard({ post }: { post: LinkedInPostItem }) {
  const authorLine = [post.authorName, post.authorTitle].filter((s) => s && !isTodo(s)).join(" · ");
  const hasScreenshot = !!post.screenshotSrc && !isTodo(post.screenshotSrc);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-medium">
      {hasScreenshot ? (
        <a
          href={isTodo(post.postUrl) ? undefined : post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src={post.screenshotSrc as string}
              alt={isTodo(post.title) ? "LinkedIn post" : post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </a>
      ) : (
        <div
          className="flex aspect-[16/9] w-full items-center justify-center rounded-xl"
          style={{ backgroundColor: `${LINKEDIN_BLUE}0d` }} // 0d = ~5% alpha
        >
          <LinkedInGlyph className="h-9 w-9" />
        </div>
      )}

      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="mb-0 flex items-center gap-1.5 text-xs font-semibold" style={{ color: LINKEDIN_BLUE }}>
          <LinkedInGlyph /> LinkedIn post
        </p>

        {isTodo(post.title) ? (
          <div className="mt-1">
            <TodoBadge label="Title needed" />
          </div>
        ) : (
          <h3 className="mb-0 mt-1 text-base font-semibold leading-snug text-primary">{post.title}</h3>
        )}

        {authorLine && <p className="mb-0 mt-1 text-sm text-gray">{authorLine}</p>}

        {post.metrics?.length > 0 && (
          <div className="mt-3">
            <MetricList metrics={post.metrics} />
          </div>
        )}

        <div className="mt-auto pt-3">
          {isTodo(post.postUrl) ? (
            <TodoBadge label="Post link needed" />
          ) : (
            <ExternalLink href={post.postUrl}>View on LinkedIn →</ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
}
