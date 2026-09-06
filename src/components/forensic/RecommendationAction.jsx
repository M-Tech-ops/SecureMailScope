import { Icon } from '../Icons';

export default function RecommendationAction({ recommendation = {} }) {
  const {
    action = 'Disable deprecated TLS versions and require an approved modern TLS configuration for enterprise email services.',
    priority = 'HIGH',
    owner = 'Email / Infrastructure Security Team',
  } = recommendation;

  const priorityClass = {
    CRITICAL: 'border-red-400/20 bg-red-400/10 text-red-300',
    HIGH: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    MEDIUM: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300',
    LOW: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
  }[priority.toUpperCase()] || 'border-blue-400/20 bg-blue-400/10 text-blue-300';

  return (
    <div className="rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-500/[0.04] to-[#141b24] p-5 transition hover:border-blue-500/30">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="checkCircle" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Recommended Action</h3>
        </div>
        <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold border ${priorityClass}`}>
          {priority} Priority
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
          {action}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Assigned Owner:</span>
            <span className="text-slate-200 font-semibold">{owner}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Status: Remediation Queued</span>
        </div>
      </div>
    </div>
  );
}
