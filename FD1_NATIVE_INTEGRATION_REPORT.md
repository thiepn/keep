# KEEP B3 × FD1 native source integration

This artifact is the full 1,344-member original `KEEP_B3_updated_source.zip` source, extended **in place**. It is not the separate 10-file `thiepn/keep` PR #1 scaffold and has not been deployed or migrated.

## Changed files relative to source B3
- `src/pkm/integration/keepFaithModel.ts` (new): owner-P50 selected-definition IDs, validated local selection preference, explicit habit/entry recurrence-based 7-day projections; no duplicate progress store.
- `src/pkm/integration/ui/KeepFaithDisciplinePanel.tsx` (new): real Today interface to original P50 habits, toggle-only existing completion definitions, original KEEP Pomodoro and Calendar, 7-day practice evidence, no fabricated MDD/TMS60 results.
- `src/components/home/KeepTodayOverview.tsx`: integrated panel inside existing native B3 Today and workspace.
- `src/App.tsx`: original Pomodoro ownership passed into Today through onOpenFocus.
- `tests/keepFD1Native.cjs` (new): original B3 P50 projection, pause, ID, no-duplicates, source wiring and TSX syntax tests.

## Qualifying evidence
- `node tests/keepFD1Native.cjs` -> KEEP_FD1_NATIVE_PASS=9
- `node scripts/check-keep-b3.cjs` -> KEEP_B3_MODEL_PASS=48
- `node scripts/check-keep-b2.cjs` -> KEEP_B2_DISCOVERY_PASS=33
- Full Vite production build / browser (requires dependencies) NOT_TESTED. Original src/App.tsx/PKM note, editor, ID, encryption, recovery, tasks, and calendar implementations remain unmodified except the Today callback.

## Installation / source ownership
The separate GitHub `thiepn/keep` PR #1 currently contains a provisional static app and lacks the original B3 full codebase. Do **not** migrate user data or overwrite its IndexedDB until the actual B3 source has been committed and exact-head build, full tests, offline/restore tests and mobile browsers pass. The source archive preserves original `KeepNotesDB`, local tracking namespaces, and encryption modules, but **does not certify any production origin migration**.
