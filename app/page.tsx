// The landing page: the intro, then a preview of every section, each linking
// through to its own page. Section copy, order and links all come from
// SECTIONS.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroBanner } from '@/components/ui/hero-banner';
import { SECTIONS } from '@/constants/sections';
import type { Section } from '@/lib/types';
import {
  sectionNumber,
  toSectionId,
  toSlug,
} from '@/lib/utils/navigation';
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

const ResourceSection = ({ section }: { section: Section }) => {
  const { title, description, href } = section;
  const viewAllText = VIEW_ALL_TEXT[title] ?? `View all ${title}`;

  const formattedTitle = toSlug(title);
  const sectionId = toSectionId(title);
  const headingId = `heading-${formattedTitle}`;
  const skipLinkId = `skip-${formattedTitle}`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative pt-16 md:pt-24"
    >
      <a
        href={`#${skipLinkId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-background"
      >
        Skip to {viewAllText}
      </a>
      <div className="grid gap-x-10 gap-y-4 border-b border-foreground pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="eyebrow text-accent">
            No. {sectionNumber(title)}
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-4xl leading-none tracking-tight md:text-6xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>
        <p className="eyebrow text-muted-foreground">
          {section.links.length} resources
        </p>
      </div>
      <SectionPreviewGrid slug={href.slice(1)} />
      <div className="flex justify-end pt-6" id={skipLinkId}>
        <Link
          href={href}
          className="group inline-flex items-center gap-2 border-b border-foreground pb-1 font-mono text-xs uppercase tracking-[0.18em] hover:border-accent hover:text-accent"
          aria-label={`View all ${title}`}
        >
          {viewAllText}
          <ArrowRight
            className="h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <SearchWrapper>
      <div className="container pb-8">
        <HeroBanner
          title={
            <>
              The web developer&rsquo;s
              <br />
              <em className="text-accent">field guide.</em>
            </>
          }
          description="A hand-picked index of the courses, tools, frameworks, communities and newsletters worth your time, kept in one place."
        />

        {SECTIONS.map((section) => (
          <ResourceSection key={section.title} section={section} />
        ))}
      </div>
    </SearchWrapper>
  );
}
