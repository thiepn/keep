# PKM V2.4 — Semantic Activity Architecture

## Overview

The V2.4 Semantic Activity Engine provides a low-noise, offline-first, privacy-conscious timeline of meaningful changes across the vault.

```
Canonical Mutation (Resource / Task / Action)
        │
        ▼
   Domain Event
        │
        ▼
Semantic Activity Projection
  • Edit Session Coalescing (10m window)
  • Bulk / Import Summarization
  • Privacy Filtering (Health / Finance)
        │
        ▼
  ActivityIndexV2 (Multi-index: Time, Resource, Context, Domain)
        │
   ┌────┴───────────────────────────┬───────────────────────────┐
   ▼                                ▼                           ▼
Activity Timeline              What Changed               Review Evidence
```

## Non-Negotiable Principles

1. **No Surveillance / Clickstream**: Ordinary interactions (scrolling, hovering, opening tabs, typing in search) are strictly excluded.
2. **Session Coalescing**: Consecutive autosaves on the same resource within 10 minutes coalesce into a single `resource_edited` session event with an exact `editCount`.
3. **Deterministic Identity & Deduplication**: Event IDs (`act_{type}_{resourceId}_{timestamp}_{originDeviceId}`) guarantee convergence across multi-device sync without duplicating task completions.
4. **Privacy Tiers**: Sensitive domains (Health, Finance) are excluded from the broad activity stream by default or have sensitive payload amounts masked.
