import { type Metric, isTodo } from "../content";
import { TodoBadge } from "./TodoBadge";

// Renders an array of content metrics (views, likes, subscribers, etc.).
// Any metric whose value or label is still a placeholder renders as an amber badge
// instead of a fake number — we never invent metrics.

export default function MetricList({
  metrics,
  className = "",
}: {
  metrics: Metric[];
  className?: string;
}) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <dl className={`flex flex-wrap gap-x-7 gap-y-3 ${className}`}>
      {metrics.map((m, i) => {
        const placeholder = isTodo(m.value) || isTodo(m.label);
        if (placeholder) {
          return (
            <div key={i} className="flex flex-col gap-1">
              <TodoBadge label={isTodo(m.label) ? "Metric needed" : m.label} />
            </div>
          );
        }
        return (
          <div key={i} className="flex flex-col">
            <dd className="text-2xl font-bold leading-none text-primary">{m.value}</dd>
            <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-gray">{m.label}</dt>
          </div>
        );
      })}
    </dl>
  );
}
