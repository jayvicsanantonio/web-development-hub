import { describe, it, expect } from 'vitest';
import { SECTIONS } from './sections';
import {
  determineSection,
  getResourceIcon,
} from '@/lib/data/resource-mappings';

const allResources = SECTIONS.flatMap((section) =>
  section.links.map((link) => ({ ...link, section: section.title }))
);

describe('resource dataset integrity', () => {
  it('has no duplicate hrefs', () => {
    // A resource's href is both its React list key and its bookmark identity,
    // so a duplicate collides in reconciliation and in localStorage. Shipped
    // once, as two entries for https://ai-sdk.dev/.
    const seen = new Map<string, string[]>();
    for (const r of allResources) {
      seen.set(r.href, [...(seen.get(r.href) ?? []), r.title]);
    }
    const duplicates = [...seen.entries()].filter(
      ([, titles]) => titles.length > 1
    );
    expect(duplicates).toEqual([]);
  });

  it('resolves every resource to its own section', () => {
    // determineSection() reads RESOURCE_SECTIONS, a hand-maintained second copy
    // of this list. A title missing from it falls through to 'Other', and the
    // bookmarks page then stores the entry without ever rendering it, which
    // also makes it impossible to un-bookmark. Shipped once, as "Vercel Blog".
    const misfiled = allResources
      .filter((r) => determineSection(r.title) !== r.section)
      .map((r) => ({
        title: r.title,
        expected: r.section,
        actual: determineSection(r.title),
      }));
    expect(misfiled).toEqual([]);
  });

  it('gives every resource a non-placeholder icon', () => {
    const withoutIcon = allResources
      .filter((r) => getResourceIcon(r.title) === 'material-symbols:list')
      .map((r) => r.title);
    expect(withoutIcon).toEqual([]);
  });

  it('has no duplicate titles', () => {
    // Titles are the lookup key into RESOURCE_SECTIONS and ICON_MAP, so two
    // resources sharing one cannot be told apart by either.
    const titles = allResources.map((r) => r.title);
    expect(titles).toHaveLength(new Set(titles).size);
  });

  it('gives every resource the fields the UI reads', () => {
    for (const r of allResources) {
      expect(r.title, `${r.section} entry missing title`).toBeTruthy();
      expect(r.description, `${r.title} missing description`).toBeTruthy();
      expect(r.href, `${r.title} missing href`).toMatch(/^https?:\/\//);
    }
  });
});
