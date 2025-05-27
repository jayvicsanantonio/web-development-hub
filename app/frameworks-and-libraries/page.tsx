import Link from "next/link";
import { SECTIONS } from "@/constants/sections";

export default function Page() {
  const section = SECTIONS[2]; // Frameworks & Libraries

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16 flex flex-col gap-10">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-on-background">
          {section.title}
        </h1>
        {section.description && (
           <p className="mt-3 text-lg text-on-background/80 max-w-2xl mx-auto">
            {section.description}
          </p>
        )}
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {section.links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-2 rounded-lg border border-outline bg-surface text-on-surface p-4 transition-all duration-200 ease-in-out hover:shadow-md3-elevation-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface"
          >
            <link.icon width={32} height={32} className="mb-2 text-secondary" />
            <div className="flex-1 w-full">
              <h3 className="font-heading text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-on-surface-variant/80 line-clamp-2 mt-1">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
