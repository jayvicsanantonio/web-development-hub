// Covers which elements the active-section observer watches, and which of them
// it reports. The nav that uses it stays mounted across routes, so it has to
// follow the page's sections when they are rendered afresh rather than keep
// watching the ones it started with.
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
  // jsdom lays nothing out, so each test places its sections itself, in an
  // 800px viewport whose middle is 400px down.
  beforeEach(() => vi.stubGlobal('innerHeight', 800));

  const place = (id: string, top: number, bottom: number) => {
    document.getElementById(id)!.getBoundingClientRect = () =>
      ({ top, bottom, height: bottom - top }) as DOMRect;
  };

  // One callback, carrying only the sections whose intersection changed.
  const report = (changes: Record<string, boolean>) =>
    act(() =>
      latestObserver().callback(
        Object.entries(changes).map(
          ([id, isIntersecting]) =>
            ({
              isIntersecting,
              target: document.getElementById(id)!,
            }) as unknown as IntersectionObserverEntry
        ),
        latestObserver() as unknown as IntersectionObserver
      )
    );

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

  it('keeps the section in the middle when a neighbour comes into view', () => {
    render(<Layout ids={[...IDS, 'section-three']} page="/" />);
    place('section-one', 250, 550);
    place('section-two', 600, 750);
    place('section-three', 850, 1000);
    report({
      'section-one': true,
      'section-two': true,
      'section-three': false,
    });

    // Scrolled 250px: two is in the middle now, and only three crossed
    // into view, so it is the only section the callback names.
    place('section-one', 0, 300);
    place('section-two', 350, 500);
    place('section-three', 550, 700);
    report({ 'section-three': true });

    expect(screen.getByRole('status')).toHaveTextContent('section-two');
  });

  it('moves on when the highlighted section leaves the view', () => {
    render(<Layout ids={IDS} page="/" />);
    place('section-one', 100, 500);
    place('section-two', 550, 700);
    report({ 'section-one': true, 'section-two': true });

    // Scrolled 400px: one left the view and nothing came into it.
    place('section-one', -300, 100);
    place('section-two', 150, 300);
    report({ 'section-one': false });

    expect(screen.getByRole('status')).toHaveTextContent('section-two');
  });

  it('prefers the section the middle falls in, however tall', () => {
    render(<Layout ids={IDS} page="/" />);
    // One's centre is 650px from the middle and two's only 190px, but the
    // middle of the viewport is inside one.
    place('section-one', -1000, 500);
    place('section-two', 540, 640);
    report({ 'section-one': true, 'section-two': true });

    expect(screen.getByRole('status')).toHaveTextContent('section-one');
  });
});
