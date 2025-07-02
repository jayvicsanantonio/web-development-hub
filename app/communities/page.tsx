'use client';

import React, { useEffect } from 'react';

import { SECTIONS } from '@/constants/sections';
import ResourceCard from '@/components/ui/resource-card';
import { useSearch } from '@/contexts/search-context';

export default function Page() {
  const CATEGORY_TITLE = 'Communities';
  const { searchQuery, searchResults, isSearching, setCurrentCategory } = useSearch();
  
  // Set this page's category in context when component mounts
  useEffect(() => {
    setCurrentCategory(CATEGORY_TITLE);
    
    // Clear category filter when unmounting
    return () => setCurrentCategory(null);
  }, [setCurrentCategory]);
  
  const sectionData = SECTIONS.find(
    (section) => section.title === CATEGORY_TITLE
  );

  const allResources = (sectionData?.links || []).map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
  }));
  
  // Use search results if we have a search query, otherwise use all resources
  const displayedResources = searchQuery.trim() ? searchResults : allResources;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">


        <h1 className="text-3xl font-bold tracking-tight">
          Communities
        </h1>
        <p className="text-foreground-muted max-w-[700px]">
          Connect with fellow developers in these vibrant communities
        </p>
      </div>

      {searchQuery && (
        <p className="text-sm text-foreground-muted">
          {displayedResources.length > 0 
            ? `Found ${displayedResources.length} results for "${searchQuery}"` 
            : `No results found for "${searchQuery}"`
          }
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedResources.map((resource: { title: string; href: string; description: string }) => (
          <ResourceCard
            key={resource.href}
            resource={resource}
            accentColor="purple"
          />
        ))}
      </div>
    </div>
  );
}
