# Module Layer Boundaries & Dependency Rules (V1.9)

## 1. Direction of Dependency
Dependencies MUST strictly flow downwards:
```
Presentation (UI) ──▶ Application / Actions ──▶ Domain Services ──▶ Core Infrastructure
```

## 2. Inviolable Boundary Rules
1. **No Direct Storage Access from UI**: Presentation components (`/src/components/*`, `/src/pkm/ui/*`) must NEVER import raw IndexedDB adapters or encryption storage directly. All mutations and reads must pass through designated Domain Services or Action Registries.
2. **Cross-Domain Isolation**: Domain A (e.g. `TravelService`) must never directly modify the storage layer of Domain B (e.g. `FinanceService`). All inter-domain interactions must use explicit public domain interfaces.
3. **Privileged Module Protection**: Only `/src/pkm/encryption` and `/src/pkm/security` may access raw key derivation parameters and decrypted keystores.
4. **Plugin Sandbox Boundary**: Plugins executing inside the V1.5 sandbox can only access capabilities granted explicitly via the permission manifest and exposed through the mediated `extensionBridge`.
5. **Deterministic Serialization**: Serializers must avoid object key churn to guarantee reproducible backups, Git commits, and deterministic checksums.
