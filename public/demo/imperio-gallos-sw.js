// Service Worker para Imperio Gallos PWA
const CACHE_NAME = 'imperio-gallos-v2';
const urlsToCache = [
  '/demo/',
  '/demo/index.html',
  '/demo/imperio-gallos-logo.jpg',
  '/demo/imperio-gallos-promo.jpg',
  '/demo/presentacion.html'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - estrategia Cache First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retornar respuesta
        if (response) {
          return response;
        }

        // Clonar request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Verificar si es válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
