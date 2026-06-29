# Portfolio images

Drop podcast cover art and LinkedIn post screenshots here.

- **Podcast cover art** → reference it from `audioPodcasts[].coverArtSrc` in
  `src/app/(pages)/portfolio/content.ts`, e.g. `/images/portfolio/my-show.jpg`.
  Square images (1:1) look best in the cover-art wall.
- **LinkedIn screenshots** (optional) → reference from a video's
  `linkedInProof.screenshotSrc`, e.g. `/images/portfolio/acme-post.png`.

Use **local files only** — never hotlink an external CDN (they 403 or change URLs).
Files here are served by Next directly and need no `next.config.ts` change.
