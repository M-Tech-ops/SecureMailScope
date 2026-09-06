# Implementation Plan — Page 5: Forensic Investigation (`/findings/:findingId` & `/session/:sessionId`)

Implement **Page 5 (Forensic Investigation & Drill-Down)** of the SecureMailScope platform. This encompasses two dedicated forensic screens:
1. **Finding Details** (`/findings/:findingId`): Detailed breakdown of detected cryptographic anomalies, affected sessions, protocol configurations, X.509 certificate hygiene, interactive evidence timeline, risk impact, actionable remediation, and related findings.
2. **Session Details** (`/session/:sessionId`): Full session reconstruction view tracking TCP/TLS transitions, STARTTLS command negotiation, connection event timelines, certificate parameters, and associated security findings.

## User Review Required

> [!IMPORTANT]
> - **Preservation of Pages 1–4**: Dashboard (`/`), New Scan (`/scan/new`), Scan Progress (`/scan/:scanId/progress`), and Scan Results (`/scan/:scanId/results`) remain completely untouched.
> - **Dual Route Configuration**:
>   - `/findings/:findingId` and alias `/findings/:id` render `FindingDetails.jsx`.
>   - `/session/:sessionId` and alias `/session/:id` render `SessionDetails.jsx`.
> - **Interactive Timelines**: Evidence and session event sequences feature expandable technical inspector drawers.
> - **Local State & Feedback**: Status changes ("Mark Reviewed" / "Reopen") update local state, and report export triggers subtle toast notifications (no `window.alert()`).

---

## Component Architecture & Modular Layout

```
src/
├── mock/
│   ├── findingsData.js            # Comprehensive forensic dataset for findings (TLS-001, CERT-004, CIPHER-008, ANOM-014, etc.)
│   └── sessionsData.js            # Full session reconstruction datasets (SMTP-1847, IMAP-2091, SMTP-1922, POP3-2871, etc.)
├── services/
│   └── forensicService.js         # getFinding(id), getSession(id), getRelatedFindings(id) mock API abstraction
├── components/
│   └── forensic/
│       ├── FindingHeader.jsx      # Breadcrumb, title, ID, severity badge, status toggle, export action
│       ├── FindingSummaryCard.jsx # Protocol, affected sessions, first/last observed, risk rating, description
│       ├── SessionInfoPanel.jsx   # Source, destination, timestamp, duration, packets, clickable session ID
│       ├── TlsConfigPanel.jsx     # Version, cipher suite, key exchange, PFS, STARTTLS status
│       ├── CertificatePanel.jsx   # Subject, issuer, validity period, status badge, public key, signature, chain
│       ├── EvidenceTimeline.jsx   # Expandable timeline for ClientHello, ServerHello, Certificate, KeyExchange, etc.
│       ├── WhyItMatters.jsx       # 2–3 concise risk explanations in neutral security language
│       ├── RecommendationAction.jsx # Actionable advice with priority badge and operational owner
│       ├── RelatedFindingsList.jsx# Clickable related finding items with severity badges
│       ├── SessionHeader.jsx      # Session ID, protocol, source/destination, duration, timestamp
│       ├── SessionEventTimeline.jsx # 10 reconstructed session events (Banner, EHLO, STARTTLS, TLS handshake, data)
│       └── AssociatedFindingsCard.jsx # Findings triggered within this specific session
└── pages/
    ├── FindingDetails.jsx         # Complete Page 5 (Finding view) assembling forensic components
    ├── SessionDetails.jsx         # Complete Page 5 (Session view) assembling session forensic flow
    └── App.jsx                    # Register routes for findingId and sessionId
```

---

## Proposed Changes

### 1. Mock Datasets & Forensic Service

#### [NEW] [findingsData.js](file:///c:/Securemailscope/src/mock/findingsData.js)
- Define full data structures for:
  - `TLS-001`: Deprecated TLS Version (SMTP, Critical, 12 sessions, Session `SMTP-1847`).
  - `CERT-004`: Expired Certificate (IMAP, High, 7 sessions, Session `IMAP-2091`).
  - `CIPHER-008`: Weak Cipher Configuration (SMTP, High, 18 sessions, Session `SMTP-1922`).
  - `ANOM-014`: Potential TLS Handshake Anomaly (POP3, Medium, 14 sessions, Session `POP3-2871`).
  - `CERT-021`: Certificate Near Expiry (SMTP, Low, 6 sessions, Session `SMTP-3012`).
- Include `whyItMatters` bullet points, operational owners, detailed certificate fields, and structured evidence items.

#### [NEW] [sessionsData.js](file:///c:/Securemailscope/src/mock/sessionsData.js)
- Define reconstructed sessions (`SMTP-1847`, `IMAP-2091`, `SMTP-1922`, `POP3-2871`, `SMTP-3012`, `1847`, `2519`, `2871`):
  - 10 reconstructed timeline events with timestamps, event types, raw parameters, and inspector notes.
  - Full TLS parameters, STARTTLS transition logs, source/dest IPs, ports, and associated findings.

#### [NEW] [forensicService.js](file:///c:/Securemailscope/src/services/forensicService.js)
- Export `getFinding(id)`, `getSession(id)`, and `getRelatedFindings(id)`.
- Ready for 1-to-1 swap with `GET /api/findings/{id}` and `GET /api/sessions/{id}`.

### 2. Forensic UI Components in `src/components/forensic/`

#### [NEW] Finding Components
- `FindingHeader.jsx`: Breadcrumb `Scan Results → Findings → Finding Details`, title, severity badge, status toggle (`Open` ↔ `Reviewed`), and export button.
- `FindingSummaryCard.jsx`: Metric counters for affected sessions, timestamps, risk rating, and defensive executive summary.
- `SessionInfoPanel.jsx`: Network session coordinates with clickable session ID navigating to `/session/:sessionId`.
- `TlsConfigPanel.jsx`: Two-column TLS parameter grid highlighting non-compliant or policy-violating items.
- `CertificatePanel.jsx`: X.509 certificate hygiene with validity status dot, chain availability, and key length.
- `EvidenceTimeline.jsx`: Stepped timeline with expandable technical inspector drawers.
- `WhyItMatters.jsx`: Bulleted impact analysis focusing on real risk.
- `RecommendationAction.jsx`: Actionable remediation advice with priority and owner assignment.
- `RelatedFindingsList.jsx`: Interactive list of related findings.

#### [NEW] Session Investigation Components
- `SessionHeader.jsx`: Technical session banner with protocol badge, connection tuple, and navigation controls.
- `SessionEventTimeline.jsx`: 10-step event reconstruction from TCP handshake through STARTTLS, TLS negotiation, to close.
- `AssociatedFindingsCard.jsx`: Security findings linked directly to this session.

### 3. Page Assembly & AppShell Integration

#### [REPLACE] [FindingDetails.jsx](file:///c:/Securemailscope/src/pages/FindingDetails.jsx)
- Assemble the complete finding investigation workspace with responsive two-column desktop layout.

#### [NEW] [SessionDetails.jsx](file:///c:/Securemailscope/src/pages/SessionDetails.jsx)
- Dedicated session packet/event reconstruction workspace.

#### [MODIFY] [App.jsx](file:///c:/Securemailscope/src/App.jsx)
- Wire `<Route path="/findings/:id" element={<FindingDetails />} />` and `<Route path="/findings/:findingId" element={<FindingDetails />} />`.
- Wire `<Route path="/session/:id" element={<SessionDetails />} />` and `<Route path="/session/:sessionId" element={<SessionDetails />} />`.

#### [MODIFY] [AppShell.jsx](file:///c:/Securemailscope/src/components/AppShell.jsx)
- Route check to highlight `Findings` in sidebar when on `/findings/*`.
- Topbar updates to "Finding Investigation" or "Session Forensic View".

---

## Verification Plan

### Automated Checks
- `npm run build`: Verify clean compilation with zero warnings/errors.
- Node script check on `forensicService.js` to ensure retrieval of findings, sessions, and related items.

### Interactive Verification
- From Results page `/scan/SCAN-001/results`, click a finding row (e.g. `TLS-001`) → navigates to `/findings/TLS-001`.
- Verify breadcrumb, title, severity, status toggle, and export toast.
- Verify evidence timeline expand/collapse.
- Click Session ID link `SMTP-1847` → navigates to `/session/SMTP-1847`.
- Verify reconstructed session events timeline (expand/collapse).
- Click `[ Back to Finding ]` and `[ Back to Results ]`.
- Test clicking related findings (e.g. `CERT-004`).
