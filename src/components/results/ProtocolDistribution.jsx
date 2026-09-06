import { ProtocolChart } from '../Charts';
import { Icon } from '../Icons';

export default function ProtocolDistribution({ data = [] }) {
  const total = data.reduce((sum, d) => sum + (d.sessions || 0), 0);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="mail" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Email Protocol Analysis</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {total.toLocaleString()} total sessions
        </span>
      </div>

      <div className="mt-4">
        <ProtocolChart data={data} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-800/60 pt-3 text-center">
        {data.map((item) => (
          <div key={item.name} className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {item.name}
            </div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-slate-200">
              {item.sessions.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500">
              {item.subtext || `${item.percentage}%`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
