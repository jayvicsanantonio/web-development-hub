// The 404 page every unknown path renders, inside the site's header and
// footer: a way back to the home page and to each section page.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SECTIONS } from '@/constants/sections';
import { sectionNumber } from '@/lib/utils/navigation';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

const LINK_CLASS_NAME =
  'inline-flex items-center gap-2 border-b border-foreground pb-1 font-mono text-xs uppercase tracking-[0.18em] hover:border-accent hover:text-accent';

export default function NotFound() {
  return (
    <div className="container pt-10 pb-8 md:pt-16">
      <header className="border-b border-foreground pb-8">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          Not in the index.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          There is no page at this address. It may have moved, or the
          link may be mistyped.
        </p>
      </header>

      <Link href="/" className={`mt-8 ${LINK_CLASS_NAME}`}>
        Back to the home page
        <span aria-hidden="true">→</span>
      </Link>

      <nav aria-label="Sections" className="mt-12">
        <p className="eyebrow text-muted-foreground">
          Or browse a section
        </p>
        <ul className="mt-4 flex list-none flex-wrap gap-x-8 gap-y-4 p-0">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link href={section.href} className={LINK_CLASS_NAME}>
                <span aria-hidden="true" className="text-muted-foreground">
                  {sectionNumber(section.title)}
                </span>
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
