export const DEMO_SCENARIOS = [
  {
    id: 'secure',
    name: 'Secure Environment',
    description: 'Modern TLS configuration and valid certificates.',
    expectedScore: 94,
    expectedRisk: 'LOW',
    sampleFile: 'enterprise_tls13_compliant.pcapng',
    sampleSize: 14260633, // 13.6 MB
  },
  {
    id: 'vulnerable',
    name: 'Vulnerable Environment',
    description: 'Deprecated TLS, certificate issues and weak configuration.',
    expectedScore: 31,
    expectedRisk: 'CRITICAL',
    sampleFile: 'legacy_tls10_expired_certs.pcap',
    sampleSize: 22439526, // 21.4 MB
  },
  {
    id: 'mixed',
    name: 'Mixed Enterprise Traffic',
    description: 'Combination of healthy and potentially risky sessions.',
    expectedScore: 76,
    expectedRisk: 'MEDIUM',
    sampleFile: 'enterprise_email_capture.pcap',
    sampleSize: 19293798, // 18.4 MB
  },
];

export const ANALYSIS_MODULES = [
  {
    id: 'protocol-detection',
    name: 'Protocol Detection',
    description: 'SMTP / IMAP / POP3',
    subtext: 'Identifies standard and non-standard email transport ports and commands.',
    enabled: true,
  },
  {
    id: 'tcp-stream',
    name: 'TCP Stream Reconstruction',
    description: 'Session-level traffic reconstruction',
    subtext: 'Reassembles TCP segments to extract clear handshake sequences.',
    enabled: true,
  },
  {
    id: 'starttls-detection',
    name: 'STARTTLS Detection',
    description: 'Encryption upgrade analysis',
    subtext: 'Analyzes opportunistic TLS transition commands and plain-text fallbacks.',
    enabled: true,
  },
  {
    id: 'tls-handshake',
    name: 'TLS Handshake Analysis',
    description: 'Version / cipher / key exchange',
    subtext: 'Audits ClientHello/ServerHello parameters and negotiated cipher suites.',
    enabled: true,
  },
  {
    id: 'cert-analysis',
    name: 'Certificate Analysis',
    description: 'X.509 validity and configuration',
    subtext: 'Validates certificate chains, expiry dates, SANs, and key lengths.',
    enabled: true,
  },
  {
    id: 'crypto-assessment',
    name: 'Cryptographic Assessment',
    description: 'Weakness and policy checks',
    subtext: 'Checks for known vulnerabilities, forward secrecy, and obsolete ciphers.',
    enabled: true,
  },
  {
    id: 'ai-anomaly',
    name: 'AI-Assisted Anomaly Detection',
    description: 'Unusual TLS session behavior',
    subtext: 'Evaluates behavioral deviations across session lengths and timing patterns.',
    enabled: true,
  },
];

export const SCAN_DEFAULTS = {
  protocolScope: 'SMTP / IMAP / POP3',
  analysisScope: 'Cryptographic posture + anomaly detection',
  mode: 'Passive forensic analysis',
  defaultScenarioId: 'mixed',
};
