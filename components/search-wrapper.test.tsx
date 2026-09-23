// Covers the home page's search view: the page's own content until a query is
// typed, then the whole catalogue's matches, re-rendered only as they change.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Counts card renders while still rendering the real card.
const cardRenders = vi.hoisted(() => ({ count: 0 }));
vi.mock('@/components/ui/resource-card', async (importOriginal) => {
  const { default: ResourceCard } =
    await importOriginal<typeof import('@/components/ui/resource-card')>();
  return {
    default: (props: Parameters<typeof ResourceCard>[0]) => {
      cardRenders.count++;
      return <ResourceCard {...props} />;
    },
  };
});

import { SearchWrapper } from './search-wrapper';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import {
  SearchProvider,
  useSearch,
} from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

function QueryInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <input
      aria-label="query"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>
      <QueryInput />
      {children}
    </SearchProvider>
  </BookmarksProvider>
);

const renderHome = () =>
  render(
    <SearchWrapper>
      <p>home content</p>
    </SearchWrapper>,
    { wrapper }
  );

describe('before anything is typed', () => {
  it('shows the page its own content', () => {
    renderHome();
    expect(screen.getByText('home content')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Search Results' })
    ).not.toBeInTheDocument();
  });
});

describe('searching', () => {
  it('replaces the content with the matches, counted for the query', async () => {
    const user = userEvent.setup();
    renderHome();

    const target = SECTIONS[0].links[0].title;
    await user.type(screen.getByLabelText('query'), target);

    await waitFor(() =>
      expect(
        screen.getByText(new RegExp(`results? for "${target}"`))
      ).toBeInTheDocument()
    );
    expect(screen.queryByText('home content')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: target })
    ).toBeInTheDocument();
  });

  it('leaves the results on screen alone while a keystroke is pending', async () => {
    // The results are filtered on the deferred query. When the keystroke's
    // own render reached the grids, every result re-rendered on every key.
    const user = userEvent.setup();
    renderHome();

    await user.type(screen.getByLabelText('query'), 'react');
    await waitFor(() =>
      expect(screen.getByText(/results? for "react"/)).toBeInTheDocument()
    );
    cardRenders.count = 0;

    // Matches nothing, so any card render is one the keystroke caused.
    await user.type(screen.getByLabelText('query'), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No results found for "react¶"')
      ).toBeInTheDocument()
    );
    expect(cardRenders.count).toBe(0);
  });
});
