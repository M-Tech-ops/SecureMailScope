import { useRef } from 'react';
import { Icon } from '../Icons';
import { formatFileSize, validateCaptureFile } from '../../services/scanService';

export default function SelectedFileCard({ fileInfo, onChangeFile, onRemoveFile }) {
  const hiddenInputRef = useRef(null);

  const handleHiddenChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      const validation = validateCaptureFile(newFile);
      if (validation.valid) {
        onChangeFile({
          file: newFile,
          name: newFile.name,
          size: newFile.size,
          type: validation.extension || 'pcap',
        });
      }
    }
  };

  const triggerChangeFile = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = '';
      hiddenInputRef.current.click();
    }
  };

  const formattedSize = typeof fileInfo?.size === 'number'
    ? formatFileSize(fileInfo.size)
    : fileInfo?.size || 'Unknown size';

  const extType = (fileInfo?.type || (fileInfo?.name?.endsWith('.pcapng') ? 'pcapng' : 'pcap')).toUpperCase();

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-4 md:p-5 transition hover:border-slate-700">
      <input
        ref={hiddenInputRef}
        type="file"
        accept=".pcap,.pcapng"
        className="hidden"
        onChange={handleHiddenChange}
        aria-label="Change capture file"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* File information group */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-blue-300">
            <Icon name="fileCode" size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-mono text-sm font-medium text-slate-100" title={fileInfo?.name}>
                {fileInfo?.name || 'capture.pcap'}
              </span>
              <span className="rounded border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
                {extType}
              </span>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="text-slate-400">{formattedSize}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-slate-300">Ready for analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={triggerChangeFile}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          >
            <Icon name="refresh" size={12} className="text-slate-400" />
            Change File
          </button>
          <button
            type="button"
            onClick={onRemoveFile}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:border-red-500/30 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/40"
          >
            <Icon name="trash" size={12} className="text-red-400" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
