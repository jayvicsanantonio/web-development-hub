// Covers the bookmarks view: the saved resources grouped by section, narrowed
// by search, and re-rendered only when what it shows changes.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/bookmarks',
}));

// Records each card render while still rendering the real card.
vi.mock('@/components/ui/resource-card', { spy: true });

import ResourceCard from '@/components/ui/resource-card';
import { BookmarksView } from './bookmarks-view';
import { SearchInput } from '@/components/ui/search-input';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

// One resource from each of the first two sections.
const SAVED = [SECTIONS[0].links[0], SECTIONS[1].links[0]];

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

    await user.type(searchBox(), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"')
      ).toBeInTheDocument()
    );
  });

  it('leaves the cards on screen alone while a keystroke is pending', async () => {
    // The bookmarks are filtered on the deferred query and each grid is
    // memoised, so a keystroke's own render must stop before the cards.
    const user = userEvent.setup();
    renderSaved();
    await screen.findByRole('heading', { level: 3, name: SAVED[0].title });
    vi.mocked(ResourceCard).mockClear();

    // Matches nothing, so any card render is one the keystroke caused.
    await user.type(searchBox(), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"')
      ).toBeInTheDocument()
    );
    expect(ResourceCard).not.toHaveBeenCalled();
  });
});
