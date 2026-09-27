// A responsive grid of resource cards, with a count above it while the list is
// being filtered.
'use client';

import React, { memo } from 'react';
import ResourceCard from '@/components/ui/resource-card';
import { resultSummary } from '@/lib/utils/search';
import type { ResourceLink } from '@/lib/types';

interface ResourceGridProps {
  resources: ResourceLink[];
  /** Whether a query or a tag is narrowing the list. */
  filtering?: boolean;
  /** The query the list was filtered on, for the count to quote. */
  query?: string;
}

// Memoised so a keystroke's own render stops here. The views filter on the
// deferred query and pass only what that produced, so until the deferred
// render runs, every prop is unchanged and no card re-renders.
export default memo(function ResourceGrid({
  resources,
  filtering = false,
  query = '',
}: ResourceGridProps) {
  return (
    <>
      {filtering && (
        <p className="text-sm text-muted-foreground">
          {resultSummary(resources.length, query)}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.href} resource={resource} />
        ))}
      </div>
    </>
  );
});
