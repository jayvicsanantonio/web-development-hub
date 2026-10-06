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

// jsdom has <dialog> and its open state, which hides a closed one, but not
// the methods that open and close it. These keep that state and nothing more:
// focus, the top layer and the inert page behind are a real browser's, so
// the e2e suite covers them.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (
    this: HTMLDialogElement,
  ) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function (
    this: HTMLDialogElement,
  ) {
    this.open = false;
  };
}
