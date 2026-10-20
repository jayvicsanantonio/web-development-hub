// Swaps the home page's own content for grouped search results while a search
// or tag filter is active.
'use client';

import { useMemo } from 'react';
import { SearchX } from 'lucide-react';
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
    <section className="container flex flex-col gap-8 py-8 md:py-10">
      <div>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Search Results
        </h1>
        <p className="text-muted-foreground">
          {resultSummary(results.length, deferredQuery)}
        </p>
      </div>

      {results.length > 0 ? (
        // Spaced by padding rather than a gap, so the sections meet: the
        // nav highlights the section at the viewport's middle, and a gap
        // there would leave it inside none of them.
        <div className="-my-5 flex flex-col">
          {groupedResults.map(([section, resources]) => (
            <section
              id={toSectionId(section)}
              key={section}
              className="flex scroll-mt-16 flex-col gap-4 py-5 md:scroll-mt-12"
            >
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  {section}
                </h2>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {resources.length}
                </span>
              </div>
              <ResourceGrid resources={resources} />
            </section>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
            <SearchX className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-muted-foreground">
            Try adjusting your search terms to find what you&apos;re
            looking for.
          </p>
        </div>
      )}
    </section>
  );
}
