import { Icon } from '../Icons';

export default function PreliminaryObservations({ observations, isComplete }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="eye" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Preliminary Observations</h3>
        </div>
        <span className="self-start sm:self-auto rounded border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-300">
          {isComplete ? 'Audited Findings' : 'Preliminary / Subject to Correlation'}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Early telemetry flagged during passive ingestion. Final risk weights and root causes are finalized at pipeline completion.
      </p>

      <div className="mt-4 space-y-2.5">
        {observations.length === 0 ? (
          <div className="flex items-center gap-3 rounded-lg border border-slate-800/60 bg-slate-900/30 p-3.5 text-xs text-slate-500">
            <Icon name="refresh" size={14} className="animate-spin text-blue-400 shrink-0" />
            <span>Telemetry engines parsing handshakes and certificates. Observations will appear as heuristics trigger...</span>
          </div>
        ) : (
          observations.map((obs) => {
            const isHigh = obs.severity === 'HIGH';
            return (
              <div
                key={obs.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition-all duration-300 ${
                  isHigh
                    ? 'border-amber-400/20 bg-amber-400/[0.04]'
                    : 'border-slate-800/80 bg-slate-900/40'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    isHigh
                      ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                      : 'border-blue-400/30 bg-blue-400/10 text-blue-300'
                  }`}
                >
                  <Icon name={isHigh ? 'alert' : 'info'} size={12} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-200">
                      {obs.title}
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider rounded px-1.5 py-0.5 ${
                        isHigh
                          ? 'border border-amber-400/20 bg-amber-400/10 text-amber-300'
                          : 'border border-slate-700 bg-slate-800 text-slate-400'
                      }`}
                    >
                      {obs.severity}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    {obs.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
