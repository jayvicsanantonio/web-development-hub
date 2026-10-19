// The intro that opens the landing page: a line counting the index, the
// headline and its description, and beside them the contents, linking every
// section page with its count. It is short, so the first section shows below
// it without a scroll.
import Link from 'next/link';
import { ALL_RESOURCES, SECTIONS } from '@/constants/sections';
import { sectionNumber } from '@/lib/utils/navigation';

interface HeroBannerProps {
  title: React.ReactNode;
  description: string;
}

export function HeroBanner({ title, description }: HeroBannerProps) {
  return (
    <section
      aria-labelledby="intro-heading"
      className="grid gap-12 border-b border-foreground pt-10 pb-12 md:pt-16 md:pb-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16"
    >
      <div>
        <p className="eyebrow text-muted-foreground">
          An index of {ALL_RESOURCES.length} resources in{' '}
          {SECTIONS.length} sections
        </p>
        <h1
          id="intro-heading"
          className="mt-6 max-w-4xl font-serif text-[3.25rem] leading-[0.95] tracking-tight md:text-7xl lg:text-[6.5rem]"
        >
          {title}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <nav aria-label="Contents" className="hidden self-end lg:block">
        <p className="eyebrow border-b border-foreground pb-2 text-muted-foreground">
          Contents
        </p>
        <ol className="m-0 list-none p-0">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="group flex items-baseline gap-3 border-b border-border py-2.5 hover:text-accent"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-muted-foreground"
                >
                  {sectionNumber(section.title)}
                </span>
                <span className="font-serif text-xl leading-tight">
                  {section.title}
                </span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {section.links.length}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
