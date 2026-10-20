// The introduction that opens the landing page: a tagline, the headline and
// its description, and the size of the catalogue, counted from the dataset.
import {
  ALL_RESOURCES,
  ALL_TAGS,
  SECTIONS,
} from '@/constants/sections';

interface HeroBannerProps {
  title: string;
  description: string;
}

const STATS = [
  { value: ALL_RESOURCES.length, label: 'resources' },
  { value: SECTIONS.length, label: 'sections' },
  { value: ALL_TAGS.length, label: 'tags' },
];

export function HeroBanner({ title, description }: HeroBannerProps) {
  return (
    <header className="container pt-10 pb-2 md:pt-14">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
        <span
          className="h-1.5 w-1.5 rounded-full bg-primary"
          aria-hidden="true"
        />
        Web Development Hub
      </p>
      <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
        {description}
      </p>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {STATS.map(({ value, label }) => (
          <span key={label}>
            <strong className="font-semibold tabular-nums text-foreground">
              {value}
            </strong>{' '}
            {label}
          </span>
        ))}
      </p>
    </header>
  );
}
