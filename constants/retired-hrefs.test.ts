// Covers the map from old hrefs to the resources that now hold them. A wrong
// entry here sends someone's bookmark to the wrong resource, or nowhere.
import { describe, it, expect } from 'vitest';
import { ALL_RESOURCES } from './sections';
import { RETIRED_HREFS } from './retired-hrefs';

describe('RETIRED_HREFS', () => {
  it('points every old href at a resource that exists', () => {
    const ids = new Set(ALL_RESOURCES.map((r) => r.id));
    const dangling = Object.entries(RETIRED_HREFS).filter(
      ([, id]) => !ids.has(id)
    );
    expect(dangling).toEqual([]);
  });

  it('lists no href a resource still has', () => {
    // A current href resolves directly, so an entry for one is either dead
    // weight or, pointing elsewhere, a second answer for the same href.
    const current = new Set(ALL_RESOURCES.map((r) => r.href));
    const live = Object.keys(RETIRED_HREFS).filter((href) =>
      current.has(href)
    );
    expect(live).toEqual([]);
  });

  it('keys on absolute URLs', () => {
    for (const href of Object.keys(RETIRED_HREFS)) {
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});
