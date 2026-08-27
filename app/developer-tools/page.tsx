'use client';

import React, { useEffect } from 'react';

import { SECTIONS } from '@/constants/sections';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';

export default function Page() {
  const CATEGORY_TITLE = 'Developer Tools';
  const { searchQuery, searchResults, setCurrentCategory } =
    useSearch();

  useEffect(() => {
    setCurrentCategory(CATEGORY_TITLE);

    return () => setCurrentCategory(null);
  }, [setCurrentCategory]);

  const sectionData = SECTIONS.find(
    (section) => section.title === CATEGORY_TITLE
  );
  const allResources = (sectionData?.links || []).map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
    tags: link.tags,
  }));

  const displayedResources =
    searchQuery && searchQuery.trim() ? searchResults : allResources;

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Developer Tools
        </h1>
        <p className="text-foreground-muted max-w-[700px]">
          Essential tools to streamline your development workflow
        </p>
      </div>

      <ResourceGrid
        resources={displayedResources}
        searchQuery={searchQuery || ''}
      />
    </div>
  );
}
