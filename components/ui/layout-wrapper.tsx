// The app shell around every page: the global keyboard shortcuts, the sidebar
// and mobile bar, a skip link past them, and the main panel holding the top
// bar, the page and the footer.
'use client';

import VerticalNavigation from './vertical-navigation';
import { TopBar } from './top-bar';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutWrapperProps {
  children: React.ReactNode;
  /** Drawn after the page, inside the main panel. */
  footer: React.ReactNode;
}

export default function LayoutWrapper({
  children,
  footer,
}: LayoutWrapperProps) {
  useKeyboardShortcuts();

  return (
    <div className="relative min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <VerticalNavigation />
      <div className="md:pl-64">
        {/* Clipped rather than hidden: overflow: hidden would make the panel
            a scroll container, and the top bar would stick to it instead of
            to the window. Clipping keeps its rounded corners all the same. */}
        <div className="flex min-h-screen flex-col bg-background pt-16 md:m-2 md:ml-0 md:min-h-[calc(100vh-1rem)] md:overflow-clip md:rounded-xl md:border md:border-border md:pt-0 md:shadow-xs">
          <TopBar />
          <main id="main-content" className="@container flex-1">
            {children}
          </main>
          {footer}
        </div>
      </div>
    </div>
  );
}
