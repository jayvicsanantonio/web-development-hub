// Covers the bookmarks view: the saved resources grouped by section, narrowed
// by search, and re-rendered only when what it shows changes.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/bookmarks',
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

import { BookmarksView } from './bookmarks-view';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import {
  SearchProvider,
  useSearch,
} from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

// One resource from each of the first two sections.
const SAVED = [SECTIONS[0].links[0], SECTIONS[1].links[0]];

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

const renderSaved = () => {
  localStorage.setItem(
    'web-dev-hub-bookmarks',
    JSON.stringify(SAVED.map((link) => link.href))
  );
  return render(<BookmarksView />, { wrapper });
};

describe('listing', () => {
  it('groups the saved resources under their sections', async () => {
    renderSaved();

    for (const [index, link] of SAVED.entries()) {
      expect(
        await screen.findByRole('heading', { level: 3, name: link.title })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: SECTIONS[index].title,
        })
      ).toBeInTheDocument();
    }
  });
});

describe('searching', () => {
  it('reports a search that matches no bookmark', async () => {
    const user = userEvent.setup();
    renderSaved();
    await screen.findByRole('heading', { level: 3, name: SAVED[0].title });

    await user.type(screen.getByLabelText('query'), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"')
      ).toBeInTheDocument()
    );
  });

  it('leaves the cards on screen alone while a keystroke is pending', async () => {
    // The bookmarks are filtered on the deferred query. When the keystroke's
    // own render reached the grids, every saved card re-rendered on every key.
    const user = userEvent.setup();
    renderSaved();
    await screen.findByRole('heading', { level: 3, name: SAVED[0].title });
    cardRenders.count = 0;

    // Matches nothing, so any card render is one the keystroke caused.
    await user.type(screen.getByLabelText('query'), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"')
      ).toBeInTheDocument()
    );
    expect(cardRenders.count).toBe(0);
  });
});
