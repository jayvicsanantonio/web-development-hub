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

type ResourceCardProps = {
  resource: {
    title: string;
    href: string;
    description: string;
    section?: string;
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
          <Icon
            icon={iconName}
            className={cn(
              'h-8 w-8',
              getAccentColorClasses(accentColor).icon
            )}
            aria-hidden="true"
          />
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
      <div className="p-6 flex-grow">
        <p className="text-foreground-muted">
          {resource.description}
        </p>
      </div>
    </a>
  );
}
