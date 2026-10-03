// Covers which elements the active-section observer watches. The nav that uses
// it stays mounted across routes, so it has to follow the page's sections when
// they are rendered afresh rather than keep watching the ones it started with.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import { useIntersectionObserver } from './use-intersection-observer';

class FakeObserver {
  static instances: FakeObserver[] = [];
  observed: Element[] = [];
  disconnected = false;

  constructor(readonly callback: IntersectionObserverCallback) {
    FakeObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  disconnect() {
    this.disconnected = true;
  }

  unobserve() {}

  takeRecords() {
    return [];
  }
}

const IDS = ['section-one', 'section-two'];

// The nav and the page in one tree: the nav persists, and `page` stands for
// whatever renders the sections, so a new value renders new elements.
function Layout({ ids, page }: { ids: string[]; page: string }) {
  const activeSection = useIntersectionObserver(ids);
  return (
    <>
      <output>{activeSection}</output>
      <main key={page}>
        {ids.map((id) => (
          <section key={id} id={id} />
        ))}
      </main>
    </>
  );
}

const latestObserver = () => FakeObserver.instances.at(-1)!;

// Identity rather than toEqual, which compares DOM nodes by structure: a
// detached section and its replacement are equal nodes.
const expectWatchingTheLiveSections = () => {
  const { observed, disconnected } = latestObserver();
  expect(disconnected).toBe(false);
  expect(observed).toHaveLength(IDS.length);
  IDS.forEach((id, index) =>
    expect(observed[index]).toBe(document.getElementById(id))
  );
};

beforeEach(() => {
  pathname.current = '/';
  FakeObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', FakeObserver);
  return () => vi.unstubAllGlobals();
});

describe('the elements it watches', () => {
  it('watches the sections on the page', () => {
    render(<Layout ids={IDS} page="/" />);

    expectWatchingTheLiveSections();
  });

  it('follows the sections a new route renders under the same ids', () => {
    const { rerender } = render(<Layout ids={IDS} page="/" />);

    pathname.current = '/bookmarks';
    rerender(<Layout ids={IDS} page="/bookmarks" />);

    expectWatchingTheLiveSections();
  });

  it('follows the sections a new list renders under the same ids', () => {
    // The home page swaps its previews for search results when a filter
    // starts; a filter matching every section lists the same ids.
    const { rerender } = render(<Layout ids={IDS} page="previews" />);

    rerender(<Layout ids={[...IDS]} page="results" />);

    expectWatchingTheLiveSections();
  });

  it('keeps its observer while neither the list nor the route changes', () => {
    const { rerender } = render(<Layout ids={IDS} page="/" />);

    rerender(<Layout ids={IDS} page="/" />);

    expect(FakeObserver.instances).toHaveLength(1);
  });

  it('disconnects when it unmounts', () => {
    const { unmount } = render(<Layout ids={IDS} page="/" />);

    unmount();

    expect(latestObserver().disconnected).toBe(true);
  });
});

describe('the active section', () => {
  it('reports the section that came into view', () => {
    render(<Layout ids={IDS} page="/" />);

    act(() =>
      latestObserver().callback(
        [
          {
            isIntersecting: true,
            target: document.getElementById('section-two')!,
          } as unknown as IntersectionObserverEntry,
        ],
        latestObserver() as unknown as IntersectionObserver
      )
    );

    expect(screen.getByRole('status')).toHaveTextContent('section-two');
  });
});
