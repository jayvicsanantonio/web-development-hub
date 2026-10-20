// A bordered list of resource rows, with a count above it while the list is
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
      {/* The prompt sits beside the count rather than inside it, so the
          count's own text is the summary alone. */}
      {filtering && (
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span aria-hidden="true" className="text-prompt">
            &gt;
          </span>
          <p>{resultSummary(resources.length, query)}</p>
        </div>
      )}

      <div className="divide-y divide-border border border-border">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </>
  );
});
