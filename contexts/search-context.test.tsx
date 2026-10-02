// Covers what the provider is responsible for: the query, the tag selection
// and the filter panel. Filtering itself belongs to lib/utils/search.ts, which
// each view calls on its own list.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { startTransition, type ReactNode } from 'react';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import { SearchProvider, useSearch } from './search-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SearchProvider>{children}</SearchProvider>
);

const mount = () => renderHook(() => useSearch(), { wrapper });

beforeEach(() => {
  pathname.current = '/';
});

describe('the query', () => {
  it('starts empty', () => {
    const { result } = mount();
    expect(result.current.searchQuery).toBe('');
    expect(result.current.deferredQuery).toBe('');
  });

  it('records what was typed and settles the deferred copy', async () => {
    // Views filter on the deferred query so typing stays responsive; the input
    // itself stays bound to the live one.
    const { result } = mount();
    act(() => result.current.setSearchQuery('react'));

    expect(result.current.searchQuery).toBe('react');
    await waitFor(() =>
      expect(result.current.deferredQuery).toBe('react')
    );
  });

  it('clears on request', () => {
    const { result } = mount();
    act(() => result.current.setSearchQuery('react'));
    act(() => result.current.clearSearch());

    expect(result.current.searchQuery).toBe('');
  });

  it('clears before the next page renders, so no page shows the last one’s query', async () => {
    // Next.js navigates inside a transition, so the route change renders as
    // one. Every render of the new page must already see an empty query.
    const seen: { pathname: string; query: string; deferred: string }[] =
      [];
    const { result, rerender } = renderHook(
      () => {
        const search = useSearch();
        seen.push({
          pathname: pathname.current,
          query: search.searchQuery,
          deferred: search.deferredQuery,
        });
        return search;
      },
      { wrapper }
    );
    act(() => result.current.setSearchQuery('react'));
    await waitFor(() =>
      expect(result.current.deferredQuery).toBe('react')
    );

    pathname.current = '/bookmarks';
    act(() => startTransition(() => rerender()));

    const onNewPage = seen.filter(
      (render) => render.pathname === '/bookmarks'
    );
    expect(onNewPage.length).toBeGreaterThan(0);
    for (const render of onNewPage) {
      expect(render).toEqual({
        pathname: '/bookmarks',
        query: '',
        deferred: '',
      });
    }
  });

  it('keeps the selected tags across pages', () => {
    const { result, rerender } = mount();
    act(() => result.current.toggleTag('free'));

    pathname.current = '/bookmarks';
    rerender();

    expect(result.current.selectedTags).toEqual(['free']);
  });
});

describe('tags', () => {
  it('starts with none selected', () => {
    expect(mount().result.current.selectedTags).toEqual([]);
  });

  it('toggles a tag on and back off', () => {
    const { result } = mount();

    act(() => result.current.toggleTag('free'));
    expect(result.current.selectedTags).toEqual(['free']);

    act(() => result.current.toggleTag('free'));
    expect(result.current.selectedTags).toEqual([]);
  });

  it('holds more than one selection and clears them together', () => {
    const { result } = mount();

    act(() => result.current.toggleTag('free'));
    act(() => result.current.toggleTag('react'));
    expect(result.current.selectedTags).toEqual(['free', 'react']);

    act(() => result.current.clearFilters());
    expect(result.current.selectedTags).toEqual([]);
  });
});

describe('the filter panel', () => {
  it('toggles open and closed', () => {
    const { result } = mount();
    expect(result.current.isFilterPanelOpen).toBe(false);

    act(() => result.current.toggleFilterPanel());
    expect(result.current.isFilterPanelOpen).toBe(true);

    act(() => result.current.toggleFilterPanel());
    expect(result.current.isFilterPanelOpen).toBe(false);
  });
});

describe('the provider', () => {
  it('throws when used outside it', () => {
    expect(() => renderHook(() => useSearch())).toThrow(
      /within a SearchProvider/
    );
  });
});
