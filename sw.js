const V='minha-ia-v2',F=['./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||u.origin!=location.origin)return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>{const n=fetch(e.request).then(r=>{if(r.ok)caches.open(V).then(x=>x.put(e.request,r.clone()));return r}).catch(()=>c||(e.request.mode=='navigate'?caches.match('./index.html'):undefined));return c||n}))});
