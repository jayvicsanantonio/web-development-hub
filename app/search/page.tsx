'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import ResourceCard from '@/components/ui/resource-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();

  // Sync URL search param with search context
  useEffect(() => {
    if (query && query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [query, searchQuery, setSearchQuery]);

  // Group results by section
  const resultsBySection = searchResults.reduce((acc, resource) => {
    if (!acc[resource.section]) {
      acc[resource.section] = [];
    }
    acc[resource.section].push(resource);
    return acc;
  }, {} as Record<string, typeof searchResults>);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">
          Search Results
        </h1>
        <p className="text-foreground-muted max-w-[700px]">
          {searchQuery ? (
            <>
              {searchResults.length} results for &quot;<span className="font-semibold">{searchQuery}</span>&quot;
            </>
          ) : (
            'Enter a search term to find resources'
          )}
        </p>
      </div>

      {Object.entries(resultsBySection).length > 0 ? (
        Object.entries(resultsBySection).map(([section, resources]) => (
          <div key={section} className="space-y-6">
            <h2 className="text-2xl font-semibold">{section}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.href}
                  resource={resource}
                  accentColor={section === 'Frameworks & Libraries' || section === 'Developer Tools' ? 'neon' : 'purple'}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16">
          {searchQuery && !isSearching ? (
            <p className="text-lg text-foreground-muted">No results found for &quot;{searchQuery}&quot;</p>
          ) : (
            <p className="text-lg text-foreground-muted">Enter a search term to find resources</p>
          )}
        </div>
      )}
    </div>
  );
}
