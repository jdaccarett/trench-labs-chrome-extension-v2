import React from "react";
import { createRoot } from "react-dom/client";
import TokenAnalyzer from "./components/token-analyzer/TokenAnalyzer";
import "./index.css";

// Create a shadow DOM container
const hostElement = document.createElement("div");
hostElement.id = "trench-labs-root-host";
document.body.appendChild(hostElement);

const shadowRoot = hostElement.attachShadow({ mode: "open" });

// Create container inside shadow DOM
const container = document.createElement("div");
container.id = "trench-labs-root";
shadowRoot.appendChild(container);

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
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
  .grid { display: grid; }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gap-4 { gap: 1rem; }
  .gap-2 { gap: 0.5rem; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .text-gray-500 { color: #6b7280; }
  .text-gray-700 { color: #374151; }
  .text-red-800 { color: #991b1b; }
  .bg-red-100 { background-color: #fee2e2; }
  .bg-blue-500 { background-color: #3b82f6; }
  .hover\:bg-blue-600:hover { background-color: #2563eb; }
  .hover\:bg-gray-50:hover { background-color: #f9fafb; }
  .text-white { color: white; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .px-2\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
  .py-0\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mt-4 { margin-top: 1rem; }
  .w-\[400px\] { width: 400px; }
  .max-w-\[90vw\] { max-width: 90vw; }
  .max-h-\[90vh\] { max-height: 90vh; }
  .overflow-y-auto { overflow-y: auto; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .inline-flex { display: inline-flex; }
  .rounded-full { border-radius: 9999px; }
  .rounded-md { border-radius: 0.375rem; }
  .border { border-width: 1px; }
  .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  .h-4 { height: 1rem; }
  .w-4 { width: 1rem; }
`;
shadowRoot.appendChild(styleSheet);

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
