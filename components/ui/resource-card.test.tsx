// Covers what a card renders and the identifiers other things hang off it:
// the anchor id, the aria-labelledby pairing, and the bookmark round trip.
import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResourceCard from './resource-card';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import type { ResourceLink } from '@/lib/types';

const RESOURCE: ResourceLink = {
  title: 'MDN Web Docs',
  href: 'https://developer.mozilla.org/',
  description: 'Reference documentation for the web platform.',
  tags: ['free', 'documentation'],
};

const renderCard = (resource: ResourceLink = RESOURCE) =>
  render(
    <BookmarksProvider>
      <ResourceCard resource={resource} />
    </BookmarksProvider>
  );

describe('content', () => {
  it('renders the title, description and link', () => {
    renderCard();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', RESOURCE.href);
    expect(link).toHaveAttribute('target', '_blank');
    // Without noreferrer the opened page can reach back through window.opener.
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByText(RESOURCE.title)).toBeInTheDocument();
    expect(
      screen.getByText(RESOURCE.description)
    ).toBeInTheDocument();
  });

  it('labels the card with its own heading', () => {
    renderCard();
    const card = screen.getByRole('article');
    const headingId = card.getAttribute('aria-labelledby');

    expect(headingId).toBeTruthy();
    expect(document.getElementById(headingId!)).toHaveTextContent(
      RESOURCE.title
    );
  });

  it('gives the card a slugged id to address it by', () => {
    renderCard();
    expect(screen.getByRole('article')).toHaveAttribute(
      'id',
      'mdn-web-docs'
    );
  });
});

describe('tags', () => {
  it('renders every tag with hyphens replaced', () => {
    renderCard({ ...RESOURCE, tags: ['beginner-friendly'] });
    expect(
      screen.getByText('beginner friendly')
    ).toBeInTheDocument();
  });

  it('replaces every hyphen, not just the first', () => {
    // `replace` with a string pattern only swaps the first occurrence, so a
    // tag like this rendered as "ci cd-tools".
    renderCard({ ...RESOURCE, tags: ['ci-cd-tools'] });
    expect(screen.getByText('ci cd tools')).toBeInTheDocument();
  });

  it('renders no tag row when there are no tags', () => {
    const { container } = renderCard({
      ...RESOURCE,
      tags: [],
    });
    expect(
      container.querySelector('[title^="Filter by"]')
    ).not.toBeInTheDocument();
  });
});

describe('bookmarking', () => {
  it('toggles the button label without following the card link', async () => {
    const user = userEvent.setup();
    renderCard();

    const add = screen.getByRole('button', {
      name: `Add ${RESOURCE.title} to bookmarks`,
    });
    await user.click(add);

    expect(
      screen.getByRole('button', {
        name: `Remove ${RESOURCE.title} from bookmarks`,
      })
    ).toBeInTheDocument();
  });

  it('saves the resource by its href', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(
      screen.getByRole('button', { name: /Add .* to bookmarks/ })
    );

    await waitFor(() =>
      expect(
        JSON.parse(localStorage.getItem('web-dev-hub-bookmarks') ?? '[]')
      ).toEqual([RESOURCE.href])
    );
  });
});

describe('markup', () => {
  it('puts the link in the heading rather than around the card', () => {
    renderCard();
    const heading = screen.getByRole('heading', { level: 3 });

    expect(
      within(heading).getByRole('link')
    ).toHaveAccessibleName(RESOURCE.title);
  });

  it('keeps the bookmark button outside the link', () => {
    // A button inside an anchor is not valid HTML, and it left the click
    // handler cancelling the navigation the anchor would otherwise make.
    renderCard();
    const link = screen.getByRole('link');
    const button = screen.getByRole('button', {
      name: /bookmarks$/,
    });

    expect(link.contains(button)).toBe(false);
  });
});
