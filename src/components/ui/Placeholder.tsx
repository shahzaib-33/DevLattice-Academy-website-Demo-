import { isPlaceholder, stripBrackets } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Renders editable content. When the value is still a [placeholder],
 * the brackets are removed and a subtle amber marker is added so nobody
 * mistakes sample copy for official information.
 */
export function Editable({ value, className, tag = true }: { value: string; className?: string; tag?: boolean }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>;
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <span>{stripBrackets(value)}</span>
      {tag && <span className="placeholder-tag">Placeholder</span>}
    </span>
  );
}

export function PlaceholderTag({ className, label = "Placeholder" }: { className?: string; label?: string }) {
  return <span className={cn("placeholder-tag", className)}>{label}</span>;
}

export const clean = (v: string) => (isPlaceholder(v) ? stripBrackets(v) : v);
