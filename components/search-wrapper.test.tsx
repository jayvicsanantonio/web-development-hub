// Covers the home page's search view: the page's own content until a query is
// typed, then the whole catalogue's matches, re-rendered only as they change.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Records each card render while still rendering the real card.
vi.mock('@/components/ui/resource-card', { spy: true });

import ResourceCard from '@/components/ui/resource-card';
import { SearchWrapper } from './search-wrapper';
import { SearchInput } from '@/components/ui/search-input';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>
      <SearchInput />
      {children}
    </SearchProvider>
  </BookmarksProvider>
);

const searchBox = () =>
  screen.getByRole('searchbox', { name: 'Search resources' });

const renderHome = () =>
  render(
    <SearchWrapper>
      <p>home content</p>
    </SearchWrapper>,
    { wrapper },
  );

describe('before anything is typed', () => {
  it('shows the page its own content', () => {
    renderHome();
    expect(screen.getByText('home content')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Search Results' }),
    ).not.toBeInTheDocument();
  });
});

describe('searching', () => {
  it('replaces the content with the matches, counted for the query', async () => {
    const user = userEvent.setup();
    renderHome();

    const target = SECTIONS[0].links[0].title;
    await user.type(searchBox(), target);

    await waitFor(() =>
      expect(
        screen.getByText(new RegExp(`results? for "${target}"`)),
      ).toBeInTheDocument(),
    );
    expect(
      screen.queryByText('home content'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: target }),
    ).toBeInTheDocument();
  });

  it('leaves the results on screen alone while a keystroke is pending', async () => {
    // The results are filtered on the deferred query and each grid is
    // memoised, so a keystroke's own render must stop before the cards.
    const user = userEvent.setup();
    renderHome();

    await user.type(searchBox(), 'react');
    await waitFor(() =>
      expect(
        screen.getByText(/results? for "react"/),
      ).toBeInTheDocument(),
    );
    vi.mocked(ResourceCard).mockClear();

    // Matches nothing, so any card render is one the keystroke caused.
    await user.type(searchBox(), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No results found for "react¶"'),
      ).toBeInTheDocument(),
    );
    expect(ResourceCard).not.toHaveBeenCalled();
  });
});
