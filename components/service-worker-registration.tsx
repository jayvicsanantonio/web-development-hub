// Registers the service worker and surfaces the "new version" prompt when a
// newer one is waiting to take over.
'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [waitingWorker, setWaitingWorker] =
    useState<ServiceWorker | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleRefresh = useCallback(() => {
    if (!waitingWorker) return;

    // The reload is driven by controllerchange rather than fired here: the new
    // worker has to finish activating first, or the page reloads under the old
    // one and the prompt comes straight back.
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      () => window.location.reload(),
      { once: true },
    );
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }, [waitingWorker]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let cancelled = false;

    // Registered directly rather than from a window 'load' listener. React
    // effects usually run after load has already fired, and a listener added
    // then never runs — so the worker often never registered at all.
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (cancelled) return;

        const promote = (worker: ServiceWorker | null) => {
          // Only meaningful once a worker is already in control; on a first
          // visit the incoming worker is the only one there has ever been.
          if (worker && navigator.serviceWorker.controller) {
            setWaitingWorker(worker);
            setIsDismissed(false);
          }
        };

        // A worker may already be waiting from an earlier visit, in which case
        // no updatefound will fire for it.
        promote(registration.waiting);

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              promote(installingWorker);
            }
          });
        });
      })
      .catch((err) =>
        console.error('Service worker registration failed:', err),
      );

    return () => {
      cancelled = true;
    };
  }, []);

  const showUpdateNotification =
    waitingWorker !== null && !isDismissed;

  if (!showUpdateNotification) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 animate-slide-in-from-bottom">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground mb-1">
              New Version Available
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              A new version of the app is ready. Refresh to get the
              latest features and improvements.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Refresh Now
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
