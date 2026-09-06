import { Icon } from '../Icons';

export default function SeverityCards({ severitySummary = [], selectedSeverity, onSelectSeverity }) {
  const styles = {
    CRITICAL: {
      border: 'border-red-400/20 hover:border-red-400/40',
      activeBorder: 'border-red-400/60 ring-1 ring-red-400/30',
      bg: 'bg-red-400/[0.04]',
      badge: 'text-red-300 bg-red-400/10 border-red-400/20',
      num: 'text-slate-100',
    },
    HIGH: {
      border: 'border-amber-400/20 hover:border-amber-400/40',
      activeBorder: 'border-amber-400/60 ring-1 ring-amber-400/30',
      bg: 'bg-amber-400/[0.04]',
      badge: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
      num: 'text-slate-100',
    },
    MEDIUM: {
      border: 'border-yellow-400/20 hover:border-yellow-400/40',
      activeBorder: 'border-yellow-400/60 ring-1 ring-yellow-400/30',
      bg: 'bg-yellow-400/[0.04]',
      badge: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
      num: 'text-slate-100',
    },
    LOW: {
      border: 'border-blue-400/20 hover:border-blue-400/40',
      activeBorder: 'border-blue-400/60 ring-1 ring-blue-400/30',
      bg: 'bg-blue-400/[0.04]',
      badge: 'text-blue-300 bg-blue-400/10 border-blue-400/20',
      num: 'text-slate-100',
    },
  };

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      {severitySummary.map((item) => {
        const sev = item.severity.toUpperCase();
        const conf = styles[sev] || styles.LOW;
        const isSelected = selectedSeverity === sev;

        return (
          <button
            key={item.severity}
            type="button"
            onClick={() => onSelectSeverity && onSelectSeverity(isSelected ? 'ALL' : sev)}
            className={`rounded-xl border p-4 text-left transition-all duration-150 focus:outline-none ${conf.bg} ${
              isSelected ? conf.activeBorder : conf.border
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border ${conf.badge}`}>
                {item.label || item.severity}
              </span>
              {isSelected && (
                <span className="text-[10px] text-blue-300 font-medium">Filtered</span>
              )}
            </div>

            <div className={`mt-2.5 font-mono text-2xl font-bold tracking-tight ${conf.num}`}>
              {item.count}
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              {sev === 'CRITICAL' ? 'Immediate action required' :
               sev === 'HIGH' ? 'High priority remediation' :
               sev === 'MEDIUM' ? 'Policy configuration review' :
               'Informational hygiene'}
            </div>
          </button>
        );
      })}
    </div>
  );
}
