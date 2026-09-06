import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FindingHeader from '../components/forensic/FindingHeader';
import FindingSummaryCard from '../components/forensic/FindingSummaryCard';
import SessionInfoPanel from '../components/forensic/SessionInfoPanel';
import TlsConfigPanel from '../components/forensic/TlsConfigPanel';
import CertificatePanel from '../components/forensic/CertificatePanel';
import EvidenceTimeline from '../components/forensic/EvidenceTimeline';
import WhyItMatters from '../components/forensic/WhyItMatters';
import RecommendationAction from '../components/forensic/RecommendationAction';
import RelatedFindingsList from '../components/forensic/RelatedFindingsList';
import { getFinding, getRelatedFindings } from '../services/forensicService';

export default function FindingDetails() {
  const { id, findingId } = useParams();
  const activeId = findingId || id || 'TLS-001';
  const navigate = useNavigate();

  const [finding, setFinding] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFinding(activeId).then((data) => {
      setFinding(data);
      if (data) {
        getRelatedFindings(data.id).then((rel) => setRelated(rel));
      }
      setLoading(false);
    });
  }, [activeId]);

  const handleStatusChange = (newStatus) => {
    setFinding((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          <span>Loading technical finding details...</span>
        </div>
      </div>
    );
  }

  if (!finding) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate('/scan/SCAN-001/results')}
          className="text-sm text-blue-300 hover:text-blue-200"
        >
          ← Back to Results
        </button>
        <div className="mt-8 rounded-xl border border-slate-800 bg-[#141b24] p-8 text-center text-slate-400">
          <h2 className="text-base font-semibold text-slate-200">Finding Not Found</h2>
          <p className="mt-2 text-xs text-slate-500">
            The requested forensic finding ID ({activeId}) could not be located in the current capture.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. FINDING HEADER */}
      <section aria-label="Finding Overview Header">
        <FindingHeader finding={finding} onStatusChange={handleStatusChange} />
      </section>

      {/* 2. FINDING SUMMARY */}
      <section aria-label="Executive Finding Summary">
        <FindingSummaryCard finding={finding} />
      </section>

      {/* TWO-COLUMN FORENSIC INVESTIGATION GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column: Technical Evidence & Network Parameters */}
        <div className="space-y-6">
          {/* 3. Session Information */}
          <section aria-label="Session Information">
            <SessionInfoPanel
              sessionInfo={finding.sessionInfo}
              sessionId={finding.sessionId}
            />
          </section>

          {/* 4. TLS Configuration */}
          <section aria-label="TLS Configuration">
            <TlsConfigPanel tls={finding.tls} />
          </section>

          {/* 5. Certificate Details */}
          <section aria-label="Certificate Details">
            <CertificatePanel certificate={finding.certificate} />
          </section>

          {/* 6. Evidence Timeline */}
          <section aria-label="Observed Session Evidence Timeline">
            <EvidenceTimeline timeline={finding.evidenceTimeline} />
          </section>
        </div>

        {/* Right Column: Risk Rationale, Actions & Correlated Findings */}
        <div className="space-y-6">
          {/* 7. Why This Matters */}
          <section aria-label="Why This Matters">
            <WhyItMatters points={finding.whyItMatters} />
          </section>

          {/* 8. Recommended Action */}
          <section aria-label="Recommended Mitigation Action">
            <RecommendationAction recommendation={finding.recommendation} />
          </section>

          {/* 9. Related Findings */}
          <section aria-label="Correlated Security Findings">
            <RelatedFindingsList findings={related} />
          </section>
        </div>
      </div>
    </div>
  );
}
