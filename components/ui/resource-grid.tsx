'use client';

import React from 'react';
import ResourceCard from '@/components/ui/resource-card';

export type Resource = {
  title: string;
  href: string;
  description: string;
};

interface ResourceGridProps {
  resources: Resource[];
  accentColor: 'purple' | 'neon';
  searchQuery?: string;
}

export default function ResourceGrid({ 
  resources, 
  accentColor, 
  searchQuery 
}: ResourceGridProps) {
  return (
    <>
      {searchQuery && (
        <p className="text-sm text-foreground-muted">
          {resources.length > 0
            ? `Found ${resources.length} results for "${searchQuery}"`
            : `No results found for "${searchQuery}"`}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource: Resource) => (
          <ResourceCard
            key={resource.href}
            resource={resource}
            accentColor={accentColor}
          />
        ))}
      </div>
    </>
  );
}
