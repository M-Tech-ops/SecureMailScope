import { useState } from 'react';
import { Icon } from '../Icons';

export default function CertificateHealthCard({ certificateHealth = {}, onFilterCertificates }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const {
    valid = 1810,
    nearExpiry = 29,
    expired = 7,
    invalid = 4,
    total = 1850,
  } = certificateHealth;

  const categories = [
    {
      id: 'valid',
      label: 'Valid',
      count: valid,
      percentage: ((valid / total) * 100).toFixed(1),
      badgeClass: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
      dotColor: 'bg-emerald-400',
      subtext: 'Trust anchor verified',
    },
    {
      id: 'nearExpiry',
      label: 'Near Expiry',
      count: nearExpiry,
      percentage: ((nearExpiry / total) * 100).toFixed(1),
      badgeClass: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300',
      dotColor: 'bg-yellow-400',
      subtext: 'Within 30-day window',
    },
    {
      id: 'expired',
      label: 'Expired',
      count: expired,
      percentage: ((expired / total) * 100).toFixed(1),
      badgeClass: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
      dotColor: 'bg-amber-400',
      subtext: 'Validity period elapsed',
    },
    {
      id: 'invalid',
      label: 'Invalid / Suspicious',
      count: invalid,
      percentage: ((invalid / total) * 100).toFixed(1),
      badgeClass: 'border-red-400/20 bg-red-400/10 text-red-300',
      dotColor: 'bg-red-400',
      subtext: 'Chain/SAN mismatch',
    },
  ];

  const handleSelect = (id) => {
    const next = activeCategory === id ? null : id;
    setActiveCategory(next);
    if (onFilterCertificates) onFilterCertificates(next);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="fileCode" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Certificate Health</h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {total.toLocaleString()} X.509 certificates
        </span>
      </div>

      {/* Progress ratio track */}
      <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="bg-emerald-500 transition-all duration-300" style={{ width: `${(valid / total) * 100}%` }} />
        <div className="bg-yellow-400 transition-all duration-300" style={{ width: `${(nearExpiry / total) * 100}%` }} />
        <div className="bg-amber-500 transition-all duration-300" style={{ width: `${(expired / total) * 100}%` }} />
        <div className="bg-red-500 transition-all duration-300" style={{ width: `${(invalid / total) * 100}%` }} />
      </div>

      {/* Clickable category cards */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              className={`rounded-lg border p-3 text-left transition-all duration-150 focus:outline-none ${
                isSelected
                  ? 'border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-400/30'
                  : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold border ${cat.badgeClass}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                  {cat.label}
                </span>
              </div>

              <div className="mt-2 font-mono text-xl font-semibold text-slate-100">
                {cat.count.toLocaleString()}
              </div>

              <div className="mt-1 text-[10px] text-slate-500">
                {cat.percentage}% · {cat.subtext}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
