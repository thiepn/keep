# PKM V2.4 — Unified Attention Architecture

## Overview

Attention represents a **factual actionable condition** requiring user awareness or explicit choice. It is **not** a predictive priority score or algorithmic ranking.

## Severity Matrix & Supported Reasons

| Reason | Severity | Auto-Resolves When Fixed? | Default In-App Notification | Explainability Guarantee |
| :--- | :--- | :--- | :--- | :--- |
| `backup_failed` | **Critical** | Yes (verified backup) | Yes | "Vault backup hash verification timed out" |
| `storage_low` | **Critical** | Yes (storage cleared) | Yes | "Available local storage is below safe threshold" |
| `sync_conflict` | **Important** | Yes (conflict picked) | Optional | "Concurrent changes on 2 devices require selection" |
| `overdue_task` | **Important** | Yes (task completed) | Optional | "Task was due on YYYY-MM-DD and remains open" |
| `automation_failed` | **Important** | Yes (rule updated) | Optional | "Automation rule encountered an execution error" |
| `review_due` | **Needs Attention** | Yes (review done) | No | "Weekly / Monthly reflection scheduled for today" |
| `no_next_action` | **Needs Attention** | Yes (task created) | No | "Active project has no next-action task assigned" |
| `asset_maintenance_due` | **Info** | Yes (maintenance logged)| No | "Scheduled maintenance interval reached" |

## Presentation Semantics: Acknowledge vs Snooze

- **Acknowledge ("Seen")**: Marks the item as acknowledged. Presentation styling shifts to muted seen state. Does NOT alter underlying canonical data.
- **Snooze ("Hide until date")**: Temporarily hides the attention item from the active view until the specified timestamp. **CRITICAL RULE**: Snooze NEVER alters canonical task due dates or project status!
