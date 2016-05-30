/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("sw-toolbox.js","runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["dist/bundle.min.js","357a2a43f728a83d44dae7cf99a3ed20"],["images/ic_menu_24px.svg","1bb9b1d13c4f97f92fbe9c5a892ceb31"],["images/touch/512x512.png","0d7a9ebc097a097c409a1a7bfb8a34a5"],["images/touch/android-chrome-144x144.png","2a09461b4d5d533420631e954ebdb039"],["images/touch/android-chrome-192x192.png","72d4317368008a5a42f0570d79efb806"],["images/touch/android-chrome-36x36.png","b703ff483e75264643f5893ee19ab8be"],["images/touch/android-chrome-48x48.png","29cf7924e2df9c487f2402185cafa7a6"],["images/touch/android-chrome-72x72.png","e562fd95ca63eb2130c268bec30c579d"],["images/touch/android-chrome-96x96.png","a7983a24137d3ba472d746c3bd101c6d"],["images/touch/apple-touch-icon-114x114.png","223e41be5fd33f372a751a85f5ce8dcd"],["images/touch/apple-touch-icon-120x120.png","5cde3eadee325ceddf94d0dbe3dd4499"],["images/touch/apple-touch-icon-144x144.png","3ecc24e5e4432fbd658074ff84255344"],["images/touch/apple-touch-icon-152x152.png","5ffe6abc2059e0ae213554a0fda6c4dd"],["images/touch/apple-touch-icon-180x180.png","7e7b930a1ccd964a882a84d8ca32e192"],["images/touch/apple-touch-icon-57x57.png","9a9e31ce2fb1c6490e496be2b2ea8050"],["images/touch/apple-touch-icon-60x60.png","f28bcf5ed0c4d54e2058a1278bb8628e"],["images/touch/apple-touch-icon-72x72.png","1c1cefbee531e46cc371e5d9c248e894"],["images/touch/apple-touch-icon-76x76.png","97c973924e7668b293d14c22924313c8"],["images/touch/apple-touch-icon-precomposed.png","bff2486c704762c740a48a8066f9bc6c"],["images/touch/apple-touch-icon.png","7e7b930a1ccd964a882a84d8ca32e192"],["images/touch/browserconfig.xml","668b2584c1b5301af4c56a8cfa4d0776"],["images/touch/favicon-16x16.png","baa1c0de644cc3ae110468f39e52b342"],["images/touch/favicon-32x32.png","c2fd7d8fd10fbae883a7bf6c38f27fc2"],["images/touch/favicon-96x96.png","987cbd055f7ff0a7e6e13c3bf7e268c9"],["images/touch/favicon.ico","648218acaeb7296a0fb6d375ad1eea48"],["images/touch/manifest.json","cd04f87296b041cc7d41bd922f3261f7"],["images/touch/mstile-144x144.png","e79e2cc5041fb954ffc625378426c124"],["images/touch/mstile-150x150.png","41994470b221f164e7664ae5d41e0dbd"],["images/touch/mstile-310x150.png","d8c2b23bce56119b515896ec08a505a8"],["images/touch/mstile-310x310.png","3b91bc3b66374a6e6684de5f47317349"],["images/touch/mstile-70x70.png","b5ec8b3cd913d869552947acc1256781"],["images/touch/safari-pinned-tab.svg","2b7d93bdf3a6936315936c9d92c05f83"],["runtime-caching.js","796fcf0b575891fc7e3c7ed251dd27f5"],["style/404.css","8bd39eafa74d1bd8934a07ba3906eab4"],["style/core.css","dbc5b1d0572c51bc54ba0e1f9519dc65"],["style/details.css","4e21657b89bb1d688ad89f79bfb8068d"],["style/general.css","e0658b650718aa24048330279bc56e72"],["sw-toolbox.js","42dd9073ba0a0c8e0ae2230432870678"],["views/critical-styles.html","ffe400029759848a6cb9a7cbdc58c2d9"],["views/favicons.html","4c5c8796a3893dc00e0c22fc792cc81a"],["views/header.html","a5bb0a198541f687fcabaa1feb037791"],["views/scripts.html","9ea3ea4acba1b2ca547df5ce947d6bd8"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-sw-precache-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




