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
import { sectionNumber } from '@/lib/utils/navigation';

/**
 * One row of the mobile menu: the page's number in the index, its icon and
 * its title, as a link.
 */
function MenuLink({
  title,
  number,
  iconName,
  href,
  isActive,
  onClick,
  onKeyDown,
  ref,
}: {
  title: string;
  number: string;
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
      className="flex w-full items-center gap-4 border-b border-border py-4"
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          'w-6 font-mono text-xs',
          isActive ? 'text-accent' : 'text-muted-foreground'
        )}
      >
        {number}
      </span>
      <Icon
        icon={iconName}
        className="h-5 w-5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <span
        className={cn(
          'font-serif text-[1.75rem] leading-tight',
          isActive &&
            'underline decoration-accent decoration-2 underline-offset-[6px]'
        )}
      >
        {title}
      </span>
    </Link>
  );
}

const barButtonClassName =
  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm';

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
      <header
        aria-label="Mobile site header"
        className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 border-b border-foreground bg-background px-4 md:hidden"
      >
        <Link
          href="/"
          className="min-w-0 truncate font-serif text-[1.4rem] leading-none tracking-tight"
        >
          {/* The full name leaves no room for the five buttons beside it on a
              phone, so the narrowest screens get the short one. */}
          <span className="sm:hidden">Web Dev Hub</span>
          <span className="hidden sm:inline">Web Development Hub</span>
        </Link>
        <div className="flex shrink-0 items-center gap-0.5">
          {!hideSearch && (
            <>
              <button
                onClick={() => setIsSearchOpen((open) => !open)}
                className={barButtonClassName}
                aria-expanded={isSearchOpen}
                aria-label="Search resources"
              >
                <Search
                  className="h-5 w-5 text-foreground"
                  aria-hidden="true"
                />
              </button>
              <FilterButton />
            </>
          )}
          <Link
            href="/bookmarks"
            className={barButtonClassName}
            aria-label="View bookmarks"
            aria-current={pathname === '/bookmarks' ? 'page' : undefined}
          >
            <BookmarkIcon
              className={cn(
                'h-5 w-5',
                pathname === '/bookmarks'
                  ? 'fill-accent text-accent'
                  : 'text-foreground'
              )}
              aria-hidden="true"
            />
          </Link>
          <button
            onClick={toggleTheme}
            className={barButtonClassName}
            aria-label="Switch between light and dark mode"
          >
            <Sun
              className="hidden dark:block h-5 w-5 text-foreground"
              aria-hidden="true"
            />
            <Moon
              className="block dark:hidden h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={barButtonClassName}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <Menu
              className="h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {!hideSearch && isSearchOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-50 border-b border-foreground bg-background p-4 md:hidden"
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
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 overflow-y-auto bg-background px-5 pb-8 md:hidden transition-[translate] duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        inert={!isMobileMenuOpen}
      >
        <nav aria-label="Site sections">
          <p className="eyebrow pt-6 pb-2 text-muted-foreground">
            Contents
          </p>
          <ul className="m-0 flex list-none flex-col p-0">
            <li>
              <MenuLink
                title="Home"
                number="—"
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
                    number={sectionNumber(section.title)}
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
