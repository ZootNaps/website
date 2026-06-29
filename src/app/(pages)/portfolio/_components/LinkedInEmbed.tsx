import { type LinkedInEmbed as LinkedInEmbedData } from "../content";

// Renders the official LinkedIn embed iframe for a post — the live post itself,
// author, copy, and engagement included. The site CSP (src/middleware.ts) MUST
// allow https://www.linkedin.com in frame-src or this renders blank (which is
// exactly what happened on the first version of this page). Lazy-loaded so a
// page with several embeds doesn't fetch them all up front.

export default function LinkedInEmbed({
  embed,
  title,
}: {
  embed: LinkedInEmbedData;
  title?: string;
}) {
  return (
    <div className="w-full max-w-[504px] overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-black/5">
      <iframe
        src={embed.src}
        title={title ? `LinkedIn post: ${title}` : "Embedded LinkedIn post"}
        loading="lazy"
        allowFullScreen
        className="block w-full"
        style={{ height: embed.height }}
      />
    </div>
  );
}
