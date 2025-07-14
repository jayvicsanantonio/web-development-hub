'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null);

  const handleRefresh = () => {
    if (newWorker) {
      // Send message to service worker to skip waiting
      newWorker.postMessage({ type: 'SKIP_WAITING' });
      // Refresh the page
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowUpdateNotification(false);
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('Service worker registered successfully:', registration);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.addEventListener('statechange', () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available - show UI notification
                    console.log('New version available! Showing update notification.');
                    setNewWorker(installingWorker);
                    setShowUpdateNotification(true);
                  }
                });
              }
            });
          })
          .catch(err => console.error('Service worker registration failed:', err));
      });
    }
  }, []);

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
            <p className="text-xs text-foreground-muted mb-3">
              A new version of the app is ready. Refresh to get the latest features and improvements.
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
                className="text-xs text-foreground-muted hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-foreground-muted hover:text-foreground transition-colors"
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
