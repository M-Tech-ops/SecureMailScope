import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import FindingDetails from './pages/FindingDetails';
import SessionDetails from './pages/SessionDetails';
import Results from './pages/Results';
import NewScan from './pages/NewScan';
import ScanProgress from './pages/ScanProgress';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  return <BrowserRouter basename="/SecureMailScope">
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scan/:id/results" element={<Results />} />
        <Route path="/scan/:scanId/results" element={<Results />} />
        <Route path="/findings/:id" element={<FindingDetails />} />
        <Route path="/scans" element={<Placeholder title="Scans" description="Scan history will live here. The prototype already links scan rows to their result view." action={{label:'Run a demo scan',to:'/scan/new'}} />} />
        <Route path="/findings" element={<Placeholder title="Findings" description="The full findings workspace will be added next. Dashboard findings already open into forensic details." />} />
        <Route path="/reports" element={<Placeholder title="Reports" description="Report export and historical report browsing will be connected after the core scan flow is complete." />} />
        <Route path="/system" element={<Placeholder title="System status" description="This route is reserved for parser, analysis-engine and API health information." />} />
        <Route path="/scan/new" element={<NewScan />} />
        <Route path="/scan/:scanId/progress" element={<ScanProgress />} />
        <Route path="/scan/demo/progress" element={<ScanProgress />} />
        <Route path="/session/:id" element={<SessionDetails />} />
        <Route path="*" element={<Placeholder title="Page not found" description="The requested prototype route does not exist." />} />
      </Routes>
    </AppShell>
  </BrowserRouter>;
}
