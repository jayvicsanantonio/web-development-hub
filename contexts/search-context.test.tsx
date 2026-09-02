import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { SECTIONS } from '@/constants/sections';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import { BookmarksProvider } from './bookmarks-context';
import { SearchProvider, useSearch } from './search-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const mount = () => renderHook(() => useSearch(), { wrapper });

const firstResource = SECTIONS[0].links[0];

beforeEach(() => {
  pathname.current = '/';
});

describe('SearchProvider', () => {
  it('shows nothing until the user searches or filters', () => {
    // An empty result list has to mean "not searching" here, not "no matches",
    // or every page would render an empty state on load.
    const { result } = mount();
    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchResults).toEqual([]);
  });

  it('matches on title', async () => {
    const { result } = mount();
    act(() => result.current.setSearchQuery(firstResource.title));

    await waitFor(() =>
      expect(
        result.current.searchResults.map((r) => r.title)
      ).toContain(firstResource.title)
    );
  });

  it('matches on description and section as well as title', async () => {
    const { result } = mount();
    act(() => result.current.setSearchQuery(SECTIONS[0].title));

    await waitFor(() =>
      expect(result.current.searchResults.length).toBeGreaterThan(0)
    );
    expect(
      result.current.searchResults.every(
        (r) => r.section === SECTIONS[0].title
      )
    ).toBe(true);
  });

  it('is case insensitive', async () => {
    const { result } = mount();
    act(() =>
      result.current.setSearchQuery(firstResource.title.toUpperCase())
    );

    await waitFor(() =>
      expect(
        result.current.searchResults.map((r) => r.title)
      ).toContain(firstResource.title)
    );
  });

  it('returns an empty list for a query that matches nothing', async () => {
    const { result } = mount();
    act(() =>
      result.current.setSearchQuery('zzzz-no-such-resource-zzzz')
    );
    await waitFor(() =>
      expect(result.current.searchResults).toEqual([])
    );
  });

  it('narrows results to the current category', async () => {
    const { result } = mount();
    act(() => result.current.setCurrentCategory(SECTIONS[1].title));
    act(() => result.current.setSearchQuery('a'));

    await waitFor(() =>
      expect(result.current.searchResults.length).toBeGreaterThan(0)
    );
    expect(
      result.current.searchResults.every(
        (r) => r.section === SECTIONS[1].title
      )
    ).toBe(true);
  });

  it('filters by tag with no query typed', async () => {
    // Selecting a tag on its own has to produce results; otherwise the filter
    // panel does nothing until the user also types something.
    const tag = SECTIONS.flatMap((s) => s.links).find(
      (l) => l.tags?.length
    )!.tags![0];

    const { result } = mount();
    act(() => result.current.toggleTag(tag));

    await waitFor(() =>
      expect(result.current.searchResults.length).toBeGreaterThan(0)
    );
    expect(
      result.current.searchResults.every((r) => r.tags?.includes(tag))
    ).toBe(true);
    expect(result.current.hasSelectedTags).toBe(true);
    expect(result.current.selectedTagCount).toBe(1);
  });

  it('clears the query and its results', async () => {
    const { result } = mount();
    act(() => result.current.setSearchQuery(firstResource.title));
    await waitFor(() =>
      expect(result.current.searchResults.length).toBeGreaterThan(0)
    );

    act(() => result.current.clearSearch());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchResults).toEqual([]);
  });

  it('toggles the filter panel', () => {
    const { result } = mount();
    expect(result.current.isFilterPanelOpen).toBe(false);
    act(() => result.current.toggleFilterPanel());
    expect(result.current.isFilterPanelOpen).toBe(true);
    act(() => result.current.toggleFilterPanel());
    expect(result.current.isFilterPanelOpen).toBe(false);
  });

  it('searches bookmarks rather than the catalogue on /bookmarks', async () => {
    pathname.current = '/bookmarks';
    const { result } = mount();

    // No bookmarks stored, so the bookmarks page has nothing to show even for
    // a query that matches many resources in the full catalogue.
    act(() => result.current.setSearchQuery(firstResource.title));
    await waitFor(() =>
      expect(result.current.searchResults).toEqual([])
    );
  });

  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useSearch())).toThrow(
      /within a SearchProvider/
    );
  });
});
