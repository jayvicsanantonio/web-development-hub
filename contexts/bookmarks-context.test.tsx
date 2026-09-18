// Covers the saved list: what is stored, how it is read back, and how each
// saved href resolves to the resource the dataset currently holds for it.
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { BookmarksProvider, useBookmarks } from './bookmarks-context';
import { ALL_RESOURCES } from '@/constants/sections';

const LOCAL_STORAGE_KEY = 'web-dev-hub-bookmarks';

const [first, second] = ALL_RESOURCES;

const mount = async () => {
  const view = renderHook(() => useBookmarks(), {
    wrapper: BookmarksProvider,
  });
  await waitFor(() => expect(view.result.current.isLoading).toBe(false));
  return view;
};

const stored = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]');

describe('BookmarksProvider', () => {
  it('starts empty and finishes loading', async () => {
    const { result } = await mount();
    expect(result.current.bookmarks).toEqual([]);
  });

  it('adds a bookmark and reports it as bookmarked', async () => {
    const { result } = await mount();

    act(() => result.current.addBookmark(first.href));

    expect(result.current.bookmarks).toHaveLength(1);
    expect(result.current.isBookmarked(first.href)).toBe(true);
    expect(result.current.isBookmarked(second.href)).toBe(false);
  });

  it('resolves a saved href to the full resource, section included', async () => {
    const { result } = await mount();

    act(() => result.current.addBookmark(first.href));

    expect(result.current.bookmarks[0]).toEqual(first);
  });

  it('ignores a second add of the same href', async () => {
    const { result } = await mount();

    act(() => result.current.addBookmark(first.href));
    act(() => result.current.addBookmark(first.href));

    expect(result.current.bookmarks).toHaveLength(1);
  });

  it('removes by href', async () => {
    const { result } = await mount();

    act(() => result.current.addBookmark(first.href));
    act(() => result.current.addBookmark(second.href));
    act(() => result.current.removeBookmark(first.href));

    expect(result.current.bookmarks.map((b) => b.href)).toEqual([
      second.href,
    ]);
  });

  it('clears everything', async () => {
    const { result } = await mount();
    act(() => result.current.addBookmark(first.href));
    act(() => result.current.clearBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });
});

describe('storage', () => {
  it('stores only the hrefs', async () => {
    // Every other field is resolved from the dataset, so storing it would
    // freeze a copy that goes stale when the entry is edited.
    const { result } = await mount();
    act(() => result.current.addBookmark(first.href));

    await waitFor(() => expect(stored()).toEqual([first.href]));
  });

  it('survives a reload', async () => {
    // The whole feature is localStorage: if the round trip breaks, bookmarks
    // silently reset on every visit.
    const view = await mount();
    act(() => view.result.current.addBookmark(first.href));
    await waitFor(() => expect(stored()).toHaveLength(1));
    view.unmount();

    const reloaded = await mount();
    expect(reloaded.result.current.bookmarks).toEqual([first]);
  });

  it('reads entries stored as whole resource objects', async () => {
    // Both shapes exist in visitors' storage. The stale title here must not
    // survive: the dataset's current entry is what renders.
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([
        {
          title: 'An old title',
          href: first.href,
          description: 'An old description.',
          section: 'Other',
        },
      ])
    );

    const { result } = await mount();

    expect(result.current.bookmarks).toEqual([first]);
  });

  it('drops hrefs the dataset no longer has', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(['https://gone.example/', first.href])
    );

    const { result } = await mount();

    expect(result.current.bookmarks).toEqual([first]);
  });

  it('discards malformed entries rather than crashing on load', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([first.href, { title: 'no href' }, null, 42])
    );

    const { result } = await mount();

    expect(result.current.bookmarks).toEqual([first]);
  });

  it('recovers from unparseable storage, and says so', async () => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    localStorage.setItem(LOCAL_STORAGE_KEY, '{not json');

    const { result } = await mount();

    expect(result.current.bookmarks).toEqual([]);
    expect(error).toHaveBeenCalledWith(
      'Error loading bookmarks:',
      expect.any(SyntaxError)
    );
  });
});
