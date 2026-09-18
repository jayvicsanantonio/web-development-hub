// Covers which pages the sitemap offers to crawlers. It is derived from the
// dataset, so a section added there is listed without a second edit here.
import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { SECTIONS } from '@/constants/sections';

const paths = () =>
  sitemap().map((entry) => new URL(entry.url).pathname);

describe('sitemap', () => {
  it('lists the home page and every section page', () => {
    expect(paths()).toEqual(
      expect.arrayContaining(['/', ...SECTIONS.map((s) => s.href)])
    );
  });

  it('lists the legal pages', () => {
    expect(paths()).toEqual(
      expect.arrayContaining(['/privacy-policy', '/terms-of-service'])
    );
  });

  it('leaves out the bookmarks page, which asks not to be indexed', () => {
    // Its content exists only in the visitor's own browser, so its metadata
    // sets robots noindex; listing it here contradicted that.
    expect(paths()).not.toContain('/bookmarks');
  });

  it('lists each page once', () => {
    expect(new Set(paths()).size).toBe(paths().length);
  });
});
