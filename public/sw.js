const CACHE_NAME = 'web-dev-hub-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
const OFFLINE_IMAGE = new Response(
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image</text></svg>',
  { headers: { 'Content-Type': 'image/svg+xml' } }
);

const CACHEABLE_ASSET = /\.(css|js|png|jpg|jpeg|gif|svg|webp|woff2?)$/;

async function handleNavigate(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const offline = await caches.match('/offline.html');
    // Never resolve to undefined: respondWith would turn that into a network error.
    return (
      offline ||
      new Response('You are offline.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      })
    );
  }
}

async function handleAsset(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.status === 200 && CACHEABLE_ASSET.test(request.url)) {
      const copy = response.clone();
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, copy);
      } catch (error) {
        console.error('Service Worker: Failed to cache resource', error);
      }
    }

    return response;
  } catch (error) {
    if (request.destination === 'image') {
      return OFFLINE_IMAGE.clone();
    }
    return new Response('', { status: 504, statusText: 'Gateway Timeout' });
  }
}

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(handleNavigate(event.request));
    return;
  }

  if (event.request.method === 'GET') {
    event.respondWith(handleAsset(event.request));
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync operations
      console.log('Service Worker: Background sync triggered')
    );
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icon.svg',
      badge: '/icon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('Web Dev Hub', options)
    );
  }
});
