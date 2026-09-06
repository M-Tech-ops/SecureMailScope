import { Icon } from '../Icons';

export default function ScanMetadataDetails({
  fileName,
  fileSize,
  fileType,
  mode = 'Passive Forensic Analysis',
  scope = 'SMTP / IMAP / POP3',
  analysisProfile = 'Standard Enterprise Assessment',
}) {
  const details = [
    { label: 'Input File', value: fileName, isMono: true },
    { label: 'File Size', value: fileSize, isMono: true },
    { label: 'Capture Type', value: fileType, isBadge: true },
    { label: 'Mode', value: mode, isStatus: true },
    { label: 'Protocol Scope', value: scope },
    { label: 'Analysis Profile', value: analysisProfile },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Icon name="file" size={15} className="text-blue-300" />
        <h3 className="text-sm font-semibold text-slate-100">Capture & Scan Details</h3>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        {details.map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-slate-800/40 pb-2.5 last:border-0 last:pb-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
              {item.label}
            </span>

            {item.isBadge ? (
              <span className="self-start sm:self-auto rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
                {item.value}
              </span>
            ) : item.isStatus ? (
              <span className="inline-flex items-center gap-1.5 text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>{item.value}</span>
              </span>
            ) : (
              <span className={`text-slate-200 ${item.isMono ? 'font-mono text-[11px] truncate max-w-[220px]' : ''}`} title={item.value}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <Icon name="shield" size={13} className="text-slate-400 shrink-0" />
          <span>Passive analysis engine. Zero packets injected or altered.</span>
        </div>
      </div>
    </div>
  );
}
