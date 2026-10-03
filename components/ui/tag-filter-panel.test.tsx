// Covers the tags the panel offers, and opening and closing it. The list used
// to be hand-written, so tags the dataset had gained were not filterable at all.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { TagFilterPanel } from './tag-filter-panel';
import { FilterButton } from './filter-button';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { ALL_TAGS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const filterButton = () =>
  screen.getByRole('button', { name: /^Filter resources/ });

// Opened the way a visitor opens it: the panel and the button share the
// SearchProvider's open state.
const renderPanel = async () => {
  const user = userEvent.setup();
  render(
    <>
      <FilterButton />
      <TagFilterPanel />
    </>,
    { wrapper }
  );
  await user.click(filterButton());
  return user;
};

describe('the tags on offer', () => {
  it('offers every tag the dataset uses', async () => {
    await renderPanel();

    for (const tag of ALL_TAGS) {
      expect(
        screen.getAllByText(tag.replaceAll('-', ' ')).length,
        `${tag} is missing from the panel`
      ).toBeGreaterThan(0);
    }
  });

  it('lists each tag once', async () => {
    // Featured tags are drawn from the same list, so they must not also appear
    // under "All Tags".
    await renderPanel();

    const buttons = screen
      .getAllByRole('button')
      .filter((button) => button !== filterButton())
      .map((button) => button.textContent?.trim())
      .filter((label) => label && label !== 'Clear All');

    expect(new Set(buttons).size).toBe(buttons.length);
  });

  it('counts the tags it offers', async () => {
    await renderPanel();
    expect(
      screen.getByText(`0 of ${ALL_TAGS.length} tags selected`)
    ).toBeInTheDocument();
  });
});

describe('opening and closing', () => {
  const panelTitle = () =>
    screen.queryByRole('heading', { name: 'Filter by Tags' });

  it('opens from the filter button and closes from it again', async () => {
    const user = await renderPanel();
    expect(panelTitle()).toBeInTheDocument();
    expect(filterButton()).toHaveAttribute('aria-expanded', 'true');

    await user.click(filterButton());

    expect(panelTitle()).not.toBeInTheDocument();
    expect(filterButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape', async () => {
    const user = await renderPanel();

    await user.keyboard('{Escape}');

    expect(panelTitle()).not.toBeInTheDocument();
  });

  it('closes from its own close button', async () => {
    const user = await renderPanel();

    await user.click(
      screen.getByRole('button', { name: 'Close filter panel' })
    );

    expect(panelTitle()).not.toBeInTheDocument();
  });

  it('closes on a click outside it', async () => {
    const user = await renderPanel();

    await user.click(document.body);

    await waitFor(() => expect(panelTitle()).not.toBeInTheDocument());
  });

  it('stays open while tags are chosen and cleared inside it', async () => {
    // Clear All and the last active filter's remove button both take
    // themselves out of the page as they are clicked.
    const user = await renderPanel();

    await user.click(screen.getByRole('button', { name: /^free$/ }));
    await user.click(screen.getByRole('button', { name: 'Clear All' }));
    await user.click(screen.getByRole('button', { name: /^free$/ }));
    await user.click(
      screen.getByRole('button', { name: 'Remove free filter' })
    );
    // The outside-click check runs on a timer; let it.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(panelTitle()).toBeInTheDocument();
  });
});
