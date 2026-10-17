# PKM V2.4 — Data Lifecycle & Retention Architecture

## Data Classification

| Class | Examples | Retention Policy | Rebuildable? | Sync Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Canonical Domain Data** | Notes, Tasks, Reviews, Routines, Transactions, Decisions | Retained permanently until explicit user deletion | No (Authoritative) | Full encrypted sync |
| **Resource Revisions** | Document content history | Bounded LRU differential tree | No | Differential sync |
| **Semantic Activity** | Meaningful event log | Coalesced sessions retained permanently in compact index | Partially from logs | Deduplicated event sync |
| **Reliability / Audit Logs** | Sync logs, Automation runs, Migration history | Bounded FIFO (100–200 entries) | No | Device-local |
| **Derived Indexes / Caches** | Graph index, Temporal index, Activity index | Rebuildable in-memory structures | Yes (100% rebuildable) | Never synced (derived locally) |
| **Navigation & UI State** | Panes, scroll offset, cursor line, zoom level | Ephemeral device-local memory | Yes | Device-local |
