import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';

export default function SessionHeader({ session, onBackFinding }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {/* Breadcrumb back control */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => navigate('/scan/SCAN-001/results')}
          className="hover:text-slate-300 transition"
        >
          Scan Results
        </button>
        <span className="text-slate-700">/</span>
        <button
          type="button"
          onClick={() => (onBackFinding ? onBackFinding() : navigate(-1))}
          className="hover:text-slate-300 transition"
        >
          Findings
        </button>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300 font-medium">Session Investigation</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
              Session {session.id}
            </h1>
            <span className="rounded border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300">
              {session.protocol}
            </span>
            <span className="rounded border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
              Reconstructed Stream
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div>Source: <span className="text-slate-200">{session.source}:{session.sourcePort || 49822}</span></div>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <div>Destination: <span className="text-slate-200">{session.destination}:{session.destinationPort || 25}</span></div>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <div>Timestamp: <span className="text-slate-200">{session.timestamp}</span></div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => (onBackFinding ? onBackFinding() : navigate(-1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none"
          >
            <Icon name="arrowLeft" size={13} />
            <span>Back to Finding</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/scan/SCAN-001/results')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none"
          >
            <span>Scan Results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
