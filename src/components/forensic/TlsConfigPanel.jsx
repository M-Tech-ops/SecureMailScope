import { Icon } from '../Icons';

export default function TlsConfigPanel({ tls = {} }) {
  const fields = [
    {
      label: 'TLS Version',
      value: tls.tlsVersion || 'TLS 1.0',
      isHighlighted: tls.isTlsDeprecated,
      highlightReason: tls.isTlsDeprecated ? 'Deprecated Protocol' : null,
      isMono: true,
    },
    {
      label: 'Cipher Suite',
      value: tls.cipherSuite || 'TLS_RSA_WITH_AES_128_CBC_SHA',
      isHighlighted: tls.isCipherWeak,
      highlightReason: tls.isCipherWeak ? 'Weak CBC Cipher' : null,
      isMono: true,
    },
    {
      label: 'Key Exchange',
      value: tls.keyExchange || 'RSA (Static)',
      isHighlighted: tls.hasPfs === false,
      highlightReason: tls.hasPfs === false ? 'Non-Ephemeral (Static)' : null,
      isMono: true,
    },
    {
      label: 'Forward Secrecy',
      value: tls.forwardSecrecy || 'No',
      isHighlighted: tls.forwardSecrecy === 'No',
      highlightReason: tls.forwardSecrecy === 'No' ? 'No PFS' : null,
      isBadge: true,
    },
    {
      label: 'Handshake Status',
      value: tls.handshakeStatus || 'Completed',
    },
    {
      label: 'STARTTLS Transition',
      value: tls.starttls || 'Detected',
      isBadge: true,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="lock" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">TLS Configuration</h3>
        </div>
        <span className="text-[11px] text-slate-500">Negotiated Parameters</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div
            key={f.label}
            className={`rounded-lg border p-2.5 transition ${
              f.isHighlighted
                ? 'border-amber-500/30 bg-amber-500/[0.04]'
                : 'border-slate-800/60 bg-slate-900/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                {f.label}
              </span>
              {f.highlightReason && (
                <span className="rounded border border-amber-400/20 bg-amber-400/10 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-amber-300">
                  {f.highlightReason}
                </span>
              )}
            </div>

            <div className="mt-1.5">
              {f.isBadge ? (
                <span
                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                    f.value === 'No'
                      ? 'border border-amber-400/20 bg-amber-400/10 text-amber-300'
                      : 'border border-slate-700 bg-slate-800 text-slate-300'
                  }`}
                >
                  {f.value}
                </span>
              ) : (
                <span className={`text-xs text-slate-200 ${f.isMono ? 'font-mono' : ''}`}>
                  {f.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
