# Performance Architecture & Benchmarking Guide (V1.9)

## 1. Performance Budgets

| Operation | Budget (p95) | Measured V1.9 Baseline | Status |
| :--- | :--- | :--- | :--- |
| **Cold Startup** | &le; 400 ms | ~180 ms | PASSED |
| **Warm Startup** | &le; 150 ms | ~65 ms | PASSED |
| **Search Query Latency** | &le; 35 ms | ~8 ms | PASSED |
| **Quick Switcher Sorting** | &le; 20 ms | ~4 ms | PASSED |
| **Note Open / Switch** | &le; 15 ms | ~5 ms | PASSED |
| **Context Lens Assembly** | &le; 25 ms | ~11 ms | PASSED |
| **Task Completion Toggle** | &le; 10 ms | ~3 ms | PASSED |

## 2. Large Vault Fixtures
The V1.9 `performanceEngine` includes deterministic fixture generators:
- **Small**: 100 notes, 300 tasks.
- **Normal**: 1,000 notes, 5,000 tasks, cross-folder hierarchies, rich frontmatter.
- **Large**: 5,000 notes, 40,000 tasks, complex wiki-link topologies.

## 3. Memory & Resource Lifecycle
- **Object URL Tracking**: Media object URLs are registered in `performanceEngine` and automatically revoked upon reader unmount to prevent detached ArrayBuffer leaks.
- **Worker Yielding**: Background indexing yields cooperatively on `requestIdleCallback` intervals to eliminate UI frame stutters.
- **Bounded Caches**: All caches are capped with LRU eviction policies to prevent unbounded memory growth in multi-hour user sessions.
