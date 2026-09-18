// Switches between the light and dark themes. The blocking script in
// app/layout.tsx settles the starting theme before first paint; this flips it
// from whatever the page currently shows, so there is no state to keep.

// The key the blocking script in app/layout.tsx reads on every load.
const THEME_STORAGE_KEY = 'theme';

export function toggleTheme() {
  const root = document.documentElement;
  const theme = root.classList.contains('dark') ? 'light' : 'dark';

  root.classList.toggle('dark', theme === 'dark');
  // Drives scrollbars and native form controls, which the class alone does
  // not reach.
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing and blocked-storage settings throw on access. The
    // theme still applies for this visit.
  }
}
