// The section index down the left from lg: the sections of the current page,
// or every section page elsewhere, then the global keyboard shortcuts. Arrow
// keys rove focus through the section buttons.
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SECTIONS } from '@/constants/sections';
import {
  scrollToSection,
  toSlug,
  type NavigationItem as NavigationItemType,
} from '@/lib/utils/navigation';
import { useRef } from 'react';
import { useIsMac } from '@/lib/hooks/use-is-mac';

const entryClassName = (isActive: boolean) =>
  cn(
    'flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm',
    isActive
      ? 'bg-muted font-semibold text-accent'
      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
  );

/**
 * An entry drawn as a directory in a tree listing. Both spans are hidden from
 * assistive technology: a button is named by its aria-label, a link by the
 * section title beside them.
 */
function EntryLabel({
  title,
  isLast,
}: {
  title: string;
  isLast: boolean;
}) {
  return (
    <>
      <span aria-hidden="true" className="text-muted-foreground/60">
        {isLast ? '└─' : '├─'}
      </span>
      <span aria-hidden="true" className="truncate">
        {toSlug(title)}/
      </span>
    </>
  );
}

/** The shortcuts useKeyboardShortcuts binds, for the index's footer. */
function ShortcutList({ isMac }: { isMac: boolean }) {
  const mod = isMac ? '⌘' : 'Ctrl+';
  const shortcuts = [
    { keys: '/', action: 'search' },
    { keys: `${mod}F`, action: 'filter tags' },
    { keys: `${mod}B`, action: 'bookmarks' },
    { keys: `${mod}H`, action: 'home' },
    { keys: isMac ? '⌘⇧L' : 'Ctrl+⇧L', action: 'theme' },
    { keys: 'Esc', action: 'clear search' },
  ];

  return (
    <div className="border-t border-border px-5 py-5">
      <p className="text-xs text-muted-foreground">{'// keys'}</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-xs">
        {shortcuts.map(({ keys, action }) => (
          <div key={action} className="contents">
            <dt>
              <kbd className="kbd">{keys}</kbd>
            </dt>
            <dd className="text-muted-foreground">{action}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface DesktopNavigationProps {
  /** The sections the page renders, as VerticalNavigation chose them. */
  navItems: NavigationItemType[];
  activeSection: string;
  isHomeActive: boolean;
  isBookmarksActive: boolean;
  /** The page being viewed, to mark its entry among the section pages. */
  pathname: string;
}

export function DesktopNavigation({
  navItems,
  activeSection,
  isHomeActive,
  isBookmarksActive,
  pathname,
}: DesktopNavigationProps) {
  const isMac = useIsMac();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  // The home and bookmarks pages scroll between the sections they render;
  // every other page links the section pages instead.
  const listsPageSections = isHomeActive || isBookmarksActive;

  return (
    <nav
      aria-label="Page sections navigation"
      className="fixed bottom-0 left-0 top-14 z-30 hidden w-72 flex-col border-r border-border bg-background lg:flex"
    >
      <span id="nav-description" className="sr-only">
        Use up and down arrow keys to navigate between sections
      </span>
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-2 text-xs text-muted-foreground">
          {listsPageSections ? '// on this page' : '// sections'}
        </p>
        <p className="mt-3 px-2 text-sm text-foreground">
          ~/webdevhub
        </p>
        <ul className="m-0 mt-1 list-none p-0">
          {listsPageSections &&
            navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className={entryClassName(
                    activeSection === item.id,
                  )}
                  aria-label={`Navigate to ${item.title} section`}
                  aria-current={
                    activeSection === item.id ? 'page' : undefined
                  }
                  aria-describedby="nav-description"
                  onKeyDown={(e) => {
                    // Indexed refs rather than a selector: every button is the
                    // only element in its <li>, so :nth-of-type(n) matched them
                    // all at n=1 and nothing at all beyond it.
                    switch (e.key) {
                      case 'ArrowUp':
                        e.preventDefault();
                        focusItem(Math.max(0, index - 1));
                        break;
                      case 'ArrowDown':
                        e.preventDefault();
                        focusItem(
                          Math.min(navItems.length - 1, index + 1),
                        );
                        break;
                      case 'Home':
                        e.preventDefault();
                        focusItem(0);
                        break;
                      case 'End':
                        e.preventDefault();
                        focusItem(navItems.length - 1);
                        break;
                    }
                  }}
                >
                  <EntryLabel
                    title={item.title}
                    isLast={index === navItems.length - 1}
                  />
                </button>
              </li>
            ))}

          {listsPageSections && navItems.length === 0 && (
            <li className="px-2 py-1.5 text-sm text-muted-foreground">
              └─ (empty)
            </li>
          )}

          {!listsPageSections &&
            SECTIONS.map((section, index) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className={entryClassName(
                    pathname === section.href,
                  )}
                  aria-current={
                    pathname === section.href ? 'page' : undefined
                  }
                >
                  <EntryLabel
                    title={section.title}
                    isLast={index === SECTIONS.length - 1}
                  />
                  <span className="sr-only">{section.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <ShortcutList isMac={isMac} />
    </nav>
  );
}
