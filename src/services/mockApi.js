import { dashboardSummary, recentFindings, recentScans, anomalies } from '../mock/dashboard';
import { findingDetails } from '../mock/findings';

export const mockApi = {
  getDashboard() { return Promise.resolve(dashboardSummary); },
  getRecentFindings() { return Promise.resolve(recentFindings); },
  getRecentScans() { return Promise.resolve(recentScans); },
  getAnomalies() { return Promise.resolve(anomalies); },
  getFinding(id) { return Promise.resolve(findingDetails[id] ?? null); },
};
