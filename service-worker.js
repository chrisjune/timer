const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.css',
  '/index.js',
  '/alarm.ico',
  '/alarm.m4a',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});