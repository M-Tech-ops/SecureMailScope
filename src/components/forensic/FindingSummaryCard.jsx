import { Icon } from '../Icons';

export default function FindingSummaryCard({ finding }) {
  const riskClass = {
    CRITICAL: 'text-red-300 bg-red-400/10 border-red-400/20',
    HIGH: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
    MEDIUM: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
    LOW: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  }[finding.risk?.toUpperCase() || 'HIGH'] || 'text-amber-300 bg-amber-400/10 border-amber-400/20';

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 md:p-6 transition hover:border-slate-750">
      <div className="flex flex-col gap-5">
        {/* Metric Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 border-b border-slate-800/80 pb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Protocol
            </div>
            <div className="mt-1 font-mono text-base font-semibold text-slate-200">
              {finding.protocol}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Affected Sessions
            </div>
            <div className="mt-1 font-mono text-base font-semibold text-slate-200">
              {finding.affectedSessions}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              First Observed
            </div>
            <div className="mt-1 font-mono text-base font-semibold text-slate-300">
              {finding.firstObserved || '18:41:17'}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Last Observed
            </div>
            <div className="mt-1 font-mono text-base font-semibold text-slate-300">
              {finding.lastObserved || '18:41:42'}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Risk Rating
            </div>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-semibold tracking-wider border ${riskClass}`}>
                {finding.risk || 'HIGH'}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Description */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Forensic Assessment Summary
          </div>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">
            {finding.description}
          </p>
        </div>
      </div>
    </div>
  );
}
