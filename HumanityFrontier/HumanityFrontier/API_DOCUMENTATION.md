# 🔌 Quantum Shield API Documentation

Complete API reference for the HumanityFrontier Quantum Shield platform.

---

## 📋 **Table of Contents**

- [Base URL](#base-url)
- [Authentication](#authentication)
- [User Management](#user-management)
- [Quantum Key Management](#quantum-key-management)
- [Quantum Ledger Operations](#quantum-ledger-operations)
- [Quantum Entanglement Network](#quantum-entanglement-network)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [WebSocket Events](#websocket-events)

---

## 🌐 **Base URL**

```
Development: http://localhost:5000
Production:  https://your-domain.com
```

All API endpoints are prefixed with `/api`.

---

## 🔐 **Authentication**

Currently using session-based authentication. Future versions will support:
- JWT tokens
- Quantum-resistant signatures
- Zero-knowledge proof authentication

---

## 👤 **User Management**

### **Create User**

Create a new user account for quantum system access.

```http
POST /api/users
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | string | ✅ | Unique username (3-50 chars) |
| password | string | ✅ | Password (min 8 chars) |

**Response:** `201 Created`
```json
{
  "id": 1,
  "username": "cipher_seeker",
  "cipherName": null,
  "resonanceCode": null
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data format
- `409 Conflict` - Username already exists

---

### **Update User Profile**

Update cipher name and resonance code for a user.

```http
PUT /api/users/:id
Content-Type: application/json

{
  "cipherName": "string",
  "resonanceCode": "string"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "cipher_seeker",
  "cipherName": "QuantumSeeker",
  "resonanceCode": "QRC-7B2A9F"
}
```

---

## 🔑 **Quantum Key Management**

### **Create Quantum Key**

Generate a new quantum cryptographic key with superposition state.

```http
POST /api/quantum/keys
Content-Type: application/json

{
  "userId": 1,
  "keyId": "qk-abc123xyz",
  "entropyLevel": "0.87",
  "superpositionState": "|ψ+⟩ = (|00⟩ + |11⟩)/√2"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| userId | number | ✅ | User ID who owns the key |
| keyId | string | ✅ | Unique key identifier |
| entropyLevel | string | ✅ | Entropy measure (0.0-1.0) |
| superpositionState | string | ✅ | Quantum state representation |

**Response:** `201 Created`
```json
{
  "id": 1,
  "userId": 1,
  "keyId": "qk-abc123xyz",
  "entropyLevel": "0.87",
  "superpositionState": "|ψ+⟩ = (|00⟩ + |11⟩)/√2",
  "createdAt": "2025-10-08T21:26:24Z",
  "lastUsed": null,
  "isRevoked": false
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/quantum/keys \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "keyId": "qk-abc123",
    "entropyLevel": "0.87",
    "superpositionState": "|0⟩ + |1⟩"
  }'
```

---

### **Get Quantum Key**

Retrieve a specific quantum key by ID.

```http
GET /api/quantum/keys/:keyId
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "userId": 1,
  "keyId": "qk-abc123xyz",
  "entropyLevel": "0.87",
  "superpositionState": "|ψ+⟩ = (|00⟩ + |11⟩)/√2",
  "createdAt": "2025-10-08T21:26:24Z",
  "lastUsed": "2025-10-08T21:30:00Z",
  "isRevoked": false
}
```

**Error Responses:**
- `404 Not Found` - Quantum key does not exist

---

### **Get User's Quantum Keys**

Retrieve all quantum keys for a specific user.

```http
GET /api/quantum/keys/user/:userId
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "keyId": "qk-abc123",
    "entropyLevel": "0.87",
    "superpositionState": "|ψ+⟩",
    "createdAt": "2025-10-08T21:26:24Z",
    "lastUsed": "2025-10-08T21:30:00Z",
    "isRevoked": false
  },
  {
    "id": 2,
    "userId": 1,
    "keyId": "qk-def456",
    "entropyLevel": "0.93",
    "superpositionState": "|0⟩ - |1⟩",
    "createdAt": "2025-10-08T21:28:00Z",
    "lastUsed": null,
    "isRevoked": false
  }
]
```

---

### **Revoke Quantum Key**

Mark a quantum key as revoked (cannot be used for operations).

```http
PUT /api/quantum/keys/:keyId/revoke
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "userId": 1,
  "keyId": "qk-abc123",
  "entropyLevel": "0.87",
  "superpositionState": "|ψ+⟩",
  "createdAt": "2025-10-08T21:26:24Z",
  "lastUsed": "2025-10-08T21:30:00Z",
  "isRevoked": true
}
```

**Error Responses:**
- `404 Not Found` - Quantum key does not exist

---

## 📊 **Quantum Ledger Operations**

### **Record Quantum Operation**

Log a cryptographic operation in the quantum ledger.

```http
POST /api/quantum/ledger
Content-Type: application/json

{
  "keyId": "qk-abc123",
  "transactionId": "tx-xyz789",
  "operationType": "encrypt",
  "timestampVector": {
    "t": 1728426384000,
    "vector": [0.1, 0.5, 0.9]
  },
  "entanglementHash": "eh-hash123456",
  "metadata": {
    "status": "success",
    "complexity": 7,
    "dataSize": 1024
  }
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| keyId | string | ✅ | Quantum key used for operation |
| transactionId | string | ✅ | Unique transaction identifier |
| operationType | string | ✅ | One of: encrypt, decrypt, sign, verify |
| timestampVector | object | ✅ | Temporal quantum vector |
| entanglementHash | string | ✅ | Hash of entangled qubits |
| metadata | object | ❌ | Additional operation data |

**Response:** `201 Created`
```json
{
  "id": 1,
  "transactionId": "tx-xyz789",
  "keyId": "qk-abc123",
  "operationType": "encrypt",
  "timestampVector": {
    "t": 1728426384000,
    "vector": [0.1, 0.5, 0.9]
  },
  "entanglementHash": "eh-hash123456",
  "metadata": {
    "status": "success",
    "complexity": 7
  },
  "createdAt": "2025-10-08T21:26:24Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data format
- `404 Not Found` - Quantum key not found
- `403 Forbidden` - Quantum key is revoked

---

### **Get Ledger Entries by Key**

Retrieve all ledger entries for a specific quantum key.

```http
GET /api/quantum/ledger/key/:keyId
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "transactionId": "tx-xyz789",
    "keyId": "qk-abc123",
    "operationType": "encrypt",
    "timestampVector": {
      "t": 1728426384000,
      "vector": [0.1, 0.5, 0.9]
    },
    "entanglementHash": "eh-hash123456",
    "metadata": {
      "status": "success",
      "complexity": 7
    },
    "createdAt": "2025-10-08T21:26:24Z"
  }
]
```

---

### **Get Ledger Entry by Transaction**

Retrieve a specific ledger entry by transaction ID.

```http
GET /api/quantum/ledger/:transactionId
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "transactionId": "tx-xyz789",
  "keyId": "qk-abc123",
  "operationType": "encrypt",
  "timestampVector": {
    "t": 1728426384000,
    "vector": [0.1, 0.5, 0.9]
  },
  "entanglementHash": "eh-hash123456",
  "metadata": {
    "status": "success"
  },
  "createdAt": "2025-10-08T21:26:24Z"
}
```

**Error Responses:**
- `404 Not Found` - Transaction not found

---

## 🌐 **Quantum Entanglement Network**

### **Create Quantum Entanglement**

Create an entanglement between two quantum keys.

```http
POST /api/quantum/entanglements
Content-Type: application/json

{
  "sourceKeyId": "qk-abc123",
  "targetKeyId": "qk-def456",
  "entanglementType": "direct",
  "entanglementStrength": "0.92",
  "stateVector": {
    "coefficients": ["0.5", "0.5", "0.5", "0.5"],
    "phases": [0, 1.57, 3.14, 4.71]
  },
  "expiresAt": "2025-10-15T21:26:24Z"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| sourceKeyId | string | ✅ | Source quantum key ID |
| targetKeyId | string | ✅ | Target quantum key ID |
| entanglementType | string | ✅ | One of: direct, indirect, temporal |
| entanglementStrength | string | ✅ | Strength measure (0.0-1.0) |
| stateVector | object | ✅ | Mathematical entanglement state |
| expiresAt | string | ❌ | ISO 8601 expiration timestamp |

**Response:** `201 Created`
```json
{
  "id": 1,
  "sourceKeyId": "qk-abc123",
  "targetKeyId": "qk-def456",
  "entanglementType": "direct",
  "entanglementStrength": "0.92",
  "stateVector": {
    "coefficients": ["0.5", "0.5", "0.5", "0.5"],
    "phases": [0, 1.57, 3.14, 4.71]
  },
  "createdAt": "2025-10-08T21:26:24Z",
  "expiresAt": "2025-10-15T21:26:24Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data format
- `404 Not Found` - One or both keys not found
- `403 Forbidden` - Cannot entangle revoked keys

---

### **Get Entanglements by Key**

Retrieve all entanglements for a specific quantum key.

```http
GET /api/quantum/entanglements/key/:keyId
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "sourceKeyId": "qk-abc123",
    "targetKeyId": "qk-def456",
    "entanglementType": "direct",
    "entanglementStrength": "0.92",
    "stateVector": {
      "coefficients": ["0.5", "0.5", "0.5", "0.5"],
      "phases": [0, 1.57, 3.14, 4.71]
    },
    "createdAt": "2025-10-08T21:26:24Z",
    "expiresAt": "2025-10-15T21:26:24Z"
  }
]
```

---

### **Get Entangled Keys**

Retrieve all keys entangled with a specific key.

```http
GET /api/quantum/entanglements/key/:keyId/entangled
```

**Response:** `200 OK`
```json
[
  "qk-def456",
  "qk-ghi789",
  "qk-jkl012"
]
```

---

## ⚠️ **Error Handling**

All API errors follow this format:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error"
    }
  ]
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## 🚦 **Rate Limiting**

Current limits (per IP address):
- **General endpoints:** 100 requests/minute
- **Quantum operations:** 50 requests/minute
- **User creation:** 5 requests/minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1728426444
```

---

## 🔌 **WebSocket Events**

Future implementation will support real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:5000/quantum-stream');

ws.on('quantum:key:created', (data) => {
  console.log('New quantum key:', data);
});

ws.on('quantum:entanglement:formed', (data) => {
  console.log('New entanglement:', data);
});

ws.on('quantum:operation:recorded', (data) => {
  console.log('Operation logged:', data);
});
```

---

## 📝 **Usage Examples**

### **Complete Workflow Example**

```javascript
// 1. Create a user
const user = await fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'quantum_seeker',
    password: 'secure_password'
  })
}).then(r => r.json());

// 2. Generate quantum keys
const key1 = await fetch('http://localhost:5000/api/quantum/keys', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    keyId: 'qk-alice',
    entropyLevel: '0.87',
    superpositionState: '|0⟩ + |1⟩'
  })
}).then(r => r.json());

const key2 = await fetch('http://localhost:5000/api/quantum/keys', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    keyId: 'qk-bob',
    entropyLevel: '0.93',
    superpositionState: '|ψ+⟩'
  })
}).then(r => r.json());

// 3. Create entanglement
const entanglement = await fetch('http://localhost:5000/api/quantum/entanglements', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sourceKeyId: 'qk-alice',
    targetKeyId: 'qk-bob',
    entanglementType: 'direct',
    entanglementStrength: '0.95',
    stateVector: {
      coefficients: ['0.7', '0.0', '0.0', '0.7'],
      phases: [0, 0, 0, 3.14]
    }
  })
}).then(r => r.json());

// 4. Record quantum operation
const operation = await fetch('http://localhost:5000/api/quantum/ledger', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keyId: 'qk-alice',
    transactionId: 'tx-secure-001',
    operationType: 'encrypt',
    timestampVector: {
      t: Date.now(),
      vector: [0.2, 0.5, 0.8]
    },
    entanglementHash: 'eh-' + Math.random().toString(36),
    metadata: { status: 'success' }
  })
}).then(r => r.json());

console.log('Quantum workflow complete!');
```

---

<div align="center">

**The Quantum Shield API: Where cryptography meets consciousness**

*For support, open an issue on GitHub*

</div>
