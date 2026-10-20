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
    <section className="container py-12 md:py-16 flex flex-col gap-10">
      <div>
        <p aria-hidden="true" className="text-xs text-muted-foreground">
          <span className="mr-2 font-bold text-prompt">$</span>
          {deferredQuery.trim()
            ? `grep -ri "${deferredQuery.trim()}" ~/webdevhub`
            : `grep --tags ${selectedTags.join(',')} ~/webdevhub`}
        </p>
        <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tighter mb-3">
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
              className="flex flex-col gap-4 scroll-mt-20"
            >
              <h2 className="text-xl font-bold tracking-tight">
                {section}
              </h2>
              <ResourceGrid resources={resources} />
            </section>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
          <p>
            Try adjusting your search terms to find what you&apos;re
            looking for.
          </p>
        </div>
      )}
    </section>
  );
}
