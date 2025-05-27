import Link from 'next/link';
import { SECTIONS } from '@/constants/sections';
// Optional: import an icon for the page title, e.g., import { LayoutGrid } from 'lucide-react';

export default function BrowsePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
      <header className="mb-8 md:mb-12 text-center">
        {/* Optional: <LayoutGrid size={48} className="mx-auto mb-4 text-primary" /> */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-on-background">
          Explore All Resources
        </h1>
        <p className="mt-3 text-lg text-on-background/80 max-w-2xl mx-auto">
          Dive into our curated collections of learning materials, developer tools, frameworks, libraries, communities, and blogs.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {SECTIONS.map((section) => (
          <Link
            key={section.title}
            href={section.href || '#'}
            className="flex flex-col bg-surface-variant text-on-surface-variant rounded-xl shadow-md3-elevation-0 hover:shadow-md3-elevation-1 focus:shadow-md3-elevation-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-variant p-6 transition-all duration-200 ease-in-out group"
          >
            <div className="flex items-center mb-4">
              <section.icon className="h-10 w-10 text-primary mr-4" />
              <h2 className="font-heading text-xl font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                {section.title}
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant/80 flex-grow mb-4">
              {section.description}
            </p>
            <span className="mt-auto text-sm font-medium text-primary group-hover:underline">
              Go to {section.title} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
