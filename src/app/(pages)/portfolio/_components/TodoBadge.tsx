// Visually-obvious placeholders for anything Gus hasn't filled in yet.
// Every unfilled `TODO(GUS)` value in content.ts surfaces through one of these,
// so missing data is impossible to miss — and impossible to mistake for real data.

function WarningIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Small inline amber badge. Use anywhere a single value is missing. */
export function TodoBadge({ label = "TODO(GUS)", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-300 ${className}`}
      title="Placeholder — fill this in via content.ts"
    >
      <WarningIcon />
      {label}
    </span>
  );
}

/** 16:9 dashed placeholder shown in place of a YouTube embed when no real ID exists yet. */
export function VideoPlaceholder({ message = "YouTube video ID needed" }: { message?: string }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50">
      <TodoBadge label={message} />
    </div>
  );
}

/** Square dashed placeholder shown in place of cover art / a screenshot when none exists yet. */
export function SquarePlaceholder({ message = "Image needed" }: { message?: string }) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-3 text-center">
      <TodoBadge label={message} />
    </div>
  );
}

/** Full-width empty state for a whole section that has no entries in content.ts yet. */
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-12 text-center">
      <TodoBadge label="Nothing here yet" />
      <p className="mb-0 max-w-md text-sm text-amber-800/90">{message}</p>
    </div>
  );
}
