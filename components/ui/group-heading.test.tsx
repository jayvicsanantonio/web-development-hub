// Covers the group heading: it is named by the section alone, so the number
// and count it prints beside the title do not reach a screen reader's list of
// headings.
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GroupHeading } from './group-heading';
import { SECTIONS } from '@/constants/sections';

describe('the group heading', () => {
  it('is named by the section alone', () => {
    render(<GroupHeading section={SECTIONS[2].title} count={4} />);

    expect(
      screen.getByRole('heading', { level: 2 })
    ).toHaveAccessibleName(SECTIONS[2].title);
  });

  it('prints the section number and the count beside the title', () => {
    render(<GroupHeading section={SECTIONS[2].title} count={4} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('03');
    expect(heading).toHaveTextContent('4');
  });

  it('prints no number for a section the dataset no longer has', () => {
    render(<GroupHeading section="Uncategorized" count={1} />);

    expect(
      screen.getByRole('heading', { level: 2 })
    ).toHaveTextContent(/^Uncategorized1$/);
  });
});
