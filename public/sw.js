// A service worker whose only job is to remove itself. Browsers that registered
// a worker at this path keep checking it for updates; they install this one,
// which deletes this origin's caches and unregisters, so the next load goes
// straight to the network with no worker in between.
self.addEventListener('install', () => {
  // Take over from the worker being replaced now, rather than waiting until
  // every tab it controls has closed.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
      await self.registration.unregister();
    })()
  );
});
