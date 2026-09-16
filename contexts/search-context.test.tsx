// Covers what the provider is responsible for: the query, the tag selection
// and the filter panel. Filtering itself belongs to lib/utils/search.ts, which
// each view calls on its own list.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';

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
