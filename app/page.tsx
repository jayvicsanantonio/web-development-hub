'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HeroBanner } from '@/components/ui/hero-banner';
import { SECTIONS } from '@/constants/sections';
import { CategoryType } from '@/lib/types';
import { cn } from '@/lib/utils';
import ResourceCard from '@/components/ui/resource-card';
import { useSearch } from '@/contexts/search-context';

interface ResourceSectionProps {
  title: string;
  description: string;
  category: CategoryType;
  ctaText: string;
  viewAllLink: string;
  viewAllText: string;
}

const ResourceSection = ({
  title,
  description,
  category,
  ctaText,
  viewAllLink,
  viewAllText,
}: ResourceSectionProps) => {
  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+&\s+/g, ' ')
      .replace(/\s+/g, '-');

  const sectionData = SECTIONS.find((section) => {
    const normalizedSectionTitle = normalizeString(section.title);
    const normalizedCategory = normalizeString(category);
    const normalizedTitle = normalizeString(title);
    return (
      normalizedSectionTitle === normalizedCategory ||
      normalizedSectionTitle === normalizedTitle
    );
  });

  const resources = (sectionData?.links || []).map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
    tags: link.tags,
  }));

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
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label={`${title} list`}
      >
        {resources.slice(0, 6).map((resource) => (
          <ResourceCard key={resource.href} resource={resource} />
        ))}
      </div>
      <div className="flex justify-center" id={skipLinkId}>
        <Link
          href={viewAllLink}
          className={cn(
            'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full',
            'border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80'
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
};

export default function Home() {
  const {
    searchQuery,
    searchResults,
    selectedTags,
    setCurrentCategory,
  } = useSearch();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  const isSearching =
    (searchQuery && searchQuery.trim().length > 0) ||
    selectedTags.length > 0;
  const groupedResults = isSearching
    ? searchResults.reduce(
        (groups: Record<string, any[]>, item: any) => {
          const category = item.section || 'Uncategorized';
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(item);
          return groups;
        },
        {}
      )
    : {};

  return (
    <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
      {isSearching ? (
        <section className="container mx-auto py-12 md:py-12 flex flex-col gap-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Search Results
            </h1>
            <p className="text-foreground-muted">
              {searchResults.length > 0
                ? `Found ${searchResults.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-12">
              {Object.entries(groupedResults).map(
                ([category, items]) => {
                  const sectionId = `section-${category
                    .toLowerCase()
                    .replace(/\s+&\s+/g, '-')
                    .replace(/\s+/g, '-')}`;

                  return (
                    <section
                      id={sectionId}
                      key={category}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl font-bold tracking-tight">
                        {category}
                      </h2>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((resource: any) => (
                          <ResourceCard
                            key={resource.href}
                            resource={resource}
                            accentColor={
                              category === 'Learning Resources' ||
                              category === 'Frameworks and Libraries'
                                ? 'neon'
                                : 'purple'
                            }
                          />
                        ))}
                      </div>
                    </section>
                  );
                }
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p>
                Try adjusting your search terms to find what you're
                looking for.
              </p>
            </div>
          )}
        </section>
      ) : (
        <>
          <HeroBanner
            title="Your Essential Web Dev Links, Simplified"
            description="Access a curated collection of must-have resources and quick links, designed to keep everything you need right at your fingertips."
          />

          <ResourceSection
            title="Learning Resources"
            description="Start or advance your web development journey with these educational resources"
            category="learning-resources"
            ctaText="Explore Resource"
            viewAllLink="/learning-resources"
            viewAllText="View All Resources"
          />

          <ResourceSection
            title="Developer Tools"
            description="Essential tools to streamline your development workflow"
            category="tools"
            ctaText="View Tool"
            viewAllLink="/developer-tools"
            viewAllText="View All Tools"
          />

          <ResourceSection
            title="Frameworks and Libraries"
            description="Popular frameworks and libraries to build modern web applications"
            category="frameworks-and-libraries"
            ctaText="Learn More"
            viewAllLink="/frameworks-and-libraries"
            viewAllText="View All Frameworks"
          />

          <ResourceSection
            title="Communities"
            description="Connect with fellow developers in these vibrant communities"
            category="communities"
            ctaText="Join Community"
            viewAllLink="/communities"
            viewAllText="View All Communities"
          />

          <ResourceSection
            title="Blogs"
            description="Stay updated with the latest trends and insights from the web development world"
            category="blogs"
            ctaText="Read Blog"
            viewAllLink="/blogs"
            viewAllText="View All Blogs"
          />
        </>
      )}
    </div>
  );
}
