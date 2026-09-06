import { Icon } from '../Icons';
import { ANALYSIS_MODULES } from '../../mock/scanConfig';

export default function AnalysisModules() {
  return (
    <div className="space-y-3.5">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-slate-100">Analysis Modules</h2>
          <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[10px] font-medium text-blue-300">
            Pipeline Active
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          The following modules will be applied to the selected traffic capture.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ANALYSIS_MODULES.map((module) => (
          <div
            key={module.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#141b24]/80 p-3.5 transition hover:border-slate-750 hover:bg-[#151e28]"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-400/20 bg-blue-400/10 text-blue-300">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </div>
                <h3 className="text-xs font-semibold text-slate-200">
                  {module.name}
                </h3>
              </div>

              <div className="mt-2 text-xs font-medium text-slate-400">
                {module.description}
              </div>

              {module.subtext && (
                <div className="mt-1 text-[11px] leading-4 text-slate-500">
                  {module.subtext}
                </div>
              )}
            </div>

            <div className="mt-3.5 flex items-center gap-1.5 border-t border-slate-800/60 pt-2 text-[10px] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400/60" />
              <span>Automated forensic check</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
