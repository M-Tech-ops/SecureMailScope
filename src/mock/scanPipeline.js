/**
 * Forensic Analysis Pipeline Stage Definitions & Scenario Completion Profiles
 */

export const PIPELINE_STAGES = [
  {
    id: 'pcap-ingestion',
    name: 'PCAP Ingestion',
    range: [0, 10],
    activeText: 'Loading and parsing raw capture buffers...',
    completedText: '48,291 packets loaded',
  },
  {
    id: 'protocol-detect',
    name: 'Protocol Detection',
    range: [10, 20],
    activeText: 'Identifying standard and non-standard email transport ports...',
    completedText: 'SMTP / IMAP / POP3 identified',
  },
  {
    id: 'tcp-reconstruction',
    name: 'TCP Stream Reconstruction',
    range: [20, 32],
    activeText: 'Reassembling TCP segments and tracking TCP state transitions...',
    completedText: '2,138 sessions reconstructed',
  },
  {
    id: 'starttls-detect',
    name: 'STARTTLS Detection',
    range: [32, 43],
    activeText: 'Analyzing opportunistic TLS transition commands and plain-text fallbacks...',
    completedText: 'STARTTLS upgrade sequences analyzed',
  },
  {
    id: 'tls-handshake',
    name: 'TLS Handshake Analysis',
    range: [43, 60],
    activeText: 'Extracting negotiated TLS parameters and cipher suites...',
    completedText: 'TLS 1.0–1.3 negotiation states audited',
  },
  {
    id: 'cert-analysis',
    name: 'Certificate Analysis',
    range: [60, 72],
    activeText: 'Validating X.509 chains, expiration dates, and CA anchors...',
    completedText: '1,846 certificates validated',
  },
  {
    id: 'crypto-assess',
    name: 'Cryptographic Assessment',
    range: [72, 82],
    activeText: 'Evaluating forward secrecy, curve strengths, and cipher weaknesses...',
    completedText: 'Cryptographic posture evaluated',
  },
  {
    id: 'feature-extraction',
    name: 'Feature Extraction',
    range: [82, 88],
    activeText: 'Compiling 142 forensic telemetry dimensions...',
    completedText: 'Session telemetry matrices populated',
  },
  {
    id: 'ai-anomaly',
    name: 'AI-Assisted Anomaly Detection',
    range: [88, 94],
    activeText: 'Evaluating session timing patterns against enterprise baseline...',
    completedText: '14 anomalous TLS behaviors isolated',
  },
  {
    id: 'risk-scoring',
    name: 'Risk Scoring',
    range: [94, 98],
    activeText: 'Calculating composite cryptographic posture score...',
    completedText: 'Risk scoring model converged',
  },
  {
    id: 'report-gen',
    name: 'Report Generation',
    range: [98, 100],
    activeText: 'Synthesizing forensic findings and technical dossier...',
    completedText: 'Forensic report compiled',
  },
];

export const PRELIMINARY_OBSERVATIONS = [
  {
    id: 'obs-1',
    severity: 'HIGH',
    title: 'Deprecated TLS Configuration',
    message: '3% of observed TLS sessions use deprecated TLS configurations.',
    triggerProgress: 45,
  },
  {
    id: 'obs-2',
    severity: 'MEDIUM',
    title: 'Certificate Validation Notice',
    message: '7 certificates require validity review.',
    triggerProgress: 65,
  },
  {
    id: 'obs-3',
    severity: 'MEDIUM',
    title: 'Anomalous Behavior Flag',
    message: '14 sessions show potentially anomalous TLS behavior.',
    triggerProgress: 90,
  },
];

export const PROTOCOL_METRICS = {
  smtp: 1284,
  imap: 823,
  pop3: 31,
};

export const TARGET_METRICS = {
  packets: 48291,
  sessions: 2138,
  tlsSessions: 1902,
  certificates: 1846,
  potentialFindings: 42,
};

export const SCENARIO_PROFILES = {
  secure: {
    score: 94,
    risk: 'LOW',
    totalFindings: 18,
    anomalies: 2,
    sessions: 2138,
    tlsSessions: 2095,
  },
  vulnerable: {
    score: 31,
    risk: 'CRITICAL',
    totalFindings: 218,
    anomalies: 38,
    sessions: 2138,
    tlsSessions: 1540,
  },
  mixed: {
    score: 76,
    risk: 'MEDIUM',
    totalFindings: 154,
    anomalies: 14,
    sessions: 2138,
    tlsSessions: 1902,
  },
};
