// The chrome around every page: the global keyboard shortcuts, the navigation,
// and a skip link to the main content.
'use client';

import VerticalNavigation from './vertical-navigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps) {
  useKeyboardShortcuts();

  return (
    <div className="flex h-full min-h-screen relative">
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
  );
}
