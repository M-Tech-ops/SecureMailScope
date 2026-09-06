import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';
import { SeverityBadge } from '../UI';

export default function FindingHeader({ finding, onStatusChange }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const isReviewed = finding.status === 'Reviewed' || finding.status === 'Resolved';

  const handleToggleReview = () => {
    const nextStatus = isReviewed ? 'Open' : 'Reviewed';
    if (onStatusChange) onStatusChange(nextStatus);
    showToast(`Finding status updated to: ${nextStatus}`);
  };

  const handleExportFinding = () => {
    showToast(`Exported finding dossier: ${finding.id}_forensic_summary.json`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-3">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => navigate('/scan/SCAN-001/results')}
          className="hover:text-slate-300 transition"
        >
          Scan Results
        </button>
        <span className="text-slate-700">/</span>
        <button
          type="button"
          onClick={() => navigate('/scan/SCAN-001/results')}
          className="hover:text-slate-300 transition"
        >
          Findings
        </button>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300 font-medium">Finding Details</span>
      </nav>

      {/* Main Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
              {finding.title}
            </h1>
            <SeverityBadge value={finding.severity} />
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                isReviewed
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                  : 'border-red-400/20 bg-red-400/10 text-red-300'
              }`}
            >
              {finding.status}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
            <span>ID: <strong className="text-slate-200">{finding.id}</strong></span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Target Protocol: <strong className="text-slate-200">{finding.protocol}</strong></span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Observed Sessions: <strong className="text-slate-200">{finding.affectedSessions}</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleToggleReview}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 ${
              isReviewed
                ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            <Icon name={isReviewed ? 'refresh' : 'check'} size={13} />
            <span>{isReviewed ? 'Reopen Finding' : 'Mark Reviewed'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportFinding}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          >
            <Icon name="fileCode" size={13} />
            <span>Export Finding</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/scan/SCAN-001/results')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none"
          >
            <Icon name="arrowLeft" size={13} />
            <span>Back to Results</span>
          </button>
        </div>
      </div>

      {/* Non-blocking Toast */}
      {toastMessage && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg border border-blue-400/30 bg-slate-900/95 px-3.5 py-2 text-xs text-slate-200 shadow-xl backdrop-blur animate-in"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-500 hover:text-slate-300"
            aria-label="Dismiss toast"
          >
            <Icon name="x" size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
