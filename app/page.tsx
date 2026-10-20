// The landing page: a preview grid of every section, each linking through to
// its own page. Section copy, order and links all come from SECTIONS.
import Link from 'next/link';
import { HeroBanner } from '@/components/ui/hero-banner';
import { SECTIONS } from '@/constants/sections';
import type { Section } from '@/lib/types';
import { toSectionId, toSlug } from '@/lib/utils/navigation';
import { SectionPreviewGrid } from '@/components/section-preview-grid';
import { SearchWrapper } from '@/components/search-wrapper';

// Homepage-only call-to-action copy. The section's own title, description,
// href and links are read from the dataset rather than repeated here.
const VIEW_ALL_TEXT: Record<string, string> = {
  'Learning Resources': 'View All Resources',
  'Developer Tools': 'View All Tools',
  'Frameworks and Libraries': 'View All Frameworks',
  Communities: 'View All Communities',
  'Blogs and Newsletters': 'View All Blogs and Newsletters',
};

const ResourceSection = ({
  section,
  index,
}: {
  section: Section;
  index: number;
}) => {
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
      className="container scroll-mt-14 py-14 space-y-6"
    >
      <a
        href={`#${skipLinkId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:bg-background focus:text-foreground focus:p-4 focus:border focus:border-accent focus:z-50"
      >
        Skip to {viewAllText}
      </a>
      <div className="flex flex-col gap-2">
        <p aria-hidden="true" className="text-xs text-muted-foreground">
          <span className="text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          {` ~/${formattedTitle}`}
        </p>
        <h2
          id={headingId}
          className="text-2xl md:text-3xl font-bold tracking-tighter"
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>
      <SectionPreviewGrid slug={href.slice(1)} />
      <div id={skipLinkId}>
        <Link
          href={href}
          className="group inline-flex h-10 items-center gap-3 border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent"
          aria-label={`View all ${title}`}
        >
          {viewAllText}
          <span className="text-xs text-muted-foreground group-hover:text-accent">
            {links.length}
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <SearchWrapper>
      <div className="flex flex-col w-full">
        <HeroBanner
          title="Your Essential Web Dev Links, Simplified"
          description="Access a curated collection of must-have resources and quick links, designed to keep everything you need right at your fingertips."
        />

        {SECTIONS.map((section, index) => (
          <ResourceSection
            key={section.title}
            section={section}
            index={index}
          />
        ))}
      </div>
    </SearchWrapper>
  );
}
