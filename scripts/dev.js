const { exec } = require("child_process");
const chokidar = require("chokidar");
const fs = require("fs-extra");

// Run initial build
exec("npm run build", (error) => {
  if (error) {
    console.error(`Error during build: ${error}`);
    return;
  }
  console.log("Initial build completed");
  // Send message to reload extension
  chrome.runtime.sendMessage({ type: "RELOAD_EXTENSION" });
});

// Watch for changes
const watcher = chokidar.watch(["src/**/*", "public/**/*"], {
  ignored: /(^|\/)\..|node_modules/,
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  exec("npm run build", (error) => {
    if (error) {
      console.error(`Error during rebuild: ${error}`);
      return;
    }
    console.log("Rebuild completed");
    // Send message to reload extension
    chrome.runtime.sendMessage({ type: "RELOAD_EXTENSION" });
  });
});
