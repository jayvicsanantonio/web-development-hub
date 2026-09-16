// The body every category route renders: the section's heading, its tagline,
// and the section's own resources, narrowed to whatever is being filtered on.
'use client';

import { useMemo } from 'react';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';
import { filterResources, isFiltering } from '@/lib/utils/search';
import type { Section } from '@/lib/types';

export function CategoryPage({ section }: { section: Section }) {
  const { searchQuery, deferredQuery, selectedTags } = useSearch();

  const filtering = isFiltering(deferredQuery, selectedTags);

  const displayedResources = useMemo(
    () =>
      filterResources(section.links, deferredQuery, selectedTags),
    [section.links, deferredQuery, selectedTags]
  );

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {section.title}
        </h1>
        <p className="text-muted-foreground max-w-[700px]">
          {section.description}
        </p>
      </div>

      <ResourceGrid
        resources={displayedResources}
        filtering={filtering}
        query={searchQuery}
      />
    </div>
  );
}
