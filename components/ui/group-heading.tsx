// The heading over a section's group of resources in search results and on
// the bookmarks page: its number in the index, its title, and how many follow.
import { sectionNumber } from '@/lib/utils/navigation';

export function GroupHeading({
  section,
  count,
}: {
  section: string;
  count: number;
}) {
  return (
    <h2 className="flex items-baseline gap-4 border-b border-foreground pb-4">
      <span aria-hidden="true" className="eyebrow text-accent">
        {sectionNumber(section)}
      </span>
      <span className="font-serif text-3xl leading-none tracking-tight md:text-4xl">
        {section}
      </span>
      <span
        aria-hidden="true"
        className="eyebrow ml-auto text-muted-foreground"
      >
        {count}
      </span>
    </h2>
  );
}
