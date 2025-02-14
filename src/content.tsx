import React from "react";
import { createRoot } from "react-dom/client";
import TokenAnalyzer from "./components/token-analyzer/TokenAnalyzer";

// Create container for the analyzer
const container = document.createElement("div");
container.id = "trench-token-analyzer";
document.body.appendChild(container);

// Mount React component
const root = createRoot(container);
root.render(<TokenAnalyzer />);

// Listen for URL changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === "TabUpdated") {
    // The TokenAnalyzer component will handle the URL change internally
    sendResponse({ status: "ok" });
  }
});
