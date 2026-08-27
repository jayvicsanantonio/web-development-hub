'use client';

import { useEffect, useMemo } from 'react';
import { useSearch } from '@/contexts/search-context';
import ResourceCard from '@/components/ui/resource-card';
import { toSectionId } from '@/lib/utils/navigation';

// Import Resource type from search context
type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
  tags?: string[];
};

interface SearchWrapperProps {
  children: React.ReactNode;
}

export function SearchWrapper({ children }: SearchWrapperProps) {
  const { searchQuery, searchResults, setCurrentCategory } =
    useSearch();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  // `searchResults === null` is the single signal for "not searching"; every
  // consumer used to re-derive its own predicate, and they disagreed.
  const groupedResults = useMemo(() => {
    if (!searchResults) return {} as Record<string, Resource[]>;

    return searchResults.reduce(
      (groups: Record<string, Resource[]>, item: Resource) => {
        const category = item.section || 'Uncategorized';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(item);
        return groups;
      },
      {} as Record<string, Resource[]>
    );
  }, [searchResults]);

  if (searchResults) {
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
                  const sectionId = toSectionId(category);

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
                        {items.map((resource: Resource) => (
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
