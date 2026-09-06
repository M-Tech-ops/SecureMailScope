import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import UploadDropzone from '../components/scan/UploadDropzone';
import SelectedFileCard from '../components/scan/SelectedFileCard';
import DemoDatasetSelector from '../components/scan/DemoDatasetSelector';
import AnalysisModules from '../components/scan/AnalysisModules';
import ScanSummary from '../components/scan/ScanSummary';
import { SCAN_DEFAULTS } from '../mock/scanConfig';
import { startMockScan } from '../services/scanService';

export default function NewScan() {
  const navigate = useNavigate();

  // State
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCAN_DEFAULTS.defaultScenarioId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Handlers
  const handleFileSelect = (fileData) => {
    setSelectedFile(fileData);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleChangeFile = (newFileData) => {
    setSelectedFile(newFileData);
  };

  // Start Analysis Handler
  const handleStartAnalysis = async () => {
    if (!selectedFile && !selectedScenarioId) return;

    setIsSubmitting(true);

    const scanInput = {
      fileName: selectedFile?.name || null,
      fileSize: selectedFile?.size || null,
      fileType: selectedFile?.type || null,
      demoScenario: selectedScenarioId || null,
    };

    try {
      const mockResult = await startMockScan(scanInput);
      // Navigate to /scan/demo/progress with scan metadata passed in router state
      navigate('/scan/demo/progress', {
        state: {
          scan: mockResult,
          input: scanInput,
        },
      });
    } catch (err) {
      console.error('Failed to initiate mock scan:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* SECTION A — Breadcrumb & Page Header */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-400/40 rounded px-1 py-0.5"
          aria-label="Back to overview"
        >
          <Icon name="arrowLeft" size={13} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Overview</span>
        </button>

        <div className="border-b border-slate-800/80 pb-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
                New Security Scan
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-400">
                Analyze captured SMTP, IMAP and POP3 traffic.
              </p>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500">
              Target Protocols: SMTP · IMAP · POP3
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
            Upload a network capture to assess email protocol and cryptographic security posture.
          </p>
        </div>
      </div>

      {/* SECTION B & C — PCAP Upload or Selected File Card */}
      <section aria-labelledby="upload-section-heading">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 id="upload-section-heading" className="text-[13px] font-semibold tracking-wide text-slate-200">
            {selectedFile ? 'Target Capture File' : 'Network Capture Source'}
          </h2>
          <span className="text-[11px] text-slate-500">
            {selectedFile ? 'Ready for forensic ingestion' : 'Accepted: .pcap, .pcapng'}
          </span>
        </div>

        {selectedFile ? (
          <SelectedFileCard
            fileInfo={selectedFile}
            onChangeFile={handleChangeFile}
            onRemoveFile={handleRemoveFile}
          />
        ) : (
          <UploadDropzone onFileSelect={handleFileSelect} />
        )}
      </section>

      {/* SECTION D — Demo Dataset Section */}
      <section aria-label="Demo Dataset Selection">
        <DemoDatasetSelector
          selectedScenarioId={selectedScenarioId}
          onSelectScenario={setSelectedScenarioId}
        />
      </section>

      {/* SECTION E — Analysis Pipeline Modules */}
      <section aria-label="Analysis Pipeline Modules">
        <AnalysisModules />
      </section>

      {/* SECTION F — Scan Configuration / Summary & Start Analysis */}
      <section aria-label="Scan Configuration and Dispatch">
        <ScanSummary
          selectedFile={selectedFile}
          selectedScenarioId={selectedScenarioId}
          onStartAnalysis={handleStartAnalysis}
          isLoading={isSubmitting}
        />
      </section>
    </div>
  );
}
