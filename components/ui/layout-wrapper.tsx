'use client';

import { usePathname } from 'next/navigation';
import VerticalNavigation from './vertical-navigation';
import { SearchProvider } from '@/contexts/search-context';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps) {
  const pathname = usePathname();

  return (
    <SearchProvider>
      <div className="flex h-full min-h-screen">
        <VerticalNavigation />
        <div className="relative flex flex-col flex-1">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:p-2 focus:bg-accent focus:text-accent-foreground focus:z-50"
          >
            Skip to main content
          </a>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );

  return (
    <SearchProvider>
      <div className="flex h-full min-h-screen">
        <VerticalNavigation />
        <div className="relative flex flex-col flex-1">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:p-2 focus:bg-accent focus:text-accent-foreground focus:z-50"
          >
            Skip to main content
          </a>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
