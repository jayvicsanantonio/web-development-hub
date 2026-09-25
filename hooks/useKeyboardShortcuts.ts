// Global keyboard shortcuts. Mounted once by LayoutWrapper; it renders nothing
// and returns nothing, so every handler lives inside the effect that binds it.
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { toggleTheme } from '@/lib/theme';

/**
 * Keyboard shortcuts:
 * - Ctrl+K or Cmd+K: Focus search input
 * - Ctrl+F or Cmd+F: Toggle filter panel
 * - Ctrl+B or Cmd+B: Navigate to Bookmarks page
 * - Ctrl+H or Cmd+H: Navigate to Home page
 * - Ctrl+Shift+L or Cmd+Shift+L: Toggle light/dark theme
 * - / (forward slash): Focus search input (when not in input field)
 * - F: Focus search input (when not in input field)
 * - ESC: Clear search
 */
export function useKeyboardShortcuts() {
  const router = useRouter();
  const { clearSearch, toggleFilterPanel } = useSearch();

  useEffect(() => {
    const focusSearchInput = () => {
      // Unscoped on purpose: whichever search box is mounted — the header one
      // on desktop, the sheet one on mobile — is the one to focus.
      const searchInput =
        document.querySelector<HTMLInputElement>(
          'input[type="search"]'
        );

      searchInput?.focus();
      searchInput?.select();
    };

    const activeElement = () =>
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const isInputFocused = () => {
      const element = activeElement();
      return (
        element?.tagName === 'INPUT' ||
        element?.tagName === 'TEXTAREA' ||
        element?.isContentEditable === true
      );
    };

    const handleEscape = () => {
      const element = activeElement();

      // Clearing an empty query changes nothing, so this needs no check on
      // the query - and reading it would rebind this effect on every key.
      clearSearch();

      // If search input is focused, also blur it
      if (
        element?.tagName === 'INPUT' &&
        element.getAttribute('type') === 'search'
      ) {
        element.blur();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search (common shortcut)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        focusSearchInput();
        return;
      }

      // Ctrl/Cmd + F to toggle filter panel
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        toggleFilterPanel();
        return;
      }

      // Ctrl/Cmd + B to navigate to Bookmarks page
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        router.push('/bookmarks');
        return;
      }

      // Ctrl/Cmd + H to navigate to Home page
      if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        router.push('/');
        return;
      }

      // Ctrl/Cmd + Shift + L to toggle theme
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        (event.key === 'l' || event.key === 'L')
      ) {
        event.preventDefault();
        event.stopPropagation();
        toggleTheme();
        return;
      }

      // Forward slash (/) to focus search (like GitHub, Reddit)
      if (event.key === '/' && !isInputFocused()) {
        event.preventDefault();
        focusSearchInput();
        return;
      }

      // F key to focus search (like Vercel)
      if (event.key === 'f' && !isInputFocused()) {
        event.preventDefault();
        focusSearchInput();
        return;
      }

      // ESC to clear search
      if (event.key === 'Escape') {
        handleEscape();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, clearSearch, toggleFilterPanel]);
}
