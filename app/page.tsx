// The landing page: the introduction, a tile for every section, then a preview
// of each section linking through to its own page. Section copy, order and
// links all come from SECTIONS.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroBanner } from '@/components/ui/hero-banner';
import { SECTIONS } from '@/constants/sections';
import type { Section } from '@/lib/types';
import { Icon } from '@/lib/icons';
import { toSectionId, toSlug } from '@/lib/utils/navigation';
import { SectionPreviewGrid } from '@/components/section-preview-grid';
import { SectionTiles } from '@/components/section-tiles';
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
  const { title, description, href, icon } = section;
  const viewAllText = VIEW_ALL_TEXT[title] ?? `View all ${title}`;

  const formattedTitle = toSlug(title);
  const sectionId = toSectionId(title);
  const headingId = `heading-${formattedTitle}`;

  // The View All link comes before the cards, so a keyboard user reaches it
  // without tabbing through the preview first.
  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="container scroll-mt-20 py-8 md:scroll-mt-16"
    >
      <div className="mb-5 flex flex-col gap-3 @lg:flex-row @lg:items-end @lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
            <Icon
              icon={icon}
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            />
          </span>
          <div>
            <h2
              id={headingId}
              className="text-xl font-semibold tracking-tight"
            >
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex h-8 shrink-0 items-center gap-1 self-start rounded-lg px-3 text-sm font-medium text-primary hover:bg-primary/10 @lg:self-auto"
          aria-label={`View all ${title}`}
        >
          {viewAllText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <SectionPreviewGrid slug={href.slice(1)} />
    </section>
  );
};

export default function Home() {
  return (
    <SearchWrapper>
      <div className="flex w-full flex-col pb-10">
        <HeroBanner
          title="Your Essential Web Dev Links, Simplified"
          description="Access a curated collection of must-have resources and quick links, designed to keep everything you need right at your fingertips."
        />

        <section
          aria-labelledby="heading-browse"
          className="container pt-8 pb-6"
        >
          <h2
            id="heading-browse"
            className="mb-3 text-sm font-medium text-muted-foreground"
          >
            Browse by section
          </h2>
          <SectionTiles />
        </section>

        {SECTIONS.map((section) => (
          <ResourceSection key={section.title} section={section} />
        ))}
      </div>
    </SearchWrapper>
  );
}
