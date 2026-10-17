# V2 Foundation Decision Document

**Document Version:** 2.0.0-GA  
**Effective Date:** September 2026  
**Status:** APPROVED & BINDING  
**Preceding Reference:** V1.10 Quality Ceiling Certification & V2 Readiness Review  

---

## 1. Executive Summary & Purpose

The Personal OS / PKM application completed its V1.x lifecycle at **V1.10** with 100% test pass rate across 12 certification pillars and 15 architecture principles. The system achieved sub-35ms latencies, zero-knowledge encryption, and high data durability.

However, V1 accumulated 15+ specialized life domains, separate indexing models for Markdown vs structured items, and bespoke relation/filter abstractions. The purpose of **V2.0** is:

> **Preserve everything that made V1 trustworthy, while simplifying its conceptual model, reducing architectural complexity, improving scalability, strengthening modularity, and creating a cleaner foundation for the next several years of development.**

V2.0 is **simpler, not larger**. It introduces zero new life domains, maintains sovereign Markdown notes, preserves 100% offline autonomy, and delivers a deterministic, reversible V1→V2 migration engine.

---

## 2. The Three Fundamental Reasons for V2

In accordance with strict architectural governance, V2 is justified by exactly three structural reasons that could not be achieved cleanly through incremental V1.x patches:

### Reason 1: Decoupled First-Party Module Architecture & Lazy Loading Boundaries

* **Problem:** In V1, 15+ specialized domains (Finance, Health, Travel, Learning, Assets, Decisions, etc.) were hardwired across the top-level application root (`App.tsx`), eagerly importing large visualization libraries and domain engines even for users who only desired a clean, minimal Notes + Tasks + Calendar experience.
* **Evidence:** In V1.10, eager root imports contributed to an initial main chunk of ~1.8 MB. Inactive domains still registered static context listeners and event subscribers in the root lifecycle.
* **Why V1 cannot solve safely:** Incrementally lazy-loading inside `App.tsx` created tangled conditional rendering, fragmented modal dialog states, and race conditions during vault unlock without a formal Module Contract.
* **Required deep architectural change:** Formalize the `V2ModuleContract` and `V2ModuleRegistry`. Core system (Notes, Tasks, Calendar, Home, Context, Inbox, Search, Security) remains lightweight and always available. Optional domains register decoupled routes, search adapters, context providers, and home widgets that load dynamically on first access.
* **Migration impact:** None to user data. Domain enablement flags map 1:1 from V1 preferences; disabling a domain UI never mutates or deletes underlying records.
* **Expected user benefit:** 42% reduction in initial core bundle execution time, immediate cold-start responsiveness, and a distraction-free default workspace for minimalist users.
* **Risk:** Potential UI flashing if lazy-loaded modules lack consistent fallback shells. *Mitigated by standard V2 modular loading skeletons and error boundaries.*

---

### Reason 2: Unified Resource, Connection, and Query Foundations

* **Problem:** V1 evolved distinct parallel mechanisms for connecting and querying data:
  1. Human Wikilinks vs Typed Relations vs PDF Citations vs Backlinks each used disparate indexing and traversal routines.
  2. Saved Views, Collections, Dashboards, and Markdown Query Blocks used redundant, fragmented filter evaluation logic.
* **Evidence:** The codebase contained 3 separate AST/filter evaluation paths (`queryEngine.ts`, `smartViews.ts`, `collections/collectionEngine.ts`) with slight syntax divergences (e.g. `is:`, `status=`, `where`).
* **Why V1 cannot solve safely:** Harmonizing these engines in V1 risked subtle query behavior regressions across user-saved views without an explicit schema and query normalization layer.
* **Required deep architectural change:** 
  1. Establish `ResourceCore` (`id`, `type`, `title`, `createdAt`, `updatedAt`, `archived`) and capability flags (`searchable`, `linkable`, `relatable`, `temporal`, `contextual`) without turning Markdown notes into generic database rows.
  2. Unify all edges into a single derived `ConnectionIndex` (categorized by human wikilinks, typed relations, citations, and backlinks).
  3. Create a single typed `UnifiedQueryAST` and execution engine serving Saved Views, Collections, Dashboards, and Query Blocks with identical filter semantics (`equals`, `contains`, `before`, `after`, `in`, `matches`).
* **Migration impact:** Automatic deterministic migration of legacy saved search strings and smart views into normalized V2 query definitions with 100% result equivalence.
* **Expected user benefit:** Consistent querying everywhere, faster graph/context traversal, single unified "Connections" view in note sidebars, and predictable filter behavior across all modules.
* **Risk:** Legacy regex queries might return slightly different edge results. *Mitigated by comprehensive query equivalence test suites comparing V1 vs V2 result sets.*

---

### Reason 3: Staged, Reversible Multi-Phase Migration Architecture with Cryptographic Parity

* **Problem:** V1 schema migrations operated sequentially in-place inside storage transactions. For high-risk schema evolutions or full-vault refactors, in-place migration lacked pre-flight space analysis, dry-run previews, and immediate one-click rollback if interrupted.
* **Evidence:** In simulated power-loss or storage quota exhaustion during large 50k-note migrations, partial writes required manual backup restoration.
* **Why V1 cannot solve safely:** The V1 migration registry lacked an isolated staging buffer and transaction journal separating canonical note validation from derived index rebuilding.
* **Required deep architectural change:** Implement the 8-phase `V1ToV2MigrationEngine`:
  `Analyze` → `Backup` → `Stage` → `Transform` → `Verify` → `Commit` → `Rebuild Derived Data` → `Finalize`.
  Includes pre-flight disk estimation, SHA-256 verification of every note, automatic preservation of the pre-migration V1 backup, and crash-resilient journal recovery.
* **Migration impact:** Zero data loss guarantee. V1 backups remain completely preserved and restorable directly into V2.
* **Expected user benefit:** Absolute peace of mind during upgrade; transparent migration report showing exact counts of migrated, preserved, and converted items; verified encrypted vault migration without plaintext leakage.
* **Risk:** Migration requires temporary storage headroom equal to ~1.2x vault size during staging. *Mitigated by pre-flight storage quota checks before initiating transform.*

---

## 3. What Did NOT Change (Frozen V1 Foundations Preserved in V2)

1. **Markdown Canonical Format:** User notes remain standard CommonMark/GFM files with YAML frontmatter. No proprietary JSON document formats.
2. **Offline-First & Local-Only Execution:** 100% of computation, indexing, and storage runs strictly client-side. Zero mandatory internet access.
3. **Zero-Knowledge Encryption:** AES-GCM-256 with PBKDF2 (100,000 rounds). Memory keys zeroed immediately upon vault lock.
4. **No Mandatory Cloud, No Accounts:** No registration, no telemetry tracking, no user profiling, no remote telemetry pings.
5. **AI Remains Optional & Non-Destructive:** AI requires explicit user-provided API keys or local WebAssembly models. AI cannot silently overwrite notes.
6. **Plugin Sandbox & Bounded Permissions:** Third-party extensions run in restricted iframe/Worker sandboxes with manifest-enforced capabilities.
7. **Sovereign Portability & "Leave the App":** 1-click export of the entire workspace as human-readable Markdown folders + attachments.

---

## 4. Final Architectural Scope & Non-Goals

* **NO New Life Domains:** V2.0 focuses strictly on core foundation, simplification, and performance.
* **NO Multi-User Cloud Real-Time Collaboration in V2.0:** Single-user multi-device sync via Git / P2P remains sovereign and deterministic.
* **NO Wholesale Framework Rewrites:** React, Vite, and IndexedDB/OPFS remain the proven, performant runtime foundation.
