// Covers the tags the panel offers. The list used to be hand-written, so tags
// the dataset had gained were not filterable at all.
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { TagFilterPanel } from './tag-filter-panel';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { ALL_TAGS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const renderPanel = () =>
  render(<TagFilterPanel isOpen onClose={vi.fn()} />, { wrapper });

describe('the tags on offer', () => {
  it('offers every tag the dataset uses', () => {
    renderPanel();

    for (const tag of ALL_TAGS) {
      expect(
        screen.getAllByText(tag.replaceAll('-', ' ')).length,
        `${tag} is missing from the panel`
      ).toBeGreaterThan(0);
    }
  });

  it('lists each tag once', () => {
    // Featured tags are drawn from the same list, so they must not also appear
    // under "All Tags".
    renderPanel();

    const buttons = screen
      .getAllByRole('button')
      .map((button) => button.textContent?.trim())
      .filter((label) => label && label !== 'Clear All');

    expect(new Set(buttons).size).toBe(buttons.length);
  });

  it('counts the tags it offers', () => {
    renderPanel();
    expect(
      screen.getByText(`0 of ${ALL_TAGS.length} tags selected`)
    ).toBeInTheDocument();
  });
});
