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
import { GroupHeading } from '@/components/ui/group-heading';

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
    <div className="container pt-10 pb-8 md:pt-16">
      <header className="border-b border-foreground pb-8">
        <p className="eyebrow text-accent">Search the index</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
          Search Results
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {resultSummary(results.length, deferredQuery)}
        </p>
      </header>

      {results.length > 0 ? (
        groupedResults.map(([section, resources]) => (
          <section
            id={toSectionId(section)}
            key={section}
            className="pt-12 md:pt-16"
          >
            <GroupHeading
              section={section}
              count={resources.length}
            />
            <ResourceGrid resources={resources} />
          </section>
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl md:text-4xl">
            Nothing in the index matches.
          </p>
          <p className="mt-4 text-muted-foreground">
            Try adjusting your search terms to find what you&apos;re
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
