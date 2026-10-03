// Covers what the nav lists for the page being viewed: the side rail follows
// the sections the page actually renders, and the mobile menu always links
// every section page.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import VerticalNavigation from './vertical-navigation';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { STORAGE_KEY } from '@/lib/bookmarks-store';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const renderNav = () => render(<VerticalNavigation />, { wrapper });

const railSections = () =>
  within(
    screen.getByRole('navigation', { name: 'Page sections navigation' })
  )
    .queryAllByRole('button', { name: /^Navigate to .* section$/ })
    .map((button) =>
      button
        .getAttribute('aria-label')!
        .replace(/^Navigate to (.*) section$/, '$1')
    );

const searchFor = async (query: string) => {
  const user = userEvent.setup();
  await user.type(
    screen.getByRole('searchbox', { name: 'Search resources' }),
    query
  );
};

beforeEach(() => {
  pathname.current = '/';
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    }
  );
  return () => vi.unstubAllGlobals();
});

describe('the side rail on the bookmarks page', () => {
  // One saved resource in each of the first two sections.
  const SAVED = [SECTIONS[0].links[0], SECTIONS[1].links[0]];

  beforeEach(() => {
    pathname.current = '/bookmarks';
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(SAVED.map((resource) => resource.id))
    );
  });

  it('lists the sections the visitor saved into', () => {
    renderNav();

    expect(railSections()).toEqual([
      SECTIONS[0].title,
      SECTIONS[1].title,
    ]);
  });

  it('lists only the sections the search leaves on the page', async () => {
    // A resource in the second section that is not saved: the catalogue has a
    // match in that section, but no saved resource does, so the page renders
    // no section for it.
    const unsaved = SECTIONS[1].links[1];
    renderNav();

    await searchFor(unsaved.title);

    expect(railSections()).toEqual([]);
  });
});

describe('the mobile menu', () => {
  it('links every section page while a search finds nothing', async () => {
    renderNav();

    await searchFor('no resource is called this');

    const menu = document.getElementById('mobile-menu')!;
    for (const section of SECTIONS) {
      expect(
        within(menu).getByRole('link', {
          name: section.title,
          hidden: true,
        })
      ).toHaveAttribute('href', section.href);
    }
  });
});
