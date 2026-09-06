import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';
import { SeverityBadge } from '../UI';

export default function RelatedFindingsList({ findings = [] }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="layers" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Related Findings</h3>
        </div>
        <span className="text-[11px] text-slate-500">Correlated Policy Deviations</span>
      </div>

      <div className="mt-4 space-y-2">
        {findings.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => navigate(`/findings/${f.id}`)}
            className="group flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/30 p-3 text-left transition hover:border-slate-700 hover:bg-slate-800/40 focus:outline-none"
          >
            <div className="min-w-0 flex-1 pr-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition">
                  {f.title}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {f.id}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 truncate">
                Observed in {f.protocol} session traffic
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <SeverityBadge value={f.severity} />
              <Icon name="chevronRight" size={13} className="text-slate-500 group-hover:text-slate-300 transition" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
