/**
 * Scan Service — Handles file validation, size formatting, and mock scan dispatch
 */

/**
 * Format bytes into human-readable string (e.g., 18.4 MB, 845 KB)
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size >= 100 ? Math.round(size) : size.toFixed(1)} ${units[i]}`;
}

/**
 * Validates whether a file has an accepted PCAP or PCAPNG extension
 * @param {File | { name: string }} file
 * @returns {{ valid: boolean, error?: string, extension?: 'pcap' | 'pcapng' }}
 */
export function validateCaptureFile(file) {
  if (!file || !file.name) {
    return { valid: false, error: 'No file provided.' };
  }

  const name = file.name.toLowerCase();
  if (name.endsWith('.pcapng')) {
    return { valid: true, extension: 'pcapng' };
  }
  if (name.endsWith('.pcap')) {
    return { valid: true, extension: 'pcap' };
  }

  return {
    valid: false,
    error: 'Unsupported file type. Please select a .pcap or .pcapng file.',
  };
}

/**
 * Mock scan dispatch for frontend prototype.
 * Prepared for future backend endpoint: POST /api/scans
 *
 * @param {Object} input
 * @param {string | null} input.fileName
 * @param {number | null} input.fileSize
 * @param {'pcap' | 'pcapng' | null} input.fileType
 * @param {'secure' | 'vulnerable' | 'mixed' | null} input.demoScenario
 * @returns {Promise<{
 *   scanId: string,
 *   fileName: string,
 *   scenario: string | null,
 *   status: string,
 *   createdAt: string
 * }>}
 */
export function startMockScan(input) {
  const scanNumber = Math.floor(100 + Math.random() * 900);
  const scanId = `SCAN-${scanNumber}`;
  const fileName = input.fileName || (
    input.demoScenario === 'secure' ? 'enterprise_tls13_compliant.pcapng' :
    input.demoScenario === 'vulnerable' ? 'legacy_tls10_expired_certs.pcap' :
    'enterprise_email_capture.pcap'
  );

  return Promise.resolve({
    scanId,
    fileName,
    scenario: input.demoScenario || 'custom-upload',
    status: 'QUEUED',
    createdAt: new Date().toISOString(),
  });
}
