'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';

/**
 * Custom hook for global keyboard shortcuts
 *
 * Keyboard shortcuts:
 * - Ctrl+K or Cmd+K: Focus search input
 * - / (forward slash): Focus search input (when not in input field)
 * - F: Focus search input (when not in input field)
 * - ESC: Clear search and navigate to home page
 */
export function useKeyboardShortcuts() {
  const router = useRouter();
  const { clearSearch, searchQuery } = useSearch();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Function to focus on search input
  const focusSearchInput = () => {
    // Try to find the search input element
    const desktopSearchInput = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    const mobileSearchInput = document.querySelector(
      '#mobile-search input[type="search"]'
    ) as HTMLInputElement;

    const searchInput = desktopSearchInput || mobileSearchInput;

    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  };

  // Function to handle ESC key - clear search only
  const handleEscape = () => {
    const activeElement = document.activeElement as HTMLElement;

    // If search input is focused, clear it and blur
    if (
      activeElement?.tagName === 'INPUT' &&
      activeElement.getAttribute('type') === 'search'
    ) {
      clearSearch();
      activeElement.blur();
    } else if (searchQuery) {
      // If there's a search query but input isn't focused, just clear search
      clearSearch();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search (common shortcut)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        focusSearchInput();
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

      // ESC to clear search and go home
      if (event.key === 'Escape') {
        handleEscape();
        return;
      }
    };

    // Helper function to check if an input element is currently focused
    const isInputFocused = () => {
      const activeElement = document.activeElement as HTMLElement;
      return (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.isContentEditable === true
      );
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, clearSearch, searchQuery]);

  return {
    focusSearchInput,
    searchInputRef,
  };
}
