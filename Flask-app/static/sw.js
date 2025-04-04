/*

Code taken and repurposed from MDN docs example on GitHub:
https://github.com/mdn/dom-examples/blob/b18287fe14cc63e23699b53b1ec91647d996fd5f/service-worker/simple-service-worker/sw.js

*/

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info("using preload response", preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  try {
    const responseFromNetwork = await fetch(request.clone());
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener("activate", (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/static/audio/mouse-click-123856.mp3",
      "/static/css/main.css",
      "/static/css/normalize.css",
      "/static/images/512.png",
      "/static/images/192.png",
      "/static/images/favicon.ico",
      "/static/js/main.js",
      "/static/manifest.json",
      // '/static/sw.js',
      "/templates/main.html",
      "/favicon.ico",
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const preloadResponse = await event.preloadResponse.catch(() => null); // Handle undefined case

      const response = await cacheFirst({
        request: event.request,
        preloadResponsePromise: preloadResponse,
        fallbackUrl: "/static/images/512.png",
      });

      return response;
    })()
  );
});
