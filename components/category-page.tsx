// The body every category route renders: the section's heading, its tagline,
// and the section's own resources, narrowed to whatever is being filtered on.
'use client';

import { useMemo } from 'react';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';
import { sectionBySlug } from '@/constants/sections';
import { filterResources, isFiltering } from '@/lib/utils/search';
import { Icon } from '@/lib/icons';

export function CategoryPage({ slug }: { slug: string }) {
  const section = sectionBySlug(slug);
  const { deferredQuery, selectedTags } = useSearch();

  const filtering = isFiltering(deferredQuery, selectedTags);

  const displayedResources = useMemo(
    () =>
      filterResources(section.links, deferredQuery, selectedTags),
    [section.links, deferredQuery, selectedTags]
  );

  return (
    <div className="container flex flex-col gap-6 py-8 md:py-10">
      <div className="flex flex-col gap-4 @lg:flex-row @lg:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon
            icon={section.icon}
            className="h-6 w-6"
            aria-hidden="true"
          />
        </span>
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {section.title}
          </h1>
          <p className="max-w-[700px] text-muted-foreground">
            {section.description}
          </p>
        </div>
        <span className="self-start rounded-full border border-border px-2.5 py-1 text-xs tabular-nums text-muted-foreground @lg:self-center">
          {section.links.length} resources
        </span>
      </div>

      <ResourceGrid
        resources={displayedResources}
        filtering={filtering}
        query={deferredQuery}
      />
    </div>
  );
}
