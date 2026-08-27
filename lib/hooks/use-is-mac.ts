import { useSyncExternalStore } from 'react';

/**
 * Whether the current platform is a Mac, for rendering ⌘ vs Ctrl in shortcut
 * hints.
 *
 * Three components each kept this in `useState` and assigned it from an empty
 * `useEffect`, which is a synchronous setState in an effect — one extra render
 * per mount, per component. The value is a client-only constant, so it reads as
 * an external store instead: the server snapshot is `false`, matching the
 * pre-hydration markup, and the client snapshot is read once during hydration.
 */
const subscribe = () => () => {};

const getSnapshot = () =>
  navigator.platform.toUpperCase().includes('MAC');

const getServerSnapshot = () => false;

export function useIsMac(): boolean {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}
