// Covers the icon bundle: every icon the site names is in it, so each renders
// from the build rather than as an empty box, and the generator refuses a name
// the installed icon sets do not have.
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './icons';
import bundle from './icon-bundle';
import { buildIconBundle } from '@/scripts/build-icons.mjs';
import { ALL_RESOURCES, SECTIONS } from '@/constants/sections';
import { TAG_ICON_MAP } from '@/lib/utils/tag-icons';

const bundled = new Set(
  bundle.flatMap((set) =>
    [
      ...Object.keys(set.icons),
      ...Object.keys(set.aliases ?? {}),
    ].map((name) => `${set.prefix}:${name}`)
  )
);

describe('the bundle', () => {
  it('holds every icon the dataset names', () => {
    // Read from the dataset itself rather than the generator's scan of the
    // source, so a name the scan missed shows up here.
    const named = [...SECTIONS, ...ALL_RESOURCES].map((entry) => entry.icon);
    expect(named.filter((name) => !bundled.has(name))).toEqual([]);
  });

  it('holds every tag icon', () => {
    const named = Object.values(TAG_ICON_MAP);
    expect(named.filter((name) => !bundled.has(name))).toEqual([]);
  });

  it('renders an icon synchronously, with no request to wait on', () => {
    const { container } = render(<Icon icon={SECTIONS[0].icon} />);
    expect(container.querySelector('svg path')).toBeInTheDocument();
  });
});

describe('the generator', () => {
  it('names every icon it cannot find, rather than skipping it', () => {
    expect(() =>
      buildIconBundle(['mdi:home', 'mdi:no-such-icon', 'no-such-set:x'])
    ).toThrow(/mdi:no-such-icon.*no-such-set:x/);
  });

  it('bundles only the icons it was asked for', () => {
    const [set] = buildIconBundle(['mdi:home']);
    expect(set.prefix).toBe('mdi');
    expect(Object.keys(set.icons)).toEqual(['home']);
  });
});
