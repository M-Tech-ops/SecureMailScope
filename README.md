# SecureMailScope Frontend Prototype

Frontend-only prototype for the SecureMailScope cybersecurity dashboard.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/mock/` — centralized mock data
- `src/services/mockApi.js` — API-shaped abstraction used by the UI
- `src/components/` — reusable layout, UI and chart components
- `src/pages/` — route-level screens

## Backend handoff

Replace `mockApi` methods with real REST calls later. Keep the existing object shapes so the UI can remain unchanged.

Suggested future API routes:

- `POST /api/scans`
- `GET /api/scans`
- `GET /api/scans/{scan_id}`
- `GET /api/scans/{scan_id}/status`
- `GET /api/scans/{scan_id}/results`
- `GET /api/scans/{scan_id}/findings`
- `GET /api/findings/{finding_id}`
- `GET /api/sessions/{session_id}`
