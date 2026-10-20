// The landing page's bento grid of section tiles: each section's icon, title,
// description and size, with its first resources, linking to its page.
'use client';

import Link from 'next/link';
import { SECTIONS } from '@/constants/sections';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import type { Section } from '@/lib/types';

type TileLayout = {
  /** Where the tile sits in the four-column grid. */
  span: string;
  /** How many resources it lists, and the columns they take. Without this,
      the tile shows a row of icons and names the first few. */
  list?: { count: number; columns: string };
};

// Each tile's layout, by its place in SECTIONS: the first is a large square
// and the last spans the row, so both have room to list resources. A section
// added beyond these takes a single cell.
const TILE_LAYOUTS: TileLayout[] = [
  {
    span: '@xl:col-span-2 @4xl:row-span-2',
    list: { count: 6, columns: '@md:grid-cols-2' },
  },
  { span: '@xl:col-span-2' },
  { span: '' },
  { span: '' },
  {
    span: '@xl:col-span-2 @4xl:col-span-4',
    list: { count: 4, columns: '@md:grid-cols-2 @4xl:grid-cols-4' },
  },
];

// How many icons a small tile shows, and how many of those it names.
const ICON_COUNT = 4;
const NAMED_COUNT = 2;

function ResourceIcon({ icon }: { icon: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-card bg-secondary">
      <Icon icon={icon} className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );
}

function Tile({
  section,
  isLarge,
  layout,
}: {
  section: Section;
  isLarge: boolean;
  layout: TileLayout;
}) {
  const featured = section.links.slice(
    0,
    layout.list?.count ?? ICON_COUNT,
  );
  const named = featured.slice(0, NAMED_COUNT);
  const unnamed = section.links.length - named.length;

  return (
    <li
      className={cn(
        'relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-[box-shadow,translate] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md',
        layout.span,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon
            icon={section.icon}
            className="h-5 w-5"
            aria-hidden="true"
          />
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
          {section.links.length} resources
        </span>
      </div>

      <h3
        className={cn(
          'mt-4 font-semibold tracking-tight',
          isLarge ? 'text-xl' : 'text-base',
        )}
      >
        {/* The overlay makes the whole tile the link's target. */}
        <Link
          href={section.href}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--color-ring)]"
        >
          {section.title}
        </Link>
      </h3>
      <p
        className={cn(
          'mt-1 text-sm text-muted-foreground',
          !isLarge && 'line-clamp-2',
        )}
      >
        {section.description}
      </p>

      {layout.list ? (
        <div
          className={cn(
            'mt-auto grid grid-cols-1 gap-2 pt-6',
            layout.list.columns,
          )}
        >
          {featured.map((resource) => (
            <span
              key={resource.id}
              className="flex min-w-0 items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <Icon
                icon={resource.icon}
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{resource.title}</span>
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-auto flex items-center gap-3 pt-5">
          <span className="flex -space-x-2" aria-hidden="true">
            {featured.map((resource) => (
              <ResourceIcon key={resource.id} icon={resource.icon} />
            ))}
          </span>
          <span className="min-w-0 truncate text-xs text-muted-foreground">
            {named.map((resource) => resource.title).join(', ')}
            {unnamed > 0 && ` and ${unnamed} more`}
          </span>
        </div>
      )}
    </li>
  );
}

export function SectionTiles() {
  return (
    <ul
      aria-label="Sections"
      className="m-0 grid list-none grid-cols-1 gap-3 p-0 @xl:grid-cols-2 @4xl:grid-cols-4"
    >
      {SECTIONS.map((section, index) => (
        <Tile
          key={section.href}
          section={section}
          isLarge={index === 0}
          layout={TILE_LAYOUTS[index] ?? { span: '' }}
        />
      ))}
    </ul>
  );
}
