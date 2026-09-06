import {
  PIPELINE_STAGES,
  PRELIMINARY_OBSERVATIONS,
  PROTOCOL_METRICS,
  TARGET_METRICS,
  SCENARIO_PROFILES,
} from '../mock/scanPipeline.js';

/**
 * Computes an analytical snapshot of the scan given progress percentage.
 * Ready to be connected to GET /api/scans/{scanId}/status later.
 *
 * @param {string} scanId
 * @param {number} progress - percentage between 0 and 100
 * @param {string} [scenarioId='mixed'] - 'secure' | 'vulnerable' | 'mixed'
 * @param {Object} [fileInfo]
 * @returns {Object} Full scan status model
 */
export function getMockScanStatus(scanId = 'SCAN-001', progress = 0, scenarioId = 'mixed', fileInfo = null) {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const isComplete = clampedProgress >= 100;
  const scenarioKey = scenarioId && SCENARIO_PROFILES[scenarioId] ? scenarioId : 'mixed';
  const profile = SCENARIO_PROFILES[scenarioKey];

  // Derive current stage
  let currentStageIndex = PIPELINE_STAGES.findIndex(
    (s) => clampedProgress >= s.range[0] && clampedProgress < s.range[1]
  );
  if (currentStageIndex === -1) {
    currentStageIndex = isComplete ? PIPELINE_STAGES.length - 1 : 0;
  }
  const currentStage = PIPELINE_STAGES[currentStageIndex];

  // Pipeline items with individual status
  const pipeline = PIPELINE_STAGES.map((stage, idx) => {
    let state = 'pending'; // 'completed' | 'active' | 'pending'
    if (clampedProgress >= stage.range[1]) {
      state = 'completed';
    } else if (clampedProgress >= stage.range[0] && clampedProgress < stage.range[1]) {
      state = 'active';
    }

    return {
      ...stage,
      index: idx + 1,
      state,
      displayText: state === 'completed'
        ? stage.completedText
        : state === 'active'
        ? stage.activeText
        : null,
    };
  });

  // Calculate live progressing metrics
  const ratio = clampedProgress / 100;
  const metrics = {
    packets: Math.round(ratio * TARGET_METRICS.packets),
    sessions: clampedProgress >= 20 ? Math.round(Math.min(1, (clampedProgress - 20) / 80) * TARGET_METRICS.sessions) : 0,
    tlsSessions: clampedProgress >= 35 ? Math.round(Math.min(1, (clampedProgress - 35) / 65) * TARGET_METRICS.tlsSessions) : 0,
    certificates: clampedProgress >= 55 ? Math.round(Math.min(1, (clampedProgress - 55) / 45) * TARGET_METRICS.certificates) : 0,
    potentialFindings: clampedProgress >= 30 ? Math.round(Math.min(1, (clampedProgress - 30) / 70) * TARGET_METRICS.potentialFindings) : 0,
  };

  // Protocols
  const protocols = {
    smtp: clampedProgress >= 15 ? Math.round(Math.min(1, (clampedProgress - 15) / 85) * PROTOCOL_METRICS.smtp) : 0,
    imap: clampedProgress >= 15 ? Math.round(Math.min(1, (clampedProgress - 15) / 85) * PROTOCOL_METRICS.imap) : 0,
    pop3: clampedProgress >= 15 ? Math.round(Math.min(1, (clampedProgress - 15) / 85) * PROTOCOL_METRICS.pop3) : 0,
  };

  // Preliminary observations triggered so far
  const observations = PRELIMINARY_OBSERVATIONS.filter(
    (obs) => clampedProgress >= obs.triggerProgress
  );

  // File metadata defaults if not provided
  const fileName = fileInfo?.name || (
    scenarioKey === 'secure' ? 'enterprise_tls13_compliant.pcapng' :
    scenarioKey === 'vulnerable' ? 'legacy_tls10_expired_certs.pcap' :
    'enterprise_email_capture.pcap'
  );
  const fileSize = fileInfo?.size || (
    scenarioKey === 'secure' ? '13.6 MB' :
    scenarioKey === 'vulnerable' ? '21.4 MB' :
    '18.4 MB'
  );
  const fileType = fileName.endsWith('.pcapng') ? 'PCAPNG' : 'PCAP';

  return {
    scanId,
    fileName,
    fileSize,
    fileType,
    scenario: scenarioKey,
    progress: clampedProgress,
    status: isComplete ? 'COMPLETED' : 'ANALYZING',
    currentStage: {
      id: currentStage.id,
      name: currentStage.name,
      index: currentStageIndex + 1,
      total: PIPELINE_STAGES.length,
      activeText: currentStage.activeText,
    },
    metrics,
    protocols,
    pipeline,
    observations,
    mode: 'Passive Forensic Analysis',
    scope: 'SMTP / IMAP / POP3',
    analysisProfile: 'Standard Enterprise Assessment',
    completion: {
      score: profile.score,
      risk: profile.risk,
      findings: profile.totalFindings,
      anomalies: profile.anomalies,
      sessions: profile.sessions,
      tlsSessions: profile.tlsSessions,
    },
  };
}
