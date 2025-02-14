function u(s){const o=Math.floor(Date.now()/1e3)-s,n={year:31536e3,month:2592e3,day:86400,hour:3600,minute:60,second:1};if(o<0)return"just now";for(const[e,t]of Object.entries(n)){const c=Math.floor(o/t);if(c>=1)return`${c}${e.charAt(0)}`}return"just now"}async function d(s){if(!s)return console.log("[Background] No valid address to search."),null;try{const r=await fetch(`https://api.axiom.trade/v1/tokens/${s}`,{method:"GET",headers:{accept:"application/json"}});if(!r.ok)throw new Error(`API fetch failed with status: ${r.status}`);const o=await r.json();return{name:o.name,symbol:o.symbol,price:o.price,marketCap:o.marketCap,volume24h:o.volume24h,createdAt:o.createdAt,relativeTime:u(Math.floor(new Date(o.createdAt).getTime()/1e3))}}catch(r){return console.error("[Background] Error searching Axiom API:",r),null}}async function h(s){if(!s)return console.log("[Background] No valid address to search."),null;try{const r=await fetch("https://api-neo.bullx.io/v2/api/resolveTokensV2",{method:"POST",headers:{"Content-Type":"application/json",accept:"application/json"},body:JSON.stringify({name:"resolveTokensV2",data:{addresses:[s],chainId:"solana"}})});if(!r.ok)throw new Error(`API fetch failed with status: ${r.status}`);return(await r.json()).data[s]}catch(r){return console.error("[Background] Error searching BullX API:",r),null}}async function l(s){try{console.log("[Background] Fetching dev history for:",s);const r=await fetch(`https://api.solscan.io/account/tokens?address=${s}&limit=50`,{method:"GET",headers:{accept:"application/json"}});if(!r.ok)throw new Error(`Dev history fetch failed with status: ${r.status}`);const n=(await r.json()).data||[],e=n.length,t=n.filter(a=>a.tokenAmount.uiAmount>0).length,c=e>0?t/e*100:0;return{tokens:n,totalTokens:e,activeTokens:t,successRate:c.toFixed(1)}}catch(r){return console.error("[Background] Error fetching dev history:",r),null}}chrome.runtime.onMessage.addListener((s,r,o)=>{if(s.action==="getTokenData"){const n=s.tokenAddress;return(async()=>{try{const[e,t]=await Promise.all([d(n),h(n)]),c={address:n,name:(e==null?void 0:e.name)||(t==null?void 0:t.name),symbol:(e==null?void 0:e.symbol)||(t==null?void 0:t.symbol),price:(e==null?void 0:e.price)||(t==null?void 0:t.priceUSD),marketCap:(e==null?void 0:e.marketCap)||(t==null?void 0:t.marketCap),volume24h:(e==null?void 0:e.volume24h)||(t==null?void 0:t.volume24),createdAt:(e==null?void 0:e.createdAt)||(t==null?void 0:t.creationBlockTimestamp),riskStatus:(t==null?void 0:t.riskStatus)||"UNKNOWN",links:(t==null?void 0:t.links)||{}};o({success:!0,data:c})}catch(e){o({success:!1,error:e.message})}})(),!0}if(s.action==="getDevHistory"){const{creatorAddress:n}=s;return(async()=>{try{const e=await l(n);o({success:!0,data:{devHistory:e}})}catch(e){o({success:!1,error:e.message})}})(),!0}});chrome.tabs.onUpdated.addListener((s,r,o)=>{if(o.url){const n=o.url.includes("axiom.trade"),e=o.url.includes("bullx.io"),t=r.url,c=r.status==="complete";(n||e)&&(t||c)&&chrome.tabs.query({active:!0,currentWindow:!0},a=>{var i;((i=a[0])==null?void 0:i.id)===s&&chrome.tabs.sendMessage(s,{message:"TabUpdated",url:o.url,isAxiomPage:n,isBullXPage:e},m=>{chrome.runtime.lastError&&console.log("[Background] Message send attempt failed:",{error:chrome.runtime.lastError,tabId:s})})})}});
