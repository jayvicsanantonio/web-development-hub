// Covers the theme toggle. The theme's starting value is settled by the
// blocking script in app/layout.tsx; this only has to flip what is there.
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toggleTheme } from './theme';

const root = document.documentElement;

beforeEach(() => {
  root.classList.remove('dark');
  root.style.colorScheme = '';
});

describe('toggleTheme', () => {
  it('switches a dark page to light, and back', () => {
    root.classList.add('dark');

    toggleTheme();
    expect(root).not.toHaveClass('dark');

    toggleTheme();
    expect(root).toHaveClass('dark');
  });

  it('keeps colorScheme in step with the class', () => {
    // It drives scrollbars and native form controls, which stay dark on a
    // light page if only the class changes.
    root.classList.add('dark');

    toggleTheme();
    expect(root.style.colorScheme).toBe('light');

    toggleTheme();
    expect(root.style.colorScheme).toBe('dark');
  });

  it('stores the choice under the key the blocking script reads', () => {
    toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dark');

    toggleTheme();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('still switches when storage is unavailable', () => {
    // Private browsing and blocked-storage settings throw on access; the
    // theme should still change for this visit.
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });

    expect(() => toggleTheme()).not.toThrow();
    expect(root).toHaveClass('dark');
  });
});
