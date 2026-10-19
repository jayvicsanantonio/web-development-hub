// The chrome around every page: a skip link to the main content, the global
// keyboard shortcuts, and the navigation.
'use client';

import SiteNavigation from './site-navigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps) {
  useKeyboardShortcuts();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* First in the tab order, ahead of everything the header holds. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-background"
      >
        Skip to main content
      </a>
      <SiteNavigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
