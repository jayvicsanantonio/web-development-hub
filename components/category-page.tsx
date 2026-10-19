// The body every category route renders: the section's heading, its tagline,
// and the section's own resources, narrowed to whatever is being filtered on.
'use client';

import { useMemo } from 'react';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';
import { SECTIONS, sectionBySlug } from '@/constants/sections';
import { filterResources, isFiltering } from '@/lib/utils/search';
import { sectionNumber } from '@/lib/utils/navigation';

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
    <div className="container pt-10 pb-8 md:pt-16">
      <header className="grid gap-x-10 gap-y-6 border-b border-foreground pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="eyebrow text-accent">
            No. {sectionNumber(section.title)} /{' '}
            {String(SECTIONS.length).padStart(2, '0')}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {section.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {section.description}
          </p>
        </div>
        <p className="eyebrow text-muted-foreground">
          {section.links.length} resources
        </p>
      </header>

      <ResourceGrid
        resources={displayedResources}
        filtering={filtering}
        query={deferredQuery}
      />
    </div>
  );
}
