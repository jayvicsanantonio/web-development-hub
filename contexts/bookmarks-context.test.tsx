// Covers the saved list: what is stored and under which key, how older saves
// are read back, how each entry resolves to the resource the dataset holds
// for it now, and what happens when another tab changes the list.
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BookmarksProvider, useBookmarks } from './bookmarks-context';
import { ALL_RESOURCES } from '@/constants/sections';
import {
  LEGACY_STORAGE_KEY,
  STORAGE_KEY,
} from '@/lib/bookmarks-store';

const [first, second] = ALL_RESOURCES;

const mount = () =>
  renderHook(() => useBookmarks(), { wrapper: BookmarksProvider });

const stored = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

// What another tab does: write storage directly, then (in a real browser)
// this tab receives a storage event for it.
const writeFromAnotherTab = (value: unknown) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
const storageEvent = (key: string | null) =>
  act(() => {
    window.dispatchEvent(new StorageEvent('storage', { key }));
  });

describe('BookmarksProvider', () => {
  it('starts empty', () => {
    const { result } = mount();
    expect(result.current.bookmarks).toEqual([]);
  });

  it('adds a bookmark and reports it as bookmarked', () => {
    const { result } = mount();

    act(() => result.current.addBookmark(first.id));

    expect(result.current.bookmarks).toHaveLength(1);
    expect(result.current.isBookmarked(first.id)).toBe(true);
    expect(result.current.isBookmarked(second.id)).toBe(false);
  });

  it('resolves a saved id to the full resource, section included', () => {
    const { result } = mount();

    act(() => result.current.addBookmark(first.id));

    expect(result.current.bookmarks[0]).toEqual(first);
  });

  it('ignores a second add of the same resource', () => {
    const { result } = mount();

    act(() => result.current.addBookmark(first.id));
    act(() => result.current.addBookmark(first.id));

    expect(result.current.bookmarks).toHaveLength(1);
  });

  it('removes by id', () => {
    const { result } = mount();

    act(() => result.current.addBookmark(first.id));
    act(() => result.current.addBookmark(second.id));
    act(() => result.current.removeBookmark(first.id));

    expect(result.current.bookmarks.map((b) => b.id)).toEqual([
      second.id,
    ]);
  });

  it('clears everything, entries it cannot show included', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify(['https://gone.example/', first.href]),
    );
    const { result } = mount();

    act(() => result.current.clearBookmarks());

    expect(result.current.bookmarks).toEqual([]);
    expect(stored()).toEqual([]);
  });
});

describe('storage', () => {
  it('stores only the ids', () => {
    // Every other field is resolved from the dataset, so storing it would
    // freeze a copy that goes stale when the entry is edited. Hrefs change
    // too: the link checker exists to prompt it.
    const { result } = mount();
    act(() => result.current.addBookmark(first.id));

    expect(stored()).toEqual([first.id]);
  });

  it('survives a reload', () => {
    // The whole feature is localStorage: if the round trip breaks, bookmarks
    // silently reset on every visit.
    const view = mount();
    act(() => view.result.current.addBookmark(first.id));
    view.unmount();

    const reloaded = mount();
    expect(reloaded.result.current.bookmarks).toEqual([first]);
  });

  it('never writes the key earlier versions read', () => {
    // A build still reading the old key, such as one rolled back to, finds
    // it exactly as it left it.
    const legacy = JSON.stringify([first.href]);
    localStorage.setItem(LEGACY_STORAGE_KEY, legacy);
    const { result } = mount();

    act(() => result.current.addBookmark(second.id));

    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBe(legacy);
    expect(stored()).toEqual([first.id, second.id]);
  });

  it('prefers the current key once it exists', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify([first.href]),
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify([second.id]));

    const { result } = mount();

    expect(result.current.bookmarks).toEqual([second]);
  });
});

describe('bookmarks saved before resources had ids', () => {
  it('reads the hrefs earlier versions saved', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify([first.href, second.href]),
    );

    const { result } = mount();

    expect(result.current.bookmarks).toEqual([first, second]);
  });

  it('reads entries stored as whole resource objects', () => {
    // Both shapes exist in visitors' storage. The stale title here must not
    // survive: the dataset's current entry is what renders.
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify([
        {
          title: 'An old title',
          href: first.href,
          description: 'An old description.',
          section: 'Other',
        },
      ]),
    );

    const { result } = mount();

    expect(result.current.bookmarks).toEqual([first]);
  });

  it('finds a resource whose href has since changed', () => {
    // Saved while Claude Docs lived at docs.claude.com. Before
    // RETIRED_HREFS, loading this deleted the bookmark for good.
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify(['https://docs.claude.com/']),
    );

    const { result } = mount();

    expect(result.current.bookmarks.map((b) => b.id)).toEqual([
      'claude-docs',
    ]);
  });

  it('keeps an entry it cannot resolve, without showing it', () => {
    // A retired resource's bookmark stays stored, so mapping its href in
    // RETIRED_HREFS later brings it back.
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify(['https://gone.example/', first.href]),
    );
    const { result } = mount();

    expect(result.current.bookmarks).toEqual([first]);

    act(() => result.current.addBookmark(second.id));

    expect(stored()).toEqual([
      'https://gone.example/',
      first.id,
      second.id,
    ]);
  });

  it('discards malformed entries rather than crashing on load', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify([first.href, { title: 'no href' }, null, 42]),
    );

    const { result } = mount();

    expect(result.current.bookmarks).toEqual([first]);
  });

  it('recovers from unparseable storage, and says so', () => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    localStorage.setItem(LEGACY_STORAGE_KEY, '{not json');

    const { result } = mount();

    expect(result.current.bookmarks).toEqual([]);
    expect(error).toHaveBeenCalledWith(
      'Error loading bookmarks:',
      expect.any(SyntaxError),
    );
  });
});

describe('other tabs', () => {
  it('keeps what another tab saved when this one saves', () => {
    // This tab loaded an empty list; another tab has since saved a bookmark
    // and its storage event has not arrived. Writing this tab's copy back
    // used to erase the other tab's bookmark.
    const { result } = mount();
    writeFromAnotherTab([first.id]);

    act(() => result.current.addBookmark(second.id));

    expect(stored()).toEqual([first.id, second.id]);
    expect(result.current.bookmarks).toEqual([first, second]);
  });

  it('shows what another tab saved without a reload', () => {
    const { result } = mount();

    writeFromAnotherTab([first.id]);
    storageEvent(STORAGE_KEY);

    expect(result.current.isBookmarked(first.id)).toBe(true);
  });

  it('follows another tab clearing all of storage', () => {
    writeFromAnotherTab([first.id]);
    const { result } = mount();
    expect(result.current.bookmarks).toEqual([first]);

    localStorage.clear();
    storageEvent(null);

    expect(result.current.bookmarks).toEqual([]);
  });
});

describe('blocked storage', () => {
  it('still bookmarks for the visit, and says it could not save', () => {
    // Private browsing and blocked-storage settings throw on any access.
    const denied = () => {
      throw new DOMException('Access denied', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(denied);
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = mount();
    act(() => result.current.addBookmark(first.id));
    act(() => result.current.addBookmark(second.id));

    expect(result.current.bookmarks).toEqual([first, second]);
    expect(error).toHaveBeenCalledWith(
      'Failed to save bookmarks to localStorage:',
      expect.any(DOMException),
    );
  });
});
