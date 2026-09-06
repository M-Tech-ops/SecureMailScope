import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icons';
import { SeverityBadge } from '../UI';

export default function FindingsTable({
  findings = [],
  selectedSeverity,
  onSelectSeverity,
}) {
  const navigate = useNavigate();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [protocolFilter, setProtocolFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter application
  const filteredFindings = useMemo(() => {
    return findings.filter((f) => {
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = f.title.toLowerCase().includes(q);
        const matchId = f.id.toLowerCase().includes(q);
        const matchEvidence = (f.evidence || '').toLowerCase().includes(q);
        const matchProtocol = f.protocol.toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchEvidence && !matchProtocol) return false;
      }

      // Severity filter (either from prop or local)
      if (selectedSeverity && selectedSeverity !== 'ALL') {
        if (f.severity.toUpperCase() !== selectedSeverity.toUpperCase()) return false;
      }

      // Protocol filter
      if (protocolFilter !== 'ALL') {
        if (f.protocol.toUpperCase() !== protocolFilter.toUpperCase()) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL') {
        if (f.status.toUpperCase() !== statusFilter.toUpperCase()) return false;
      }

      return true;
    });
  }, [findings, searchQuery, selectedSeverity, protocolFilter, statusFilter]);

  const handleRowClick = (findingId) => {
    navigate(`/findings/${findingId}`);
  };

  const handleSessionClick = (e, sessionId) => {
    e.stopPropagation();
    if (sessionId) {
      navigate(`/session/${sessionId}`);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setProtocolFilter('ALL');
    setStatusFilter('ALL');
    if (onSelectSeverity) onSelectSeverity('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || (selectedSeverity && selectedSeverity !== 'ALL') || protocolFilter !== 'ALL' || statusFilter !== 'ALL';

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      {/* Header & Title */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-100">Security Findings</h3>
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 font-mono text-[10px] font-medium text-blue-300">
              {filteredFindings.length} of {findings.length}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Click any row to open full technical evidence, session payloads, and remediation guidance.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 transition"
          >
            <Icon name="refresh" size={12} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Toolbar */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative">
          <Icon
            name="search"
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search findings..."
            className="w-full rounded-lg border border-slate-800 bg-slate-900/50 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-blue-400/40 focus:outline-none"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="sev-filter" className="text-[11px] font-medium text-slate-500 shrink-0">
            Severity:
          </label>
          <select
            id="sev-filter"
            value={selectedSeverity || 'ALL'}
            onChange={(e) => onSelectSeverity && onSelectSeverity(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-2 text-xs text-slate-200 focus:border-blue-400/40 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Protocol Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="proto-filter" className="text-[11px] font-medium text-slate-500 shrink-0">
            Protocol:
          </label>
          <select
            id="proto-filter"
            value={protocolFilter}
            onChange={(e) => setProtocolFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-2 text-xs text-slate-200 focus:border-blue-400/40 focus:outline-none"
          >
            <option value="ALL">All Protocols</option>
            <option value="SMTP">SMTP</option>
            <option value="IMAP">IMAP</option>
            <option value="POP3">POP3</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-[11px] font-medium text-slate-500 shrink-0">
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-2 text-xs text-slate-200 focus:border-blue-400/40 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Review">Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5">Severity</th>
              <th className="px-3 py-2.5">Finding</th>
              <th className="px-3 py-2.5">Protocol</th>
              <th className="px-3 py-2.5">Affected Sessions</th>
              <th className="px-3 py-2.5">Evidence</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFindings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                  No security findings match the active search and filter criteria.
                </td>
              </tr>
            ) : (
              filteredFindings.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => handleRowClick(f.id)}
                  className="group cursor-pointer border-b border-slate-800/60 transition hover:bg-slate-800/30"
                >
                  {/* Severity Badge */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <SeverityBadge value={f.severity} />
                  </td>

                  {/* Finding Title & ID */}
                  <td className="px-3 py-3">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition">
                      {f.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-slate-500">
                      {f.id}
                    </div>
                  </td>

                  {/* Protocol */}
                  <td className="px-3 py-3 whitespace-nowrap font-mono text-xs text-slate-300">
                    {f.protocol}
                  </td>

                  {/* Affected Sessions */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => handleSessionClick(e, f.sessionId)}
                      className="inline-flex items-center gap-1 rounded bg-slate-800/70 px-2 py-0.5 font-mono text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition"
                      title="Drill down into session packets"
                    >
                      <span>{f.affectedSessions}</span>
                      <span className="text-[10px] text-slate-500">sessions</span>
                    </button>
                  </td>

                  {/* Evidence summary */}
                  <td className="px-3 py-3 text-xs text-slate-400">
                    <span className="rounded border border-slate-800 bg-slate-900/40 px-2 py-1 font-mono text-[11px] text-slate-300">
                      {f.evidence}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-medium ${
                        f.status === 'Open'
                          ? 'border border-red-400/20 bg-red-400/10 text-red-300'
                          : f.status === 'Review'
                          ? 'border border-yellow-400/20 bg-yellow-400/10 text-yellow-300'
                          : 'border border-slate-700 bg-slate-800 text-slate-400'
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>

                  {/* Row Navigation Chevron */}
                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-blue-300 transition">
                      Details
                      <Icon name="chevronRight" size={13} />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
