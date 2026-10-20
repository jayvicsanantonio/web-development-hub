// The site's mark: the hexagon from the favicon on an accent tile. Drawn
// beside the name in the sidebar and the mobile bar.
import { cn } from '@/lib/utils';

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('h-7 w-7 shrink-0', className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M10 12 16 8.8 22 12v8l-6 3.2-6-3.2z"
        fill="none"
        strokeWidth="1.75"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
      <circle
        cx="16"
        cy="16"
        r="2.25"
        className="fill-primary-foreground"
      />
    </svg>
  );
}
