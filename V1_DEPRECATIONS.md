# PKM V1.x Deprecations & Terminology Migration Guide

**Document Version:** 1.10.0  
**Effective Date:** September 2026  

---

## 1. Overview

This document tracks all deprecated terminology, settings keys, export formats, and API aliases across the V1.x release cycle. In accordance with the **V1.x Stability Contract**, all deprecated keys continue to be accepted and non-destructively normalized during runtime and schema migration.

---

## 2. Terminology Deprecation Matrix

| Deprecated Term | Canonical V1.10 Term | Category | Deprecated In | Removal Schedule | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Smart View` | **Saved View** | Terminology | V1.6 | V2.0 (if created) | Unified terminology across custom filters, search queries, and domain tables. |
| `Saved Search` | **Saved View** | Terminology | V1.6 | V2.0 | Redundant with Saved View schema. |
| `Quick Access` | **Favorite** | Terminology | V1.6 | V2.0 | Standardized with universal sidebar Pin/Favorite behavior. |
| `Page` | **Note** | Terminology | V1.0 | V2.0 | Canonical atomic knowledge unit is the Note. |
| `settings.smart_query_mode` | `settings.saved_view_filters` | Settings Key | V1.9 | V2.0 | Normalized under the centralized settings schema. |
| `pkm_export_v1_raw` | `pkm_portable_vault_v1_8` | Export Format | V1.8 | V2.0 | Upgraded to the structured Portable Vault specification with JSON manifest. |

---

## 3. Backward Compatibility & Migration Behavior

When a user imports an older vault containing deprecated terms or legacy settings keys:
1. `deprecationsService.ts` automatically maps legacy fields to canonical structures.
2. The original raw data is kept intact until explicitly rewritten by a user save action.
3. No user configuration or custom filter is invalidated or deleted.
