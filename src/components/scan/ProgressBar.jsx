import { Icon } from '../Icons';

export default function ProgressBar({ progress, elapsedSeconds, isComplete }) {
  // Format elapsed time as MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Estimate remaining time based on remaining progress and elapsed rate
  const estimateRemaining = () => {
    if (isComplete) return 'Analysis finished';
    if (progress <= 5 || elapsedSeconds <= 1) return '~10s remaining';
    const rate = progress / Math.max(1, elapsedSeconds);
    const remainingSeconds = Math.max(1, Math.round((100 - progress) / rate));
    return `~${remainingSeconds}s remaining`;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 md:p-6 transition hover:border-slate-750">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Current Pipeline Status
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              {progress}%
            </span>
            <span className="text-xs font-medium text-slate-400">
              Analysis completion
            </span>
          </div>
        </div>

        {/* Real-time counters: Started, Elapsed, Remaining */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 sm:gap-6">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-600 font-sans">Started</div>
            <div className="mt-0.5 text-slate-300">Just now</div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-600 font-sans">Elapsed</div>
            <div className="mt-0.5 text-slate-200">{formatTime(elapsedSeconds)}</div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-600 font-sans">Estimated</div>
            <div className="mt-0.5 text-blue-300">{estimateRemaining()}</div>
          </div>
        </div>
      </div>

      {/* Progress Track and Bar */}
      <div className="mt-5">
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Forensic analysis progress"
          className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800/90"
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              isComplete
                ? 'bg-emerald-500'
                : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
