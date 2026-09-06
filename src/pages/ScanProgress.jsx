import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import ProgressBar from '../components/scan/ProgressBar';
import AnalysisPipeline from '../components/scan/AnalysisPipeline';
import LiveMetrics from '../components/scan/LiveMetrics';
import ProtocolBreakdown from '../components/scan/ProtocolBreakdown';
import PreliminaryObservations from '../components/scan/PreliminaryObservations';
import ScanMetadataDetails from '../components/scan/ScanMetadataDetails';
import CompletionSummary from '../components/scan/CompletionSummary';
import { getMockScanStatus } from '../services/scanStatusService';

export default function ScanProgress() {
  const { scanId: routeScanId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract scenario, scanId, and file details passed from Page 2 router state, or use defaults
  const stateScan = location.state?.scan;
  const stateInput = location.state?.input;

  const scanId = routeScanId || stateScan?.scanId || 'SCAN-001';
  const scenarioId = stateInput?.demoScenario || stateScan?.scenario || 'mixed';
  const fileInfo = {
    name: stateInput?.fileName || stateScan?.fileName || null,
    size: stateInput?.fileSize ? `${(stateInput.fileSize / (1024 * 1024)).toFixed(1)} MB` : null,
  };

  // Simulation State
  const [progress, setProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const elapsedTimerRef = useRef(null);

  // Manage progress simulation from 0 -> 100% over ~10-12 seconds
  useEffect(() => {
    // Elapsed timer: 1s ticks
    elapsedTimerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    // Progress tick: updates every ~150ms by ~1.2% - 1.5%
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          clearInterval(elapsedTimerRef.current);
          return 100;
        }
        // Slightly variable delta for realistic forensic processing feel
        const delta = 1.2 + Math.random() * 0.6;
        const next = Math.min(100, prev + delta);
        if (next >= 100) {
          clearInterval(timerRef.current);
          clearInterval(elapsedTimerRef.current);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(elapsedTimerRef.current);
    };
  }, []);

  const handleResetScan = () => {
    setProgress(0);
    setElapsedSeconds(0);
    clearInterval(timerRef.current);
    clearInterval(elapsedTimerRef.current);

    elapsedTimerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          clearInterval(elapsedTimerRef.current);
          return 100;
        }
        const delta = 1.2 + Math.random() * 0.6;
        const next = Math.min(100, prev + delta);
        if (next >= 100) {
          clearInterval(timerRef.current);
          clearInterval(elapsedTimerRef.current);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  // Compute status snapshot
  const statusSnapshot = getMockScanStatus(scanId, progress, scenarioId, fileInfo);
  const isComplete = statusSnapshot.status === 'COMPLETED';

  return (
    <div className="space-y-6 pb-14">
      {/* Top Breadcrumb & Page Header */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate('/scan/new')}
          className="group inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-400/40 rounded px-1 py-0.5"
          aria-label="Back to New Scan"
        >
          <Icon name="arrowLeft" size={13} className="transition-transform group-hover:-translate-x-0.5" />
          <span>New Scan</span>
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
                {isComplete ? 'Analysis Complete' : 'Scan in Progress'}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                  isComplete
                    ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                    : 'border border-blue-400/30 bg-blue-400/10 text-blue-300'
                }`}
              >
                {!isComplete && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                )}
                {isComplete && <Icon name="check" size={11} strokeWidth={2.4} />}
                {statusSnapshot.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Analyzing captured email traffic
            </p>
          </div>

          {/* PCAP Filename & Scan ID Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="rounded border border-slate-800 bg-[#141b24] px-2.5 py-1 text-slate-300">
              <span className="text-slate-600 font-sans mr-1">ID:</span>
              {statusSnapshot.scanId}
            </span>
            <span className="rounded border border-slate-800 bg-[#141b24] px-2.5 py-1 text-slate-300">
              <span className="text-slate-600 font-sans mr-1">File:</span>
              {statusSnapshot.fileName}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Overall Progress Section */}
      <section aria-label="Analysis Progress">
        <ProgressBar
          progress={statusSnapshot.progress}
          elapsedSeconds={elapsedSeconds}
          isComplete={isComplete}
        />
      </section>

      {/* Completion Summary Card (Displays at 100%) */}
      {isComplete && (
        <section aria-label="Completion Summary" className="animate-in">
          <CompletionSummary
            scanId={statusSnapshot.scanId}
            completion={statusSnapshot.completion}
            onResetScan={handleResetScan}
          />
        </section>
      )}

      {/* 3. Live Metrics Row */}
      <section aria-label="Live Ingestion Metrics">
        <LiveMetrics metrics={statusSnapshot.metrics} />
      </section>

      {/* Main Grid: Analysis Pipeline (Left) vs Protocols, Observations & Details (Right) */}
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column: 2. Analysis Pipeline */}
        <section aria-label="Analysis Pipeline">
          <AnalysisPipeline stages={statusSnapshot.pipeline} />
        </section>

        {/* Right Column: Protocols, Preliminary Observations, and Scan Details */}
        <div className="space-y-6">
          {/* 4. Detected Protocols */}
          <section aria-label="Detected Protocols">
            <ProtocolBreakdown protocols={statusSnapshot.protocols} />
          </section>

          {/* 5. Preliminary Observations */}
          <section aria-label="Preliminary Observations">
            <PreliminaryObservations
              observations={statusSnapshot.observations}
              isComplete={isComplete}
            />
          </section>

          {/* 6. Scan Details */}
          <section aria-label="Scan Details">
            <ScanMetadataDetails
              fileName={statusSnapshot.fileName}
              fileSize={statusSnapshot.fileSize}
              fileType={statusSnapshot.fileType}
              mode={statusSnapshot.mode}
              scope={statusSnapshot.scope}
              analysisProfile={statusSnapshot.analysisProfile}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
