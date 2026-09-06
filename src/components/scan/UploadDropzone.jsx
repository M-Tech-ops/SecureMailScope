import { useState, useRef } from 'react';
import { Icon } from '../Icons';
import { validateCaptureFile } from '../../services/scanService';

export default function UploadDropzone({ onFileSelect, disabled = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const processFile = (file) => {
    if (!file) return;
    const result = validateCaptureFile(file);
    if (!result.valid) {
      setErrorMessage(result.error || 'Unsupported file type. Please select a .pcap or .pcapng file.');
      return;
    }
    setErrorMessage('');
    onFileSelect({
      file,
      name: file.name,
      size: file.size,
      type: result.extension || 'pcap',
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const handleBrowseClick = () => {
    if (disabled) return;
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBrowseClick();
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pcap,.pcapng"
        className="hidden"
        onChange={handleFileInputChange}
        aria-label="Upload PCAP or PCAPNG file"
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Drop PCAP file here or browse files"
        onClick={handleBrowseClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
          isDragOver
            ? 'border-blue-400/80 bg-blue-500/10 shadow-[inset_0_0_20px_rgba(59,130,246,0.08)]'
            : errorMessage
            ? 'border-red-400/40 bg-red-400/5 hover:border-red-400/60'
            : 'border-slate-800 bg-[#121822]/80 hover:border-slate-700 hover:bg-[#141b26]'
        }`}
      >
        {/* Network / capture file icon container */}
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition duration-150 ${
            isDragOver
              ? 'border-blue-400/40 bg-blue-500/20 text-blue-300'
              : errorMessage
              ? 'border-red-400/30 bg-red-400/10 text-red-300'
              : 'border-slate-700/80 bg-slate-800/80 text-slate-300 group-hover:border-slate-600 group-hover:text-slate-100'
          }`}
        >
          <Icon name={isDragOver ? 'upload' : 'network'} size={24} strokeWidth={1.8} />
        </div>

        {/* Primary prompt */}
        <div className="text-base font-semibold tracking-tight text-slate-100">
          Drop PCAP file here
        </div>

        {/* Or separator */}
        <div className="my-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px w-8 bg-slate-800" />
          <span>or</span>
          <span className="h-px w-8 bg-slate-800" />
        </div>

        {/* Browse Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleBrowseClick();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-750 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <Icon name="fileCode" size={14} className="text-blue-300" />
          Browse Files
        </button>

        {/* Hint text */}
        <div className="mt-3 text-[11px] text-slate-500">
          Supports <span className="font-mono text-slate-400">.pcap</span> and{' '}
          <span className="font-mono text-slate-400">.pcapng</span> network capture files
        </div>
      </div>

      {/* Inline validation error message */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300 transition"
        >
          <Icon name="alert" size={15} className="shrink-0 text-red-400" />
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="ml-auto text-slate-400 hover:text-slate-200"
            aria-label="Dismiss error"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
