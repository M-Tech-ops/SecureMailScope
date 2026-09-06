import { useState } from 'react';
import { Icon } from '../Icons';

export default function SessionEventTimeline({ events = [] }) {
  const [expandedId, setExpandedId] = useState('ev-5'); // Expand ClientHello by default

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getLayerBadge = (layer) => {
    if (layer === 'TLS') return 'border-blue-400/20 bg-blue-400/10 text-blue-300';
    if (layer === 'Application') return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300';
    return 'border-slate-700 bg-slate-800 text-slate-400';
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 md:p-6 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="activity" size={16} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Reconstructed Session Event Flow</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {events.length} chronological events
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Packet-level state machine reconstruction tracing the complete mail conversation from TCP SYN to clean termination.
      </p>

      <div className="mt-5 space-y-2.5">
        {events.map((ev, index) => {
          const isExpanded = expandedId === ev.id;

          return (
            <div
              key={ev.id}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? 'border-blue-500/40 bg-blue-500/[0.04]'
                  : 'border-slate-800 bg-slate-900/30 hover:border-slate-750'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(ev.id)}
                className="flex w-full items-center justify-between p-3 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="font-mono text-[11px] font-semibold text-slate-500 w-5">
                    {String(index + 1).padStart(2, '0')}.
                  </span>

                  <span className="font-mono text-xs text-slate-400">
                    {ev.time}
                  </span>

                  <div className="min-w-0 flex-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">
                      {ev.title}
                    </span>
                    <span className={`rounded px-1.5 py-0.2 font-mono text-[9px] border ${getLayerBadge(ev.layer)}`}>
                      {ev.layer}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    {isExpanded ? 'Hide details' : 'Inspect payload'}
                  </span>
                  <Icon
                    name="chevronRight"
                    size={13}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-800/80 p-3.5 bg-slate-950/60 text-xs animate-in">
                  <div className="text-slate-300 leading-relaxed">
                    {ev.description}
                  </div>

                  {ev.payload && (
                    <div className="mt-2 rounded border border-slate-800 bg-slate-900/80 p-2.5 font-mono text-[11px] text-blue-200/90 whitespace-pre-wrap">
                      <span className="text-slate-600 select-none">// Reconstructed frame data:</span>
                      {'\n'}{ev.payload}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
