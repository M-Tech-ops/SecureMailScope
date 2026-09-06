import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultsHeader from '../components/results/ResultsHeader';
import SecurityPostureCard from '../components/results/SecurityPostureCard';
import SeverityCards from '../components/results/SeverityCards';
import ProtocolDistribution from '../components/results/ProtocolDistribution';
import TlsAnalysisCard from '../components/results/TlsAnalysisCard';
import CertificateHealthCard from '../components/results/CertificateHealthCard';
import ForwardSecrecyCard from '../components/results/ForwardSecrecyCard';
import FindingsTable from '../components/results/FindingsTable';
import AnomalyDetectionCard from '../components/results/AnomalyDetectionCard';
import RecommendationsCard from '../components/results/RecommendationsCard';
import ExportActions from '../components/results/ExportActions';
import { getMockScanResult } from '../services/scanResultService';

export default function Results() {
  const { id, scanId: routeScanId } = useParams();
  const activeScanId = routeScanId || id || 'SCAN-001';

  const [scanData, setScanData] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');

  useEffect(() => {
    getMockScanResult(activeScanId).then((data) => {
      setScanData(data);
    });
  }, [activeScanId]);

  if (!scanData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          <span>Loading forensic scan results...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER: Title, metadata, New Scan & Export actions */}
      <div className="space-y-3">
        <ResultsHeader
          scanId={scanData.scanId}
          fileName={scanData.fileName}
          completedAt={scanData.completedAt}
          status={scanData.status}
        />

        <div className="flex justify-end">
          <ExportActions scanId={scanData.scanId} fileName={scanData.fileName} />
        </div>
      </div>

      {/* 1. SECURITY POSTURE: Circular score gauge, risk badge, sessions counters */}
      <section aria-label="Security Posture Evaluation">
        <SecurityPostureCard
          overallScore={scanData.overallScore}
          riskLevel={scanData.riskLevel}
          supportingText={scanData.supportingText}
          totals={scanData.totals}
        />
      </section>

      {/* 2. SEVERITY SUMMARY: 4 compact interactive cards */}
      <section aria-label="Findings Severity Summary">
        <SeverityCards
          severitySummary={scanData.severitySummary}
          selectedSeverity={selectedSeverity}
          onSelectSeverity={setSelectedSeverity}
        />
      </section>

      {/* 3 & 4. PROTOCOL & TLS ANALYSIS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-label="Email Protocol Breakdown">
          <ProtocolDistribution data={scanData.protocolDistribution} />
        </section>

        <section aria-label="TLS Version Analysis">
          <TlsAnalysisCard data={scanData.tlsDistribution} />
        </section>
      </div>

      {/* 5 & 6. CERTIFICATE HEALTH & FORWARD SECRECY */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-label="Certificate Health Breakdown">
          <CertificateHealthCard
            certificateHealth={scanData.certificateHealth}
          />
        </section>

        <section aria-label="Perfect Forward Secrecy Coverage">
          <ForwardSecrecyCard
            forwardSecrecy={scanData.forwardSecrecy}
          />
        </section>
      </div>

      {/* 7. SECURITY FINDINGS TABLE */}
      <section aria-label="Detailed Forensic Findings">
        <FindingsTable
          findings={scanData.findings}
          selectedSeverity={selectedSeverity}
          onSelectSeverity={setSelectedSeverity}
        />
      </section>

      {/* 8 & 9. AI ANOMALIES & RECOMMENDATIONS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-label="AI-Assisted Anomaly Detection">
          <AnomalyDetectionCard
            anomalies={scanData.anomalies}
            anomalyMetrics={scanData.anomalyMetrics}
          />
        </section>

        <section aria-label="Priority Recommendations">
          <RecommendationsCard
            recommendations={scanData.recommendations}
          />
        </section>
      </div>
    </div>
  );
}
