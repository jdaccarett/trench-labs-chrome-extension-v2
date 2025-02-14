# Solana Meme Trading Assistant Extension

A Chrome extension for real-time trading signals and analytics for Solana meme coins.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server with hot reload:
```bash
npm run dev:ext
```

3. Load the extension in Chrome:
- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode" in the top right
- Click "Load unpacked" and select the `dist` folder

The extension will automatically reload when you make changes to the code.

## Building for Production

```bash
npm run build
```

The built extension will be in the `dist` folder, ready to be packaged and published to the Chrome Web Store.
