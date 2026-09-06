/**
 * SecureMailScope — Type Definitions for New Scan & Analysis Configuration
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ScanInput {
  fileName: string | null;
  fileSize: number | null;
  fileType: 'pcap' | 'pcapng' | null;
  demoScenario: 'secure' | 'vulnerable' | 'mixed' | null;
  uploadedAt?: string | null;
}

export interface DemoScenario {
  id: 'secure' | 'vulnerable' | 'mixed';
  name: string;
  description: string;
  expectedScore: number;
  expectedRisk: RiskLevel;
  highlightDetails?: string;
  simulatedFileName?: string;
  simulatedFileSize?: number;
}

export interface AnalysisModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'protocol' | 'transport' | 'tls' | 'certificate' | 'cryptography' | 'ai';
}

export interface MockScanResult {
  scanId: string;
  fileName: string;
  fileSize: string;
  scenario: string;
  status: 'QUEUED' | 'ANALYZING' | 'COMPLETED' | 'FAILED';
  protocolScope: string[];
  createdAt: string;
}
