// One resource as a row of the index: its icon, linked title, description and
// tags, with a bookmark toggle. Every resource list on the site is built from
// these.
'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@/lib/icons';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { getTagIconName } from '@/lib/utils/tag-icons';
import type { ResourceLink } from '@/lib/types';

type ResourceCardProps = {
  resource: ResourceLink;
};

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  const resourceId = resource.id;

  // No transition on the row itself: a whole section page of rows would fade
  // their colours at once whenever the theme is toggled. Only the arrow moves.
  // The hover tint is a pseudo-element wider than the row, so the tint has
  // room around the text while the rule under the row stays flush with the
  // rules above it.
  return (
    <article
      className="group/row relative isolate grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-b border-border py-5 before:absolute before:inset-y-0 before:-inset-x-3 before:-z-10 hover:before:bg-muted lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto] lg:gap-x-10"
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-card">
          <Icon
            icon={resource.icon}
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <h3
          id={`title-${resourceId}`}
          className="pt-1 font-serif text-[1.375rem] leading-tight"
        >
          {/* The ::after overlay makes the whole row clickable while the
              link itself stays inside the heading, so the bookmark button is
              a sibling rather than a button nested in an anchor. */}
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="decoration-accent decoration-1 underline-offset-4 group-hover/row:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--color-ring)]"
          >
            {resource.title}
          </a>
        </h3>
      </div>

      <div className="col-span-2 min-w-0 space-y-3 lg:col-span-1 lg:pt-1">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-muted-foreground">
          {resource.description}
        </p>

        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.map((tag) => {
              const tagIcon = getTagIconName(tag);
              return (
                <span
                  key={`${resourceId}-tag-${tag}`}
                  className="tag-chip"
                  title={`Filter by ${tag}`}
                >
                  {tagIcon && (
                    <Icon
                      icon={tagIcon}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  )}
                  {tag.replaceAll('-', ' ')}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="col-start-2 row-start-1 flex items-start gap-1 lg:col-start-3">
        <BookmarkButton
          resourceId={resource.id}
          title={resource.title}
          className="relative z-10"
        />
        <ArrowUpRight
          className="mt-1.5 hidden h-5 w-5 text-muted-foreground transition-[translate] duration-200 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-accent lg:block"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
