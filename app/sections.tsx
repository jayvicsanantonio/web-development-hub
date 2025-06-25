import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { SECTIONS } from '@/constants/sections';
import { CategoryType } from '@/lib/types';
import { cn } from '@/lib/utils';
type Resource = {
  title: string;
  description: string;
  href: string;
  iconifyIcon?: string;
  icon?: React.FC<{ className?: string }>;
};
interface ResourceSectionProps {
  title: string;
  description: string;
  category: CategoryType;
  ctaText: string;
  viewAllLink: string;
  viewAllText: string;
  accentColor: 'neon' | 'purple';
}
const ResourceCard = ({
  resource,
  accentColor,
}: {
  resource: Resource;
  accentColor: 'neon' | 'purple';
}) => {
  const resourceId = resource.title
    .toLowerCase()
    .replace(/\s+/g, '-');
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'flex flex-col h-full rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] hover:border-accent-neon/50 space-y-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        accentColor === 'neon'
          ? 'hover:border-accent-neon/50 focus:ring-accent-neon'
          : 'hover:border-accent-purple/50 focus:ring-accent-purple'
      )}
      aria-labelledby={`resource-title-${resourceId}`}
    >
      {}
      <div className="flex items-center space-x-2">
        {}
        {resource.iconifyIcon ? (
          <Icon
            icon={resource.iconifyIcon}
            className="w-10 h-10"
            aria-hidden="true"
          />
        ) : resource.icon ? (
          <resource.icon className="w-10 h-10" />
        ) : null}
      </div>
      {}
      <div className="space-y-2 flex-1">
        <h3
          id={`resource-title-${resourceId}`}
          className="font-semibold text-lg text-foreground"
        >
          {resource.title}
        </h3>
        <p className="text-sm text-foreground-muted">
          {resource.description}
        </p>
      </div>
    </a>
  );
};
export function ResourceSection({
  title,
  description,
  category,
  ctaText,
  viewAllLink,
  viewAllText,
  accentColor,
}: ResourceSectionProps) {
  const sectionData = SECTIONS.find((section) => {
    const sectionTitle = section.title
      .toLowerCase()
      .replace(/\s+&\s+/g, ' ')
      .replace(/\s+/g, '-');
    return sectionTitle === category || section.title === title;
  });
  const resources = sectionData?.links || [];
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  const sectionId = `section-${formattedTitle}`;
  const headingId = `heading-${formattedTitle}`;
  const skipLinkId = `skip-${formattedTitle}`;
  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="container mx-auto py-12 space-y-8"
    >
      <a
        href={`#${skipLinkId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:bg-background focus:text-foreground focus:p-4 focus:border focus:border-accent-neon focus:z-50 rounded-md"
      >
        Skip to {viewAllText || 'View all'}
      </a>
      <div className="flex flex-col space-y-2">
        <h2
          id={headingId}
          className="text-3xl font-bold tracking-tighter"
        >
          {title}
        </h2>
        <p className="text-foreground-muted">{description}</p>
      </div>
      {
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6"
          aria-label={`${title} list`}
        >
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              resource={resource}
              accentColor={accentColor}
            />
          ))}
        </div>
      }
      <div className="flex justify-center" id={skipLinkId}>
        <Link
          href={viewAllLink}
          className={cn(
            'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full',
            accentColor === 'neon'
              ? 'border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80'
              : 'border-accent-purple text-accent-purple focus-visible:ring-accent-purple hover:text-accent-purple/80'
          )}
          aria-label={`View all ${title}`}
        >
          {viewAllText || 'View all'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}
