// One resource as a row: its icon and linked title, its description and tags,
// and a bookmark toggle. Every resource list on the site is built from these.
'use client';

import React from 'react';
import { Icon } from '@/lib/icons';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import type { ResourceLink } from '@/lib/types';

type ResourceCardProps = {
  resource: ResourceLink;
};

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  const resourceId = resource.id;

  return (
    <article
      className="resource-row"
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Icon
          icon={resource.icon}
          className="mt-0.5 h-5 w-5 shrink-0"
          aria-hidden="true"
        />
        <h3
          id={`title-${resourceId}`}
          className="min-w-0 break-words text-[0.95rem] font-semibold"
        >
          {/* The ::after overlay makes the whole row clickable while the
              link itself stays inside the heading, so the bookmark button is
              a sibling rather than a button nested in an anchor. */}
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[var(--color-ring)]"
          >
            {resource.title}
          </a>
        </h3>
        <span
          aria-hidden="true"
          className="mt-0.5 text-xs text-muted-foreground"
        >
          ↗
        </span>
      </div>
      <div className="col-span-2 min-w-0 md:col-span-1">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>

        {resource.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {resource.tags.map((tag) => (
              <span
                key={`${resourceId}-tag-${tag}`}
                className="tag-chip"
                title={`Filter by ${tag}`}
              >
                {tag.replaceAll('-', ' ')}
              </span>
            ))}
          </div>
        )}
      </div>
      <BookmarkButton
        resourceId={resource.id}
        title={resource.title}
        className="relative z-10 -my-1"
      />
    </article>
  );
}
