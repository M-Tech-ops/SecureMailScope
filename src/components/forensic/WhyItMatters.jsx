import { Icon } from '../Icons';

export default function WhyItMatters({ points = [] }) {
  const defaultPoints = [
    'Deprecated cryptographic configurations may not meet modern security policy.',
    'Legacy TLS configurations can increase exposure to known protocol weaknesses.',
    'The affected session should be reviewed and remediated.',
  ];

  const items = points.length > 0 ? points : defaultPoints;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Icon name="alert" size={15} className="text-amber-300" />
        <h3 className="text-sm font-semibold text-slate-100">Why This Matters</h3>
      </div>

      <div className="mt-4 space-y-2.5">
        {items.map((pt, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
            <span>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
