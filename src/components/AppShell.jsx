import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from './Icons';

const items = [
  { label: 'Overview', to: '/', icon: 'layout', end: true },
  { label: 'Scans', to: '/scans', icon: 'scan' },
  { label: 'Findings', to: '/scan/SCAN-001/results', icon: 'alert' },
  { label: 'Reports', to: '/findings/TLS-001', icon: 'file' },
];

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isNewScan = location.pathname === '/scan/new';
  const isScanProgress = location.pathname.includes('/progress');
  const isScanResults = location.pathname.includes('/results');
  const isScanRoute = location.pathname.startsWith('/scan');
  const isFindings = location.pathname.startsWith('/findings/');
  const isSession = location.pathname.startsWith('/session/');

  return (
    <div className="min-h-screen bg-[#0f141b] text-slate-200">
      {open && <button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-slate-800/90 bg-[#10161e] transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-800 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/10">
                <Icon name="shield" size={18} className="text-blue-300" />
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight text-slate-100">SECUREMAILSCOPE
                  (Prototype)
                </div>
                <div className="mt-0.5 text-[10px] text-slate-500">Cryptographic Security Posture
                </div>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">Workspace</div>
            <div className="space-y-1">
              {items.map((item) => {
                const isActive =
  item.to === '/'
    ? location.pathname === '/'
    : item.to === '/scans'
    ? location.pathname === '/scans'
    : item.to === '/scan/SCAN-001/results'
    ? location.pathname === '/scan/SCAN-001/results'
    : item.to === '/findings/TLS-001'
    ? location.pathname === '/findings/TLS-001'
    : false;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'border-blue-400/15 bg-blue-400/8 text-blue-300'
                        : 'border-transparent text-slate-400 hover:bg-slate-800/45 hover:text-slate-200'
                    }`}
                  >
                    <Icon name={item.icon} size={17} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>
          <div className="border-t border-slate-800 p-3">
            <button onClick={() => navigate('/system')} className="mb-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800/45 hover:text-slate-200">
              <Icon name="cpu" size={17} /> System Status
            </button>
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs font-medium text-slate-300">Prototype Mode</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">Mock analysis data</div>
            </div>
          </div>
        </div>
      </aside>
      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/90 bg-[#0f141b]/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 lg:hidden" aria-label="Open menu">
              <Icon name="menu" size={20} />
            </button>
            <div>
              {isScanProgress ? (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">Scan in Progress</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Analyzing captured email traffic</div>
                </>
              ) : isScanResults ? (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">Scan Results</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Enterprise Email Cryptographic Security Assessment</div>
                </>
              ) : isNewScan ? (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">New Security Scan</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Analyze captured SMTP, IMAP and POP3 traffic.</div>
                </>
              ) : isFindings ? (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">Finding Investigation</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Forensic Security Analysis</div>
                </>
              ) : isSession ? (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">Session Details</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Reconstructed Network Session</div>
                </>
              ) : (
                <>
                  <div className="text-[15px] font-semibold text-slate-100">Overview</div>
                  <div className="hidden text-[12px] text-slate-500 sm:block">Enterprise Email Cryptographic Security Posture</div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isScanProgress ? (
              <div className="flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-medium text-blue-200">Active Forensic Pipeline</span>
              </div>
            ) : isNewScan ? (
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="font-medium text-slate-300">Passive Forensic Mode</span>
              </div>
            ) : isScanResults ? (
              <>
                <div className="hidden items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 md:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium">Forensic Ingestion Complete</span>
                </div>
                <button onClick={() => navigate('/scan/new')} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40">
                  <Icon name="plus" size={15} /> New Scan
                </button>
              </>
            ) : isFindings ? (
              <div className="hidden items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/8 px-3 py-1.5 text-xs text-amber-300 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="font-medium">Finding Investigation</span>
              </div>
            ) : isSession ? (
              <div className="hidden items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-xs text-slate-400 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span className="font-medium text-slate-300">Session Reconstruction</span>
              </div>
            ) : (
              <>
                <div className="hidden items-center gap-2 text-[12px] text-slate-500 md:flex">
                  <Icon name="clock" size={14} />
                  Last scan <span className="text-slate-300">Today, 18:42</span>
                </div>
                <button onClick={() => navigate('/scan/new')} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40">
                  <Icon name="plus" size={15} /> New Scan
                </button>
              </>
            )}
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-[1480px] p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
