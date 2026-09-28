// The saved bookmarks, kept in localStorage and shared by every open tab. Each
// entry is a resource id or, for a bookmark saved before resources had ids
// whose resource can no longer be found, the href it was saved under. Nothing
// is dropped for being unrecognised: such a bookmark stays stored without
// being shown, and returns once constants/retired-hrefs.ts maps its href.
import { ALL_RESOURCES } from '@/constants/sections';
import { RETIRED_HREFS } from '@/constants/retired-hrefs';

export const STORAGE_KEY = 'web-dev-hub-bookmarks:v2';

// Where earlier versions kept bookmarks, as hrefs or whole resource objects.
// Read to migrate while STORAGE_KEY is unset, and never written, so a build
// that still reads it finds it as it left it.
export const LEGACY_STORAGE_KEY = 'web-dev-hub-bookmarks';

const IDS = new Set(ALL_RESOURCES.map((resource) => resource.id));
const ID_BY_HREF = new Map(
  ALL_RESOURCES.map((resource) => [resource.href, resource.id]),
);
// A Map rather than indexing the object, so an entry such as 'constructor'
// cannot resolve to something off Object.prototype.
const ID_BY_RETIRED_HREF = new Map(Object.entries(RETIRED_HREFS));

/** The id of the resource an entry stands for, or null if none does. */
export function resolveEntry(entry: string): string | null {
  if (IDS.has(entry)) return entry;
  return (
    ID_BY_HREF.get(entry) ?? ID_BY_RETIRED_HREF.get(entry) ?? null
  );
}

/**
 * The entries in a parsed storage value: ids where the dataset has the
 * resource, the stored href where it does not, one per resource, in saved
 * order. Stored entries may be strings or objects carrying an href, since
 * both shapes exist in visitors' storage; anything else is discarded.
 */
export function parseEntries(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const entries: string[] = [];
  for (const item of value) {
    const stored =
      typeof item === 'string'
        ? item
        : (item as { href?: unknown } | null)?.href;
    if (typeof stored !== 'string' || stored === '') continue;

    const entry = resolveEntry(stored) ?? stored;
    if (!entries.includes(entry)) entries.push(entry);
  }
  return entries;
}

/**
 * What storage holds now, or null when it cannot be read at all (private
 * browsing and blocked-storage settings throw on access).
 */
function readStorage(): string[] | null {
  let raw: string | null;
  try {
    raw =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === null) return [];

  try {
    return parseEntries(JSON.parse(raw));
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
}

const EMPTY: string[] = [];
const listeners = new Set<() => void>();

// The last value read or written. It stands in for storage when storage
// cannot be read, so bookmarks still work for the visit.
let cache: string[] | null = null;

/** The current entries, the same array until they change. */
export function getSnapshot(): string[] {
  if (cache === null) cache = readStorage() ?? [];
  return cache;
}

/** The prerendered page has no storage, so it renders no bookmarks. */
export function getServerSnapshot(): string[] {
  return EMPTY;
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  // Fired in every other tab of this origin when one changes storage. A null
  // key means that tab cleared all of storage.
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === STORAGE_KEY ||
      event.key === LEGACY_STORAGE_KEY
    ) {
      cache = null;
      onChange();
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
    // With no one listening, nothing hears about changes from other tabs, so
    // the next reader starts again from storage.
    if (listeners.size === 0) cache = null;
  };
}

/**
 * Applies a change to the entries and saves the result. The change applies
 * to what storage holds now rather than to this tab's copy, so it cannot
 * overwrite what another tab saved in the meantime.
 */
export function updateEntries(
  change: (entries: string[]) => string[],
): void {
  const next = change(readStorage() ?? getSnapshot());
  cache = next;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error('Failed to save bookmarks to localStorage:', error);
  }

  listeners.forEach((listener) => listener());
}
