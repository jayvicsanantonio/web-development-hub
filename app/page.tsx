// The landing page: a preview grid of every section, each linking through to
// its own page. Section copy, order and links all come from SECTIONS.
import Link from 'next/link';
import { HeroBanner } from '@/components/ui/hero-banner';
import { SECTIONS } from '@/constants/sections';
import type { Section } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toSectionId, toSlug } from '@/lib/utils/navigation';
import ResourceGrid from '@/components/ui/resource-grid';
import { SearchWrapper } from '@/components/search-wrapper';

const PREVIEW_COUNT = 6;

// Homepage-only call-to-action copy. The section's own title, description,
// href and links are read from the dataset rather than repeated here.
const VIEW_ALL_TEXT: Record<string, string> = {
  'Learning Resources': 'View All Resources',
  'Developer Tools': 'View All Tools',
  'Frameworks and Libraries': 'View All Frameworks',
  Communities: 'View All Communities',
  'Blogs and Newsletters': 'View All Blogs and Newsletters',
};

const ResourceSection = ({ section }: { section: Section }) => {
  const { title, description, href, links } = section;
  const viewAllText = VIEW_ALL_TEXT[title] ?? `View all ${title}`;

  const formattedTitle = toSlug(title);
  const sectionId = toSectionId(title);
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
        Skip to {viewAllText}
      </a>
      <div className="flex flex-col space-y-2">
        <h2
          id={headingId}
          className="text-3xl font-bold tracking-tighter"
        >
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <ResourceGrid resources={links.slice(0, PREVIEW_COUNT)} />
      <div className="flex justify-center" id={skipLinkId}>
        <Link
          href={href}
          className={cn(
            'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full',
            'border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80',
          )}
          aria-label={`View all ${title}`}
        >
          {viewAllText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
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
  return (
    <SearchWrapper>
      <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
        <HeroBanner
          title="Your Essential Web Dev Links, Simplified"
          description="Access a curated collection of must-have resources and quick links, designed to keep everything you need right at your fingertips."
        />

        {SECTIONS.map((section) => (
          <ResourceSection key={section.title} section={section} />
        ))}
      </div>
    </SearchWrapper>
  );
}
