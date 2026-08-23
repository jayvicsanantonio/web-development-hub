'use client';

import { useEffect, useMemo } from 'react';
import { SECTIONS } from '@/constants/sections';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';

interface CategoryResourcePageProps {
  /** Must match a `SECTIONS[].title` exactly — it is the lookup key. */
  title: string;
  description: string;
}

export function CategoryResourcePage({
  title,
  description,
}: CategoryResourcePageProps) {
  const { searchQuery, searchResults, setCurrentCategory } =
    useSearch();

  useEffect(() => {
    setCurrentCategory(title);

    return () => setCurrentCategory(null);
  }, [setCurrentCategory, title]);

  const allResources = useMemo(() => {
    const sectionData = SECTIONS.find(
      (section) => section.title === title
    );

    return (sectionData?.links ?? []).map((link) => ({
      title: link.title,
      href: link.href,
      description: link.description,
      tags: link.tags,
    }));
  }, [title]);

  // `null` means "not searching or filtering" — show the whole category.
  const displayedResources = searchResults ?? allResources;

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-foreground-muted max-w-[700px]">
          {description}
        </p>
      </div>

      <ResourceGrid
        resources={displayedResources}
        searchQuery={searchQuery}
      />
    </div>
  );
}
