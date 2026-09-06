import { Icon } from '../Icons';

export default function StartScanButton({ isEnabled, isLoading, onStartScan }) {
  return (
    <button
      type="button"
      disabled={!isEnabled || isLoading}
      onClick={onStartScan}
      aria-label="Start passive forensic analysis"
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 ${
        isEnabled && !isLoading
          ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus:ring-blue-400/40 active:translate-y-[0.5px]'
          : 'cursor-not-allowed border border-slate-800 bg-slate-800/40 text-slate-500 focus:ring-0'
      }`}
    >
      {isLoading ? (
        <>
          <Icon name="refresh" size={16} className="animate-spin text-slate-400" />
          <span>Initializing Pipeline...</span>
        </>
      ) : (
        <>
          <Icon name="scan" size={16} />
          <span>Start Analysis</span>
          <Icon name="arrowRight" size={14} className={isEnabled ? 'text-blue-200' : 'text-slate-600'} />
        </>
      )}
    </button>
  );
}
