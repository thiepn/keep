# Security Architecture & Trust Boundaries (V1.9)

## 1. Zero-Trust Local-First Model
- The application executes strictly client-side.
- Zero analytics, tracking beacons, or telemetry backends exist.
- All network operations are explicitly user-initiated (e.g. Git sync, external connectors).

## 2. Cryptographic Invariants
- AES-GCM-256 with PBKDF2/Argon2 key derivation.
- Zeroing of decrypted key materials and plaintext caches immediately upon vault lock event (`cacheRegistry.onVaultLock()`).
- Automated redaction of sensitive credentials, API keys, and PII from error logs and diagnostic buffers (`redactSensitiveErrorMessage`).

## 3. Sandboxed Extensions & Integrations
- Third-party plugins execute in an isolated runtime barrier.
- Strict manifest-based capability mediation prevents unauthorized storage, network, or UI DOM access.
