import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function CompletionSummary({ scanId, completion, onResetScan }) {
  const navigate = useNavigate();

  const {
    score = 76,
    risk = 'MEDIUM',
    findings = 154,
    anomalies = 14,
    sessions = 2138,
    tlsSessions = 1902,
  } = completion || {};

  const riskBadgeClass = {
    CRITICAL: 'border-red-400/30 bg-red-400/10 text-red-300',
    HIGH: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    MEDIUM: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300',
    LOW: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  }[risk.toUpperCase()] || 'border-blue-400/30 bg-blue-400/10 text-blue-300';

  const handleViewResults = () => {
    navigate(`/scan/${scanId || 'SCAN-001'}/results`);
  };

  const handleReturnDashboard = () => {
    navigate('/');
  };

  return (
    <div className="rounded-xl border border-blue-500/30 bg-gradient-to-b from-[#142032] to-[#141b24] p-6 md:p-7 shadow-lg shadow-blue-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Headline & Metric Highlights */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <Icon name="check" size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-100 md:text-xl">
                Analysis Complete
              </h2>
              <p className="text-xs text-slate-400">
                All 11 passive forensic inspection modules successfully executed.
              </p>
            </div>
          </div>

          {/* Quick Stat Summary Row */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-1">
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Sessions</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {sessions.toLocaleString()}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">TLS Sessions</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {tlsSessions.toLocaleString()}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Findings</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {findings.toLocaleString()}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Anomalies</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {anomalies.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Security Posture Score, Risk Badge & Navigation Actions */}
        <div className="flex flex-col items-start lg:items-end gap-5 border-t border-slate-800/80 pt-5 lg:border-t-0 lg:border-l lg:border-slate-800/80 lg:pt-0 lg:pl-8">
          <div className="flex items-center gap-4 lg:text-right">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Security Posture Score
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 lg:justify-end">
                <span className="font-mono text-3xl font-bold text-slate-100 md:text-4xl">
                  {score}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <span className="text-[9px] uppercase tracking-wider text-slate-500">Risk Assessment</span>
              <span className={`mt-1 inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tracking-wider ${riskBadgeClass}`}>
                {risk}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleViewResults}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40 active:translate-y-[0.5px]"
            >
              <span>View Security Results</span>
              <Icon name="arrowRight" size={14} />
            </button>

            <button
              type="button"
              onClick={handleReturnDashboard}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
            >
              <span>Return to Dashboard</span>
            </button>

            {onResetScan && (
              <button
                type="button"
                onClick={onResetScan}
                title="Replay simulated analysis"
                className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
              >
                <Icon name="refresh" size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
