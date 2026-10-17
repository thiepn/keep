# Personal OS — Technical Architecture Map (V1.9)

## 1. System Overview
The Personal Knowledge Management (PKM) / Personal Operating System application is a 100% offline-first, client-side progressive web and desktop platform. It enforces zero remote telemetry, local-first zero-trust encryption, and strict modularity across specialized productivity domains.

```
┌─────────────────────────────────────────────────────────────┐
│                       Presentation                          │
│  Workspace, Sidebar, Modals, Editor, Home Lens, Canvas, UI  │
├─────────────────────────────────────────────────────────────┤
│                    Application / Actions                    │
│   Command Registry, Action Registry, Shortcut Dispatcher    │
├─────────────────────────────────────────────────────────────┤
│                      Domain Services                        │
│   Notes, Tasks, Temporal, People, Reference, Finance, etc.  │
├─────────────────────────────────────────────────────────────┤
│                Core Architecture & Scheduler                │
│ Task Coordinator, Bounded Caches, Resource Registry, Logger │
├─────────────────────────────────────────────────────────────┤
│                   Storage & Infrastructure                  │
│    IndexedDB, LocalStorage, Memory, Serializers, Crypto     │
└─────────────────────────────────────────────────────────────┘
```

## 2. Canonical Data vs. Derived Indexes

| Domain | Canonical Storage | Serializer / Format | Derived Caches & Indexes | Invalidation Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Notes & Frontmatter** | IndexedDB (`notes`) | Markdown + YAML frontmatter | Lexical BM25 Index, Backlinks Map, Unlinked Mentions | Incremental per note edit |
| **Tasks** | Embedded in Note content | GFM Markdown task tokens (`- [ ]`) | Temporal Index, Agenda Groups | Re-parsed per note update |
| **People / Contacts** | IndexedDB (`people`) | Structured JSON | People Relations Graph | Rebuild on contact edit |
| **References** | IndexedDB (`references`) | BibTeX / CSL-JSON | Citation Index | Incremental |
| **Finance** | IndexedDB (`finance`) | Ledger JSON / RFC 4180 CSV | Monthly Net Worth & Category Summaries | Recomputed on transaction write |
| **Spatial Canvas** | IndexedDB (`canvas`) | Infinite Canvas Node Graph | Geometric Collision Spatial Index | On node drag / transform |

## 3. Worker & Background Scheduling
Compute-intensive jobs (index rebuilds, large exports, full-vault migrations) are scheduled through `TaskCoordinator`:
- **Priority Tiers**: `interactive-high` > `interactive-normal` > `background` > `maintenance`
- **Cooperative Yielding**: Background tasks yield execution using `requestIdleCallback` (fallback `setTimeout(0)`) to maintain 60fps main-thread responsiveness.
- **Cancellation**: Every asynchronous operation accepts an `AbortSignal`.
- **Stale Rejection**: Results are tagged with sequence IDs to prevent stale overwrites.

## 4. Bounded Memory Caches
- All in-memory derived stores are managed by `cacheRegistry` with LRU limits.
- **Sensitive Purging**: Decrypted data stores are zeroed immediately on vault lock (`cacheRegistry.onVaultLock()`).
- **Safe Rebuilds**: Derived caches are cleanly purgeable via `Clear Rebuildable Data` without touching canonical user content.
