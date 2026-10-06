// Covers the bookmarks view: the saved resources grouped by section, narrowed
// by search, re-rendered only when what it shows changes, and cleared only
// once the visitor confirms.
import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
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
import { STORAGE_KEY } from '@/lib/bookmarks-store';
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
    STORAGE_KEY,
    JSON.stringify(SAVED.map((link) => link.id)),
  );
  return render(<BookmarksView />, { wrapper });
};

describe('listing', () => {
  it('groups the saved resources under their sections', async () => {
    renderSaved();

    for (const [index, link] of SAVED.entries()) {
      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: link.title,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: SECTIONS[index].title,
        }),
      ).toBeInTheDocument();
    }
  });
});

describe('searching', () => {
  it('reports a search that matches no bookmark', async () => {
    const user = userEvent.setup();
    renderSaved();
    await screen.findByRole('heading', {
      level: 3,
      name: SAVED[0].title,
    });

    await user.type(searchBox(), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"'),
      ).toBeInTheDocument(),
    );
  });

  it('leaves the cards on screen alone while a keystroke is pending', async () => {
    // The bookmarks are filtered on the deferred query and each grid is
    // memoised, so a keystroke's own render must stop before the cards.
    const user = userEvent.setup();
    renderSaved();
    await screen.findByRole('heading', {
      level: 3,
      name: SAVED[0].title,
    });
    vi.mocked(ResourceCard).mockClear();

    // Matches nothing, so any card render is one the keystroke caused.
    await user.type(searchBox(), '¶');

    await waitFor(() =>
      expect(
        screen.getByText('No bookmarks found for "¶"'),
      ).toBeInTheDocument(),
    );
    expect(ResourceCard).not.toHaveBeenCalled();
  });
});

describe('clearing', () => {
  const savedIds = () => SAVED.map((link) => link.id);
  const stored = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
  const confirmation = () =>
    screen.getByRole('alertdialog', { name: 'Clear All Bookmarks' });

  it('asks first, and Cancel keeps every bookmark', async () => {
    const user = userEvent.setup();
    renderSaved();

    // A closed dialog is in the DOM but hidden, so no role query finds it.
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    await user.click(
      await screen.findByRole('button', {
        name: 'Clear all bookmarks',
      }),
    );

    expect(confirmation()).toHaveAccessibleDescription(
      'Are you sure you want to clear all your bookmarks? This action cannot be undone.',
    );
    await user.click(
      within(confirmation()).getByRole('button', { name: 'Cancel' }),
    );

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      SAVED.length,
    );
    expect(stored()).toEqual(savedIds());
  });

  it('removes every bookmark once confirmed', async () => {
    const user = userEvent.setup();
    renderSaved();

    await user.click(
      await screen.findByRole('button', {
        name: 'Clear all bookmarks',
      }),
    );
    // A string name matches the whole name, so not "Clear all bookmarks".
    await user.click(
      within(confirmation()).getByRole('button', {
        name: 'Clear All',
      }),
    );

    expect(
      await screen.findByText("You haven't added any bookmarks yet."),
    ).toBeInTheDocument();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Clear all bookmarks' }),
    ).not.toBeInTheDocument();
    expect(stored()).toEqual([]);
  });
});
