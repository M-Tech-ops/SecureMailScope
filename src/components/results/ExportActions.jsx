import { useState } from 'react';
import { Icon } from '../Icons';

export default function ExportActions({ scanId, fileName }) {
  const [toastMessage, setToastMessage] = useState(null);

  const handleExport = (format) => {
    const defaultName = (fileName || 'scan_capture').replace(/\.[^/.]+$/, '');
    const filename = `${defaultName}_forensic_report.${format.toLowerCase()}`;

    setToastMessage(`Export initiated: generated ${filename}`);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleExport('JSON')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <Icon name="fileCode" size={13} className="text-slate-400" />
          <span>Export JSON</span>
        </button>

        <button
          type="button"
          onClick={() => handleExport('HTML')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <Icon name="file" size={13} className="text-slate-400" />
          <span>Export HTML</span>
        </button>

        <button
          type="button"
          onClick={() => handleExport('PDF')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <Icon name="file" size={13} className="text-slate-400" />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Subtle non-blocking prototype toast notification */}
      {toastMessage && (
        <div
          role="status"
          className="absolute right-0 top-10 z-50 flex items-center gap-2 rounded-lg border border-blue-400/30 bg-slate-900/95 px-3.5 py-2 text-xs text-slate-200 shadow-xl backdrop-blur animate-in"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-500 hover:text-slate-300"
            aria-label="Dismiss toast"
          >
            <Icon name="x" size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
