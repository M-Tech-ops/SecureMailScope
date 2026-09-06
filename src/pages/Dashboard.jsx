import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardSummary, recentFindings, recentScans, anomalies } from '../mock/dashboard';
import { Icon } from '../components/Icons';
import { ProtocolChart, TlsChart } from '../components/Charts';
import { Card, MetricCard, RiskBadge, SectionHeader, SeverityBadge } from '../components/UI';

export default function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => recentFindings.filter(f => `${f.title} ${f.id} ${f.protocol} ${f.severity}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="space-y-5">
    <Card className="overflow-hidden p-5 md:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="text-[13px] font-medium text-blue-300">Security Posture</div>
          <h1 className="mt-1 text-xl font-semibold text-slate-100 md:text-2xl">Enterprise email cryptographic posture</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Automated assessment of observed email sessions, TLS configurations and certificate health.</p>
          <div className="mt-5 flex items-center gap-5 text-xs">
            <div><div className="uppercase tracking-wider text-[10px] text-slate-600">Last assessment</div><div className="mt-1 text-slate-300">Today, 18:42</div></div>
            <div className="h-7 w-px bg-slate-800" />
            <div><div className="uppercase tracking-wider text-[10px] text-slate-600">Analyzed</div><div className="mt-1 text-slate-300">{dashboardSummary.totalSessions.toLocaleString()} sessions</div></div>
          </div>
          <button onClick={() => navigate('/scan/SCAN-001/results')} className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-300 hover:text-blue-200">View scan results <Icon name="arrowRight" size={14} /></button>
        </div>
        <div className="flex items-center gap-5 self-start md:self-auto">
          <div className="relative h-32 w-32 shrink-0 md:h-36 md:w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#223044" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#7b9ec6" strokeWidth="8" strokeLinecap="round" strokeDasharray={Math.PI * 100} strokeDashoffset={Math.PI * 100 * (1 - dashboardSummary.overallScore / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center"><div className="text-3xl font-semibold text-slate-100">{dashboardSummary.overallScore}</div><div className="text-[10px] text-slate-500">/ 100</div></div>
          </div>
          <div className="hidden sm:block"><div className="text-[10px] uppercase tracking-[0.14em] text-slate-600">Current risk</div><div className="mt-2 text-lg font-semibold text-slate-100">{dashboardSummary.riskLevel}</div><div className="mt-1 max-w-32 text-[11px] leading-5 text-slate-500">Review open findings before accepting the current posture.</div></div>
        </div>
      </div>
    </Card>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon="mail" label="Email sessions" value={dashboardSummary.totalSessions.toLocaleString()} subtext="Across SMTP, IMAP & POP3" />
      <MetricCard icon="lock" label="TLS sessions" value={dashboardSummary.tlsSessions.toLocaleString()} subtext="88.9% of observed sessions" />
      <MetricCard icon="alert" label="Security findings" value={dashboardSummary.findingsCount.toLocaleString()} subtext="Across analyzed sessions" />
      <MetricCard icon="activity" label="Anomalous sessions" value={dashboardSummary.anomalousSessions.toLocaleString()} subtext="Requires analyst review" />
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5"><SectionHeader title="Email Protocol Distribution" /><ProtocolChart data={dashboardSummary.protocolDistribution} /></Card>
      <Card className="p-5">
        <SectionHeader title="TLS Version Distribution" />
        <TlsChart data={dashboardSummary.tlsDistribution} />
        <div className="mt-2 flex gap-2 rounded-lg border border-amber-500/10 bg-amber-500/5 p-3"><Icon name="alert" size={14} className="mt-0.5 shrink-0 text-amber-300" /><p className="text-[11px] leading-5 text-amber-200/75">3% of observed TLS sessions use a deprecated protocol configuration.</p></div>
      </Card>
    </div>

    <Card className="p-5">
      <SectionHeader title="Security Findings" actionLabel="View all findings" onAction={() => navigate('/findings')} />
      <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {dashboardSummary.severityDistribution.map(x => <button key={x.severity} onClick={() => navigate('/findings')} className={`rounded-lg border p-3 text-left transition hover:border-slate-700 ${x.severity === 'CRITICAL' ? 'border-red-400/10 bg-red-400/5' : x.severity === 'HIGH' ? 'border-amber-400/10 bg-amber-400/5' : 'border-slate-800 bg-slate-900/30'}`}><div className="text-[10px] text-slate-500">{x.severity}</div><div className="mt-1 text-xl font-semibold text-slate-100">{x.count}</div></button>)}
      </div>
      <div className="mb-4 relative"><Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search findings..." className="w-full rounded-lg border border-slate-800 bg-slate-900/40 py-2.5 pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-400/30" /></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[690px] text-left"><thead><tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-600"><th className="px-3 py-2">Severity</th><th className="px-3 py-2">Finding</th><th className="px-3 py-2">Protocol</th><th className="px-3 py-2">Sessions</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Time</th></tr></thead><tbody>
          {filtered.map(f => <tr key={f.id} onClick={() => navigate(`/findings/${f.id}`)} className="cursor-pointer border-b border-slate-800/60 transition hover:bg-slate-800/25"><td className="px-3 py-3"><SeverityBadge value={f.severity} /></td><td className="px-3 py-3"><div className="text-xs font-medium text-slate-200">{f.title}</div><div className="mt-0.5 font-mono text-[10px] text-slate-600">{f.id}</div></td><td className="px-3 py-3 text-xs text-slate-400">{f.protocol}</td><td className="px-3 py-3 text-xs text-slate-400">{f.affectedSessions}</td><td className="px-3 py-3"><span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-400">{f.status}</span></td><td className="px-3 py-3 text-xs text-slate-500">{f.time}</td></tr>)}
        </tbody></table>
      </div>
    </Card>

    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5"><div className="mb-4 flex items-start justify-between"><div><div className="flex items-center gap-2 text-[15px] font-semibold text-slate-200"><Icon name="brain" size={16} className="text-blue-300" /> AI-Assisted Anomaly Detection</div><p className="mt-1 text-[11px] leading-5 text-slate-500">Highlights TLS sessions that differ from observed communication patterns.</p></div></div>
        <div className="grid grid-cols-3 gap-2">{[['14','Anomalous sessions'],['87%','Highest confidence'],['0.91','Highest anomaly score']].map(([v,l]) => <div key={l} className="rounded-lg border border-slate-800 bg-slate-900/35 p-3"><div className="text-lg font-semibold text-slate-100">{v}</div><div className="mt-1 text-[10px] text-slate-600">{l}</div></div>)}</div>
        <div className="mt-3 space-y-2">{anomalies.map(a => <button key={a.sessionId} onClick={() => navigate(`/session/${a.sessionId}`)} className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-900/25 p-3 text-left transition hover:border-slate-700"><div><div className="text-xs font-medium text-slate-200">{a.sessionId}</div><div className="mt-0.5 text-[11px] text-slate-600">{a.description}</div></div><div className="text-right"><div className="text-xs font-medium text-blue-300">{a.confidence}%</div><div className="text-[9px] text-slate-700">confidence</div></div></button>)}</div>
      </Card>
      <Card className="p-5"><SectionHeader title="Recent Scans" actionLabel="View scans" onAction={() => navigate('/scans')} />
        <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-600"><th className="px-2 py-2">Scan</th><th className="px-2 py-2">File</th><th className="px-2 py-2">Sessions</th><th className="px-2 py-2">Score</th><th className="px-2 py-2">Risk</th></tr></thead><tbody>{recentScans.map(s => <tr key={s.id} onClick={() => navigate(`/scan/${s.id}/results`)} className="cursor-pointer border-b border-slate-800/60 transition hover:bg-slate-800/25"><td className="px-2 py-3 text-xs text-slate-200">{s.name}</td><td className="px-2 py-3 font-mono text-[10px] text-slate-600">{s.fileName}</td><td className="px-2 py-3 text-xs text-slate-400">{s.sessions.toLocaleString()}</td><td className="px-2 py-3 text-xs font-semibold text-slate-200">{s.score}</td><td className="px-2 py-3"><RiskBadge value={s.riskLevel} /></td></tr>)}</tbody></table></div>
      </Card>
    </div>
  </div>;
}
