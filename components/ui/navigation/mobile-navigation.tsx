// The mobile top bar - search, bookmarks, the theme toggle - and its menu of
// the home page and the section pages. Hidden from the md breakpoint up.
'use client';

import { SECTIONS } from '@/constants/sections';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, BookmarkIcon, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';
import { SearchInput } from '@/components/ui/search-input';
import { FilterButton } from '@/components/ui/filter-button';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/utils';

// The square, borderless icon button every control in the bar is drawn as.
const ICON_BUTTON =
  'flex h-9 w-9 cursor-pointer items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground';

/** One row of the mobile menu: the page's icon and title, as a link. */
function MenuLink({
  title,
  iconName,
  href,
  isActive,
  onClick,
  onKeyDown,
  ref,
}: {
  title: string;
  iconName: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        'flex w-full items-center gap-3 border-l-2 px-3 py-3 text-sm',
        isActive
          ? 'border-accent bg-muted text-accent font-medium'
          : 'border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon
        icon={iconName}
        className="h-4 w-4"
        aria-hidden="true"
      />
      <span>{title}</span>
    </Link>
  );
}

interface MobileNavigationProps {
  hideSearch?: boolean;
}

export function MobileNavigation({
  hideSearch = false,
}: MobileNavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleSearchComplete = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleNavigationClick = () => {
    setIsMobileMenuOpen(false);
  };

  const focusNextItem = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < navItemRefs.current.length) {
      navItemRefs.current[nextIndex]?.focus();
    }
  };

  const focusPreviousItem = (currentIndex: number) => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      navItemRefs.current[prevIndex]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNextItem(index);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusPreviousItem(index);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background pl-4 pr-2 md:hidden">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="bg-accent px-1 text-accent-foreground"
          >
            &gt;_
          </span>
          webdevhub
        </Link>
        <div className="flex items-center">
          {!hideSearch && (
            <>
              <button
                onClick={() => setIsSearchOpen((open) => !open)}
                className={cn(
                  ICON_BUTTON,
                  isSearchOpen && 'text-accent'
                )}
                aria-expanded={isSearchOpen}
                aria-label="Search resources"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
              <FilterButton />
            </>
          )}
          <Link
            href="/bookmarks"
            className={cn(
              ICON_BUTTON,
              pathname === '/bookmarks' && 'text-accent'
            )}
            aria-label="View bookmarks"
          >
            <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            onClick={toggleTheme}
            className={ICON_BUTTON}
            aria-label="Switch between light and dark mode"
          >
            <Sun
              className="hidden dark:block h-4 w-4"
              aria-hidden="true"
            />
            <Moon
              className="block dark:hidden h-4 w-4"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={cn(
              ICON_BUTTON,
              isMobileMenuOpen && 'text-accent'
            )}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {!hideSearch && isSearchOpen && (
        <div
          className="fixed top-14 left-0 right-0 z-50 border-b border-border bg-background p-4 md:hidden"
          id="mobile-search"
          role="search"
        >
          <SearchInput
            isMobile={true}
            onSubmit={handleSearchComplete}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsSearchOpen(false);
              }
            }}
          />
        </div>
      )}

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-background p-4 md:hidden transition-[translate] duration-200 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        inert={!isMobileMenuOpen}
      >
        <nav aria-label="Site sections">
          <p
            aria-hidden="true"
            className="px-3 pb-2 text-xs text-muted-foreground"
          >
            {'// ~/webdevhub'}
          </p>
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            <li>
              <MenuLink
                title="Home"
                iconName="mdi:home-outline"
                href="/"
                isActive={pathname === '/'}
                onClick={handleNavigationClick}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                ref={(el) => {
                  navItemRefs.current[0] = el;
                }}
              />
            </li>
            {SECTIONS.map((section, index) => {
              const itemIndex = index + 1;

              return (
                <li key={section.href}>
                  <MenuLink
                    title={section.title}
                    iconName={section.icon}
                    href={section.href}
                    isActive={pathname === section.href}
                    onClick={handleNavigationClick}
                    onKeyDown={(e) => handleKeyDown(e, itemIndex)}
                    ref={(el) => {
                      navItemRefs.current[itemIndex] = el;
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
