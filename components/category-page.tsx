// The body every category route renders: the section's heading, its tagline,
// and the section's own resources, narrowed to whatever is being filtered on.
'use client';

import { useMemo } from 'react';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';
import { sectionBySlug } from '@/constants/sections';
import { filterResources, isFiltering } from '@/lib/utils/search';

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
    <div className="container py-12 md:py-16 flex flex-col gap-8">
      <div>
        <p aria-hidden="true" className="text-xs text-muted-foreground">
          <span className="mr-2 font-bold text-prompt">$</span>
          {`cd ~/${slug} && ls`}
        </p>
        <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tighter">
          {section.title}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {section.description}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          <span className="text-accent">{section.links.length}</span>{' '}
          entries
        </p>
      </div>

      <ResourceGrid
        resources={displayedResources}
        filtering={filtering}
        query={deferredQuery}
      />
    </div>
  );
}
