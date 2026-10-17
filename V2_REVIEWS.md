# PKM V2.4 — Review System & Snapshot Architecture

## Overview

The V2.4 Review System enhances intentional periodic reflection (Weekly, Monthly, Project) through immutable evidence snapshots:

- **Evidence Gathering**: Factual counts and item lists (completed tasks, created notes, logged decisions, completed routine runs) pulled automatically from `ActivityEngineV2`.
- **Immutable Snapshots**: When a review is completed, evidence metrics are frozen into a `ReviewSnapshotV2`. Reopening an old review note from 6 months ago displays the exact factual metrics at the time of completion rather than dynamically recomputing against present-day data.
- **No Productivity Scores**: Zero gamification, vanity streaks, or algorithmic productivity grades. Counts are presented purely as factual context for human reflection.
