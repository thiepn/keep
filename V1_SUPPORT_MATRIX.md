# PKM V1.x Support Matrix & Platform Capabilities

**Version:** 1.10.0  
**Effective Date:** September 2026  

---

## 1. Platform Tier Classification

| Platform | Tier | Status | Primary Input | Storage Engine |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Web (Chrome / Edge / Firefox / Safari)** | **Tier 1 (Full)** | Fully Certified | Keyboard + Pointer | IndexedDB / OPFS / LocalStorage |
| **Desktop PWA (Chromium / macOS / Windows / Linux)** | **Tier 1 (Full)** | Fully Certified | Full Keyboard Shortcuts | IndexedDB / File System Access API |
| **Mobile Web (iOS Safari / Android Chrome)** | **Tier 2 (Supported)**| Fully Certified | Touch + Virtual Keyboard | IndexedDB / LocalStorage |
| **Mobile PWA (Standalone iOS / Android)** | **Tier 2 (Supported)**| Fully Certified | Touch + Gestures | IndexedDB / Service Worker Cache |
| **Legacy / Restricted Browser Environments** | **Tier 3 (Degraded)** | Graceful Fallback | Standard Touch / Click | Fallback in-memory session |

---

## 2. Platform Feature Support Grid

| Feature Area | Desktop Web / PWA | Mobile Web / PWA | Fallback Behavior |
| :--- | :--- | :--- | :--- |
| **Zero-Knowledge Encrypted Vaults** | Supported (WebCrypto) | Supported (WebCrypto) | Password required on unlock |
| **Keyboard-Only Traversal (13-Step)** | Supported | Partial (Touch primary) | Standard UI buttons visible |
| **File System Directory Sync** | Supported (Chromium) | Read/Write Encrypted File | Manual Import / Export `.vault` |
| **Local AI Embeddings (Transformers.js)** | Supported (WASM/SIMD) | Supported (Memory guarded) | Exact tokenized BM25 search |
| **Plugin Sandbox** | Supported (Iframe/Worker) | Experimental | Core tools always available |
| **Full Encrypted Backup (.vault)** | Supported | Supported | Direct browser file download |
| **Plaintext Markdown Export (.zip)** | Supported | Supported | Compressed archive download |

---

## 3. Keyboard Navigation Contract

The application certifies full keyboard-only traversal without requiring a mouse or pointer:

1. `Ctrl+N` / `Cmd+N`: Create new note
2. `Ctrl+O` / `Cmd+O`: Open Quick Switcher
3. `Ctrl+P` / `Cmd+P`: Open Command Palette
4. `Ctrl+F` / `/`: Focus Global Search
5. `Ctrl+Shift+F`: Focus Full Vault Filter
6. `Escape`: Close modal and restore focus to trigger element
7. `Tab` / `Shift+Tab`: Predictable DOM focus cycling
