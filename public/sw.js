const CACHE_NAME = 'dragons-vault-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineMessages());
  }
});

async function syncOfflineMessages() {
  // Sync offline messages when connection is restored
  console.log('Syncing offline messages...');
}
e: 'current'
   

    "test:cry

ges/api/**/*.js'
  ],
  coverageDirectory: 'c

e over Client1,DB: Message 

n (
    <div classNa

  sessionKeys: { type:


ges/api/**/*.js'
  ],
  cove
