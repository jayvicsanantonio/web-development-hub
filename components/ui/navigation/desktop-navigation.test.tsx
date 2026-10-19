// Covers the header's section strip: the roving focus it advertises through
// #nav-description, the sections it lists on each kind of page, and the
// controls beside it. Roving focus was once driven by
// `.desktop-nav-button:nth-of-type(n)`, which counts by element type within
// each parent — every button is its <li>'s only child, so only
// :nth-of-type(1) ever matched and the arrow keys moved nothing.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesktopNavigation } from './desktop-navigation';
import { SECTIONS } from '@/constants/sections';
import {
  DEFAULT_NAV_ITEMS,
  type NavigationItem,
} from '@/lib/utils/navigation';

const NAV_ITEMS: NavigationItem[] = [
  { id: 'section-one', title: 'One', iconName: 'mdi:numeric-1' },
  { id: 'section-two', title: 'Two', iconName: 'mdi:numeric-2' },
  { id: 'section-three', title: 'Three', iconName: 'mdi:numeric-3' },
];

function renderNav(props: Partial<
  React.ComponentProps<typeof DesktopNavigation>
> = {}) {
  const navItems = props.navItems ?? NAV_ITEMS;
  return render(
    <>
      <DesktopNavigation
        navItems={navItems}
        activeSection="section-one"
        isHomeActive
        isBookmarksActive={false}
        pathname="/"
        {...props}
      />
      {navItems.map((item) => (
        <section key={item.id} id={item.id} />
      ))}
    </>
  );
}

const sectionButton = (title: string) =>
  screen.getByRole('button', { name: `Navigate to ${title} section` });

const strip = () =>
  screen.getByRole('navigation', { name: 'Page sections navigation' });

describe('section list', () => {
  it('renders one button per nav item', () => {
    renderNav();
    for (const item of NAV_ITEMS) {
      expect(sectionButton(item.title)).toBeInTheDocument();
    }
  });

  it('numbers each section by its place in the index, not in the list', () => {
    // A search can leave only the third section on the page; it is still
    // section 03.
    const third = DEFAULT_NAV_ITEMS[2];
    renderNav({ navItems: [third], activeSection: third.id });

    expect(sectionButton(third.title)).toHaveTextContent('03');
  });
});

describe('off the home and bookmarks pages', () => {
  const viewing = SECTIONS[1];
  const renderOnSectionPage = () =>
    renderNav({
      isHomeActive: false,
      isBookmarksActive: false,
      pathname: viewing.href,
    });

  it('lists no in-page section buttons', () => {
    renderOnSectionPage();
    expect(
      screen.queryByRole('button', { name: /^Navigate to .* section$/ })
    ).not.toBeInTheDocument();
  });

  it('links every section page instead', () => {
    renderOnSectionPage();

    for (const section of SECTIONS) {
      expect(
        within(strip()).getByRole('link', { name: section.title })
      ).toHaveAttribute('href', section.href);
    }
  });

  it('links them too where the page has no sections to jump to', () => {
    // Nothing saved yet, or a search that found nothing: an empty strip
    // would be a bare rule across the header.
    renderNav({ navItems: [] });

    for (const section of SECTIONS) {
      expect(
        within(strip()).getByRole('link', { name: section.title })
      ).toHaveAttribute('href', section.href);
    }
  });

  it('marks the section page being viewed', () => {
    renderOnSectionPage();

    expect(
      within(strip()).getByRole('link', { name: viewing.title })
    ).toHaveAttribute('aria-current', 'page');
    expect(
      within(strip()).getByRole('link', { name: SECTIONS[0].title })
    ).not.toHaveAttribute('aria-current');
  });
});

describe('roving focus', () => {
  it('moves focus along the strip with ArrowRight', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('One').focus();
    await user.keyboard('{ArrowRight}');
    expect(sectionButton('Two')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(sectionButton('Three')).toHaveFocus();
  });

  it('moves focus back along the strip with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('Three').focus();
    await user.keyboard('{ArrowLeft}');
    expect(sectionButton('Two')).toHaveFocus();
  });

  it('stops at the ends rather than wrapping', async () => {
    const user = userEvent.setup();
    renderNav();

    sectionButton('One').focus();
    await user.keyboard('{ArrowLeft}');
    expect(sectionButton('One')).toHaveFocus();

    sectionButton('Three').focus();
    await user.keyboard('{ArrowRight}');
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

describe('the controls beside the strip', () => {
  it('renders the search it is handed', () => {
    renderNav({
      search: <input type="search" aria-label="Search resources" />,
    });

    expect(
      within(
        screen.getByRole('banner', { name: 'Site header' })
      ).getByRole('searchbox', { name: 'Search resources' })
    ).toBeInTheDocument();
  });

  it('counts the saved resources on the bookmarks link', () => {
    renderNav({ savedCount: 3 });

    expect(
      screen.getByRole('link', { name: /^Navigate to bookmarks/ })
    ).toHaveTextContent('3');
  });

  it('shows no count before anything is saved', () => {
    renderNav({ savedCount: 0 });

    expect(
      screen.getByRole('link', { name: /^Navigate to bookmarks/ })
    ).not.toHaveTextContent(/\d/);
  });
});
