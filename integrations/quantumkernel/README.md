# ![Space Child](space-child.png "Space Child")

# QuantumKernel Integration (JS)

See `integrations/quantumkernel/quantum_client.js` for a minimal client.

Set base URL and call endpoints as needed. Start QuantumKernel API separately.

## Auto bootstrap (recommended)

Include after the client to auto-configure base URL and safe mode:

```html
<script src="/integrations/quantumkernel/quantum_client.js"></script>
<script src="/integrations/quantumkernel/bootstrap.js"></script>
```

## Env-driven config

Base URL resolves from `window.QK_BASE_URL`, `process.env.QK_BASE_URL`, or `localStorage:QK_BASE_URL`. You can still call `qk.setBaseUrl()` to override.

## Safe mode and readiness

- Safe mode is on by default: API errors return `{ success:false, error:"..." }` instead of throwing. Toggle with `qk.configure({ safe:false })`.
- Wait for API: `await qk.waitForReady(5000)`.
