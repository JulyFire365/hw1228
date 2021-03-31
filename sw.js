importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

const PREFIX = 'hw1228';
const VERSION = "v1";
const PAGE_CACHE = `${PREFIX}-page-${VERSION}`;
const STATIC_CACHE = `${PREFIX}-static-${VERSION}`;
const STATIC_CACHE_OTHER = `${PREFIX}-other-${VERSION}`;

const that = self;

workbox.setConfig({ debug: false });
workbox.skipWaiting();
workbox.clientsClaim();

workbox.core.setCacheNameDetails({
    prefix: PREFIX,
    suffix: VERSION,
    precache: 'precache',
    runtime: 'runtime'    
});

// 提前缓存
// workbox.precaching.precacheAndRoute([{ url: '/offline.html' }]);

self.addEventListener('install', event => {
    const hostRE = /^https:\/\/[^?]*\.hw1228\.com/;
    if (hostRE.test(self.location.host)) {
        const urls = ['/', '/#/index'];
        event.waitUntil(caches.open(PAGE_CACHE).then(cache => cache.addAll(urls)));
    }
});

// 主站域名下的资源
const urlRE = /^https:\/\/[^?]*\.hw1228\.com/;
self.addEventListener('fetch', event => {
    const request = event.request;
    const eccpet = event.request.headers.get('accept');
    if (request.method === 'GET' && urlRE.test(request.url)) {

        // 如果网站离线，进入到离线模式
        if (!that.navigator.onLine && request.url.indexOf('offline') < 0 && request.headers.get('accept').indexOf('text/html') !== -1) {
            // read the cache, if the cache is not exist, return the offline.html as a result.
            return event.respondWith(
                caches.open(PAGE_CACHE).then(function(cache) {
                    return cache.match(request).then(function(response) {

                        if (response) {
                            return response;
                        } else {
                            return caches.open(workbox.core.cacheNames.precache).then(function (cache) {
                                // return cache.match('/offline.html');
                            });
                        }
                    });
                })
            );
        }

        // html文件是解决问题的入口，一定要保证NetworkFirst
        // 如果网站在线，使用workbox默认的缓存策略处理。
        if(eccpet.indexOf('text/html') !== -1 || eccpet.indexOf('image/') !== -1 || eccpet.indexOf('text/css') !== -1 || request.url.match(/\.js/)){
            const NetworkFirst = new workbox.strategies.NetworkFirst({
                cacheName: PAGE_CACHE,
                plugins: [
                    new workbox.expiration.Plugin({
                        // 最多缓存文件个数
                        maxEntries: 100,
                        // 过期时间
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                        // 空间不足自动清除
                        purgeOnQuotaError: true
                    })
                ]
            });

            event.respondWith(NetworkFirst.handle({ event }));
        }
    }
});

// 静态资源
workbox.routing.registerRoute(
//   new RegExp('^https:\/\/(?:(?:static)|(?:cdnimg))\.hw1228\.com'),
  new RegExp('^https:\/\/www\.hw1228\.com\/(?:(?:img)|(?:thumbImg)|(?:js)|(?:css))\/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: STATIC_CACHE,
    plugins: [
      new workbox.expiration.Plugin({
        // 最多缓存文件个数
        maxEntries: 60,
        // 过期时间
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // 空间不足自动清除
        purgeOnQuotaError: true
      })
    ]
  })
);


// // 第三方js
// workbox.routing.setDefaultHandler(({url, event}) => {
//     const thiredParty = new workbox.strategies.StaleWhileRevalidate({
//         cacheName: STATIC_CACHE_OTHER,
//         plugins: [
//             new workbox.expiration.Plugin({
//                 // 最多缓存文件个数
//                 maxEntries: 60,
//                 // 过期时间
//                 maxAgeSeconds: 7 * 24 * 60 * 60,
//                 // 空间不足自动清除
//                 purgeOnQuotaError: true
//             })
//         ]
//     });

//     const urlmatch = url.href.match(/^https:\/\/\S*?(?=(?:\?|$))/);

//     if(urlmatch && urlmatch[0].match(/\.js/) && !urlmatch[0].match(/\.json/) && !url.href.match(/swdebug=true/)) {
//         // console.log(url);
//         event.respondWith(thiredParty.handle({ event }));
//     }
// });
