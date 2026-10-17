# V2.22 Personal OS Feature Gap Ledger

**Phase:** V2.22 — Personal OS Feature Completion  
**Standard:** Every first-party Personal OS domain must provide a complete, purposeful, end-to-end workflow—not a generic CRUD screen, placeholder, or disconnected storage silo.  
**Evaluated Systems:** Goals, Areas, Reviews, People, Organizations, Interactions, Tracking, Habits, Routines, Learning, Courses, Study Sessions, Spaced Repetition, Library, Media Progress, References, Finance, Health, Travel, Assets, Decisions, Experiments, Home Contributions, Context Integration, Attention Providers, Activity Producers, Saved Views, Mobile Workflows, and Domain Exporters.

---

## 1. Domain Capability Classification Matrix

| Domain / Subsystem | Capability / Feature Target | Pre-V2.22 State | V2.22 Classification | V2.22 Resolution & Architecture Plan |
|---|---|---|---|---|
| **Goals** | Strategic outcome definition & why it matters | Partially implemented | **Complete** | Explicit outcome and motivation fields; no fake % from tasks; review date linkage; project relations. |
| **Goals** | Lifecycle & Review (Active vs Achieved vs Archived) | Partially implemented | **Complete** | Dedicated distinct states; integrated into shared Review system; factual target metric tracking. |
| **Areas** | Ongoing responsibility definitions & active projects | Partially implemented | **Complete** | Ongoing responsibility areas distinct from finite projects; canonical project relations. |
| **Reviews** | Human Review workflow (Weekly, Project, Goal, Area, Decision) | Partially implemented | **Complete** | Step-by-step guided review runner; evidence inspection from Activity/Query; reflection capture; snapshot history. |
| **People** | Personal relationship memory (not sales CRM) | Partially implemented | **Complete** | Minimal creation (name); important context; recent interactions; shared projects; contact info. |
| **People** | Interaction Quick Log & canonical Follow-up Tasks | Partially implemented | **Complete** | One-tap interaction logging; canonical Tasks linked to Person; factual overdue follow-up attention. |
| **People** | Safe duplicate detection & preview-based merge | Inconsistent | **Complete** | Strong signals only (exact email/phone); preview preserved relations, interactions, tasks & notes; no auto-merge. |
| **Organizations** | Simple organization record (name, people, projects, notes) | Missing | **Complete** | Minimal, non-CRM organization container linking people and projects. |
| **Tracking** | Factual tracker definitions (number, boolean, scale, duration, text) | Partially implemented | **Complete** | Typed tracker definitions with explicit units and target directions. |
| **Tracking** | Quick Log & Factual Missing Data Semantics | Partially implemented | **Complete** | Low-friction quick log; missing data != failure; zero guilt/judgmental scoring. |
| **Habits** | Factual logging (Done, Skipped, No Entry) & Today integration | Partially implemented | **Complete** | Clean one-tap logging; non-punitive streak calculation; integrated into Today view. |
| **Routines** | Repeatable multi-step processes & execution runs | Partially implemented | **Complete** | Sequential step runner; execution history; complete/abandon states; Today schedule presence. |
| **Learning** | Structured Course management & material linking | Partially implemented | **Complete** | Course container with canonical links to Library items, References, Notes, Tasks, and Assessments. |
| **Learning** | Study Session lifecycle (Start -> Study -> Record -> Complete) | Partially implemented | **Complete** | Explicit lifecycle session timer/duration (no passive inference); focus goal; note capture. |
| **Learning** | Spaced Repetition flashcards (SM-2 / Leitner deterministic) | Partially implemented | **Complete** | Card creation from notes/highlights/manual; due cards review session with rating & scheduling; zero AI hallucination. |
| **Library** | Multi-type items (Book, Article, PDF, Video, Podcast) | Partially implemented | **Complete** | Uniform library items with progress tracking (page, %, timestamp, chapter); Continue reading queue. |
| **Library** | Highlights, Annotations & Research Note integration | Partially implemented | **Complete** | Canonical Note and citation relations; highlight extractor; research context integration. |
| **References** | Citation & bibliographic linking | Partially implemented | **Complete** | Integrated with Library, Courses, Projects, and Notes; BibTeX / CSL-JSON export. |
| **Finance** | Account ledger & exact integer cents / decimal arithmetic | Partially implemented | **Complete** | Zero floating point inaccuracy; accounts with derived balances. |
| **Finance** | Single logical Transfers & safe deletion | Inconsistent | **Complete** | One logical transfer record touching source & destination accounts without double-counting expense/income. |
| **Finance** | Split Transactions & exact sum invariant | Inconsistent | **Complete** | Strict invariant: sum(splits) == totalAmount; interactive split editor. |
| **Finance** | Categories, Budgets & Recurring Bill commitments | Partially implemented | **Complete** | Categories; period budgets with derived actuals; bill reminders without phantom bank executions. |
| **Finance** | Privacy & Offline Guarantee | Partially implemented | **Complete** | Excluded from external AI; hidden detailed balances on Home; 100% offline local operation. |
| **Health** | Measurements with mandatory source provenance & explicit units | Partially implemented | **Complete** | Provenance tags (manual, Apple Health, medical record, csv); raw value preservation; no diagnostic AI. |
| **Health** | Appointments (Calendar) & Medication Schedules | Partially implemented | **Complete** | Appointment events projected into Calendar; medication schedules without medical advice. |
| **Health** | Privacy & Offline Guarantee | Partially implemented | **Complete** | Strict isolation; local persistence; no external AI access; no health score clutter on Home. |
| **Travel** | Trip planning vs Active Travel Mode | Partially implemented | **Complete** | Distinct pre-trip itinerary/packing vs active on-the-ground mode; timezone-safe reservations. |
| **Travel** | Offline Itinerary Pack & Document Access | Partially implemented | **Complete** | Offline package preparation; local document and reservation verification; packing tasks. |
| **Assets** | Asset identity, warranty dates & document attachments | Partially implemented | **Complete** | Serial numbers, purchase date, warranty expiration date tracking, receipt attachments. |
| **Assets** | Maintenance records, schedules & Person loans | Partially implemented | **Complete** | Logged maintenance service with cost/provider; maintenance due alerts; person loan tracking with due return tasks. |
| **Decisions** | Reasoning preservation, options, evidence & predictions | Partially implemented | **Complete** | Question, options, linked evidence notes, choice, immutable prediction snapshot at decision time. |
| **Decisions** | Retrospective Outcome & Decision Review | Partially implemented | **Complete** | Outcome recording; Decision Review comparing expected vs actual; learning reflection. |
| **Experiments** | Bounded personal tests (hypothesis, method, duration, result) | Partially implemented | **Complete** | Linked trackers; duration tracking; non-causal observation reviews. |
| **Domain Home** | Earned, continuable, non-clutter Home contributions | Inconsistent | **Complete** | High-value sections only (Continue Reading, Study Due, Upcoming Trip, Maintenance Due, Goal Review Due). |
| **Domain Attention**| Factual, deduplicated, auto-resolving attention items | Partially implemented | **Complete** | Bounded actionable reasons (Review due, Overdue follow-up, Bill due, Maintenance due); zero guilt nagging. |
| **Domain Activity** | Meaningful semantic milestone emission | Partially implemented | **Complete** | Meaningful lifecycle milestones only (zero property-edit noise); privacy-guarded for Finance & Health. |
| **Domain Context**  | Domain-specific Context Frame roots | Partially implemented | **Complete** | Context envelopes for Project, Course, Trip, Goal, Person; auto-prefills relations in active frame. |
| **Domain Views**    | Standard default Saved Views per domain | Inconsistent | **Complete** | Small, high-utility saved views for all 11+ domains. |
| **Domain Mobile**   | Responsive single-column touch workflows | Partially implemented | **Complete** | Mobile-adapted quick logging, review cards, flashcard study, transaction entry, active travel mode. |
| **Domain Export**   | First-party structured export entrypoints | Partially implemented | **Complete** | vCard for People, CSV/JSON for Finance/Tracking/Assets, ICS for Travel, Markdown for Decisions/Reviews. |

---

## 2. Invariant & Safety Checklist

- [x] **Finance Exactness**: Integer cents throughout, $\sum \text{splits} = \text{totalAmount}$, Transfers maintain equal and opposite account deltas.
- [x] **Health Provenance**: Every measurement stores immutable source provenance and explicit unit. No diagnostic AI conclusions.
- [x] **Goal Realism**: Zero arbitrary percentage calculations from simple task completion counts.
- [x] **Decisions Reasoning**: Historical prediction snapshot is preserved immutably once choice is made.
- [x] **Travel Timezones**: Explicit destination timezone stored per reservation and trip.
- [x] **Zero Duplicate Engines**: No domain creates a private task scheduler, private calendar, or private review engine.
- [x] **Zero Dead Controls**: 100% of domain actions trigger valid handlers with immediate state updates.
- [x] **Zero Network Reliance**: 100% of domain features run locally in IndexedDB / memory.
