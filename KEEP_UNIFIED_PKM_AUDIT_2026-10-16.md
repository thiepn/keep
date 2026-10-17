# KEEP — Unified PKM consolidation and source audit

**Date:** 2026-10-16 (Europe/Berlin)  
**Source:** User-provided `keep.zip` (Google AI Studio export).  
**Scope:** Local copy of KEEP only; no GitHub branch, deployment, migration, cloud write or private data read.  
**Status:** B0 source inspection completed; B1a native, source-backed daily home implemented. Cross-app ownership integrations not implemented.

## 1. Executive finding

KEEP is a large, functioning *codebase*, but its current export does **not** demonstrate an equally unified, durable personal operating system. Its primary UI retains a real Notes/Markdown workspace with a persistent multi-pane surface (`src/App.tsx`, `src/pkm/workspace/WorkspaceContainer.tsx`, `src/services/storage.ts`). Multiple ambitious V2 systems are isolated in separate modals, demo resource arrays, seeded engines or independent `localStorage` namespaces. Historical self-certification labels should not be treated as actual runtime evidence.

The correct strategy is **KEEP as the unified product/UI**, with **one explicitly identified canonical owner per record family**, not an immediate database merger. Existing THIEPN Hub provides an executive cross-app surface; KEEP provides full-depth editing, study, tasks, planning and tracking.

## 2. Source inventory and evidence

| Feature group | Observed files / capability | Assessment |
|---|---|---|
| Notes / Markdown | `src/App.tsx`, `src/services/storage.ts`, `src/pkm/parser.ts`, `src/pkm/resolver.ts`, `src/pkm/workspace` | Real code and UI paths. Storage-backed notes and workspace are present; full runtime build unverified. |
| Wikilinks, backlinks, math, PDF, canvas, graph | `src/pkm/{indexer,transclusion,math,pdfEngine,canvasStorage}.ts`, workspace and UI files | Substantial source modules. Individual validation and browser acceptance not re-run. |
| Native note tasks | `src/pkm/tasks/{taskParser,taskIndex,taskMutator}.ts`, `src/components/modals/VaultTasksModal.tsx` | Real Markdown-backed task flow. **Not Folio's canonical task engine.** |
| Tracking, habits and routines | `src/pkm/tracking/trackingService.ts`, `src/pkm/planning/`, `src/pkm/v2/domains/v2_22PersonalOSEngine.ts` | Multiple distinct stores/engines; the V2.22 domain engine uses in-memory maps and seeds fictitious records. Cannot claim canonical unified habit continuity. |
| V2 unified experience | `src/pkm/v2/ui/V2UnifiedExperienceView.tsx` | Initializes with hard-coded example resources including `proj_alpha`, `person_sarah` and other fictitious data. It is not equivalent to the real saved Notes collection. |
| V2 Core Experience | `src/pkm/v2/coreExperience/v2_21CoreExperienceEngine.ts` | In-memory tasks/projects/inbox plus `seedInitialCoreData()`: separate from persisted Folio or Notes source. |
| V2 Personal OS | `src/pkm/v2/ui/V2PersonalOSCenterModal.tsx`, `src/pkm/v2/domains/v2_22PersonalOSEngine.ts` | Separate large-domain UI and in-memory stores. Original source contained fixed 2026-09-30 review dates; UI now uses local current date for those occurrences. |
| Backup / sync / encryption / imports | Several extensive source modules; `src/services/exporter.ts`, `src/services/importer.ts`, `src/pkm/migration/` | Present in source, but not certified from this archive; especially do not run migration against personal or production data without full restore tests. |
| Mobile/offline | `public/manifest.webmanifest`, `src/pkm/mobile`, Tauri/Capacitor descriptors | Code paths and manifest exist. Physical devices, service workers and offline startup not tested. |
| THIEPN Hub provider integration | No verified KEEP ↔ Hub native consent/owner source integration found in this exported app | **Missing**; no live synchronization or Hub publishing should be claimed. |
| Folio/Calendar/Habits integration | No tested native bidirectional Folio or Habits provider adapter evidenced in this KEEP export | **Missing**; don't fabricate Folio due tasks or habit completions. |

**Conclusion:** Source breadth: substantial. Knowledge functionality: substantial but needs browser validation. Full-product cross-domain functional continuity: materially incomplete. Release readiness: unverified. A numeric “percent complete” would suggest accuracy unavailable without building, using and testing the complete application and comparing against an agreed feature inventory.

## 3. Delivered B1a — Native KEEP Today

Added source-owned, user-facing functionality to KEEP's existing main pane, rather than creating a second application or record store:

- `src/components/home/keepTodayModel.ts`: local-calendar-day projection of active, unlocked notes; real pinned notes; parsed overdue and due-today Markdown tasks; real seven-day note reminders; recent notes. Reuses the existing `buildVaultTasks` engine and existing note identifiers.
- `src/components/home/KeepTodayOverview.tsx`: desktop/mobile-responsive daily workspace; opens existing canonical notes, native task manager, calendar, planning and routines workflows. Labels note tasks honestly and explicitly states that Folio/other THIEPN providers are not yet connected.
- `src/App.tsx`: mounts KEEP Today in existing Home when in active-unfiltered mode and the vault is unlocked. No DB schema changes, no duplicated task completion authority, no cross-origin reads.
- Product-facing names updated from `KeepNotes` to **KEEP** in `metadata.json`, `index.html`, `public/manifest.webmanifest`, `src/components/Header.tsx` and README. Storage IDs, old import formats and historical product names were deliberately **not** renamed.
- `src/pkm/v2/ui/V2PersonalOSCenterModal.tsx`: replaced stale fixed current-date parameters with `dateOnlyLocal(new Date())` for review/flashcard display flows. This does not repair the underlying V2 in-memory seed issue.
- `tests/keepTodayModel.cjs`: executable source-level regression checks. It targets compiled TypeScript without external React dependencies.

### B1a acceptance results

| Gate | Result | Evidence / limitation |
|---|---|---|
| User archive extraction and path-safety check | PASS | 1,543 entries, no path traversal; source copied locally. |
| New model TypeScript dependency compilation | PASS | Global `tsc` successfully emitted model and dependent task/parser modules as CommonJS, zero compiler diagnostics. |
| Data model regressions | PASS | Notes, due tasks, reminders, locked/archive/trash exclusions, empty state; tests passed on compiled source. |
| Local-day timezone boundary | PASS | `TZ=America/Los_Angeles`, 2026-10-17 00:30 UTC maps to 2026-10-16 local. |
| KEEP main-shell wiring checks | PASS | Checked mounted view, source callbacks and locked-vault condition. |
| Changed TS/TSX syntax transpilation | PASS | App.tsx, KEEP Home, model, Personal OS modal. |
| Full TypeScript app typecheck | BLOCKED | Dependencies missing; `npm install` timed out. `tsc --noEmit` reports missing module declarations. No valid app-wide type conclusion. |
| React/Vite build | BLOCKED (environment) | Attempted `npm run build`, exit 127: `vite: not found`. |
| Full existing test suite | BLOCKED (environment) | Attempted `npm test`, exit 127: `tsx: not found`.
| Desktop/mobile Chromium/PWA | NOT_TESTED | Unbuilt application; cannot claim true visual acceptance. |
| THIEPN Account/Hub/Calendar/Habits live sync | NOT_TESTED | No grants, pairing or running endpoints authorized. |
| Production | UNCHANGED | No GitHub, deployment, database, OAuth or environment changes. |

## 4. Canonical ownership and migration plan

| Family | Interim canonical owner | KEEP consolidated UI strategy | Write/migration gate |
|---|---|---|---|
| KEEP native notes, references, attachments | KEEP original browser-local storage | Own native edited content, keep IDs | Preserve current backup and restore before schema changes. |
| THIEPN Notes records | `thiepn/notes` | Owner-approved read projection and per-record import option | Backup/attachments/revisions/export; no automatic copy. |
| THIEPN Vault Markdown / Obsidian imports | `thiepn/vault` / user-managed Markdown source | Keep Markdown and reference parity; choose eventual knowledge owner after field-by-field comparison | Stable IDs, heading/block refs, links, files, revisions, encryption, reversible dry run. |
| Tasks, projects, planning, time blocks, Focus | `thiepn/folio` | Native KEEP tasks/planner module with Folio source-owned adapter; KEEP Markdown checkboxes remain separately identifiable | Avoid task identity collisions; never double-score or double-complete. |
| Calendar / recurrence | Folio native records; ICS external sources remain read-only | One KEEP calendar display, source-provenance controls and edit routing | Keep recurrence exceptions, timezones, local/UTC all-day meaning, ICS ownership and grants. |
| Habits and historic logs | Folio for its habits; separate `thiepn/habits` remains authority for its Daymark-derived schema | One KEEP Habits section after canonical migration and deduplication decisions | Preserve daily history, pause windows, quantity values, log provenance and recurrence rules. |
| Hub daily command center | `thiepn/thiepn.github.io` owned Hub integration | Minimal scoped summaries, pins, resume, Today tasks and actions from KEEP | Explicit owner consent, freshness, account binding and scope checks; no raw vault bodies in Hub. |
| Identity and Core | THIEPN Account and `thiepn/core` as already scoped | No new auth/sync engine | Only authorized grants; do not interpret Core registry entries as deployed cross-app sync. |

### Resource identity

Reuse the existing Folio P9 cross-module URI scheme (from `docs/PLATFORM-P9-FOLIO-CONSOLIDATION-BOUNDARY.md`): `thiepn://<product>/<module>/<kind>/<encoded-id>?v=1` as an **opaque reference**, not an access token. Each provider must validate owner, grants, resource existence, revision, provenance, read/write permission and deletion before returning data or mutating it.

A universal pin is a pointer to the original entity; a pinned calendar item, note block or task is never a shadow copy of its payload. “Open within KEEP” should be achieved through native embedded module UI with source adapters, not by merely launching separate apps. Hub consumes bounded read models and safe actions only.

## 5. Coherent next implementation batches

### B1b — Canonical navigation, pinning and reference spine (KEEP)

Consolidate existing Home, Workspace, V2 sample resource UI and favorites into one navigation tree. Add stable source-aware reference types, actual provider-owned resource resolvers and universal pin management (Note, block, task, habit, event, saved view, project, document) with missing-resource/permission handling. Keep pin and link metadata portable, reversible and private. No new independent resource store unless an explicit durable migration contract requires it.

### B2 — Knowledge & research deep integration

Preserve KEEP original Markdown and Vault/Obsidian compatibility. Make linked sections/blocks, PDFs, references, collections, university projects and task inline-view genuine in-context actions. Replace overlapping demos and modals with tabs/panes while preserving external file source, attachments, link stability and import provenance.

### B3 — Source-owned Folio/calendar/habit modules

Build bounded adapters to existing Folio tasks, projects, time blocks and habit history; reconcile conflicting KEEP note-checkbox tasks without treating them as Folio tasks. Integrate Folio calendar/recurrence and Habits history with explicit source badges and conflict/undo support. Never directly read another origin's browser storage or invent availability, task completion, habit logs or authentication.

### B4 — Hub integration

Source-backed KEEP summary: today's actionable items, notes, pins, current project, genuinely due work and actual logged habits. Provider-owned consent, minimal private projection, fresh owner checks, optional quick actions with write receipts, explicit local-only/offline/unavailable statuses. Hub remains a command center, not a parallel editor or database.

### B5 — User data migration and retirement

Inventory records and provider versions; export verified backups, checksum byte payloads, use dry-run migration and reversible mapping IDs, verify backlinks, recurrence/habit histories and conflict cases, then run mobile/desktop offline and recovery tests. Only then retire Notes/Vault or Habits navigation if their use cases are fully preserved. Folio may remain an internal engine or separately accessible compatibility surface even if the user stops switching apps.

## 6. Important blockers

1. **Real complete app build unavailable**: dependencies could not be fetched; desktop/mobile UI functionality not certified.
2. **Sample engines masquerade as authoritative domains**: seeded in-memory V2.21/V2.22 and the hard-coded V2.1 UI must not be the migrated canonical data source.
3. **Multiple canonical candidates**: KEEP Markdown tasks, Folio native tasks, Vault tasks and standalone Habits need an explicit per-record authority/de-duplication strategy.
4. **Cross-origin sync and private grants**: Hub, KEEP, Folio, Notes, Vault and Habits should not bypass source-owned permission and encryption boundaries. Account/Core registry presence is not a live universal sync API.
5. **Release claims**: `V3_FINAL_RELEASE_CERTIFICATION.md` claims 100% coverage/ship-ready; those statements were not independently reproduced. `README.md` had a 1.1.0 version while `package.json` reports 2.30.0.
6. **Security**: `index.html` includes permissive `unsafe-inline`, `unsafe-eval`, wildcard https/wss CSP; tighten under a separate verified app hardening change, without breaking legitimate editor/worker integrations.

## 7. Current delivery boundaries

This deliverable changes only the **local copy** of the uploaded source. It is not yet in a GitHub repository, does not use production storage, and has not been deployed. The original `keep.zip` is unchanged. The ZIP produced alongside this report contains the full edited source for review and later Git import.
