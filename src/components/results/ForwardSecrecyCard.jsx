import { Icon } from '../Icons';

export default function ForwardSecrecyCard({ forwardSecrecy = {} }) {
  const {
    yes = 1742,
    no = 160,
    unknown = 0,
    total = 1902,
    percentagePfs = '91.6%',
  } = forwardSecrecy;

  const yesPct = Math.round((yes / total) * 100);
  const noPct = Math.max(0, 100 - yesPct);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="shield" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Perfect Forward Secrecy (PFS)</h3>
        </div>
        <span className="rounded border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 font-mono text-[10px] font-medium text-blue-300">
          {percentagePfs} PFS Coverage
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        Key exchange audit determining whether observed TLS sessions utilize ephemeral key exchange (ECDHE/DHE) protecting past traffic against retrospective key compromise.
      </p>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <span className="flex items-center gap-1.5 text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            PFS Enabled (ECDHE)
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Static Key (No PFS)
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="bg-blue-500 transition-all duration-300" style={{ width: `${yesPct}%` }} />
          <div className="bg-amber-400 transition-all duration-300" style={{ width: `${noPct}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
        <div className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Yes (PFS)</div>
          <div className="mt-1 font-mono text-base font-semibold text-blue-300">
            {yes.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{yesPct}% of sessions</div>
        </div>

        <div className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">No (Static RSA)</div>
          <div className="mt-1 font-mono text-base font-semibold text-amber-300">
            {no.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{noPct}% of sessions</div>
        </div>

        <div className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Unknown</div>
          <div className="mt-1 font-mono text-base font-semibold text-slate-400">
            {unknown}
          </div>
          <div className="text-[10px] text-slate-500">0% undetermined</div>
        </div>
      </div>
    </div>
  );
}
