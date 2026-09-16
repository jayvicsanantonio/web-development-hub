// Light/dark theme state. The initial value is resolved synchronously so it
// matches what the blocking script in app/layout.tsx already painted.
'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * The single rule for picking a theme: an explicit stored choice wins, then
 * the operating system's preference. app/layout.tsx inlines the same rule as
 * a blocking script — the two must agree or the first paint flashes.
 *
 * During the static export there is no window, so this returns the same value
 * the prerendered HTML is built with.
 */
export function resolveTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  let stored: string | null = null;
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Private browsing and blocked-storage settings throw on access. Falling
    // through to the system preference is better than taking the tree down.
  }

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved in the initialiser rather than an effect: reading it a render
  // later is what made a stored 'light' flash dark before hydration.
  const [theme, setTheme] = useState<Theme>(resolveTheme);

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
    // Set alongside the class, not just by the blocking script on load: it
    // drives scrollbars and native form controls, so leaving it at the value
    // from page load left them dark on a light page after a toggle.
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Nothing to do: the theme still applies for this session.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
