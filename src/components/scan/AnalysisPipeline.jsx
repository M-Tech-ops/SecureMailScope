import { Icon } from '../Icons';

export default function AnalysisPipeline({ stages }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 md:p-6 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-100">Forensic Pipeline Execution</h2>
            <span className="rounded border border-blue-400/20 bg-blue-400/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-blue-300">
              11 Stages
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Sequential passive stream reconstruction, cryptographic audit, and anomaly isolation.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {stages.map((stage, idx) => {
          const isCompleted = stage.state === 'completed';
          const isActive = stage.state === 'active';
          const isPending = stage.state === 'pending';

          return (
            <div
              key={stage.id}
              className={`relative flex items-start gap-3.5 rounded-lg border p-3 transition-all duration-200 ${
                isActive
                  ? 'border-blue-500/40 bg-blue-500/[0.05] shadow-[0_0_12px_rgba(59,130,246,0.06)]'
                  : isCompleted
                  ? 'border-slate-800/80 bg-slate-900/25'
                  : 'border-slate-800/40 bg-slate-900/10 opacity-60'
              }`}
            >
              {/* Stage Indicator Icon */}
              <div className="mt-0.5 flex shrink-0 items-center justify-center">
                {isCompleted ? (
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/20 text-blue-300"
                    title="Stage completed"
                  >
                    <Icon name="check" size={12} strokeWidth={2.4} />
                  </div>
                ) : isActive ? (
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-blue-400/30 opacity-75" />
                    <div
                      className="relative flex h-5 w-5 items-center justify-center rounded-full border border-blue-400 bg-blue-500 text-white"
                      title="Stage in progress"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-500"
                    title="Stage pending"
                  >
                    <span className="font-mono text-[9px]">{stage.index}</span>
                  </div>
                )}
              </div>

              {/* Stage Title and Result / Active Message */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-500">
                      {String(stage.index).padStart(2, '0')}.
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isActive
                          ? 'text-blue-200'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>

                  {/* Right side status badge */}
                  <span
                    className={`self-start sm:self-auto rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      isActive
                        ? 'border border-blue-400/30 bg-blue-400/10 text-blue-300'
                        : isCompleted
                        ? 'border border-slate-700/60 bg-slate-800/50 text-slate-400'
                        : 'border border-slate-800 bg-slate-900/30 text-slate-600'
                    }`}
                  >
                    {stage.state}
                  </span>
                </div>

                {/* Subtext message */}
                {stage.displayText && (
                  <div
                    className={`mt-1 text-[11px] leading-4 transition-all duration-200 ${
                      isActive
                        ? 'font-medium text-blue-300/90'
                        : 'text-slate-400'
                    }`}
                  >
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="refresh" size={10} className="animate-spin text-blue-400 shrink-0" />
                        <span>{stage.displayText}</span>
                      </span>
                    ) : (
                      <span>{stage.displayText}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
