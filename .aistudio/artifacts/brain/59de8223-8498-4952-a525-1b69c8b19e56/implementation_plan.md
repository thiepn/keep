# Implementation Plan: Final Completion Suite (Gamification Hub, Vault Health Doctor, & Archive Bundle)

Implement the final completion suite for the personal knowledge management system based on user-selected priorities: a full **Knowledge Gamification Engine & Quest Center** with a 5-branch Skill Tree, **Vault Health & Link Integrity Doctor**, and a **Standalone Offline Vault Archive Bundle Exporter**.

---

## 1. User Review Required & Critical Confirmations

- **Skill Tree Branches**: 5 distinct mastery branches — *Writing* (volume, flow, essays), *Linking* (connections, index notes, bi-directional synthesis), *Recall* (spaced repetition, flashcard mastery), *Structure* (folders, outlines, tags, MOCs), and *Consistency* (daily notes, active streaks, habit loops).
- **Gamification Mechanics**: XP gains awarded automatically on real note actions (creating notes, writing words, adding wiki-links, reviewing flashcards, completing daily notes), leveling up character rank with unlockable titles and perks.
- **Surface Integration**: A new first-class workspace tab surface (`gamification`), accessible from the tab bar `+` menu, presets, and quick commands (`Alt+Shift+G`).

---

## 2. Proposed Architecture & System Components

### A. Gamification Engine (`src/pkm/gamification/`)
1. **`gamificationTypes.ts`**:
   - `UserProgress`: Level, current XP, total XP, rank title, streak count, lastActiveDate, streakFreezes.
   - `SkillBranchId`: `'writing' | 'linking' | 'recall' | 'structure' | 'consistency'`.
   - `SkillNode`: ID, branch, tier (1–5), title, description, costXP, unlocked, icon, perkEffect.
   - `Quest`: ID, category (`daily` | `weekly` | `epic`), title, description, targetMetric, currentProgress, targetCount, rewardXP, completed, claimed.
   - `AchievementBadge`: ID, name, description, category, rarity (`common` | `rare` | `epic` | `legendary`), unlockedAt, icon.
2. **`gamificationEngine.ts`**:
   - LocalStorage-persisted singleton service tracking XP, streaks, levels, quest progression, and perk unlocks.
   - Event listeners listening to note updates, link creations, flashcard reviews, and daily notes to auto-award XP and advance quests.
3. **`GamificationHubWorkspaceView.tsx`**:
   - **Hero Character Banner**: Current rank title (e.g. "Grand Archivist"), level progress bar, active streak flame counter, available skill points.
   - **Interactive 5-Branch Skill Tree**: Visual interactive graph with nodes across Writing, Linking, Recall, Structure, and Consistency, showing prerequisites, unlock states, and perk stats.
   - **Active Quests Board**: Daily quests (resets daily), Weekly challenges, and Milestone achievements with progress bars and 1-click "Claim XP" button.
   - **Badges Trophy Showcase**: Grid of earned and secret achievements with unlock dates and rarity styling.

### B. Vault Health & Integrity Doctor (`src/pkm/diagnostics/`)
1. **`vaultHealthService.ts`**:
   - Scans entire vault in memory for:
     - Broken Wiki-Links (`[[non-existent-note]]`)
     - Orphaned Notes (zero incoming and zero outgoing links)
     - Dead Attachments (images/audio in storage not referenced by any note)
     - Missing Backlinks & dangling tags
   - 1-click "Auto-Heal": Create stub notes for missing wiki-links or update renamed references.
2. **`VaultHealthDoctorModal.tsx`**:
   - Visual health score (0–100%), issue categorizations with counts, interactive lists of broken links with 1-click "Create Note" or "Remove Link", and orphan note resurfacer.

### C. Complete Standalone Vault Archive Exporter (`src/pkm/archive/`)
1. **`vaultArchiveExporter.ts`**:
   - 1-click complete package exporter that packages:
     - All markdown notes with frontmatter metadata
     - Folders, tags, canvas boards, routines, and flashcards
     - Standalone single-file HTML interactive archive with embedded client-side search for offline reading anywhere without dependencies.

### D. Workspace & App Integration
1. **Workspace Tab System**:
   - Add `'gamification'` to `WorkspaceSurfaceType`.
   - Add Gamification Hub to tab bar add dropdown, workspace presets, and shortcuts (`Alt+Shift+G`).
2. **Command Registry & Keybindings**:
   - Register `tools:gamification-hub`, `tools:vault-health-doctor`, `tools:vault-archive-exporter`.

---

## 3. Verification Plan & Test Strategy

### Automated Tests
- Create `/src/pkm/__tests__/featureCompletionSuite.test.ts`:
  - Verify XP calculations, level thresholds, and streak progression.
  - Verify 5-branch skill tree dependencies and node unlocking logic.
  - Verify quest progress tracking and XP claiming mechanics.
  - Verify broken link detection and orphan note indexing in `vaultHealthService`.
  - Verify archive manifest generation.
- Execute unit test runner via `run_command`:
  ```bash
  npx tsx -e "import { runFeatureCompletionSuiteTests } from './src/pkm/__tests__/featureCompletionSuite.test'; console.log(JSON.stringify(runFeatureCompletionSuiteTests(), null, 2));"
  ```
- Run linter verification:
  ```bash
  npm run lint
  ```
- Build check:
  ```bash
  npm run build
  ```

### Manual & Interactive Verification
- Open Gamification Hub tab in workspace: inspect level progression bar, streak count, and 5-branch skill tree nodes.
- Perform note actions (create note, add wiki-link): verify XP award toast notification and quest progress increment.
- Unlock skill tree perks: verify skill points decrement and perk activates.
- Open Vault Health Doctor: verify broken links and orphan notes detection, test 1-click stub note creation.
- Test Vault Archive export: verify generated package and offline standalone viewer.
