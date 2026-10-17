# PKM V1.10 Master Quality Ledger

**Audit Date:** September 2026  
**Audited Release Range:** V1.0 to V1.9  
**Final Release:** V1.10 Final V1.x Consolidation  

---

## 1. Quality Metric Summary

- **Total Audited Ledger Items:** 12
- **S0 (Critical Blockers):** 0
- **S1 (High Severity):** 0
- **S2 (Medium Quality/UX Friction):** 6 (All resolved in V1.10, or documented as known limitations)
- **S3 (Low / Polish):** 6 (Resolved or categorized as experimental/known limits)
- **Release Status:** **READY FOR RELEASE (Zero Stable Core Blockers)**

---

## 2. Master Item Register

| ID | Area | Severity | Frequency | First Seen | Root Cause | V1.10 Action / Resolution | Final Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MQL-001** | Home & Context | S2 | Med | V1.1 | Duplicate item rendering when tasks have both scheduled and due dates. | Unified item deduplication hash in Home & Attention rendering pipeline. | `resolved_v1_10` |
| **MQL-002** | Search & Navigation | S2 | Med | V1.6 | Blurred entrypoint boundaries between Quick Switcher and Command Palette. | Enforced strict triad rule: Search = find content, Switcher = jump, Palette = execute action. | `resolved_v1_10` |
| **MQL-003** | Planning & Calendar | S2 | Med | V1.3 | Year-boundary (Dec 31 -> Jan 1) and leap day recurrence shift. | Added ISO-8601 year boundary and leap day normalization in temporal engine. | `resolved_v1_10` |
| **MQL-004** | Core Architecture | S2 | Med | V1.4 | Unbounded AST cache growth over 30+ days continuous use. | Bounded all AST and query caches with strict LRU caps in central `CacheRegistry`. | `resolved_v1_10` |
| **MQL-005** | Accessibility | S2 | Med | V1.5 | Focus not returned to trigger element when closing modals via Escape. | Added focus trap and origin trigger restoration across all modal shells. | `resolved_v1_10` |
| **MQL-006** | Sync & Storage | S2 | Low | V1.2 | Tombstones accumulating indefinitely without automated compaction. | Introduced bounded 90-day tombstone compaction in task coordinator. | `resolved_v1_10` |
| **MQL-007** | Sync & Storage | S2 | Low | V1.2 | Multi-user simultaneous live typing requires CRDT server infrastructure. | Retained as documented single-user local-first limitation. 3-way merge is certified. | `v2_candidate` |
| **MQL-008** | Plugins & Ecosystem | S3 | Low | V1.5 | Mobile browser sandbox restricts eval/Worker spawning on strict iOS. | Marked mobile plugin execution as Experimental; desktop/web remain fully sandboxed. | `experimental` |
| **MQL-009** | Editor & Markdown | S3 | Rare | V1.0 | Monolithic Markdown files >10MB (100k+ lines) cause layout recalculation spikes. | Documented as known limitation. Advise breaking 100k-line documents into sub-notes. | `known_limitation` |
| **MQL-010** | AI & Intelligence | S3 | Low | V1.4 | Disparate AI entrypoints across sub-panels with inconsistent source scoping. | Consolidated all AI actions behind explicit Ask Vault modal with source scoping. | `resolved_v1_10` |
| **MQL-011** | Backup & Export | S3 | Med | V1.8 | Terminology confusion between Encrypted Backup (.vault) vs Markdown Export (.zip). | Separated UI panels with distinct visual badges and copy in Export Center. | `resolved_v1_10` |
| **MQL-012** | Personal Domains | S3 | Low | V1.6 | Legacy term "Smart View" still used in certain headers instead of "Saved View". | Audited and updated all UI strings, types, and docs to standard "Saved View". | `resolved_v1_10` |
