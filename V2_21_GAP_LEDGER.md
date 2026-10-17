# V2.21 Core Experience Gap Ledger

**Phase:** V2.21 — Core Experience Completion  
**Date:** 2026-09-14  
**Status:** Executed & Resolved

---

## Classification Categories
- **Missing**: Functionality completely absent in the core user experience.
- **Partially implemented**: Core logic exists in parts but lacks seamless integration, fallback handling, or full lifecycle.
- **Broken**: Functional defect or state loss in specific scenarios (e.g. back navigation state drop, soft keyboard cover).
- **Duplicated**: Competing components or query paths for the same logical concept.
- **Inconsistent**: Behavioral divergence across desktop vs mobile vs tablet or different modalities.
- **Ready**: Fully implemented, tested, single authoritative path, verified.
- **Out of V2.21 scope**: Specialized domain features reserved for V2.22–V2.25.

---

## 1. Application Shell & Navigation

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Startup & State Restoration | **Partially implemented** $\to$ **Ready** | Vault unlock restores workspace, active context, and route; invalid routes fall back gracefully to Home. |
| Invalid Last Route Recovery | **Partially implemented** $\to$ **Ready** | Safe fallback prevents blank/broken shell if prior resource/view was deleted or renamed. |
| Desktop Sidebar & Density | **Ready** | Collapsible sections: Home, Notes, Tasks, Calendar, Projects, Context, Inbox, Saved Views, Workspaces. |
| Mobile Navigation Shell | **Partially implemented** $\to$ **Ready** | Bottom bar allows 1-tap navigation to Home, Notes, Plan, Inbox, and Search without desktop sidebar. |
| Tablet Navigation & Responsive Panes | **Partially implemented** $\to$ **Ready** | Multi-pane split screen with collapsible sidebar and adaptive inspector sheet. |
| Back / Forward Navigation Stack | **Partially implemented** $\to$ **Ready** | Search query and scroll position preserved across item drill-down and back navigation. |
| Favorites System | **Duplicated** $\to$ **Ready** | Unified under single ResourceCore `pinned` / `isFavorite` index and Saved Views registry. |

---

## 2. Home & Quick Capture

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Continue / Resume Logic | **Partially implemented** $\to$ **Ready** | Deterministic resolution: Active Context $\to$ Recent Project $\to$ Unfinished Review $\to$ Open Workspace. |
| Attention Section | **Partially implemented** $\to$ **Ready** | Deduplicated high-relevance actionable items (overdue tasks, sync conflicts, automation alerts). |
| Today Summary | **Duplicated** $\to$ **Ready** | Powered by single shared temporal service; deduplicates scheduled and due tasks. |
| Inbox Summary | **Ready** | Displays bounded unprocessed item count with 1-click processing. |
| Fresh User Empty State | **Partially implemented** $\to$ **Ready** | Clean onboarding cards: Create Note, Create Task, Quick Capture. No domain jargon. |
| Section Error Isolation | **Partially implemented** $\to$ **Ready** | Individual section error boundaries prevent single widget failures from crashing Home. |
| Quick Capture Instant Flow | **Ready** | Invoke $\to$ Type $\to$ Save; text, note, and task conversion with context prefill. |
| Quick Capture Failure Recovery | **Partially implemented** $\to$ **Ready** | Session storage cache prevents text loss during accidental dismissal or network drop. |

---

## 3. Notes & Unified Editor

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Note Creation & Untitled Drafting | **Ready** | Auto-saves with temporary/untitled title, editable immediately. |
| Note Save / Reopen / Identity | **Ready** | Canonical markdown content, stable UUID identity across rename and move. |
| Note Lifecycle (Archive / Trash / Delete) | **Ready** | Distinct statuses: active, archived, trashed (recoverable), permanent purge with confirmation. |
| Markdown Formatting & Blocks | **Ready** | Paragraphs, headings (H1–H6), bold, italic, lists, checkboxes, code, tables, math, Mermaid, attachments. |
| Undo / Redo & IME Safety | **Ready** | Native input history preservation and non-destructive composition events. |
| Slash Commands | **Inconsistent** $\to$ **Ready** | Restricted to high-value text transformations and insertions; zero duplicate command palette commands. |
| Daily Notes System | **Ready** | Date-only identity (`YYYY-MM-DD`), 1-click today creator, template prefill. |
| Tags & Folders | **Ready** | Bulk-safe tag renaming, folder hierarchy without tying resource identity to path. |
| Wikilinks & Backlinks | **Ready** | Fast autocomplete, exact source navigation, unlinked mentions resolution. |
| Mobile Editor Keyboard Avoidance | **Partially implemented** $\to$ **Ready** | Floating compact toolbar above soft keyboard; touch targets $\ge 44\text{px}$. |

---

## 4. Search, Switcher & Commands

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Global Search Engine | **Duplicated** $\to$ **Ready** | Unified full-text index with exact match locations, heading snippets, and scoped filters. |
| Scoped Search | **Ready** | Filter by Resource Type, Active Context, and Tags without separate modals. |
| Quick Switcher | **Ready** | Fast keyboard switcher (`Ctrl/Cmd+O`) for recently opened resources, views, and workspaces. |
| Command Palette | **Inconsistent** $\to$ **Ready** | 100% action coverage for core operations; 0 dead or placeholder commands. |

---

## 5. Tasks, Today & Calendar

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Task Fast Creation | **Ready** | Single-line quick add with automatic Enter-to-commit. |
| Due Date vs Scheduled Date | **Inconsistent** $\to$ **Ready** | Due represents hard deadline; Scheduled represents intended work session. |
| Task Completion & Reopen | **Ready** | Immediate state toggle with undo toast and activity log generation. |
| Task Relations | **Ready** | Canonical bidirectional links to Projects, Contexts, and People. |
| Today & Agenda Timeline | **Ready** | Chronological deduplicated view of overdue tasks, today's schedule, and routines. |
| Calendar Multi-View | **Ready** | Day, Week, Month, and Agenda views with projected scheduled tasks. |
| Non-Drag Scheduling Alternative | **Partially implemented** $\to$ **Ready** | Modal and inline date/time picker allowing keyboard and accessibility-compliant scheduling. |

---

## 6. Projects & Context

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Minimal Project Creation | **Ready** | Name and optional outcome; progressive disclosure for dates and members. |
| Project Core Dashboard | **Ready** | Outcome, status, next action, open tasks, key notes, decisions, and history. |
| Context Frame & Working Set | **Partially implemented** $\to$ **Ready** | Explicit focus envelope binding root resource, pinned items, open tasks, and scoped search. |
| Context Switch & Leave | **Ready** | Seamless context switching; state persisted and integrated into Home Continue. |
| Context Creation Prefill | **Partially implemented** $\to$ **Ready** | Creating notes or tasks within active context automatically sets bidirectional relations. |

---

## 7. Inbox & Processing

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Unified Local Inbox | **Ready** | Aggregates quick captures, web clips, and local incoming items. |
| Processing Flow (Note/Task/Project/Library) | **Ready** | 1-click transformation into target resource type with provenance preservation. |
| Process + Next | **Partially implemented** $\to$ **Ready** | Sequential queue traversal without re-rendering or duplicate processing. |
| Safe Bulk Operations | **Ready** | Bulk archive, tag, or delete with confirmation. |

---

## 8. Saved Views, Workspaces & Panes

| Component / Subsystem | Status | Notes & Resolutions |
| :--- | :--- | :--- |
| Saved Views & Modified State | **Partially implemented** $\to$ **Ready** | Visual indication of unsaved filter/sort modifications; Save, Reset, Save as New actions. |
| Safe View Deletion | **Ready** | Deleting a Saved View never deletes underlying resources. |
| Workspaces & 1–3 Pane Layout | **Ready** | Note+PDF, Project+Note, Review+Evidence layouts; background memory cleanup on pane close. |
| Unified Inspector | **Duplicated** $\to$ **Ready** | Single shared inspector with Details, Connections, Context, Source, and History tabs. |

---

## 9. Out of Scope for V2.21 (Reserved for V2.22–V2.25)

| Subsystem | Scope Allocation |
| :--- | :--- |
| Specialized First-Party Life Domains (Finance, Health, Travel deep engines) | V2.22 — Personal OS Feature Completion |
| Multi-Modal Intelligence, AI Agent orchestration, Deep Automated Synthesis | V2.23 — Automation, Intelligence & Reporting Completion |
| External Cloud & Protocol Connectors (CalDAV, IMAP, Obsidian Vault Sync, WebDAV) | V2.24 — Ecosystem & Data Interoperability Completion |
| Platform Packaging, App Store Bundling, Native Desktop Installers | V2.25 — Platform & Feature Completion Freeze |
