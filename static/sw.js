"use strict";

const CACHE_NAME = 'web-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/static/assets/css/main.css',
  '/static/assets/css/styles.css',
  '/static/assets/js/main.js',
  '/static/assets/js/utils.js',
  // ...other assets...
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
