"use client";

import * as React from "react";
import { useState, useEffect } from "react";

// Placeholder SVGs - will refine these later
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

type Theme = "light" | "dark" | "system";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  // Effect to run on component mount to set initial theme
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("system"); // Default to system if nothing is stored
    }
  }, []);

  // Effect to apply theme and update localStorage when theme state changes
  useEffect(() => {
    if (!mounted) return; // Don't run on initial server render if using SSR/Next.js

    const root = window.document.documentElement;
    const isDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (newTheme: Theme) => {
      root.classList.remove("light", "dark"); // Remove existing theme classes

      if (newTheme === "system") {
        const systemPrefersDark = isDarkQuery.matches;
        if (systemPrefersDark) {
          root.classList.add("dark");
        } else {
          root.classList.add("light");
        }
        // Optionally, you can set the theme state to 'dark' or 'light' based on system preference
        // For now, localStorage will still say 'system'
      } else if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
      localStorage.setItem("theme", newTheme);
    };

    applyTheme(theme);

    // Listener for system theme changes if current theme is 'system'
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        if (e.matches) {
          root.classList.remove("light");
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
        }
      }
    };

    isDarkQuery.addEventListener("change", handleSystemChange);
    return () => {
      isDarkQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme, mounted]);

  const cycleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light"; // system -> light
    });
  };

  if (!mounted) {
    // Avoid rendering button on server or before hydration to prevent mismatch
    // You can return a placeholder or null
    return <div style={{ width: '24px', height: '24px' }} />; // Placeholder for size
  }

  const renderIcon = () => {
    // This logic might need refinement based on how 'system' should be displayed
    // For now, if theme is 'system', it shows the icon corresponding to the actual applied scheme
    const currentScheme = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (theme === 'system') {
        // return currentScheme === 'dark' ? <MoonIcon /> : <SunIcon />; // Or always SystemIcon
        return <SystemIcon/>;
    }
    if (theme === "light") return <SunIcon />;
    if (theme === "dark") return <MoonIcon />;
    return <SystemIcon />; // Fallback, or specific icon for 'system'
  };

  const getButtonLabel = () => {
    if (theme === 'light') return "Switch to Dark Theme";
    if (theme === 'dark') return "Switch to System Theme";
    return "Switch to Light Theme"; // System theme is active
  }

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={getButtonLabel()}
      title={getButtonLabel()}
    >
      {renderIcon()}
    </button>
  );
}

export default ThemeSwitcher;
