import { Icon } from '../Icons';

export default function LiveMetrics({ metrics }) {
  const items = [
    {
      id: 'packets',
      label: 'Packets Analyzed',
      value: (metrics.packets || 0).toLocaleString(),
      icon: 'network',
      subtext: 'Raw PCAP frames parsed',
    },
    {
      id: 'sessions',
      label: 'Sessions Reconstructed',
      value: (metrics.sessions || 0).toLocaleString(),
      icon: 'mail',
      subtext: 'TCP conversations tracked',
    },
    {
      id: 'tlsSessions',
      label: 'TLS Sessions',
      value: (metrics.tlsSessions || 0).toLocaleString(),
      icon: 'lock',
      subtext: 'Encrypted handshakes observed',
    },
    {
      id: 'certificates',
      label: 'Certificates Found',
      value: (metrics.certificates || 0).toLocaleString(),
      icon: 'fileCode',
      subtext: 'X.509 chains extracted',
    },
    {
      id: 'potentialFindings',
      label: 'Potential Findings',
      value: (metrics.potentialFindings || 0).toLocaleString(),
      icon: 'alert',
      subtext: 'Flagged for policy audit',
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Real-Time Forensic Ingestion Metrics
          </h2>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
        </div>
        <span className="text-[11px] text-slate-500">Live telemetry stream</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#141b24] p-4 transition hover:border-slate-700"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                  {item.label}
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-700/80 bg-slate-800/60 text-slate-400">
                  <Icon name={item.icon} size={13} />
                </div>
              </div>

              <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-slate-100">
                {item.value}
              </div>
            </div>

            <div className="mt-2 text-[10px] text-slate-500">
              {item.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
