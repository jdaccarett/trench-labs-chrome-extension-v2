chrome.runtime.onMessage.addListener((e,n,r)=>{e.type==="RELOAD_EXTENSION"&&chrome.runtime.reload()});
