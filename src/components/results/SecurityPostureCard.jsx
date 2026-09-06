import { Icon } from '../Icons';

export default function SecurityPostureCard({
  overallScore = 76,
  riskLevel = 'MEDIUM',
  supportingText = 'Based on observed email sessions and cryptographic configurations.',
  totals = {},
}) {
  const {
    sessionsAnalyzed = 2138,
    tlsSessions = 1902,
    findingsCount = 154,
    anomalousSessions = 14,
  } = totals;

  const riskClass = {
    CRITICAL: 'text-red-300 bg-red-400/10 border-red-400/20',
    HIGH: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
    MEDIUM: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
    LOW: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  }[riskLevel.toUpperCase()] || 'text-slate-300 bg-slate-800 border-slate-700';

  const strokeColor = {
    CRITICAL: '#e06c75',
    HIGH: '#d19a66',
    MEDIUM: '#e5c07b',
    LOW: '#98c379',
  }[riskLevel.toUpperCase()] || '#7b9ec6';

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#141b24] p-5 md:p-6 transition hover:border-slate-750">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left column: Context & Explanations */}
        <div className="max-w-xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300">
            Overall Security Posture
          </div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
            Cryptographic Defense Evaluation
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {supportingText}
          </p>

          {/* Core Secondary Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-800/80 pt-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Sessions Analyzed</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {sessionsAnalyzed.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">TLS Sessions</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {tlsSessions.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Findings</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {findingsCount.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Anomalous Sessions</div>
              <div className="mt-1 font-mono text-base font-semibold text-slate-100">
                {anomalousSessions.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Radial Gauge & Risk Evaluation */}
        <div className="flex items-center gap-6 self-start sm:self-auto border-t border-slate-800/80 pt-4 lg:border-t-0 lg:pt-0">
          <div className="relative h-32 w-32 shrink-0 md:h-36 md:w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#223044"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={strokeColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={Math.PI * 100}
                strokeDashoffset={Math.PI * 100 * (1 - overallScore / 100)}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-slate-100">
                {overallScore}
              </div>
              <div className="text-[10px] font-mono text-slate-500">/ 100</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
              Risk Evaluation
            </div>
            <div className="mt-1.5">
              <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${riskClass}`}>
                {riskLevel} RISK
              </span>
            </div>
            <p className="mt-2 max-w-[170px] text-[11px] leading-4 text-slate-500">
              Remediate critical findings before accepting current enterprise posture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
