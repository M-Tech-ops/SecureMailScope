import { Icon } from '../Icons';

export default function CertificatePanel({ certificate = {} }) {
  const {
    subject = 'mail.company.local',
    issuer = 'Example Enterprise CA',
    validFrom = '2025-01-01',
    validUntil = '2026-12-31',
    status = 'Valid',
    publicKeyAlgorithm = 'RSA',
    keyLength = '2048-bit',
    signatureAlgorithm = 'SHA256withRSA',
    certificateChain = 'Available',
  } = certificate;

  const statusBadge = {
    Valid: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    Expired: 'border-red-400/20 bg-red-400/10 text-red-300',
    'Near expiry': 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300',
  }[status] || 'border-slate-700 bg-slate-800 text-slate-300';

  const fields = [
    { label: 'Subject (CN)', value: subject, isMono: true },
    { label: 'Issuer Authority', value: issuer },
    { label: 'Valid From', value: validFrom, isMono: true },
    { label: 'Valid Until', value: validUntil, isMono: true },
    { label: 'Public Key Algorithm', value: `${publicKeyAlgorithm} / ${keyLength}` },
    { label: 'Signature Algorithm', value: signatureAlgorithm, isMono: true },
    { label: 'Certificate Chain', value: certificateChain },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#141b24] p-5 transition hover:border-slate-750">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon name="fileCode" size={15} className="text-blue-300" />
          <h3 className="text-sm font-semibold text-slate-100">Certificate Information</h3>
        </div>
        <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase border ${statusBadge}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label} className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              {f.label}
            </div>
            <div className={`mt-1 text-xs text-slate-200 ${f.isMono ? 'font-mono' : ''}`}>
              {f.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-[11px] text-slate-500">
        Observed from in-band ServerCertificate handshake message. Trust anchor validated against standard enterprise store.
      </div>
    </div>
  );
}
