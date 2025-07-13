const CACHE_NAME = 'web-dev-hub-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
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
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // Handle other requests with cache-first strategy for static assets
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request)
            .then((response) => {
              // Only cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    // Cache CSS, JS, and image files
                    if (event.request.url.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp)$/)) {
                      cache.put(event.request, responseClone);
                    }
                  });
              }
              return response;
            })
            .catch(() => {
              // Return a fallback for failed requests
              if (event.request.destination === 'image') {
                return new Response(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              }
            });
        })
    );
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
