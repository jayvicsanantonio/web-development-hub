// Swaps the home page's own content for grouped search results while a search
// or tag filter is active.
'use client';

import { useMemo } from 'react';
import { useSearch } from '@/contexts/search-context';
import { ALL_RESOURCES } from '@/constants/sections';
import {
  groupBySection,
  toSectionId,
} from '@/lib/utils/navigation';
import {
  filterResources,
  isFiltering,
  resultSummary,
} from '@/lib/utils/search';
import ResourceGrid from '@/components/ui/resource-grid';

interface SearchWrapperProps {
  children: React.ReactNode;
}

export function SearchWrapper({ children }: SearchWrapperProps) {
  const { deferredQuery, selectedTags } = useSearch();

  const filtering = isFiltering(deferredQuery, selectedTags);

  const results = useMemo(
    () =>
      filtering
        ? filterResources(
            ALL_RESOURCES,
            deferredQuery,
            selectedTags
          )
        : [],
    [filtering, deferredQuery, selectedTags]
  );

  const groupedResults = useMemo(
    () => groupBySection(results),
    [results]
  );

  if (!filtering) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
      <section className="container mx-auto py-12 md:py-12 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground">
            {resultSummary(results.length, deferredQuery)}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="flex flex-col gap-12">
            {groupedResults.map(([section, resources]) => (
              <section
                id={toSectionId(section)}
                key={section}
                className="flex flex-col gap-6"
              >
                <h2 className="text-2xl font-bold tracking-tight">
                  {section}
                </h2>
                <ResourceGrid resources={resources} />
              </section>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p>
              Try adjusting your search terms to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
