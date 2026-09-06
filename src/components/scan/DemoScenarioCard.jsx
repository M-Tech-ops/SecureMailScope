import { Icon } from '../Icons';

export default function DemoScenarioCard({ scenario, isSelected, onSelect }) {
  const { id, name, description, expectedScore, expectedRisk } = scenario;

  const riskClasses = {
    CRITICAL: 'text-red-300 bg-red-400/10 border-red-400/20',
    HIGH: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
    MEDIUM: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
    LOW: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  };

  const badgeClass = riskClasses[expectedRisk.toUpperCase()] || 'text-slate-300 bg-slate-800 border-slate-700';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={handleKeyDown}
      className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
        isSelected
          ? 'border-blue-500/50 bg-blue-500/[0.06] shadow-[0_0_0_1px_rgba(59,130,246,0.2)]'
          : 'border-slate-800 bg-[#141b24]/90 hover:border-slate-700 hover:bg-[#161e29]'
      }`}
    >
      <div>
        {/* Header row: radio indicator + title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                isSelected
                  ? 'border-blue-400 bg-blue-500 text-white'
                  : 'border-slate-600 bg-slate-900/60 group-hover:border-slate-500'
              }`}
            >
              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
            </div>
            <h3 className="text-sm font-semibold text-slate-100">{name}</h3>
          </div>

          <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${badgeClass}`}>
            {expectedRisk}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2.5 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      {/* Footer info: Expected score */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
        <span className="text-[11px] text-slate-500">Expected demo score</span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-sm font-semibold text-slate-200">{expectedScore}</span>
          <span className="text-[10px] text-slate-500">/ 100</span>
        </div>
      </div>
    </div>
  );
}
