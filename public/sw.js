// when we produce a new version of our app we just need to change the version no of our service worker
let expectedCaches = ["cache-1"];

const CACHE_NAME = expectedCaches[0];
let urlToCache = ["/", "/static/js/bundle.js"];

// cache our resources
self.addEventListener("install", event => {
  // perform install steps
  console.log("All  mighty");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache opened");
      return cache.addAll(urlToCache);
    })
  );
}); //install

self.addEventListener("activate", event => {
  // delete old caches except CACHE_NAME

  event.waitUntil(
    caches
      .keys()
      .then(keys => {
        Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        ); //Promise.all
      }) //cache.keys
      .then(() => {
        console.log("New Worker installed");
      })
  );
});
// listen for network requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // cache hit - return response
      if (response) {
        return response;
      }

      //cache hit fail so return network request
      return fetch(event.request).catch(err => {
        console.log("offline", self);
      });
    }) //caches.match
  ); //self.respondWith
});
