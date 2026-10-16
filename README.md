# KEEP — native Faith & Discipline shell (FD1 draft)

This is an unmerged, undeployed mobile-first development shell. It is **not** an import of the earlier KEEP B3 knowledge database, a replacement for Notes, Folio, or My Daily Devotion, or a new source of Scripture/TMS progress.

## Source boundaries

- **Folio** owns habits, saved focus sessions, tasks, and calendar data. KEEP currently opens original Folio workflows, but does not write those records.
- **My Daily Devotion** owns Scripture reading, private reflections, prayer and recovery. Its source URL and approved sharing contract must be verified before adding an exact-reading handoff.
- **TMS60** owns verse review and memorization progress. KEEP does not infer review counts.
- **Hub/Notes** own their own note/workspace records. KEEP B3 has not been copied or migrated.

KEEP persists only optional non-sensitive local preferences (default focus duration, planned entertainment limit, morning boundary). The focus countdown and interruption notes are session-only; hidden tabs pause it. No device-level app restrictions, automatic task completion, background alerts, gamified spirituality, or cloud connection are claimed.

## Local use

```
npm test
npm run build
# serve the root or dist/ with any static HTTP server
```

No npm dependencies or API keys are needed. The build copies a static offline-compatible shell, but does **not** claim PWA cache/installability or offline-first persistence certification. Do not deploy or change the repository default branch as part of FD1 without separate review.

## Known gap

The repository was initially empty. GitHub initialized its default branch to the first feature branch; a separate `main` README baseline has been created. An owner must restore `main` as the repository's default before release. No original KEEP B3 source has been migrated.
