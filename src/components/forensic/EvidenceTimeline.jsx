import { useState } from 'react';
import { Icon } from '../Icons';

export default function EvidenceTimeline({ timeline = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (idx) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="clock" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Observed Session Evidence</h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Handshake Sequence Reconstruction
        </span>
      </div>

      <div className="mt-5 relative">
        {/* Vertical line indicator */}
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-slate-800" />

        <div className="space-y-3">
          {timeline.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={idx} className="relative pl-8">
                {/* Node circle */}
                <div
                  className={`absolute left-1.5 top-2.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border transition ${
                    isExpanded
                      ? 'border-blue-400 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      : 'border-slate-700 bg-[#141b24]'
                  }`}
                />

                <div
                  className={`rounded-lg border p-3 transition-all ${
                    isExpanded
                      ? 'border-blue-500/40 bg-blue-500/[0.04]'
                      : 'border-slate-800/80 bg-slate-900/30 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-400">
                        {item.time}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {item.event}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">
                        {isExpanded ? 'Collapse' : 'Inspect'}
                      </span>
                      <Icon
                        name="chevronRight"
                        size={12}
                        className={`text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <div className="mt-1 text-xs text-slate-400">
                    {item.description}
                  </div>

                  {isExpanded && item.details && (
                    <div className="mt-2.5 rounded border border-slate-800/80 bg-slate-950/60 p-2 font-mono text-[11px] text-blue-200/80 animate-in">
                      {item.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
