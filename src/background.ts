chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "RELOAD_EXTENSION") {
    chrome.runtime.reload();
  }
});
