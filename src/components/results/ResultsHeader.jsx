import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function ResultsHeader({ scanId, fileName, completedAt, status }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {/* Breadcrumb back control */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-400/40 rounded px-1 py-0.5"
        aria-label="Back to overview"
      >
        <Icon name="arrowLeft" size={13} className="transition-transform group-hover:-translate-x-0.5" />
        <span>Overview</span>
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
              Scan Results
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <Icon name="check" size={11} strokeWidth={2.4} />
              {status || 'ANALYSIS COMPLETE'}
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Enterprise Email Cryptographic Security Assessment
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-400">{fileName || 'capture.pcap'}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1 font-mono text-slate-400">
              <span className="text-slate-600 font-sans">ID:</span>
              <span>{scanId || 'SCAN-001'}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1 text-slate-400">
              <Icon name="clock" size={12} className="text-slate-500" />
              <span>{completedAt || 'Today, 18:44 UTC'}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => navigate('/scan/new')}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40 shadow-sm"
          >
            <Icon name="plus" size={14} />
            <span>New Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
