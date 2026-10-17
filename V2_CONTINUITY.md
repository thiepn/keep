# PKM V2.4 — Continuity & Resume Architecture

## Overview

The Continuity subsystem answers: *"Where did I leave off? Where should I continue?"*

## Ranking Hierarchy

Resume candidates are ranked using deterministic signals:
1. **Explicit Pinned / Working Resource**: Always highest priority.
2. **Active Unfinished Sessions**: In-progress Weekly Reviews, active Routine Runs.
3. **Last Meaningful Context / Project**: Recent active focus areas.
4. **Recent User Work**: User-chosen notes or documents edited within the past 30 days.

## Synced Semantic Resume vs Device-Local UI Geometry

- **Semantic Resume (Synced)**: Stores `resourceId`, `contextId`, `progressSummary`, and `confidence`. Synced across devices so the user can continue their active project from any device.
- **Exact UI Resume (Device-Local)**: Stores cursor line, scroll offset, zoom level, and pane layouts. Kept strictly local to prevent opening a mobile phone from hijacking the desktop window's geometry.
- **Staleness Policy**: Unpinned items older than 30 days are automatically demoted. Completed or archived resources are removed immediately upon transition.
