import { describe, it, expect } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  BookmarksProvider,
  useBookmarks,
  type Resource,
} from './bookmarks-context';

const LOCAL_STORAGE_KEY = 'web-dev-hub-bookmarks';

const resource = (over: Partial<Resource> = {}): Resource =>
  ({
    title: 'MDN Web Docs',
    href: 'https://developer.mozilla.org/',
    description: 'Reference documentation for the web platform.',
    section: 'Learning Resources',
    ...over,
  }) as Resource;

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
    const r = resource();

    act(() => result.current.addBookmark(r));

    expect(result.current.bookmarks).toHaveLength(1);
    expect(result.current.isBookmarked(r.href)).toBe(true);
    expect(result.current.isBookmarked('https://example.com/')).toBe(
      false
    );
  });

  it('ignores a second add of the same href', async () => {
    const { result } = await mount();
    const r = resource();

    act(() => result.current.addBookmark(r));
    act(() =>
      result.current.addBookmark(resource({ title: 'Renamed' }))
    );

    expect(result.current.bookmarks).toHaveLength(1);
  });

  it('removes by href', async () => {
    const { result } = await mount();
    const keep = resource({ href: 'https://keep.example/' });

    act(() => result.current.addBookmark(resource()));
    act(() => result.current.addBookmark(keep));
    act(() => result.current.removeBookmark(resource().href));

    expect(result.current.bookmarks.map((b) => b.href)).toEqual([
      keep.href,
    ]);
  });

  it('clears everything', async () => {
    const { result } = await mount();
    act(() => result.current.addBookmark(resource()));
    act(() => result.current.clearBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it('survives a reload', async () => {
    // The whole feature is localStorage: if the round trip breaks, bookmarks
    // silently reset on every visit.
    const first = await mount();
    act(() => first.result.current.addBookmark(resource()));
    await waitFor(() => expect(stored()).toHaveLength(1));
    first.unmount();

    const second = await mount();
    expect(second.result.current.bookmarks.map((b) => b.href)).toEqual([
      resource().href,
    ]);
  });

  it('discards malformed entries rather than crashing on load', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([resource(), { title: 'no href' }, null, 42])
    );

    const { result } = await mount();

    expect(result.current.bookmarks.map((b) => b.href)).toEqual([
      resource().href,
    ]);
  });

  it('recovers from unparseable storage', async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, '{not json');
    const { result } = await mount();
    expect(result.current.bookmarks).toEqual([]);
  });

  it('does not persist derived icon names', async () => {
    // iconName is looked up from the title on load, so writing it would put a
    // second copy of a derived value into storage where it can go stale.
    const { result } = await mount();
    act(() => result.current.addBookmark(resource()));
    await waitFor(() => expect(stored()).toHaveLength(1));
    expect(stored()[0]).not.toHaveProperty('iconName');
  });
});
