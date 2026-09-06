import { Icon } from '../Icons';

export default function ProtocolBreakdown({ protocols }) {
  const smtp = protocols.smtp || 0;
  const imap = protocols.imap || 0;
  const pop3 = protocols.pop3 || 0;
  const total = smtp + imap + pop3 || 1;

  const smtpPct = Math.round((smtp / total) * 100);
  const imapPct = Math.round((imap / total) * 100);
  const pop3Pct = Math.max(0, 100 - smtpPct - imapPct);

  const items = [
    {
      name: 'SMTP',
      count: smtp.toLocaleString(),
      percentage: `${smtpPct}%`,
      badgeColor: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
      barColor: 'bg-blue-500',
      description: 'Mail submission & relay (Ports 25, 587, 465)',
    },
    {
      name: 'IMAP',
      count: imap.toLocaleString(),
      percentage: `${imapPct}%`,
      badgeColor: 'border-slate-600/30 bg-slate-700/20 text-slate-300',
      barColor: 'bg-slate-400',
      description: 'Mailbox access & sync (Ports 143, 993)',
    },
    {
      name: 'POP3',
      count: pop3.toLocaleString(),
      percentage: `${pop3Pct}%`,
      badgeColor: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
      barColor: 'bg-cyan-500',
      description: 'Legacy mailbox retrieval (Ports 110, 995)',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="mail" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Detected Email Protocols</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          Total: {(smtp + imap + pop3).toLocaleString()}
        </span>
      </div>

      {/* Mini stacked ratio bar */}
      <div className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="bg-blue-500 transition-all duration-300" style={{ width: `${smtpPct}%` }} />
        <div className="bg-slate-400 transition-all duration-300" style={{ width: `${imapPct}%` }} />
        <div className="bg-cyan-500 transition-all duration-300" style={{ width: `${pop3Pct}%` }} />
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold ${item.badgeColor}`}>
                {item.name}
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-500">
                {item.description}
              </span>
            </div>

            <div className="flex items-baseline gap-2 text-right">
              <span className="font-mono text-xs font-semibold text-slate-200">
                {item.count}
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                ({item.percentage})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
