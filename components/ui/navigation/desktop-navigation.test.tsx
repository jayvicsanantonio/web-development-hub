// Covers the roving focus the side nav advertises through #nav-description.
// It was driven by `.desktop-nav-button:nth-of-type(n)`, which counts by
// element type within each parent — every button is its <li>'s only child, so
// only :nth-of-type(1) ever matched and ArrowDown/End moved nothing.
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesktopNavigation } from './desktop-navigation';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
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
    <BookmarksProvider>
      <DesktopNavigation
        navItems={NAV_ITEMS}
        activeSection="section-one"
        isHomeActive
        isBookmarksActive={false}
        onScrollToSection={vi.fn()}
        {...props}
      />
    </BookmarksProvider>
  );
}

const sectionButton = (title: string) =>
  screen.getByRole('button', { name: `Navigate to ${title} section` });

describe('section list', () => {
  it('renders one button per nav item', () => {
    renderNav();
    for (const item of NAV_ITEMS) {
      expect(sectionButton(item.title)).toBeInTheDocument();
    }
  });

  it('hides the section list off the home and bookmarks pages', () => {
    renderNav({ isHomeActive: false, isBookmarksActive: false });
    expect(
      screen.queryByRole('button', { name: /Navigate to One/ })
    ).not.toBeInTheDocument();
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
  it('scrolls to the section it was told to scroll to', async () => {
    const user = userEvent.setup();
    const onScrollToSection = vi.fn();
    renderNav({ onScrollToSection });

    await user.click(sectionButton('Two'));

    expect(onScrollToSection).toHaveBeenCalledWith('section-two');
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
