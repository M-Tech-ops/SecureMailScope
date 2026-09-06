import { DEFAULT_SCAN_RESULT, SCENARIO_RESULT_PRESETS } from '../mock/scanResults.js';

/**
 * Service abstraction for retrieving scan results.
 * Can be cleanly swapped with GET /api/scans/{scanId}/results once backend is connected.
 *
 * @param {string} scanId
 * @returns {Promise<Object>}
 */
export function getMockScanResult(scanId = 'SCAN-001') {
  const normalizedId = String(scanId).toLowerCase();

  let preset = DEFAULT_SCAN_RESULT;
  if (normalizedId === 'scan-002' || normalizedId.includes('secure')) {
    preset = SCENARIO_RESULT_PRESETS.secure;
  } else if (normalizedId === 'scan-003' || normalizedId.includes('vuln')) {
    preset = SCENARIO_RESULT_PRESETS.vulnerable;
  }

  const result = {
    ...preset,
    scanId: scanId || 'SCAN-001',
  };

  return Promise.resolve(result);
}
