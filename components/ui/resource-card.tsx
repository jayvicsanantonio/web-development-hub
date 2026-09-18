'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { generateResourceId } from '@/lib/utils/resource-card';
import { getTagIconName } from '@/lib/utils/tag-icons';
import type { ResourceLink } from '@/lib/types';

type ResourceCardProps = {
  resource: ResourceLink;
};

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  const resourceId = generateResourceId(resource.title);

  return (
    <article
      className="relative flex flex-col h-full rounded-lg transition-all bg-card border border-border hover:shadow-lg hover:scale-[1.01]"
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon
              icon={resource.icon}
              className="h-8 w-8"
              aria-hidden="true"
            />
          </div>
          <h3
            id={`title-${resourceId}`}
            className="text-lg font-semibold"
          >
            {/* The ::after overlay makes the whole card clickable while the
                link itself stays inside the heading, so the bookmark button is
                a sibling rather than a button nested in an anchor. */}
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--color-ring)]"
            >
              {resource.title}
            </a>
          </h3>
        </div>
        <BookmarkButton
          href={resource.href}
          title={resource.title}
          size="md"
          className="relative z-10"
        />
      </div>
      <div className="p-6 flex-grow space-y-4">
        <p className="text-muted-foreground">
          {resource.description}
        </p>

        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {resource.tags.map((tag) => {
              const tagIcon = getTagIconName(tag);
              return (
                <span
                  key={`${resourceId}-tag-${tag}`}
                  className={cn(
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                    'transition-colors duration-200 ease-in-out',
                    'border border-border/50',
                    'bg-secondary/5 text-secondary border-secondary/30 hover:bg-secondary/10',
                    'dark:bg-secondary/30 dark:text-secondary-foreground dark:border-secondary/95 dark:hover:bg-secondary/80',
                  )}
                  title={`Filter by ${tag}`}
                >
                  {tagIcon && (
                    <Icon
                      icon={tagIcon}
                      className="w-3 h-3 mr-1.5"
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
    </article>
  );
}
