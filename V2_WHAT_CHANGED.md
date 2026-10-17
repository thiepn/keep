# PKM V2.4 — What Changed Architecture

## Overview

The What Changed subsystem answers: *"What meaningfully changed in this Context / Project / Workspace since I last looked?"*

## Architecture

1. **Checkpoints (`lastSeenActivityCursor`)**: Recorded per scope (Global, Context ID, or Project ID).
2. **Deterministic Delta Grouping**:
   - Tasks: Completed, Created, Reopened
   - Notes: Created, Modified (Session edits)
   - Decisions: Decided, Outcome resolved
   - Routines / Reviews: Completed runs
3. **Scope Isolation**: For context/project views, only events affecting connected resources are included, avoiding whole-vault noise.
4. **Mark Caught Up**: Explicit user action updates the checkpoint to `now()` without mutating any canonical notes or tasks.
5. **Grounded Synthesis**: Optional AI summary is strictly constrained to the factual delta bullets.
