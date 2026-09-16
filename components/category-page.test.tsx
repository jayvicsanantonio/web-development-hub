// Covers the body all five category routes share. They were five near-copies
// of this file, differing only in three strings.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/developer-tools',
}));

import { CategoryPage } from './category-page';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import {
  SearchProvider,
  useSearch,
} from '@/contexts/search-context';
import { SECTIONS, sectionByTitle } from '@/constants/sections';

const section = sectionByTitle('Developer Tools');

// A tag some but not all of this section's resources carry, so filtering on it
// has something to remove.
const TAG = section.links
  .flatMap((link) => link.tags)
  .find(
    (tag) =>
      section.links.filter((link) => link.tags.includes(tag)).length <
      section.links.length
  )!;

function SearchControls() {
  const { searchQuery, setSearchQuery, toggleTag } = useSearch();
  return (
    <>
      <input
        aria-label="query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => toggleTag(TAG)}>toggle tag</button>
    </>
  );
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>
      <SearchControls />
      {children}
    </SearchProvider>
  </BookmarksProvider>
);

const renderPage = () =>
  render(<CategoryPage section={section} />, { wrapper });

describe('heading', () => {
  it('takes its title and tagline from the section', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent(section.title);
    expect(
      screen.getByText(section.description)
    ).toBeInTheDocument();
  });
});

describe('listing', () => {
  it('renders every resource in the section when nothing is typed', () => {
    renderPage();
    expect(screen.getAllByRole('link')).toHaveLength(
      section.links.length
    );
  });

  it('shows no result count until a search runs', () => {
    renderPage();
    expect(screen.queryByText(/results for/)).not.toBeInTheDocument();
  });
});

describe('searching', () => {
  it('narrows to the matching resources and counts them', async () => {
    const user = userEvent.setup();
    renderPage();

    const target = section.links[0].title;
    await user.type(screen.getByLabelText('query'), target);

    await waitFor(() =>
      expect(
        screen.getByText(new RegExp(`results? for "${target}"`))
      ).toBeInTheDocument()
    );
    expect(
      screen.getByRole('heading', { level: 3, name: target })
    ).toBeInTheDocument();
  });

  it('scopes results to this section, not the whole catalogue', async () => {
    const user = userEvent.setup();
    renderPage();

    // A resource that exists, but in a different section.
    const other = SECTIONS.find(
      (s) => s.title !== section.title
    )!.links[0].title;

    await user.type(screen.getByLabelText('query'), other);

    // Scoped to this section, so a title from another one finds nothing here.
    await waitFor(() =>
      expect(
        screen.getByText(`No results found for "${other}"`)
      ).toBeInTheDocument()
    );
    expect(
      screen.queryByRole('heading', { level: 3, name: other })
    ).not.toBeInTheDocument();
  });

  it('narrows to resources carrying a selected tag with no query typed', async () => {
    const user = userEvent.setup();
    renderPage();

    const expected = section.links.filter((link) =>
      link.tags.includes(TAG)
    ).length;
    expect(expected).toBeLessThan(section.links.length);
    expect(screen.getAllByRole('link')).toHaveLength(
      section.links.length
    );

    await user.click(
      screen.getByRole('button', { name: 'toggle tag' })
    );

    await waitFor(() =>
      expect(screen.getAllByRole('link')).toHaveLength(expected)
    );
  });

  it('counts what a tag on its own matched, without quoting an empty query', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(
      screen.getByRole('button', { name: 'toggle tag' })
    );

    await waitFor(() =>
      expect(screen.getByText(/^Found \d+ results?$/)).toBeInTheDocument()
    );
  });

  it('reports an empty search plainly', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(
      screen.getByLabelText('query'),
      'zzzz-nothing-matches-zzzz'
    );

    await waitFor(() =>
      expect(
        screen.getByText(/No results found for/)
      ).toBeInTheDocument()
    );
  });
});
