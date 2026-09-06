import { Icon } from '../Icons';
import StartScanButton from './StartScanButton';
import { DEMO_SCENARIOS, SCAN_DEFAULTS } from '../../mock/scanConfig';

export default function ScanSummary({
  selectedFile,
  selectedScenarioId,
  onStartAnalysis,
  isLoading,
}) {
  const currentScenario = DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId);

  // Derive input source label
  const inputDisplay = selectedFile && currentScenario
    ? `${selectedFile.name} (with ${currentScenario.name} demo profile)`
    : selectedFile
    ? selectedFile.name
    : currentScenario
    ? `Demo: ${currentScenario.name}`
    : 'None selected';

  const isEnabled = Boolean(selectedFile || currentScenario);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side: Configuration Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-blue-400/20 bg-blue-400/10 text-blue-300">
              <Icon name="sliders" size={13} />
            </div>
            <h2 className="text-sm font-semibold text-slate-100">Scan Configuration</h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Input
              </div>
              <div className="mt-1 truncate font-mono text-xs text-slate-200" title={inputDisplay}>
                {inputDisplay}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Protocol Scope
              </div>
              <div className="mt-1 text-xs text-slate-200">
                {SCAN_DEFAULTS.protocolScope}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Analysis
              </div>
              <div className="mt-1 text-xs text-slate-200">
                {SCAN_DEFAULTS.analysisScope}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Mode
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {SCAN_DEFAULTS.mode}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
            <Icon name="shield" size={13} className="shrink-0 text-slate-400" />
            <span>
              Passive network forensic inspection only. Traffic is never intercepted, mutated, or injected.
            </span>
          </div>
        </div>

        {/* Right side: Action Button */}
        <div className="flex flex-col items-start gap-2 border-t border-slate-800/80 pt-4 lg:border-t-0 lg:border-l lg:border-slate-800/80 lg:pt-0 lg:pl-6">
          <StartScanButton
            isEnabled={isEnabled}
            isLoading={isLoading}
            onStartScan={onStartAnalysis}
          />
          {!isEnabled && (
            <span className="text-[11px] text-amber-400/80">
              Select a PCAP file or demo dataset to proceed.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
