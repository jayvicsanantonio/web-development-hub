// Covers how a stored entry is recognised: by id, by the href a resource has
// now, or by one it used to have.
import { describe, it, expect } from 'vitest';
import { ALL_RESOURCES } from '@/constants/sections';
import { parseEntries, resolveEntry } from './bookmarks-store';

const [first, second] = ALL_RESOURCES;

describe('resolveEntry', () => {
  it('recognises an id', () => {
    expect(resolveEntry(first.id)).toBe(first.id);
  });

  it('resolves a current href to its resource', () => {
    expect(resolveEntry(first.href)).toBe(first.id);
  });

  it('resolves an href the resource has since moved from', () => {
    expect(resolveEntry('https://vitejs.dev/')).toBe('vite');
  });

  it('returns null for anything else', () => {
    expect(resolveEntry('https://gone.example/')).toBeNull();
    // Names on Object.prototype must not resolve through the retired map.
    expect(resolveEntry('constructor')).toBeNull();
    expect(resolveEntry('__proto__')).toBeNull();
  });
});

describe('parseEntries', () => {
  it('reads nothing from a value that is not a list', () => {
    expect(parseEntries({ href: first.href })).toEqual([]);
    expect(parseEntries(null)).toEqual([]);
  });

  it('turns every recognised entry into its id, in order', () => {
    expect(
      parseEntries([second.href, { href: first.href }, first.id]),
    ).toEqual([second.id, first.id]);
  });

  it('keeps an entry it cannot resolve as it was stored', () => {
    expect(parseEntries(['https://gone.example/', first.id])).toEqual(
      ['https://gone.example/', first.id],
    );
  });

  it('discards entries with no string to go on', () => {
    expect(
      parseEntries([null, 42, '', { title: 'no href' }, first.id]),
    ).toEqual([first.id]);
  });
});
