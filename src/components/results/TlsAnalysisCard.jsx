import { TlsChart } from '../Charts';
import { Icon } from '../Icons';

export default function TlsAnalysisCard({ data = [] }) {
  const deprecatedItem = data.find((d) => d.status === 'deprecated' && d.percentage > 0);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="lock" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">TLS Protocol Distribution</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          Handshake Versions
        </span>
      </div>

      <div className="mt-4">
        <TlsChart data={data} />
      </div>

      {deprecatedItem ? (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-3 text-xs text-amber-300/90">
          <Icon name="alert" size={15} className="mt-0.5 shrink-0 text-amber-400" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-200">Deprecated Configuration Detected: </span>
            {deprecatedItem.percentage}% of observed TLS sessions use a deprecated protocol configuration ({deprecatedItem.version}).
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-xs text-emerald-300">
          <Icon name="check" size={14} className="text-emerald-400" />
          <span>All observed TLS sessions utilize modern cryptographic protocol baselines (TLS 1.2+).</span>
        </div>
      )}
    </div>
  );
}
