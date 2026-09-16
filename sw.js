// VestiairePro v28 — network first + feature injection
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  event.respondWith((async()=>{
    try{
      const res=await fetch(req);
      const type=res.headers.get('content-type')||'';
      const path=new URL(req.url).pathname;
      if(type.includes('text/html') && (path==='/' || path.endsWith('/index.html'))){
        const text=await res.text();
        const injected=text
          .replace('</head>','<link rel="stylesheet" href="GLOWUP_PREVIEW.css"></head>')
          .replace('</body>','<script src="V28_FEATURES.js"></script></body>');
        return new Response(injected,{status:res.status,statusText:res.statusText,headers:res.headers});
      }
      return res;
    }catch(e){return caches.match(req);}
  })());
});
