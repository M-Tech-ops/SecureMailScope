import { FINDINGS_DATA } from '../mock/findingsData.js';
import { SESSIONS_DATA } from '../mock/sessionsData.js';

/**
 * Retrieve detailed forensic finding information by ID.
 * Ready to be connected to GET /api/findings/{finding_id}
 *
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export function getFinding(id) {
  if (!id) return Promise.resolve(null);
  const normalized = String(id).toUpperCase();
  const finding = FINDINGS_DATA[normalized] || FINDINGS_DATA['TLS-001'];
  return Promise.resolve(finding ? { ...finding } : null);
}

/**
 * Retrieve reconstructed forensic session by session ID.
 * Ready to be connected to GET /api/sessions/{session_id}
 *
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export function getSession(id) {
  if (!id) return Promise.resolve(null);
  const normalized = String(id).toUpperCase();
  const rawId = String(id).replace(/[^0-9]/g, '');

  const session = SESSIONS_DATA[normalized] || SESSIONS_DATA[rawId] || SESSIONS_DATA['SMTP-1847'];
  return Promise.resolve(session ? { ...session } : null);
}

/**
 * Retrieve related findings objects for a given finding.
 *
 * @param {string} findingId
 * @returns {Promise<Array>}
 */
export function getRelatedFindings(findingId) {
  const current = FINDINGS_DATA[String(findingId).toUpperCase()];
  if (!current || !current.relatedFindings) {
    return Promise.resolve([
      FINDINGS_DATA['CERT-004'],
      FINDINGS_DATA['CIPHER-008'],
      FINDINGS_DATA['ANOM-014'],
    ]);
  }

  const related = current.relatedFindings
    .map((refId) => FINDINGS_DATA[refId])
    .filter(Boolean);

  return Promise.resolve(related);
}
