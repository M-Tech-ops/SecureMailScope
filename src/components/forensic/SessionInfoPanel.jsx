import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function SessionInfoPanel({ sessionInfo = {}, sessionId }) {
  const navigate = useNavigate();

  const handleSessionClick = () => {
    if (sessionId) {
      navigate(`/session/${sessionId}`);
    }
  };

  const fields = [
    {
      label: 'Session ID',
      value: sessionId || sessionInfo.sessionId || 'SMTP-1847',
      isLink: true,
    },
    {
      label: 'Source Host',
      value: sessionInfo.source || '192.168.1.24',
      isMono: true,
    },
    {
      label: 'Destination',
      value: sessionInfo.destination || 'mail.company.local',
      isMono: true,
    },
    {
      label: 'Protocol',
      value: sessionInfo.protocol || 'SMTP',
      isBadge: true,
    },
    {
      label: 'Timestamp',
      value: sessionInfo.timestamp || '2026-09-06 18:41:17',
      isMono: true,
    },
    {
      label: 'Duration',
      value: sessionInfo.duration || '00:00:08',
      isMono: true,
    },
    {
      label: 'Packets Captured',
      value: sessionInfo.packets ? `${sessionInfo.packets} packets` : '142 packets',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="network" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Session Information</h3>
        </div>
        <span className="text-[11px] text-slate-500">Representative packet stream</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              {field.label}
            </div>

            <div className="mt-1">
              {field.isLink ? (
                <button
                  type="button"
                  onClick={handleSessionClick}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-300 hover:text-blue-200 transition focus:outline-none"
                  title="Open full reconstructed session"
                >
                  <span>{field.value}</span>
                  <Icon name="arrowRight" size={12} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : field.isBadge ? (
                <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                  {field.value}
                </span>
              ) : (
                <span className={`text-xs text-slate-200 ${field.isMono ? 'font-mono' : ''}`}>
                  {field.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
