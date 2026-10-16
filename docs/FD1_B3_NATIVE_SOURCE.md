# FD1: authentic KEEP B3 source reconciliation

## Verified input (2026-10-16)
- Original, owned source: `KEEP_B3_updated_source.zip`, 1,344 archive members.
- Original codebase: React/Vite, `src/App.tsx`, `src/pkm/workspace/WorkspaceContainer.tsx`, `src/services/storage.ts`, B3 projects/study desk, Markdown task handling, Folio/Vault typed pointer contracts, encrypted vault and backup/recovery engines.
- Its `KeepNotesDB` and P50 tracking namespaces remain authoritative; **do not migrate data to the interim FD1 `localStorage` preference shell**.
- Native B3 FD1 source artifact prepared separately with SHA-256:
  `9e1db9ee06efa9d6e7bf92c1acd8e03317659071ef7b8046938f0b47e0986ca9` (4,026,361 bytes).
  It contains the full B3 source plus an original-P50-backed Faith & Discipline Today panel, weekly practice view and Pomodoro/calendar handoffs.

## Tested on the native B3 source artifact
- `node tests/keepFD1Native.cjs` — 9 FD1 source/recurrence/ID/TSX tests PASS.
- `node scripts/check-keep-b3.cjs` — 48 existing B3 tests PASS.
- `node scripts/check-keep-b2.cjs` — 33 existing B2 tests PASS.
- Vite build, native mobile acceptance, encryption/backup restore and upgrade-path qualification NOT_TESTED.

## GitHub branch status
Draft PR #1 currently includes a **provisional static FD1 shell**, not the complete original B3 React source. The actual source ZIP has not been pushed to this branch. Do not merge or deploy #1 as the replacement KEEP application, or claim that its temporary shell is the original editor.

The PR now ports the original B3 `thiepn://` owner-ref URI contract and exposes a read-only inspector. This is a compatibility bridge only, not a vault importer. Existing original B3 modules must be imported together and the placeholder replaced in an atomic reviewed source batch, with exact-head tests and no automatic local-data migration.

## Required release gates
1. Include original B3 source files and lockfile, retaining IDs, `KeepNotesDB`, original P50 tracking engine, journal and encryption contracts.
2. Preserve the original B3 Today + FD1 integration and original native Notes/PKM editor; never launch original B3 in an iframe.
3. Run exact-head full TS/Vite/build, source, import/export, offline backup recovery and 320/390/1440px Chromium acceptance.
4. Verify old-origin data interoperability and account scope. Changing hostname alone never moves IndexedDB.
5. Set repository default to `main` (its first branch was an isolated feature branch because the repo was empty).

No deployment, migrations, production writes, credentials or costs were authorized for FD1.
