/* VestiairePro v28.6 — floating assistant button */
(function(){
  'use strict';
  function mount(){
    if(document.getElementById('vp28Float')) return;
    const b=document.createElement('button');
    b.id='vp28Float';
    b.type='button';
    b.setAttribute('aria-label','Ouvrir l’assistant VestiairePro');
    b.innerHTML='<span>✦</span>';
    b.addEventListener('click',function(){
      if(window.VestiaireProFeatures && typeof window.VestiaireProFeatures.openAssistant==='function'){
        window.VestiaireProFeatures.openAssistant();
      }else{
        const s=document.createElement('script');
        s.src='./V28_FEATURES.js?v=28.6';
        s.onload=function(){window.VestiaireProFeatures&&window.VestiaireProFeatures.openAssistant&&window.VestiaireProFeatures.openAssistant()};
        document.body.appendChild(s);
      }
    });
    const style=document.createElement('style');
    style.id='vp28FloatStyle';
    style.textContent=`#vp28Float{position:fixed;right:28px;bottom:92px;z-index:10000;width:64px;height:64px;border:1px solid rgba(32,224,194,.65);border-radius:22px;background:linear-gradient(145deg,#21e4c7,#0bbba6);color:#03110f;display:grid;place-items:center;cursor:pointer;box-shadow:0 0 0 1px rgba(32,224,194,.08),0 12px 35px rgba(0,0,0,.42),0 0 42px rgba(32,224,194,.32);animation:vpFloat 3s ease-in-out infinite;transition:transform .25s ease,box-shadow .25s ease,border-radius .25s ease}#vp28Float:before{content:'';position:absolute;inset:-10px;border:1px solid rgba(32,224,194,.18);border-radius:28px;animation:vpRing 2.2s ease-out infinite}#vp28Float:after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.38) 48%,transparent 65%);transform:translateX(-120%);animation:vpShine 3.2s ease-in-out infinite}#vp28Float span{position:relative;z-index:2;font-size:28px;font-weight:900;filter:drop-shadow(0 0 7px rgba(255,255,255,.5))}#vp28Float:hover{transform:translateY(-5px) scale(1.06);border-radius:26px;box-shadow:0 18px 45px rgba(0,0,0,.5),0 0 60px rgba(32,224,194,.5)}#vp28Float:active{transform:scale(.94)}@keyframes vpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@keyframes vpRing{0%{transform:scale(.8);opacity:.75}100%{transform:scale(1.35);opacity:0}}@keyframes vpShine{0%,55%{transform:translateX(-120%)}75%,100%{transform:translateX(120%)}}@media(max-width:700px){#vp28Float{right:16px;bottom:82px;width:58px;height:58px;border-radius:19px}}`;
    document.head.appendChild(style);
    document.body.appendChild(b);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
  window.addEventListener('load',mount);
})();
