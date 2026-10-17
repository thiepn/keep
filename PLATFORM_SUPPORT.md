# Platform Support Matrix — KeepNotes v1.0.0

This document defines the verified platform targets, capabilities, and distribution channels for **KeepNotes 1.0.0**.

---

## Supported Operating Systems & Browsers

| Platform Target | Runtime Engine | Verified Version | Stable Core Capabilities | Distribution / Packaging |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Chromium** | Chrome, Edge, Brave, Arc | 120+ | All PKM, OS domains, Git sync, encryption, local canvas | Static Web / PWA / Standalone |
| **Desktop Firefox** | Gecko / Firefox Desktop | 120+ | All PKM, OS domains, Git sync, encryption, local canvas | Static Web / PWA |
| **Desktop Safari** | WebKit / macOS Sonoma+ | 17+ | All PKM, OS domains, Git sync, encryption, local canvas | Static Web / PWA |
| **Mobile Android** | Chrome Android / WebView | Android 11+ | 44px+ touch targets, single-hand bottom nav, offline caching | PWA / Responsive Web |
| **Mobile iOS** | Safari Mobile / iOS WebKit | iOS 16+ | Touch gestures, safe-area insets, offline storage | PWA / Add to Home Screen |
| **Static Deployment** | GitHub Pages / Cloud CDN | Any HTTP/2 Host | Client-side routing, zero backend required | Static `dist/` build |

---

## Offline Storage & Persistence Architecture

- **Primary Database:** IndexedDB (Dexie / Native IDB) for fast reactive indexing and metadata storage.
- **File System:** Lightning-FS / Virtual File System for local Git repositories and attachment blobs.
- **Backup & Portability:** Non-destructive zip/json exports with FNV-1a deterministic checksum validation.
- **Vault Encryption:** AES-GCM-256 with PBKDF2 (100,000 iterations) key derivation in Web Crypto API.
