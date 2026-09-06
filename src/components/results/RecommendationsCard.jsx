import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function RecommendationsCard({ recommendations = [] }) {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const priorityBadge = {
    CRITICAL: 'border-red-400/20 bg-red-400/10 text-red-300',
    HIGH: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    MEDIUM: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300',
    LOW: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="checkCircle" size={16} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Priority Recommendations</h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Ranked by risk reduction impact
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {recommendations.map((rec, index) => {
          const isExpanded = expandedId === rec.id;
          const badgeClass = priorityBadge[rec.priority.toUpperCase()] || priorityBadge.MEDIUM;

          return (
            <div
              key={rec.id}
              className={`rounded-lg border transition-all duration-150 ${
                isExpanded
                  ? 'border-blue-500/40 bg-blue-500/[0.04]'
                  : 'border-slate-800 bg-slate-900/30 hover:border-slate-750'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(rec.id)}
                className="flex w-full items-center justify-between p-3.5 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {index + 1}.
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        {rec.title}
                      </span>
                      <span className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider border ${badgeClass}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 truncate">
                      {rec.rationale}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-3">
                  <span className="hidden sm:inline font-mono text-[10px] text-slate-500">
                    {rec.affectedCount}
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:text-slate-200">
                    <Icon
                      name="chevronRight"
                      size={14}
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-800/80 p-3.5 bg-slate-900/40 text-xs animate-in">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Recommended Remediation Action
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {rec.action}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                    <span className="text-slate-500">Evidence reference: <span className="font-mono text-slate-300">{rec.findingRef}</span></span>
                    {rec.findingRef && (
                      <button
                        type="button"
                        onClick={() => navigate(`/findings/${rec.findingRef}`)}
                        className="inline-flex items-center gap-1 font-medium text-blue-300 hover:text-blue-200 transition"
                      >
                        <span>View Technical Finding</span>
                        <Icon name="arrowRight" size={11} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
