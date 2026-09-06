import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function AnomalyDetectionCard({
  anomalies = [],
  anomalyMetrics = {},
}) {
  const navigate = useNavigate();

  const {
    totalAnomalies = 14,
    highestConfidence = '87%',
    highestScore = '0.91',
  } = anomalyMetrics;

  const handleSessionClick = (fullSessionId) => {
    navigate(`/session/${fullSessionId}`);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="brain" size={16} className="text-blue-300" />
            <h3 className="text-sm font-semibold text-slate-100">AI-Assisted Anomaly Detection</h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Identifies sessions that deviate from observed communication patterns.
          </p>
        </div>
        <span className="self-start sm:self-auto rounded border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 font-mono text-[10px] font-medium text-blue-300">
          Unsupervised Baseline Model
        </span>
      </div>

      {/* Anomaly Metrics Overview */}
      <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
        <div className="rounded-lg border border-slate-800 bg-slate-900/35 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Potentially Anomalous
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-100">
            {totalAnomalies}
          </div>
          <div className="text-[10px] text-slate-500">Sessions flagged</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/35 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Highest Confidence
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-blue-300">
            {highestConfidence}
          </div>
          <div className="text-[10px] text-slate-500">Statistical deviation</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/35 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Highest Score
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-100">
            {highestScore}
          </div>
          <div className="text-[10px] text-slate-500">Distance from baseline</div>
        </div>
      </div>

      {/* 3 Clickable Anomaly Session Entries */}
      <div className="mt-4 space-y-2.5">
        {anomalies.map((item) => (
          <button
            key={item.sessionId}
            type="button"
            onClick={() => handleSessionClick(item.fullSessionId || item.sessionId)}
            className="group flex w-full flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-3.5 text-left transition hover:border-slate-700 hover:bg-slate-800/40 focus:outline-none"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition">
                  {item.displayId || `Session #${item.sessionId}`}
                </span>
                <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-300">
                  {item.protocol}
                </span>
                <span className="rounded border border-amber-400/20 bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-medium text-amber-300">
                  Requires review
                </span>
              </div>

              <div className="mt-1 text-xs text-slate-300 font-medium">
                {item.description}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {item.note}
              </div>
            </div>

            <div className="mt-2 sm:mt-0 sm:pl-4 flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-sm font-semibold text-blue-300">
                  {item.confidence}%
                </span>
                <span className="text-[10px] text-slate-500">confidence</span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-slate-300 transition">
                <span>View forensic flow</span>
                <Icon name="chevronRight" size={12} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
