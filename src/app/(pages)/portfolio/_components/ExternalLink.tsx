import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// External links (YouTube channels, LinkedIn posts, podcast pages) open in a new
// tab so the portfolio stays put. The site's Button component only renders an
// internal next/link, so we use this for anything that points off-site.
// twMerge lets callers override base colors (e.g. white-on-dark) without !important.

export default function ExternalLink({
  href,
  children,
  variant = "text",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "button" | "text";
  className?: string;
}) {
  const styles =
    variant === "button"
      ? "inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-secondary px-4 py-2 text-sm font-medium text-secondary transition-all duration-300 hover:bg-secondary hover:text-white"
      : "inline-flex items-center gap-1 text-sm font-medium text-secondary underline underline-offset-2 transition-colors hover:text-secondary-dark";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={twMerge(styles, className)}>
      {children}
    </a>
  );
}
