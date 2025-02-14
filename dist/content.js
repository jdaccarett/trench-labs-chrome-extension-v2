import{f as s,j as r,T as i}from"./assets/index.DzT4XALH.js";const e=document.createElement("div");e.id="trench-token-analyzer-host";document.body.appendChild(e);const o=e.attachShadow({mode:"open"}),t=document.createElement("div");t.id="trench-token-analyzer";o.appendChild(t);const d=document.createElement("style");d.textContent=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }

  .fixed { position: fixed; }
  .bottom-8 { bottom: 2rem; }
  .right-8 { right: 2rem; }
  .z-40 { z-index: 40; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-end { align-items: flex-end; }
  .space-y-4 > * + * { margin-top: 1rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .bg-white { background-color: white; }
  .rounded-lg { border-radius: 0.5rem; }
  .p-4 { padding: 1rem; }
`;o.appendChild(d);const m=s(t);m.render(r.jsx(i,{className:"tempo-6dbdb877-7e9b-593d-9d6d-2507b1b9b7b8 ",tempoelementid:"tempo-6dbdb877-7e9b-593d-9d6d-2507b1b9b7b8"}));chrome.runtime.onMessage.addListener((n,l,a)=>{n.message==="TabUpdated"&&a({status:"ok"})});
