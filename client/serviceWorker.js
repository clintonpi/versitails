const staticCacheName = 'versitails-v1';

self.addEventListener('install', (event) => {
  const urlsToCache = [
    '/',
    '/?source=pwa',
    '/calculate-aggregate-score',
    '/admission-probability',
    '/course-requirements',
    '/news',
    '/question',
    '/post-utme-score',
    'https://fonts.googleapis.com/css?family=Montserrat|Roboto',
    '/dist/css/bundle.css',
    '/dist/css/bundle.css.map',
    '/dist/css/unsupportedBrowser.css',
    '/dist/css/unsupportedBrowser.css.map',
    '/dist/js/bundle.js',
    '/dist/js/bundle.js.map',
    '/dist/js/unsupportedBrowser.js',
    '/dist/js/unsupportedBrowser.js.map',
    '/dist/images/apple-60.png',
    '/dist/images/apple-76.png',
    '/dist/images/apple-120.png',
    '/dist/images/apple-152.png',
    '/dist/images/apple-167.png',
    '/dist/images/apple-180.png',
    '/dist/images/icon-48.png',
    '/dist/images/icon-96.png',
    '/dist/images/icon-128.png',
    '/dist/images/icon-144.png',
    '/dist/images/icon-192.png',
    '/dist/images/icon-256.png',
    '/dist/images/icon-384.png',
    '/dist/images/icon-512.png',
    '/dist/images/calculator.svg',
    '/dist/images/graph.svg',
    '/dist/images/logo.svg',
    '/dist/images/newspaper.svg',
    '/dist/images/note.svg',
    '/dist/images/score.svg',
    '/dist/images/question.svg',
    '/public/favicon.ico',
    '/public/Course Requirements 2019-2020.pdf',
    '/public/manifest.json',
  ];

  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => Promise
        .all(cacheNames
          .filter(cacheName => cacheName.startsWith('versitails-') && cacheName !== staticCacheName)
          .map(cacheName => caches.delete(cacheName))))
  );
});

self.skipWaiting(); // Force update.
