// The terminal session that opens the landing page: the headline and its
// description, the size of the catalogue, and a listing of the section pages.
import Link from 'next/link';
import {
  ALL_RESOURCES,
  ALL_TAGS,
  SECTIONS,
} from '@/constants/sections';
import { toSlug } from '@/lib/utils/navigation';

interface HeroBannerProps {
  title: string;
  description: string;
}

// Counted from the dataset during the build, so they follow it.
const STATS = [
  { label: 'resources', value: ALL_RESOURCES.length },
  { label: 'sections', value: SECTIONS.length },
  { label: 'tags', value: ALL_TAGS.length },
];

/** A command after a shell prompt: scenery, so it is hidden from readers. */
function Prompt({ command }: { command: string }) {
  return (
    <p aria-hidden="true" className="text-sm text-muted-foreground">
      <span className="mr-2 font-bold text-prompt">$</span>
      {command}
    </p>
  );
}

export function HeroBanner({ title, description }: HeroBannerProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-border"
    >
      <div className="container py-14 md:py-20">
        <Prompt command="cat ~/webdevhub/README.md" />
        <h1
          id="hero-title"
          className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl"
        >
          {title}
          <span aria-hidden="true" className="cursor-block" />
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
          {STATS.map(({ label, value }) => (
            // Reversed so the figure reads above its label.
            <div key={label} className="flex flex-col-reverse">
              <dt className="text-xs text-muted-foreground">
                {label}
              </dt>
              <dd className="text-3xl font-bold text-accent">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <Prompt command="ls ~/webdevhub" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="group flex items-center justify-between gap-4 border border-border px-4 py-3 text-sm hover:border-accent"
                  aria-label={`${section.title} ${section.links.length} resources`}
                >
                  <span className="truncate group-hover:text-accent">
                    {toSlug(section.title)}/
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {section.links.length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
