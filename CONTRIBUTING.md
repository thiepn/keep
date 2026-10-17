# Contributing Guide & Developer Workflow (V1.9)

## 1. Quickstart & Clean Environment Setup
1. **Requirements**: Node.js 18+ (LTS), npm 9+.
2. **Install**: `npm install`
3. **Development**: `npm run dev` (Runs Vite dev server on port 3000)
4. **Type Check**: `npm run lint` (`tsc --noEmit`)
5. **Build**: `npm run build` (Compiles production static assets to `dist/`)

## 2. Inviolable Code Rules
- **No Direct Storage in UI**: Use domain services (`notesService`, `financeService`, etc.).
- **Bounded Caches**: Register in-memory maps in `cacheRegistry`.
- **Background Tasks**: Schedule heavy asynchronous work via `taskCoordinator.schedule(...)`.
- **Error Handling**: Use typed errors from `@pkm/core/errors` with stable error codes.
- **Backwards Compatibility**: Schema changes MUST be registered in `migrationRegistry` with unknown-field preservation.
