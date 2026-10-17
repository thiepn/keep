## 2026-10-16 — KEEP B3 (local source only)

- Native original-source project and university/study desk, with area filter, project progress, linked knowledge and source tasks.
- Source-line guarded task due-date changes, next-14-day task/deadline/reminder preview, and real calendar/agenda navigation.
- Persisted multi-type discovery views using the existing saved-view manager (`keep-workspace`), including stable pin/export identities.
- Focused model tests 48/48 and B1b/B2 regressions pass. Full Vite/TSX and desktop/mobile browser acceptance blocked by missing dependencies. See `KEEP_B3_IMPLEMENTATION_REPORT.md`.

## 2026-10-16 — KEEP B1b (local source only)

- Source-owned universal pins, task block anchors, related-resource metadata, typed unconnected Folio/Calendar/Habits/Vault/Hub adapters, honest V2 sample replacement, native editor line navigation.
- Preserved all original content tables and identifiers; external data not accessed or mutated.
- B1b focused model suite 22/22 PASS, whole-app build/browser blocked by missing dependencies. See `KEEP_B1B_CONSOLIDATION_REPORT.md`.

# Changelog

All notable changes to **KeepNotes** are documented in this file.

---

## [1.1.0] - 2026-09-10 — UX Simplification, Performance & Everyday Quality

### UX & Workflow Simplification
- **Click-Count Reduction:** Streamlined Note Creation, Quick Capture (with inline tag parsing), and Task Completion down to 1-2 taps.
- **Calm, Deduplicated Home:** Integrated priority hierarchy (`Now` → `Focus` → `Continue` → `Attention` → `Today`) with duplicate task deduplication and auto-collapsing empty sections.
- **Domain-Focused Context Lenses:** Streamlined lens views for Projects, Courses, People, Travel, and Assets with zero noise.
- **Robust Resume Fallback:** Automatic fallback to Context Root when previously viewed sub-items are removed.

### Search & Command Palette
- **Ranked Search:** Prioritizes exact title matches and aliases before body content.
- **Natural Command Synonyms:** Resolves natural aliases (e.g., `preferences` for Settings, `daily` for Today).

### Performance & Memory
- **Bounded LRU Caches:** Enforced bounded capacity with automatic eviction on memory limits.
- **Faster Incremental Mutations:** p95 incremental mutation latency improved to `0.304 ms`.

### Upgrade Compatibility
- **Non-Destructive Upgrade:** Fully backward-compatible with V1.0 schema (Version 60) and 100% portable backup archive fidelity.

---

## [1.0.0] - 2026-09-10 — Stable Release

### Core Notes & Markdown
- **Markdown Editor:** Full GitHub Flavored Markdown (GFM), math formulas ($...$), syntax-highlighted code blocks, and outline TOC generation.
- **Wikilinks & Graph:** Bidirectional `[[Note Title]]`, `[[Note Title|Alias]]`, `[[Note Title#Heading]]`, and block transclusions.
- **Search & Indexing:** Sub-millisecond full-text note search, tag filters, and saved search queries.

### Planning & Context
- **Unified Context Engine:** Automatic passive context tracking and distraction-free Focus Mode.
- **Tasks & Agenda:** Today view, overdue alerts, schedule review, and recurring habit routines.

### Personal OS Modules
- **Personal Finance:** Double-entry ledger with cent-exact integer arithmetic preventing decimal drift.
- **People (CRM):** Interaction logs, contact affiliations, and relationship tracking.
- **Health & Fitness:** Exercise workouts, metrics, and dietary logs with sensitive-data protection.
- **Assets, Travel & Decisions:** Structured trackers for physical inventory, trip itineraries, and reflective decision logs.

### Security, Backup & Sync
- **Portable Vaults:** Deterministic `.zip`/`.json` backup packaging with checksum verification.
- **AES-GCM-256 Encryption:** PBKDF2 vault encryption with automatic lock timeouts and memory safety.
- **Git & 3-Way Merge:** Offline branch divergence merge engine with clean conflict boundary markers.
- **Zero-Leak Publication:** Privacy red-team isolation guaranteeing sensitive domains never leak into public builds.

### Platform & Polish
- **Offline PWA:** 100% offline capability with service worker asset caching.
- **Mobile Ergonomics:** Responsive touch targets (≥44px), single-hand navigation, and keyboard collision avoidance.
- **Cross-Platform:** Verified across Chromium, Firefox, and WebKit/Safari.

## KEEP B2 — Source-backed knowledge and planning discovery (2026-10-16)

- Introduced `knowledge-explorer` as a native workspace tab, available from the KEEP Today dashboard and new-tab menu.
- Reused the original P49 planning projections and original Markdown task index/mutator to display and operate on source-owned notes, projects, goals, areas, and note tasks without materializing competing stores.
- Added cross-domain discovery, status/tag/type filters, sorting, user-created saved views using the existing personalization manager, saved-view pins and scoped context inspector.
- Related context combines source planning relations, linkedNoteIds, explicit owner URIs and **fresh** resolved Wikilink/backlink evidence from the original vault index; external owner refs remain inert when unconnected.
- Fixed saved-view import identity: portable config import now retains `sv-custom-*` identifiers and rejects conflicts/invalid candidates, preserving pins through export/restore.
- Added strict original-task completion in the explorer; ambiguous, stale, locked, and native checklist task updates fail closed or open the original editor.
- Added `npm run test:b2`, covering 33 focused deterministic source/identity/filter/link/task/portability cases.
- No cloud synchronization, migrations, deployments, Folio authority reassignment or changes to existing note IDs.
- Full build/browser/whole-project typing are NOT qualified while dependencies are absent; see `KEEP_B2_IMPLEMENTATION_REPORT.md`.
