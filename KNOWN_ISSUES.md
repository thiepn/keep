# Known Issues & Boundaries — KeepNotes v1.0.0

This document records the exact boundaries, known trade-offs, and experimental feature limitations for **KeepNotes 1.0.0**.

---

## 1. Experimental Feature Scope

The following capabilities are included as **Experimental** or **Opt-In** to safeguard core PKM stability:

1. **P2P Direct WebRTC Sync:**
   - *Status:* Experimental.
   - *Limitation:* Direct peer discovery relies on public STUN servers and may fail behind restrictive corporate Symmetric NAT configurations. Users requiring guaranteed synchronization should use Git or Local Portable Backups.

2. **In-Browser Local LLM Transformers:**
   - *Status:* Experimental / Optional.
   - *Limitation:* In-browser transformer execution (`@xenova/transformers`) requires downloading ~100MB+ model weights into IndexedDB cache. Recommended for devices with 8GB+ RAM.

3. **External Cloud Connectors (Google Calendar / Workspace):**
   - *Status:* Opt-In Integration.
   - *Limitation:* Operates strictly as an external source-of-truth reader. Disconnecting an external integration preserves all imported local notes.

---

## 2. Platform Boundaries

1. **Browser Storage Quota:**
   - In rare cases where disk space is low, mobile browsers may request storage cleanup. Users are encouraged to keep regular portable backups (`.zip` exports) via the Settings panel.
2. **File System Access API in Firefox/Safari:**
   - Firefox and Safari do not support direct native directory binding via the Chromium File System Access API; portable backup downloads and file picker imports are used seamlessly as the verified cross-platform standard.
