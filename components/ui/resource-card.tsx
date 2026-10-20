// One resource as a card: its icon, linked title, description and tags, with
// a bookmark toggle. Every resource grid on the site is built from these.
'use client';

import React from 'react';
import { Icon } from '@/lib/icons';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { getTagIconName } from '@/lib/utils/tag-icons';
import type { ResourceLink } from '@/lib/types';

type ResourceCardProps = {
  resource: ResourceLink;
};

/** The site a link leads to, as a visitor would name it: no `www.`. */
const hostOf = (href: string) =>
  new URL(href).hostname.replace(/^www\./, '');

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  const resourceId = resource.id;

  // Only the lift and the shadow are transitioned: a transition on colours
  // would fade every card on the page at once when the theme is toggled.
  return (
    <article
      className="relative flex flex-col h-full rounded-xl p-4 transition-[box-shadow,translate] bg-card border border-border hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5"
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
          <Icon
            icon={resource.icon}
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id={`title-${resourceId}`}
            className="text-[15px] font-semibold leading-snug break-words"
          >
            {/* The ::after overlay makes the whole card clickable while the
                link itself stays inside the heading, so the bookmark button is
                a sibling rather than a button nested in an anchor. */}
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--color-ring)]"
            >
              {resource.title}
            </a>
          </h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {hostOf(resource.href)}
          </p>
        </div>
        <BookmarkButton
          resourceId={resource.id}
          title={resource.title}
          className="relative z-10 -mr-1 -mt-1"
        />
      </div>

      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        {resource.description}
      </p>

      {resource.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
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
                    className="w-3 h-3 mr-1"
                    aria-hidden="true"
                  />
                )}
                {tag.replaceAll('-', ' ')}
              </span>
            );
          })}
        </div>
      )}
    </article>
  );
}
