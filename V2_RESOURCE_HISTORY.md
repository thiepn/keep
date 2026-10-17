# PKM V2.4 — Resource History Architecture

## Overview

Resource History brings together 3 distinct historical layers into a unified Inspector panel without duplicating engines:

1. **Semantic Activity**: High-level meaningful events (`resource_created`, `resource_edited` session batches, `resource_completed`, `resource_archived`, relations connected).
2. **Content Revisions**: Point-in-time document snapshots maintained by the Revision Engine for character-level diffs and single-click rollbacks.
3. **Canonical Domain History**: Domain-specific chronological records (e.g. Interactions for People, Maintenance logs for Assets, Decisions for Projects).
