'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
  accentColor: 'neon' | 'purple';
}

const ResourceSection = ({
  title,
  description,
  category,
  ctaText,
  viewAllLink,
  viewAllText,
  accentColor,
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
          <ResourceCard
            key={resource.href}
            resource={resource}
            accentColor={accentColor}
          />
        ))}
      </div>
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
};

// Main Home page component
export default function Home() {
  const { searchQuery, searchResults, setCurrentCategory } = useSearch();
  
  // Clear any category filter when on the home page
  useEffect(() => {
    setCurrentCategory(null);
    // No cleanup needed as we want home page to always clear the category
  }, [setCurrentCategory]);
  
  // Flag to determine if we should show search results
  const isSearching = searchQuery.trim().length > 0;
  
  // Group search results by category
  const groupedResults = isSearching ? 
    searchResults.reduce((groups: Record<string, any[]>, item: any) => {
      const category = item.section || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {}) : {};
    
  return (
    <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
      {isSearching ? (
        // Show search results when searching
        <section className="container mx-auto py-12 md:py-12 flex flex-col gap-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Search Results
            </h1>
            <p className="text-foreground-muted">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${searchQuery}"` 
                : `No results found for "${searchQuery}"`
              }
            </p>
          </div>
          
          {searchResults.length > 0 ? (
            // Display grouped results by category
            <div className="flex flex-col gap-12">
              {Object.entries(groupedResults).map(([category, items]) => {
                // Create section ID based on category name
                const sectionId = `section-${category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`;
                
                return (
                  <section id={sectionId} key={category} className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((resource: any) => (
                        <ResourceCard
                          key={resource.href}
                          resource={resource}
                          accentColor={category === 'Learning Resources' || category === 'Frameworks & Libraries' ? 'neon' : 'purple'}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p>Try adjusting your search terms to find what you're looking for.</p>
            </div>
          )}
        </section>
      ) : (
        // Show normal home page content when not searching
        <>
          <section className="container mx-auto py-12 md:py-24 flex flex-col items-center justify-center text-center space-y-6">
            <div className="inline-block rounded-full bg-accent-neon/10 px-4 py-1.5 text-sm font-medium text-accent-neon mb-4">
              Web Development Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
              Elevate Your Web Development Journey
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted max-w-[700px] mt-4">
              Discover a wealth of resources, tools, and community support
              to enhance your web development skills and build exceptional
              digital experiences.
            </p>
          </section>
          
          <ResourceSection
            title="Learning Resources"
            description="Start or advance your web development journey with these educational resources"
            category="learning-resources"
            ctaText="Explore Resource"
            viewAllLink="/learning-resources"
            viewAllText="View All Resources"
            accentColor="neon"
          />

          <ResourceSection
            title="Developer Tools"
            description="Essential tools to streamline your development workflow"
            category="tools"
            ctaText="View Tool"
            viewAllLink="/developer-tools"
            viewAllText="View All Tools"
            accentColor="purple"
          />

          <ResourceSection
            title="Frameworks & Libraries"
            description="Popular frameworks and libraries to build modern web applications"
            category="frameworks-and-libraries"
            ctaText="Learn More"
            viewAllLink="/frameworks-and-libraries"
            viewAllText="View All Frameworks"
            accentColor="neon"
          />

          <ResourceSection
            title="Communities"
            description="Connect with fellow developers in these vibrant communities"
            category="communities"
            ctaText="Join Community"
            viewAllLink="/communities"
            viewAllText="View All Communities"
            accentColor="purple"
          />

          <ResourceSection
            title="Blogs"
            description="Stay updated with the latest trends and insights from the web development world"
            category="blogs"
            ctaText="Read Blog"
            viewAllLink="/blogs"
            viewAllText="View All Blogs"
            accentColor="neon"
          />

          <footer className="container mx-auto py-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-foreground-muted">
                © {new Date().getFullYear()} Web Development Hub. All
                rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-sm text-foreground-muted hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-foreground-muted hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
