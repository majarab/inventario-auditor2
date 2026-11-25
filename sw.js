const C='cp-v2',U=['./','./index.html','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js','https://cdn.jsdelivr.net/npm/mqtt@5.10.1/dist/mqtt.min.js'];
const put=(q,x)=>{const k=x.clone();caches.open(C).then(c=>c.put(q,k));return x};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(U.map(u=>c.add(u).catch(()=>0)))))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||!q.url.startsWith('http'))return;
const same=new URL(q.url).origin===location.origin;
e.respondWith(same?fetch(q).then(x=>put(q,x)).catch(()=>caches.match(q)):caches.match(q).then(r=>r||fetch(q).then(x=>put(q,x))))});
