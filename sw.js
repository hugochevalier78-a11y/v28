// VestiairePro v28.6 — network first + premium UI + assistant FAB
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  event.respondWith((async()=>{
    try{
      const res=await fetch(req);
      const type=res.headers.get('content-type')||'';
      const path=new URL(req.url).pathname;
      if(type.includes('text/html')&&(path==='/'||path.endsWith('/index.html'))){
        const text=await res.text();
        const injected=text
          .replace('</head>','<link rel="stylesheet" href="./GLOWUP_PREVIEW.css?v=28.6"></head>')
          .replace('</body>','<script src="./V28_FEATURES.js?v=28.6"></script><script>(function(){function boot(){if(document.getElementById("vpAssistantFab"))return;var b=document.createElement("button");b.id="vpAssistantFab";b.type="button";b.setAttribute("aria-label","Ouvrir l’assistant");b.innerHTML="<span>✦</span>";b.onclick=function(){if(window.VestiaireProFeatures&&window.VestiaireProFeatures.openAssistant)window.VestiaireProFeatures.openAssistant();};var s=document.createElement("style");s.textContent="#vpAssistantFab{position:fixed;right:22px;bottom:92px;width:62px;height:62px;border:1px solid rgba(32,224,194,.55);border-radius:20px;background:linear-gradient(145deg,#20e0c2,#0db99f);color:#03100e;display:flex;align-items:center;justify-content:center;font-size:27px;cursor:pointer;z-index:10000;box-shadow:0 0 0 1px rgba(32,224,194,.08),0 12px 35px rgba(0,0,0,.42),0 0 35px rgba(32,224,194,.28);animation:vpFabFloat 3s ease-in-out infinite;transition:transform .25s ease,box-shadow .25s ease}#vpAssistantFab:before{content:\"\";position:absolute;inset:-9px;border-radius:27px;border:1px solid rgba(32,224,194,.18);animation:vpFabRing 2.2s ease-out infinite}#vpAssistantFab:after{content:\"\";position:absolute;inset:0;border-radius:20px;background:linear-gradient(115deg,transparent 25%,rgba(255,255,255,.35) 50%,transparent 75%);transform:translateX(-120%);animation:vpFabShine 3.2s ease-in-out infinite}#vpAssistantFab span{position:relative;z-index:2;text-shadow:0 0 12px rgba(0,0,0,.18)}#vpAssistantFab:hover{transform:translateY(-5px) scale(1.05);box-shadow:0 18px 45px rgba(0,0,0,.5),0 0 48px rgba(32,224,194,.42)}#vpAssistantFab:active{transform:scale(.94)}@keyframes vpFabFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes vpFabRing{0%{transform:scale(.82);opacity:.65}75%,100%{transform:scale(1.22);opacity:0}}@keyframes vpFabShine{0%,45%{transform:translateX(-120%)}70%,100%{transform:translateX(120%)}}@media(max-width:600px){#vpAssistantFab{right:16px;bottom:82px;width:58px;height:58px;border-radius:18px;font-size:25px}}";document.head.appendChild(s);document.body.appendChild(b)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();})();</script></body>');
        const headers=new Headers(res.headers);
        headers.delete('content-length');
        headers.delete('content-encoding');
        return new Response(injected,{status:res.status,statusText:res.statusText,headers});
      }
      return res;
    }catch(e){return caches.match(req);}
  })());
});
