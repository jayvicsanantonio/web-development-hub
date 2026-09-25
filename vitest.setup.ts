// Runs before every Vitest file: jest-dom's matchers, cleanup between tests,
// and stand-ins for the browser APIs jsdom does not implement.
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

// jsdom does not implement scrollIntoView, which the nav calls to jump between
// sections.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
