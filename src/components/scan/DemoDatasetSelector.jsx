import DemoScenarioCard from './DemoScenarioCard';
import { DEMO_SCENARIOS } from '../../mock/scanConfig';

export default function DemoDatasetSelector({ selectedScenarioId, onSelectScenario }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300">
            Try Demo Dataset
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Run SecureMailScope using a predefined synthetic traffic scenario.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Demo analysis scenarios"
        className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {DEMO_SCENARIOS.map((scenario) => (
          <DemoScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenarioId === scenario.id}
            onSelect={(id) => {
              // Clicking active scenario toggles off if user wants to run only uploaded file, or switch
              onSelectScenario(selectedScenarioId === id ? null : id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
