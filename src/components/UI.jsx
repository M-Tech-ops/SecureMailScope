import { Icon } from './Icons';

export function SectionHeader({ title, actionLabel, onAction }) {
  return <div className="mb-4 flex items-center justify-between">
    <h2 className="text-[15px] font-semibold text-slate-200">{title}</h2>
    {actionLabel && <button onClick={onAction} className="inline-flex items-center gap-1 text-xs font-medium text-blue-300 hover:text-blue-200">
      {actionLabel}<Icon name="chevronRight" size={14} />
    </button>}
  </div>;
}

export function MetricCard({ icon, label, value, subtext }) {
  return <div className="rounded-xl border border-slate-800 bg-[#141b24] p-4 transition hover:border-slate-700">
    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400"><Icon name={icon} size={16} /></div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">{label}</div>
    <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">{value}</div>
    <div className="mt-1 text-[11px] text-slate-500">{subtext}</div>
  </div>;
}

const sevClass = {
  CRITICAL: 'text-red-300 bg-red-400/8 border-red-400/15',
  HIGH: 'text-amber-300 bg-amber-400/8 border-amber-400/15',
  MEDIUM: 'text-yellow-300 bg-yellow-400/8 border-yellow-400/15',
  LOW: 'text-blue-300 bg-blue-400/8 border-blue-400/15',
};

export function SeverityBadge({ value }) {
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${sevClass[value] || 'border-slate-700 bg-slate-800/60 text-slate-400'}`}>{value}</span>;
}

export function RiskBadge({ value }) {
  const c = { Critical: sevClass.CRITICAL, High: sevClass.HIGH, Medium: sevClass.MEDIUM, Low: sevClass.LOW }[value] || sevClass.LOW;
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${c}`}>{value}</span>;
}

export function Card({ children, className = '' }) {
  return <section className={`rounded-xl border border-slate-800 bg-[#141b24] ${className}`}>{children}</section>;
}
