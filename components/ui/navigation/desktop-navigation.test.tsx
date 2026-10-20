// Covers the desktop sidebar: the links to every page, with the counts beside
// them, and the roving focus its in-page list advertises through
// #nav-description. That focus was driven by
// `.desktop-nav-button:nth-of-type(n)`, which counts by element type within
// each parent — every button is its <li>'s only child, so only
// :nth-of-type(1) ever matched and ArrowDown/End moved nothing.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesktopNavigation } from './desktop-navigation';
import { SECTIONS } from '@/constants/sections';
import type { NavigationItem } from '@/lib/utils/navigation';

const NAV_ITEMS: NavigationItem[] = [
  { id: 'section-one', title: 'One', iconName: 'mdi:numeric-1' },
  { id: 'section-two', title: 'Two', iconName: 'mdi:numeric-2' },
  { id: 'section-three', title: 'Three', iconName: 'mdi:numeric-3' },
];

function renderNav(props: Partial<
  React.ComponentProps<typeof DesktopNavigation>
> = {}) {
  return render(
    <>
      <DesktopNavigation
        navItems={NAV_ITEMS}
        activeSection="section-one"
        pathname="/"
        bookmarkCount={0}
        {...props}
      />
      {NAV_ITEMS.map((item) => (
        <section key={item.id} id={item.id} />
      ))}
    </>
  );
}

const sectionButton = (title: string) =>
  screen.getByRole('button', { name: `Navigate to ${title} section` });

const siteNav = () =>
  screen.getByRole('navigation', { name: 'Site navigation' });

describe('site links', () => {
  it('links home and to the bookmarks page', () => {
    renderNav();

    expect(
      within(siteNav()).getByRole('link', { name: 'Home' })
    ).toHaveAttribute('href', '/');
    expect(
      within(siteNav()).getByRole('link', { name: /^Bookmarks/ })
    ).toHaveAttribute('href', '/bookmarks');
  });

  it('links every section page, saying how many resources it holds', () => {
    renderNav();

    for (const section of SECTIONS) {
      expect(
        within(siteNav()).getByRole('link', {
          name: `${section.title} ${section.links.length} resources`,
        })
      ).toHaveAttribute('href', section.href);
    }
  });

  it('marks the page being viewed as the current one', () => {
    renderNav({ pathname: SECTIONS[2].href });

    expect(
      within(siteNav()).getByRole('link', {
        name: new RegExp(`^${SECTIONS[2].title}`),
      })
    ).toHaveAttribute('aria-current', 'page');
    expect(
      within(siteNav()).getByRole('link', { name: 'Home' })
    ).not.toHaveAttribute('aria-current');
  });

  it('counts the saved resources once there are any', () => {
    const { rerender } = renderNav();
    expect(
      within(siteNav()).getByRole('link', { name: /^Bookmarks/ })
    ).toHaveAccessibleName('Bookmarks');

    rerender(
      <DesktopNavigation
        navItems={NAV_ITEMS}
        activeSection="section-one"
        pathname="/"
        bookmarkCount={3}
      />
    );
    expect(
      within(siteNav()).getByRole('link', { name: /^Bookmarks/ })
    ).toHaveAccessibleName('Bookmarks 3 saved');
  });
});

describe('section list', () => {
  it('renders one button per nav item', () => {
    renderNav();
    for (const item of NAV_ITEMS) {
      expect(sectionButton(item.title)).toBeInTheDocument();
    }
  });

  it('hides the section list off the home and bookmarks pages', () => {
    renderNav({ pathname: SECTIONS[0].href });
    expect(
      screen.queryByRole('button', { name: /Navigate to One/ })
    ).not.toBeInTheDocument();
  });

  it('shows the section list on the bookmarks page', () => {
    renderNav({ pathname: '/bookmarks' });
    expect(sectionButton('One')).toBeInTheDocument();
  });
});

describe('roving focus', () => {
  it('moves focus down the list with ArrowDown', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('One').focus();
    await user.keyboard('{ArrowDown}');
    expect(sectionButton('Two')).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(sectionButton('Three')).toHaveFocus();
  });

  it('moves focus up the list with ArrowUp', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('Three').focus();
    await user.keyboard('{ArrowUp}');
    expect(sectionButton('Two')).toHaveFocus();
  });

  it('stops at the ends rather than wrapping', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('One').focus();
    await user.keyboard('{ArrowUp}');
    expect(sectionButton('One')).toHaveFocus();

    sectionButton('Three').focus();
    await user.keyboard('{ArrowDown}');
    expect(sectionButton('Three')).toHaveFocus();
  });

  it('jumps to the first and last items with Home and End', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('Two').focus();
    await user.keyboard('{End}');
    expect(sectionButton('Three')).toHaveFocus();

    await user.keyboard('{Home}');
    expect(sectionButton('One')).toHaveFocus();
  });
});

describe('activation', () => {
  it('scrolls its own section into view', async () => {
    const user = userEvent.setup();
    renderNav();
    const scrolled = vi.spyOn(Element.prototype, 'scrollIntoView');

    await user.click(sectionButton('Two'));

    expect(scrolled).toHaveBeenCalledOnce();
    expect(scrolled.mock.contexts[0]).toBe(
      document.getElementById('section-two')
    );
  });

  it('marks the active section as the current page', () => {
    renderNav({ activeSection: 'section-two' });
    expect(sectionButton('Two')).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(sectionButton('One')).not.toHaveAttribute('aria-current');
  });
});
