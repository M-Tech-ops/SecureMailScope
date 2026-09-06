export const dashboardSummary = {
  overallScore: 76,
  riskLevel: 'MEDIUM',
  totalSessions: 2138,
  tlsSessions: 1902,
  findingsCount: 154,
  anomalousSessions: 14,
  protocolDistribution: [
    { name: 'SMTP', sessions: 1284, percentage: 60 },
    { name: 'IMAP', sessions: 823, percentage: 38 },
    { name: 'POP3', sessions: 31, percentage: 2 },
  ],
  tlsDistribution: [
    { version: 'TLS 1.3', percentage: 68, status: 'healthy' },
    { version: 'TLS 1.2', percentage: 29, status: 'healthy' },
    { version: 'TLS 1.0', percentage: 3, status: 'deprecated' },
  ],
  severityDistribution: [
    { severity: 'CRITICAL', count: 12 },
    { severity: 'HIGH', count: 37 },
    { severity: 'MEDIUM', count: 84 },
    { severity: 'LOW', count: 21 },
  ],
};

export const recentFindings = [
  { id: 'TLS-001', severity: 'CRITICAL', title: 'Deprecated TLS Version', protocol: 'SMTP', affectedSessions: 12, status: 'Open', time: '18:41' },
  { id: 'CERT-004', severity: 'HIGH', title: 'Expired Certificate', protocol: 'IMAP', affectedSessions: 7, status: 'Open', time: '18:38' },
  { id: 'CIPHER-008', severity: 'HIGH', title: 'Weak Cipher Configuration', protocol: 'SMTP', affectedSessions: 18, status: 'Open', time: '18:34' },
  { id: 'ANOM-014', severity: 'MEDIUM', title: 'Potential TLS Handshake Anomaly', protocol: 'POP3', affectedSessions: 14, status: 'Review', time: '18:29' },
  { id: 'CERT-021', severity: 'LOW', title: 'Certificate Near Expiry', protocol: 'SMTP', affectedSessions: 6, status: 'Review', time: '18:22' },
];

export const recentScans = [
  { id: 'SCAN-001', name: 'Enterprise Mail Capture', fileName: 'enterprise_email_capture.pcap', sessions: 2138, score: 76, riskLevel: 'Medium', timestamp: '18:42' },
  { id: 'SCAN-002', name: 'Secure Environment Test', fileName: 'secure_demo.pcap', sessions: 1104, score: 94, riskLevel: 'Low', timestamp: '17:20' },
  { id: 'SCAN-003', name: 'Vulnerable Environment Test', fileName: 'vulnerable_demo.pcap', sessions: 864, score: 31, riskLevel: 'Critical', timestamp: '16:48' },
];

export const anomalies = [
  { sessionId: 'SESSION-1847', description: 'Unusual TLS handshake pattern', confidence: 87, score: 0.91 },
  { sessionId: 'SESSION-2519', description: 'Unexpected certificate behavior', confidence: 81, score: 0.84 },
  { sessionId: 'SESSION-2871', description: 'Unusual protocol transition', confidence: 79, score: 0.81 },
];
