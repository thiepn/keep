## KEEP B3 — Source-backed project and study workspace (2026-10-16)

Under **Knowledge & projects**, KEEP now has a **Project & study desk** and **Discovery & saved views**. The desk derives active projects, areas, linked academic/research notes, source Markdown tasks and the next 14 days of native KEEP due items from existing note-owned engines. Task dates can be changed with exact source-line validation. All-types queries can be saved using the existing `saved_views_v16` preference store and pinned without re-identifying any records. **No external Folio, Calendar, Habits, Vault or Hub synchronization is active.**

Focused checks: `npm run test:b1b`, `npm run test:b2`, `npm run test:b3`; see `KEEP_B3_IMPLEMENTATION_REPORT.md` for verified status, missing build dependencies and known gaps. This local ZIP is not release-certified.

---

## KEEP B1b — Source-owned pins and relationships (2026-10-16)

The KEEP Today workspace now unifies real pinned/favorite notes, unique anchored Markdown-task pins, owner-scoped reference shortcuts, and declarative links. Folio, Calendar, Habits, Vault and Hub adapter contracts are explicitly **unconnected**; no provider sync or data migration has been activated. Developer V2.1 resource views now use saved notes, not sample persons or projects.

To run the B1b pure model tests after installing development dependencies: `npm run test:b1b`. For detailed source files, migration boundaries, PASS/BLOCKED evidence and limitations, see [KEEP_B1B_CONSOLIDATION_REPORT.md](KEEP_B1B_CONSOLIDATION_REPORT.md).

---

# KEEP — Local-First Knowledge & Planning Workspace

A high-performance, private, offline-first Personal Knowledge Management (PKM) system and Personal Operating System built with React, TypeScript, and Tailwind CSS.

---

## Key Highlights

- **Local-First & Private:** All data resides in your browser and local file storage. Zero tracking, zero forced cloud accounts, and zero external telemetry.
- **Markdown Core:** Clean GitHub Flavored Markdown with bidirectional wikilinks `[[Topic]]`, aliases, block references, and transclusions.
- **Unified Context Engine:** Passive attention tracking and intelligent context switching that never clutters your workspace with phantom alerts.
- **Integrated Personal OS:**
  - **Tasks & Planning:** Today agenda, backlog scheduling, project checklists, and recurring routines.
  - **Finance:** Cent-exact double-entry ledgers with zero floating-point drift.
  - **People & CRM:** Interaction logs, relationships, and important dates.
  - **Health, Travel, Assets & Decisions:** Structured personal trackers designed for sustained daily use.
- **Data Safety & Portability:** Non-destructive portable backup verification, deterministic checksums, and full `.zip` export/import.
- **Optional End-to-End Encryption:** Client-side AES-GCM-256 vault encryption with PBKDF2 key derivation.

---

## Integration status (2026-10-16)

The primary application is KEEP, not a separate Notes product. A source-backed home overview surfaces real pinned notes, Markdown-task due dates, and note reminders without duplicating records. Other THIEPN products (Folio, Calendar, Habits, Hub) are NOT connected in this export. Historical V2 sample-resource views and volatile domain engines are not substitutes for persisted user data. See `KEEP_UNIFIED_PKM_AUDIT_2026-10-16.md`.

## Getting Started

### Installation & Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run comprehensive test suite
npm test

# Build production static bundle
npm run build
```

---

## Release & Platform Support

- **Exported package version:** `2.30.0` (release certification not independently verified)
- **Schema documentation:** version 60 is claimed by the legacy README; inspect migrations before modifying persisted data.
- **Browser support:** claimed by the previous release documents; not reverified for this export.
- **Offline PWA:** source includes a manifest and offline features; install/recovery require browser verification.

---

## License

MIT License.

## KEEP B2 — Knowledge & projects

The **Knowledge & projects** workspace opens from **KEEP Today → Open knowledge & project explorer** or **New Tab → Knowledge & projects**. It searches real unlocked/unarchived KEEP notes, existing P49 project/goal/area note projections, and existing Markdown/checklist tasks. Select a result to inspect references or navigate to its original source, including exact Markdown task lines. Complete Markdown tasks inline only when the source is unchanged; native checklists open their original editor instead. Filter by type, status, tags and text, save source-supported domain views, pin a saved view to Today, or connect an explicit owner reference. These are references, never imported remote resources.

From the exported source run `npm install`, `npm run test:b1b`, `npm run test:b2`, and then `npm run build` once dependencies are available. **No live Folio, Calendar, Habits, Vault, Hub, Account or provider synchronization is included.** See `KEEP_B2_IMPLEMENTATION_REPORT.md` for scope, limitations and executable test evidence.
