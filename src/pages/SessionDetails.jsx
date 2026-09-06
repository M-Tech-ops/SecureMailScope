import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SessionHeader from '../components/forensic/SessionHeader';
import SessionEventTimeline from '../components/forensic/SessionEventTimeline';
import AssociatedFindingsCard from '../components/forensic/AssociatedFindingsCard';
import { Icon } from '../components/Icons';
import { getSession } from '../services/forensicService';

export default function SessionDetails() {
  const { id, sessionId } = useParams();
  const activeSessionId = sessionId || id || 'SMTP-1847';
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSession(activeSessionId).then((data) => {
      setSession(data);
      setLoading(false);
    });
  }, [activeSessionId]);

  const handleBackFinding = () => {
    if (session?.findingId) {
      navigate(`/findings/${session.findingId}`);
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          <span>Reconstructing network session streams...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate('/scan/SCAN-001/results')}
          className="text-sm text-blue-300 hover:text-blue-200"
        >
          ← Back to Results
        </button>
        <div className="mt-8 rounded-xl border border-slate-800 bg-[#141b24] p-8 text-center text-slate-400">
          <h2 className="text-base font-semibold text-slate-200">Session Not Found</h2>
          <p className="mt-2 text-xs text-slate-500">
            Session ID ({activeSessionId}) could not be reassembled from the active capture stream.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 10. SESSION HEADER */}
      <section aria-label="Session Identity and Header">
        <SessionHeader session={session} onBackFinding={handleBackFinding} />
      </section>

      {/* SESSION OVERVIEW METRIC SUMMARY */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-xl border border-slate-800 bg-[#141b24] p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Duration</div>
          <div className="mt-1 font-mono text-base font-semibold text-slate-200">{session.duration}</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#141b24] p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Packets</div>
          <div className="mt-1 font-mono text-base font-semibold text-slate-200">{session.packets}</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#141b24] p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Volume</div>
          <div className="mt-1 font-mono text-base font-semibold text-slate-200">{session.bytes}</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#141b24] p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Stream Index</div>
          <div className="mt-1 font-mono text-base font-semibold text-slate-200">#{session.tcpStreamIndex}</div>
        </div>

        <div className="col-span-2 rounded-xl border border-slate-800 bg-[#141b24] p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">TCP State</div>
          <div className="mt-1 font-mono text-xs font-semibold text-slate-300">{session.tcpState}</div>
        </div>
      </div>

      {/* TWO-COLUMN FORENSIC DETAILS */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Column: 11. Reconstructed Session Event Flow */}
        <section aria-label="Reconstructed Session Events">
          <SessionEventTimeline events={session.events} />
        </section>

        {/* Right Column: Protocols, TLS, Certificate & Associated Findings */}
        <div className="space-y-6">
          {/* Associated Findings */}
          <section aria-label="Associated Findings">
            <AssociatedFindingsCard findingIds={session.associatedFindingIds} />
          </section>

          {/* TLS Configuration Panel */}
          <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Icon name="lock" size={15} className="text-blue-300" />
              <h3 className="text-sm font-semibold text-slate-100">TLS Parameters</h3>
            </div>
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500">Negotiated Version</span>
                <span className={`font-mono ${session.tls?.isDeprecated ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {session.tls?.version}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500">Cipher Suite</span>
                <span className="font-mono text-slate-200 truncate max-w-[200px]" title={session.tls?.cipherSuite}>
                  {session.tls?.cipherSuite}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500">Key Exchange</span>
                <span className="font-mono text-slate-200">{session.tls?.keyExchange}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Forward Secrecy</span>
                <span className={`font-mono ${session.tls?.pfs === 'Yes' ? 'text-blue-300' : 'text-amber-300'}`}>
                  {session.tls?.pfs}
                </span>
              </div>
            </div>
          </div>

          {/* STARTTLS Transition Panel */}
          <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Icon name="activity" size={15} className="text-blue-300" />
              <h3 className="text-sm font-semibold text-slate-100">STARTTLS Transition</h3>
            </div>
            <div className="mt-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500 font-sans">Command</span>
                <span className="text-slate-200">{session.starttls?.command}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500 font-sans">Server Response</span>
                <span className="text-slate-300 truncate max-w-[200px]" title={session.starttls?.response}>
                  {session.starttls?.response}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-sans">Transition Status</span>
                <span className="text-emerald-300 font-sans font-medium">{session.starttls?.transitionState}</span>
              </div>
            </div>
          </div>

          {/* Certificate Snapshot */}
          <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Icon name="fileCode" size={15} className="text-blue-300" />
              <h3 className="text-sm font-semibold text-slate-100">Presented Certificate</h3>
            </div>
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500">Subject</span>
                <span className="font-mono text-slate-200">{session.certificate?.subject}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-500">Validity Status</span>
                <span className={`font-mono font-medium ${session.certificate?.status === 'Valid' ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {session.certificate?.status}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">SHA-256 Fingerprint</span>
                <span className="font-mono text-slate-400">{session.certificate?.fingerprint}</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleBackFinding}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            >
              <Icon name="arrowLeft" size={13} />
              <span>Back to Finding</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/scan/SCAN-001/results')}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              <span>Back to Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
