import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';
import { SeverityBadge } from '../UI';
import { FINDINGS_DATA } from '../../mock/findingsData.js';

export default function AssociatedFindingsCard({ findingIds = [] }) {
  const navigate = useNavigate();

  const findings = findingIds
    .map((id) => FINDINGS_DATA[id])
    .filter(Boolean);

  if (findings.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="alert" size={15} className="text-amber-300" />
          <h3 className="text-sm font-semibold text-slate-100">Associated Security Findings</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {findings.length} findings linked
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {findings.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => navigate(`/findings/${f.id}`)}
            className="group flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/30 p-3 text-left transition hover:border-slate-750 hover:bg-slate-800/40 focus:outline-none"
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
              <p className="mt-1 text-[11px] text-slate-400 truncate">
                {f.description}
              </p>
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
