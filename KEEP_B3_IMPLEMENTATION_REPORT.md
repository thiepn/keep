# KEEP B3 — Native project, study and planning continuity

**Date:** 2026-10-16  
**Input:** `KEEP_B2_updated_source.zip` (1,338 archive members)  
**Output:** `KEEP_B3_updated_source.zip` (full source, plus this report)  
**Scope:** Only the extracted local KEEP source. No GitHub operations, production deployment, remote migrations, external account writes, credential use, provider sync or expenses.

## Delivered source features

1. **Native Project & Study Desk** (`src/pkm/integration/ui/KeepProjectDesk.tsx`, integrated through `KeepKnowledgeExplorer.tsx`): selectable canonical P49 projects, active/total counts, area filters, actual project progress, status/deadline context, linked goals, verified study/research/lecture notes, and original task lists. Responsive project list/details plus an independent Discovery/Saved Views workspace tab. When no project notes exist, the UI shows a truthful empty state rather than sample data.
2. **Verified linked-knowledge context** (`src/pkm/integration/keepProjectContext.ts`): material is related only through original note IDs, original user-created typed resource links, or revision-checked existing Wikilink/backlink index. Merely sharing `university` tags, titles or folders never creates a speculative association. Unavailable, locked, archived or trashed notes are excluded before linking; external references are not treated as accessible KEEP records.
3. **Project planning and original task continuity**: project P49 progress, due date, goal/area identity, next action and blockers are read from the existing planning service; child/source tasks remain the original Markdown task rows. Original task-line navigation and B2 guarded completion continue to work. Project tasks may be pulled from explicitly associated study notes, but this does NOT silently modify P49's native progress counts.
4. **Guarded in-place task due-date editing** (`prepareKeepTaskReschedule`): a date input in the project task list updates the exact original Markdown line through the existing parent `onSaveNote` persistence path. It preserves canonical note IDs, text and original `^block-id` anchors, understands existing `@due`, `due:`, and `📅` due tokens, or adds one before the block anchor. It rejects non-date inputs, protected/archived/trash notes, completed tasks, stale line snapshots, duplicate anchors and multiple conflicting due tokens. No fuzzy task match, shadow task, new task table or Folio write is performed. Due dates inherited from note frontmatter are overridden at the individual task without rewriting the frontmatter.
5. **Planning continuity without fabricated appointments** (`buildKeepPlanningDays`): a next-14-days native preview includes only actual pending KEEP Markdown task due dates, P49 project deadlines and local-time-correct note reminders. Due-date tasks are not calendar events. Undated tasks have no invented schedule, completed task occurrences are excluded, and original Calendar/Agenda handoffs remain available. No automatic recurrence expansion is claimed.
6. **Reusable cross-domain saved views**: a new `keep-workspace` option in the **existing** `SavedViewDomain` and `savedViewsManager` allows saving an All Types discovery filter over actual KEEP notes, tasks, projects, goals and areas. Existing `saved_views_v16` storage, `sv-custom-*` stable IDs, favorite URI pins, configuration exports/imports and native domain views remain in place. External Library/Finance/etc. view domains remain unsupported in KEEP discovery rather than filled with invented rows.
7. **Context navigation**: selecting a project opens the project desk; `Inspect relationships` switches into the existing B2 inspector with filter state reset and the same original project row selected. Project, goal, knowledge, task and due-item links all open original owner notes; source task lines are preserved. The existing vault-lock guard remains active.

## Source files added

- `src/pkm/integration/keepProjectContext.ts`
- `src/pkm/integration/ui/KeepProjectDesk.tsx`
- `tests/keepB3ProjectDesk.cjs`
- `scripts/check-keep-b3.cjs`
- `scripts/check-keep-b3-wiring.cjs`
- `KEEP_B3_IMPLEMENTATION_REPORT.md`

## Source files modified

- `src/pkm/integration/ui/KeepKnowledgeExplorer.tsx`
- `src/pkm/integration/keepDiscoveryModel.ts`
- `src/pkm/personalization/personalizationTypes.ts`
- `src/pkm/personalization/savedViewsManager.ts`
- `package.json` (adds `test:b3` to the existing test chain)
- `README.md`
- `CHANGELOG.md`

**Unmodified:** existing canonical source tables and their schemas, Note IDs, source task storage, Folio/Calendar/Habits/Vault/Hub adapters, production URLs, account contracts, provider source data, and the historical V2 sandbox modules.

## Verification performed on the B3 source

| Check | Outcome | Exact result / interpretation |
|---|---|---|
| B3 deterministic model suite | **PASS** | `node scripts/check-keep-b3.cjs` → `KEEP_B3_MODEL_PASS=48`; includes source identity, linked study context, privacy, dates, task reschedule, cross-domain saved-view persistence/export/import. |
| B1b original regressions | **PASS** | `NODE_PATH=$(npm root -g) node scripts/check-keep-b1b.cjs` → `KEEP_B1B_MODEL_PASS=22`. |
| B2 original regressions | **PASS** | `node scripts/check-keep-b2.cjs` → `KEEP_B2_DISCOVERY_PASS=33`. |
| B1a Today source | **PASS** | `tsc` compiled `keepTodayModel.ts` to temporary CommonJS and original `tests/keepTodayModel.cjs` passed eight assertions. |
| Local timezone boundary | **PASS** | Same Today tests with `TZ=America/Los_Angeles` produced `KEEP_LOCAL_DAY_BOUNDARY_PASS`; B3 suite also passed 48/48 under that timezone. |
| Targeted pure-model TypeScript | **PASS** | Global `tsc` ES2022/DOM compilation of B3 context, B2 discovery and original planning/personalization dependencies; no diagnostics. |
| B3 native UI static wiring | **PASS** | `node scripts/check-keep-b3-wiring.cjs` → `KEEP_B3_WIRING_PASS=17`; source assertions only, not browser acceptance. |
| Changed TS/TSX syntax | **PASS** | Global `typescript.transpileModule` parse of changed integration and UI modules, zero syntax diagnostics. Does **not** prove React module resolution. |
| Dependency installation | **BLOCKED** | `npm install --ignore-scripts --prefer-offline` attempt timed out after 30 seconds without installing dependencies. No installed React/TSX/Vite modules were available. |
| Whole project `npm run lint` (TypeScript) | **FAIL / unqualified** | Exit 2; ~1,297 reported diagnostic lines, including missing `react`, `lucide-react`, `react/jsx-runtime` and existing unrelated module/type issues. B3 model modules had no diagnostics; B3 TSX shows only missing dependency diagnostics in this attempt. This is not a successful typecheck. |
| `npm run build` | **BLOCKED** | Exit 127: `vite: not found`. |
| `npm test` (whole suite) | **BLOCKED** | Exit 127: `tsx: not found`. Focused suites ran separately and passed. |
| Real application desktop/mobile Chromium | **NOT_TESTED** | Chromium binary present but no runnable Vite build. Static JSX and source assertions cannot substitute for actual browser testing. |
| External owner / multi-device runtime tests | **NOT_TESTED** | No authorized Folio/Calendar/Habits/Vault/Hub source read/write/sync executed. |
| Deployment / GitHub commit | **NOT_APPLICABLE** | Local ZIP-only implementation, no commit SHA and no deployment. |

## Explicit known gaps

- The project desk presents only KEEP-local note-owned projects and task deadlines; **no authenticated Folio tasks, external ICS events, Habits streaks or Hub summaries** appear. The Calendar button is a handoff to existing KEEP calendar UI, not synchronization.
- Project `progressPercent` is calculated by the existing P49 project engine (may omit related-document tasks), whereas the contextual task list includes explicitly linked knowledge-note tasks. Both numbers are labeled by source; they do not imply identical denominators.
- Markdown tasks without exact block anchors have no stable cross-session task URI. Due-date edits on such tasks work on an exact current line, but external references require explicitly anchoring the source first.
- Source-level tests cannot verify actual UI reactivity, cross-tab write conflicts, vault-lock transitions, mobile touch interaction, import/export under a real browser profile, or Vite dependencies. Qualify these when a reproducible installable build exists.
- Existing historical V2.21/V2.22 sandbox modules are not converted into authorized production records in this batch.

## Recommended follow-on B4

After restoring dependency installation, execute full TypeScript/build and actual desktop/mobile Chromium acceptance; repair real defects before release. Next feature batch should add genuinely source-authorized Folio/Calendar/Habits contributions via explicit consent and small owner-generated read models, while preserving offline KEEP and original providers. Only initiate a data migration with complete export/checksum/restore and rollback verification. Do not silently centralize private provider datasets in Hub.
