# PKM V1.x Stability Contract & Architecture Freeze

**Document Version:** 1.10.0  
**Effective Date:** September 2026  
**Status:** FROZEN  

---

## 1. Scope and Purpose

This document constitutes the formal stability contract for the **Personal OS / PKM V1.x** application. It establishes immutable guarantees regarding data integrity, schema evolution, user sovereignty, and maintenance commitments.

---

## 2. Frozen Core Elements

The following systems and interfaces are declared **FROZEN** and will not undergo breaking changes:

1. **Storage Format:** Canonical user notes are stored as standard Markdown (`.md`) with optional YAML frontmatter.
2. **Resource Identity:** All user items adhere to standard Universal Resource Descriptors (UUIDv4 identifiers, timestamps, metadata envelopes).
3. **Encryption Contract:** Encrypted vaults use standard AES-GCM-256 with PBKDF2 (100,000 iterations). Vault lock unconditionally clears decrypted data from in-memory caches.
4. **Offline First:** No core feature may ever require internet connectivity, cloud authentication, or external API endpoints.
5. **Information Architecture Triad:**
   - **Search (`/` or `Ctrl+F`):** Searches content and attributes.
   - **Quick Switcher (`Ctrl+O` / `Cmd+O` / `Ctrl+K`):** Jumps directly to notes, folders, and resources.
   - **Command Palette (`Ctrl+P` / `Cmd+P`):** Executes system actions and commands.
6. **Canonical Terminology:**
   - **Note** (not Page or Doc)
   - **Saved View** (not Smart View or Saved Search)
   - **Favorite** (not Quick Access)

---

## 3. Data Compatibility & Non-Destructive Migrations

- **Unknown Field Preservation:** All future minor and patch upgrades must preserve unrecognized JSON fields in user vaults without deletion or mutation.
- **Forward & Backward Compatibility:** The schema versioning engine (`migrationRegistry.ts`) guarantees dry-run upgrade verification from V1.0 to V1.10.
- **Rebuildable Derived Indexes:** Any cache, search index, or graph link database can be discarded and reconstructed from canonical notes without data loss.

---

## 4. Maintenance Roadmap for V1.x

Future updates within the V1.x line are restricted to:
- Routine dependency updates and browser platform security fixes.
- Performance optimizations within existing bounded resource structures.
- Optional non-breaking connector integrations and plugin API extensions.
- Bug fixes documented in the Master Quality Ledger.
