# PKM V2.4 — Archival & Resource Lifecycle Architecture

## Lifecycle State Machine

```
   ┌──────────────┐
   │    Active    │ ◄──────────────────────┐
   └──────┬───────┘                        │
          │                                │
          ▼                                │
   ┌──────────────┐                        │
   │  Completed   │                        │
   └──────┬───────┘                        │
          │                                │
          ▼                                │
   ┌──────────────┐       Restore Action   │
   │   Archived   ├────────────────────────┘
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │    Trash     │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Permanent   │
   │   Deletion   │
   └──────────────┘
```

## Core Guarantees

1. **Complete vs Archive**:
   - `Completed`: Milestone finished; may remain in recent active dashboards.
   - `Archived`: Retained permanently, excluded from active default queries, fully searchable, backlinks and connections remain valid, single-click instant restore to `Active`.
2. **No Silent Auto-Archiving**: Inactivity suggestions may identify candidates ("Completed project inactive for 6 months - Archive?"), but resources are **never** archived automatically without explicit user approval.
3. **Safe Bulk Archive**: Bulk archiving emits a single grouped semantic activity event.
