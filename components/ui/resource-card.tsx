'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import {
  determineSection,
  getResourceIcon,
} from '@/lib/data/resource-mappings';
import {
  generateResourceId,
  getCardClassName,
  getAccentColorClasses,
} from '@/lib/utils/resource-card';
import { getTagIconName } from '@/lib/utils/tag-icons';

type ResourceCardProps = {
  resource: {
    title: string;
    href: string;
    description: string;
    section?: string;
    tags?: string[];
  };
  accentColor: 'neon' | 'purple';
};

export default function ResourceCard({
  resource,
  accentColor,
}: ResourceCardProps) {
  const resourceWithSection = {
    ...resource,
    section: resource.section || determineSection(resource.title),
  };
  const resourceId = generateResourceId(resource.title);
  const iconName = getResourceIcon(resource.title);

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className={getCardClassName(accentColor)}
      key={resourceId}
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          {}
          <div className="relative">
            {iconName ? (
              <Icon
                icon={iconName}
                className={cn(
                  'h-8 w-8',
                  getAccentColorClasses(accentColor).icon
                )}
                aria-hidden="true"
              />
            ) : (
              <div
                className={cn(
                  'h-8 w-8 flex items-center justify-center rounded-full bg-muted',
                  getAccentColorClasses(accentColor).icon
                )}
                aria-hidden="true"
              >
                {resource.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h3
            id={`title-${resourceId}`}
            className="text-lg font-semibold"
          >
            {resource.title}
          </h3>
        </div>
        <BookmarkButton
          resource={resourceWithSection}
          size="md"
          className="z-10"
        />
      </div>
      <div className="p-6 flex-grow space-y-4">
        <p className="text-foreground-muted">
          {resource.description}
        </p>

        {}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {resource.tags.map((tag, index) => (
              <span
                key={`${resourceId}-tag-${index}`}
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                  'transition-colors duration-200 ease-in-out transform-gpu',
                  'border border-border/50',
                  'bg-secondary/20 text-secondary-foreground border-secondary/30 hover:bg-secondary/30',
                  'dark:bg-secondary/10 dark:text-secondary-foreground dark:border-secondary/20 dark:hover:bg-secondary/20'
                )}
                title={`Filter by ${tag}`}
              >
                {(() => {
                  const iconName = getTagIconName(tag);
                  return iconName ? (
                    <Icon
                      icon={iconName}
                      className="w-3 h-3 mr-1.5"
                      aria-hidden="true"
                    />
                  ) : null;
                })()}
                {tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
