'use client';

import { useEffect } from 'react';
import { useSearch } from '@/contexts/search-context';
import ResourceCard from '@/components/ui/resource-card';

interface SearchWrapperProps {
  children: React.ReactNode;
}

export function SearchWrapper({ children }: SearchWrapperProps) {
  const {
    searchQuery,
    searchResults,
    selectedTags,
    setCurrentCategory,
  } = useSearch();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  const isSearching =
    (searchQuery && searchQuery.trim().length > 0) ||
    selectedTags.length > 0;
    
  const groupedResults = isSearching
    ? searchResults.reduce(
        (groups: Record<string, any[]>, item: any) => {
          const category = item.section || 'Uncategorized';
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(item);
          return groups;
        },
        {}
      )
    : {};

  if (isSearching) {
    return (
      <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
        <section className="container mx-auto py-12 md:py-12 flex flex-col gap-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Search Results
            </h1>
            <p className="text-foreground-muted">
              {searchResults.length > 0
                ? `Found ${searchResults.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-12">
              {Object.entries(groupedResults).map(
                ([category, items]) => {
                  const sectionId = `section-${category
                    .toLowerCase()
                    .replace(/\s+&\s+/g, '-')
                    .replace(/\s+/g, '-')}`;

                  return (
                    <section
                      id={sectionId}
                      key={category}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl font-bold tracking-tight">
                        {category}
                      </h2>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((resource: any) => (
                          <ResourceCard
                            key={resource.href}
                            resource={resource}
                          />
                        ))}
                      </div>
                    </section>
                  );
                }
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p>
                Try adjusting your search terms to find what you're
                looking for.
              </p>
            </div>
          )}
        </section>
      </div>
    );
  }

  return <>{children}</>;
}
