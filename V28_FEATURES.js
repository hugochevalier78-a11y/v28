/* VestiairePro v28.5 — reliable seller center */
(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const money=v=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v);
  const value=id=>{const el=document.getElementById(id); if(!el)return 0; const raw=String(el.value||'').trim().replace(/€/g,'').replace(/\s/g,'').replace(',','.'); const n=parseFloat(raw); return Number.isFinite(n)?n:0};

  function calculate(){
    const buy=value('vpBuy'), sell=value('vpSell');
    const fees=sell*0.05, profit=sell-buy-fees;
    const margin=sell?profit/sell*100:0, roi=buy?profit/buy*100:0;
    const result=$('#vpResult');
    if(!result)return;
    const vals=[money(profit),margin.toFixed(1)+'%',money(fees),roi.toFixed(1)+'%'];
    result.querySelectorAll('strong').forEach((el,i)=>el.textContent=vals[i]||'0');
    const prices=$('#vpPrices');
    if(prices) prices.innerHTML='<div><span>🚀</span><small>Rapide</small><b>'+money(sell*.88)+'</b></div><div><span>🎯</span><small>Conseillé</small><b>'+money(sell)+'</b></div><div><span>♛</span><small>Haut</small><b>'+money(sell*1.15)+'</b></div>';
    result.classList.remove('vp28-pop'); void result.offsetWidth; result.classList.add('vp28-pop');
  }

  function render(){
    let o=$('#vp28Overlay');
    if(o){o.classList.add('open');return}
    o=document.createElement('div'); o.id='vp28Overlay'; o.className='vp28-overlay';
    o.innerHTML='<div class="vp28-modal"><div class="vp28-head"><div><div class="vp28-brand"><span>✦</span> VESTIAIRE<span>PRO</span></div><h2>Centre vendeur</h2><p>Ton espace de pilotage intelligent</p></div><div class="vp28-online"><i></i> En ligne</div><button type="button" class="vp28-close" data-close>×</button></div><div class="vp28-tabs"><button type="button" class="on" data-p="assistant">⌁ <span>Assistant</span></button><button type="button" data-p="profit">▥ <span>Statistiques</span></button><button type="button" data-p="alerts">♧ <span>Alertes</span></button><button type="button" data-p="tools">✦ <span>Outils</span></button></div><div id="vp28Body"></div></div>';
    document.body.appendChild(o);
    o.addEventListener('click',e=>{
      const close=e.target.closest('[data-close]');
      if(close||e.target===o)o.classList.remove('open');
      const tab=e.target.closest('[data-p]');
      if(tab){o.querySelectorAll('[data-p]').forEach(x=>x.classList.remove('on'));tab.classList.add('on');show(tab.dataset.p)}
      if(e.target.closest('#vpCalc')){e.preventDefault();calculate()}
    });
    o.classList.add('open'); show('assistant');
  }

  function show(p){
    const b=$('#vp28Body'); if(!b)return;
    if(p==='assistant'){
      b.innerHTML='<div class="vp28-title"><div><h3>Calculateur de marge</h3><p>Calcule rapidement ton bénéfice potentiel</p></div><span class="vp28-chip">⚙ Frais 5%</span></div><div class="vp28-card"><div class="vp28-inputs"><label>Prix d’achat<input id="vpBuy" inputmode="decimal" placeholder="0,00"></label><label>Prix de vente<input id="vpSell" inputmode="decimal" placeholder="0,00"></label></div><button type="button" class="vp28-primary" id="vpCalc"><b>ϟ</b> Calculer</button><div class="vp28-kpis" id="vpResult"><div><small>Profit</small><strong>0,00 €</strong></div><div><small>Marge</small><strong>0%</strong></div><div><small>Frais (5%)</small><strong>0,00 €</strong></div><div><small>ROI</small><strong>0%</strong></div></div></div><h3 class="vp28-section">✦ Prix rapides</h3><div class="vp28-prices" id="vpPrices"><div><span>🚀</span><small>Rapide</small><b>0,00 €</b></div><div><span>🎯</span><small>Conseillé</small><b>0,00 €</b></div><div><span>♛</span><small>Haut</small><b>0,00 €</b></div></div><div class="vp28-tip"><span>💡</span><div><b>Astuce</b><p>Teste plusieurs prix pour trouver le meilleur équilibre entre marge et vitesse de vente.</p></div></div>';
    }else if(p==='profit'){
      b.innerHTML='<div class="vp28-title"><div><h3>Statistiques vendeur</h3><p>Résumé de ton activité</p></div></div><div class="vp28-kpis vp28-big"><div><small>Chiffre d’affaires</small><strong>0,00 €</strong></div><div><small>Ventes</small><strong>0</strong></div><div><small>Frais estimés</small><strong>0,00 €</strong></div><div><small>Net estimé</small><strong>0,00 €</strong></div></div><div class="vp28-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
    }else if(p==='alerts'){
      b.innerHTML='<div class="vp28-title"><div><h3>Alertes</h3><p>Points à surveiller sur ton activité</p></div></div><div class="vp28-alert"><span>✓</span><div><b>Aucune alerte critique</b><p>Le centre est prêt à analyser ton activité.</p></div></div>';
    }else{
      b.innerHTML='<div class="vp28-title"><div><h3>Outils vendeur</h3><p>Des raccourcis pour gagner du temps</p></div></div><div class="vp28-tools"><button type="button" data-tool-assistant>✦ Ouvrir l’assistant</button><button type="button" data-close>× Fermer le centre</button></div>';
    }
  }

  function style(){
    if($('#vp28Style'))return;
    const s=document.createElement('style');s.id='vp28Style';s.textContent='.vp28-overlay{position:fixed;inset:0;background:rgba(0,4,8,.72);backdrop-filter:blur(18px);z-index:9999;display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s}.vp28-overlay.open{opacity:1;pointer-events:auto}.vp28-modal{width:min(760px,100%);max-height:92vh;overflow:auto;background:linear-gradient(145deg,#10242b,#050b10);border:1px solid rgba(32,224,194,.25);border-radius:28px 28px 0 0;padding:22px;color:#edf6f5;box-shadow:0 -20px 100px rgba(0,0,0,.6),0 0 70px rgba(32,224,194,.1);transform:translateY(35px);transition:transform .4s}.vp28-overlay.open .vp28-modal{transform:none}.vp28-head{position:relative;padding-right:100px}.vp28-brand{font:10px monospace;letter-spacing:1.4px;color:#8e9ca7}.vp28-brand span{color:#20e0c2}.vp28-head h2{font:800 25px Syne,sans-serif;margin:5px 0 2px}.vp28-head p{font-size:12px;color:#71808c}.vp28-online{position:absolute;right:48px;top:0;padding:8px 11px;border-radius:999px;background:rgba(32,224,194,.08);border:1px solid rgba(32,224,194,.18);font-size:11px;color:#20e0c2}.vp28-online i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#20e0c2;box-shadow:0 0 10px #20e0c2;animation:vpPulse 1.8s infinite}.vp28-close{position:absolute;right:0;top:0;width:36px;height:36px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.035);color:#b8c2ca;font-size:22px;cursor:pointer}.vp28-tabs{display:flex;gap:7px;margin:22px 0 20px;padding:5px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.06);border-radius:17px}.vp28-tabs button{flex:1;white-space:nowrap;border:0;background:transparent;color:#80909e;border-radius:13px;padding:10px 12px;cursor:pointer}.vp28-tabs button.on{color:#20e0c2;background:rgba(32,224,194,.13);box-shadow:inset 0 0 0 1px rgba(32,224,194,.2)}.vp28-title{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:14px}.vp28-title h3{font:800 21px Syne,sans-serif;margin:0 0 4px}.vp28-title p{font-size:12px;color:#72818d}.vp28-chip{padding:9px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);font-size:11px}.vp28-card{padding:16px;border:1px solid rgba(32,224,194,.14);background:rgba(32,224,194,.035);border-radius:20px}.vp28-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px}.vp28-inputs label{font-size:12px;color:#9aa8b3}.vp28-inputs input{box-sizing:border-box;display:block;width:100%;margin-top:7px;background:#02070b;border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:14px;color:#fff;font-size:16px;outline:0}.vp28-inputs input:focus{border-color:#20e0c2;box-shadow:0 0 0 3px rgba(32,224,194,.1),0 0 25px rgba(32,224,194,.08)}.vp28-primary{width:100%;margin:14px 0;padding:14px;border:0;border-radius:14px;background:linear-gradient(100deg,#20d8c0,#08bfa7,#20e0c2);background-size:200%;color:#03100e;font-size:15px;font-weight:900;cursor:pointer;animation:vpGradient 4s ease infinite}.vp28-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.vp28-kpis>div{background:rgba(5,12,18,.8);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:12px}.vp28-kpis small{display:block;color:#71808c;font-size:10px}.vp28-kpis strong{display:block;margin-top:5px;color:#20e0c2;font:800 18px Syne,sans-serif}.vp28-section{font:800 16px Syne,sans-serif;margin:22px 0 10px}.vp28-prices{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.vp28-prices>div{padding:13px;border-radius:15px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07)}.vp28-prices span,.vp28-prices small,.vp28-prices b{display:block}.vp28-prices small{color:#7d8b97}.vp28-tip,.vp28-alert{display:flex;gap:12px;margin-top:12px;padding:14px;border-radius:16px;background:rgba(32,224,194,.055);border:1px solid rgba(32,224,194,.16)}.vp28-tip p,.vp28-alert p{margin-top:4px;color:#82919d;font-size:11px}.vp28-wave{height:100px;display:flex;align-items:center;gap:7px;margin-top:18px}.vp28-wave i{flex:1;border-radius:99px;background:linear-gradient(180deg,#20e0c2,rgba(32,224,194,.08));animation:vpWave 1.2s ease-in-out infinite alternate}.vp28-wave i:nth-child(1){height:30%}.vp28-wave i:nth-child(2){height:65%}.vp28-wave i:nth-child(3){height:40%}.vp28-wave i:nth-child(4){height:85%}.vp28-wave i:nth-child(5){height:55%}.vp28-wave i:nth-child(6){height:72%}.vp28-wave i:nth-child(7){height:35%}.vp28-wave i:nth-child(8){height:62%}.vp28-wave i:nth-child(9){height:44%}.vp28-wave i:nth-child(10){height:78%}.vp28-tools{display:grid;grid-template-columns:1fr 1fr;gap:10px}.vp28-tools button{padding:15px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);color:#dce7e6;cursor:pointer}@keyframes vpGradient{0%,100%{background-position:0%}50%{background-position:100%}}@keyframes vpWave{from{transform:scaleY(.75);opacity:.65}to{transform:scaleY(1.05);opacity:1}}@keyframes vpPulse{50%{opacity:.4;box-shadow:0 0 4px #20e0c2}}@keyframes vpPop{from{opacity:.3;transform:scale(.98)}to{opacity:1;transform:none}}.vp28-pop{animation:vpPop .35s ease}@media(max-width:600px){.vp28-inputs,.vp28-kpis{grid-template-columns:1fr 1fr}.vp28-prices{grid-template-columns:1fr}.vp28-modal{padding:18px}}';document.head.appendChild(s);
  }

  window.VestiaireProFeatures={openAssistant:render,calculate};
  style();
  document.addEventListener('DOMContentLoaded',style);
  window.addEventListener('load',style);
})();