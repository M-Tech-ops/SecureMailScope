export const findingDetails = {
  'TLS-001': {
    id: 'TLS-001', severity: 'CRITICAL', title: 'Deprecated TLS Version', status: 'Open',
    protocol: 'SMTP', affectedSessions: 12,
    sessionId: 'SMTP-1847', source: '192.168.1.24', destination: 'mail.company.local', timestamp: '2026-09-06 18:41:17',
    tlsVersion: 'TLS 1.0', cipherSuite: 'TLS_RSA_WITH_AES_128_CBC_SHA', keyExchange: 'RSA', forwardSecrecy: 'No',
    certificate: { subject: 'mail.company.local', issuer: 'Example Enterprise CA', validFrom: '2025-01-01', validUntil: '2026-12-31', publicKey: 'RSA / 2048-bit', signature: 'SHA256withRSA', status: 'Valid' },
    description: 'The session negotiated a deprecated TLS configuration that should be reviewed against the organization’s approved cryptographic policy.',
    recommendation: 'Disable deprecated TLS versions and require a modern approved TLS configuration.',
    evidence: ['ClientHello', 'ServerHello', 'Certificate', 'ServerHelloDone', 'Encrypted application data']
  },
  'CERT-004': {
    id: 'CERT-004', severity: 'HIGH', title: 'Expired Certificate', status: 'Open',
    protocol: 'IMAP', affectedSessions: 7,
    sessionId: 'IMAP-2091', source: '192.168.1.42', destination: 'imap.company.local', timestamp: '2026-09-06 18:38:04',
    tlsVersion: 'TLS 1.2', cipherSuite: 'ECDHE-RSA-AES256-GCM-SHA384', keyExchange: 'ECDHE', forwardSecrecy: 'Yes',
    certificate: { subject: 'imap.company.local', issuer: 'Example Enterprise CA', validFrom: '2025-02-14', validUntil: '2026-08-30', publicKey: 'RSA / 2048-bit', signature: 'SHA256withRSA', status: 'Expired' },
    description: 'The observed certificate validity period has ended, creating a certificate hygiene issue that should be remediated.',
    recommendation: 'Replace the expired certificate and verify certificate renewal and deployment processes.',
    evidence: ['STARTTLS', 'ClientHello', 'ServerHello', 'Certificate', 'Certificate status: expired']
  },
  'CIPHER-008': {
    id: 'CIPHER-008', severity: 'HIGH', title: 'Weak Cipher Configuration', status: 'Open',
    protocol: 'SMTP', affectedSessions: 18,
    sessionId: 'SMTP-1922', source: '192.168.1.88', destination: 'mail.company.local', timestamp: '2026-09-06 18:34:26',
    tlsVersion: 'TLS 1.2', cipherSuite: 'TLS_RSA_WITH_AES_128_CBC_SHA', keyExchange: 'RSA', forwardSecrecy: 'No',
    certificate: { subject: 'mail.company.local', issuer: 'Example Enterprise CA', validFrom: '2025-01-01', validUntil: '2026-12-31', publicKey: 'RSA / 2048-bit', signature: 'SHA256withRSA', status: 'Valid' },
    description: 'The negotiated cipher configuration is weaker than the preferred enterprise policy baseline.',
    recommendation: 'Prefer modern authenticated encryption suites and forward-secret key exchange mechanisms.',
    evidence: ['ClientHello', 'ServerHello', 'CipherSuite selected: legacy RSA/CBC']
  },
  'ANOM-014': {
    id: 'ANOM-014', severity: 'MEDIUM', title: 'Potential TLS Handshake Anomaly', status: 'Review',
    protocol: 'POP3', affectedSessions: 14,
    sessionId: 'POP3-2871', source: '192.168.1.91', destination: 'pop.company.local', timestamp: '2026-09-06 18:29:12',
    tlsVersion: 'TLS 1.2', cipherSuite: 'ECDHE-RSA-AES128-GCM-SHA256', keyExchange: 'ECDHE', forwardSecrecy: 'Yes',
    certificate: { subject: 'pop.company.local', issuer: 'Example Enterprise CA', validFrom: '2026-01-01', validUntil: '2027-01-01', publicKey: 'RSA / 2048-bit', signature: 'SHA256withRSA', status: 'Valid' },
    description: 'The session exhibits a handshake pattern that differs from the observed baseline and should be reviewed.',
    recommendation: 'Compare the session with known-good baselines and investigate repeated anomalous behavior.',
    evidence: ['ClientHello', 'ServerHello', 'Unexpected message ordering', 'Encrypted application data']
  },
  'CERT-021': {
    id: 'CERT-021', severity: 'LOW', title: 'Certificate Near Expiry', status: 'Review',
    protocol: 'SMTP', affectedSessions: 6,
    sessionId: 'SMTP-3012', source: '192.168.1.55', destination: 'mail.company.local', timestamp: '2026-09-06 18:22:44',
    tlsVersion: 'TLS 1.3', cipherSuite: 'TLS_AES_256_GCM_SHA384', keyExchange: 'ECDHE', forwardSecrecy: 'Yes',
    certificate: { subject: 'mail.company.local', issuer: 'Example Enterprise CA', validFrom: '2025-09-20', validUntil: '2026-10-10', publicKey: 'ECDSA / P-256', signature: 'ECDSA with SHA-256', status: 'Near expiry' },
    description: 'The certificate remains valid but is approaching its configured review threshold.',
    recommendation: 'Plan certificate renewal before the configured operational threshold is reached.',
    evidence: ['ClientHello', 'ServerHello', 'Certificate', 'Certificate expires in 34 days']
  }
};
